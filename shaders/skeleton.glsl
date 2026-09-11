#include common/gles300.glsl

// =============================================================================
//  Hote path tracer pour scenes MaterialX uniquement (sans repli Disney).
//
//  Ce fichier porte le transport MaterialX de reference et substitue les
//  infrastructures viewer par les contrats locaux (BVH, lumieres, envmap,
//  camera et accumulation). Il conserve un unique point d'injection pour le
//  dispatch produit par MtlxPathTracerHostShaderGenerator.
//
//  Le code INJECTE (au marqueur /*__PROCEDURAL_MATERIAL_INJECTION__*/) fournit,
//  avec :
//    - la librairie MaterialX (structs BSDF/EDF/..., fonctions mx_*, NG_*),
//    - le mapping u_env* -> envMap*, u_refractionTwoSided,
//    - les globales geometriques g_pt*,
//    - les hooks mtlx_openpbr_* et les alias evaluateBsdf/sampleBsdf.
//
//  L'hote utilise ces points d'entree directement : aucune reimplementation de
//  closure, aucun repli Disney.
// =============================================================================

#include common/uniforms.glsl
#include common/globals.glsl
#include common/intersection.glsl
#include common/sampling.glsl
#include common/disney.glsl
#include common/envmap.glsl

// Le chemin MaterialX local utilise le transport volumétrique par défaut.
// Les builds qui fournissent déjà VOLUME_ENABLED conservent leur choix.
#ifndef VOLUME_ENABLED
#define VOLUME_ENABLED
#endif

// Nombre de vec4 par lumiere dans lightsTex.
#define LIGHT_TEX_STRIDE 5

out vec4 color;
in vec2 TexCoords;

// Staged defaults until T034 exposes these controls through render options.
uniform int max_volume_steps;
uniform float firefly_clamp;
uniform bool strict_failure_enabled;
uniform bool generated_contract_valid;
uniform int generated_contract_failure_code;
const int MATERIAL_NEUTRAL = MATERIAL_TYPE_DISNEY;
const int MATERIAL_OPENPBR = MATERIAL_TYPE_MATERIALX;
const int MATERIAL_GROUND = MATERIAL_TYPE_DISNEY;
const bool smooth_normals = true;

bool strictGeneratedContractFailure()
{
    return strict_failure_enabled && !generated_contract_valid;
}

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
//  MATERIALX COMMON HELPERS (T019-T022)
//
//  Substantially ported from OpenPBR-viewer-rva/glsl/pathtracing/mtlx/common.glsl
//  under the MIT License. See LICENSES/OpenPBR-viewer-rva-MIT.txt.
//  PI/TWO_PI/INV_PI/INV_TWO_PI, EPS/INF and PhaseHG are already supplied by
//  common/globals.glsl and common/sampling.glsl and are not duplicated here.
// =============================================================================

const float PI2                   = TWO_PI;
const float PI_HALF              = 1.5707963267948966;
const float RECIPROCAL_PI        = INV_PI;
const float RECIPROCAL_PI2       = INV_TWO_PI;
const float HUGE_DIST            = 1.0e20;
const float RAY_OFFSET           = 1.0e-4;
const float DENOM_TOLERANCE      = 1.0e-10;
const float RADIANCE_EPSILON     = 1.0e-12;
const float TRANSMITTANCE_EPSILON = 1.0e-4;
const float THROUGHPUT_EPSILON   = 1.0e-6;
const float PDF_EPSILON          = 1.0e-6;
const float IOR_EPSILON          = 1.0e-5;
const float FLT_EPSILON          = 1.1920929e-7;

vec3 safe_normalize(in vec3 N)
{
    float l = length(N);
    return N / max(l, DENOM_TOLERANCE);
}

float maxComponent(in vec3 v) { return max(v.x, max(v.y, v.z)); }
float minComponent(in vec3 v) { return min(v.x, min(v.y, v.z)); }
float avgComponent(in vec3 v) { return (v.x + v.y + v.z) / 3.0; }

#define sqr(x) ((x) * (x))

float cosTheta2(in vec3 w) { return w.z * w.z; }
float cosTheta(in vec3 w) { return w.z; }
float sinTheta2(in vec3 w) { return 1.0 - cosTheta2(w); }
float sinTheta(in vec3 w) { return sqrt(max(0.0, sinTheta2(w))); }
float tanTheta2(in vec3 nLocal)
{
    float ct2 = cosTheta2(nLocal);
    return max(0.0, 1.0 - ct2) / max(ct2, DENOM_TOLERANCE);
}
float tanTheta(in vec3 nLocal) { return sqrt(max(0.0, tanTheta2(nLocal))); }
float cosPhi(in vec3 w)
{
    float S = sinTheta(w);
    return (S == 0.0) ? 1.0 : clamp(w.x / S, -1.0, 1.0);
}
float sinPhi(in vec3 w)
{
    float S = sinTheta(w);
    return (S == 0.0) ? 1.0 : clamp(w.y / S, -1.0, 1.0);
}

struct Basis
{
    vec3 nW;
    vec3 tW;
    vec3 bW;
    vec3 baryCoord;
    vec2 texCoord;
};

vec3 normalToTangent(in vec3 N)
{
    vec3 T;
    if (abs(N.z) < abs(N.x))
        T = vec3(N.z, 0.0, -N.x);
    else
        T = vec3(0.0, N.z, -N.y);
    return safe_normalize(T);
}

Basis makeBasis(in vec3 nW)
{
    Basis basis;
    basis.nW = safe_normalize(nW);
    basis.tW = normalToTangent(nW);
    basis.bW = cross(basis.nW, basis.tW);
    basis.baryCoord = vec3(0.0);
    basis.texCoord = vec2(0.0);
    return basis;
}

Basis makeBasis(in vec3 nW, in vec3 tW, in vec3 baryCoord, in vec2 texCoord)
{
    Basis basis;
    basis.nW = safe_normalize(nW);
    basis.tW = safe_normalize(tW);
    basis.bW = safe_normalize(cross(basis.nW, basis.tW));
    basis.baryCoord = baryCoord;
    basis.texCoord = texCoord;
    return basis;
}

vec3 worldToLocal(in vec3 vWorld, in Basis basis)
{
    return vec3(dot(vWorld, basis.tW), dot(vWorld, basis.bW), dot(vWorld, basis.nW));
}

vec3 localToWorld(in vec3 vLocal, in Basis basis)
{
    return basis.tW * vLocal.x + basis.bW * vLocal.y + basis.nW * vLocal.z;
}

struct LocalFrameRotation
{
    mat2 M;
    mat2 Minv;
};

LocalFrameRotation getLocalFrameRotation(in float angle)
{
    LocalFrameRotation rotation;
    if (angle == 0.0 || angle == PI2)
    {
        mat2 identity = mat2(1.0, 0.0, 0.0, 1.0);
        rotation.M = identity;
        rotation.Minv = identity;
    }
    else
    {
        float cos_rot = cos(angle);
        float sin_rot = sin(angle);
        rotation.M = mat2(cos_rot, sin_rot, -sin_rot, cos_rot);
        rotation.Minv = mat2(cos_rot, -sin_rot, sin_rot, cos_rot);
    }
    return rotation;
}

vec3 localToRotated(in vec3 vLocal, in LocalFrameRotation rotation)
{
    vec2 xy_rot = rotation.M * vLocal.xy;
    return vec3(xy_rot.x, xy_rot.y, vLocal.z);
}

vec3 rotatedToLocal(in vec3 vRotated, in LocalFrameRotation rotation)
{
    vec2 xy_local = rotation.Minv * vRotated.xy;
    return vec3(xy_local.x, xy_local.y, vRotated.z);
}

mat3 orthonormal_basis_ltc(vec3 V)
{
    float lenSqr = dot(V.xy, V.xy);
    vec3 X = lenSqr > 0.0 ? vec3(V.x, V.y, 0.0) * inversesqrt(lenSqr) : vec3(1, 0, 0);
    vec3 Y = vec3(-X.y, X.x, 0.0);
    return mat3(X, Y, vec3(0, 0, 1));
}

// Adapt the local State data to the same Basis construction as the reference.
Basis pt_MakeBasis(in State state)
{
    vec3 nW = safe_normalize(state.ffnormal);
    return makeBasis(nW, state.tangent, vec3(0.0), state.texCoord);
}

uint pcg(uint v)
{
    uint state = v * 747796405u + 2891336453u;
    uint word = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
    return (word >> 22u) ^ word;
}

void xorshift(inout uint seed)
{
    seed ^= seed << 13u;
    seed ^= seed >> 17u;
    seed ^= seed << 5u;
}

float rand(inout uint seed)
{
    seed = pcg(seed);
    const float uint_range = 1.0 / float(0xFFFFFFFFU);
    return float(seed - 1U) * uint_range;
}

uint pt_NewRandSeed()
{
    return uint(rand() * 4294967295.0);
}

float pdfHemisphereCosineWeighted(in vec3 wiL)
{
    return wiL.z <= PDF_EPSILON ? PDF_EPSILON / PI : wiL.z / PI;
}

vec3 sampleHemisphereCosineWeighted(inout uint rndSeed, inout float pdf)
{
    float r = sqrt(rand(rndSeed));
    float theta = 2.0 * PI * rand(rndSeed);
    float x = r * cos(theta);
    float y = r * sin(theta);
    float z = sqrt(max(0.0, 1.0 - x * x - y * y));
    pdf = max(PDF_EPSILON, abs(z) / PI);
    return vec3(x, y, z);
}

float powerHeuristic(const float a, const float b)
{
    return sqr(a) / max(DENOM_TOLERANCE, sqr(a) + sqr(b));
}

float sample_triangle_filter(float xi)
{
    return xi < 0.5 ? sqrt(2.0 * xi) - 1.0 : 1.0 - sqrt(2.0 - 2.0 * xi);
}

const float ambient_ior = 1.0;

float FresnelDielectricReflectance(in float mui, in float eta_ti)
{
    float c = mui;
    float mut2 = sqr(eta_ti) + sqr(c) - 1.0;
    if (mut2 <= 0.0) return 1.0;
    float g = sqrt(mut2);
    return 0.5 * sqr((g - c) / (g + c)) * (1.0 + sqr(((g + c) * c - 1.0) / ((g - c) * c + 1.0)));
}

vec3 FresnelSchlick(vec3 F0, float mu)
{
    return F0 + pow(1.0 - mu, 5.0) * (vec3(1.0) - F0);
}

vec3 FresnelF82Tint(float mu, in vec3 F0, in vec3 F82tint)
{
    const float mu_bar = 1.0 / 7.0;
    const float denom = mu_bar * pow(1.0 - mu_bar, 6.0);
    vec3 Fschlick_bar = FresnelSchlick(F0, mu_bar);
    vec3 Fschlick = FresnelSchlick(F0, mu);
    return clamp(Fschlick - mu * pow(1.0 - mu, 6.0) * (vec3(1.0) - F82tint) * Fschlick_bar / denom, vec3(0.0), vec3(1.0));
}

float E_F(float eta)
{
    return log((10893.0 * eta - 1438.2) / (-774.4 * sqr(eta) + 10212.0 * eta + 1.0));
}

float DielectricFresnelAvg(float eta)
{
    if (eta > 1.0) return E_F(eta);
    else if (eta < 1.0) return 1.0 - sqr(eta) * (1.0 - E_F(1.0 / eta));
    else return 0.0;
}

float ggx_ndf_eval(in vec3 m, in float alpha_x, in float alpha_y)
{
    float ax = max(alpha_x, DENOM_TOLERANCE);
    float ay = max(alpha_y, DENOM_TOLERANCE);
    float Ddenom = PI * ax * ay * sqr(sqr(m.x / ax) + sqr(m.y / ay) + sqr(m.z));
    return 1.0 / max(Ddenom, DENOM_TOLERANCE);
}

vec3 ggx_ndf_sample(in vec3 wiL, float alpha_x, float alpha_y, inout uint rndSeed)
{
    vec2 Xi = vec2(rand(rndSeed), rand(rndSeed));
    vec3 V = wiL;
    vec2 alpha = vec2(alpha_x, alpha_y);
    V = normalize(vec3(V.xy * alpha, V.z));
    float phi = 2.0 * PI * Xi.x;
    float z = (1.0 - Xi.y) * (1.0 + V.z) - V.z;
    float sinTheta = sqrt(clamp(1.0 - z * z, 0.0, 1.0));
    vec3 c = vec3(sinTheta * cos(phi), sinTheta * sin(phi), z);
    vec3 H = c + V;
    H = normalize(vec3(H.xy * alpha, H.z));
    return H;
}

float ggx_lambda(in vec3 w, float alpha_x, float alpha_y)
{
    if (abs(w.z) < FLT_EPSILON) return 0.0;
    return (-1.0 + sqrt(1.0 + (sqr(alpha_x * w.x) + sqr(alpha_y * w.y)) / sqr(w.z))) / 2.0;
}

float ggx_G1(in vec3 w, float alpha_x, float alpha_y)
{
    return 1.0 / (1.0 + ggx_lambda(w, alpha_x, alpha_y));
}

float ggx_G2(in vec3 woL, in vec3 wiL, float alpha_x, float alpha_y)
{
    return 1.0 / (1.0 + ggx_lambda(woL, alpha_x, alpha_y) + ggx_lambda(wiL, alpha_x, alpha_y));
}

struct Volume
{
    vec3 extinction;
    vec3 albedo;
    float anisotropy;
};

#ifdef VOLUME_ENABLED
vec3 samplePhaseFunction(in vec3 dW, float anisotropy, inout uint rndSeed)
{
    float U = rand(rndSeed);
    float V = rand(rndSeed);
    float g = anisotropy;
    float costheta;
    if (abs(g) < 1.0e-3)
        costheta = 1.0 - 2.0 * U;
    else
        costheta = 1.0 / (2.0 * g) * (1.0 + g * g - ((1.0 - g * g) * (1.0 - g + 2.0 * g * U)));
    float sintheta = sqrt(max(0.0, 1.0 - costheta * costheta));
    float phi = 2.0 * PI * V;
    Basis basis = makeBasis(dW);
    return costheta * dW + sintheta * (cos(phi) * basis.tW + sin(phi) * basis.bW);
}
#endif

float wavelength_nm;

float luminance_srgb(in vec3 C)
{
    return 0.2126 * C.r + 0.7152 * C.g + 0.0722 * C.b;
}

#if defined(TRANSMISSION_ENABLED) || defined(THIN_FILM_ENABLED)
float xFit_1931(float w)
{
    float t1 = (w - 442.0) * ((w < 442.0) ? 0.0624 : 0.0374),
          t2 = (w - 599.8) * ((w < 599.8) ? 0.0264 : 0.0323),
          t3 = (w - 501.1) * ((w < 501.1) ? 0.0490 : 0.0382);
    return 0.362 * exp(-0.5 * t1 * t1) + 1.056 * exp(-0.5 * t2 * t2) - 0.065 * exp(-0.5 * t3 * t3);
}

float yFit_1931(float w)
{
    float t1 = (w - 568.8) * ((w < 568.8) ? 0.0213 : 0.0247),
          t2 = (w - 530.9) * ((w < 530.9) ? 0.0613 : 0.0322);
    return 0.821 * exp(-0.5 * t1 * t1) + 0.286 * exp(-0.5 * t2 * t2);
}

float zFit_1931(float w)
{
    float t1 = (w - 437.0) * ((w < 437.0) ? 0.0845 : 0.0278),
          t2 = (w - 459.0) * ((w < 459.0) ? 0.0385 : 0.0725);
    return 1.217 * exp(-0.5 * t1 * t1) + 0.681 * exp(-0.5 * t2 * t2);
}

#define xyzFit_1931(w) vec3(xFit_1931(w), yFit_1931(w), zFit_1931(w))

vec3 xyzToRgb(vec3 XYZ)
{
    return XYZ * mat3(3.240479, -1.537150, -0.498535,
                     -0.969256,  1.875991,  0.041556,
                      0.055648, -0.204043,  1.057311);
}

const vec3 SPECTRAL_NORM = vec3(2.7, 3.3, 3.45);
#endif

// Classification reflexion/transmission depuis les directions LOCALES (memes
// hemispheres => reflexion ; hemispheres opposes => transmission). Ne modifie
// jamais le dispatch genere : c'est une convention de l'hote uniquement.
bool isTransmissionEvent(in vec3 winputL, in vec3 woutputL)
{
    return winputL.z * woutputL.z < 0.0;
}

// =============================================================================
//  POINT D'INJECTION DU MATERIAU GENERE
//
//  Le renderer injecte ici la librairie MaterialX, les globales geometriques
//  et le dispatch mtlx_openpbr_* genere pour l'unique materiau actif.
// =============================================================================
/*__PROCEDURAL_MATERIAL_INJECTION__*/

// =============================================================================
//  PREPARATION DU MATERIAU (MaterialX uniquement, pas de repli Disney)
//
//  Les valeurs de chaque materiau MaterialX de la scene sont pliees en litteraux
//  par le generateur ; mtlx_load_material_params(matID) selectionne le jeu de
//  parametres du materiau touche. Seule la coordonnee de texture procedurale
//  doit encore etre orientee pour les nodes MaterialX geomprop UV0.
// =============================================================================
void pt_PrepareMaterial(inout State state, in Ray r)
{
    mtlx_load_material_params(state.matID);

    // MaterialX procedural texcoord/geomprop UV0 nodes expect the authored V
    // (origin top-left); state.texCoord.y is stored GL-flipped (1 - authoredV) by
    // the glTF loader for direct GL texture sampling, so hand MaterialX the
    // un-flipped V. Image nodes re-flip via fileTextureVerticalFlip (generator).
    g_ptTexcoord = vec2(state.texCoord.x, 1.0 - state.texCoord.y);
}

void pt_LoadLocalMaterial(inout State state, in Ray r)
{
    int index = state.matID * MATERIALS_TEX_STRIDE;
    vec4 param1 = texelFetch1D(materialsTex, index + 0);
    vec4 param2 = texelFetch1D(materialsTex, index + 1);
    vec4 param3 = texelFetch1D(materialsTex, index + 2);
    vec4 param4 = texelFetch1D(materialsTex, index + 3);
    vec4 param5 = texelFetch1D(materialsTex, index + 4);
    vec4 param6 = texelFetch1D(materialsTex, index + 5);
    vec4 param7 = texelFetch1D(materialsTex, index + 6);
    vec4 param8 = texelFetch1D(materialsTex, index + 7);
    Material mat;

    mat.baseColor = param1.rgb;
    mat.anisotropic = param1.w;
    mat.emission = param2.rgb;
    mat.metallic = param3.x;
    mat.roughness = max(param3.y, 0.001);
    mat.subsurface = param3.z;
    mat.specularTint = param3.w;
    mat.sheen = param4.x;
    mat.sheenTint = param4.y;
    mat.clearcoat = param4.z;
    mat.clearcoatRoughness = mix(0.1, 0.001, param4.w);
    mat.specTrans = param5.x;
    mat.ior = param5.y;
    mat.medium.type = int(param5.z);
    mat.medium.density = param5.w;
    mat.medium.color = param6.rgb;
    mat.medium.anisotropy = clamp(param6.w, -0.9, 0.9);
    mat.opacity = param8.x;
    mat.alphaMode = int(param8.y);
    mat.alphaCutoff = param8.z;
    mat.materialType = int(param8.w + 0.5);

    ivec4 texIDs = ivec4(param7);
    if (texIDs.x >= 0)
    {
        vec4 texel = texture(textureMapsArrayTex, vec3(state.texCoord, texIDs.x));
        mat.baseColor *= pow(texel.rgb, vec3(2.2));
        mat.opacity *= texel.a;
    }
    if (texIDs.y >= 0)
    {
        vec2 metallicRoughness = texture(textureMapsArrayTex, vec3(state.texCoord, texIDs.y)).bg;
        mat.metallic = metallicRoughness.x;
        mat.roughness = max(metallicRoughness.y * metallicRoughness.y, 0.001);
    }
    if (texIDs.z >= 0)
    {
        vec3 texNormal = texture(textureMapsArrayTex, vec3(state.texCoord, texIDs.z)).rgb;
#ifdef OPT_OPENGL_NORMALMAP
        texNormal.y = 1.0 - texNormal.y;
#endif
        texNormal = normalize(texNormal * 2.0 - 1.0);
        vec3 originalNormal = state.normal;
        state.normal = normalize(state.tangent * texNormal.x + state.bitangent * texNormal.y + state.normal * texNormal.z);
        state.ffnormal = dot(originalNormal, r.direction) <= 0.0 ? state.normal : -state.normal;
    }
    if (texIDs.w >= 0)
        mat.emission = pow(texture(textureMapsArrayTex, vec3(state.texCoord, texIDs.w)).rgb, vec3(2.2));

    float aspect = sqrt(1.0 - mat.anisotropic * 0.9);
    mat.ax = max(0.001, mat.roughness / aspect);
    mat.ay = max(0.001, mat.roughness * aspect);
    state.mat = mat;
    state.eta = dot(r.direction, state.normal) < 0.0 ? 1.0 / mat.ior : mat.ior;
}

int pt_MaterialType(int matID)
{
    return int(texelFetch1D(materialsTex, matID * MATERIALS_TEX_STRIDE + 7).w + 0.5);
}

vec3 TraceShadow(in vec3 rayOrigin, in vec3 rayDir, in float maxDistance)
{
    vec3 transmittance = vec3(1.0);
    Ray shadowRay = Ray(rayOrigin, rayDir);
    float remainingDistance = maxDistance;
    bool inside_volume = false;
    Volume current_medium;
    current_medium.extinction = vec3(0.0);
    current_medium.albedo = vec3(0.0);
    current_medium.anisotropy = 0.0;
    uint rndSeed = pt_NewRandSeed();

    for (int layer = 0; layer < 32; ++layer)
    {
        if (!AnyHit(shadowRay, remainingDistance))
        {
            if (inside_volume && remainingDistance < HUGE_DIST)
                transmittance *= exp(-remainingDistance * current_medium.extinction);
            return transmittance;
        }

        State state;
        state.depth = 1;
        state.isEmitter = false;
        LightSampleRec lightSample;
        if (!ClosestHit(shadowRay, state, lightSample) || state.hitDist >= remainingDistance)
            return transmittance;
        if (state.isEmitter)
            return vec3(0.0);

        if (pt_MaterialType(state.matID) != MATERIAL_OPENPBR)
            return vec3(0.0);

        vec3 shadingNormal = safe_normalize(state.normal);
        Basis basis = makeBasis(shadingNormal, state.tangent, vec3(0.0), state.texCoord);
        state.ffnormal = dot(shadingNormal, shadowRay.direction) <= 0.0
            ? shadingNormal
            : -shadingNormal;
        pt_PrepareMaterial(state, shadowRay);
        vec3 winputL = worldToLocal(-shadowRay.direction, basis);
        mtlx_openpbr_prepare(state.fhp, basis, winputL, rndSeed);

        if (mtlx_openpbr_is_opaque())
            return vec3(0.0);

        float transmissionWeight = clamp(mtlx_openpbr_transmission_weight(), 0.0, 1.0);
        vec3 transmissionColor = clamp(mtlx_openpbr_transmission_color(), vec3(0.0), vec3(1.0));
        bool thin_walled = mtlx_openpbr_is_thinwalled();
        if (transmissionWeight <= TRANSMITTANCE_EPSILON)
            return vec3(0.0);

        if (thin_walled)
        {
            transmittance *= transmissionWeight * transmissionColor;
        }
        else if (!inside_volume && dot(shadingNormal, shadowRay.direction) < 0.0)
        {
            float transmissionDepth = max(mtlx_openpbr_transmission_depth(), RAY_OFFSET);
            current_medium.extinction = -log(max(transmissionColor, vec3(TRANSMITTANCE_EPSILON))) / transmissionDepth;
            transmittance *= transmissionWeight;
            inside_volume = true;
        }
        else
        {
            if (inside_volume)
                transmittance *= exp(-state.hitDist * current_medium.extinction);
            transmittance *= transmissionWeight;
            inside_volume = false;
            current_medium.extinction = vec3(0.0);
        }

        if (maxComponent(transmittance) <= TRANSMITTANCE_EPSILON)
            return vec3(0.0);

        remainingDistance -= state.hitDist;
        vec3 geometricNormal = state.ffnormal;
        shadowRay.origin = state.fhp
            + geometricNormal * sign(dot(shadowRay.direction, geometricNormal)) * RAY_OFFSET;
    }

    return vec3(0.0);
}

// =============================================================================
//  ECLAIRAGE DIRECT (NEE + MIS) : importance sampling de l'environnement et des
//  lumieres analytiques, evalue via le dispatch MaterialX genere. Reprend la
//  logique de shaders/common/pathtrace.glsl (DirectLight) adaptee au contrat
//  evaluateBsdf/sampleBsdf (materialx-host-contract.md) au lieu du pont de
//  closures Disney.
// =============================================================================
vec3 MtlxDirectLight(in Ray r, in State state)
{
    vec3 Ld = vec3(0.0);
    vec3 V = -r.direction;
    vec3 N = state.ffnormal;
    vec3 scatterPos = state.fhp + N * EPS;
    Basis basis = pt_MakeBasis(state);
    vec3 winputL = worldToLocal(V, basis);
    float bsdfPdf;

    // Lumiere d'environnement (importance sampling de l'envmap).
#ifdef OPT_ENVMAP
#ifndef OPT_UNIFORM_LIGHT
    {
        vec3 Li;
        vec4 dirPdf = SampleEnvMap(Li);
        vec3 lightDir = dirPdf.xyz;
        float lightPdf = dirPdf.w;

        vec3 visibility = TraceShadow(scatterPos, lightDir, INF - EPS);
        // TraceShadow shades the occluders, so restore the shading point material.
        mtlx_load_material_params(state.matID);
        if (lightPdf > 0.0 && maxComponent(visibility) > TRANSMITTANCE_EPSILON)
        {
            bsdfPdf = 0.0;
            vec3 fshadow = evaluateBsdf(state.fhp, basis, winputL, worldToLocal(lightDir, basis), 0, bsdfPdf);
            if (bsdfPdf > 0.0)
            {
                float bsdfPdf_shadow = bsdfPdf;
                float misWeightLight = powerHeuristic(lightPdf, bsdfPdf_shadow);
                float cos_shadow = 1.0;
                if (misWeightLight > 0.0)
                    Ld += visibility * misWeightLight * fshadow * cos_shadow * Li / max(PDF_EPSILON, lightPdf) * envMapIntensity;
            }
        }
    }
#endif
#endif

    // Lumieres analytiques (rect / sphere / distant) via lightsTex.
#ifdef OPT_LIGHTS
    if (numOfLights > 0)
    {
        int idx = min(int(rand() * float(numOfLights)), numOfLights - 1);
        Light light = GetLight(idx);

        LightSampleRec ls;
        SampleOneLight(light, scatterPos, ls);
        float combinedLightPdf = ls.pdf / float(numOfLights);
        vec3 selectedLightEmission = ls.emission / float(numOfLights);

        bool unoccluded = !AnyHit(Ray(scatterPos, ls.direction), ls.dist - EPS);
        vec3 visibility = unoccluded
            ? vec3(1.0)
            : TraceShadow(scatterPos, ls.direction, ls.dist - EPS);
        // TraceShadow shades the occluders, so restore the shading point material.
        mtlx_load_material_params(state.matID);
        if (dot(ls.direction, ls.normal) < 0.0 && combinedLightPdf > 0.0 &&
            maxComponent(visibility) > TRANSMITTANCE_EPSILON)
        {
            bsdfPdf = 0.0;
            vec3 f = evaluateBsdf(state.fhp, basis, winputL, worldToLocal(ls.direction, basis), 0, bsdfPdf);
            if (bsdfPdf > 0.0)
            {
                float misWeight = 1.0;
                if (light.area > 0.0)  // pas de MIS pour les lumieres distantes
                    misWeight = powerHeuristic(combinedLightPdf, bsdfPdf);
                Ld += visibility * misWeight * f * selectedLightEmission / max(combinedLightPdf, EPS);
            }
        }
    }
#endif

    return Ld;
}

vec3 DisneyDirectLight(in Ray r, in State state)
{
    vec3 Ld = vec3(0.0);
    vec3 scatterPos = state.fhp + state.normal * EPS;

#ifdef OPT_ENVMAP
#ifndef OPT_UNIFORM_LIGHT
    {
        vec3 Li;
        vec4 dirPdf = SampleEnvMap(Li);
        if (dirPdf.w > 0.0 && !AnyHit(Ray(scatterPos, dirPdf.xyz), INF - EPS))
        {
            float bsdfPdf = 0.0;
            vec3 f = DisneyEval(state, -r.direction, state.ffnormal, dirPdf.xyz, bsdfPdf);
            if (bsdfPdf > 0.0)
                Ld += powerHeuristic(dirPdf.w, bsdfPdf) * Li * f * envMapIntensity / dirPdf.w;
        }
    }
#endif
#endif

#ifdef OPT_LIGHTS
    if (numOfLights > 0)
    {
        int index = min(int(rand() * float(numOfLights)), numOfLights - 1);
        Light light = GetLight(index);
        LightSampleRec lightSample;
        SampleOneLight(light, scatterPos, lightSample);
        if (lightSample.pdf > 0.0 && dot(lightSample.direction, lightSample.normal) < 0.0 &&
            !AnyHit(Ray(scatterPos, lightSample.direction), lightSample.dist - EPS))
        {
            float bsdfPdf = 0.0;
            vec3 f = DisneyEval(state, -r.direction, state.ffnormal, lightSample.direction, bsdfPdf);
            float misWeight = light.area > 0.0 ? powerHeuristic(lightSample.pdf, bsdfPdf) : 1.0;
            Ld += misWeight * lightSample.emission * f / lightSample.pdf;
        }
    }
#endif

    return Ld;
}

vec3 DirectLight(in Ray r, in State state)
{
    return state.mat.materialType == MATERIAL_OPENPBR
        ? MtlxDirectLight(r, state)
        : DisneyDirectLight(r, state);
}

// =============================================================================
//  ADAPTATEURS DE TRANSPORT MATERIALX
// =============================================================================
#define LiDirect DirectLight

vec3 evaluateEdf(in vec3 pW, in Basis basis, in vec3 winputL)
{
    return mtlx_openpbr_emission_at(pW, basis);
}

vec3 pt_EnvironmentRadiance(in vec3 direction)
{
#ifdef OPT_UNIFORM_LIGHT
    return uniformLightCol;
#else
#ifdef OPT_ENVMAP
    return EvalEnvMap(Ray(vec3(0.0), direction)).rgb * envMapIntensity;
#else
    return vec3(0.0);
#endif
#endif
}

vec3 evaluateThinFilmEnvironmentReflection(in Basis basis, in vec3 winputL)
{
    if (!mtlx_openpbr_is_thinwalled()) return vec3(0.0);
    if (mtlx_openpbr_transmission_weight() <= 0.0) return vec3(0.0);
    if (mtlx_openpbr_thin_film_weight() <= 0.0) return vec3(0.0);
    if (mtlx_openpbr_specular_roughness() > 0.02) return vec3(0.0);

    float cosI = clamp(abs(winputL.z), 1.0e-4, 1.0);
    FresnelData fd = mx_init_fresnel_dielectric(
        max(mtlx_openpbr_specular_ior(), 1.0 + 1.0e-3),
        mtlx_openpbr_thin_film_thickness_nm(),
        mtlx_openpbr_thin_film_ior());
    vec3 F = mtlx_openpbr_thin_film_weight() * mx_compute_fresnel(cosI, fd);

    vec3 reflectedL = reflect(-winputL, vec3(0.0, 0.0, 1.0));
    if (reflectedL.z <= 0.0) return vec3(0.0);
    return F * pt_EnvironmentRadiance(localToWorld(reflectedL, basis));
}

#define MIN_VOLUME_STEPS_BEFORE_RR 3

int sample_channel(in vec3 albedo, in vec3 throughput, inout uint rndSeed, inout vec3 channel_probs)
{
    vec3 weights = abs(throughput);
    float sum = weights.r + weights.g + weights.b;
    channel_probs = weights / max(DENOM_TOLERANCE, sum);
    float cdf = 0.0;
    float randomValue = rand(rndSeed);
    for (int channel = 0; channel < 3; ++channel)
    {
        cdf += channel_probs[channel];
        if (randomValue < cdf)
            return channel;
    }
    return 0;
}

bool trace_volumetric(in vec3 pW, in vec3 dW, inout uint rndSeed,
                      in Volume volume, out vec3 volume_throughput,
                      out State state_hit, out LightSampleRec light_sample_hit,
                      out vec3 dW_hit)
{
    vec3 pWalk = pW;
    vec3 dWalk = dW;
    vec3 mfp = 1.0 / max(vec3(DENOM_TOLERANCE), volume.extinction);
    volume_throughput = vec3(1.0);
    for (int n = 0; n < max_volume_steps; ++n)
    {
        vec3 channel_probs;
        int channel = sample_channel(volume.albedo, volume_throughput, rndSeed, channel_probs);
        float walk_step = -log(max(rand(rndSeed), DENOM_TOLERANCE)) * mfp[channel];

        State candidate;
        candidate.depth = state_hit.depth;
        candidate.isEmitter = false;
        LightSampleRec candidateLight;
        if (ClosestHit(Ray(pWalk, dWalk), candidate, candidateLight) && candidate.hitDist <= walk_step)
        {
            float dist_to_surface = candidate.hitDist;
            vec3 transmittance = exp(-dist_to_surface * volume.extinction);
            volume_throughput *= transmittance / max(DENOM_TOLERANCE, dot(channel_probs, transmittance));
            state_hit = candidate;
            light_sample_hit = candidateLight;
            dW_hit = dWalk;
            return true;
        }

        if (n > MIN_VOLUME_STEPS_BEFORE_RR)
        {
            float continuation_prob = clamp(maxComponent(volume_throughput), 0.0, 1.0);
            float termination_prob = 1.0 - continuation_prob;
            if (rand(rndSeed) < termination_prob)
                break;
            volume_throughput /= continuation_prob;
        }

        vec3 transmittance = exp(-walk_step * volume.extinction);
        volume_throughput *= volume.albedo * volume.extinction * transmittance;
        volume_throughput /= max(DENOM_TOLERANCE, dot(channel_probs, volume.extinction * transmittance));
        pWalk += walk_step * dWalk;
        dWalk = normalize(samplePhaseFunction(dWalk, volume.anisotropy, rndSeed));
    }

    dW_hit = dWalk;
    return false;
}

// =============================================================================
//  INTEGRATEUR DE REFERENCE, ADAPTE AUX CONTRATS LOCAUX
// =============================================================================
vec3 PathTrace(Ray cameraRay)
{
    vec3 pW = cameraRay.origin;
    vec3 dW = cameraRay.direction;
    vec3 L = vec3(0.0);
    vec3 throughput = vec3(1.0);
    Basis basis;
    float bsdfPdf_continuation = 1.0;
    uint rndSeed = pt_NewRandSeed();

    Volume exterior_medium;
    exterior_medium.extinction = vec3(0.0);
    exterior_medium.albedo = vec3(0.0);
    exterior_medium.anisotropy = 0.0;
    Volume current_medium = exterior_medium;
    bool in_dielectric = false;
    int bounces = maxDepth;
    for (int vertex=0; vertex <= bounces; vertex++)
    {
        State state;
        state.depth = vertex;
        state.isEmitter = false;
        LightSampleRec lightSample;

        bool inside_volume = in_dielectric && maxComponent(current_medium.extinction) > FLT_EPSILON;
        bool inside_scattering_volume = inside_volume && maxComponent(current_medium.albedo) > FLT_EPSILON;
        bool surface_hit;

        if (!inside_scattering_volume)
        {
            surface_hit = ClosestHit(Ray(pW, dW), state, lightSample);
            if (surface_hit && inside_volume)
                throughput *= exp(-state.hitDist * current_medium.extinction);
        }
        else
        {
            vec3 volume_throughput;
            vec3 dW_next;
            surface_hit = trace_volumetric(pW, dW, rndSeed, current_medium,
                                           volume_throughput, state, lightSample, dW_next);
            dW = dW_next;
            throughput *= volume_throughput;
            float maxVT = maxComponent(throughput);
            if (maxVT > firefly_clamp) throughput *= firefly_clamp / maxVT;
        }

        if (!surface_hit)
        {
            float misWeightLight = 1.0;
#ifdef OPT_ENVMAP
#ifndef OPT_UNIFORM_LIGHT
            vec4 envMapColPdf = EvalEnvMap(Ray(pW, dW));
            if (vertex > 0 && !inside_scattering_volume)
            {
                float lightPdf = envMapColPdf.w;
                misWeightLight = powerHeuristic(bsdfPdf_continuation, lightPdf);
            }
            vec3 Lenv = throughput * misWeightLight * envMapColPdf.rgb * envMapIntensity;
#else
            vec3 Lenv = throughput * uniformLightCol;
#endif
#else
            vec3 Lenv = throughput * uniformLightCol;
#endif
            float maxLenv = maxComponent(Lenv);
            if (maxLenv > firefly_clamp) Lenv *= firefly_clamp / maxLenv;
            L += Lenv;
            break;
        }

        if (state.isEmitter)
        {
            if (numOfLights <= 0) break;
            float combinedLightPdf = lightSample.pdf / float(numOfLights);
            float misWeightLight = 1.0;
            if (vertex > 0 && !inside_scattering_volume)
                misWeightLight = powerHeuristic(bsdfPdf_continuation, combinedLightPdf);
            vec3 Le = throughput * misWeightLight * lightSample.emission;
            float maxLe = maxComponent(Le);
            if (maxLe > firefly_clamp) Le *= firefly_clamp / maxLe;
            L += Le;
            break;
        }

        if (vertex == bounces) break;

        pW = state.fhp;
        vec3 NsW = state.normal;
        vec3 NgW = state.ffnormal;
        int material = pt_MaterialType(state.matID);
        if (material != MATERIAL_OPENPBR)
            pt_LoadLocalMaterial(state, Ray(pW, dW));
        else
        {
            state.mat.materialType = MATERIAL_OPENPBR;
            mtlx_load_material_params(state.matID);
        }

        if (material == MATERIAL_OPENPBR)
        {
            if ((in_dielectric && dot(NsW, dW) < 0.0) ||
                (!in_dielectric && dot(NsW, dW) > 0.0))
                NsW *= -1.0;
        }
        else if (dot(NsW, dW) > 0.0)
            NsW *= -1.0;
        if (dot(NgW, NsW) < 0.0) NgW *= -1.0;

        if (smooth_normals)
        {
            if (material == MATERIAL_OPENPBR && mtlx_openpbr_is_opaque() && dot(NsW, dW) > 0.0)
                NsW = 2.0 * NgW * dot(NgW, NsW) - NsW;
            basis = makeBasis(NsW, state.tangent, vec3(0.0), state.texCoord);
        }
        else
            basis = makeBasis(NgW, state.tangent, vec3(0.0), state.texCoord);

        state.ffnormal = basis.nW;
        if (material == MATERIAL_OPENPBR)
            pt_PrepareMaterial(state, Ray(pW, dW));

        vec3 winputW = -dW;
        vec3 winputL = worldToLocal(winputW, basis);
        if (abs(winputL.z) < 1.0e-3) break;

        bool thin_walled = false;
        if (material == MATERIAL_OPENPBR)
        {
            mtlx_openpbr_prepare(pW, basis, winputL, rndSeed);
            thin_walled = mtlx_openpbr_is_thinwalled();
        }

        if (material == MATERIAL_OPENPBR)
        {
            vec3 Ltf = throughput * evaluateThinFilmEnvironmentReflection(basis, winputL);
            float maxLtf = maxComponent(Ltf);
            if (maxLtf > firefly_clamp) Ltf *= firefly_clamp / maxLtf;
            L += Ltf;
        }

        Volume internal_medium;
        vec3 surface_throughput;
        {
            if (material == MATERIAL_OPENPBR)
            {
                vec3 woutputL;
                vec3 f = sampleBsdf(pW, basis, winputL, rndSeed, material, woutputL, bsdfPdf_continuation, internal_medium);
                vec3 woutputW = localToWorld(woutputL, basis);
                bool transmitted_sample = winputL.z * woutputL.z < 0.0;
                float cos_out = transmitted_sample ? abs(dot(woutputW, basis.nW)) : 1.0;
                surface_throughput = f / max(PDF_EPSILON, bsdfPdf_continuation) * cos_out;
                dW = woutputW;
            }
            else
            {
                vec3 f = DisneySample(state, winputW, state.ffnormal, dW, bsdfPdf_continuation);
                surface_throughput = f / max(PDF_EPSILON, bsdfPdf_continuation);
            }
            float maxComp = maxComponent(surface_throughput);
            if (maxComp > firefly_clamp) surface_throughput *= firefly_clamp / maxComp;
        }

        vec3 Le = throughput * (material == MATERIAL_OPENPBR
            ? evaluateEdf(pW, basis, winputL)
            : state.mat.emission);
        float maxLe = maxComponent(Le);
        if (maxLe > firefly_clamp) Le *= firefly_clamp / maxLe;
        L += Le;

        bool transmitted = !thin_walled && (material == MATERIAL_OPENPBR) && (dot(winputW, NgW) * dot(dW, NgW) < 0.0);
        if (transmitted)
        {
            in_dielectric = !in_dielectric;
            if (in_dielectric)
                current_medium = internal_medium;
            else
                current_medium = exterior_medium;
        }

        if (!in_dielectric && !transmitted)
        {
            vec3 Li = LiDirect(Ray(pW, -winputW), state);
            if (maxComponent(Li) > RADIANCE_EPSILON)
            {
                vec3 Lcontrib = throughput * Li;
                float maxLcontrib = maxComponent(Lcontrib);
                if (maxLcontrib > firefly_clamp) Lcontrib *= firefly_clamp / maxLcontrib;
                L += Lcontrib;
            }
        }

        pW += NgW * sign(dot(dW, NgW)) * RAY_OFFSET;
        throughput *= surface_throughput;
        float maxTP = maxComponent(throughput);
        if (maxTP > firefly_clamp) throughput *= firefly_clamp / maxTP;
        if (maxComponent(throughput) < 1.0 && vertex > 1)
        {
            float q = max(0.0, 1.0 - maxComponent(throughput));
            if (rand(rndSeed) < q) break;
            throughput /= 1.0 - q;
        }
    }

    return L;
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

    // Filtre triangulaire de la reference, centre sur le pixel courant.
    vec2 jitter = 0.5 * vec2(sample_triangle_filter(rand()), sample_triangle_filter(rand())) / resolution;
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
