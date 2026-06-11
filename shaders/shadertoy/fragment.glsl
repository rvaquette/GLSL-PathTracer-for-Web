#version 300 es

#ifdef GL_ES
precision highp float;
precision highp int;
precision mediump sampler3D;
#endif

#define HW_PERFORMANCE 1

##SHADERTOY_CHANNELS##
uniform vec3      iResolution;           // viewport resolution (in pixels)
uniform vec3      iChannelResolution[4]; // channel resolution (in pixels)
uniform float     iTime;                 // shader playback time (in seconds)
uniform float     iTimeDelta;            // render time (in seconds)
uniform vec4      iDate;                 // (year, month, day, time in seconds)
uniform int       iFrame;                // shader playback frame
uniform float     iFrameRate;
uniform vec4      iMouse;                // mouse pixel coords. xy: current (if MLB down), zw: click

vec4 texture(sampler2D   s, vec3 c)          { return texture(s,c.xy); }
vec4 texture(sampler2D   s, vec3 c, float b) { return texture(s,c.xy,b); }
//vec4 textureLod(sampler2D   s, vec3 c)          { return textureLod(s,c.xy); }
vec4 textureLod(sampler2D   s, vec3 c, float b) { return textureLod(s,c.xy,b); }

//vec4 texture(samplerCube s, vec3 c )         { return textureCube(s,c); }
//vec4 texture(samplerCube s, vec3 c, float b) { return textureCube(s,c,b); }

out vec4          frag_out_color;
void mainImage( out vec4 c, in vec2 f );

##SHADERTOY_SCENE##

void main(void)
{
    vec4 color = vec4(0.0,0.0,0.0,0.0);
    mainImage( color, gl_FragCoord.xy );
    frag_out_color = vec4(color);
}