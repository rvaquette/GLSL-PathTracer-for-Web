// thinfilm.glsl — OpenPBR Thin Film / Iridescence (Belcour & Barla 2017)
// Rendu de l'iridescence spectrale pour film mince (bulle de savon, perle, nacre)

#ifndef THINFILM_GLSL
#define THINFILM_GLSL

// Longueurs d'onde RGB (en nm)
const float lambdaR = 700.0;
const float lambdaG = 546.0;
const float lambdaB = 436.0;

// Calcul de la phase différentielle pour un film mince
float thinFilmPhase(float thickness, float ior, float cosTheta, float lambda) {
    // phi = 2 * pi * thickness * ior * cos(theta_t) / lambda
    float sinThetaT = sin(acos(cosTheta)) / ior;
    float cosThetaT = sqrt(1.0 - sinThetaT * sinThetaT);
    return 2.0 * PI * ior * thickness * cosThetaT / lambda;
}


// Fresnel pour une interface (Schlick approx)
float fresnelSchlick(float cosTheta, float etaI, float etaT) {
    float r0 = (etaI - etaT) / (etaI + etaT);
    r0 = r0 * r0;
    float oneMinusCos = 1.0 - cosTheta;
    return r0 + (1.0 - r0) * pow(oneMinusCos, 5.0);
}

// Fresnel exact pour une interface (non polarisé)
float fresnelExact(float cosThetaI, float etaI, float etaT) {
    float sinThetaI = sqrt(max(0.0, 1.0 - cosThetaI * cosThetaI));
    float sinThetaT = etaI / etaT * sinThetaI;
    if (sinThetaT >= 1.0) return 1.0; // Total internal reflection
    float cosThetaT = sqrt(max(0.0, 1.0 - sinThetaT * sinThetaT));
    float rs = (etaI * cosThetaI - etaT * cosThetaT) / (etaI * cosThetaI + etaT * cosThetaT);
    float rp = (etaT * cosThetaI - etaI * cosThetaT) / (etaT * cosThetaI + etaI * cosThetaT);
    return 0.5 * (rs * rs + rp * rp);
}

// Modèle complet Belcour & Barla pour film mince (non absorbant)
vec3 thinFilmFresnel(float thickness, float iorFilm, float iorExt, float iorBase, float cosTheta) {
    float lambdas[3];
    lambdas[0] = lambdaR;
    lambdas[1] = lambdaG;
    lambdas[2] = lambdaB;
    vec3 result = vec3(0.0);
    for (int i = 0; i < 3; ++i) {
        float lambda = lambdas[i];
        // Fresnel air/film
        float R12 = fresnelExact(cosTheta, iorExt, iorFilm);
        float T12 = 1.0 - R12;
        // Angle dans le film
        float sinThetaT = sin(acos(cosTheta)) * iorExt / iorFilm;
        float cosThetaT = sqrt(max(0.0, 1.0 - sinThetaT * sinThetaT));
        // Fresnel film/base
        float R23 = fresnelExact(cosThetaT, iorFilm, iorBase);
        float phi = thinFilmPhase(thickness, iorFilm, cosTheta, lambda);
        float denom = 1.0 - R12 * R23 * cos(2.0 * phi);
        float numer = R12 * R12 + T12 * T12 * R23 + 2.0 * R12 * T12 * R23 * cos(phi);
        float reflectance = numer / max(denom, 1e-5);
        result[i] = clamp(reflectance, 0.0, 1.0);
    }
    return result;
}

// ---- LUT-based thin film lookup ----
// LUT 2D : u = cosTheta [0,1], v = thickness [0, THINFILM_LUT_MAX_THICKNESS nm] normalise a [0,1]
// Bake : iorFilm=1.5, iorExt=1.0, iorBase=1.5.
// Pour iorFilm != 1.5, l'epaisseur effective est rescalee pour conserver la phase correcte.
#define THINFILM_LUT_MAX_THICKNESS 1200.0
#define THINFILM_LUT_BAKED_IOR    1.5

vec3 thinFilmFresnelLUT(sampler2D lut, float thickness, float iorFilm, float cosTheta) {
    // Correction de phase : redimensionne l'epaisseur selon le rapport d'IOR
    float effThick = thickness * (iorFilm / THINFILM_LUT_BAKED_IOR);
    vec2 uv = vec2(
        clamp(cosTheta,                              0.001, 0.999),
        clamp(effThick / THINFILM_LUT_MAX_THICKNESS, 0.001, 0.999)
    );
    return texture(lut, uv).rgb;
}

#endif // THINFILM_GLSL
