#version 300 es

#ifdef GL_ES
precision highp float;
precision highp int;
precision mediump sampler3D;
#endif

#define HW_PERFORMANCE 1

##SHADERTOY_CHANNELS##
uniform float     iChannelTime[4];
uniform float     iTimeOffset;
uniform int       iSampleOffset;
uniform vec4      iDate;
uniform float     iSampleRate;
uniform vec3      iChannelResolution[4];

vec2 mainSound( in int samp, float time );

##SHADERTOY_SCENE##

out vec4 outColor;

void main( void )
{
    float t = iTimeOffset + ((gl_FragCoord.x-0.5) + (gl_FragCoord.y-0.5)*512.0)/iSampleRate;
    int   s = iSampleOffset + int(gl_FragCoord.y-0.2)*512 + int(gl_FragCoord.x-0.2);
    vec2 y = mainSound( s, t );
    vec2 v  = floor((0.5+0.5*y)*65536.0);
    vec2 vl =   mod(v,256.0)/255.0;
    vec2 vh = floor(v/256.0)/255.0;
    outColor = vec4(vl.x,vh.x,vl.y,vh.y);
}