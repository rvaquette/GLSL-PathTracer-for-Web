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

#define PI         3.14159265358979323
#define INV_PI     0.31830988618379067
#define TWO_PI     6.28318530717958648
#define INV_TWO_PI 0.15915494309189533
#define INV_4_PI   0.07957747154594766
#define EPS 0.0003
#define INF 1000000.0

#define QUAD_LIGHT 0
#define SPHERE_LIGHT 1
#define DISTANT_LIGHT 2
#define POINT_LIGHT 3
#define SPOT_LIGHT 4

#define ALPHA_MODE_OPAQUE 0
#define ALPHA_MODE_BLEND 1
#define ALPHA_MODE_MASK 2

#define MATERIALS_TEX_STRIDE 17

#define MEDIUM_NONE 0
#define MEDIUM_ABSORB 1
#define MEDIUM_SCATTER 2
#define MEDIUM_EMISSIVE 3

// Material type discriminator (stored in param17.w)
#define MATERIAL_TYPE_DISNEY 0
#define MATERIAL_TYPE_HAIR   1

struct Ray
{
    vec3 origin;
    vec3 direction;
};

struct Medium
{
    int type;
    float density;
    float absorption;
    vec3 color;
    float anisotropy;
    float thickness; // SSS thickness (en unités de la scène)
};

struct Material
{
    float baseWeight;
    float baseDiffuseRoughness;
    vec3 baseColor;
    vec3 specularColor;
    vec3 coatColor;
    float opacity;
    int alphaMode;
    float alphaCutoff;
    vec3 emission;
    float anisotropic;
    float metallic;
    float roughness;
    float specularTint;
    float sheen;
    float sheenTint;
    float clearcoat;
    float clearcoatRoughness;
    float coatIOR;
    float coatRoughnessAnisotropy;
    float coatDarkening;
    float specTrans;
    float ior;
    float ax;
    float ay;
    float coatAx;
    float coatAy;
    float doubleSided;
    Medium medium;
    vec3 transmissionColor;
    float thinWalled;
    float subsurface;
    vec3 subsurfaceRadiusScale;
    vec3 fuzzColor;
    float fuzzRoughness; // OpenPBR: roughness du velvet/fuzz
    float dispersionScale; // OpenPBR: dispersion chromatique (Cauchy)
    float abbeNumber;      // OpenPBR: nombre d'Abbe

    float thinFilmWeight;    // OpenPBR: poids du film mince (iridescence)
    float thinFilmThickness; // OpenPBR: épaisseur du film mince (nm)
    float thinFilmIor;       // OpenPBR: IOR du film mince

    vec2 uvScale; // UV tiling scale (MaterialX uvtiling)
    float specularWeight; // specular lobe weight (OpenPBR specular_weight, SS specular)

    float anisotropyRotation;     // base specular anisotropy rotation [0,1) = full turn
    float coatAnisotropyRotation; // coat anisotropy rotation [0,1) = full turn

    float coatAffectRoughness;       // SS: coat raises base roughness (0 = no effect)
    float transmissionExtraRoughness; // SS: extra roughness for refraction lobe only

    // Material type: MATERIAL_TYPE_DISNEY (0) or MATERIAL_TYPE_HAIR (1)
    float materialType;
};

#ifndef OPT_SHADERTOY

struct Camera
{
    vec3 up;
    vec3 right;
    vec3 forward;
    vec3 position;
    float fov;
    float focalDist;
    float aperture;
};

uniform Camera camera;

#endif

struct Light
{
    vec3 position;
    vec3 emission;
    vec3 u;
    vec3 v;
    float radius;
    float area;
    float type;
};

struct State
{
    int depth;
    float eta;
    float hitDist;

    vec3 fhp;
    vec3 normal;
    vec3 ffnormal;
    vec3 tangent;
    vec3 bitangent;

    bool isEmitter;

    vec2 texCoord;
    int matID;
    Material mat;
    Medium medium;
};

struct ScatterSampleRec
{
    vec3 L;
    vec3 f;
    float pdf;
    int flags;
};

struct LightSampleRec
{
    vec3 normal;
    vec3 emission;
    vec3 direction;
    float dist;
    float pdf;
};

// Runtime MaterialX closure contract, configured per material in GetMaterial().
int gMaterialXClosureContractValid = 0;
int gMaterialXClosureKind = 0;
int gMaterialXClosureModel = 0;
int gMaterialXClosureFlags = 0;

//RNG from code by Moroz Mykhailo (https://www.shadertoy.com/view/wltcRS)

//internal RNG state 
uvec4 seed;
ivec2 pixel;

void InitRNG(vec2 p, int frame)
{
    pixel = ivec2(p);
    seed = uvec4(p, uint(frame), uint(p.x) + uint(p.y));
}

void pcg4d(inout uvec4 v)
{
    v = v * 1664525u + 1013904223u;
    v.x += v.y * v.w; v.y += v.z * v.x; v.z += v.x * v.y; v.w += v.y * v.z;
    v = v ^ (v >> 16u);
    v.x += v.y * v.w; v.y += v.z * v.x; v.z += v.x * v.y; v.w += v.y * v.z;
}

float rand()
{
    pcg4d(seed); return float(seed.x) / float(0xffffffffu);
}

vec3 FaceForward(vec3 a, vec3 b)
{
    return dot(a, b) < 0.0 ? -b : b;
}

float Luminance(vec3 c)
{
    return 0.212671 * c.x + 0.715160 * c.y + 0.072169 * c.z;
}