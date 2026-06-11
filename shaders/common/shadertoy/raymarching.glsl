vec3 calculateNormal(vec3 p) {
 
    vec3 epsilon = vec3(0.001, 0., 1.);
    
    vec3 n = vec3(map(p + epsilon.xyy).x - map(p - epsilon.xyy).x,
                  map(p + epsilon.yxy).x - map(p - epsilon.yxy).x,
                  map(p + epsilon.yyx).x - map(p - epsilon.yyx).x);
    
    return normalize(n);
}

// Get the scene hit record
bool getSceneHit(Ray ray, inout State state) {
    float t = 0.001;
    
    int matId = -1;
    bool hit = false;

    // Raymarch the rest 
    for(int i = 0; i < LOOPMAX; ++i) {
        vec3 p = ray.origin + ray.direction * t;
        
        vec2 d = map(p);
        float ad = abs(d.x);

        if (ad < (0.0001)) {
            hit = true;
            matId = int(d.y);
            break;
         }
            
         t += ad;
         
         if (t>TMAX) { break; }
    }
    
    if (hit) {
        state.fhp = ray.origin + ray.direction * t;
        state.normal = calculateNormal(state.fhp);
        state.hitDist = t;

        state.matID = matId;
    }
    
    return hit;
}
