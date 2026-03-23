#include common/gles300.glsl

out vec4 color;
in vec2 TexCoords;

uniform sampler2D imgTex;

uniform float sigma;
uniform float kSigma;
uniform float threshold;

#define INV_PI 0.31830988618379067153776752674503

#include common/denoiser.glsl