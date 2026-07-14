#include common/gles300.glsl

// =============================================================================
//  Squelette de path tracer pour un materiau MaterialX (glTF PBR "glass").
//
//  Ce fichier est un HOTE : il fournit la plomberie (acces textures, lumieres,
//  intersection, integrateur recursif NEE/MIS, mode gather) et laisse UN point
//  d'injection ou le code GLSL genere par le C++ est colle.
//
//  Le code INJECTE (par pathtracerRenderer.ts, au marqueur
//  /*__PROCEDURAL_MATERIAL_INJECTION__*/) fournit UNIQUEMENT, apres troncature
//  au marqueur __MTLX_STACK_END__ (voir materialxMultiClosure.ts) :
//    - la librairie MaterialX (structs BSDF/EDF/..., fonctions mx_*, NG_*),
//    - le mapping u_env* -> envMap*, u_refractionTwoSided,
//    - les globales geometriques g_pt* et les globales materiau,
//    - pt_LoadParams(int matID),
//    - vec3 pt_MtlxLayerStackResponse(int closureType, vec3 L, vec3 V, vec3 N,
//                                     vec3 P, vec3 T, float occlusion)
//      = la reponse BSDF (SANS emission) du stack de closures pour un contexte.
//
//  Le present hote fournit tout le reste : EvalMtlxClosure/SampleMtlxClosure
//  (dispatch reflexion/transmission + pdf pour MIS), DirectLight, PathTrace,
//  le mode gather (mtlxShadeGather) et main(). Ces fonctions appellent le
//  pt_MtlxLayerStackResponse injecte.
// =============================================================================

#include common/uniforms.glsl
#include common/globals.glsl
#include common/intersection.glsl
#include common/sampling.glsl
// Modele Disney integre : repli d'ombrage pour les materiaux non-MaterialX
// (ex. un sol standard color/roughness/metallic) afin qu'ils soient eclaires
// par les lumieres de la scene. Toujours actif (garde interne jamais definie).
#include common/disney.glsl

// Mode de rendu.
//  - Defini (OPT_MTLX_GATHER)  : mode "gather" (reproduit la sequence viewer
//                  REFLECTION par lumiere -> INDIRECT -> EMISSION -> TRANSMISSION
//                  en UNE passe, sans rebonds). Utilise pour le preview basse-res.
//  - Non defini  : path tracer recursif (rebonds + NEE/MIS).
//#define OPT_MTLX_GATHER

// Nombre de vec4 par lumiere dans lightsTex.
#define LIGHT_TEX_STRIDE 5

out vec4 color;
in vec2 TexCoords;

// =============================================================================
//  LUMIERES : lecture depuis lightsTex (sampler2D)
//    slot 0 : position.xyz | slot 1 : emission.xyz | slot 2 : u.xyz
//    slot 3 : v.xyz        | slot 4 : radius | area | type
// =============================================================================
Light GetLight(int i)
{
    int base = i * LIGHT_TEX_STRIDE;
    Light l;
    l.position = texelFetch1D(lightsTex, base + 0).xyz;
    l.emission = texelFetch1D(lightsTex, base + 1).xyz;
    l.u        = texelFetch1D(lightsTex, base + 2).xyz;
    l.v        = texelFetch1D(lightsTex, base + 3).xyz;
    vec4 p     = texelFetch1D(lightsTex, base + 4);
    l.radius   = p.x;
    l.area     = p.y;
    l.type     = p.z;
    return l;
}

// =============================================================================
//  INTERSECTION DE LA SCENE (BVH)
// =============================================================================
#include "common/closest_hit.glsl"

#include "common/anyhit.glsl"

// Fond / environnement quand un rayon ne touche rien.
vec3 EvalBackground(Ray r)
{
    float theta = acos(clamp(r.direction.y, -1.0, 1.0));
    vec2 uv = vec2((PI + atan(r.direction.z, r.direction.x)) * INV_TWO_PI, theta * INV_PI) + vec2(envMapRot, 0.0);

    vec3 color = textureLod(envMapTex, uv, 0.0).rgb * envMapIntensity;
    return color;
}

// =============================================================================
//  POINT D'INJECTION DU MATERIAU GENERE
//
//  Le renderer injecte ici (tronque a __MTLX_STACK_END__) :
//    lib mx_* + structs + globales g_pt*/materiau + pt_LoadParams +
//    pt_MtlxLayerStackResponse(closureType, L, V, N, P, T, occlusion).
// =============================================================================
/*__PROCEDURAL_MATERIAL_INJECTION__*/

// =============================================================================
//  POINTS D'ENTREE DU CLOSURE (fournis par l'hote)
//
//  Dispatch par CONTEXTE de closure MaterialX :
//   - REFLECTION   (dot(N,L) > 0) : reponse complete du stack via le
//                   pt_MtlxLayerStackResponse INJECTE (BRDF metal + dielectrique
//                   + sheen + clearcoat + diffus), cosinus deja inclus.
//   - TRANSMISSION (dot(N,L) < 0) : BTDF dielectrique microfacette analytique
//                   (Walter et al.), coherente avec les mx_ggx_* injectes.
//   - INDIRECT : capture par les rebonds tracés (EvalBackground) ; on n'appelle
//                PAS le closure INDIRECT ici (pas de double comptage).
// =============================================================================

vec3 pt_ToLocal(vec3 X, vec3 Y, vec3 Z, vec3 v) { return vec3(dot(v, X), dot(v, Y), dot(v, Z)); }
vec3 pt_ToWorld(vec3 X, vec3 Y, vec3 Z, vec3 v) { return v.x * X + v.y * Y + v.z * Z; }

// The MaterialX closure path below depends entirely on the injected code
// (mx_* library, pt_m* material globals, pt_LoadParams, pt_InitMaterialSummary,
// pt_MtlxLayerStackResponse, CLOSURE_TYPE_*). It is compiled ONLY when a
// MaterialX closure was injected (OPT_MATERIALX). Disney-only scenes skip it and
// shade through the built-in Disney model.
#ifdef OPT_MATERIALX

// Interface materiau MODEL-AGNOSTIQUE. L'hote ne doit PAS dependre des noms de
// parametres propres a un modele de surface (glTF PBR: roughness/metallic/ior...;
// standard_surface: metalness/specular_IOR/...). Il lit le RESUME pt_m* (emis par
// pt_InitMaterialSummary, commun a tous les modeles) + des defauts pour les champs
// non resumes (ior, anisotropie). Le RENDU exact vient de pt_MtlxLayerStackResponse
// (precis, lit les vrais parametres) ; le resume ne sert qu'a l'echantillonnage/pdf.
float pt_Rough()     { return clamp(pt_mRough, 1e-3, 1.0); }
float pt_Metal()     { return clamp(pt_mMetal, 0.0, 1.0); }
float pt_SpecTrans() { return clamp(pt_mSpecTrans, 0.0, 1.0); }
vec3  pt_BaseColor() { return max(pt_mBaseColor, 0.0); }
vec3  pt_TransColor() { return max(pt_mTransColor, 0.0); } // teinte du lobe transmissif (verre/miel)
float pt_Ior()       { return clamp(pt_mIor, 1.0, 3.0); } // vraie IOR du resume

// Rugosite microfacette (roughness_uv anisotrope) issue du resume, pour que la
// pdf d'echantillonnage soit coherente avec la BRDF evaluee.
vec2 pt_MtlxAlpha()
{
    float rs = clamp(pt_Rough() * pt_Rough(), 1e-5, 1.0);
    float a  = clamp(pt_mAnisotropy, 0.0, 0.98);
    if (a > 0.0)
    {
        float aspect = sqrt(1.0 - a);
        return vec2(min(rs / aspect, 1.0), rs * aspect);
    }
    return vec2(rs, rs);
}

// Repere tangent aligne sur l'anisotropie : tangente maillage tournee de
// pt_mAnisoRotDeg (degres, convention du modele, issue du resume) puis projetee
// sur le plan de N, pour que la direction anisotrope de la pdf suive celle du stack.
void pt_MtlxTangentFrame(vec3 N, vec3 tangent, out vec3 T, out vec3 B)
{
    vec3 tan = tangent;
    if (pt_mAnisotropy > 0.0 && abs(pt_mAnisoRotDeg) > 0.0)
    {
        // Rotate the tangent around N by pt_mAnisoRotDeg degrees (Rodrigues,
        // identical to MaterialX mx_rotate_vector3). Inlined here because that
        // helper is only emitted in the injected library when the material
        // actually uses a rotation node, so the host must not depend on it.
        float ang = radians(pt_mAnisoRotDeg);
        float ca = cos(ang), sa = sin(ang);
        vec3 axis = normalize(N);
        vec3 rt = tan * ca + cross(axis, tan) * sa + axis * dot(axis, tan) * (1.0 - ca);
        tan = normalize(rt);
    }
    vec3 t = tan - dot(tan, N) * N;
    if (dot(t, t) < 1e-8) { Onb(N, T, B); return; }
    T = normalize(t);
    B = cross(N, T);
}

// pdf du lobe de reflexion GGX (VNDF), en repere local (V.z>0, L.z>0).
float pt_ReflPdf(vec3 V, vec3 L, vec2 alpha)
{
    if (L.z <= 0.0) return 0.0;
    vec3 H = normalize(V + L);
    if (H.z < 0.0) H = -H;
    float NdotV = max(V.z, 1e-4);
    float G1 = mx_ggx_smith_G1(NdotV, mx_average_alpha(alpha));
    return mx_ggx_VNDF_reflection_PDF(H, alpha, G1, NdotV);
}

// pdf du lobe de refraction microfacette (Walter), repere local (V.z>0, L.z<0).
float pt_TransPdf(vec3 V, vec3 L, vec2 alpha, float eta)
{
    if (L.z >= 0.0) return 0.0;
    vec3 H = normalize(L + V * eta);
    if (H.z < 0.0) H = -H;
    float VdotH = dot(V, H);
    float LdotH = dot(L, H);
    float NdotV = max(V.z, 1e-4);
    float D = mx_ggx_NDF(H, alpha);
    float G1 = mx_ggx_smith_G1(NdotV, mx_average_alpha(alpha));
    float denom = LdotH + VdotH * eta;
    denom *= denom;
    float jacobian = abs(LdotH) / max(denom, 1e-7);
    return G1 * max(0.0, VdotH) * D * jacobian / NdotV;
}

// BTDF dielectrique microfacette (Walter), renvoie f * |NdotL| en local.
vec3 pt_TransBtdf(vec3 V, vec3 L, vec2 alpha, float eta, float F, vec3 tint)
{
    vec3 H = normalize(L + V * eta);
    if (H.z < 0.0) H = -H;
    float VdotH = dot(V, H);
    float LdotH = dot(L, H);
    float NdotV = max(V.z, 1e-4);
    float NdotL = max(-L.z, 1e-4);
    float avgA = mx_average_alpha(alpha);
    float D = mx_ggx_NDF(H, alpha);
    float G2 = mx_ggx_smith_G2(NdotL, NdotV, avgA);
    float denom = LdotH + VdotH * eta;
    denom *= denom;
    float jacobian = abs(LdotH) / max(denom, 1e-7);
    return tint * (1.0 - F) * D * G2 * abs(VdotH) * jacobian * eta * eta / NdotV;
}

// Moitie REFLEXION du lobe dielectrique microfacette (verre), renvoie f * NdotL
// en repere local (V.z>0, L.z>0). Achromatique : la reflexion de Fresnel de
// l'interface air/verre est blanche (non teintee par baseColor). Le stack injecte
// n'emet pas cette contribution pour le lobe transmissif, d'ou son ajout ici.
vec3 pt_ReflBrdf(vec3 V, vec3 L, vec2 alpha, float F)
{
    vec3 H = normalize(V + L);
    if (H.z < 0.0) H = -H;
    float NdotV = max(V.z, 1e-4);
    float NdotL = max(L.z, 1e-4);
    float avgA = mx_average_alpha(alpha);
    float D = mx_ggx_NDF(H, alpha);
    float G2 = mx_ggx_smith_G2(NdotL, NdotV, avgA);
    return vec3(F * D * G2 / (4.0 * NdotV));
}

vec3 EvalMtlxClosure(int matID, State state, vec3 V, vec3 N, vec3 L,
                     out float pdf, out int flags)
{
    pdf = 0.0;

    vec3 T, B;
    pt_MtlxTangentFrame(N, state.tangent, T, B);
    vec3 Vl = pt_ToLocal(T, B, N, V);
    vec3 Ll = pt_ToLocal(T, B, N, L);
    vec2 alpha = pt_MtlxAlpha();

    // eta = ni/nt : 1/ior en entrant dans le milieu, ior en sortant.
    float safeIor = pt_Ior();
    float eta = (dot(V, state.normal) > 0.0) ? (1.0 / safeIor) : safeIor;

    bool reflectSide = Ll.z * Vl.z > 0.0;
    flags = reflectSide ? CLOSURE_FLAG_REFLECT : CLOSURE_FLAG_TRANSMIT;

    // Fresnel au demi-vecteur (probabilites de selection des lobes).
    vec3 H = reflectSide ? normalize(Vl + Ll) : normalize(Ll + Vl * eta);
    if (H.z < 0.0) H = -H;
    float VdotH = abs(dot(Vl, H));
    float F = mx_fresnel_dielectric(VdotH, 1.0 / eta);

    float wSpec  = mix(F, 1.0, pt_Metal());
    float wTrans = (1.0 - pt_Metal()) * pt_SpecTrans() * (1.0 - F);
    float wDiff  = (1.0 - pt_Metal()) * (1.0 - pt_SpecTrans());
    float wSum   = max(wSpec + wTrans + wDiff, 1e-6);
    float pSpec  = wSpec / wSum;
    float pTrans = wTrans / wSum;
    float pDiff  = wDiff / wSum;

    if (reflectSide)
    {
        // REFLECTION : reponse complete du stack MaterialX injecte (BRDF * cos).
        vec3 f = pt_MtlxLayerStackResponse(CLOSURE_TYPE_REFLECTION, L, V, N,
                                           state.fhp, state.tangent, 1.0);
        // Le stack exclut le lobe transmissif : sa reflexion de Fresnel (bord
        // brillant du verre aux angles rasants) est absente. On l'ajoute
        // analytiquement, ponderee par le poids du lobe verre.
        float glassW = pt_SpecTrans() * (1.0 - pt_Metal());
        if (glassW > 0.0)
            f += glassW * pt_ReflBrdf(Vl, Ll, alpha, F);
        pdf = pSpec * pt_ReflPdf(Vl, Ll, alpha) + pDiff * max(Ll.z, 0.0) * INV_PI;
        return f;
    }
    else
    {
        // TRANSMISSION : BTDF dielectrique analytique (vrai rayon refracte).
        // Teinte par la couleur de transmission du modele (transmission_color, ou
        // base color pour gltf/disney). sqrt : la teinte s'applique aux DEUX
        // interfaces (entree+sortie) d'un verre solide.
        vec3 tint = sqrt(pt_TransColor());
        vec3 f = pt_TransBtdf(Vl, Ll, alpha, eta, F, tint);
        pdf = pTrans * pt_TransPdf(Vl, Ll, alpha, eta);
        return f;
    }
}

vec3 SampleMtlxClosure(int matID, State state, vec3 V, vec3 N,
                       out vec3 L, out float pdf, out int flags)
{
    pdf = 0.0;
    flags = 0;

    vec3 T, B;
    pt_MtlxTangentFrame(N, state.tangent, T, B);
    vec3 Vl = pt_ToLocal(T, B, N, V);
    vec2 alpha = pt_MtlxAlpha();

    float safeIor = pt_Ior();
    float eta = (dot(V, state.normal) > 0.0) ? (1.0 / safeIor) : safeIor;

    vec3 H = mx_ggx_importance_sample_VNDF(vec2(rand(), rand()), Vl, alpha);
    if (H.z < 0.0) H = -H;
    float VdotH = abs(dot(Vl, H));
    float F = mx_fresnel_dielectric(VdotH, 1.0 / eta);

    float wSpec  = mix(F, 1.0, pt_Metal());
    float wTrans = (1.0 - pt_Metal()) * pt_SpecTrans() * (1.0 - F);
    float wDiff  = (1.0 - pt_Metal()) * (1.0 - pt_SpecTrans());
    float wSum   = max(wSpec + wTrans + wDiff, 1e-6);
    float pSpec  = wSpec / wSum;
    float pTrans = wTrans / wSum;

    vec3 Ll;
    float u = rand();
    if (u < pSpec)                       // reflexion speculaire
    {
        Ll = reflect(-Vl, H);
    }
    else if (u < pSpec + pTrans)         // refraction
    {
        Ll = refract(-Vl, H, eta);
        if (dot(Ll, Ll) < 1e-8)          // reflexion totale interne -> reflexion
            Ll = reflect(-Vl, H);
    }
    else                                 // diffus
    {
        Ll = CosineSampleHemisphere(rand(), rand());
    }
    Ll = normalize(Ll);

    L = normalize(pt_ToWorld(T, B, N, Ll));
    return EvalMtlxClosure(matID, state, V, N, L, pdf, flags);
}
#endif // OPT_MATERIALX

// =============================================================================
//  AIGUILLAGE DES MATERIAUX (MaterialX vs repli Disney integre)
//
//  Le squelette est un HOTE MaterialX, mais une scene peut contenir des
//  materiaux standard (color/roughness/metallic, type Disney). On lit le type
//  de materiau dans le bloc commun de materialsTex (offset 7, .w) et on aiguille
//  chaque hit : MaterialX -> closure generee ; sinon -> modele Disney integre
//  (disney.glsl), correctement eclaire par les lumieres de la scene.
// =============================================================================
int pt_MaterialType(int matID)
{
    return int(texelFetch1D(materialsTex, matID * MATERIALS_TEX_STRIDE + 7).w + 0.5);
}

// Decode le bloc commun (params Disney) de materialsTex dans state.mat + eta.
// Meme disposition que GetMaterial (common/pathtrace.glsl) ; les cartes de
// texture sont ignorees ici (les materiaux standard vises sont unis).
void pt_LoadDisneyMaterial(inout State state, in Ray r)
{
    int index = state.matID * MATERIALS_TEX_STRIDE;
    Material mat = state.mat;

    vec4 param1 = texelFetch1D(materialsTex, index + 0);
    vec4 param2 = texelFetch1D(materialsTex, index + 1);
    vec4 param3 = texelFetch1D(materialsTex, index + 2);
    vec4 param4 = texelFetch1D(materialsTex, index + 3);
    vec4 param5 = texelFetch1D(materialsTex, index + 4);
    vec4 param6 = texelFetch1D(materialsTex, index + 5);
    vec4 param8 = texelFetch1D(materialsTex, index + 7);

    mat.baseColor          = param1.rgb;
    mat.anisotropic        = param1.w;
    mat.emission           = param2.rgb;
    mat.metallic           = param3.x;
    mat.roughness          = max(param3.y, 0.001);
    mat.subsurface         = param3.z;
    mat.specularTint       = param3.w;
    mat.sheen              = param4.x;
    mat.sheenTint          = param4.y;
    mat.clearcoat          = param4.z;
    mat.clearcoatRoughness = mix(0.1, 0.001, param4.w);
    mat.specTrans          = param5.x;
    mat.ior                = param5.y;
    mat.medium.type        = int(param5.z);
    mat.medium.density     = param5.w;
    mat.medium.color       = param6.rgb;
    mat.medium.anisotropy  = clamp(param6.w, -0.9, 0.9);
    mat.opacity            = param8.x;
    mat.alphaMode          = int(param8.y);
    mat.alphaCutoff        = param8.z;
    mat.materialType       = int(param8.w + 0.5);

    float aspect = sqrt(1.0 - mat.anisotropic * 0.9);
    mat.ax = max(0.001, mat.roughness / aspect);
    mat.ay = max(0.001, mat.roughness * aspect);

    state.mat = mat;
    state.eta = dot(r.direction, state.normal) < 0.0 ? (1.0 / max(mat.ior, 1.001)) : max(mat.ior, 1.001);
}

// Charge le materiau du hit dans la bonne representation et memorise son type.
void pt_PrepareMaterial(inout State state, in Ray r)
{
    int mtype = pt_MaterialType(state.matID);
    state.mat.materialType = mtype;
#ifdef OPT_MATERIALX
    if (mtype == MATERIAL_TYPE_MATERIALX)
    {
        // Coordonnees de texture du hit : indispensables pour que les noeuds
        // image du materiau (base color, roughness, ... textures) echantillonnent
        // le bon texel (sinon tout est lu au texel (0,0)).
        g_ptTexcoord = state.texCoord;
        pt_LoadParams(state.matID);
        pt_InitMaterialSummary();
        float mtlxIor = pt_Ior();
        state.eta = dot(r.direction, state.normal) < 0.0 ? (1.0 / mtlxIor) : mtlxIor;
    }
    else
#endif
    {
        pt_LoadDisneyMaterial(state, r);
    }
}

// Emission de surface selon le type de materiau.
vec3 pt_Emission(State state, Ray r)
{
#ifdef OPT_MATERIALX
    if (state.mat.materialType == MATERIAL_TYPE_MATERIALX)
        return pt_mEmission;
#endif
    return state.mat.emission;
}

// Ponts d'evaluation/echantillonnage : aiguillage runtime par type de materiau.
vec3 pt_EvalClosure(State state, vec3 V, vec3 N, vec3 L, out float pdf, out int flags)
{
#ifdef OPT_MATERIALX
    if (state.mat.materialType == MATERIAL_TYPE_MATERIALX)
        return EvalMtlxClosure(state.matID, state, V, N, L, pdf, flags);
#endif
    flags = 0;
    return DisneyEval(state, V, N, L, pdf);
}

vec3 pt_SampleClosure(State state, vec3 V, vec3 N, out vec3 L, out float pdf, out int flags)
{
#ifdef OPT_MATERIALX
    if (state.mat.materialType == MATERIAL_TYPE_MATERIALX)
        return SampleMtlxClosure(state.matID, state, V, N, L, pdf, flags);
#endif
    flags = 0;
    return DisneySample(state, V, N, L, pdf);
}

// =============================================================================
//  ECLAIRAGE DIRECT (NEE + MIS) via lightsTex
// =============================================================================
vec3 DirectLight(in Ray r, in State state)
{
    vec3 Ld = vec3(0.0);
    if (numOfLights == 0)
        return Ld;

    vec3 V = -r.direction;
    vec3 N = state.ffnormal;
    vec3 scatterPos = state.fhp + N * EPS;

    int idx = min(int(rand() * float(numOfLights)), numOfLights - 1);
    Light light = GetLight(idx);

    LightSampleRec ls;
    SampleOneLight(light, scatterPos, ls);

    if (dot(ls.direction, ls.normal) < 0.0 && ls.pdf > 0.0)
    {
        Ray shadowRay = Ray(scatterPos, ls.direction);
        if (!AnyHit(shadowRay, ls.dist - EPS))
        {
            float bsdfPdf;
            int flags;
            vec3 f = pt_EvalClosure(state, V, N, ls.direction, bsdfPdf, flags);
            if (bsdfPdf > 0.0)
            {
                float misWeight = PowerHeuristic(ls.pdf, bsdfPdf);
                Ld += misWeight * f * ls.emission / max(ls.pdf, EPS);
            }
        }
    }
    return Ld;
}

// =============================================================================
//  MODE GATHER : REFLECTION (par lumiere) -> INDIRECT -> EMISSION -> TRANSMISSION
//                en un seul point de shading (pas de recursion).
// =============================================================================
vec3 pt_LightToDirectional(Light l, vec3 P, out vec3 dir, out float dist)
{
    if (int(l.type) == DISTANT_LIGHT)
    {
        dir  = normalize(l.position);
        dist = INF;
        return l.emission;
    }
    vec3 sp;
    vec3 ln;
    if (int(l.type) == QUAD_LIGHT)
    {
        sp = l.position + l.u * rand() + l.v * rand();
        ln = normalize(cross(l.u, l.v));
    }
    else // SPHERE_LIGHT
    {
        sp = l.position + UniformSampleSphere(rand(), rand()) * l.radius;
        ln = normalize(sp - l.position);
    }
    vec3 d = sp - P;
    dist   = length(d);
    dir    = d / dist;
    float cosL = max(dot(-dir, ln), 0.0);
    return l.emission * (l.area * cosL / max(dist * dist, EPS));
}

#ifdef OPT_MATERIALX
vec3 mtlxShadeGather(State state, Ray r)
{
    vec3 N = normalize(state.ffnormal);
    vec3 T = normalize(state.tangent);
    vec3 V = -r.direction;
    vec3 P = state.fhp;
    vec3 color = vec3(0.0);

    // Opacite de surface (vraie opacite du resume model-agnostique).
    float surfaceOpacity = clamp(pt_mOpacity, 0.0, 1.0);

    // (1) Light loop : REFLECTION par lumiere
    for (int i = 0; i < numOfLights; i++)
    {
        Light l = GetLight(i);
        vec3  Ldir;
        float dist;
        vec3  intensity = pt_LightToDirectional(l, P, Ldir, dist);

        float occ = 1.0;
        Ray sray = Ray(P + N * EPS, Ldir);
        if (AnyHit(sray, dist - 2.0 * EPS)) occ = 0.0;

        vec3 resp = pt_MtlxLayerStackResponse(CLOSURE_TYPE_REFLECTION, Ldir, V, N, P, T, occ);
        color += intensity * resp;
    }

    // (2) INDIRECT : environnement.
    //  L'envmap n'est utilisee comme SOURCE DE LUMIERE que s'il n'y a pas de
    //  lumiere analytique dans la scene. Des qu'une lumiere existe, elle prime
    //  et l'eclairage/les reflets d'environnement sont desactives.
    if (numOfLights == 0)
        color += pt_MtlxLayerStackResponse(CLOSURE_TYPE_INDIRECT, vec3(0.0), V, N, P, T, 1.0);

    // (3) EMISSION (resume model-agnostique pt_mEmission, sans re-evaluer la closure)
    color += pt_mEmission;

    // (4) TRANSMISSION : refraction basee sur l'environnement (meme regle : la
    //  refraction de l'envmap n'est prise en compte que sans lumiere analytique).
    if (numOfLights == 0)
        color += pt_MtlxLayerStackResponse(CLOSURE_TYPE_TRANSMISSION, vec3(0.0), V, N, P, T, 1.0);

    color *= surfaceOpacity;
    return color;
}
#endif // OPT_MATERIALX

// Version gather pour les materiaux Disney : eclairage direct par les lumieres
// (BRDF Disney, cosinus inclus) + emission. L'environnement n'est pas
// echantillonne ici (repli preview) ; le mode recursif reste la voie complete.
vec3 disneyShadeGather(State state, Ray r)
{
    vec3 N = state.ffnormal;
    vec3 V = -r.direction;
    vec3 P = state.fhp;
    vec3 col = state.mat.emission;

    for (int i = 0; i < numOfLights; i++)
    {
        Light l = GetLight(i);
        vec3  Ldir;
        float dist;
        vec3  intensity = pt_LightToDirectional(l, P, Ldir, dist);
        if (dot(Ldir, N) <= 0.0) continue;

        Ray sray = Ray(P + N * EPS, Ldir);
        if (AnyHit(sray, dist - 2.0 * EPS)) continue;

        float pdf;
        vec3 f = DisneyEval(state, V, N, Ldir, pdf);
        col += intensity * f;
    }
    return col;
}

// =============================================================================
//  INTEGRATEUR (path tracing avec rebonds)
// =============================================================================
vec3 PathTrace(Ray r)
{
    vec3 radiance   = vec3(0.0);
    vec3 throughput = vec3(1.0);

    for (int depth = 0; depth < maxDepth; depth++)
    {
        State state;
        state.depth = depth;
        state.eta = 1.0;
        LightSampleRec lightSample;

        if (!ClosestHit(r, state, lightSample))
        {
            // L'envmap (fond + eclairage) n'est utilisee QUE s'il n'y a aucune
            // lumiere analytique. Des qu'une lumiere existe, l'envmap est
            // totalement ignoree : fond noir, eclairage par les lumieres seules.
            if (numOfLights == 0)
                radiance += throughput * EvalBackground(r);
            break;
        }

        // Charge le materiau du hit (MaterialX injecte OU repli Disney) et
        // memorise son type pour l'aiguillage des closures.
        pt_PrepareMaterial(state, r);

        // Emission de surface (selon le type de materiau).
        radiance += throughput * pt_Emission(state, r);

        // Eclairage direct (NEE).
        radiance += throughput * DirectLight(r, state);

        // Rebond indirect : echantillonne le BSDF (aiguille par type).
        vec3 L;
        float pdf;
        int flags;
        vec3 f = pt_SampleClosure(state, -r.direction, state.ffnormal, L, pdf, flags);
        if (pdf <= 0.0)
            break;

        throughput *= f / pdf;

        // Roulette russe.
        if (depth > 2)
        {
            float q = max(throughput.x, max(throughput.y, throughput.z));
            if (rand() > q)
                break;
            throughput /= max(q, EPS);
        }

        r.origin = state.fhp + L * EPS;
        r.direction = L;
    }
    return radiance;
}

// =============================================================================
//  GENERATION DU RAYON PRIMAIRE + main()
// =============================================================================
Ray GenerateCameraRay(vec2 uv)
{
    vec2 ndc = uv * 2.0 - 1.0;
    float aspect = resolution.x / resolution.y;
    float t = tan(camera.fov * 0.5);
    vec3 dir = normalize(camera.forward
                       + camera.right * (ndc.x * t * aspect)
                       + camera.up    * (ndc.y * t));
    return Ray(camera.position, dir);
}

void main()
{
#ifdef OPT_MTLX_GATHER
    vec2 coordsTile = TexCoords;
    InitRNG(gl_FragCoord.xy, 1);
#else
    vec2 coordsTile = mix(tileOffset, tileOffset + invNumTiles, TexCoords);
    InitRNG(gl_FragCoord.xy, frameNum);
#endif

    // Jitter sous-pixel pour l'anti-aliasing / accumulation temporelle.
    vec2 jitter = (vec2(rand(), rand()) - 0.5) / resolution;
    Ray r = GenerateCameraRay(coordsTile + jitter);

#ifdef OPT_MTLX_GATHER
/*
    // Mode gather : un seul point de shading.
    vec3 pixelColor;
    State state;
    state.depth = 0;
    state.eta = 1.0;
    LightSampleRec lightSample;
    if (ClosestHit(r, state, lightSample))
    {
        pt_PrepareMaterial(state, r);
        if (state.mat.materialType == MATERIAL_TYPE_MATERIALX)
            pixelColor = mtlxShadeGather(state, r);
        else
            pixelColor = disneyShadeGather(state, r);
    }
    else
    {
        // Fond envmap uniquement sans lumiere analytique ; sinon fond noir.
        pixelColor = (numOfLights == 0) ? EvalBackground(r) : vec3(0.0);
    }
*/

    // Mode path tracer recursif.
    vec3 pixelColor = PathTrace(r);
    color = vec4(pixelColor, 1.0);
#else
    // Mode path tracer recursif.
    vec3 pixelColor = PathTrace(r);

    vec4 accumColor = texture(accumTexture, coordsTile);

    // Sortie lineaire HDR : accumulation + tone-mapping dans une passe separee.
    color = vec4(pixelColor, 1.0) + accumColor;
#endif
}
