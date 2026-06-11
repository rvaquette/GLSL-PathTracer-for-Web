// START_BUFFERB_CODE
// END_BUFFERB_CODE

#ifdef OPT_USE_MESHDATA_BLOB
#define dataArrayTex iChannel2
#else
#define dataArrayTex iChannel0
#endif
#define textureMapsArrayTex -1
#define _textureMapsArrayTex_ iChannel3

vec4 get_vec4(in int index) {
	int width = int( textureSize( dataArrayTex, 0 ).x );
    ivec2 texCoord = ivec2(index%width,index/width);
    vec4 col = texelFetch(dataArrayTex, texCoord, 0);
    return col;
}

vec4 texelFetch(int offset, ivec2 index, int pos) {
    return get_vec4(offset + index.x);
}
vec4 texelFetch(int offset, int index) {
    return get_vec4(offset + index);
}
ivec4 texelFetchI(int offset, int index) {
    return ivec4(get_vec4(offset + index));
}
vec4 texture(int _notused_, vec3 P) {
	int width = int( textureSize( _textureMapsArrayTex_, 0 ).x );
	int height = width;

	// Use the P coordinates to calculate the index in the texture array
	// P.z is the layer index, P.xy are the texture coordinates
	int texIndex = int(P.z);

	float u = P.x, v = P.y;
	if (v < 0.) v = 1. - fract(v); 
	else if (v > 1.) v = fract(v);

	int index = texIndex * width * height + int(floor(v * float(height))) * width + int(floor(u * float(width)));
	ivec2 uv;
	uv.x = index % width;
	uv.y = index / width;
  	return vec4(texelFetch(_textureMapsArrayTex_, uv, 0));
}

//-------------------------- Globals ---------------------------

#include "../../common/globals.glsl"

//-------------------------- EnvMap ---------------------------

#ifdef OPT_ENVMAP

#define envMapTex iChannel4

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

#ifndef OPT_SHADERTOY_LIGHT

uniform int dirty;
uniform vec2 tileOffset;
uniform vec2 invNumTiles;
in vec2 TexCoords;

#include "../../common/shadertoy/mainImage.glsl"

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 coordsTile = dirty == 0 ? mix(tileOffset, tileOffset + invNumTiles, TexCoords) : TexCoords;

    run(fragColor, fragCoord, dirty, coordsTile);

    if (dirty == 0) {
        fragColor += texture(iChannel1, coordsTile);
    }
}

#else 

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    fragColor = vec4(0);
}

#endif
