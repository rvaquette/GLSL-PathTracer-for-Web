#include common/gles300.glsl

// OPT_MTLX_GATHER active le dispatch runtime du type de closure dans le code
// genere (PT_CLOSURE_CTX = g_ptClosureType). Requis pour que les appels a
// pt_MtlxLayerStackResponse(CLOSURE_TYPE_INDIRECT/TRANSMISSION, ...) dans
// PathTrace evaluent correctement les closures correspondantes.
// Sans ce define, l'assembleur substitue PT_CLOSURE_CTX = CLOSURE_TYPE_REFLECTION
// et toutes les closures sont evaluees en mode reflexion => noir pour le verre.
#define OPT_MTLX_GATHER

// =============================================================================
//  Hote path tracer pour scenes MaterialX uniquement (sans repli Disney).
//
//  Ce fichier est un HOTE minimal : il fournit la plomberie (acces textures,
//  lumieres, intersection, integrateur recursif NEE/MIS, mode gather) et laisse
//  UN point d'injection ou le code GLSL genere par PathTracerGlslShaderGenerator
//  est colle (via materialxMultiClosure.ts).
//
//  Le code INJECTE (au marqueur /*__PROCEDURAL_MATERIAL_INJECTION__*/) fournit,
//  jusqu'au marqueur // __MTLX_STACK_END__ inclus :
//    - la librairie MaterialX (structs BSDF/EDF/..., fonctions mx_*, NG_*),
//    - le mapping u_env* -> envMap*, u_refractionTwoSided,
//    - les globales geometriques g_pt* et les globales materiau pt_m*,
//    - pt_LoadParams(int matID) + pt_InitMaterialSummary(),
//    - pt_MtlxLayerStackResponse(closureType, L, V, N, P, T, occlusion),
//    - EvalMtlxClosure(matID, State, V, N, L, out pdf, out flags),
//    - SampleMtlxClosure(matID, State, V, N, out L, out pdf, out flags).
//
//  L'hote utilise ces points d'entree directement : aucune reimplementation de
//  closure, aucun repli Disney.
// =============================================================================

#include common/uniforms.glsl
#include common/globals.glsl
#include common/intersection.glsl
#include common/sampling.glsl

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
    return textureLod(envMapTex, uv, 0.0).rgb * envMapIntensity;
}

// =============================================================================
//  POINT D'INJECTION DU MATERIAU GENERE
//
//  Le renderer injecte ici (jusqu'au marqueur // __MTLX_STACK_END__) :
//    lib mx_* + structs + globales g_pt*/materiau + pt_LoadParams +
//    pt_InitMaterialSummary + pt_MtlxLayerStackResponse + mtlxEvalSurface +
//    EvalMtlxClosure + SampleMtlxClosure.
// =============================================================================
/*__PROCEDURAL_MATERIAL_INJECTION__*/

// =============================================================================
//  PREPARATION DU MATERIAU (MaterialX uniquement, pas de repli Disney)
//
//  Charge les parametres du materiau pour le hit courant (pt_LoadParams), calcule
//  le resume de lobe (pt_InitMaterialSummary) et deduit l'eta depuis pt_mIor.
//  Appele par PathTrace avant d'acceder a pt_mEmission ou d'appeler les closures.
// =============================================================================
void pt_PrepareMaterial(inout State state, in Ray r)
{
    g_ptTexcoord = state.texCoord;
    pt_LoadParams(state.matID);
    pt_InitMaterialSummary();
    float safeIor = clamp(pt_mIor, 1.0, 3.0);
    state.eta = dot(r.direction, state.normal) < 0.0 ? (1.0 / safeIor) : safeIor;
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
            vec3 f = EvalMtlxClosure(state.matID, state, V, N, ls.direction, bsdfPdf, flags);
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
//  INTEGRATEUR (path tracing avec rebonds + NEE/MIS)
//
//  A chaque hit :
//    1. Eclairage direct (NEE) par les lumieres de scene.
//    2. Contribution indirecte de l'environnement (CLOSURE_TYPE_INDIRECT) via le
//       code genere : remplace le fond sur miss pour les rayons secondaires.
//    3. Transmission de l'environnement a travers le materiau (CLOSURE_TYPE_TRANSMISSION)
//       pour les materiaux transparents (verres) : donne l'effet de transparence
//       sans attendre que les rebonds recursifs sortent de la scene.
//    4. Rebond BSDF (SampleMtlxClosure) pour les interactions scene-vs-scene.
//  Sur miss primaire (rayon camera ne touchant rien) : fond environnement direct.
//  Sur miss secondaire : couvert par CLOSURE_TYPE_INDIRECT ; aucun fond ajoute.
// =============================================================================
vec3 PathTrace(Ray r)
{
    vec3 radiance   = vec3(0.0);
    vec3 throughput = vec3(1.0);
    bool primaryRay = true;

    for (int depth = 0; depth < maxDepth; depth++)
    {
        State state;
        state.depth = depth;
        state.eta = 1.0;
        LightSampleRec lightSample;

        if (!ClosestHit(r, state, lightSample))
        {
            // Fond sur miss primaire : le ciel visible directement par la camera.
            // Sur miss secondaire, CLOSURE_TYPE_INDIRECT au hit precedent a deja
            // capture la contribution de l'environnement pour ce rebond.
            if (primaryRay || numOfLights == 0)
                radiance += throughput * EvalBackground(r);
            break;
        }
        primaryRay = false;

        pt_PrepareMaterial(state, r);

        vec3 V = -r.direction;
        vec3 N = state.ffnormal;
        vec3 T = state.tangent;

        // (1) Emission de surface.
        radiance += throughput * pt_mEmission;

        // (2) Eclairage direct (NEE + MIS) par les lumieres de scene.
        radiance += throughput * DirectLight(r, state);

        // (3) Contribution indirecte de l'environnement (BRDF * envmap via IBL).
        //     Remplace la contribution de fond que les rebonds recursifs vers
        //     l'environnement auraient apportee ; evite le double-comptage en
        //     n'ajoutant pas de fond sur les miss secondaires.
        radiance += throughput * pt_MtlxLayerStackResponse(
            CLOSURE_TYPE_INDIRECT, vec3(0.0), V, N, state.fhp, T, 1.0);

        // (4) Transmission de l'environnement a travers le materiau.
        //     Pour les verres (pt_mSpecTrans > 0) : donne la transparence vers
        //     l'environnement sans necessiter de rebonds supplementaires.
        //     Pour les opaques : pt_mSpecTrans ~= 0, la reponse est nulle.
        radiance += throughput * pt_MtlxLayerStackResponse(
            CLOSURE_TYPE_TRANSMISSION, vec3(0.0), V, N, state.fhp, T, 1.0);

        // (5) Rebond indirect : echantillonne le BSDF genere (interactions
        //     scene-vs-scene : reflexions et refractions entre objets).
        vec3 L;
        float pdf;
        int flags;
        vec3 f = SampleMtlxClosure(state.matID, state, V, N, L, pdf, flags);
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
#ifdef OPT_LOWRES
    vec2 coordsTile = TexCoords;
    InitRNG(gl_FragCoord.xy, 1);
#else
    vec2 coordsTile = mix(tileOffset, tileOffset + invNumTiles, TexCoords);
    InitRNG(gl_FragCoord.xy, frameNum);
#endif

    // Jitter sous-pixel pour l'anti-aliasing / accumulation temporelle.
    vec2 jitter = (vec2(rand(), rand()) - 0.5) / resolution;
    Ray r = GenerateCameraRay(coordsTile + jitter);

    // Mode path tracer recursif (NEE/MIS, rebonds).
    vec3 pixelColor = PathTrace(r);

    color = vec4(pixelColor, 1.0);

#ifndef OPT_LOWRES
    vec4 accumColor = texture(accumTexture, coordsTile);

    // Sortie lineaire HDR : accumulation + tone-mapping dans une passe separee.
    color += accumColor;
#endif
}
