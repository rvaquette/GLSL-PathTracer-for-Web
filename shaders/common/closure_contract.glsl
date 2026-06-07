// D4.1 closure contract adapter.
// Provides a single closure entry point for path tracing while preserving
// the current Disney/OpenPBR implementation underneath.

#define CLOSURE_FLAG_REFLECT 1
#define CLOSURE_FLAG_TRANSMIT 2
#define CLOSURE_FLAG_EMISSIVE 4

#define D4_DIFFUSE_LAMBERT 0
#define D4_DIFFUSE_OREN_NAYAR 1
#define D4_DIFFUSE_BURLEY 2

#define D4_CONDUCTOR_BRDF 0
#define D4_CONDUCTOR_BSDF 1

#define D4_DIELECTRIC_BRDF 0
#define D4_DIELECTRIC_BSDF 1
#define D4_DIELECTRIC_BTDF 2

#define D4_EDF_UNIFORM 0
#define D4_EDF_GENERALIZED_SCHLICK 1

#define D4_CLOSURE_KIND_DIFFUSE 0
#define D4_CLOSURE_KIND_CONDUCTOR 1
#define D4_CLOSURE_KIND_DIELECTRIC 2
#define D4_CLOSURE_KIND_HAIR 3
#define D4_CLOSURE_KIND_GENERIC 4
#define D4_CLOSURE_KIND_SUBSURFACE 5
#define D4_CLOSURE_KIND_VOLUME 6

int SelectDiffuseClosureModel(State state)
{
    float r = clamp(state.mat.baseDiffuseRoughness, 0.0, 1.0);
    if (r < 0.2)
        return D4_DIFFUSE_LAMBERT;
    if (r < 0.75)
        return D4_DIFFUSE_OREN_NAYAR;
    return D4_DIFFUSE_BURLEY;
}

bool IsMostlyDiffuseMaterial(State state)
{
    Material m = state.mat;
    return m.materialType < 0.5
        && m.baseWeight > 0.0
        && m.metallic < 1e-4
        && m.specTrans < 1e-4
        && m.clearcoat < 1e-4
        && m.specularWeight < 1e-3;
}

int SelectConductorClosureModel(State state)
{
    // MaterialX conductor_brdf / conductor_bsdf both map to reflective conductor behavior
    // in this path tracer; keep model switch for future specialization.
    float roughness = clamp(state.mat.roughness, 0.0, 1.0);
    return (roughness < 0.5) ? D4_CONDUCTOR_BRDF : D4_CONDUCTOR_BSDF;
}

bool IsMostlyConductorMaterial(State state)
{
    Material m = state.mat;
    return m.materialType < 0.5
        && m.baseWeight > 0.0
        && m.metallic > 1.0 - 1e-3
        && m.specTrans < 1e-4;
}

int SelectDielectricClosureModel(State state)
{
    // Heuristic mapping for D4.4 while we do not carry explicit MaterialX closure IDs.
    // low specTrans -> dielectric_brdf, mid -> dielectric_bsdf, high -> dielectric_btdf.
    float t = clamp(state.mat.specTrans, 0.0, 1.0);
    if (t < 0.2)
        return D4_DIELECTRIC_BRDF;
    if (t < 0.8)
        return D4_DIELECTRIC_BSDF;
    return D4_DIELECTRIC_BTDF;
}

bool IsMostlyDielectricMaterial(State state)
{
    Material m = state.mat;
    return m.materialType < 0.5
        && m.baseWeight > 0.0
        && m.metallic < 1e-3
        && m.specularWeight > 1e-3
        && m.specTrans > 1e-4;
}

int SelectEdfClosureModel(State state)
{
    // Heuristic mapping while explicit MaterialX EDF IDs are not wired yet.
    // Use sheen/fuzz signal as a proxy for directional generalized_schlick_edf.
    float schlickSignal = max(state.mat.sheen, state.mat.fuzzRoughness);
    return (schlickSignal > 0.05) ? D4_EDF_GENERALIZED_SCHLICK : D4_EDF_UNIFORM;
}

bool HasEdfClosure(State state)
{
    return max(max(state.mat.emission.r, state.mat.emission.g), state.mat.emission.b) > 1e-6;
}

State BuildConductorClosureState(State state)
{
    State conductorState = state;
    conductorState.mat.baseWeight = 1.0;
    conductorState.mat.metallic = 1.0;
    conductorState.mat.specTrans = 0.0;
    conductorState.mat.clearcoat = 0.0;
    // Keep tint/specularColor/roughness/anisotropy as authored.
    return conductorState;
}

State BuildDielectricClosureState(State state, int model)
{
    State dielectricState = state;
    dielectricState.mat.baseWeight = 1.0;
    dielectricState.mat.metallic = 0.0;
    dielectricState.mat.clearcoat = 0.0;
    dielectricState.mat.specularWeight = max(state.mat.specularWeight, 1e-3);

    if (model == D4_DIELECTRIC_BRDF)
        dielectricState.mat.specTrans = 0.0;
    else if (model == D4_DIELECTRIC_BTDF)
        dielectricState.mat.specTrans = 1.0;
    else
        dielectricState.mat.specTrans = clamp(state.mat.specTrans, 0.2, 0.8);

    return dielectricState;
}

vec3 EvalUniformEdfClosure(State state)
{
    return state.mat.emission;
}

vec3 EvalGeneralizedSchlickEdfClosure(State state, vec3 N, vec3 L)
{
    float nDotL = max(dot(N, L), 0.0);
    float w = SchlickWeight(1.0 - nDotL);
    float directionalBoost = mix(1.0, 1.75, w);
    return state.mat.emission * directionalBoost;
}

vec3 EvalEdfClosureByModel(State state, vec3 N, vec3 L, int model)
{
    if (model == D4_EDF_GENERALIZED_SCHLICK)
        return EvalGeneralizedSchlickEdfClosure(state, N, L);
    return EvalUniformEdfClosure(state);
}

float DiffusePdf(vec3 N, vec3 L)
{
    float nDotL = max(dot(N, L), 0.0);
    return nDotL * INV_PI;
}

vec3 EvalLambertDiffuseClosure(State state, vec3 N, vec3 L, out float pdf)
{
    float nDotL = max(dot(N, L), 0.0);
    pdf = nDotL * INV_PI;
    return state.mat.baseWeight * state.mat.baseColor * INV_PI * nDotL;
}

vec3 EvalOrenNayarDiffuseClosure(State state, vec3 V, vec3 N, vec3 L, out float pdf)
{
    float nDotL = max(dot(N, L), 0.0);
    float nDotV = max(dot(N, V), 0.0);
    pdf = nDotL * INV_PI;
    if (nDotL <= 0.0 || nDotV <= 0.0)
        return vec3(0.0);

    float roughness = clamp(state.mat.baseDiffuseRoughness, 0.0, 1.0);
    float sigma = roughness * 1.57079632679;
    float sigma2 = sigma * sigma;
    float A = 1.0 - (sigma2 / (2.0 * (sigma2 + 0.33)));
    float B = 0.45 * sigma2 / (sigma2 + 0.09);

    float maxCos = 0.0;
    vec3 Lplane = L - N * nDotL;
    vec3 Vplane = V - N * nDotV;
    float ll = dot(Lplane, Lplane);
    float vv = dot(Vplane, Vplane);
    if (ll > 1e-10 && vv > 1e-10)
    {
        vec3 Lp = Lplane * inversesqrt(ll);
        vec3 Vp = Vplane * inversesqrt(vv);
        maxCos = max(0.0, dot(Lp, Vp));
    }

    float sinThetaL = sqrt(max(0.0, 1.0 - nDotL * nDotL));
    float sinThetaV = sqrt(max(0.0, 1.0 - nDotV * nDotV));
    float sinAlpha;
    float tanBeta;
    if (nDotL > nDotV)
    {
        sinAlpha = sinThetaV;
        tanBeta = sinThetaL / max(nDotL, 1e-5);
    }
    else
    {
        sinAlpha = sinThetaL;
        tanBeta = sinThetaV / max(nDotV, 1e-5);
    }

    float on = A + B * maxCos * sinAlpha * tanBeta;
    return state.mat.baseWeight * state.mat.baseColor * INV_PI * on * nDotL;
}

vec3 EvalBurleyDiffuseClosure(State state, vec3 V, vec3 N, vec3 L, out float pdf)
{
    float nDotL = max(dot(N, L), 0.0);
    float nDotV = max(dot(N, V), 0.0);
    pdf = nDotL * INV_PI;
    if (nDotL <= 0.0 || nDotV <= 0.0)
        return vec3(0.0);

    vec3 H = normalize(V + L);
    float lDotH = max(dot(L, H), 0.0);
    float roughness = max(state.mat.roughness, 1e-3);
    float rr = 2.0 * roughness * lDotH * lDotH;
    float FL = SchlickWeight(nDotL);
    float FV = SchlickWeight(nDotV);
    float Fd = (1.0 - 0.5 * FL) * (1.0 - 0.5 * FV);
    float Fretro = rr * (FL + FV + FL * FV * (rr - 1.0));
    float burley = Fd + Fretro;

    return state.mat.baseWeight * state.mat.baseColor * INV_PI * burley * nDotL;
}

vec3 EvalDiffuseClosureByModel(State state, vec3 V, vec3 N, vec3 L, int model, out float pdf)
{
    if (model == D4_DIFFUSE_LAMBERT)
        return EvalLambertDiffuseClosure(state, N, L, pdf);
    if (model == D4_DIFFUSE_BURLEY)
        return EvalBurleyDiffuseClosure(state, V, N, L, pdf);
    return EvalOrenNayarDiffuseClosure(state, V, N, L, pdf);
}

vec3 SampleDiffuseClosureByModel(State state, vec3 V, vec3 N, int model, out vec3 L, out float pdf)
{
    float r1 = rand();
    float r2 = rand();
    vec3 T, B;
    Onb(N, T, B);
    vec3 local = CosineSampleHemisphere(r1, r2);
    L = normalize(T * local.x + B * local.y + N * local.z);
    return EvalDiffuseClosureByModel(state, V, N, L, model, pdf);
}

vec3 EvalConductorClosureByModel(State state, vec3 V, vec3 N, vec3 L, int model, out float pdf)
{
    State conductorState = BuildConductorClosureState(state);
    return DisneyEval(conductorState, V, N, L, pdf);
}

vec3 SampleConductorClosureByModel(State state, vec3 V, vec3 N, int model, out vec3 L, out float pdf)
{
    State conductorState = BuildConductorClosureState(state);
    return DisneySample(conductorState, V, N, L, pdf);
}

vec3 EvalDielectricClosureByModel(State state, vec3 V, vec3 N, vec3 L, int model, out float pdf)
{
    State dielectricState = BuildDielectricClosureState(state, model);
    vec3 f = DisneyEval(dielectricState, V, N, L, pdf);

    if (model == D4_DIELECTRIC_BRDF && dot(V, L) < 0.0)
    {
        pdf = 0.0;
        return vec3(0.0);
    }
    if (model == D4_DIELECTRIC_BTDF && dot(V, L) >= 0.0)
    {
        pdf = 0.0;
        return vec3(0.0);
    }

    return f;
}

vec3 SampleDielectricClosureByModel(State state, vec3 V, vec3 N, int model, out vec3 L, out float pdf)
{
    State dielectricState = BuildDielectricClosureState(state, model);

    if (model == D4_DIELECTRIC_BSDF)
        return DisneySample(dielectricState, V, N, L, pdf);

    const int maxAttempts = 4;
    vec3 f = vec3(0.0);
    pdf = 0.0;
    for (int i = 0; i < maxAttempts; i++)
    {
        float tmpPdf;
        vec3 tmpL;
        vec3 tmpF = DisneySample(dielectricState, V, N, tmpL, tmpPdf);
        bool isReflection = dot(V, tmpL) >= 0.0;
        bool accept = (model == D4_DIELECTRIC_BRDF) ? isReflection : !isReflection;
        if (accept)
        {
            L = tmpL;
            pdf = tmpPdf;
            f = tmpF;
            break;
        }
    }
    return f;
}

int ClosureFlagsFromDirection(vec3 V, vec3 L)
{
    // Reflection when incoming and outgoing directions are on same hemisphere.
    return (dot(V, L) >= 0.0) ? CLOSURE_FLAG_REFLECT : CLOSURE_FLAG_TRANSMIT;
}

bool ClosureSupportsDirection(int flags, vec3 V, vec3 L)
{
    int requested = ClosureFlagsFromDirection(V, L);
    return (flags & requested) != 0;
}

#ifdef OPT_MATERIALX_RUNTIME

void ComputeMaterialXLobeWeights(State state, out float wDiffuse, out float wConductor, out float wDielectric)
{
    float baseW = clamp(state.mat.baseWeight, 0.0, 1.0);
    float metallic = clamp(state.mat.metallic, 0.0, 1.0);
    float specTrans = clamp(state.mat.specTrans, 0.0, 1.0);
    float specWeight = clamp(state.mat.specularWeight, 0.0, 1.0);

    float diffuseSignal = baseW * (1.0 - metallic) * (1.0 - specTrans) * (1.0 - 0.5 * specWeight);
    float conductorSignal = baseW * metallic;
    float dielectricSignal = baseW * (1.0 - metallic) * max(specWeight, specTrans);

    float sumSignals = diffuseSignal + conductorSignal + dielectricSignal;
    if (sumSignals <= 1e-6)
    {
        wDiffuse = 1.0;
        wConductor = 0.0;
        wDielectric = 0.0;
        return;
    }

    wDiffuse = diffuseSignal / sumSignals;
    wConductor = conductorSignal / sumSignals;
    wDielectric = dielectricSignal / sumSignals;
}

int MaterialXTransportFlags(State state)
{
    float wDiffuse, wConductor, wDielectric;
    ComputeMaterialXLobeWeights(state, wDiffuse, wConductor, wDielectric);
    int flags = 0;
    if (wDiffuse > 1e-4 || wConductor > 1e-4)
        flags |= CLOSURE_FLAG_REFLECT;
    if (wDielectric > 1e-4)
    {
        int dieModel = SelectDielectricClosureModel(state);
        if (dieModel == D4_DIELECTRIC_BRDF)
            flags |= CLOSURE_FLAG_REFLECT;
        else if (dieModel == D4_DIELECTRIC_BTDF)
            flags |= CLOSURE_FLAG_TRANSMIT;
        else
            flags |= (CLOSURE_FLAG_REFLECT | CLOSURE_FLAG_TRANSMIT);
    }
    return flags;
}

vec3 EvalCompositeMaterialXClosure(State state, vec3 V, vec3 N, vec3 L, out float pdf, out int flags)
{
    float wDiffuse, wConductor, wDielectric;
    ComputeMaterialXLobeWeights(state, wDiffuse, wConductor, wDielectric);

    int diffModel = SelectDiffuseClosureModel(state);
    int condModel = SelectConductorClosureModel(state);
    int dielModel = SelectDielectricClosureModel(state);

    float pdfD = 0.0;
    float pdfC = 0.0;
    float pdfT = 0.0;
    vec3 fD = (wDiffuse > 1e-6) ? EvalDiffuseClosureByModel(state, V, N, L, diffModel, pdfD) : vec3(0.0);
    vec3 fC = (wConductor > 1e-6) ? EvalConductorClosureByModel(state, V, N, L, condModel, pdfC) : vec3(0.0);
    vec3 fT = (wDielectric > 1e-6) ? EvalDielectricClosureByModel(state, V, N, L, dielModel, pdfT) : vec3(0.0);

    vec3 f = wDiffuse * fD + wConductor * fC + wDielectric * fT;
    pdf = wDiffuse * pdfD + wConductor * pdfC + wDielectric * pdfT;
    flags = MaterialXTransportFlags(state);
    return f;
}

vec3 SampleCompositeMaterialXClosure(State state, vec3 V, vec3 N, out vec3 L, out float pdf, out int flags)
{
    float wDiffuse, wConductor, wDielectric;
    ComputeMaterialXLobeWeights(state, wDiffuse, wConductor, wDielectric);

    int diffModel = SelectDiffuseClosureModel(state);
    int condModel = SelectConductorClosureModel(state);
    int dielModel = SelectDielectricClosureModel(state);

    float xi = rand();
    float cutoffDiffuse = wDiffuse;
    float cutoffConductor = wDiffuse + wConductor;

    float sampledPdf = 0.0;
    vec3 sampledF = vec3(0.0);
    if (xi < cutoffDiffuse)
    {
        sampledF = SampleDiffuseClosureByModel(state, V, N, diffModel, L, sampledPdf);
    }
    else if (xi < cutoffConductor)
    {
        sampledF = SampleConductorClosureByModel(state, V, N, condModel, L, sampledPdf);
    }
    else
    {
        sampledF = SampleDielectricClosureByModel(state, V, N, dielModel, L, sampledPdf);
    }

    float pdfD = 0.0;
    float pdfC = 0.0;
    float pdfT = 0.0;
    vec3 fD = (wDiffuse > 1e-6) ? EvalDiffuseClosureByModel(state, V, N, L, diffModel, pdfD) : vec3(0.0);
    vec3 fC = (wConductor > 1e-6) ? EvalConductorClosureByModel(state, V, N, L, condModel, pdfC) : vec3(0.0);
    vec3 fT = (wDielectric > 1e-6) ? EvalDielectricClosureByModel(state, V, N, L, dielModel, pdfT) : vec3(0.0);

    vec3 f = wDiffuse * fD + wConductor * fC + wDielectric * fT;
    pdf = wDiffuse * pdfD + wConductor * pdfC + wDielectric * pdfT;
    flags = MaterialXTransportFlags(state);

    int dirFlag = ClosureFlagsFromDirection(V, L);
    if ((flags & dirFlag) == 0)
    {
        pdf = 0.0;
        return vec3(0.0);
    }

    if (pdf <= 0.0 && sampledPdf > 0.0)
    {
        pdf = sampledPdf;
        return sampledF;
    }

    return f;
}

vec3 EvalHairClosure(State state, vec3 V, vec3 N, vec3 L, out float pdf, out int flags)
{
    flags = CLOSURE_FLAG_REFLECT | CLOSURE_FLAG_TRANSMIT;
    return EvalHair(state, V, N, L, pdf);
}

vec3 SampleHairClosure(State state, vec3 V, vec3 N, out vec3 L, out float pdf, out int flags)
{
    flags = CLOSURE_FLAG_REFLECT | CLOSURE_FLAG_TRANSMIT;
    return SampleHair(state, V, N, L, pdf);
}

vec3 EvalMediumPhaseApprox(State state, vec3 N, vec3 L, out float pdf)
{
    Material m = state.mat;
    float g = clamp(m.medium.anisotropy, -0.95, 0.95);
    float cosTheta = clamp(dot(N, L), -1.0, 1.0);
    float phase = (1.0 - g * g) / (4.0 * PI * pow(max(1.0 + g * g - 2.0 * g * cosTheta, 1e-4), 1.5));

    float sigma_s = max(m.medium.scattering, 0.0);
    float sigma_a = max(m.medium.absorption, 0.0);
    float sigma_t = sigma_s + sigma_a;
    float thickness = max(m.medium.thickness, 1e-3);
    float transmittance = exp(-sigma_t * thickness);
    vec3 mediumColor = max(m.medium.color, vec3(0.0));

    pdf = max(phase, 1e-4);
    return mediumColor * sigma_s * transmittance * phase;
}

vec3 EvalSubsurfaceClosure(State state, vec3 V, vec3 N, vec3 L, out float pdf, out int flags)
{
    flags = CLOSURE_FLAG_REFLECT | CLOSURE_FLAG_TRANSMIT;

    int diffModel = SelectDiffuseClosureModel(state);
    float pdfDiffuse = 0.0;
    vec3 fDiffuse = EvalDiffuseClosureByModel(state, V, N, L, diffModel, pdfDiffuse);

    float pdfMedium = 0.0;
    vec3 fMedium = EvalMediumPhaseApprox(state, N, L, pdfMedium);

    float sssWeight = clamp(state.mat.subsurface, 0.0, 1.0);
    vec3 f = mix(fDiffuse, fMedium, sssWeight);
    pdf = mix(pdfDiffuse, pdfMedium, sssWeight);
    return f;
}

vec3 SampleSubsurfaceClosure(State state, vec3 V, vec3 N, out vec3 L, out float pdf, out int flags)
{
    flags = CLOSURE_FLAG_REFLECT | CLOSURE_FLAG_TRANSMIT;

    int diffModel = SelectDiffuseClosureModel(state);
    float pdfDiffuse = 0.0;
    vec3 fDiffuse = SampleDiffuseClosureByModel(state, V, N, diffModel, L, pdfDiffuse);

    float pdfMedium = 0.0;
    vec3 fMedium = EvalMediumPhaseApprox(state, N, L, pdfMedium);

    float sssWeight = clamp(state.mat.subsurface, 0.0, 1.0);
    vec3 f = mix(fDiffuse, fMedium, sssWeight);
    pdf = mix(pdfDiffuse, pdfMedium, sssWeight);
    if (pdf <= 0.0)
    {
        pdf = pdfDiffuse;
        return fDiffuse;
    }
    return f;
}

vec3 EvalVolumeClosure(State state, vec3 V, vec3 N, vec3 L, out float pdf, out int flags)
{
    flags = CLOSURE_FLAG_TRANSMIT;
    if (dot(V, L) >= 0.0)
    {
        pdf = 0.0;
        return vec3(0.0);
    }
    return EvalMediumPhaseApprox(state, -N, L, pdf);
}

vec3 SampleVolumeClosure(State state, vec3 V, vec3 N, out vec3 L, out float pdf, out int flags)
{
    flags = CLOSURE_FLAG_TRANSMIT;
    vec3 T, B;
    Onb(-N, T, B);
    vec3 local = UniformSampleSphere(rand(), rand());
    if (local.z > 0.0)
        local.z = -local.z;
    L = normalize(T * local.x + B * local.y + (-N) * abs(local.z));

    vec3 f = EvalMediumPhaseApprox(state, -N, L, pdf);
    if (dot(V, L) >= 0.0)
    {
        pdf = 0.0;
        return vec3(0.0);
    }
    return f;
}

bool HasRuntimeMaterialXClosureContract()
{
    return gMaterialXClosureContractValid != 0;
}

vec3 EvalRuntimeMaterialXClosure(State state, vec3 V, vec3 N, vec3 L, out float pdf, out int flags)
{
    int kind = gMaterialXClosureKind;
    int model = max(gMaterialXClosureModel, 0);
    flags = gMaterialXClosureFlags;

    if (kind == D4_CLOSURE_KIND_GENERIC)
    {
        vec3 f = EvalCompositeMaterialXClosure(state, V, N, L, pdf, flags);
        if (gMaterialXClosureFlags != 0)
            flags = gMaterialXClosureFlags;
        return f;
    }
    if (kind == D4_CLOSURE_KIND_HAIR)
    {
        vec3 f = EvalHairClosure(state, V, N, L, pdf, flags);
        if ((gMaterialXClosureFlags & (CLOSURE_FLAG_REFLECT | CLOSURE_FLAG_TRANSMIT)) != 0)
            flags = gMaterialXClosureFlags;
        return f;
    }
    if (kind == D4_CLOSURE_KIND_SUBSURFACE)
    {
        vec3 f = EvalSubsurfaceClosure(state, V, N, L, pdf, flags);
        if ((gMaterialXClosureFlags & (CLOSURE_FLAG_REFLECT | CLOSURE_FLAG_TRANSMIT)) != 0)
            flags = gMaterialXClosureFlags;
        return f;
    }
    if (kind == D4_CLOSURE_KIND_VOLUME)
    {
        vec3 f = EvalVolumeClosure(state, V, N, L, pdf, flags);
        if ((gMaterialXClosureFlags & (CLOSURE_FLAG_REFLECT | CLOSURE_FLAG_TRANSMIT)) != 0)
            flags = gMaterialXClosureFlags;
        return f;
    }

    if ((flags & (CLOSURE_FLAG_REFLECT | CLOSURE_FLAG_TRANSMIT)) == 0)
        flags |= ClosureFlagsFromDirection(V, L);

    if (!ClosureSupportsDirection(flags, V, L))
    {
        pdf = 0.0;
        return vec3(0.0);
    }

    if (kind == D4_CLOSURE_KIND_DIFFUSE)
        return EvalDiffuseClosureByModel(state, V, N, L, model, pdf);
    if (kind == D4_CLOSURE_KIND_CONDUCTOR)
        return EvalConductorClosureByModel(state, V, N, L, model, pdf);
    if (kind == D4_CLOSURE_KIND_DIELECTRIC)
        return EvalDielectricClosureByModel(state, V, N, L, model, pdf);

    return DisneyEval(state, V, N, L, pdf);
}

vec3 SampleRuntimeMaterialXClosure(State state, vec3 V, vec3 N, out vec3 L, out float pdf, out int flags)
{
    int kind = gMaterialXClosureKind;
    int model = max(gMaterialXClosureModel, 0);
    flags = gMaterialXClosureFlags;

    if (kind == D4_CLOSURE_KIND_GENERIC)
    {
        vec3 f = SampleCompositeMaterialXClosure(state, V, N, L, pdf, flags);
        if (gMaterialXClosureFlags != 0)
            flags = gMaterialXClosureFlags;
        return f;
    }
    if (kind == D4_CLOSURE_KIND_HAIR)
    {
        vec3 f = SampleHairClosure(state, V, N, L, pdf, flags);
        if ((gMaterialXClosureFlags & (CLOSURE_FLAG_REFLECT | CLOSURE_FLAG_TRANSMIT)) != 0)
            flags = gMaterialXClosureFlags;
        return f;
    }
    if (kind == D4_CLOSURE_KIND_SUBSURFACE)
    {
        vec3 f = SampleSubsurfaceClosure(state, V, N, L, pdf, flags);
        if ((gMaterialXClosureFlags & (CLOSURE_FLAG_REFLECT | CLOSURE_FLAG_TRANSMIT)) != 0)
            flags = gMaterialXClosureFlags;
        return f;
    }
    if (kind == D4_CLOSURE_KIND_VOLUME)
    {
        vec3 f = SampleVolumeClosure(state, V, N, L, pdf, flags);
        if ((gMaterialXClosureFlags & (CLOSURE_FLAG_REFLECT | CLOSURE_FLAG_TRANSMIT)) != 0)
            flags = gMaterialXClosureFlags;
        return f;
    }

    vec3 f;
    if (kind == D4_CLOSURE_KIND_DIFFUSE)
        f = SampleDiffuseClosureByModel(state, V, N, model, L, pdf);
    else if (kind == D4_CLOSURE_KIND_CONDUCTOR)
        f = SampleConductorClosureByModel(state, V, N, model, L, pdf);
    else if (kind == D4_CLOSURE_KIND_DIELECTRIC)
        f = SampleDielectricClosureByModel(state, V, N, model, L, pdf);
    else
        f = DisneySample(state, V, N, L, pdf);

    int dirFlag = ClosureFlagsFromDirection(V, L);
    if ((flags & (CLOSURE_FLAG_REFLECT | CLOSURE_FLAG_TRANSMIT)) == 0)
        flags |= dirFlag;

    if ((flags & dirFlag) == 0)
    {
        pdf = 0.0;
        return vec3(0.0);
    }

    return f;
}

#endif // OPT_MATERIALX_RUNTIME

vec3 EvalClosure(State state, vec3 V, vec3 N, vec3 L, out float pdf, out int flags)
{
#ifdef OPT_MATERIALX_RUNTIME
    if (HasRuntimeMaterialXClosureContract())
        return EvalRuntimeMaterialXClosure(state, V, N, L, pdf, flags);
#endif

    vec3 f;
#if 0
    if (IsMostlyDiffuseMaterial(state))
    {
        int model = SelectDiffuseClosureModel(state);
        f = EvalDiffuseClosureByModel(state, V, N, L, model, pdf);
    }
    else if (IsMostlyConductorMaterial(state))
    {
        int model = SelectConductorClosureModel(state);
        f = EvalConductorClosureByModel(state, V, N, L, model, pdf);
    }
    else if (IsMostlyDielectricMaterial(state))
    {
        int model = SelectDielectricClosureModel(state);
        f = EvalDielectricClosureByModel(state, V, N, L, model, pdf);
    }
    else
#endif
    {
        f = DisneyEval(state, V, N, L, pdf);
    }
    flags = ClosureFlagsFromDirection(V, L);
    if (HasEdfClosure(state))
    {
        int edfModel = SelectEdfClosureModel(state);
        // D4.5 socle: expose EDF model routing through closure flags while
        // keeping radiance accumulation in pathtrace.glsl to avoid double counting.
        vec3 edfRadiance = EvalEdfClosureByModel(state, N, L, edfModel);
        if (max(max(edfRadiance.r, edfRadiance.g), edfRadiance.b) > 0.0)
            flags |= CLOSURE_FLAG_EMISSIVE;
    }
    if (length(state.mat.emission) > 0.0)
        flags |= CLOSURE_FLAG_EMISSIVE;
    return f;
}

vec3 SampleClosure(State state, vec3 V, vec3 N, out vec3 L, out float pdf, out int flags)
{
#ifdef OPT_MATERIALX_RUNTIME
    if (HasRuntimeMaterialXClosureContract())
        return SampleRuntimeMaterialXClosure(state, V, N, L, pdf, flags);
#endif

    vec3 f;
#if 0
    if (IsMostlyDiffuseMaterial(state))
    {
        int model = SelectDiffuseClosureModel(state);
        f = SampleDiffuseClosureByModel(state, V, N, model, L, pdf);
    }
    else if (IsMostlyConductorMaterial(state))
    {
        int model = SelectConductorClosureModel(state);
        f = SampleConductorClosureByModel(state, V, N, model, L, pdf);
    }
    else if (IsMostlyDielectricMaterial(state))
    {
        int model = SelectDielectricClosureModel(state);
        f = SampleDielectricClosureByModel(state, V, N, model, L, pdf);
    }
    else
#endif
    {
        f = DisneySample(state, V, N, L, pdf);
    }
    flags = ClosureFlagsFromDirection(V, L);
    if (HasEdfClosure(state))
    {
        int edfModel = SelectEdfClosureModel(state);
        vec3 edfRadiance = EvalEdfClosureByModel(state, N, L, edfModel);
        if (max(max(edfRadiance.r, edfRadiance.g), edfRadiance.b) > 0.0)
            flags |= CLOSURE_FLAG_EMISSIVE;
    }
    if (length(state.mat.emission) > 0.0)
        flags |= CLOSURE_FLAG_EMISSIVE;
    return f;
}

float PdfClosure(State state, vec3 V, vec3 N, vec3 L)
{
    float pdf = 0.0;
    int flags;
    EvalClosure(state, V, N, L, pdf, flags);
    return pdf;
}
