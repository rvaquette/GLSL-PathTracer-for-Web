#define OPT_SHADERTOY
#define OPT_RAYMARCHING

// START_COMMON_CODE
// END_COMMON_CODE

#define INFO_FRAME_POS 0
#define INFO_RESOLUTION_POS 1
#define CAMERA_DATA_POS 2
#define CAMERA_DATA_VEC4_COUNT 9
#define MESH_DATA_OFFSET (CAMERA_DATA_POS+CAMERA_DATA_VEC4_COUNT)

#define isMouseDown (iMouse.z > 0.)

#include "../../common/shadertoy/getCamera.glsl"
