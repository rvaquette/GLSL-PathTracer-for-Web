vec4 EvalEnvMap(Ray r) {
#ifndef OPT_SHADERTOY_LIGHT
    return texture(envMapTex, r.direction);
#else
    return vec4(0);
#endif
}

vec3 SampleSphere(float u1, float u2) {
    float z = 1.0 - 2.0 * u1;
    float r = sqrt(max(0.0, 1.0 - z * z));
    float phi = TWO_PI * u2;
    return vec3(r * cos(phi), r * sin(phi), z);
}

vec4 SampleEnvMap(inout vec3 color)
{
#ifndef OPT_SHADERTOY_LIGHT
    vec3 dir = SampleSphere(rand(), rand());
    color = texture(envMapTex, dir).rgb;
    return vec4(dir, 1.0 / (4.0 * PI));
#else
    return vec4(0);
#endif
}