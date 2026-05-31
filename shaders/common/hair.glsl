/*
 * Chiang Hair BSDF
 *
 * Reference:
 *   Chiang, Matt Jen-Yuan et al. "A Practical and Controllable Hair and Fur Model for
 *   Production Path Tracing." EGSR 2016.
 *
 * Material field encoding (set by simpleHairToMaterial in TypeScript):
 *   mat.baseColor         = tint_R   (R lobe tint)
 *   mat.specularColor     = sigmaA   (absorption coefficient, unclamped vec3)
 *   mat.transmissionColor = tint_TT  (TT lobe tint)
 *   mat.coatColor         = tint_TRT (TRT lobe tint)
 *   mat.roughness         = betaN    (longitudinal roughness)
 *   mat.anisotropic       = betaM    (azimuthal roughness)
 *   mat.specularTint      = cuticleAngle (normalized [0,1] -> [0, 10 degrees])
 *   mat.ior               = fiber IOR (typically 1.55)
 */

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Gaussian approximation of the longitudinal scattering function M_p.
// v = variance (betaN^2 for R, betaN^2/4 for TT, 4*betaN^2 for TRT).
// Returns M_p(sinThetaI, sinThetaO; v).
float HairMp(float sinThetaO, float sinThetaI, float cosThetaO, float cosThetaI, float v) {
    // Use the clamped Gaussian from Chiang eq (A2).
    // For v < 0.1 the Bessel-based form is more accurate; the Gaussian is fine for typical hair.
    float a = sinThetaO * sinThetaI;
    float b = cosThetaO * cosThetaI;
    float vClamped = max(v, 1e-5);
    // I_0(b/v) * exp((a-1)/v) / (2*v*sinh(1/v)) — approximated via Gaussian in sin space:
    float diff = sinThetaO - sinThetaI;
    return exp(-0.5 * diff * diff / vClamped) / sqrt(TWO_PI * vClamped);
}

// Logistic distribution for the azimuthal scattering function N_p.
// phi: azimuthal half-difference angle; s: width parameter.
float HairNp(float phi, float s) {
    s = max(s, 1e-5);
    float x = abs(phi) / s;
    float ex = exp(-x);
    return ex / (s * (1.0 + ex) * (1.0 + ex));
}

// Exact dielectric Fresnel for a dielectric interface.
float HairFresnel(float cosTheta, float eta) {
    float sinTheta2 = max(0.0, 1.0 - cosTheta * cosTheta);
    float sinThetaT2 = sinTheta2 / (eta * eta);
    if (sinThetaT2 >= 1.0) return 1.0; // total internal reflection
    float cosThetaT = sqrt(max(0.0, 1.0 - sinThetaT2));
    float Rs = (cosTheta - eta * cosThetaT) / (cosTheta + eta * cosThetaT);
    float Rp = (eta * cosTheta - cosThetaT) / (eta * cosTheta + cosThetaT);
    return 0.5 * (Rs * Rs + Rp * Rp);
}

// Box-Muller: sample standard normal from two uniform samples.
float BM_Normal(float u1, float u2) {
    return sqrt(max(0.0, -2.0 * log(max(u1, 1e-10)))) * cos(TWO_PI * u2);
}

// ---------------------------------------------------------------------------
// Evaluate hair BSDF for state (V=outgoing view, L=incoming light)
// ---------------------------------------------------------------------------
vec3 EvalHair(State state, vec3 V, vec3 N, vec3 L, out float pdf) {
    pdf = 0.0;

    Material mat = state.mat;
    vec3 T = state.tangent; // fiber tangent direction

    // ---- Longitudinal angles ----
    float sinThetaO = clamp(dot(V, T), -1.0, 1.0);
    float cosThetaO = sqrt(max(0.0, 1.0 - sinThetaO * sinThetaO));
    float sinThetaI = clamp(dot(L, T), -1.0, 1.0);
    float cosThetaI = sqrt(max(0.0, 1.0 - sinThetaI * sinThetaI));

    // ---- Azimuthal angle phi ----
    // Project V and L onto the plane perpendicular to T.
    vec3 Vperp = V - sinThetaO * T;
    vec3 Lperp = L - sinThetaI * T;
    float VperpLen = length(Vperp);
    float LperpLen = length(Lperp);
    float cosPhi = (VperpLen > 1e-5 && LperpLen > 1e-5)
        ? clamp(dot(Vperp, Lperp) / (VperpLen * LperpLen), -1.0, 1.0)
        : 1.0;
    // signed phi using fiber tangent as axis
    float phi = acos(cosPhi);
    float sinPhi_sign = dot(cross(Vperp, Lperp), T);
    if (sinPhi_sign < 0.0) phi = -phi; // [-PI, PI]

    // ---- Hair parameters ----
    float betaN  = clamp(mat.roughness, 0.01, 1.0);   // longitudinal roughness
    float betaM  = clamp(mat.anisotropic, 0.01, 1.0); // azimuthal roughness
    float alpha  = mat.specularTint * 10.0 * PI / 180.0; // cuticle tilt [0, 10 deg]
    float eta    = max(mat.ior, 1.0);
    // sigmaA stored in specularColor (unclamped)
    vec3 sigmaA  = max(mat.specularColor, vec3(0.0));

    // Per-lobe longitudinal variance (Chiang eq. A4)
    float betaN2 = betaN * betaN;
    float v0 = betaN2;       // R
    float v1 = betaN2 * 0.25; // TT
    float v2 = betaN2 * 4.0;  // TRT

    // Azimuthal width s (Chiang eq. 10)
    float s = 0.626657 * (0.265 * betaM + 1.194 * betaM * betaM + 5.372 * pow(betaM, 22.0));
    s = max(s, 1e-5);

    // ---- Fresnel & Transmittance ----
    // Use sinThetaD = sinThetaO for the longitudinal Fresnel term (half-angle approx).
    float sinThetaT = sinThetaO / eta;
    float cosThetaT = sqrt(max(0.0, 1.0 - sinThetaT * sinThetaT));
    float F = HairFresnel(max(cosThetaO, 1e-5), eta);

    // Path length through a cylinder at fiber center (h=0): 2 / cosThetaT
    float pathLen = 2.0 / max(cosThetaT, 0.001);
    vec3 Tvec = exp(-sigmaA * pathLen);

    // Per-lobe attenuation A_p
    float omF  = max(1.0 - F, 0.0);
    vec3 A0 = vec3(F);                             // R
    vec3 A1 = omF * omF * Tvec;                    // TT
    vec3 A2 = omF * omF * F * Tvec * Tvec;         // TRT

    // Per-lobe tints
    vec3 tintR   = max(mat.baseColor, vec3(0.0));
    vec3 tintTT  = max(mat.transmissionColor, vec3(0.0));
    vec3 tintTRT = max(mat.coatColor, vec3(0.0));

    // ---- Cuticle angle: shift sinThetaO per lobe ----
    float sinA = sin(alpha), cosA = cos(alpha);
    float sinA2 = sin(0.5 * alpha), cosA2 = cos(0.5 * alpha);
    float sinA3 = sin(1.5 * alpha), cosA3 = cos(1.5 * alpha);

    float sinO_R   = sinThetaO * cosA  - cosThetaO * sinA;  // tilt for R
    float sinO_TT  = sinThetaO * cosA2 + cosThetaO * sinA2; // tilt for TT
    float sinO_TRT = sinThetaO * cosA3 + cosThetaO * sinA3; // tilt for TRT

    float cosO_R   = sqrt(max(0.0, 1.0 - sinO_R   * sinO_R));
    float cosO_TT  = sqrt(max(0.0, 1.0 - sinO_TT  * sinO_TT));
    float cosO_TRT = sqrt(max(0.0, 1.0 - sinO_TRT * sinO_TRT));

    // ---- Longitudinal M_p for each lobe ----
    float Mp_R   = HairMp(sinO_R,   sinThetaI, cosO_R,   cosThetaI, v0);
    float Mp_TT  = HairMp(sinO_TT,  sinThetaI, cosO_TT,  cosThetaI, v1);
    float Mp_TRT = HairMp(sinO_TRT, sinThetaI, cosO_TRT, cosThetaI, v2);

    // ---- Azimuthal N_p for each lobe ----
    // R:   peak at phi = 0
    // TT:  peak at phi = PI (opposite side)
    // TRT: peak at phi = 0
    float phi_TT = phi - PI;
    // Wrap phi_TT to [-PI, PI]
    if (phi_TT < -PI) phi_TT += TWO_PI;
    if (phi_TT >  PI) phi_TT -= TWO_PI;

    float Np_R   = HairNp(phi,    s);
    float Np_TT  = HairNp(phi_TT, s * 0.5);  // TT is tighter azimuthally
    float Np_TRT = HairNp(phi,    s * 2.0);   // TRT is broader

    // ---- BSDF ----
    vec3 f = A0 * tintR   * Mp_R   * Np_R
           + A1 * tintTT  * Mp_TT  * Np_TT
           + A2 * tintTRT * Mp_TRT * Np_TRT;

    // ---- PDF: weighted by lobe luminance ----
    float L0 = max(Luminance(A0 * tintR),   1e-6);
    float L1 = max(Luminance(A1 * tintTT),  1e-6);
    float L2 = max(Luminance(A2 * tintTRT), 1e-6);
    float Ltotal = L0 + L1 + L2;
    float w0 = L0 / Ltotal;
    float w1 = L1 / Ltotal;
    float w2 = L2 / Ltotal;

    pdf = w0 * Mp_R   * Np_R
        + w1 * Mp_TT  * Np_TT
        + w2 * Mp_TRT * Np_TRT;

    // Hair scatters in all directions; no cosine factor suppression.
    return f;
}

// ---------------------------------------------------------------------------
// Sample hair BSDF — returns sampled weight, sets L and pdf
// ---------------------------------------------------------------------------
vec3 SampleHair(State state, vec3 V, vec3 N, out vec3 L, out float pdf) {
    pdf = 0.0;
    L   = vec3(0.0);

    Material mat = state.mat;
    vec3 T = state.tangent;

    float betaN = clamp(mat.roughness, 0.01, 1.0);
    float betaM = clamp(mat.anisotropic, 0.01, 1.0);
    float alpha = mat.specularTint * 10.0 * PI / 180.0;
    float eta   = max(mat.ior, 1.0);
    vec3 sigmaA = max(mat.specularColor, vec3(0.0));

    float sinThetaO = clamp(dot(V, T), -1.0, 1.0);
    float cosThetaO = sqrt(max(0.0, 1.0 - sinThetaO * sinThetaO));

    float sinThetaT = sinThetaO / eta;
    float cosThetaT = sqrt(max(0.0, 1.0 - sinThetaT * sinThetaT));
    float F    = HairFresnel(max(cosThetaO, 1e-5), eta);
    float omF  = max(1.0 - F, 0.0);
    float pathLen = 2.0 / max(cosThetaT, 0.001);
    vec3 Tvec  = exp(-sigmaA * pathLen);

    vec3 A0 = vec3(F);
    vec3 A1 = omF * omF * Tvec;
    vec3 A2 = omF * omF * F * Tvec * Tvec;

    vec3 tintR   = max(mat.baseColor,         vec3(0.0));
    vec3 tintTT  = max(mat.transmissionColor,  vec3(0.0));
    vec3 tintTRT = max(mat.coatColor,          vec3(0.0));

    float L0 = max(Luminance(A0 * tintR),   1e-6);
    float L1 = max(Luminance(A1 * tintTT),  1e-6);
    float L2 = max(Luminance(A2 * tintTRT), 1e-6);
    float Ltotal = L0 + L1 + L2;
    float w0 = L0 / Ltotal;
    float w1 = L1 / Ltotal;
    // w2 = 1 - w0 - w1

    float betaN2 = betaN * betaN;
    float v0 = betaN2, v1 = betaN2 * 0.25, v2 = betaN2 * 4.0;
    float s = 0.626657 * (0.265 * betaM + 1.194 * betaM * betaM + 5.372 * pow(betaM, 22.0));
    s = max(s, 1e-5);

    float sinA = sin(alpha), cosA = cos(alpha);
    float sinA2 = sin(0.5 * alpha), cosA2 = cos(0.5 * alpha);
    float sinA3 = sin(1.5 * alpha), cosA3 = cos(1.5 * alpha);

    // ---- Choose lobe ----
    float r0 = rand();
    float selectedV;
    float phiCenter;
    float sLobe;
    float sinShift, cosShift;

    if (r0 < w0) {
        selectedV  = v0;
        phiCenter  = 0.0;
        sLobe      = s;
        sinShift   = -sinA;  cosShift = cosA;
    } else if (r0 < w0 + w1) {
        selectedV  = v1;
        phiCenter  = PI;
        sLobe      = s * 0.5;
        sinShift   = sinA2;  cosShift = cosA2;
    } else {
        selectedV  = v2;
        phiCenter  = 0.0;
        sLobe      = s * 2.0;
        sinShift   = sinA3;  cosShift = cosA3;
    }

    // ---- Sample longitudinal angle: sinThetaI ~ Gaussian centred on shifted sinThetaO ----
    float sinO_shifted = sinThetaO * cosShift - cosThetaO * sinShift;
    float sinThetaI_s  = sinO_shifted + sqrt(selectedV) * BM_Normal(rand(), rand());
    sinThetaI_s = clamp(sinThetaI_s, -1.0, 1.0);
    float cosThetaI_s = sqrt(max(0.0, 1.0 - sinThetaI_s * sinThetaI_s));

    // ---- Sample azimuthal angle from logistic: CDF^{-1}(u) = center + s*log(u/(1-u)) ----
    float u = clamp(rand(), 1e-5, 1.0 - 1e-5);
    float phiSampled = phiCenter + sLobe * log(u / (1.0 - u));
    // Wrap to [-PI, PI]
    phiSampled = mod(phiSampled + PI, TWO_PI) - PI;

    // ---- Reconstruct L from sinThetaI_s and phiSampled ----
    // Build an orthonormal frame in the fiber's normal plane anchored to V.
    vec3 Vperp = V - sinThetaO * T;
    float VperpLen = length(Vperp);
    vec3 Nhat = VperpLen > 1e-5 ? Vperp / VperpLen : vec3(0.0, 1.0, 0.0);
    vec3 Bhat = cross(T, Nhat); // completes the frame

    // phiSampled=0 -> L projected along Nhat; phiSampled=PI -> opposite Nhat
    vec3 Lperp_dir = cos(phiSampled) * Nhat + sin(phiSampled) * Bhat;
    L = normalize(sinThetaI_s * T + cosThetaI_s * Lperp_dir);

    return EvalHair(state, V, N, L, pdf);
}
