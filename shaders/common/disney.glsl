/*
 * MIT License
 *
 * Copyright(c) 2019 Asif Ali
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

 /* References:
 * [1] [Physically Based Shading at Disney] https://media.disneyanimation.com/uploads/production/publication_asset/48/asset/s2012_pbs_disney_brdf_notes_v3.pdf
 * [2] [Extending the Disney BRDF to a BSDF with Integrated Subsurface Scattering] https://blog.selfshadow.com/publications/s2015-shading-course/burley/s2015_pbs_disney_bsdf_notes.pdf
 * [3] [The Disney BRDF Explorer] https://github.com/wdas/brdf/blob/main/src/brdfs/disney.brdf
 * [4] [Miles Macklin's implementation] https://github.com/mmacklin/tinsel/blob/master/src/disney.h
 * [5] [Simon Kallweit's project report] http://simon-kallweit.me/rendercompo2015/report/
 * [6] [Microfacet Models for Refraction through Rough Surfaces] https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.pdf
 * [7] [Sampling the GGX Distribution of Visible Normals] https://jcgt.org/published/0007/04/01/paper.pdf
 * [8] [Pixar's Foundation for Materials] https://graphics.pixar.com/library/PxrMaterialsCourse2017/paper.pdf
 * [9] [Mitsuba 3] https://github.com/mitsuba-renderer/mitsuba3
 */

#include "sss.glsl"
#include "thinfilm.glsl"
#include "hair.glsl"

vec3 DisneyEval(State state, vec3 V, vec3 N, vec3 L, out float pdf);

vec3 ToWorld(vec3 X, vec3 Y, vec3 Z, vec3 V)
{
    return V.x * X + V.y * Y + V.z * Z;
}

vec3 ToLocal(vec3 X, vec3 Y, vec3 Z, vec3 V)
{
    return vec3(dot(V, X), dot(V, Y), dot(V, Z));
}

void TintColors(Material mat, float eta, out float F0, out vec3 Csheen, out vec3 Cspec0)
{
    float lum = Luminance(mat.baseColor);
    vec3 ctint = lum > 0.0 ? mat.baseColor / lum : vec3(1.0);

    F0 = (1.0 - eta) / (1.0 + eta);
    F0 *= F0;
    
    // Legacy Disney materials: specularColor defaults to white and specularTint drives ctint blending.
    // OpenPBR/modern loaders explicitly set specularTint = 0, so specularColor is used as-is.
    vec3 specColorBase = max(mat.specularColor, vec3(0.0));
    Cspec0 = F0 * mix(specColorBase, specColorBase * ctint, mat.specularTint);
    vec3 legacySheenTint = mix(vec3(1.0), ctint, mat.sheenTint);

    // Explicit OpenPBR fuzz_color is transported via fuzzColor.
    // Sentinel (< 0) means legacy materials should keep sheenTint behavior.
    bool hasExplicitFuzzColor = min(mat.fuzzColor.r, min(mat.fuzzColor.g, mat.fuzzColor.b)) >= 0.0;
    Csheen = hasExplicitFuzzColor ? max(mat.fuzzColor, vec3(0.0)) : legacySheenTint;
}

vec3 EvalDisneyDiffuse(State state, vec3 Csheen, vec3 V, vec3 N, vec3 L, vec3 H, out float pdf)
{
    pdf = 0.0;
    if (L.z <= 0.0)
        return vec3(0.0);

    float LDotH = dot(L, H);

    Material mat = state.mat;
    float Rr = 2.0 * mat.roughness * LDotH * LDotH;

    // Diffuse
    float FL = SchlickWeight(L.z);
    float FV = SchlickWeight(V.z);
    float Fretro = Rr * (FL + FV + FL * FV * (Rr - 1.0));
    float Fd = (1.0 - 0.5 * FL) * (1.0 - 0.5 * FV);

    // OpenPBR-like base_diffuse_roughness using a canonical Oren-Nayar model.
    float diffuseRoughness = clamp(mat.baseDiffuseRoughness, 0.0, 1.0);
    float nDotL = max(0.0, L.z);
    float nDotV = max(0.0, V.z);

    float sigma = diffuseRoughness * 1.57079632679;
    float sigma2 = sigma * sigma;
    float A = 1.0 - (sigma2 / (2.0 * (sigma2 + 0.33)));
    float B = 0.45 * sigma2 / (sigma2 + 0.09);

    float sinThetaL = sqrt(max(0.0, 1.0 - nDotL * nDotL));
    float sinThetaV = sqrt(max(0.0, 1.0 - nDotV * nDotV));

    float maxCos = 0.0;
    if (sinThetaL > 1e-5 && sinThetaV > 1e-5) {
        vec3 Lp = normalize(vec3(L.x, L.y, 0.0));
        vec3 Vp = normalize(vec3(V.x, V.y, 0.0));
        maxCos = max(0.0, dot(Lp, Vp));
    }

    float sinAlpha;
    float tanBeta;
    if (nDotL > nDotV) {
        sinAlpha = sinThetaV;
        tanBeta = sinThetaL / max(nDotL, 1e-5);
    } else {
        sinAlpha = sinThetaL;
        tanBeta = sinThetaV / max(nDotV, 1e-5);
    }

    float orenNayar = A + B * maxCos * sinAlpha * tanBeta;
    float diffuseTerm = mix(Fd + Fretro, orenNayar, diffuseRoughness);

    // SSS
    float ssPdf = 0.0;
    vec3 sss = computeSSS(state, V, N, L, ssPdf);

    // Fake subsurface fallback when volumetric SSS is disabled
    float Fss90 = 0.5 * Rr;
    float Fss = mix(1.0, Fss90, FL) * mix(1.0, Fss90, FV);
    float ss = 1.25 * (Fss * (1.0 / (L.z + V.z) - 0.5) + 0.5);


    // Velvet/Fuzz (Estevez-Kulla 2017)
    float sinThetaH = sqrt(max(0.0, 1.0 - H.z * H.z));
    float fuzzRoughness = clamp(mat.fuzzRoughness, 1e-3, 1.0);
    float D_velvet = (2.0 + 1.0/fuzzRoughness) * pow(sinThetaH, 1.0/fuzzRoughness) / TWO_PI;
    vec3 Fsheen = mat.sheen * Csheen * D_velvet;

    pdf = L.z * INV_PI;
    vec3 base = INV_PI * mat.baseColor * diffuseTerm;

    // If volumetric SSS is unavailable (disabled mode or invalid medium),
    // keep the fake subsurface fallback to avoid darkening when subsurface > 0.
    bool useVolumetricSSS = (SSS_MODE != 0) && (ssPdf > 0.0);
    vec3 outColor = useVolumetricSSS
        ? (mix(base, sss, mat.subsurface) + Fsheen)
        : (INV_PI * mat.baseColor * mix(diffuseTerm, ss, mat.subsurface) + Fsheen);
    return outColor;
}

vec3 EvalMicrofacetReflection(Material mat, vec3 V, vec3 L, vec3 H, vec3 F, out float pdf)
{
    pdf = 0.0;
    if (L.z <= 0.0)
        return vec3(0.0);

    float D = GTR2Aniso(H.z, H.x, H.y, mat.ax, mat.ay);
    float G1 = SmithGAniso(abs(V.z), V.x, V.y, mat.ax, mat.ay);
    float G2 = G1 * SmithGAniso(abs(L.z), L.x, L.y, mat.ax, mat.ay);

    pdf = G1 * D / (4.0 * V.z);
    return F * D * G2 / (4.0 * L.z * V.z);
}

vec3 EvalMicrofacetRefraction(Material mat, float eta, vec3 V, vec3 L, vec3 H, vec3 F, out float pdf)
{
    pdf = 0.0;
    if (L.z >= 0.0)
        return vec3(0.0);


    // Dispersion chromatique (Cauchy/Abbe)
    float etaEff = (mat.thinWalled > 0.5) ? 1.0 : eta;
    #ifdef OPENPBR_DISPERSION
    if (mat.dispersionScale > 0.0 && mat.abbeNumber > 0.0) {
        // Choix du canal RGB aléatoire
        float r_disp = rand();
        float dIOR = mat.dispersionScale * etaEff / mat.abbeNumber;
        float iorR = etaEff + dIOR * 0.5;   // rouge = IOR faible
        float iorG = etaEff;                // vert  = IOR moyen
        float iorB = etaEff - dIOR * 0.5;   // bleu  = IOR fort
        if (r_disp < 0.333) etaEff = iorR;
        else if (r_disp < 0.666) etaEff = iorG;
        else etaEff = iorB;
    }
    #endif

    float LDotH = dot(L, H);
    float VDotH = dot(V, H);

    // transmission_extra_roughness: per-lobe roughness offset for refraction only.
    // Reconstruct base roughness from ax/ay (roughness^2 = ax*ay), then apply delta.
    float baseRgh = sqrt(mat.ax * mat.ay);
    float refrRgh = clamp(baseRgh + mat.transmissionExtraRoughness, 0.001, 1.0);
    float refrScale = refrRgh / max(baseRgh, 0.001);
    float refrAx = clamp(mat.ax * refrScale, 0.001, 1.0);
    float refrAy = clamp(mat.ay * refrScale, 0.001, 1.0);

    float D = GTR2Aniso(H.z, H.x, H.y, refrAx, refrAy);
    float G1 = SmithGAniso(abs(V.z), V.x, V.y, refrAx, refrAy);
    float G2 = G1 * SmithGAniso(abs(L.z), L.x, L.y, refrAx, refrAy);
    float denom = LDotH + VDotH * etaEff;
    denom *= denom;
    float eta2 = etaEff * etaEff;
    float jacobian = abs(LDotH) / denom;

    pdf = G1 * max(0.0, VDotH) * D * jacobian / V.z;

    // OpenPBR behavior: transmission tint is driven by transmissionColor,
    // independent from baseColor.
    vec3 transmissionTint = max(mat.transmissionColor, vec3(0.0));

    return transmissionTint * (1.0 - F) * D * G2 * abs(VDotH) * jacobian * eta2 / abs(L.z * V.z);
}

vec3 EvalClearcoat(Material mat, vec3 V, vec3 L, vec3 H, out float pdf)
{
    pdf = 0.0;
    if (L.z <= 0.0)
        return vec3(0.0);

    float VDotH = dot(V, H);

    float coatEta = max(mat.coatIOR, 1.01);
    float coatF0 = (coatEta - 1.0) / (coatEta + 1.0);
    coatF0 *= coatF0;

    float F = mix(coatF0, 1.0, SchlickWeight(abs(VDotH)));
    float D = GTR2Aniso(H.z, H.x, H.y, mat.coatAx, mat.coatAy);
    float G1 = SmithGAniso(abs(V.z), V.x, V.y, mat.coatAx, mat.coatAy);
    float G2 = G1 * SmithGAniso(abs(L.z), L.x, L.y, mat.coatAx, mat.coatAy);

    pdf = G1 * D / (4.0 * max(V.z, 1e-5));

    // OpenPBR-like coat_color behavior: tint at normal incidence, white at grazing.
    vec3 coatTint = max(mat.coatColor, vec3(0.0));
    float fresnelWeight = clamp((F - coatF0) / max(1.0 - coatF0, 1e-5), 0.0, 1.0);
    vec3 Fcoat = mix(coatF0 * coatTint, vec3(1.0), fresnelWeight);

    return Fcoat * D * G2 / max(4.0 * L.z * V.z, 1e-5);
}

vec3 DisneySample(State state, vec3 V, vec3 N, out vec3 L, out float pdf)
{
    pdf = 0.0;

    // Hair BSDF shortcut
    if (state.mat.materialType > 0.5) {
        return SampleHair(state, V, N, L, pdf);
    }

    float r1 = rand();
    float r2 = rand();

    // TODO: Tangent and bitangent should be calculated from mesh (provided, the mesh has proper uvs)
    vec3 T, B;
    Onb(N, T, B);

    // Anisotropy rotation: rotate tangent frame by anisotropyRotation before transforming to shading space
    float sinR = sin(state.mat.anisotropyRotation * TWO_PI);
    float cosR = cos(state.mat.anisotropyRotation * TWO_PI);
    vec3 Tr = cosR * T + sinR * B;
    vec3 Br = -sinR * T + cosR * B;

    // Transform to shading space to simplify operations (NDotL = L.z; NDotV = V.z; NDotH = H.z)
    V = ToLocal(Tr, Br, N, V);

    // Tint colors
    vec3 Csheen, Cspec0;
    float F0;
    TintColors(state.mat, state.eta, F0, Csheen, Cspec0);

    // Model weights
    float baseWt = clamp(state.mat.baseWeight, 0.0, 1.0);
    float dielectricWt = baseWt * (1.0 - state.mat.metallic) * (1.0 - state.mat.specTrans);
    float metalWt = baseWt * state.mat.metallic;
    float glassWt = baseWt * (1.0 - state.mat.metallic) * state.mat.specTrans;

    // Lobe probabilities
    float schlickWt = SchlickWeight(V.z);

    float diffPr = dielectricWt * Luminance(state.mat.baseColor);
    float dielectricPr = dielectricWt * Luminance(mix(Cspec0, vec3(1.0), schlickWt)) * state.mat.specularWeight;
    float metalPr = metalWt * Luminance(mix(state.mat.baseColor, vec3(1.0), schlickWt));
    float F0Glass = (1.0 - state.eta) / (1.0 + state.eta);
    F0Glass *= F0Glass;
    vec3 Cglass0 = F0Glass * max(state.mat.specularColor, vec3(0.0));
    float glassPr = glassWt * max(Luminance(mix(Cglass0, vec3(1.0), schlickWt)), 1e-4);
    float clearCtPr = 0.25 * state.mat.clearcoat;

    // Normalize probabilities
    float invTotalWt = 1.0 / (diffPr + dielectricPr + metalPr + glassPr + clearCtPr);
    diffPr *= invTotalWt;
    dielectricPr *= invTotalWt;
    metalPr *= invTotalWt;
    glassPr *= invTotalWt;
    clearCtPr *= invTotalWt;

    // CDF of the sampling probabilities
    float cdf[5];
    cdf[0] = diffPr;
    cdf[1] = cdf[0] + dielectricPr;
    cdf[2] = cdf[1] + metalPr;
    cdf[3] = cdf[2] + glassPr;
    cdf[4] = cdf[3] + clearCtPr;

    // Sample a lobe based on its importance
    float r3 = rand();

    if (r3 < cdf[0]) // Diffuse
    {
        L = CosineSampleHemisphere(r1, r2);
    }
    else if (r3 < cdf[2]) // Dielectric + Metallic reflection
    {
        vec3 H = SampleGGXVNDF(V, state.mat.ax, state.mat.ay, r1, r2);

        if (H.z < 0.0)
            H = -H;

        L = normalize(reflect(-V, H));
    }
    else if (r3 < cdf[3]) // Glass
    {
        vec3 H = SampleGGXVNDF(V, state.mat.ax, state.mat.ay, r1, r2);
        float etaEff = (state.mat.thinWalled > 0.5) ? 1.0 : state.eta;
        float F = DielectricFresnel(abs(dot(V, H)), etaEff);

        if (H.z < 0.0)
            H = -H;

        // Rescale random number for reuse
        r3 = (r3 - cdf[2]) / (cdf[3] - cdf[2]);

        // Reflection
        if (r3 < F)
        {
            L = normalize(reflect(-V, H));
        }
        else // Transmission
        {
            L = normalize(refract(-V, H, etaEff));
        }
    }
    else // Clearcoat
    {
        // Apply coat rotation delta (coatAnisotropyRotation relative to base anisotropyRotation)
        float coatDelta = (state.mat.coatAnisotropyRotation - state.mat.anisotropyRotation) * TWO_PI;
        float sinC = sin(coatDelta);
        float cosC = cos(coatDelta);
        vec3 Vc = vec3(cosC * V.x - sinC * V.y, sinC * V.x + cosC * V.y, V.z);
        vec3 H = SampleGGXVNDF(Vc, state.mat.coatAx, state.mat.coatAy, r1, r2);

        if (H.z < 0.0)
            H = -H;

        // Sample L in coat space then rotate back to base shading space
        vec3 Lc = normalize(reflect(-Vc, H));
        L = vec3(cosC * Lc.x + sinC * Lc.y, -sinC * Lc.x + cosC * Lc.y, Lc.z);
    }

    L = ToWorld(Tr, Br, N, L);
    V = ToWorld(Tr, Br, N, V);

    return DisneyEval(state, V, N, L, pdf);
}

vec3 DisneyEval(State state, vec3 V, vec3 N, vec3 L, out float pdf)
{
    pdf = 0.0;
    vec3 f = vec3(0.0);

    // Hair BSDF shortcut
    if (state.mat.materialType > 0.5) {
        return EvalHair(state, V, N, L, pdf);
    }

    // TODO: Tangent and bitangent should be calculated from mesh (provided, the mesh has proper uvs)
    vec3 T, B;
    Onb(N, T, B);

    // Anisotropy rotation: rotate tangent frame by anisotropyRotation before transforming to shading space
    float sinR = sin(state.mat.anisotropyRotation * TWO_PI);
    float cosR = cos(state.mat.anisotropyRotation * TWO_PI);
    vec3 Tr = cosR * T + sinR * B;
    vec3 Br = -sinR * T + cosR * B;

    // Transform to shading space to simplify operations (NDotL = L.z; NDotV = V.z; NDotH = H.z)
    V = ToLocal(Tr, Br, N, V);
    L = ToLocal(Tr, Br, N, L);

    vec3 H;
    float etaEff = (state.mat.thinWalled > 0.5) ? 1.0 : state.eta;
    if (L.z > 0.0)
        H = normalize(L + V);
    else
        H = normalize(L + V * etaEff);

    if (H.z < 0.0)
        H = -H;

    // Tint colors
    vec3 Csheen, Cspec0;
    float F0;
    TintColors(state.mat, state.eta, F0, Csheen, Cspec0);

    // Model weights
    float baseWt = clamp(state.mat.baseWeight, 0.0, 1.0);
    float dielectricWt = baseWt * (1.0 - state.mat.metallic) * (1.0 - state.mat.specTrans);
    float metalWt = baseWt * state.mat.metallic;
    float glassWt = baseWt * (1.0 - state.mat.metallic) * state.mat.specTrans;

    // Lobe probabilities
    float schlickWt = SchlickWeight(V.z);

    float diffPr = dielectricWt * Luminance(state.mat.baseColor);
    float dielectricPr = dielectricWt * Luminance(mix(Cspec0, vec3(1.0), schlickWt)) * state.mat.specularWeight;
    float metalPr = metalWt * Luminance(mix(state.mat.baseColor, vec3(1.0), schlickWt));
    float F0Glass = (1.0 - state.eta) / (1.0 + state.eta);
    F0Glass *= F0Glass;
    vec3 Cglass0 = F0Glass * max(state.mat.specularColor, vec3(0.0));
    float glassPr = glassWt * max(Luminance(mix(Cglass0, vec3(1.0), schlickWt)), 1e-4);
    float clearCtPr = 0.25 * state.mat.clearcoat;

    // Normalize probabilities
    float invTotalWt = 1.0 / (diffPr + dielectricPr + metalPr + glassPr + clearCtPr);
    diffPr *= invTotalWt;
    dielectricPr *= invTotalWt;
    metalPr *= invTotalWt;
    glassPr *= invTotalWt;
    clearCtPr *= invTotalWt;

    bool reflect = L.z * V.z > 0.;

    float tmpPdf = 0.0;
    float VDotH = abs(dot(V, H));

    // Diffuse
    if (diffPr > 0.0 && reflect)
    {
        f += EvalDisneyDiffuse(state, Csheen, V, N, L, H, tmpPdf) * dielectricWt;
        pdf += tmpPdf * diffPr;
    }

    // Dielectric Reflection
    if (dielectricPr > 0.0 && reflect)
    {
        // Normalize for interpolating based on Cspec0
        float F = (DielectricFresnel(VDotH, 1.0 / state.mat.ior) - F0) / (1.0 - F0);

        // --- Thin Film / Iridescence (étape 9 OpenPBR) ---
        vec3 iridescence = vec3(1.0);
        if (state.mat.thinFilmWeight > 0.001 && state.mat.thinFilmThickness > 0.0)
        {
#ifdef OPT_THINFILM_LUT
            iridescence = thinFilmFresnelLUT(
                thinFilmLutTex,
                state.mat.thinFilmThickness,
                state.mat.thinFilmIor,
                VDotH
            );
#else
            iridescence = thinFilmFresnel(
                state.mat.thinFilmThickness,
                state.mat.thinFilmIor,
                1.0,
                state.mat.ior,
                VDotH
            );
#endif
            iridescence = mix(vec3(1.0), iridescence, state.mat.thinFilmWeight);
        }
        f += EvalMicrofacetReflection(state.mat, V, L, H, mix(Cspec0, vec3(1.0), F) * iridescence, tmpPdf) * dielectricWt * state.mat.specularWeight;
        pdf += tmpPdf * dielectricPr;
    }

    // Metallic Reflection
    if (metalPr > 0.0 && reflect)
    {
        // Tinted to base color
        vec3 F = mix(state.mat.baseColor, vec3(1.0), SchlickWeight(VDotH));

        f += EvalMicrofacetReflection(state.mat, V, L, H, F, tmpPdf) * metalWt;
        pdf += tmpPdf * metalPr;
    }

    // Glass/Specular BSDF
    if (glassPr > 0.0)
    {
        // Dielectric fresnel (achromatic)
        float F = DielectricFresnel(VDotH, etaEff);

        if (reflect)
        {
            // OpenPBR-like specular_color behavior for transmission reflection:
            // tint near normal incidence, converge to white at grazing angles.
            float F0Glass = (1.0 - etaEff) / (1.0 + etaEff);
            F0Glass *= F0Glass;
            float fresnelWeight = clamp((F - F0Glass) / max(1.0 - F0Glass, 1e-5), 0.0, 1.0);
            vec3 FGlass = mix(F0Glass * max(state.mat.specularColor, vec3(0.0)), vec3(1.0), fresnelWeight);

            f += EvalMicrofacetReflection(state.mat, V, L, H, FGlass, tmpPdf) * glassWt;
            pdf += tmpPdf * glassPr * F;
        }
        else
        {
            f += EvalMicrofacetRefraction(state.mat, etaEff, V, L, H, vec3(F), tmpPdf) * glassWt;
            pdf += tmpPdf * glassPr * (1.0 - F);
        }
    }

    // Clearcoat
    if (clearCtPr > 0.0 && reflect)
    {
        // Apply coat rotation delta in shading space for independent coat anisotropy orientation
        float coatDelta = (state.mat.coatAnisotropyRotation - state.mat.anisotropyRotation) * TWO_PI;
        float sinC = sin(coatDelta);
        float cosC = cos(coatDelta);
        vec3 Vc = vec3(cosC * V.x - sinC * V.y, sinC * V.x + cosC * V.y, V.z);
        vec3 Lc = vec3(cosC * L.x - sinC * L.y, sinC * L.x + cosC * L.y, L.z);

        float coatVDotH = abs(dot(Vc, H));
        float coatEta = max(state.mat.coatIOR, 1.01);
        float coatF0 = (coatEta - 1.0) / (coatEta + 1.0);
        coatF0 *= coatF0;
        float coatFresnel = mix(coatF0, 1.0, SchlickWeight(coatVDotH));
        float coatDark = mix(1.0, (1.0 - coatFresnel) * (1.0 - coatFresnel), state.mat.clearcoat * state.mat.coatDarkening);

        vec3 Hc = (Lc.z >= 0.0) ? normalize(Lc + Vc) : normalize(Lc + Vc * etaEff);
        if (Hc.z < 0.0) Hc = -Hc;

        f *= coatDark;
        f += EvalClearcoat(state.mat, Vc, Lc, Hc, tmpPdf) * 0.25 * state.mat.clearcoat;
        pdf += tmpPdf * clearCtPr;
    }

    return f * abs(L.z);
}