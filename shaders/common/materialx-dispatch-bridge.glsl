// MaterialX dispatch bridge for the new materialx.glsl host.
// The pathtracer generator emits the public mtlx_openpbr_* definitions. Keep
// their signatures here as the host-side contract without defining duplicates.
#ifdef MATERIALX_DISPATCH_READY

// Binds the parameter set authored for `matID` onto the closure globals
// (base_color, specular_roughness, ...). Defined by the injected MaterialX code.
void mtlx_load_material_params(int matID);

void mtlx_openpbr_prepare(in vec3 pW, in Basis basis, in vec3 winputL, inout uint rndSeed);
bool mtlx_openpbr_is_opaque();
bool mtlx_openpbr_is_thinwalled();
vec3 mtlx_openpbr_bsdf_evaluate(in vec3 pW, in Basis basis, in vec3 winputL, in vec3 woutputL,
                                inout float pdf_woutputL);
vec3 mtlx_openpbr_bsdf_sample(in vec3 pW, in Basis basis, in vec3 winputL, inout uint rndSeed,
                              out vec3 woutputL, out float pdf_woutputL, out Volume internal_medium);

#endif
