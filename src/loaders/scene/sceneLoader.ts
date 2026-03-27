import { RenderOptions } from "../../core/renderOptions.js";
import { Scene } from "../../core/scene.js";
import { Vec2 } from "../../math/vec2.js";
import { Vec3 } from "../../math/vec3.js";
import { Context } from "../../core/context.js";
import { Main } from "../../main.js";
import { Camera } from "../../core/camera.js";
import { AzureBlobUtil } from "../../utilities/blob.js";
import { MeshInstance } from "../../core/mesh.js";

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
    BVH: number;
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

interface SceneMeshConfig {
    name: string;
    material: string;
}

export interface SceneFileConfig {
    scene: string;
    camera: SceneCameraConfig;
    uniforms: SceneUniformsConfig;
    indices: SceneIndicesConfig;
    display: SceneDisplayConfig;
    defines: string[];
    materials: string[];
    meshes: SceneMeshConfig[];
    withTexture: boolean;
    resolution: [number, number];
    tileWidth: number;
    tileHeight: number;
}

function getFloat4Array(buffer: Float32Array, offset1: number, offset2?: number): Float32Array {
    if (offset2 === undefined) {
        return buffer.subarray(offset1 * 4);
    }
    return buffer.subarray(offset1 * 4, offset2 * 4);
}

function getFloat3Array(buffer: Float32Array, offset1: number, offset2: number): Float32Array {
    let tmp1 = buffer.subarray(offset1 * 4, offset2 * 4);
    let tmp2 = [];
    for (let i = 0; i < tmp1.length; i += 4) {
        tmp2.push(new Vec3(tmp1[i], tmp1[i + 1], tmp1[i + 2]));
    }
    return new Float32Array(tmp2.flatMap(vec => [vec.x, vec.y, vec.z])); 
}

function getInt3Array(buffer: Float32Array, offset1: number, offset2: number): Int32Array {
    let tmp1 = buffer.subarray(offset1 * 4, offset2 * 4);
    let tmp2 = [];
    for (let i = 0; i < tmp1.length; i += 4) {
        tmp2.push(new Vec3(tmp1[i], tmp1[i + 1], tmp1[i + 2]));
    }
    return new Int32Array(tmp2.flatMap(vec => [vec.x, vec.y, vec.z])); 
}

export function getImageDataCore(image: HTMLImageElement | ImageBitmap, width: number, height: number, flip: boolean = false): ImageData {
    const canvas = Context.document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return null;
    }
    if (flip) {
        // Flip the image vertically
        ctx.scale(1, -1);
        ctx.drawImage(image, 0, -height, width, height);
    } else {
        ctx.drawImage(image, 0, 0, width, height);
    }   
    const imageData = ctx.getImageData(0, 0, width, height);

    return imageData;
}

export function getImageData(image: HTMLImageElement | ImageBitmap, width: number, height: number, flip: boolean = false): Uint8Array | null {
    const imageData = getImageDataCore(image, width, height, flip);
    if (!imageData) {
        return null;
    }
    return new Uint8Array(imageData.data.buffer);
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
    
    console.info(`Loading scene ${sceneName}...`);
    
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
    renderOptions.enableVolumeMIS = sceneConfig.defines.includes('OPT_VOL_MIS');
    if (sceneConfig.resolution) {
        renderOptions.renderResolution = new Vec2(...sceneConfig.resolution);
        renderOptions.windowResolution = new Vec2(...sceneConfig.resolution);
        renderOptions.tileWidth = sceneConfig.tileWidth;
        renderOptions.tileHeight = sceneConfig.tileHeight;
    }

    // Data arrays
    let meshDataBlob = await AzureBlobUtil.readBlob(`${scene.sceneName}/meshData.bin`);
    let buffer = new Float32Array(await meshDataBlob?.arrayBuffer(), 20); // skip 20 bytes (header of .bin)
    scene.materialsDataArray = getFloat4Array(buffer, sceneConfig.indices.materialsTex, sceneConfig.indices.transformsTex);
    scene.transformsDataArray = getFloat4Array(buffer, sceneConfig.indices.transformsTex, sceneConfig.indices.lightsTex);
    scene.lightsDataArray = getFloat3Array(buffer, sceneConfig.indices.lightsTex, sceneConfig.indices.BVH); 
    scene.bvhDataArray = getFloat3Array(buffer, sceneConfig.indices.BVH, sceneConfig.indices.vertexIndicesTex);
    scene.vertIndicesDataArray = getInt3Array(buffer, sceneConfig.indices.vertexIndicesTex, sceneConfig.indices.verticesTex);
    scene.verticesDataArray = getFloat4Array(buffer, sceneConfig.indices.verticesTex, sceneConfig.indices.normalsTex);
    scene.normalsDataArray = getFloat4Array(buffer, sceneConfig.indices.normalsTex, 2 * sceneConfig.indices.normalsTex - sceneConfig.indices.verticesTex); // normals are stored as float4, but w component is unused

    // BVH
    scene.topLevelIndex = sceneConfig.uniforms.topBVHIndex;

    // Lights
    scene.numOfLights = sceneConfig.uniforms.numOfLights;
/*
    // Materials
    sceneConfig.materials.forEach((matName, index, array) => {
        scene.materials[index+1].name = matName;
    });

    // Meshes
    sceneConfig.meshes.forEach((meshConfig, index, array) => {
        let meshInstance = new MeshInstance(meshConfig.name, scene.materials.find(mat => mat.name === meshConfig.material) || null);
        scene.meshes.push(meshInstance);
    });*/

    // Textures
    if (sceneConfig.withTexture) {
        let image = await new Promise<HTMLImageElement | false>((resolve, reject) => {
            const image = new Image();
            image.crossOrigin = 'anonymous';
            image.onload = () => {
                resolve(image);
            };
            image.onerror = () => resolve(false);
            image.src = AzureBlobUtil.buildUrl(`${scene.sceneName}/textures.png`);
        });

        if (image) {
            scene.textureMapsArray = getImageData(image, image.width, image.height);
        }
    }

    scene.renderOptions = renderOptions;

    return true;
}

