#include common/gles300.glsl

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
#include common/envmap.glsl

// Nombre de vec4 par lumiere dans lightsTex.
#define LIGHT_TEX_STRIDE 5

out vec4 color;
in vec2 TexCoords;

// Mode preview basse resolution, pilote par UNIFORM (et non plus par #define
// OPT_LOWRES) : le meme programme sert la passe pleine resolution (accumulation
// tuilee) et la passe preview mono-echantillon. Cela evite de compiler deux fois
// le lourd closure MaterialX injecte (un seul programme partage).
uniform bool uLowRes;

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
    // MaterialX procedural texcoord/geomprop UV0 nodes expect the authored V
    // (origin top-left); state.texCoord.y is stored GL-flipped (1 - authoredV) by
    // the glTF loader for direct GL texture sampling, so hand MaterialX the
    // un-flipped V. Image nodes re-flip via fileTextureVerticalFlip (generator).
    g_ptTexcoord = vec2(state.texCoord.x, 1.0 - state.texCoord.y);
    pt_LoadParams(state.matID);
    pt_InitMaterialSummary();
    float safeIor = clamp(pt_mIor, 1.0, 3.0);
    state.eta = dot(r.direction, state.normal) < 0.0 ? (1.0 / safeIor) : safeIor;
}

// =============================================================================
//  ECLAIRAGE DIRECT (NEE + MIS) : importance sampling de l'environnement et des
//  lumieres analytiques, evalue via la closure MaterialX generee. Reprend la
//  logique de shaders/common/pathtrace.glsl (DirectLight) adaptee au host
//  MaterialX (EvalMtlxClosure au lieu du pont de closures Disney).
// =============================================================================
vec3 DirectLight(in Ray r, in State state)
{
    vec3 Ld = vec3(0.0);
    vec3 V = -r.direction;
    vec3 N = state.ffnormal;
    vec3 scatterPos = state.fhp + N * EPS;
    float bsdfPdf;
    int flags;

    // Lumiere d'environnement (importance sampling de l'envmap).
#ifdef OPT_ENVMAP
#ifndef OPT_UNIFORM_LIGHT
    {
        vec3 Li;
        vec4 dirPdf = SampleEnvMap(Li);
        vec3 lightDir = dirPdf.xyz;
        float lightPdf = dirPdf.w;

        if (lightPdf > 0.0 && !AnyHit(Ray(scatterPos, lightDir), INF - EPS))
        {
            vec3 f = EvalMtlxClosure(state.matID, state, V, N, lightDir, bsdfPdf, flags);
            if (bsdfPdf > 0.0)
            {
                float misWeight = PowerHeuristic(lightPdf, bsdfPdf);
                if (misWeight > 0.0)
                    Ld += misWeight * Li * f * envMapIntensity / lightPdf;
            }
        }
    }
#endif
#endif

    // Lumieres analytiques (rect / sphere / distant) via lightsTex.
#ifdef OPT_LIGHTS
    {
        int idx = min(int(rand() * float(numOfLights)), numOfLights - 1);
        Light light = GetLight(idx);

        LightSampleRec ls;
        SampleOneLight(light, scatterPos, ls);

        if (dot(ls.direction, ls.normal) < 0.0 && ls.pdf > 0.0 &&
            !AnyHit(Ray(scatterPos, ls.direction), ls.dist - EPS))
        {
            vec3 f = EvalMtlxClosure(state.matID, state, V, N, ls.direction, bsdfPdf, flags);
            if (bsdfPdf > 0.0)
            {
                float misWeight = 1.0;
                if (light.area > 0.0)  // pas de MIS pour les lumieres distantes
                    misWeight = PowerHeuristic(ls.pdf, bsdfPdf);
                Ld += misWeight * f * ls.emission / max(ls.pdf, EPS);
            }
        }
    }
#endif

    return Ld;
}

// =============================================================================
//  INTEGRATEUR (path tracing recursif NEE/MIS)
//
//  Reprend la logique de shaders/common/pathtrace.glsl (le path tracer officiel,
//  correct pour la transmission, le verre et les milieux) mais evalue les
//  materiaux via la closure MaterialX generee (EvalMtlxClosure/SampleMtlxClosure)
//  au lieu du modele Disney.
//
//  Principes (identiques au path tracer officiel) :
//    - La transmission (refraction) est produite par SampleMtlxClosure : un rayon
//      qui traverse un verre est simplement re-trace dans la scene.
//    - L'environnement vu EN REFLEXION comme EN REFRACTION provient naturellement
//      des rayons qui ratent la scene (terme de miss ci-dessous, pondere MIS) :
//      aucun terme analytique separe (plus de double-comptage / verre incorrect).
//    - OPT_MEDIUM (active automatiquement quand un materiau OpenPBR/standard_surface
//      declare transmission_depth) applique l'absorption volumetrique de
//      Beer-Lambert le long du trajet interne d'un verre solide.
// =============================================================================
vec3 PathTrace(Ray r)
{
    vec3 radiance   = vec3(0.0);
    vec3 throughput = vec3(1.0);
    State state;
    LightSampleRec lightSample;

    // pdf du dernier echantillon BSDF, pour le MIS avec l'environnement sur miss.
    float bsdfPdf = 0.0;

#ifdef OPT_MEDIUM
    // Suivi de milieu volumetrique (verre teinte solide : transmission_depth > 0).
    // sigma_a est derive de transmission_color / transmission_depth (calibration
    // Beer-Lambert MaterialX) : a l'epaisseur transmission_depth la couleur
    // transmise vaut transmission_color, donc les zones epaisses s'assombrissent
    // davantage que les bords fins (gradient de teinte correct).
    bool inMedium = false;
    vec3 mediumSigmaT = vec3(0.0);
#endif

    for (state.depth = 0; ; state.depth++)
    {
        if (!ClosestHit(r, state, lightSample))
        {
            // Miss : contribution de l'environnement (fond direct sur le rayon
            // primaire, IBL sur les rebonds, avec MIS contre l'echantillonnage
            // d'environnement de DirectLight).
#ifdef OPT_UNIFORM_LIGHT
            radiance += uniformLightCol * throughput;
#else
#ifdef OPT_ENVMAP
            vec4 envMapColPdf = EvalEnvMap(r);
            float misWeight = 1.0;
            if (state.depth > 0)
                misWeight = PowerHeuristic(bsdfPdf, envMapColPdf.w);
            radiance += misWeight * envMapColPdf.rgb * throughput * envMapIntensity;
#endif
#endif
            break;
        }

#ifdef OPT_MEDIUM
        // Absorption sur le segment qui vient d'etre parcouru dans le milieu.
        if (inMedium)
            throughput *= exp(-mediumSigmaT * state.hitDist);
#endif

        pt_PrepareMaterial(state, r);

        vec3 V = -r.direction;
        vec3 N = state.ffnormal;

        // (0) Opacite (coverage / cutout MaterialX). standard_surface (color3
        //     `opacity`), open_pbr (`geometry_opacity`) et gltf_pbr (`alpha`)
        //     exposent une opacite < 1 : la surface n'est presente que
        //     stochastiquement (alpha blend). Avec la probabilite (1 - opacite) le
        //     rayon traverse la surface sans l'ombrer et poursuit tout droit,
        //     laissant voir l'arriere-plan / la geometrie situee derriere. Le
        //     rebond n'est pas compte (depth--) pour ne pas epuiser maxDepth sur
        //     des traversees transparentes.
        float ptOpacity = pt_mOpacity;
        vec3 ptEmission = pt_mEmission;
        // Opacite PROCEDURALE (pilotee par un nodegraph, ex. masque de decoupe
        // sinusoidal sur la position) et EMISSION procedurale (ex. debug UV qui
        // EMET une coordonnee) : invisibles depuis le resume constant. On evalue
        // le graphe une fois au point d'impact (independant de la direction
        // lumineuse) ; mtlxEvalSurface ecrit le masque dans g_ptOpacity et
        // l'emission dans g_ptEmission.
        if (pt_mProcOpacity || pt_mProcEmission)
        {
            g_ptV = V;
            g_ptN = N;
            g_ptL = N;
            g_ptP = state.fhp;
            g_ptTangent = state.tangent;
            g_ptBitangent = state.bitangent;
            g_ptClosureType = CLOSURE_TYPE_REFLECTION;
            g_ptEmitEmission = 0;
            mtlxEvalSurface(state);
            g_ptEmitEmission = 1;
            if (pt_mProcOpacity) ptOpacity = g_ptOpacity;
            if (pt_mProcEmission) ptEmission = g_ptEmission;
        }
        if (ptOpacity < 1.0 && rand() >= ptOpacity)
        {
            r.origin = state.fhp + r.direction * EPS;
            state.depth--;
            continue;
        }

        // (1) Emission de surface.
        radiance += throughput * ptEmission;

        // Arret a la profondeur maximale (apres l'emission, avant tout rebond).
        if (state.depth == maxDepth)
            break;

        // (2) Eclairage direct (NEE + MIS) : environnement + lumieres analytiques.
        radiance += throughput * DirectLight(r, state);

        // (3) Rebond indirect : echantillonne la closure MaterialX generee
        //     (reflexion speculaire/diffuse ou refraction a travers le verre).
        vec3 L;
        float pdf;
        int flags;
        vec3 f = SampleMtlxClosure(state.matID, state, V, N, L, pdf, flags);
        if (pdf <= 0.0)
            break;

        throughput *= f / pdf;
        bsdfPdf = pdf;

        r.direction = L;
        r.origin = state.fhp + L * EPS;

#ifdef OPT_MEDIUM
        // Entree/sortie de milieu volumetrique sur une refraction a travers un
        // verre solide (non thin-walled). A l'entree (rayon franchissant la surface
        // vers l'interieur) on arme l'absorption depuis transmission_color /
        // transmission_depth ; a la sortie on la desarme.
        //
        // IMPORTANT: classifier avec le cote INCIDENT du hit (r.direction vs
        // normale geometrique) est plus stable que tester L. Avec des normales
        // lissees/microfacettes, L peut avoir un signe ambigu et laisser le rayon
        // "coince" en mode inMedium.
        if ((flags & CLOSURE_FLAG_TRANSMIT) != 0 && !pt_mThinWalled)
        {
            if (dot(r.direction, state.normal) < 0.0)
            {
                inMedium = pt_mTransDepth > 0.0;
                mediumSigmaT = inMedium
                    ? ((-log(clamp(pt_mTransColor, vec3(1e-3), vec3(1.0))) + max(pt_mTransScatter, vec3(0.0))) / pt_mTransDepth)
                    : vec3(0.0);
            }
            else
            {
                inMedium = false;
                mediumSigmaT = vec3(0.0);
            }
        }
#endif

        // Roulette russe.
#ifdef OPT_RR
        if (state.depth >= OPT_RR_DEPTH)
        {
            float q = min(max(throughput.x, max(throughput.y, throughput.z)) + 0.001, 0.95);
            if (rand() > q)
                break;
            throughput /= q;
        }
#else
        if (state.depth > 2)
        {
            float q = max(throughput.x, max(throughput.y, throughput.z));
            if (rand() > q)
                break;
            throughput /= max(q, EPS);
        }
#endif
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
    vec2 coordsTile;
    if (uLowRes)
    {
        coordsTile = TexCoords;
        InitRNG(gl_FragCoord.xy, 1);
    }
    else
    {
        coordsTile = mix(tileOffset, tileOffset + invNumTiles, TexCoords);
        InitRNG(gl_FragCoord.xy, frameNum);
    }

    // Jitter sous-pixel pour l'anti-aliasing / accumulation temporelle.
    vec2 jitter = (vec2(rand(), rand()) - 0.5) / resolution;
    Ray r = GenerateCameraRay(coordsTile + jitter);

    // Mode path tracer recursif (NEE/MIS, rebonds).
    vec3 pixelColor = PathTrace(r);

    color = vec4(pixelColor, 1.0);

    if (!uLowRes)
    {
        vec4 accumColor = texture(accumTexture, coordsTile);

        // Sortie lineaire HDR : accumulation + tone-mapping dans une passe separee.
        color += accumColor;
    }
}
