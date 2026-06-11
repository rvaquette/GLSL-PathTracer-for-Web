#define OPT_SHADERTOY_LIGHT // Use to enable the "light" version of the shader, which prints some info text instead of rendering the pathtracer.
                            // Comment out to disable and render the pathtracer as normal.

#define OPT_SHADERTOY

// START_COMMON_CODE
// END_COMMON_CODE

#define CAMERA_DATA_POS 0
#define CAMERA_DATA_VEC4_COUNT 9
#ifdef OPT_USE_MESHDATA_BLOB
#define MESH_DATA_OFFSET 0
#else
#define MESH_DATA_OFFSET (CAMERA_DATA_POS+CAMERA_DATA_VEC4_COUNT)
#endif

#define isMouseDown (iMouse.z > 0.)

#include "../../common/shadertoy/getCamera.glsl"