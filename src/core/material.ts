import { Vec3 } from "../math/vec3.js";

enum AlphaMode {
    Opaque = 0,
    Blend = 1,
    Mask = 2
}

enum MediumType {
    None = 0,
    Absorb = 1,
    Scatter = 2,
    Emissive = 3
}

class Material {
    name: string;
    
    baseColor: Vec3 = new Vec3(1.0, 1.0, 1.0);
    anisotropic: number = 0.0;

    emission: Vec3 = new Vec3(0.0, 0.0, 0.0);
    padding1: number = 0.0;

    metallic: number = 0.0;
    roughness: number = 0.5;
    subsurface: number = 0.0;
    specularTint: number = 0.0;

    sheen: number = 0.0;
    sheenTint: number = 0.0;
    clearcoat: number = 0.0;
    clearcoatGloss: number = 0.0;

    specTrans: number = 0.0;
    ior: number = 1.5;
    mediumType: MediumType = MediumType.None;
    mediumDensity: number = 0.0;

    mediumColor: Vec3 = new Vec3(1.0, 1.0, 1.0);
    mediumAnisotropy: number = 0.0;

    baseColorTexID: number = -1.0;
    metallicRoughnessTexID: number = -1.0;
    normalmapTexID: number = -1.0;
    emissionmapTexID: number = -1.0;

    opacity: number = 1.0;
    alphaMode: AlphaMode = AlphaMode.Opaque;
    alphaCutoff: number = 0.0;
    padding2: number = 0.0;

    constructor() {}
}

export { Material, AlphaMode, MediumType };