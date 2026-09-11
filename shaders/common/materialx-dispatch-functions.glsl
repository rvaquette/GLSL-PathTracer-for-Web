// The pathtracer generator emits these mono-material entry points directly:
// mtlx_openpbr_bsdf_evaluate and mtlx_openpbr_bsdf_sample.
// Keep their signatures documented here without introducing duplicate bodies.
#ifdef MATERIALX_DISPATCH_READY

vec3 evaluateBsdf(in vec3 pW, in Basis basis, in vec3 winputL, in vec3 woutputL,
                  in int material, inout float pdf_woutputL);
vec3 sampleBsdf(in vec3 pW, in Basis basis, in vec3 winputL, inout uint rndSeed,
                in int material, out vec3 woutputL, out float pdf_woutputL,
                out Volume internal_medium);

#endif
