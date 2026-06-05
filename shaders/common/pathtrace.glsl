/*
 * MIT License
 *
 * Copyright(c) 2019 Asif Ali
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*__PROCEDURAL_MATERIAL_INJECTION__*/
void ApplyProceduralMaterialOverrides(int matId, inout Material mat, inout State state, ivec4 texIDs, Ray r) {}
void ApplyProceduralMaterialClosureContract(int matId, in Material mat, in State state) {}

void GetMaterial(inout State state, in Ray r)
{
    int index = state.matID * MATERIALS_TEX_STRIDE;
    Material mat;
    Medium medium;

    vec4 param1 = texelFetch1D(materialsTex, index + 0);
    vec4 param2 = texelFetch1D(materialsTex, index + 1);
    vec4 param3 = texelFetch1D(materialsTex, index + 2);
    vec4 param4 = texelFetch1D(materialsTex, index + 3);
    vec4 param5 = texelFetch1D(materialsTex, index + 4);
    vec4 param6 = texelFetch1D(materialsTex, index + 5);
    vec4 param7 = texelFetch1D(materialsTex, index + 6);
    vec4 param8 = texelFetch1D(materialsTex, index + 7);
    vec4 param9 = texelFetch1D(materialsTex, index + 8);
    vec4 param10 = texelFetch1D(materialsTex, index + 9);
    vec4 param11 = texelFetch1D(materialsTex, index + 10);
    vec4 param12 = texelFetch1D(materialsTex, index + 11);
    vec4 param13 = texelFetch1D(materialsTex, index + 12);
    vec4 param14 = texelFetch1D(materialsTex, index + 13);
    vec4 param15 = texelFetch1D(materialsTex, index + 14);
    vec4 param16 = texelFetch1D(materialsTex, index + 15);
    vec4 param17 = texelFetch1D(materialsTex, index + 16);

    mat.baseColor          = param1.rgb;
    mat.anisotropic        = clamp(param1.w, 0.0, 1.0);

    mat.emission           = param2.rgb;
    mat.medium.thickness   = max(param2.w, 0.0);

    mat.metallic           = clamp(param3.x, 0.0, 1.0);
    mat.roughness          = max(clamp(param3.y, 0.0, 1.0), 0.001);
    mat.subsurface         = param3.z;
    mat.specularTint       = clamp(param3.w, 0.0, 1.0);

    mat.sheen              = clamp(param4.x, 0.0, 1.0);
    mat.sheenTint          = clamp(param4.y, 0.0, 1.0);
    mat.clearcoat          = clamp(param4.z, 0.0, 1.0);
    // OpenPBR parity: allow full coat roughness range through clearcoatGloss.
    mat.clearcoatRoughness = max(1.0 - clamp(param4.w, 0.0, 1.0), 0.001);

    mat.specTrans          = clamp(param5.x, 0.0, 1.0);
    mat.ior                = max(param5.y, 1.0);
    mat.medium.type        = int(param5.z);
    mat.medium.density     = max(param5.w, 0.0);

    mat.medium.color       = clamp(param6.rgb, vec3(0.0), vec3(1.0));
    // OpenPBR parity: support near-full HG anisotropy range while avoiding singularities at |g|=1.
    mat.medium.anisotropy  = clamp(param6.w, -0.99, 0.99);
    mat.medium.absorption  = max(param9.x, 0.0);
    mat.baseWeight         = clamp(param9.y, 0.0, 1.0);
    mat.baseDiffuseRoughness = clamp(param9.z, 0.0, 1.0);
    mat.coatDarkening      = clamp(param9.w, 0.0, 1.0);
    mat.specularColor      = max(param10.rgb, vec3(0.0));
    mat.coatIOR            = max(param10.w, 1.01);
    mat.coatColor          = max(param11.rgb, vec3(0.0));
    mat.coatRoughnessAnisotropy = clamp(param11.w, 0.0, 1.0);

    mat.transmissionColor = clamp(param12.rgb, vec3(0.0), vec3(1.0));
    mat.thinWalled = clamp(param12.w, 0.0, 1.0);
    mat.subsurfaceRadiusScale = max(param13.rgb, vec3(0.001));
    mat.fuzzColor = vec3(param13.w, param14.w, param15.w);
    if (min(mat.fuzzColor.r, min(mat.fuzzColor.g, mat.fuzzColor.b)) >= 0.0)
        mat.fuzzColor = clamp(mat.fuzzColor, vec3(0.0), vec3(1.0));

    // OpenPBR: velvet/fuzz, dispersion, thin film (étape 7, 8, 9)
    mat.fuzzRoughness = clamp(param14.x, 0.0, 1.0);
    mat.dispersionScale = clamp(param14.y, 0.0, 1.0);
    mat.abbeNumber = max(param14.z, 1.0);

    // OpenPBR: thinFilmWeight, thinFilmThickness, thinFilmIor
    mat.thinFilmWeight = clamp(param15.x, 0.0, 1.0);
    mat.thinFilmThickness = max(param15.y, 0.0);
    mat.thinFilmIor = max(param15.z, 1.0);

    mat.uvScale = max(param16.xy, vec2(0.001));
    mat.specularWeight = clamp(param16.z, 0.0, 1.0);
    mat.anisotropyRotation     = fract(param16.w);
    mat.coatAnisotropyRotation = fract(param17.x);
    mat.coatAffectRoughness       = clamp(param17.y, 0.0, 1.0);
    mat.transmissionExtraRoughness = param17.z; // may be negative; clamped in shader
    mat.materialType              = param17.w;  // 0 = Disney/OpenPBR, 1 = hair

    ivec4 texIDs           = ivec4(param7);

    mat.opacity            = param8.x;
    mat.alphaMode          = int(param8.y);
    mat.alphaCutoff        = param8.z;
    mat.doubleSided        = clamp(param8.w, 0.0, 1.0);

#ifndef OPT_RAYMARCHING

    // Base Color Map
    if (texIDs.x >= 0)
    {
        vec4 col = texture(textureMapsArrayTex, vec3(state.texCoord * mat.uvScale, texIDs.x));
        mat.baseColor.rgb *= pow(col.rgb, vec3(2.2));
        mat.opacity *= col.a;
    }

    // Metallic Roughness Map
    if (texIDs.y >= 0)
    {
        vec2 matRgh = texture(textureMapsArrayTex, vec3(state.texCoord * mat.uvScale, texIDs.y)).bg;
        mat.metallic = clamp(matRgh.x, 0.0, 1.0);
        mat.roughness = max(matRgh.y * matRgh.y, 0.001);
    }

    // Normal Map
    if (texIDs.z >= 0)
    {
        vec3 texNormal = texture(textureMapsArrayTex, vec3(state.texCoord * mat.uvScale, texIDs.z)).rgb;

#ifdef OPT_OPENGL_NORMALMAP
        texNormal.y = 1.0 - texNormal.y;
#endif
        texNormal = normalize(texNormal * 2.0 - 1.0);

        vec3 origNormal = state.normal;
        state.normal = normalize(state.tangent * texNormal.x + state.bitangent * texNormal.y + state.normal * texNormal.z);
        state.ffnormal = dot(origNormal, r.direction) <= 0.0 ? state.normal : -state.normal;
    }

    // Emission Map
    if (texIDs.w >= 0)
        mat.emission = pow(texture(textureMapsArrayTex, vec3(state.texCoord * mat.uvScale, texIDs.w)).rgb, vec3(2.2));

    ApplyProceduralMaterialOverrides(state.matID, mat, state, texIDs, r);
    gMaterialXClosureContractValid = 0;
    gMaterialXClosureKind = D4_CLOSURE_KIND_GENERIC;
    gMaterialXClosureModel = 0;
    gMaterialXClosureFlags = 0;
    ApplyProceduralMaterialClosureContract(state.matID, mat, state);

#endif

#ifdef OPT_ROUGHNESS_MOLLIFICATION
    if(state.depth > 0)
        mat.roughness = max(mix(0.0, state.mat.roughness, roughnessMollificationAmt), mat.roughness);
#endif

    // OpenPBR parity: anisotropy=1 should approach the highly elongated limit.
    // Keep a small floor for numerical stability in GGX sampling/evaluation.
    // coat_affect_roughness (SS): coat increases perceived base roughness.
    // For hair materials, anisotropic holds azimuthalRoughness; skip GGX ax/ay computation.
    if (mat.materialType < 0.5) {
        float baseRoughness = clamp(mat.roughness + mat.coatAffectRoughness * mat.clearcoat * mat.clearcoatRoughness, 0.001, 1.0);
        float aspect = sqrt(max(1.0 - mat.anisotropic, 1e-4));
        mat.ax = max(0.001, baseRoughness / aspect);
        mat.ay = max(0.001, baseRoughness * aspect);

        float coatAnisoAspect = sqrt(max(1.0 - mat.coatRoughnessAnisotropy, 1e-4));
        mat.coatAx = max(0.001, mat.clearcoatRoughness / coatAnisoAspect);
        mat.coatAy = max(0.001, mat.clearcoatRoughness * coatAnisoAspect);
    } else {
        // Hair: ax/ay unused; set safe defaults to avoid undefined reads
        mat.ax = 0.5; mat.ay = 0.5;
        mat.coatAx = 0.5; mat.coatAy = 0.5;
    }

    state.mat = mat;
    state.eta = dot(r.direction, state.normal) < 0.0 ? (1.0 / mat.ior) : mat.ior;
    // Ajout : gestion double face
    if (mat.doubleSided > 0.5 && dot(r.direction, state.normal) > 0.0) {
        state.normal = -state.normal;
        state.ffnormal = -state.ffnormal;
    }
}

// TODO: Recheck all of this
#if defined(OPT_MEDIUM) && defined(OPT_VOL_MIS)
vec3 EvalTransmittance(Ray r)
{
    LightSampleRec lightSample;
    State state;
    vec3 transmittance = vec3(1.0);

    for (int depth = 0; depth < maxDepth; depth++)
    {
        bool hit = ClosestHit(r, state, lightSample);

        // If no hit (environment map) or if ray hit a light source then return transmittance
        if (!hit || state.isEmitter)
            break;

        // TODO: Get only parameters that are needed to calculate transmittance
        GetMaterial(state, r);

        bool alphatest = (state.mat.alphaMode == ALPHA_MODE_MASK && state.mat.opacity < state.mat.alphaCutoff) || (state.mat.alphaMode == ALPHA_MODE_BLEND && rand() > state.mat.opacity);
        bool refractive = (1.0 - state.mat.metallic) * state.mat.specTrans > 0.0;

        // Refraction is ignored (Not physically correct but helps with sampling lights from inside refractive objects)
        if(hit && !(alphatest || refractive))
            return vec3(0.0);

        // Evaluate transmittance
        if (dot(r.direction, state.normal) > 0. && state.mat.medium.type != MEDIUM_NONE)
        {
            vec3 color = state.mat.medium.type == MEDIUM_ABSORB ? vec3(1.0) - state.mat.medium.color : vec3(1.0);
            transmittance *= exp(-color * state.mat.medium.density * state.hitDist);
        }

        // Move ray origin to hit point
        r.origin = state.fhp + r.direction * EPS;
    }

    return transmittance;
}
#endif

vec3 DirectLight(in Ray r, in State state, bool isSurface)
{
    vec3 Ld = vec3(0.0);
    vec3 Li = vec3(0.0);
    vec3 scatterPos = state.fhp + state.normal * EPS;

    ScatterSampleRec scatterSample;

    // Environment Light
#ifdef OPT_ENVMAP
#ifndef OPT_UNIFORM_LIGHT
    {
        vec3 color;
        vec4 dirPdf = SampleEnvMap(Li);
        vec3 lightDir = dirPdf.xyz;
        float lightPdf = dirPdf.w;

        Ray shadowRay = Ray(scatterPos, lightDir);

#if defined(OPT_MEDIUM) && defined(OPT_VOL_MIS)
        // If there are volumes in the scene then evaluate transmittance rather than a binary anyhit test
        Li *= EvalTransmittance(shadowRay);

        if (isSurface)
        {
            int closureFlags;
            scatterSample.f = EvalClosure(state, -r.direction, state.ffnormal, lightDir, scatterSample.pdf, closureFlags);
            scatterSample.flags = closureFlags;
        }
        else
        {
            float p = PhaseHG(dot(-r.direction, lightDir), state.medium.anisotropy);
            scatterSample.f = vec3(p);
            scatterSample.pdf = p;
            scatterSample.flags = 0;
        }

        if (scatterSample.pdf > 0.0 && (!isSurface || ClosureSupportsDirection(scatterSample.flags, -r.direction, lightDir)))
        {
            float misWeight = PowerHeuristic(lightPdf, scatterSample.pdf);
            if (misWeight > 0.0)
                Ld += misWeight * Li * scatterSample.f * envMapIntensity / lightPdf;
        }
#else
        // If there are no volumes in the scene then use a simple binary hit test
        bool inShadow = AnyHit(shadowRay, INF - EPS);
        
        if (!inShadow)
        {
            int closureFlags;
            scatterSample.f = EvalClosure(state, -r.direction, state.ffnormal, lightDir, scatterSample.pdf, closureFlags);
            scatterSample.flags = closureFlags;

            if (scatterSample.pdf > 0.0 && ClosureSupportsDirection(scatterSample.flags, -r.direction, lightDir))
            {
                float misWeight = PowerHeuristic(lightPdf, scatterSample.pdf);
                if (misWeight > 0.0)
                    Ld += misWeight * Li * scatterSample.f * envMapIntensity / lightPdf;
            }
        }
#endif
    }
#endif
#endif

    // Analytic Lights
#ifdef OPT_LIGHTS
    {
        LightSampleRec lightSample;
        Light light;

        //Pick a light to sample
        int index = int(rand() * float(numOfLights)) * 5;

        // Fetch light Data
        vec3 position = texelFetch1D(lightsTex, index + 0).xyz;
        vec3 emission = texelFetch1D(lightsTex, index + 1).xyz;
        vec3 u        = texelFetch1D(lightsTex, index + 2).xyz; // u vector for rect
        vec3 v        = texelFetch1D(lightsTex, index + 3).xyz; // v vector for rect
        vec3 params   = texelFetch1D(lightsTex, index + 4).xyz;
        float radius  = params.x;
        float area    = params.y;
        float type    = params.z; // 0->Rect, 1->Sphere, 2->Distant

        light = Light(position, emission, u, v, radius, area, type);

        SampleOneLight(light, scatterPos, lightSample);
        Li = lightSample.emission;

        if (dot(lightSample.direction, lightSample.normal) < 0.0) // Required for quad lights with single sided emission
        {
            Ray shadowRay = Ray(scatterPos, lightSample.direction);

            // If there are volumes in the scene then evaluate transmittance rather than a binary anyhit test
#if defined(OPT_MEDIUM) && defined(OPT_VOL_MIS)
            Li *= EvalTransmittance(shadowRay);

            if (isSurface)
            {
                int closureFlags;
                scatterSample.f = EvalClosure(state, -r.direction, state.ffnormal, lightSample.direction, scatterSample.pdf, closureFlags);
                scatterSample.flags = closureFlags;
            }
            else
            {
                float p = PhaseHG(dot(-r.direction, lightSample.direction), state.medium.anisotropy);
                scatterSample.f = vec3(p);
                scatterSample.pdf = p;
                scatterSample.flags = 0;
            }

            float misWeight = 1.0;
            if(light.area > 0.0) // No MIS for distant light
                misWeight = PowerHeuristic(lightSample.pdf, scatterSample.pdf);

            if (scatterSample.pdf > 0.0 && (!isSurface || ClosureSupportsDirection(scatterSample.flags, -r.direction, lightSample.direction)))
                Ld += misWeight * scatterSample.f * Li / lightSample.pdf;
#else
            // If there are no volumes in the scene then use a simple binary hit test
            bool inShadow = AnyHit(shadowRay, lightSample.dist - EPS);

            if (!inShadow)
            {
                int closureFlags;
                scatterSample.f = EvalClosure(state, -r.direction, state.ffnormal, lightSample.direction, scatterSample.pdf, closureFlags);
                scatterSample.flags = closureFlags;

                float misWeight = 1.0;
                if(light.area > 0.0) // No MIS for distant light
                    misWeight = PowerHeuristic(lightSample.pdf, scatterSample.pdf);

                if (scatterSample.pdf > 0.0 && ClosureSupportsDirection(scatterSample.flags, -r.direction, lightSample.direction))
                    Ld += misWeight * Li * scatterSample.f / lightSample.pdf;
            }
#endif
        }
    }
#endif

    return Ld;
}

vec4 PathTrace(Ray r)
{
    vec3 radiance = vec3(0.0);
    vec3 throughput = vec3(1.0);
    State state;
    LightSampleRec lightSample;
    ScatterSampleRec scatterSample;
    scatterSample.pdf = 0.0;
    scatterSample.flags = 0;

    // FIXME: alpha from material opacity/medium density
    float alpha = 1.0;

    // For medium tracking
    bool inMedium = false;
    bool mediumSampled = false;
    bool surfaceScatter = false;

    for (state.depth = 0;; state.depth++)
    {
        bool hit = ClosestHit(r, state, lightSample);

        if (!hit)
        {
#if defined(OPT_BACKGROUND) || defined(OPT_TRANSPARENT_BACKGROUND)
            if (state.depth == 0)
                alpha = 0.0;
#endif

#ifdef OPT_HIDE_EMITTERS
            if(state.depth > 0)
#endif
            {
#ifdef OPT_UNIFORM_LIGHT
                radiance += uniformLightCol * throughput;
#else
#ifdef OPT_ENVMAP
                vec4 envMapColPdf = EvalEnvMap(r);

                float misWeight = 1.0;
                bool hasPrevSurfaceSample = (scatterSample.pdf > 0.0) && ((scatterSample.flags & (CLOSURE_FLAG_REFLECT | CLOSURE_FLAG_TRANSMIT)) != 0);

                // Gather radiance from envmap and use scatterSample.pdf from previous bounce for MIS
                if (state.depth > 0 && hasPrevSurfaceSample)
                    misWeight = PowerHeuristic(scatterSample.pdf, envMapColPdf.w);

#if defined(OPT_MEDIUM) && !defined(OPT_VOL_MIS)
                if(!surfaceScatter)
                    misWeight = 1.0f;
#endif

                if(misWeight > 0.)
                    radiance += misWeight * envMapColPdf.rgb * throughput * envMapIntensity;
#endif
#endif
             }
             break;
        }

        GetMaterial(state, r);

        // Gather radiance from emissive objects. Emission from meshes is not importance sampled
        radiance += state.mat.emission * throughput;
        
#ifdef OPT_LIGHTS

        // Gather radiance from light and use scatterSample.pdf from previous bounce for MIS
        if (state.isEmitter)
        {
            float misWeight = 1.0;
            bool hasPrevSurfaceSample = (scatterSample.pdf > 0.0) && ((scatterSample.flags & (CLOSURE_FLAG_REFLECT | CLOSURE_FLAG_TRANSMIT)) != 0);

            if (state.depth > 0 && hasPrevSurfaceSample)
                misWeight = PowerHeuristic(scatterSample.pdf, lightSample.pdf);

#if defined(OPT_MEDIUM) && !defined(OPT_VOL_MIS)
            if(!surfaceScatter)
                misWeight = 1.0f;
#endif

            radiance += misWeight * lightSample.emission * throughput;

            break;
        }
#endif
        // Stop tracing ray if maximum depth was reached
        if(state.depth == maxDepth)
            break;

#ifdef OPT_MEDIUM

        mediumSampled = false;
        surfaceScatter = false;

        // Handle absorption/emission/scattering from medium
        // TODO: Handle light sources placed inside medium
        if(inMedium)
        {
            if(state.medium.type == MEDIUM_ABSORB)
            {
                throughput *= exp(-(1.0 - state.medium.color) * state.hitDist * state.medium.density);
            }
            else if(state.medium.type == MEDIUM_EMISSIVE)
            {
                radiance += state.medium.color * state.hitDist * state.medium.density * throughput;
            }
            else
            {
                // Sample a distance in the medium
                float scatterDist = min(-log(rand()) / state.medium.density, state.hitDist);
                mediumSampled = scatterDist < state.hitDist;

                if (mediumSampled)
                {
                    throughput *= state.medium.color;

                    // Move ray origin to scattering position
                    r.origin += r.direction * scatterDist;
                    state.fhp = r.origin;

                    // Transmittance Evaluation
                    radiance += DirectLight(r, state, false) * throughput;

                    // Pick a new direction based on the phase function
                    vec3 scatterDir = SampleHG(-r.direction, state.medium.anisotropy, rand(), rand());
                    scatterSample.pdf = PhaseHG(dot(-r.direction, scatterDir), state.medium.anisotropy);
                    scatterSample.flags = 0;
                    r.direction = scatterDir;
                }
            }
        }

        // If medium was not sampled then proceed with surface BSDF evaluation
        if (!mediumSampled)
        {
#endif
#ifdef OPT_ALPHA_TEST

            // Ignore intersection and continue ray based on alpha test
            if ((state.mat.alphaMode == ALPHA_MODE_MASK && state.mat.opacity < state.mat.alphaCutoff) ||
                (state.mat.alphaMode == ALPHA_MODE_BLEND && rand() > state.mat.opacity))
            {
                scatterSample.L = r.direction;
                scatterSample.pdf = 0.0;
                scatterSample.flags = 0;
                state.depth--;
            }
            else
#endif
            {
                surfaceScatter = true;

                // Next event estimation
                radiance += DirectLight(r, state, true) * throughput;

                // Sample BSDF for color and outgoing direction
                int closureFlags;
                scatterSample.f = SampleClosure(state, -r.direction, state.ffnormal, scatterSample.L, scatterSample.pdf, closureFlags);
                scatterSample.flags = closureFlags;
                if (scatterSample.pdf > 0.0)
                    throughput *= scatterSample.f / scatterSample.pdf;
                else
                    break;
            }

            // Move ray origin to hit point and set direction for next bounce
            r.direction = scatterSample.L;
            r.origin = state.fhp + r.direction * EPS;

#ifdef OPT_MEDIUM

            // Note: Nesting of volumes isn't supported due to lack of a volume stack for performance reasons
            // Ray is in medium only if it is entering a surface containing a medium
            if (dot(r.direction, state.normal) < 0. && state.mat.medium.type != MEDIUM_NONE && state.mat.thinWalled < 0.5)
            {
                inMedium = true;
                // Get medium params from the intersected object
                state.medium = state.mat.medium;
            }
            // FIXME: Objects clipping or inside a medium were shaded incorrectly as inMedium would be set to false.
            // This hack works for now but needs some rethinking
            else if(state.mat.medium.type != MEDIUM_NONE)
                inMedium = false;
        }
#endif

#ifdef OPT_RR
        // Russian roulette
        if (state.depth >= OPT_RR_DEPTH)
        {
            float q = min(max(throughput.x, max(throughput.y, throughput.z)) + 0.001, 0.95);
            if (rand() > q)
                break;
            throughput /= q;
        }
#endif

    }

    return vec4(radiance, alpha);
}