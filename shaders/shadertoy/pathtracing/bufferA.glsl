// START_BUFFERA_CODE
// END_BUFFERA_CODE

//-------------------------- Camera ---------------------------

#include "../../common/shadertoy/setCamera.glsl"

//-------------------------- Main ---------------------------

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {

    ivec2 v = ivec2(fragCoord.xy);
    
    int width = int(iResolution.x);
    int index = v.x + v.y * width;
     
    fragColor = texelFetch(iChannel0, v, 0); 

    if (index < CAMERA_DATA_POS + CAMERA_DATA_VEC4_COUNT) {
        
        index -= CAMERA_DATA_POS;
        
        setCamera(fragColor, index);

#if !defined(OPT_USE_MESHDATA_BLOB)

    } else if (iFrame < 2) {

        index -= MESH_DATA_OFFSET;

        if(index < VEC4_COUNT) {
            vec4[] data = getData();
            fragColor = data[index]; 
        } else {
            fragColor = vec4(0.0, 0.0, 0.0, 1.0);
        }

#endif   

    }

}
