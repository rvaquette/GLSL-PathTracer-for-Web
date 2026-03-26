import { Vec3 } from "../math/vec3.js";
var AlphaMode;
(function (AlphaMode) {
    AlphaMode[AlphaMode["Opaque"] = 0] = "Opaque";
    AlphaMode[AlphaMode["Blend"] = 1] = "Blend";
    AlphaMode[AlphaMode["Mask"] = 2] = "Mask";
})(AlphaMode || (AlphaMode = {}));
var MediumType;
(function (MediumType) {
    MediumType[MediumType["None"] = 0] = "None";
    MediumType[MediumType["Absorb"] = 1] = "Absorb";
    MediumType[MediumType["Scatter"] = 2] = "Scatter";
    MediumType[MediumType["Emissive"] = 3] = "Emissive";
})(MediumType || (MediumType = {}));
class Material {
    name;
    baseColor = new Vec3(1.0, 1.0, 1.0);
    anisotropic = 0.0;
    emission = new Vec3(0.0, 0.0, 0.0);
    padding1 = 0.0;
    metallic = 0.0;
    roughness = 0.5;
    subsurface = 0.0;
    specularTint = 0.0;
    sheen = 0.0;
    sheenTint = 0.0;
    clearcoat = 0.0;
    clearcoatGloss = 0.0;
    specTrans = 0.0;
    ior = 1.5;
    mediumType = MediumType.None;
    mediumDensity = 0.0;
    mediumColor = new Vec3(1.0, 1.0, 1.0);
    mediumAnisotropy = 0.0;
    baseColorTexID = -1.0;
    metallicRoughnessTexID = -1.0;
    normalmapTexID = -1.0;
    emissionmapTexID = -1.0;
    opacity = 1.0;
    alphaMode = AlphaMode.Opaque;
    alphaCutoff = 0.0;
    padding2 = 0.0;
    constructor() { }
}
export { Material, AlphaMode, MediumType };
//# sourceMappingURL=material.js.map