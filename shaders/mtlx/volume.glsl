// MaterialX volumetric random walk ported from pathtracer.glsl.
#ifdef VOLUME_ENABLED

#define MIN_VOLUME_STEPS_BEFORE_RR 3

int sample_channel(in vec3 albedo, in vec3 throughput, inout uint rndSeed, inout vec3 channel_probs)
{
    vec3 weights = abs(throughput);
    float sum = weights.r + weights.g + weights.b;
    channel_probs = weights / max(DENOM_TOLERANCE, sum);
    float cdf = 0.0;
    float randomValue = rand(rndSeed);
    for (int channel = 0; channel < 3; ++channel)
    {
        cdf += channel_probs[channel];
        if (randomValue < cdf) return channel;
    }
    return 0;
}

bool trace_volumetric(in vec3 pW, in vec3 dW, inout uint rndSeed,
                      in Volume volume,
                      out vec3 volume_throughput,
                      out vec3 pW_hit,
                      out vec3 dW_hit,
                      out vec3 NsW_hit,
                      out vec3 NgW_hit,
                      out vec3 TsW_hit,
                      out vec3 baryCoord_hit,
                      out vec2 texCoord_hit,
                      out int material_hit)
{
    vec3 pWalk = pW;
    vec3 dWalk = dW;
    vec3 mfp = 1.0 / max(vec3(DENOM_TOLERANCE), volume.extinction);
    volume_throughput = vec3(1.0);
    for (int n = 0; n < max_volume_steps; ++n)
    {
        vec3 channel_probs;
        int channel = sample_channel(volume.albedo, volume_throughput, rndSeed, channel_probs);
        float walk_step = -log(max(rand(rndSeed), DENOM_TOLERANCE)) * mfp[channel];
        bool surface_hit = trace(pWalk, dWalk, walk_step,
                                 pW_hit, NsW_hit, NgW_hit, TsW_hit,
                                 baryCoord_hit, texCoord_hit, material_hit);
        if (surface_hit)
        {
            float distance_to_surface = length(pW_hit - pWalk);
            vec3 transmittance = exp(-distance_to_surface * volume.extinction);
            volume_throughput *= transmittance /
                max(DENOM_TOLERANCE, dot(channel_probs, transmittance));
            dW_hit = dWalk;
            return true;
        }

        if (n > MIN_VOLUME_STEPS_BEFORE_RR)
        {
            float continuation_prob = clamp(maxComponent(volume_throughput), 0.0, 1.0);
            float termination_prob = 1.0 - continuation_prob;
            if (rand(rndSeed) < termination_prob) break;
            volume_throughput /= continuation_prob;
        }

        vec3 transmittance = exp(-walk_step * volume.extinction);
        volume_throughput *= volume.albedo * volume.extinction * transmittance;
        volume_throughput /= max(DENOM_TOLERANCE,
                                 dot(channel_probs, volume.extinction * transmittance));
        pWalk += walk_step * dWalk;
        dWalk = normalize(samplePhaseFunction(dWalk, volume.anisotropy, rndSeed));
    }
    dW_hit = dWalk;
    return false;
}

#endif
