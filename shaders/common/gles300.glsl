#version 300 es

#ifdef GL_ES

#define samplerBuffer sampler2D
#define isamplerBuffer isampler2D
#define samplerArrayBuffer usampler2D 

precision highp float;
precision highp int;
precision highp isampler2D;
precision highp usampler2D;

vec4 texelFetch(samplerBuffer tex, int index) {
	int width = int( textureSize( tex, 0 ).x );
	ivec2 uv;
	uv.x = index % width;
	uv.y = index / width;
  	return texelFetch(tex, uv, 0);
}

ivec4 texelFetchI(isamplerBuffer tex, int index) {
	int width = int( textureSize( tex, 0 ).x );
	ivec2 uv;
	uv.x = index % width;
	uv.y = index / width;
  	return texelFetch(tex, uv, 0);
}

vec4 texture(samplerArrayBuffer tex, vec3 P) {
	int width = int( textureSize( tex, 0 ).x );
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
  	return vec4(texelFetch(tex, uv, 0))/255.;
}

#endif
