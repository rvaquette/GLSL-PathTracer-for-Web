#version 300 es

#ifdef GL_ES
precision highp float;
precision highp int;
precision mediump sampler3D;
#endif

#define HW_PERFORMANCE 1

##SHADERTOY_CHANNELS##
uniform vec3      iResolution;           // viewport resolution (in pixels)
uniform float     iTime;                 // shader playback time (in seconds)
uniform vec4      iMouse;                // mouse pixel coords. xy: current (if MLB down), zw: click
uniform vec4      iDate;                 // (year, month, day, time in seconds)
uniform vec3      iChannelResolution[4]; // channel resolution (in pixels)
uniform int       iFrame;                // shader playback frame
uniform float     iTimeDelta;            // render time (in seconds)
uniform float     iFrameRate;

void mainCubemap( out vec4 c, in vec2 f, in vec3 ro, in vec3 rd );

##SHADERTOY_SCENE##

uniform vec4 unViewport;
uniform vec3 unCorners[5];
out vec4 outColor;

void main( void )
{
    vec4 color = vec4(1e20);

    vec3 ro = unCorners[4];
    vec2 uv = (gl_FragCoord.xy - unViewport.xy)/unViewport.zw; 
    vec3 rd = normalize( mix( mix( unCorners[0], unCorners[1], uv.x ),
                              mix( unCorners[3], unCorners[2], uv.x ), uv.y ) - ro); 

    mainCubemap( color, gl_FragCoord.xy-unViewport.xy, ro, rd );
    outColor = color; 
}