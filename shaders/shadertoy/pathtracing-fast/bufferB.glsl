// START_BUFFERB_CODE
// END_BUFFERB_CODE

#define dataArrayTex iChannel0

vec4 get_vec4(in int index) {
	int width = int( textureSize( dataArrayTex, 0 ).x );
    ivec2 texCoord = ivec2(index%width,index/width);
    vec4 col = texelFetch(dataArrayTex, texCoord, 0);
    return col;
}

vec4 texelFetch(int offset, ivec2 index, int pos) {
    return get_vec4(offset + index.x);
}

//-------------------------- Globals ---------------------------

#include "../../common/globals.glsl"

//-------------------------- Raymarching ---------------------------

#include "../../common/shadertoy/raymarching.glsl"

//-------------------------- EnvMap ---------------------------

#ifdef OPT_ENVMAP

#define envMapTex iChannel3

#include "../../common/shadertoy/envmap.glsl"

#endif

//-------------------------- Sampling ---------------------------

#include "../../common/sampling.glsl"

//-------------------------- Disney ---------------------------

#include "../../common/disney.glsl"

//-------------------------- Intersection ---------------------------

#include "../../common/intersection.glsl"

//-------------------------- Closest Hit ---------------------------

#include "../../common/closest_hit.glsl"

//-------------------------- Any Hit ---------------------------

#include "../../common/anyhit.glsl"

//-------------------------- Pathtrace ---------------------------

#include "../../common/pathtrace.glsl"

//-------------------------- mainImage ---------------------------

#include "../../common/shadertoy/mainImage.glsl"

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    int dirty = isMouseDown ? 1 : 0;
    vec2 coordsTile = fragCoord / iResolution.xy;

    run(fragColor, fragCoord, dirty, coordsTile);
}
