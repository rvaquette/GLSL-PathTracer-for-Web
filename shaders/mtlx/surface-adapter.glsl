// MaterialX surface adapters matching the distant pathtracer contract.
#ifdef MATERIALX_DISPATCH_READY

vec3 evaluateEdf(in vec3 pW, in Basis basis, in vec3 winputL)
{
    return mtlx_openpbr_emission_at(pW, basis);
}

bool isTransmissionEvent(in vec3 winputL, in vec3 woutputL)
{
    return winputL.z * woutputL.z < 0.0;
}

vec3 evaluateThinFilmEnvironmentReflection(in Basis basis, in vec3 winputL)
{
    if (!mtlx_openpbr_is_thinwalled()) return vec3(0.0);
    if (mtlx_openpbr_transmission_weight() <= 0.0) return vec3(0.0);
    if (mtlx_openpbr_thin_film_weight() <= 0.0) return vec3(0.0);
    if (mtlx_openpbr_specular_roughness() > 0.02) return vec3(0.0);

    float cosineIncident = clamp(abs(winputL.z), 1.0e-4, 1.0);
    FresnelData fresnel = mx_init_fresnel_dielectric(
        max(mtlx_openpbr_specular_ior(), 1.0 + 1.0e-3),
        mtlx_openpbr_thin_film_thickness_nm(),
        mtlx_openpbr_thin_film_ior());
    vec3 film = mtlx_openpbr_thin_film_weight() * mx_compute_fresnel(cosineIncident, fresnel);
    vec3 reflectedLocal = reflect(-winputL, vec3(0.0, 0.0, 1.0));
    if (reflectedLocal.z <= 0.0) return vec3(0.0);
    vec3 reflectedWorld = localToWorld(reflectedLocal, basis);
    return film * EvalEnvMap(Ray(vec3(0.0), reflectedWorld)).rgb * envMapIntensity;
}

#endif
