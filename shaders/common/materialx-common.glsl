// MaterialX pathtracer common foundations ported from OpenPBR-viewer-rva.
// Host uniforms and viewer-specific resources are supplied by local contracts.

const float PI2 = TWO_PI;
const float PI_HALF = 1.5707963267948966;
const float RECIPROCAL_PI2 = INV_TWO_PI;
const float HUGE_DIST = 1.0e20;
const float RAY_OFFSET = 1.0e-4;
const float DENOM_TOLERANCE = 1.0e-10;
const float RADIANCE_EPSILON = 1.0e-12;
const float TRANSMITTANCE_EPSILON = 1.0e-4;
const float THROUGHPUT_EPSILON = 1.0e-6;
const float PDF_EPSILON = 1.0e-6;
const float IOR_EPSILON = 1.0e-5;
const float FLT_EPSILON = 1.1920929e-7;

const int MATERIAL_PROPS = 0;
const int MATERIAL_OPENPBR = 1;
const int MATERIAL_GROUND = 2;

vec3 safe_normalize(in vec3 value)
{
    float lengthValue = length(value);
    return value / max(lengthValue, DENOM_TOLERANCE);
}

float maxComponent(in vec3 value) { return max(value.x, max(value.y, value.z)); }
float minComponent(in vec3 value) { return min(value.x, min(value.y, value.z)); }
float avgComponent(in vec3 value) { return (value.x + value.y + value.z) / 3.0; }

float cosTheta2(in vec3 direction) { return direction.z * direction.z; }
float cosTheta(in vec3 direction) { return direction.z; }
float sinTheta2(in vec3 direction) { return 1.0 - cosTheta2(direction); }
float sinTheta(in vec3 direction) { return sqrt(max(0.0, sinTheta2(direction))); }
float tanTheta2(in vec3 direction)
{
    float cosineSquared = cosTheta2(direction);
    return max(0.0, 1.0 - cosineSquared) / max(cosineSquared, DENOM_TOLERANCE);
}
float tanTheta(in vec3 direction) { return sqrt(max(0.0, tanTheta2(direction))); }
float cosPhi(in vec3 direction)
{
    float sine = sinTheta(direction);
    return sine == 0.0 ? 1.0 : clamp(direction.x / sine, -1.0, 1.0);
}
float sinPhi(in vec3 direction)
{
    float sine = sinTheta(direction);
    return sine == 0.0 ? 1.0 : clamp(direction.y / sine, -1.0, 1.0);
}

struct Basis
{
    vec3 nW;
    vec3 tW;
    vec3 bW;
    vec3 baryCoord;
    vec2 texCoord;
};

struct Volume
{
    vec3 extinction;
    vec3 albedo;
    float anisotropy;
};

vec3 normalToTangent(in vec3 normal)
{
    vec3 tangent;
    if (abs(normal.z) < abs(normal.x)) tangent = vec3(normal.z, 0.0, -normal.x);
    else tangent = vec3(0.0, normal.z, -normal.y);
    return safe_normalize(tangent);
}

Basis makeBasis(in vec3 normal)
{
    Basis basis;
    basis.nW = safe_normalize(normal);
    basis.tW = normalToTangent(normal);
    basis.bW = cross(basis.nW, basis.tW);
    basis.baryCoord = vec3(0.0);
    basis.texCoord = vec2(0.0);
    return basis;
}

Basis makeBasis(in vec3 normal, in vec3 tangent, in vec3 baryCoord, in vec2 texCoord)
{
    Basis basis;
    basis.nW = safe_normalize(normal);
    basis.tW = safe_normalize(tangent);
    basis.bW = cross(basis.nW, basis.tW);
    basis.baryCoord = baryCoord;
    basis.texCoord = texCoord;
    return basis;
}

vec3 worldToLocal(in vec3 world, in Basis basis)
{
    return vec3(dot(world, basis.tW), dot(world, basis.bW), dot(world, basis.nW));
}

vec3 localToWorld(in vec3 local, in Basis basis)
{
    return basis.tW * local.x + basis.bW * local.y + basis.nW * local.z;
}

struct LocalFrameRotation
{
    mat2 M;
    mat2 Minv;
};

LocalFrameRotation getLocalFrameRotation(in float angle)
{
    LocalFrameRotation rotation;
    if (angle == 0.0 || angle == PI2)
    {
        mat2 identity = mat2(1.0, 0.0, 0.0, 1.0);
        rotation.M = identity;
        rotation.Minv = identity;
    }
    else
    {
        float cosine = cos(angle);
        float sine = sin(angle);
        rotation.M = mat2(cosine, sine, -sine, cosine);
        rotation.Minv = mat2(cosine, -sine, sine, cosine);
    }
    return rotation;
}

vec3 localToRotated(in vec3 local, in LocalFrameRotation rotation)
{
    vec2 rotated = rotation.M * local.xy;
    return vec3(rotated, local.z);
}

vec3 rotatedToLocal(in vec3 rotated, in LocalFrameRotation rotation)
{
    vec2 local = rotation.Minv * rotated.xy;
    return vec3(local, rotated.z);
}

mat3 orthonormal_basis_ltc(vec3 view)
{
    float lengthSquared = dot(view.xy, view.xy);
    vec3 xAxis = lengthSquared > 0.0 ? vec3(view.x, view.y, 0.0) * inversesqrt(lengthSquared) : vec3(1.0, 0.0, 0.0);
    vec3 yAxis = vec3(-xAxis.y, xAxis.x, 0.0);
    return mat3(xAxis, yAxis, vec3(0.0, 0.0, 1.0));
}

uint pcg(uint value)
{
    uint state = value * 747796405u + 2891336453u;
    uint word = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
    return (word >> 22u) ^ word;
}

void xorshift(inout uint seed)
{
    seed ^= seed << 13u;
    seed ^= seed >> 17u;
    seed ^= seed << 5u;
}

float rand(inout uint seed)
{
    seed = pcg(seed);
    return float(seed - 1U) / float(0xFFFFFFFFU);
}

float pdfHemisphereCosineWeighted(in vec3 direction)
{
    if (direction.z <= PDF_EPSILON) return PDF_EPSILON / PI;
    return direction.z / PI;
}

vec3 sampleHemisphereCosineWeighted(inout uint seed, inout float pdf)
{
    float radius = sqrt(rand(seed));
    float angle = TWO_PI * rand(seed);
    float x = radius * cos(angle);
    float y = radius * sin(angle);
    float z = sqrt(max(0.0, 1.0 - x * x - y * y));
    pdf = max(PDF_EPSILON, abs(z) / PI);
    return vec3(x, y, z);
}

float powerHeuristic(const float a, const float b)
{
    float aSquared = a * a;
    return aSquared / max(DENOM_TOLERANCE, aSquared + b * b);
}

float sample_triangle_filter(float value)
{
    return value < 0.5 ? sqrt(2.0 * value) - 1.0 : 1.0 - sqrt(2.0 - 2.0 * value);
}

const float ambient_ior = 1.0;

float FresnelDielectricReflectance(in float cosineIncident, in float eta)
{
    float cosine = cosineIncident;
    float transmittedCosineSquared = eta * eta + cosine * cosine - 1.0;
    if (transmittedCosineSquared <= 0.0) return 1.0;
    float g = sqrt(transmittedCosineSquared);
    float first = (g - cosine) / (g + cosine);
    float second = ((g + cosine) * cosine - 1.0) / ((g - cosine) * cosine + 1.0);
    return 0.5 * first * first * (1.0 + second * second);
}

vec3 FresnelSchlick(vec3 f0, float cosine)
{
    return f0 + pow(1.0 - cosine, 5.0) * (vec3(1.0) - f0);
}

vec3 FresnelF82Tint(float cosine, in vec3 f0, in vec3 f82)
{
    const float cosineBar = 1.0 / 7.0;
    const float denominator = cosineBar * pow(1.0 - cosineBar, 6.0);
    vec3 schlickBar = FresnelSchlick(f0, cosineBar);
    vec3 schlick = FresnelSchlick(f0, cosine);
    return clamp(schlick - cosine * pow(1.0 - cosine, 6.0) * (vec3(1.0) - f82) * schlickBar / denominator, vec3(0.0), vec3(1.0));
}

float E_F(float eta)
{
    return log((10893.0 * eta - 1438.2) / (-774.4 * eta * eta + 10212.0 * eta + 1.0));
}

float DielectricFresnelAvg(float eta)
{
    if (eta > 1.0) return E_F(eta);
    if (eta < 1.0) return 1.0 - eta * eta * (1.0 - E_F(1.0 / eta));
    return 0.0;
}

float ggx_ndf_eval(in vec3 microNormal, in float alphaX, in float alphaY)
{
    float safeAlphaX = max(alphaX, DENOM_TOLERANCE);
    float safeAlphaY = max(alphaY, DENOM_TOLERANCE);
    float denominator = PI * safeAlphaX * safeAlphaY *
        pow(microNormal.x / safeAlphaX, 2.0) +
        0.0;
    denominator = PI * safeAlphaX * safeAlphaY *
        pow(pow(microNormal.x / safeAlphaX, 2.0) + pow(microNormal.y / safeAlphaY, 2.0) + microNormal.z * microNormal.z, 2.0);
    return 1.0 / max(denominator, DENOM_TOLERANCE);
}

vec3 ggx_ndf_sample(in vec3 inputLocal, float alphaX, float alphaY, inout uint seed)
{
    vec2 random = vec2(rand(seed), rand(seed));
    vec2 alpha = vec2(alphaX, alphaY);
    vec3 view = normalize(vec3(inputLocal.xy * alpha, inputLocal.z));
    float phi = TWO_PI * random.x;
    float z = (1.0 - random.y) * (1.0 + view.z) - view.z;
    float sine = sqrt(clamp(1.0 - z * z, 0.0, 1.0));
    vec3 candidate = vec3(sine * cos(phi), sine * sin(phi), z);
    return normalize(vec3((candidate + view).xy * alpha, (candidate + view).z));
}

float ggx_lambda(in vec3 direction, float alphaX, float alphaY)
{
    if (abs(direction.z) < FLT_EPSILON) return 0.0;
    return (-1.0 + sqrt(1.0 + (alphaX * alphaX * direction.x * direction.x + alphaY * alphaY * direction.y * direction.y) / (direction.z * direction.z))) / 2.0;
}

float ggx_G1(in vec3 direction, float alphaX, float alphaY)
{
    return 1.0 / (1.0 + ggx_lambda(direction, alphaX, alphaY));
}

float ggx_G2(in vec3 outputLocal, in vec3 inputLocal, float alphaX, float alphaY)
{
    return 1.0 / (1.0 + ggx_lambda(outputLocal, alphaX, alphaY) + ggx_lambda(inputLocal, alphaX, alphaY));
}

#ifdef VOLUME_ENABLED
vec3 samplePhaseFunction(in vec3 direction, float anisotropy, inout uint seed)
{
    float first = rand(seed);
    float second = rand(seed);
    float cosine;
    if (abs(anisotropy) < 1.0e-3) cosine = 1.0 - 2.0 * first;
    else cosine = (1.0 + anisotropy * anisotropy - pow((1.0 - anisotropy) + 2.0 * anisotropy * first, 2.0)) / (2.0 * anisotropy);
    float sine = sqrt(max(0.0, 1.0 - cosine * cosine));
    float phi = TWO_PI * second;
    Basis basis = makeBasis(direction);
    return cosine * direction + sine * (cos(phi) * basis.tW + sin(phi) * basis.bW);
}
#endif

float luminance_srgb(in vec3 color)
{
    return 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
}

#if defined(TRANSMISSION_ENABLED) || defined(THIN_FILM_ENABLED)
float xFit_1931(float wavelength)
{
    float t1 = (wavelength - 442.0) * ((wavelength < 442.0) ? 0.0624 : 0.0374);
    float t2 = (wavelength - 599.8) * ((wavelength < 599.8) ? 0.0264 : 0.0323);
    float t3 = (wavelength - 501.1) * ((wavelength < 501.1) ? 0.0490 : 0.0382);
    return 0.362 * exp(-0.5 * t1 * t1) + 1.056 * exp(-0.5 * t2 * t2) - 0.065 * exp(-0.5 * t3 * t3);
}

float yFit_1931(float wavelength)
{
    float t1 = (wavelength - 568.8) * ((wavelength < 568.8) ? 0.0213 : 0.0247);
    float t2 = (wavelength - 530.9) * ((wavelength < 530.9) ? 0.0613 : 0.0322);
    return 0.821 * exp(-0.5 * t1 * t1) + 0.286 * exp(-0.5 * t2 * t2);
}

float zFit_1931(float wavelength)
{
    float t1 = (wavelength - 437.0) * ((wavelength < 437.0) ? 0.0845 : 0.0278);
    float t2 = (wavelength - 459.0) * ((wavelength < 459.0) ? 0.0385 : 0.0725);
    return 1.217 * exp(-0.5 * t1 * t1) + 0.681 * exp(-0.5 * t2 * t2);
}

vec3 xyzToRgb(in vec3 xyz)
{
    return xyz * mat3(3.240479, -1.537150, -0.498535,
                      -0.969256, 1.875991, 0.041556,
                       0.055648, -0.204043, 1.057311);
}

const vec3 SPECTRAL_NORM = vec3(2.7, 3.3, 3.45);
#endif
