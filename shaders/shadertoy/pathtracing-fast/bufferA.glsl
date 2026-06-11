// START_BUFFERA_CODE
// END_BUFFERA_CODE

#define altPressed     (texelFetch(iChannel1, ivec2(18,0),0).x > 0.)

//-------------------------- Camera ---------------------------

#include "../../common/shadertoy/setCamera.glsl"

//-------------------------- Main ---------------------------

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {

    ivec2 v = ivec2(fragCoord.xy);
    
    int width = int(iResolution.x);
    int index = v.x + v.y * width;
     
    fragColor = texelFetch(iChannel0, v, 0); 
        
    if (index == INFO_FRAME_POS) {  
    
        if (isMouseDown) {
            fragColor = vec4(float(iFrame), 0., 0., 0.);
        }
            
    } else if (index == INFO_RESOLUTION_POS) {
    
        float resolutionChangeFlag = 0.0;
        vec2 oldResolution = texelFetch(iChannel0, ivec2(INFO_RESOLUTION_POS, 0), 0).yz;

        if (iResolution.xy != oldResolution) {
            resolutionChangeFlag = 1.0;
        }

        fragColor = vec4(resolutionChangeFlag, iResolution.xy, 1.0);
        
    } else if (index < CAMERA_DATA_POS + CAMERA_DATA_VEC4_COUNT) {
        
        index -= CAMERA_DATA_POS;
        
        setCamera(fragColor, index);

    } else if (iFrame < 2) {

        index -= MESH_DATA_OFFSET;

        if(index < VEC4_COUNT) {
            vec4[] data = getData();
            fragColor = data[index]; 
        } else {
            fragColor = vec4(0.0, 0.0, 0.0, 1.0);
        }

    }   

}
