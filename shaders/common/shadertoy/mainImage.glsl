void run( out vec4 fragColor, in vec2 fragCoord, int dirty, vec2 coordsTile )
{
    Camera3D camera3d = getCamera(iChannel0);

    if (dirty != 0) {
        maxDepth = 2;
    }

    InitRNG(fragCoord, iFrame);

    float r1 = 2.0 * rand();
    float r2 = 2.0 * rand();

    vec2 jitter;
    jitter.x = r1 < 1.0 ? sqrt(r1) - 1.0 : 1.0 - sqrt(2.0 - r1);
    jitter.y = r2 < 1.0 ? sqrt(r2) - 1.0 : 1.0 - sqrt(2.0 - r2);

    jitter /= (iResolution.xy * 0.5);
    vec2 d = (2.0 * coordsTile - 1.0) + jitter;

    float scale = tan(camera3d.fov * 0.5);
    d.y *= iResolution.y / iResolution.x * scale;
    d.x *= scale;
    vec3 rayDir = normalize(d.x * camera3d.right + d.y * camera3d.up + camera3d.forward);

    vec3 focalPoint = camera3d.focalDist * rayDir;
    float cam_r1 = rand() * TWO_PI;
    float cam_r2 = rand() * camera3d.aperture;
    vec3 randomAperturePos = (cos(cam_r1) * camera3d.right + sin(cam_r1) * camera3d.up) * sqrt(cam_r2);
    vec3 finalRayDir = normalize(focalPoint - randomAperturePos);

    Ray ray = Ray(camera3d.position + randomAperturePos, finalRayDir);

    // Pathtrace
    fragColor = PathTrace(ray);
}