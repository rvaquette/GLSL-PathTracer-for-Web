import { Light, LightType } from "../../core/light.js";
import { AlphaMode, Material, MediumType } from "../../core/material.js";
import { MeshInstance } from "../../core/mesh.js";
import { RenderOptions } from "../../core/renderOptions.js";
import { Scene } from "../../core/scene.js";
import { Mat4 } from "../../math/mat4.js";
import { Vec2 } from "../../math/vec2.js";
import { Vec3 } from "../../math/vec3.js";
import { Vec4 } from "../../math/vec4.js";
import { loadGLTFAsync } from "../gltf/loadGLTF.js"
import { Context } from "../../core/context.js";
import { Main } from "../../main.js";
import { loadFile } from "../../utilities/fsLoader.js";

const kMaxLineLength = 2048;

type MaterialMap = Map<string, number>;

function trimLine(line: string): string {
    return line.substring(line.indexOf(' ') + 1).trim();
}

/**
 * Loads a scene from a file.
 * @param url URL to the scene file.
 * @param scene Scene object to populate.
 * @param renderOptions Render options to configure.
 * @returns Promise<boolean> indicating success.
 */
export async function loadSceneFromFileAsync(
        url: string,
        scene: Scene,
        renderOptions: RenderOptions
): Promise<boolean> {
    const response = await loadFile(url);
    if (!response.ok) {
        console.error(`Couldn't open ${url} for reading`);
        return false;
    }
    const text = await response.text();

    let rootUrl = url.substring(0, url.lastIndexOf('/') + 1);

    const lines = text.split('\n');

    console.log("Loading Scene..");

    const materialMap: MaterialMap = new Map();

    // Defaults
    let defaultMat = new Material();
    scene.addMaterial(defaultMat);

    let i = 0;
    while (i < lines.length) {
        let line = lines[i].trim();
        if (line.split(' ')[0] == ('#') || line === '') {
            i++;
            continue;
        }

        // Material
        if (line.split(' ')[0] == ('material')) {
            let material = new Material();

            let name = trimLine(line);
            material.name = name;
            
            let albedoTexName = 'none', metallicRoughnessTexName = 'none', normalTexName = 'none', emissionTexName = 'none';
            let alphaMode = 'none', mediumType = 'none';

            i++;
            while (i < lines.length && !lines[i].includes('}')) {
                let l = lines[i].trim();
                if (l.split(' ')[0] == ('color')) {
                    let [, r, g, b] = l.split(/\s+/);
                    material.baseColor = new Vec3(parseFloat(r), parseFloat(g), parseFloat(b));
                }
                if (l.split(' ')[0] == ('opacity')) material.opacity = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('alphamode')) alphaMode = trimLine(l);
                if (l.split(' ')[0] == ('alphacutoff')) material.alphaCutoff = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('emission')) {
                    let [, r, g, b] = l.split(/\s+/);
                    material.emission = new Vec3(parseFloat(r), parseFloat(g), parseFloat(b));
                }
                if (l.split(' ')[0] == ('metallic')) material.metallic = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('roughness')) material.roughness = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('subsurface')) material.subsurface = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('speculartint')) material.specularTint = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('anisotropic')) material.anisotropic = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('sheen')) material.sheen = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('sheentint')) material.sheenTint = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('clearcoat')) material.clearcoat = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('clearcoatgloss')) material.clearcoatGloss = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('spectrans')) material.specTrans = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('ior')) material.ior = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('albedotexture')) albedoTexName = trimLine(l);
                if (l.split(' ')[0] == ('metallicroughnesstexture')) metallicRoughnessTexName = trimLine(l);
                if (l.split(' ')[0] == ('normaltexture')) normalTexName = trimLine(l);
                if (l.split(' ')[0] == ('emissiontexture')) emissionTexName = trimLine(l);
                if (l.split(' ')[0] == ('mediumtype')) mediumType = trimLine(l);
                if (l.split(' ')[0] == ('mediumdensity')) material.mediumDensity = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('mediumcolor')) {
                    let [, r, g, b] = l.split(/\s+/);
                    material.mediumColor = new Vec3(parseFloat(r), parseFloat(g), parseFloat(b));
                }
                if (l.split(' ')[0] == ('mediumanisotropy')) material.mediumAnisotropy = parseFloat(trimLine(l));
                i++;
            }

            // Albedo Texture
            if (albedoTexName && albedoTexName !== 'none') {
                material.baseColorTexID = await scene.addTextureAsync(albedoTexName);
            }

            // MetallicRoughness Texture
            if (metallicRoughnessTexName && metallicRoughnessTexName !== 'none') {
                material.metallicRoughnessTexID = await scene.addTextureAsync(metallicRoughnessTexName);
            }

            //  Normal Map Texture
            if (normalTexName && normalTexName !== 'none') {
                material.normalmapTexID = await scene.addTextureAsync(normalTexName);
            }

            //  Emission Map Texture
            if (emissionTexName && emissionTexName !== 'none') {
                material.emissionmapTexID = await scene.addTextureAsync(emissionTexName);
            }

            // AlphaMode
            if (alphaMode === "opaque")
                material.alphaMode = AlphaMode.Opaque;
            else if (alphaMode === "blend")
                material.alphaMode = AlphaMode.Blend;
            else if (alphaMode === "mask")
                material.alphaMode = AlphaMode.Mask;

            // MediumType
            if (mediumType === "absorb")
                material.mediumType = MediumType.Absorb;
            else if (mediumType === "scatter")
                material.mediumType = MediumType.Scatter;
            else if (mediumType === "emissive")
                material.mediumType = MediumType.Emissive;

            if (!materialMap.has(name)) {
                let id = scene.addMaterial(material);
                materialMap.set(name, id);
            }
            i++;
            continue;
        }

        // Light
        if (line.split(' ')[0] == ('light')) {
            let light = new Light();
            let v1 = new Vec3();
            let v2 = new Vec3();
            let lightType = 'none';

            i++;
            while (i < lines.length && !lines[i].includes('}')) {
                let l = lines[i].trim();
                if (l.split(' ')[0] == ('position')) {
                    let [, x, y, z] = l.split(/\s+/);
                    light.position = new Vec3(parseFloat(x), parseFloat(y), parseFloat(z));
                }
                if (l.split(' ')[0] == ('emission')) {
                    let [, r, g, b] = l.split(/\s+/);
                    light.emission = new Vec3(parseFloat(r), parseFloat(g), parseFloat(b));
                }
                if (l.split(' ')[0] == ('radius')) light.radius = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('v1')) {
                    let [, x, y, z] = l.split(/\s+/);
                    v1 = new Vec3(parseFloat(x), parseFloat(y), parseFloat(z));
                }
                if (l.split(' ')[0] == ('v2')) {
                    let [, x, y, z] = l.split(/\s+/);
                    v2 = new Vec3(parseFloat(x), parseFloat(y), parseFloat(z));
                }
                if (l.split(' ')[0] == ('type')) {
                    lightType = trimLine(l);
                }
                i++;
            }

            if (lightType === 'quad') {
                light.type = LightType.RectLight;
                light.u = v1.subtract(light.position);
                light.v = v2.subtract(light.position);
                light.area = Vec3.Length(Vec3.cross(light.u, light.v));
            } else if (lightType === 'sphere') {
                light.type = LightType.SphereLight;
                light.area = 4.0 * Math.PI * light.radius * light.radius;
            } else if (lightType === 'distant') {
                light.type = LightType.DistantLight;
                light.area = 0.0;
            }
            scene.addLight(light);
            i++;
            continue;
        }

        // Camera
        if (line.split(' ')[0] == ('camera')) {
            let xform = new Mat4();
            let position = new Vec3();
            let lookAt = new Vec3();
            let fov = 45;
            let aperture = 0, focalDist = 1;
            let matrixProvided = false;

            i++;
            while (i < lines.length && !lines[i].includes('}')) {
                let l = lines[i].trim();
                if (l.split(' ')[0] == ('position')) {
                    let [, x, y, z] = l.split(/\s+/);
                    position = new Vec3(parseFloat(x), parseFloat(y), parseFloat(z));
                }
                if (l.split(' ')[0] == ('lookat')) {
                    let [, x, y, z] = l.split(/\s+/);
                    lookAt = new Vec3(parseFloat(x), parseFloat(y), parseFloat(z));
                }
                if (l.split(' ')[0] == ('aperture')) aperture = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('focaldist')) focalDist = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('fov')) fov = parseFloat(trimLine(l));

                if (l.split(' ')[0] == ('matrix')) {
                    // Parse 16 floats after 'matrix'
                    let parts = l.split(/\s+/).slice(1).map(Number);
                    if (parts.length === 16 && parts.every(n => !isNaN(n))) {
                        // Mat4 is assumed to be column-major, 4x4
                        xform = new Mat4(
                            parts[0], parts[4], parts[8],  parts[12],
                            parts[1], parts[5], parts[9],  parts[13],
                            parts[2], parts[6], parts[10], parts[14],
                            parts[3], parts[7], parts[11], parts[15]
                        );
                        matrixProvided = true;
                    }
                }

                i++;
            }

            if (matrixProvided) {
                const forward = new Vec3(xform.data[2][0], xform.data[2][1], xform.data[2][2]);
                position = new Vec3(xform.data[3][0], xform.data[3][1], xform.data[3][2]);
                lookAt = position.add(forward);
            }

            scene.addCamera(position, lookAt, fov);
            scene.camera!.aperture = aperture;
            scene.camera!.focalDist = focalDist;
            i++;
            continue;
        }

        // Renderer options
        if (line.split(' ')[0] == ('renderer')) {
            let envMap = "none";
            let enableRR = "none";
            let enableAces = "none";
            let openglNormalMap = "none";
            let hideEmitters = "none";
            let transparentBackground = "none";
            let enableBackground = "none";
            let independentRenderSize = "none";
            let enableTonemap = "none";
            let enableRoughnessMollification = "none";
            let enableVolumeMIS = "none";
            let enableUniformLight = "none";

            i++;
            while (i < lines.length && !lines[i].includes('}')) {
                let l = lines[i].trim();

                if (l.split(' ')[0] == ('envmapfile')) envMap = trimLine(l);
                if (l.split(' ')[0] == ('resolution')) {
                    let [, w, h] = l.split(/\s+/);
                    renderOptions.renderResolution = new Vec2(parseInt(w), parseInt(h));
                }
                if (l.split(' ')[0] == ('windowresolution')) {
                    let [, w, h] = l.split(/\s+/);
                    renderOptions.windowResolution = new Vec2(parseInt(w), parseInt(h));
                }
                if (l.split(' ')[0] == ('envmapintensity')) renderOptions.envMapIntensity = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('maxdepth')) renderOptions.maxDepth = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('maxspp')) renderOptions.maxSpp = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('tilewidth')) renderOptions.tileWidth = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('tileheight')) renderOptions.tileHeight = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('enablerr')) enableRR = trimLine(l);
                if (l.split(' ')[0] == ('rrdepth')) renderOptions.RRDepth = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('enabletonemap')) enableTonemap = trimLine(l);
                if (l.split(' ')[0] == ('enableaces')) enableAces = trimLine(l);
                if (l.split(' ')[0] == ('texarraywidth')) renderOptions.texArrayWidth = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('texarrayheight')) renderOptions.texArrayWidth = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('openglnormalmap')) openglNormalMap = trimLine(l);
                if (l.split(' ')[0] == ('hideemitters')) hideEmitters = trimLine(l);
                if (l.split(' ')[0] == ('enablebackground')) enableBackground = trimLine(l);
                if (l.split(' ')[0] == ('transparentbackground')) transparentBackground = trimLine(l);
                if (l.split(' ')[0] == ('backgroundcolor')) {
                    let [, r, g, b] = l.split(/\s+/);
                    renderOptions.backgroundCol = new Vec3(parseFloat(r), parseFloat(g), parseFloat(b));
                }
                if (l.split(' ')[0] == ('independentrendersize')) independentRenderSize = trimLine(l);
                if (l.split(' ')[0] == ('envmaprotation')) renderOptions.envMapRot = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('enableroughnessmollification')) enableRoughnessMollification = trimLine(l);
                if (l.split(' ')[0] == ('roughnessmollificationamt')) renderOptions.roughnessMollificationAmt = parseFloat(trimLine(l));
                if (l.split(' ')[0] == ('enablevolumemis')) enableVolumeMIS = trimLine(l);
                if (l.split(' ')[0] == ('enableuniformlight')) enableUniformLight = trimLine(l);
                if (l.split(' ')[0] == ('uniformlightcolor')) {
                    let [, r, g, b] = l.split(/\s+/);
                    renderOptions.uniformLightCol = new Vec3(parseFloat(r), parseFloat(g), parseFloat(b));
                }

                i++;
            }

            // Handle envMap
            if (envMap !== "none") {
                Main.instance.envMapIdx = Main.instance.envMaps.findIndex((map) => envMap.endsWith(map));
                await scene.addEnvMapAsync(envMap);
                renderOptions.enableEnvMap = true;
            } else {
                renderOptions.enableEnvMap = false;
            }

            // Helper to parse boolean strings
            function parseBool(val: string): boolean | undefined {
                if (val === "true") return true;
                if (val === "false") return false;
                return undefined;
            }

            if (parseBool(enableAces) !== undefined)
                renderOptions.enableAces = parseBool(enableAces)!;

            if (parseBool(enableRR) !== undefined)
                renderOptions.enableRR = parseBool(enableRR)!;

            if (parseBool(openglNormalMap) !== undefined)
                renderOptions.openglNormalMap = parseBool(openglNormalMap)!;

            if (parseBool(hideEmitters) !== undefined)
                renderOptions.hideEmitters = parseBool(hideEmitters)!;

            if (parseBool(enableBackground) !== undefined)
                renderOptions.enableBackground = parseBool(enableBackground)!;

            if (parseBool(transparentBackground) !== undefined)
                renderOptions.transparentBackground = parseBool(transparentBackground)!;

            if (parseBool(independentRenderSize) !== undefined)
                renderOptions.independentRenderSize = parseBool(independentRenderSize)!;

            if (parseBool(enableTonemap) !== undefined)
                renderOptions.enableTonemap = parseBool(enableTonemap)!;

            if (parseBool(enableRoughnessMollification) !== undefined)
                renderOptions.enableRoughnessMollification = parseBool(enableRoughnessMollification)!;

            if (parseBool(enableVolumeMIS) !== undefined)
                renderOptions.enableVolumeMIS = parseBool(enableVolumeMIS)!;

            if (parseBool(enableUniformLight) !== undefined)
                renderOptions.enableUniformLight = parseBool(enableUniformLight)!;

            if (!renderOptions.independentRenderSize)
                renderOptions.windowResolution = renderOptions.renderResolution;

            i++;
            continue;
        }

        // Mesh
        if (line.split(' ')[0] == ('mesh')) {
            let filename: string | null = null;
            let rotQuat = new Vec4();
            let xform = new Mat4();
            let translate = new Mat4();
            let rot = new Mat4();
            let scale = new Mat4();
            let material_id = 0; // Default Material ID
            let meshName = "none";
            let matrixProvided = false;

            i++;
            while (i < lines.length && !lines[i].includes('}')) {
                let l = lines[i].trim();

                let matName: string | null = null;

                if (l.split(' ')[0] == ('name')) meshName = l.substring(5).trim();
                if (l.split(' ')[0] == ('file')) filename = trimLine(l);
                if (l.split(' ')[0] == ('material')) {
                    matName = trimLine(l);
                    if (materialMap.has(matName))
                        material_id = materialMap.get(matName)!;
                    else
                        console.error(`Could not find material ${matName}`);
                }
                if (l.split(' ')[0] == ('matrix')) {
                    // Parse 16 floats after 'matrix'
                    let parts = l.split(/\s+/).slice(1).map(Number);
                    if (parts.length === 16 && parts.every(n => !isNaN(n))) {
                        // Mat4 is assumed to be column-major, 4x4
                        xform = new Mat4(
                            parts[0], parts[4], parts[8],  parts[12],
                            parts[1], parts[5], parts[9],  parts[13],
                            parts[2], parts[6], parts[10], parts[14],
                            parts[3], parts[7], parts[11], parts[15]
                        );
                        matrixProvided = true;
                    }
                }
                if (l.split(' ')[0] == ('position')) {
                    let [, x, y, z] = l.split(/\s+/);
                    translate = Mat4.Translate(new Vec3(parseFloat(x), parseFloat(y), parseFloat(z)));
                }
                if (l.split(' ')[0] == ('scale')) {
                    let [, x, y, z] = l.split(/\s+/);
                    scale = Mat4.Scale(new Vec3(parseFloat(x), parseFloat(y), parseFloat(z)));
                }
                if (l.split(' ')[0] == ('rotation')) {
                    let [, x, y, z, w] = l.split(/\s+/);
                    rotQuat = new Vec4(parseFloat(x), parseFloat(y), parseFloat(z), parseFloat(w));
                    rot = Mat4.QuatToMatrix(rotQuat.x, rotQuat.y, rotQuat.z, rotQuat.w);
                }
                i++;
            }

            if (filename) {
                // Add mesh to the scene and get its ID
                const mesh_id = await scene.addMeshAsync(filename);
                if (mesh_id !== -1) {
                    // Determine instance name
                    let instanceName: string;
                    if (meshName && meshName !== "none") {
                        instanceName = meshName;
                    } else {
                        const pos = Math.max(filename.lastIndexOf('/'), filename.lastIndexOf('\\'));
                        instanceName = filename.substring(pos + 1);
                    }

                    // Compute transformation matrix
                    let transformMat: Mat4;
                    if (matrixProvided) {
                        transformMat = xform;
                    } else {
                        // @ts-ignore: Math4 may not exist, should be Mat4
                        transformMat = scale.multiply(rot).multiply(translate);
                    }

                    let meshInstance = new MeshInstance(instanceName, mesh_id, transformMat, material_id);
                    scene.addMeshInstance(meshInstance);
                }
            }
            i++;
            continue;
        }

        // GLTF
        if (line.split(' ')[0] == ('gltf')) {
            let filename: string | null = null;
            let rotQuat = new Vec4();
            let xform = new Mat4();
            let translate = new Vec3();
            let rot = new Mat4();
            let scale = new Vec3(1, 1, 1);
            let matrixProvided = false;

            i++;
            while (i < lines.length && !lines[i].includes('}')) {
                let l = lines[i].trim();

                if (l.split(' ')[0] == ('file')) {
                    filename = trimLine(l);
                }
                if (l.split(' ')[0] == ('matrix')) {
                    // Parse 16 floats after 'matrix'
                    let parts = l.split(/\s+/).slice(1).map(Number);
                    if (parts.length === 16 && parts.every(n => !isNaN(n))) {
                        // Mat4 is assumed to be column-major, 4x4
                        xform = new Mat4(
                            parts[0], parts[4], parts[8],  parts[12],
                            parts[1], parts[5], parts[9],  parts[13],
                            parts[2], parts[6], parts[10], parts[14],
                            parts[3], parts[7], parts[11], parts[15]
                        );
                        matrixProvided = true;
                    }
                }
                if (l.split(' ')[0] == ('position')) {
                    let [, x, y, z] = l.split(/\s+/);
                    translate = new Vec3(parseFloat(x), parseFloat(y), parseFloat(z));
                }
                if (l.split(' ')[0] == ('scale')) {
                    let [, x, y, z] = l.split(/\s+/);
                    scale = new Vec3(parseFloat(x), parseFloat(y), parseFloat(z));
                }
                if (l.split(' ')[0] == ('rotation')) {
                    let [, x, y, z, w] = l.split(/\s+/);
                    rotQuat = new Vec4(parseFloat(x), parseFloat(y), parseFloat(z), parseFloat(w));
                    rot = Mat4.QuatToMatrix(rotQuat.x, rotQuat.y, rotQuat.z, rotQuat.w);
                }
                i++;
            }

            if (filename) {
                const ext = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
                let transformMat: Mat4;
                if (matrixProvided) {
                    transformMat = xform;
                } else {
                    // @ts-ignore: Mat4 may not have direct multiply, adjust as needed
                    transformMat = Mat4.Scale(scale).multiply(rot).multiply(Mat4.Translate(translate));
                }

                // TODO: Add support for instancing.
                // If the same gltf is loaded multiple times then mesh data gets duplicated
                let success = false;
                if (ext === "gltf") {
                    success = await loadGLTFAsync(rootUrl + filename, scene, renderOptions, transformMat, false);
                } else if (ext === "glb") {
                    success = await loadGLTFAsync(rootUrl + filename, scene, renderOptions, transformMat, true);
                }

                if (!success) {
                    console.error(`Unable to load gltf ${filename}`);
                    throw new Error(`Unable to load gltf ${filename}`);
                }
            }
        }

        i++;
    }
    
    return true;
}

