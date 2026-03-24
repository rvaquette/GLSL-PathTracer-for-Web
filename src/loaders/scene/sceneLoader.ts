import { Light, LightType } from "../../core/light.js";
import { AlphaMode, Material, MediumType } from "../../core/material.js";
import { RenderOptions } from "../../core/renderOptions.js";
import { Scene } from "../../core/scene.js";
import { Mat4 } from "../../math/mat4.js";
import { Vec2 } from "../../math/vec2.js";
import { Vec3 } from "../../math/vec3.js";
import { Vec4 } from "../../math/vec4.js";
import { Context } from "../../core/context.js";
import { Main } from "../../main.js";
import { loadFile } from "../../utilities/fsLoader.js";
import { Camera } from "../../core/camera.js";
import { AzureBlobUtil } from "../../utilities/blob.js";

interface SceneCameraConfig {
    eye: [number, number, number];
    lookat: [number, number, number];
    fov: number;
}

interface SceneUniformsConfig {
    uniformLightCol: [number, number, number];
    numOfLights: number;
    maxDepth: number;
    topBVHIndex: number;
    roughnessMollificationAmt: number;
    envMapIntensity: number;
}

interface SceneIndicesConfig {
    materialsTex: number;
    transformsTex: number;
    lightsTex: number;
    BVHTex: number;
    vertexIndicesTex: number;
    verticesTex: number;
    normalsTex: number;
}

interface SceneDisplayConfig {
    enableTonemap: boolean;
    enableAces: boolean;
    simpleAcesFit: boolean;
    backgroundCol: [number, number, number];
}

export interface SceneFileConfig {
    scene: string;
    camera: SceneCameraConfig;
    uniforms: SceneUniformsConfig;
    indices: SceneIndicesConfig;
    display: SceneDisplayConfig;
    defines: string[];
    withTexture: boolean;
    resolution: [number, number];
    tileWidth: number;
    tileHeight: number;
}

/**
 * Loads a scene from a file.
 * @param url URL to the scene file.
 * @param scene Scene object to populate.
 * @param renderOptions Render options to configure.
 * @returns Promise<boolean> indicating success.
 */
export async function loadSceneFromJsonAsync(
        sceneName: string,
        scene: Scene,
        renderOptions: RenderOptions
): Promise<boolean> {
    
    let sceneConfig = Main.instance.sceneConfigs.find(config => config.scene === sceneName);    

    scene.sceneName = sceneConfig.scene;

    // Camera
    let eye = new Vec3(...sceneConfig.camera.eye);
    let lookat = new Vec3(...sceneConfig.camera.lookat);
    let fov = sceneConfig.camera.fov;
    scene.camera = new Camera(eye, lookat, fov);
    
    // renderOptions
    renderOptions.enableTonemap = sceneConfig.display.enableTonemap;
    renderOptions.enableAces = sceneConfig.display.enableAces;
    renderOptions.simpleAcesFit = sceneConfig.display.simpleAcesFit;
    renderOptions.backgroundCol = new Vec3(...sceneConfig.display.backgroundCol);
    renderOptions.uniformLightCol = new Vec3(...sceneConfig.uniforms.uniformLightCol);    
    renderOptions.maxDepth = sceneConfig.uniforms.maxDepth;
    renderOptions.roughnessMollificationAmt = sceneConfig.uniforms.roughnessMollificationAmt;
    renderOptions.envMapIntensity = sceneConfig.uniforms.envMapIntensity;
    // from defines
    renderOptions.enableEnvMap = sceneConfig.defines.includes('OPT_ENVMAP');
    renderOptions.enableRoughnessMollification = sceneConfig.defines.includes('OPT_ROUGHNESS_MOLLIFICATION');
    renderOptions.enableRR = sceneConfig.defines.includes('OPT_RR');
    const rrDefine = sceneConfig.defines.find(define => define.startsWith('OPT_RR_DEPTH '));
    if (rrDefine) {
        const rrDepth = parseInt(rrDefine.split(' ')[1]);
        if (!isNaN(rrDepth)) {
            renderOptions.RRDepth = rrDepth;
        }
    }
    renderOptions.enableUniformLight = sceneConfig.defines.includes('OPT_UNIFORM_LIGHT');
    renderOptions.openglNormalMap = sceneConfig.defines.includes('OPT_OPENGL_NORMALMAP');
    renderOptions.hideEmitters = sceneConfig.defines.includes('OPT_HIDE_EMITTERS');
    renderOptions.enableBackground = sceneConfig.defines.includes('OPT_BACKGROUND');
    renderOptions.openglNormalMap = sceneConfig.defines.includes('OPT_OPENGL_NORMALMAP');
    renderOptions.enableBackground = sceneConfig.defines.includes('OPT_BACKGROUND');
    renderOptions.transparentBackground = sceneConfig.defines.includes('OPT_TRANSPARENT_BACKGROUND');
    renderOptions.enableVolumeMIS = sceneConfig.defines.includes('OPT_VOLUME_MIS');
    renderOptions.renderResolution = new Vec2(...sceneConfig.resolution);
    renderOptions.windowResolution = new Vec2(...sceneConfig.resolution);
    renderOptions.tileWidth = sceneConfig.tileWidth;
    renderOptions.tileHeight = sceneConfig.tileHeight;

    // Materials
    scene.hasAlphaTest = sceneConfig.defines.includes('OPT_ALPHA_TEST');
    scene.hasMedium = sceneConfig.defines.includes('OPT_MEDIUM');

    // BVH
    scene.topLevelIndex = sceneConfig.uniforms.topBVHIndex;

    // Lights
    scene.numOfLights = sceneConfig.uniforms.numOfLights;

    let meshDataBlob = await AzureBlobUtil.readBlob(`${scene.sceneName}/meshData.bin`);
    let meshDataArray = new Float32Array(await meshDataBlob?.arrayBuffer());
    scene.materialsDataArray = meshDataArray.subarray(0, sceneConfig.indices.materialsTex * 4);
    scene.transformsDataArray = meshDataArray.subarray(sceneConfig.indices.materialsTex * 4, sceneConfig.indices.lightsTex * 4);
    scene.lightsDataArray = meshDataArray.subarray(sceneConfig.indices.lightsTex * 4, sceneConfig.indices.BVHTex * 4);
    scene.bvhDataArray = meshDataArray.subarray(sceneConfig.indices.BVHTex * 4, sceneConfig.indices.vertexIndicesTex * 4);
    scene.vertIndicesDataArray = new Int32Array(meshDataArray.buffer, sceneConfig.indices.vertexIndicesTex * 4, (sceneConfig.indices.verticesTex - sceneConfig.indices.vertexIndicesTex) * 4 / Int32Array.BYTES_PER_ELEMENT);
    scene.verticesDataArray = meshDataArray.subarray(sceneConfig.indices.verticesTex * 4, sceneConfig.indices.normalsTex * 4);
    scene.normalsDataArray = meshDataArray.subarray(sceneConfig.indices.normalsTex * 4);

    // Textures
    if (sceneConfig.withTexture) {
        let texturesBlob = await AzureBlobUtil.readBlob(`${scene.sceneName}/textures.png`);
        scene.textureMapsArray = new Uint8Array(await texturesBlob?.arrayBuffer());
    }

    scene.renderOptions = renderOptions;

    return true;
}

