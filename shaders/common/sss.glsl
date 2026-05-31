// sss.glsl - Subsurface Scattering (SSS) implementations
// Modes: 0 = None, 1 = Random Walk, 2 = Dipole

#ifndef SSS_GLSL
#define SSS_GLSL

// Fresnel diffuse reflectance pour dipole
float Fdr(float eta) {
    float F = -1.440 / (eta*eta) + 0.710 / eta + 0.668 + 0.0636 * eta;
    return F;
}

// Random Walk SSS simple : single scatter, Beer-Lambert
vec3 randomWalkSSS(State state, vec3 V, vec3 N, vec3 L, out float pdf) {
    Material mat = state.mat;

    // Paramètres du medium
    float sigma_s = mat.medium.density; // scattering coefficient
    float sigma_a = mat.medium.absorption; // absorption coefficient
    float sigma_t = sigma_s + sigma_a;
    float thickness = mat.medium.thickness;
    vec3 albedo = mat.medium.color;
    vec3 radiusScale = max(mat.subsurfaceRadiusScale, vec3(0.001));
    vec3 sigma_t_rgb = vec3(sigma_t) / radiusScale;

    // Si pas de SSS, early out
    if (sigma_t <= 0.0 || thickness <= 0.0) {
        pdf = 0.0;
        return vec3(0.0);
    }

    // Échantillonnage exponentiel pour distance
    float t = -log(1.0 - rand()) / sigma_t;
    t = min(t, thickness); // Troncature à l'épaisseur

    // Atténuation Beer-Lambert per-channel
    vec3 attenuation = exp(-sigma_t_rgb * t);

    // Phase function de Henyey-Greenstein
    float g = mat.medium.anisotropy;
    float phase = (1.0 - g * g) / (4.0 * PI * pow(1.0 + g * g - 2.0 * g * dot(N, L), 1.5));

    // Poids de la sortie
    vec3 sss = albedo * sigma_s * attenuation * phase * thickness;

    // PDF (scalaire, basee sur l'extinction moyenne)
    pdf = sigma_t * exp(-sigma_t * t);
    return sss;
}

// Dipole SSS simplifié (Jensen et al. 2001, slab)
vec3 dipoleSSS(State state, vec3 V, vec3 N, vec3 L, out float pdf) {
    Material mat = state.mat;

    // Paramètres du medium
    float sigma_s = mat.medium.density; // scattering coefficient
    float sigma_a = mat.medium.absorption; // absorption coefficient
    float g = mat.medium.anisotropy;
    float sigma_s_prime = sigma_s * (1.0 - g);
    float sigma_t_prime = sigma_s_prime + sigma_a;
    float alpha_prime = sigma_t_prime > 0.0 ? sigma_s_prime / sigma_t_prime : 0.0;
    float sigma_tr = sqrt(3.0 * sigma_a * sigma_t_prime);
    float thickness = mat.medium.thickness;
    vec3 albedo = mat.medium.color;
    vec3 radiusScale = max(mat.subsurfaceRadiusScale, vec3(0.001));
    vec3 sigma_tr_rgb = vec3(sigma_tr) / radiusScale;

    // Si pas de SSS, early out
    if (sigma_t_prime <= 0.0 || thickness <= 0.0) {
        pdf = 0.0;
        return vec3(0.0);
    }

    // Paramètres dipole
    float eta = mat.ior;
    float A = (1.0 + Fdr(eta)) / (1.0 - Fdr(eta));
    float D = 1.0 / (3.0 * sigma_t_prime);
    float zr = 1.0 / sigma_t_prime;
    float zv = -zr - 4.0 * A * D;

    // Distance source-observation
    float r = thickness * 0.5;
    float dr = sqrt(r * r + zr * zr);
    float dv = sqrt(r * r + zv * zv);

    // Réflectance dipole
    vec3 Rd = (zr * (sigma_tr_rgb + 1.0 / dr) * exp(-sigma_tr_rgb * dr) / (dr * dr)) +
              (zv * (sigma_tr_rgb + 1.0 / dv) * exp(-sigma_tr_rgb * dv) / (dv * dv));
    Rd *= alpha_prime / (4.0 * PI * D);

    // Couleur finale
    vec3 sss = albedo * Rd;
    pdf = 1.0 / thickness;
    return sss;
}

// Renvoie la couleur SSS pour le point courant
vec3 computeSSS(State state, vec3 V, vec3 N, vec3 L, out float pdf) {
    if (state.mat.thinWalled > 0.5) {
        pdf = 0.0;
        return vec3(0.0);
    }

    if (state.mat.medium.type != MEDIUM_SCATTER) {
        pdf = 0.0;
        return vec3(0.0);
    }

    if (SSS_MODE == 1) {
        // Random Walk SSS
        return randomWalkSSS(state, V, N, L, pdf);
    } else if (SSS_MODE == 2) {
        // Dipole SSS
        return dipoleSSS(state, V, N, L, pdf);
    } else {
        // Pas de SSS
        pdf = 0.0;
        return vec3(0.0);
    }
}

#endif // SSS_GLSL
