#include common/gles300.glsl
#include common/uniforms.glsl
#include common/globals.glsl

uniform int max_volume_steps;
uniform float firefly_clamp;
uniform bool uLowRes;
uniform mat4 cameraWorldMatrix;
uniform mat4 invProjectionMatrix;
uniform mat4 invModelMatrix;

#include mtlx/common.glsl
#include mtlx/dispatch-bridge.glsl
#include common/intersection.glsl
#include mtlx/scene.glsl
#include common/sampling.glsl
#include common/envmap.glsl
#include common/closest_hit.glsl
#include common/anyhit.glsl

// Host mtlx pathtracer cree depuis zero.
out vec4 color;
in vec2 TexCoords;

/*__PROCEDURAL_MATERIAL_INJECTION__*/

#include mtlx/dispatch-functions.glsl
#include mtlx/surface-adapter.glsl
#include mtlx/volume.glsl
#include mtlx/lighting.glsl
#include mtlx/pathtrace.glsl

void main()
{
    color = vec4(PathTrace(), 1.0);
}
