// MaterialX path tracing loop kept in a separate translation unit.
#ifdef MATERIALX_DISPATCH_READY

void ndcToCameraRay(in vec2 ndc, in mat4 cameraMatrix, in mat4 inverseProjection,
                    out vec3 origin, out vec3 direction)
{
    vec4 cameraPoint = inverseProjection * vec4(ndc, 1.0, 1.0);
    cameraPoint /= max(cameraPoint.w, DENOM_TOLERANCE);
    origin = (cameraMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
    direction = normalize((cameraMatrix * vec4(normalize(cameraPoint.xyz), 0.0)).xyz);
}

vec3 PathTrace()
{
    vec2 coordsTile;
    if (uLowRes)
    {
        coordsTile = TexCoords;
        InitRNG(gl_FragCoord.xy, 1);
    }
    else
    {
        coordsTile = mix(tileOffset, tileOffset + invNumTiles, TexCoords);
        InitRNG(gl_FragCoord.xy, frameNum);
    }

    vec2 jitter = 0.5 * vec2(sample_triangle_filter(rand()), sample_triangle_filter(rand())) / resolution;
    vec2 ndc = (coordsTile + jitter) * 2.0 - 1.0;
    Ray cameraRay;
    ndcToCameraRay(ndc, invModelMatrix * cameraWorldMatrix, invProjectionMatrix,
                   cameraRay.origin, cameraRay.direction);

    vec3 pW = cameraRay.origin;
    vec3 dW = cameraRay.direction;
    vec3 radiance = vec3(0.0);
    vec3 throughput = vec3(1.0);
    Basis basis = makeBasis(vec3(0.0, 0.0, 1.0));
    float bsdfPdfContinuation = 1.0;
    uint rndSeed = uint(gl_FragCoord.x + gl_FragCoord.y * resolution.x);
    xorshift(rndSeed);
    rndSeed ^= uint(frameNum);

#ifdef VOLUME_ENABLED
    Volume exteriorMedium;
    exteriorMedium.extinction = vec3(0.0);
    exteriorMedium.albedo = vec3(0.0);
    exteriorMedium.anisotropy = 0.0;
    Volume currentMedium = exteriorMedium;
#endif
    bool inDielectric = false;

    for (int vertex = 0; vertex <= maxDepth; ++vertex)
    {
#ifdef VOLUME_ENABLED
        bool insideVolume = inDielectric && maxComponent(currentMedium.extinction) > FLT_EPSILON;
        bool insideScatteringVolume = insideVolume && maxComponent(currentMedium.albedo) > FLT_EPSILON;
#else
        bool insideVolume = false;
        bool insideScatteringVolume = false;
#endif
        bool surfaceHit;
        vec3 pWNext;
        vec3 nsWNext;
        vec3 ngWNext;
        vec3 tsWNext;
        vec3 baryCoordNext;
        vec2 texCoordNext;
        int materialNext;
        int matIDNext = 0;

        if (!insideScatteringVolume)
        {
            surfaceHit = trace(pW, dW, HUGE_DIST, pWNext, nsWNext, ngWNext, tsWNext, baryCoordNext, texCoordNext, materialNext);
            matIDNext = g_ptHitMatID;
#ifdef VOLUME_ENABLED
            if (surfaceHit && insideVolume) throughput *= exp(-length(pWNext - pW) * currentMedium.extinction);
#endif
        }
#ifdef VOLUME_ENABLED
        else
        {
            vec3 volumeThroughput;
            vec3 dWNext;
            surfaceHit = trace_volumetric(pW, dW, rndSeed, currentMedium, volumeThroughput, pWNext, dWNext, nsWNext, ngWNext, tsWNext, baryCoordNext, texCoordNext, materialNext);
            matIDNext = g_ptHitMatID;
            dW = dWNext;
            throughput *= volumeThroughput;
            float maxVolumeThroughput = maxComponent(throughput);
            if (maxVolumeThroughput > firefly_clamp) throughput *= firefly_clamp / maxVolumeThroughput;
        }
#endif

        if (!surfaceHit)
        {
            float lightMisWeight = 1.0;
#ifdef OPT_ENVMAP
#ifndef OPT_UNIFORM_LIGHT
            vec4 environmentAndPdf = EvalEnvMap(Ray(pW, dW));
            if (vertex > 0 && !insideScatteringVolume) lightMisWeight = powerHeuristic(bsdfPdfContinuation, environmentAndPdf.w);
            vec3 environmentContribution = throughput * lightMisWeight * environmentAndPdf.rgb * envMapIntensity;
#else
            vec3 environmentContribution = throughput * uniformLightCol;
#endif
#else
            vec3 environmentContribution = throughput * uniformLightCol;
#endif
            float maxEnvironment = maxComponent(environmentContribution);
            if (maxEnvironment > firefly_clamp) environmentContribution *= firefly_clamp / maxEnvironment;
            radiance += environmentContribution;
            break;
        }

        if (vertex == maxDepth) break;
        pW = pWNext;
        basis = makeBasis(nsWNext, tsWNext, baryCoordNext, texCoordNext);
        vec3 geometricNormal = dot(ngWNext, basis.nW) < 0.0 ? -ngWNext : ngWNext;
        vec3 inputWorld = -dW;
        vec3 inputLocal = worldToLocal(inputWorld, basis);
        if (abs(inputLocal.z) < 1.0e-3) break;

        mtlx_load_material_params(matIDNext);
        mtlx_openpbr_prepare(pW, basis, inputLocal, rndSeed);
        bool thinWalled = mtlx_openpbr_is_thinwalled();
        vec3 thinFilmContribution = throughput * evaluateThinFilmEnvironmentReflection(basis, inputLocal);
        float maxThinFilm = maxComponent(thinFilmContribution);
        if (maxThinFilm > firefly_clamp) thinFilmContribution *= firefly_clamp / maxThinFilm;
        radiance += thinFilmContribution;

        Volume internalMedium;
        vec3 outputLocal;
        vec3 bsdfValue = sampleBsdf(pW, basis, inputLocal, rndSeed, MATERIAL_OPENPBR, outputLocal, bsdfPdfContinuation, internalMedium);
        vec3 outputWorld = localToWorld(outputLocal, basis);
        bool transmittedSample = inputLocal.z * outputLocal.z < 0.0;
        float outputCosine = transmittedSample ? abs(dot(outputWorld, basis.nW)) : 1.0;
        vec3 surfaceThroughput = bsdfValue / max(PDF_EPSILON, bsdfPdfContinuation) * outputCosine;
        float maxSurfaceThroughput = maxComponent(surfaceThroughput);
        if (maxSurfaceThroughput > firefly_clamp) surfaceThroughput *= firefly_clamp / maxSurfaceThroughput;
        dW = outputWorld;

        vec3 emission = throughput * evaluateEdf(pW, basis, inputLocal);
        float maxEmission = maxComponent(emission);
        if (maxEmission > firefly_clamp) emission *= firefly_clamp / maxEmission;
        radiance += emission;

        bool transmitted = !thinWalled && (dot(inputWorld, geometricNormal) * dot(dW, geometricNormal) < 0.0);
#ifdef VOLUME_ENABLED
        if (transmitted)
        {
            inDielectric = !inDielectric;
            currentMedium = inDielectric ? internalMedium : exteriorMedium;
        }
#endif

        if (!inDielectric && !transmitted)
        {
            State directState;
            directState.fhp = pW;
            directState.ffnormal = basis.nW;
            directState.normal = basis.nW;
            directState.tangent = basis.tW;
            directState.bitangent = basis.bW;
            directState.texCoord = basis.texCoord;
            directState.matID = matIDNext;
            directState.isEmitter = false;
            vec3 direct = throughput * DirectLight(Ray(pW, -inputWorld), directState);
            float maxDirect = maxComponent(direct);
            if (maxDirect > firefly_clamp) direct *= firefly_clamp / maxDirect;
            radiance += direct;
        }

        // Move the next ray both off the surface and slightly along its outgoing
        // direction. The directional term prevents grazing transmitted rays from
        // re-entering the same shell and producing a thin halo at the silhouette.
        pW += geometricNormal * sign(dot(dW, geometricNormal)) * RAY_OFFSET;
        pW += dW * RAY_OFFSET;
        throughput *= surfaceThroughput;
        float maxThroughput = maxComponent(throughput);
        if (maxThroughput > firefly_clamp) throughput *= firefly_clamp / maxThroughput;
        if (maxComponent(throughput) < 1.0 && vertex > 1)
        {
            float terminationProbability = max(0.0, 1.0 - maxComponent(throughput));
            if (rand(rndSeed) < terminationProbability) break;
            throughput /= 1.0 - terminationProbability;
        }
    }

    if (!uLowRes) radiance += texture(accumTexture, coordsTile).rgb;
    return radiance;
}

#else

vec3 PathTrace()
{
    return vec3(0.0);
}

#endif
