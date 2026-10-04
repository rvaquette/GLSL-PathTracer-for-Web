// MaterialX direct-light adapter using local lights, environment and visibility.
#ifdef MATERIALX_DISPATCH_READY

#ifndef LIGHT_TEX_STRIDE
#define LIGHT_TEX_STRIDE 5
#endif

Light GetLight(int index)
{
    int base = index * LIGHT_TEX_STRIDE;
    Light light;
    light.position = texelFetch1D(lightsTex, base + 0).xyz;
    light.emission = texelFetch1D(lightsTex, base + 1).xyz;
    light.u = texelFetch1D(lightsTex, base + 2).xyz;
    light.v = texelFetch1D(lightsTex, base + 3).xyz;
    vec4 parameters = texelFetch1D(lightsTex, base + 4);
    light.radius = parameters.x;
    light.area = parameters.y;
    light.type = parameters.z;
    return light;
}

vec3 DirectLight(in Ray ray, in State state)
{
    mtlx_load_material_params(state.matID);
    vec3 result = vec3(0.0);
    vec3 viewWorld = -ray.direction;
    Basis basis = makeBasis(state.ffnormal, state.tangent, vec3(0.0), state.texCoord);
    vec3 inputLocal = worldToLocal(viewWorld, basis);
    vec3 scatterPosition = state.fhp + state.ffnormal * EPS;
    float bsdfPdf;

#ifdef OPT_ENVMAP
#ifndef OPT_UNIFORM_LIGHT
    vec3 environment;
    vec4 directionAndPdf = SampleEnvMap(environment);
    vec3 lightDirection = directionAndPdf.xyz;
    float lightPdf = directionAndPdf.w;
    float visibility = TraceShadow(scatterPosition, lightDirection, INF - EPS);
    if (lightPdf > 0.0 && visibility > TRANSMITTANCE_EPSILON)
    {
        vec3 value = evaluateBsdf(state.fhp, basis, inputLocal,
                                  worldToLocal(lightDirection, basis),
                                  MATERIAL_OPENPBR, bsdfPdf);
        if (bsdfPdf > 0.0)
        {
            float weight = PowerHeuristic(lightPdf, bsdfPdf);
            result += visibility * weight * value * environment * envMapIntensity /
                      max(PDF_EPSILON, lightPdf);
        }
    }
#endif
#endif

#ifdef OPT_LIGHTS
    if (numOfLights > 0)
    {
        int index = min(int(rand() * float(numOfLights)), numOfLights - 1);
        Light light = GetLight(index);
        LightSampleRec sample;
        SampleOneLight(light, scatterPosition, sample);
        float lightPdf = sample.pdf / float(numOfLights);
        float visibility = TraceShadow(scatterPosition, sample.direction, sample.dist - EPS);
        if (dot(sample.direction, sample.normal) < 0.0 && lightPdf > 0.0 && visibility > TRANSMITTANCE_EPSILON)
        {
            vec3 value = evaluateBsdf(state.fhp, basis, inputLocal,
                                      worldToLocal(sample.direction, basis),
                                      MATERIAL_OPENPBR, bsdfPdf);
            if (bsdfPdf > 0.0)
            {
                float weight = light.area > 0.0 ? PowerHeuristic(lightPdf, bsdfPdf) : 1.0;
                result += visibility * weight * value * sample.emission /
                          max(PDF_EPSILON, lightPdf);
            }
        }
    }
#endif

    return result;
}

vec3 LiDirect(in vec3 pW, in Basis basis,
              out vec3 shadowL, out vec3 shadowW,
              out float lightPdf, inout uint rndSeed)
{
    shadowL = vec3(0.0);
    shadowW = vec3(0.0);
    lightPdf = 0.0;
    State state;
    state.fhp = pW;
    state.ffnormal = basis.nW;
    state.tangent = basis.tW;
    state.texCoord = basis.texCoord;
    state.matID = g_mtlxActiveMatID;
    return DirectLight(Ray(pW, -basis.nW), state);
}

float LiPDF(in vec3 shadowW, in Basis basis)
{
#ifdef OPT_ENVMAP
#ifndef OPT_UNIFORM_LIGHT
    vec3 shadowL = worldToLocal(shadowW, basis);
    return EvalEnvMap(Ray(vec3(0.0), shadowW)).w;
#endif
#endif
    return 0.0;
}

#endif
