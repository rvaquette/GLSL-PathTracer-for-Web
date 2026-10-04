// Local scene adapter for the MaterialX pathtracer contract.
// The traversal mirrors the distant bvhIntersectFirstHitWithinDistance contract
// while reading the local BVH, vertex, normal and transform textures.

// Scene material ID of the last `trace()` hit (TLAS leaf payload).
int g_ptHitMatID = 0;

bool bvhIntersectFirstHitWithinDistance(
    sampler2D nodes, isampler2D indices, sampler2D positions, vec3 rayOrigin, vec3 rayDirection, in float maxDistance,
    inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
    inout float side, inout float dist, out int matID)
{
    float closestDistance = min(maxDistance, INF);
    int stack[64];
    int stackPointer = 0;
    stack[stackPointer++] = -1;
    int index = topBVHIndex;
    bool inBlas = false;
    mat4 transform = mat4(1.0);
    mat4 instanceTransform = mat4(1.0);
    Ray transformedRay;
    transformedRay.origin = rayOrigin;
    transformedRay.direction = rayDirection;
    ivec3 hitTriangle = ivec3(-1);
    vec3 hitBary = vec3(0.0);
    vec3 hitNormal = vec3(0.0, 0.0, 1.0);
    float hitSide = 1.0;
    int currentMatID = 0;
    matID = 0;

    while (index != -1)
    {
        bool advanced = false;
        ivec3 children = ivec3(texelFetch(nodes, index * 3 + 2).xyz);
        int leftIndex = children.x;
        int rightIndex = children.y;
        int leaf = children.z;

        if (leaf > 0)
        {
            for (int triangle = 0; triangle < rightIndex; ++triangle)
            {
                ivec3 vertexIndices = ivec3(texelFetchI(indices, leftIndex + triangle).xyz);
                vec3 vertex0 = texelFetch(positions, vertexIndices.x).xyz;
                vec3 vertex1 = texelFetch(positions, vertexIndices.y).xyz;
                vec3 vertex2 = texelFetch(positions, vertexIndices.z).xyz;
                vec3 edge0 = vertex1 - vertex0;
                vec3 edge1 = vertex2 - vertex0;
                vec3 pVector = cross(transformedRay.direction, edge1);
                float determinant = dot(edge0, pVector);
                if (abs(determinant) <= DENOM_TOLERANCE) continue;
                vec3 tVector = transformedRay.origin - vertex0;
                vec3 qVector = cross(tVector, edge0);
                vec3 baryAndDistance = vec3(
                    dot(tVector, pVector),
                    dot(transformedRay.direction, qVector),
                    dot(edge1, qVector)) / determinant;
                float bary0 = 1.0 - baryAndDistance.x - baryAndDistance.y;
                if (bary0 >= 0.0 && baryAndDistance.x >= 0.0 && baryAndDistance.y >= 0.0 &&
                    baryAndDistance.z > 0.0)
                {
                    vec3 localHit = transformedRay.origin + baryAndDistance.z * transformedRay.direction;
                    vec3 worldHit = (instanceTransform * vec4(localHit, 1.0)).xyz;
                    float worldDistance = dot(worldHit - rayOrigin, rayDirection) /
                        max(dot(rayDirection, rayDirection), DENOM_TOLERANCE);
                    if (worldDistance <= 0.0 || worldDistance >= closestDistance) continue;
                    closestDistance = worldDistance;
                    hitTriangle = vertexIndices;
                    hitBary = vec3(bary0, baryAndDistance.x, baryAndDistance.y);
                    hitNormal = normalize(cross(edge0, edge1));
                    hitSide = dot(hitNormal, transformedRay.direction) <= 0.0 ? 1.0 : -1.0;
                    transform = instanceTransform;
                    matID = currentMatID;
                }
            }
        }
        else if (leaf < 0)
        {
            vec4 row0 = texelFetch1D(transformsTex, (-leaf - 1) * 4 + 0);
            vec4 row1 = texelFetch1D(transformsTex, (-leaf - 1) * 4 + 1);
            vec4 row2 = texelFetch1D(transformsTex, (-leaf - 1) * 4 + 2);
            vec4 row3 = texelFetch1D(transformsTex, (-leaf - 1) * 4 + 3);
            instanceTransform = mat4(row0, row1, row2, row3);
            mat4 inverseTransform = inverse(instanceTransform);
            transformedRay.origin = vec3(inverseTransform * vec4(rayOrigin, 1.0));
            transformedRay.direction = vec3(inverseTransform * vec4(rayDirection, 0.0));
            stack[stackPointer++] = -1;
            index = leftIndex;
            inBlas = true;
            currentMatID = rightIndex;
            advanced = true;
        }
        else
        {
            float leftDistance = AABBIntersect(texelFetch(nodes, leftIndex * 3 + 0).xyz,
                                                texelFetch(nodes, leftIndex * 3 + 1).xyz,
                                                transformedRay);
            float rightDistance = AABBIntersect(texelFetch(nodes, rightIndex * 3 + 0).xyz,
                                                 texelFetch(nodes, rightIndex * 3 + 1).xyz,
                                                 transformedRay);
            if (leftDistance > 0.0 && rightDistance > 0.0)
            {
                int deferred = leftDistance > rightDistance ? leftIndex : rightIndex;
                index = leftDistance > rightDistance ? rightIndex : leftIndex;
                stack[stackPointer++] = deferred;
                advanced = true;
            }
            else if (leftDistance > 0.0)
            {
                index = leftIndex;
                advanced = true;
            }
            else if (rightDistance > 0.0)
            {
                index = rightIndex;
                advanced = true;
            }
        }

        if (!advanced)
        {
            index = stack[--stackPointer];
            if (inBlas && index == -1)
            {
                inBlas = false;
                index = stack[--stackPointer];
                transformedRay.origin = rayOrigin;
                transformedRay.direction = rayDirection;
            }
        }
    }

    if (hitTriangle.x == -1) return false;
    faceIndices = uvec4(uvec3(hitTriangle), 0u);
    faceNormal = normalize(transpose(inverse(mat3(transform))) * hitNormal);
    barycoord = hitBary;
    side = hitSide;
    dist = closestDistance;
    return true;
}

bool trace(in vec3 rayOrigin, in vec3 rayDir, in float maxDistance,
           out vec3 P, out vec3 Ns, out vec3 Ng, out vec3 Ts,
           out vec3 baryCoord, out vec2 texCoord, out int material)
{
    uvec4 faceIndices = uvec4(0u);
    vec3 faceNormal = vec3(0.0, 0.0, 1.0);
    vec3 barycoord = vec3(0.0);
    float side = 1.0;
    float distance = HUGE_DIST;
    int matID = 0;
    bool hit = bvhIntersectFirstHitWithinDistance(BVH, vertexIndicesTex, verticesTex,
                                                   rayOrigin, rayDir, maxDistance,
                                                   faceIndices, faceNormal, barycoord,
                                                   side, distance, matID);
    if (!hit) return false;
    g_ptHitMatID = matID;

    P = rayOrigin + distance * rayDir;
    baryCoord = barycoord;
    Ng = safe_normalize(faceNormal);
    vec4 normal0 = texelFetch(normalsTex, int(faceIndices.x));
    vec4 normal1 = texelFetch(normalsTex, int(faceIndices.y));
    vec4 normal2 = texelFetch(normalsTex, int(faceIndices.z));
    Ns = safe_normalize(normal0.xyz * barycoord.x + normal1.xyz * barycoord.y + normal2.xyz * barycoord.z);
    texCoord = vec2(
        texelFetch(verticesTex, int(faceIndices.x)).w * barycoord.x +
        texelFetch(verticesTex, int(faceIndices.y)).w * barycoord.y +
        texelFetch(verticesTex, int(faceIndices.z)).w * barycoord.z,
        normal0.w * barycoord.x + normal1.w * barycoord.y + normal2.w * barycoord.z);
    Ts = normalToTangent(Ns);
    material = MATERIAL_OPENPBR;
    return true;
}

float TraceShadow(in vec3 rayOrigin, in vec3 rayDir, in float maxDistance)
{
    int shadingMatID = g_mtlxActiveMatID;
    vec3 point;
    vec3 shadingNormal;
    vec3 geometricNormal;
    vec3 tangent;
    vec3 baryCoord;
    vec2 texCoord;
    int material;
    bool hit = trace(rayOrigin, rayDir, maxDistance, point, shadingNormal, geometricNormal,
                     tangent, baryCoord, texCoord, material);
#ifdef MATERIALX_DISPATCH_READY
    if (hit && material == MATERIAL_OPENPBR)
    {
        // Query the occluder with its own MaterialX parameters, then restore the
        // shading point's parameter set for the caller.
        mtlx_load_material_params(g_ptHitMatID);
        bool seeThrough = !mtlx_openpbr_is_opaque() && mtlx_openpbr_is_thinwalled();
        mtlx_load_material_params(shadingMatID);
        g_ptHitMatID = shadingMatID;
        if (seeThrough) return 1.0;
    }
#endif
    g_ptHitMatID = shadingMatID;
    return hit ? 0.0 : 1.0;
}
