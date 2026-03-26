import { Vec3 } from "../math/vec3.js";
import { Camera } from "./camera.js";
import { EnvironmentMap } from "./environmentMap.js";
import { Material } from "./material.js";
import { RenderOptions } from "./renderOptions.js";
export class Scene {
    renderOptions = new RenderOptions();
    bvhDataArray = null;
    vertIndicesDataArray = null;
    verticesDataArray = null;
    normalsDataArray = null;
    transformsDataArray = null;
    lightsDataArray = null;
    materials = [];
    meshes = [];
    envMap = null;
    camera = null;
    textureMapsArray = new Uint8Array();
    initialized = false;
    instancesModified = false;
    dirty = true;
    envMapModified = false;
    sceneName;
    topLevelIndex = 0;
    numOfLights = 0;
    hasAlphaTest = false;
    hasMedium = false;
    constructor(sceneName) {
        this.sceneName = sceneName;
    }
    dispose() {
        this.camera = null;
        this.envMap = null;
        this.textureMapsArray = null;
    }
    async addEnvMapAsync(filename) {
        if (this.envMap) {
            this.envMap.dispose();
            this.envMap = null;
        }
        this.envMap = new EnvironmentMap();
        if (await this.envMap.loadMapAsync(`/scenes/pathtracer/${filename}`)) {
            console.info(`HDR ${filename} loaded`);
        }
        else {
            console.info(`Unable to load HDR ${filename}`);
            this.envMap = null;
        }
        this.envMapModified = true;
        this.dirty = true;
    }
    addCamera(pos, lookAt, fov) {
        this.camera = new Camera(pos, lookAt, fov);
    }
    rebuildInstances() {
        this.instancesModified = true;
        this.dirty = true;
    }
    getDefines(forceEnvMap = false) {
        let pathtraceDefines = '';
        let tonemapDefines = '';
        if (this.renderOptions.enableEnvMap && (forceEnvMap || this.envMap))
            pathtraceDefines += '#define OPT_ENVMAP\n';
        if (this.numOfLights > 0)
            pathtraceDefines += '#define OPT_LIGHTS\n';
        if (this.renderOptions.enableRR) {
            pathtraceDefines += '#define OPT_RR\n';
            pathtraceDefines += `#define OPT_RR_DEPTH ${this.renderOptions.RRDepth}\n`;
        }
        if (this.renderOptions.enableUniformLight)
            pathtraceDefines += '#define OPT_UNIFORM_LIGHT\n';
        if (this.renderOptions.openglNormalMap)
            pathtraceDefines += '#define OPT_OPENGL_NORMALMAP\n';
        if (this.renderOptions.hideEmitters)
            pathtraceDefines += '#define OPT_HIDE_EMITTERS\n';
        if (this.renderOptions.enableBackground) {
            pathtraceDefines += '#define OPT_BACKGROUND\n';
            tonemapDefines += '#define OPT_BACKGROUND\n';
        }
        if (this.renderOptions.transparentBackground) {
            pathtraceDefines += '#define OPT_TRANSPARENT_BACKGROUND\n';
            tonemapDefines += '#define OPT_TRANSPARENT_BACKGROUND\n';
        }
        if (this.hasAlphaTest)
            pathtraceDefines += '#define OPT_ALPHA_TEST\n';
        if (this.renderOptions.enableRoughnessMollification)
            pathtraceDefines += '#define OPT_ROUGHNESS_MOLLIFICATION\n';
        if (this.hasMedium)
            pathtraceDefines += '#define OPT_MEDIUM\n';
        if (this.renderOptions.enableVolumeMIS)
            pathtraceDefines += '#define OPT_VOL_MIS\n';
        return [pathtraceDefines, tonemapDefines];
    }
    get materialsDataArray() {
        const materialsData = new Float32Array(this.materials.flatMap((material) => [
            material.baseColor.x, material.baseColor.y, material.baseColor.z, material.anisotropic,
            material.emission.x, material.emission.y, material.emission.z, material.padding1,
            material.metallic, material.roughness, material.subsurface, material.specularTint,
            material.sheen, material.sheenTint, material.clearcoat, material.clearcoatGloss,
            material.specTrans, material.ior, material.mediumType, material.mediumDensity,
            material.mediumColor.x, material.mediumColor.y, material.mediumColor.z, material.mediumAnisotropy,
            material.baseColorTexID, material.metallicRoughnessTexID, material.normalmapTexID, material.emissionmapTexID,
            material.opacity, material.alphaMode, material.alphaCutoff, material.padding2
        ]));
        return materialsData;
    }
    set materialsDataArray(value) {
        if (value) {
            this.materials = [];
            for (let i = 0; i < value.length; i += 32) {
                const material = new Material();
                material.baseColor = new Vec3(value[i], value[i + 1], value[i + 2]);
                material.anisotropic = value[i + 3];
                material.emission = new Vec3(value[i + 4], value[i + 5], value[i + 6]);
                material.padding1 = value[i + 7];
                material.metallic = value[i + 8];
                material.roughness = value[i + 9];
                material.subsurface = value[i + 10];
                material.specularTint = value[i + 11];
                material.sheen = value[i + 12];
                material.sheenTint = value[i + 13];
                material.clearcoat = value[i + 14];
                material.clearcoatGloss = value[i + 15];
                material.specTrans = value[i + 16];
                material.ior = value[i + 17];
                material.mediumType = value[i + 18];
                material.mediumDensity = value[i + 19];
                material.mediumColor = new Vec3(value[i + 20], value[i + 21], value[i + 22]);
                material.mediumAnisotropy = value[i + 23];
                material.baseColorTexID = value[i + 24];
                material.metallicRoughnessTexID = value[i + 25];
                material.normalmapTexID = value[i + 26];
                material.emissionmapTexID = value[i + 27];
                material.opacity = value[i + 28];
                material.alphaMode = value[i + 29];
                material.alphaCutoff = value[i + 30];
                material.padding2 = value[i + 31];
                this.materials.push(material);
            }
        }
    }
}
//# sourceMappingURL=scene.js.map