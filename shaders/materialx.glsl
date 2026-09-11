#include common/gles300.glsl
#include common/uniforms.glsl
#include common/globals.glsl

uniform int max_volume_steps;
uniform float firefly_clamp;
uniform bool uLowRes;
uniform mat4 cameraWorldMatrix;
uniform mat4 invProjectionMatrix;
uniform mat4 invModelMatrix;

#include common/materialx-common.glsl
#include common/materialx-dispatch-bridge.glsl
#include common/intersection.glsl
#include common/materialx-scene.glsl
#include common/sampling.glsl
#include common/envmap.glsl
#include common/closest_hit.glsl
#include common/anyhit.glsl

// Host MaterialX pathtracer cree depuis zero.
out vec4 color;
in vec2 TexCoords;

/*__PROCEDURAL_MATERIAL_INJECTION__*/

#include common/materialx-dispatch-functions.glsl
#include common/materialx-surface-adapter.glsl
#include common/materialx-volume.glsl
#include common/materialx-lighting.glsl
#include common/materialx-pathtrace.glsl

void main()
{
    color = vec4(PathTrace(), 1.0);
}
