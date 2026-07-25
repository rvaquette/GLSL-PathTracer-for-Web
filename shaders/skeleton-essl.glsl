#include common/gles300.glsl
#include common/uniforms.glsl
#include common/globals.glsl
#include common/intersection.glsl
#include common/sampling.glsl

// =============================================================================
//  Minimal ESSL host template for MaterialX raster output.
//
//  This file is a TARGET TEMPLATE for the wrapper's ESSL adaptation path.
//  It is intentionally minimal: it contains the host-owned interface that must
//  stay stable, plus explicit replacement markers for the sections extracted
//  from the raw EsslShaderGenerator GLSL.
//
//  Goals:
//    - keep the app-side environment contract (envMapTex / envMapIntensity /
//      envMapRot) instead of the stock MaterialX u_env* uniforms;
//    - keep the raster varyings expected by the generated shader
//      (normalWorld / tangentWorld / positionWorld);
//    - provide a clear splicing target for the wrapper.
// =============================================================================

// -----------------------------------------------------------------------------
//  Host-owned environment interface
// -----------------------------------------------------------------------------

uniform bool u_refractionTwoSided;

mat4 pt_MtlxEnvMatrix()
{
    // Match MaterialXView exactly: fixed +PI/2 Y rotation in u_envMatrix.
    // MaterialXView does not fold an app-side env rotation into this matrix.
    const float a = 1.57079632679;
    float c = cos(a);
    float s = sin(a);
    return mat4(
        c,   0.0, -s,  0.0,
        0.0, 1.0, 0.0, 0.0,
        s,   0.0, c,   0.0,
        0.0, 0.0, 0.0, 1.0
    );
}

#define u_envMatrix pt_MtlxEnvMatrix()
#define u_envRadiance envMapTex
#define u_envIrradiance envMapIrradianceTex
#define u_envLightIntensity envMapIntensity
#define u_envRadianceSamples 1

// Separate irradiance env map (texture unit 20). When no irradiance file is
// provided, the renderer binds the same texture as envMapTex here, so the
// behaviour is identical to the previous single-map approach.
uniform sampler2D envMapIrradianceTex;
// Number of mip levels in the radiance env map; set by the renderer at load
// time from the actual texture dimensions so LOD selection is correct.
uniform int u_envRadianceMips;

// Environment background sampled on ray miss (mirrors EvalBackground in
// shaders/skeleton.glsl so the ESSL host shows the same environment behind the
// object instead of a black backdrop).
vec3 EvalBackground(Ray r)
{
    float theta = acos(clamp(r.direction.y, -1.0, 1.0));
    vec2 uv = vec2((PI + atan(r.direction.z, r.direction.x)) * INV_TWO_PI, theta * INV_PI) + vec2(envMapRot, 0.0);
    return textureLod(envMapTex, uv, 0.0).rgb * envMapIntensity;
}

// -----------------------------------------------------------------------------
//  Host-owned raster interface
// -----------------------------------------------------------------------------

#define u_viewPosition camera.position
#define u_numActiveLightSources numOfLights

// Like skeleton.glsl, this host is a fullscreen pass over a quad.
// The adapted ESSL code must therefore reconstruct shading inputs from hit-state
// data instead of relying on mesh-raster varyings.
in vec2 TexCoords;
out vec4 color;

// Compatibility alias for the generated ESSL main(), until the wrapper fully
// rewrites the output assignment.
#define out1 color

// Host/generator geometry contract (filled by the wrapper): empty for the ESSL
// raster-host generator, which owns the geometry globals and binds them through
// pt_MtlxBindGeom(...) (called from main()).
/*__MTLX_ESSL_GEOM_GLOBALS__*/

// -----------------------------------------------------------------------------
//  Shared scene-intersection helpers reused by the adapted ESSL shader
// -----------------------------------------------------------------------------

#include common/closest_hit.glsl
#include common/anyhit.glsl

// -----------------------------------------------------------------------------
//  Generated sections to splice from raw EsslShaderGenerator output
// -----------------------------------------------------------------------------

/*__MTLX_ESSL_PUBLIC_UNIFORMS__*/

/*__MTLX_ESSL_TYPES_AND_LIB__*/

// -----------------------------------------------------------------------------
//  Host-owned light interface backed by lightsTex
// -----------------------------------------------------------------------------

#ifndef MAX_LIGHT_SOURCES
#define MAX_LIGHT_SOURCES 64
#endif

struct LightData
{
    int index;
};

LightData u_lightData[MAX_LIGHT_SOURCES];

Light GetLight(int i)
{
    int base = i * 5;
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

void pt_InitLightData()
{
    for (int i = 0; i < MAX_LIGHT_SOURCES; i++)
        u_lightData[i].index = i;
}

int numActiveLightSources()
{
    return min(u_numActiveLightSources, MAX_LIGHT_SOURCES);
}

void sampleLightSource(LightData light, vec3 position, out lightshader result)
{
    LightSampleRec lightSample;
    SampleOneLight(GetLight(light.index), position, lightSample);
    result.intensity = lightSample.emission;
    result.direction = lightSample.direction;
}

/*__MTLX_ESSL_LIGHT_INTERFACE__*/

/*__MTLX_ESSL_SURFACE_IMPL__*/

/*__MTLX_ESSL_MAIN__*/

// -----------------------------------------------------------------------------
//  Host-owned camera ray + main()
//
//  Fullscreen pass over the quad, tile/accumulation aware AND OPT_LOWRES aware,
//  mirroring shaders/skeleton.glsl so the ESSL host plugs into the same
//  progressive-accumulation + low-res-preview pipeline as the default host.
//    - OPT_LOWRES : single full-frame sample (TexCoords, RNG frame 1), NO
//                   accumulation (the preview pass overwrites each frame).
//    - full-res   : tiled sampling (tileOffset/frameNum) + progressive
//                   accumulation (color = sample + previous accumulated sum).
//  mtlxGeneratedMain() (spliced above, renamed from the generated ESSL main)
//  writes the shaded color into `color` (via `#define out1 color`).
// -----------------------------------------------------------------------------

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
    Ray r = GenerateCameraRay(TexCoords);

    State state;
    state.depth = 0;
    state.eta = 1.0;
    LightSampleRec lightSample;
    if (ClosestHit(r, state, lightSample))
    {
        pt_InitLightData();
        // Host material-param load + geometry feed, filled by the wrapper: the
        // EsslHostShaderGenerator path folds the params as literals and binds the
        // geometry via pt_MtlxBindGeom(...).
        /*__MTLX_ESSL_HOST_SETUP__*/
        mtlxGeneratedMain();
    }
    else
    {
        color = vec4(EvalBackground(r), 1.0);
    }
}