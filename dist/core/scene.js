import { Camera } from "./camera.js";
import { EnvironmentMap } from "./environmentMap.js";
import { RenderOptions } from "./renderOptions.js";
export class Scene {
    renderOptions = new RenderOptions();
    bvhDataArray = null;
    vertIndicesDataArray = null;
    verticesDataArray = null;
    normalsDataArray = null;
    materialsDataArray = null;
    transformsDataArray = null;
    lightsDataArray = null;
    envMap = null;
    camera = null;
    textureMapsArray = new Uint8Array();
    initialized = false;
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
            console.log(`HDR ${filename} loaded`);
        }
        else {
            console.log(`Unable to load HDR ${filename}`);
            this.envMap = null;
        }
        this.envMapModified = true;
        this.dirty = true;
    }
    addCamera(pos, lookAt, fov) {
        this.camera = new Camera(pos, lookAt, fov);
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
}
//# sourceMappingURL=scene.js.map