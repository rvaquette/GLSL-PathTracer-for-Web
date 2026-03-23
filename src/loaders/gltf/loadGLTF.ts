import { AlphaMode, Material } from "../../core/material.js";
import { Mesh, MeshInstance } from "../../core/mesh.js";
import { RenderOptions } from "../../core/renderOptions.js";
import { Scene } from "../../core/scene.js";
import { Texture } from "../../core/texture.js";
import { Mat4 } from "../../math/mat4.js";
import { Vec2 } from "../../math/vec2.js";
import { Vec3 } from "../../math/vec3.js";
import { Vec4 } from "../../math/vec4.js";
import * as GLTF from "../../external/gltf/gltfLoader.js";
import { GLBLoader } from "../../external/gltf/glbLoader.js";

// Much of this is from accompanying code for Ray Tracing Gems II, Chapter 14: The Reference Path Tracer
// and was adapted for this project. See https://github.com/boksajak/referencePT for the original

type Primitive = {
    primitiveId: number;
    materialId: number;
};

// These constants should match the GLTF spec/component types
const TINYGLTF_COMPONENT_TYPE_BYTE = 5120;
const TINYGLTF_COMPONENT_TYPE_UNSIGNED_BYTE = 5121;
const TINYGLTF_COMPONENT_TYPE_SHORT = 5122;
const TINYGLTF_COMPONENT_TYPE_UNSIGNED_SHORT = 5123;
const TINYGLTF_COMPONENT_TYPE_INT = 5124;
const TINYGLTF_COMPONENT_TYPE_UNSIGNED_INT = 5125;
const TINYGLTF_COMPONENT_TYPE_FLOAT = 5126;
const TINYGLTF_COMPONENT_TYPE_DOUBLE = 5130;

// These constants should match the GLTF spec/type
const TINYGLTF_TYPE_SCALAR = 5120;
const TINYGLTF_TYPE_VEC2 = 5121;
const TINYGLTF_TYPE_VEC3 = 5122;
const TINYGLTF_TYPE_VEC4 = 5123;
const TINYGLTF_TYPE_MAT2 = 5124;
const TINYGLTF_TYPE_MAT3 = 5125;
const TINYGLTF_TYPE_MAT4 = 5126;

function getComponentSizeInBytes(componentType: number): number {

    switch (componentType) {
        case TINYGLTF_COMPONENT_TYPE_BYTE:
        case TINYGLTF_COMPONENT_TYPE_UNSIGNED_BYTE:
            return 1;
        case TINYGLTF_COMPONENT_TYPE_SHORT:
        case TINYGLTF_COMPONENT_TYPE_UNSIGNED_SHORT:
            return 2;
        case TINYGLTF_COMPONENT_TYPE_INT:
        case TINYGLTF_COMPONENT_TYPE_UNSIGNED_INT:
        case TINYGLTF_COMPONENT_TYPE_FLOAT:
            return 4;
        case TINYGLTF_COMPONENT_TYPE_DOUBLE:
            return 8;
        default:
            // Unknown component type
            return -1;
    }
}

function getNumComponentsInType(type: string): number {

    if (type === "SCALAR") {
        return 1;
    } else if (type === "VEC2") {
        return 2;
    } else if (type === "VEC3") {
        return 3;
    } else if (type === "VEC4") {
        return 4;
    } else if (type === "MAT2") {
        return 4;
    } else if (type === "MAT3") {
        return 9;
    } else if (type === "MAT4") {
        return 16;
    } else {
        // Unknown component type
        return -1;
    }
}

export function loadMeshes(
    scene: Scene,
    gltfModel: GLTF.GLTF,
    meshPrimMap: Map<number, Primitive[]>
) {
    for (let gltfMeshIdx = 0; gltfMeshIdx < gltfModel.meshes?.length; gltfMeshIdx++) {
        const gltfMesh = gltfModel.meshes[gltfMeshIdx];

        for (let gltfPrimIdx = 0; gltfPrimIdx < gltfMesh.primitives.length; gltfPrimIdx++) {
            const prim = gltfMesh.primitives[gltfPrimIdx];

            // Skip points and lines
            if (prim.mode !== 4) continue; // 4 = TRIANGLES

            const indicesIndex = prim.indices;
            let positionIndex = -1;
            let normalIndex = -1;
            let uv0Index = -1;

            if ('POSITION' in prim.attributesID) positionIndex = prim.attributesID['POSITION'];
            if ('NORMAL' in prim.attributesID) normalIndex = prim.attributesID['NORMAL'];
            if ('TEXCOORD_0' in prim.attributesID) uv0Index = prim.attributesID['TEXCOORD_0'];

            // Vertex positions
            const positionAccessor = gltfModel.accessors[positionIndex];
            const positionBufferView = positionAccessor.bufferView;
            const positionBufferAddress = new DataView(positionBufferView.data);
            let positionStride = getComponentSizeInBytes(positionAccessor.componentType) * getNumComponentsInType(positionAccessor.type);
            if (positionBufferView.byteStride > 0)
                positionStride = positionBufferView.byteStride;

            // Vertex indices
            const indexAccessor = indicesIndex;
            const indexBufferView = indexAccessor.bufferView;
            const indexBufferAddress = new DataView(indexBufferView.data);
            let indexStride = getComponentSizeInBytes(indexAccessor.componentType) * getNumComponentsInType(indexAccessor.type);

            // Normals
            let normalAccessor: any, normalBufferView: any, normalBufferAddress: DataView, normalStride = -1;
            if (normalIndex > -1) {
                normalAccessor = gltfModel.accessors[normalIndex];
                normalBufferView = normalAccessor.bufferView;
                normalBufferAddress = new DataView(normalBufferView.data);
                normalStride = getComponentSizeInBytes(normalAccessor.componentType) * getNumComponentsInType(normalAccessor.type);
                if (normalBufferView.byteStride > 0)
                    normalStride = normalBufferView.byteStride;
            }

            // Texture coordinates
            let uv0Accessor: any, uv0BufferView: any, uv0BufferAddress: DataView, uv0Stride = -1;
            if (uv0Index > -1) {
                uv0Accessor = gltfModel.accessors[uv0Index];
                uv0BufferView = uv0Accessor.bufferView;
                uv0BufferAddress = new DataView(uv0BufferView.data);
                uv0Stride = getComponentSizeInBytes(uv0Accessor.componentType) * getNumComponentsInType(uv0Accessor.type);
                if (uv0BufferView.byteStride > 0)
                    uv0Stride = uv0BufferView.byteStride;
            }

            const vertices: Vec3[] = [];
            const normals: Vec3[] = [];
            const uvs: Vec2[] = [];

            // Get vertex data
            for (let vertexIndex = 0; vertexIndex < positionAccessor.count; vertexIndex++) {
                let vertex = new Vec3(0, 0, 0);
                let normal = new Vec3(0, 0, 0);
                let uv = new Vec2(0, 0);

                {
                    let address = positionBufferView.byteOffset + positionAccessor.byteOffset + (vertexIndex * positionStride)
                    vertex = new Vec3(
                        positionBufferAddress.getFloat32(address, true),
                        positionBufferAddress.getFloat32(address + 4, true),
                        positionBufferAddress.getFloat32(address + 8, true)
                    );
                }

                if (normalIndex > -1) {
                    let address = normalBufferView.byteOffset + normalAccessor.byteOffset + (vertexIndex * normalStride);
                    normal = new Vec3(
                        normalBufferAddress.getFloat32(address, true),
                        normalBufferAddress.getFloat32(address + 4, true),
                        normalBufferAddress.getFloat32(address + 8, true)
                    );
                }

                if (uv0Index > -1) {
                    let address = uv0BufferView.byteOffset + uv0Accessor.byteOffset + (vertexIndex * uv0Stride);
                    uv = new Vec2(
                        uv0BufferAddress.getFloat32(address, true),
                        uv0BufferAddress.getFloat32(address + 4, true)
                    );
                }

                vertices.push(vertex);
                normals.push(normal);
                uvs.push(uv);
            }

            // Get index data
            const indices: number[] = [];
            let baseAddress = indexBufferView.byteOffset + indexAccessor.byteOffset;
            if (indexStride == 1) {
                for (let i = 0; i < indexAccessor.count; i++) {
                    const idx = indexBufferAddress.getUint8(baseAddress + i * 1);
                    indices.push(idx);
                }
            } else if (indexStride == 2) {
                for (let i = 0; i < indexAccessor.count; i++) {
                    const idx = indexBufferAddress.getUint16(baseAddress + i * 2, true);
                    indices.push(idx);
                }
            } else if (indexStride == 4) {
                for (let i = 0; i < indexAccessor.count; i++) {
                    const idx = indexBufferAddress.getUint32(baseAddress + i * 4, true);
                    indices.push(idx);
                }
            } else {
                throw new Error("Unsupported index component type in GLTF");
            }

            const mesh = new Mesh();

            // Get triangles from vertex indices
            for (let v = 0; v < indices.length; v++) {
                const pos = vertices[indices[v]];
                const nrm = normals[indices[v]];
                const uv = uvs[indices[v]];

                mesh.verticesUVX.push(new Vec4(pos.x, pos.y, pos.z, uv.x));
                mesh.normalsUVY.push(new Vec4(nrm.x, nrm.y, nrm.z, uv.y));
            }

            mesh.name = gltfMesh.name;
            const sceneMeshId = scene.meshes.length;
            scene.meshes.push(mesh);
            prim.primID = sceneMeshId;

            const sceneMatIdx = (prim.materialID ?? 0) + scene.materials.length;
            if (!meshPrimMap.has(gltfMeshIdx)) meshPrimMap.set(gltfMeshIdx, []);
            meshPrimMap.get(gltfMeshIdx)!.push({ primitiveId: sceneMeshId, materialId: sceneMatIdx });
        }
    }
}

export async function loadTexturesAsync(scene: Scene, gltfModel: GLTF.GLTF, flipY: boolean) {
    if (!gltfModel.textures || !gltfModel.images) {
        console.warn("No textures or images found in GLTF model.");
        return;
    }
    for (let i = 0; i < gltfModel.textures.length; ++i) {
        const gltfTex = gltfModel.textures[i];
        let image = gltfModel.images[gltfTex.source].image as ImageBitmap;
        let rgba = gltfModel.images[gltfTex.source].rgba;
        let texture: Texture = null;
        let texName = gltfTex.name;
        if (image) {
            texture = new Texture(texName, image);
        } else {
            texture = new Texture(texName, null);

            const sharp = await import("sharp");
            let texData = sharp.default(Buffer.from(rgba)).ensureAlpha();
            const meta = await texData.metadata();
            const raw = await texData.raw().toBuffer();
            
            texture.width = meta.width ?? null;
            texture.height = meta.height ?? null;
            texture.rgba = new Uint8Array(raw);
        }
        texture.flipY = flipY;
        scene.textures.push(texture);
    }
}

export function loadMaterials(scene: Scene, gltfModel: GLTF.GLTF) {
    const sceneTexIdx = scene.textures.length;
    for (let i = 0; i < gltfModel.materials.length; i++) {
        const gltfMaterial = gltfModel.materials[i];
        const pbr = gltfMaterial.pbrMetallicRoughness;

        const material = new Material();

        material.name = gltfMaterial.name;

        // Albedo
        material.baseColor = new Vec3(
            pbr.baseColorFactor?.[0] ?? 1,
            pbr.baseColorFactor?.[1] ?? 1,
            pbr.baseColorFactor?.[2] ?? 1
        );
        if (pbr.baseColorTexture?.index > -1)
            material.baseColorTexID = pbr.baseColorTexture.index + sceneTexIdx;

        // Opacity
        material.opacity = pbr.baseColorFactor?.[3] ?? 1;

        // Alpha
        material.alphaCutoff = gltfMaterial.alphaCutoff ?? 0.5;
        if (gltfMaterial.alphaMode === 'OPAQUE') material.alphaMode = AlphaMode.Opaque;
        else if (gltfMaterial.alphaMode === 'BLEND') material.alphaMode = AlphaMode.Blend;
        else if (gltfMaterial.alphaMode === 'MASK') material.alphaMode = AlphaMode.Mask;

        // Roughness and Metallic
        material.roughness = Math.sqrt(pbr.roughnessFactor ?? 1);
        material.metallic = pbr.metallicFactor ?? 0;
        if (pbr.metallicRoughnessTexture?.index > -1)
            material.metallicRoughnessTexID = pbr.metallicRoughnessTexture.index + sceneTexIdx;

        // Normal Map
        material.normalmapTexID = (gltfMaterial.normalTexture?.index ?? -1) + sceneTexIdx;

        // Emission
        material.emission = new Vec3(
            gltfMaterial.emissiveFactor?.[0] ?? 0,
            gltfMaterial.emissiveFactor?.[1] ?? 0,
            gltfMaterial.emissiveFactor?.[2] ?? 0
        );
        if (gltfMaterial.emissiveTexture?.index > -1)
            material.emissionmapTexID = gltfMaterial.emissiveTexture.index + sceneTexIdx;

        // KHR_materials_transmission
        if (gltfMaterial.extensions?.KHR_materials_transmission) {
            const ext = gltfMaterial.extensions.KHR_materials_transmission;
            if (typeof ext.transmissionFactor === 'number')
                material.specTrans = ext.transmissionFactor;
        }

        scene.addMaterial(material);
    }

    // Default material
    if (scene.materials.length === 0) {
        scene.materials.push(new Material());
    }
}

function traverseNodes(
    scene: Scene,
    gltfModel: GLTF.GLTF,
    gltfNode: GLTF.Node,
    parentMat: Mat4,
    meshPrimMap: Map<number, Primitive[]>
) {
    let localMat = new Mat4();

    if (gltfNode.matrix && gltfNode.matrix.length === 16) {
        localMat.data[0][0] = gltfNode.matrix[0];
        localMat.data[0][1] = gltfNode.matrix[1];
        localMat.data[0][2] = gltfNode.matrix[2];
        localMat.data[0][3] = gltfNode.matrix[3];

        localMat.data[1][0] = gltfNode.matrix[4];
        localMat.data[1][1] = gltfNode.matrix[5];
        localMat.data[1][2] = gltfNode.matrix[6];
        localMat.data[1][3] = gltfNode.matrix[7];

        localMat.data[2][0] = gltfNode.matrix[8];
        localMat.data[2][1] = gltfNode.matrix[9];
        localMat.data[2][2] = gltfNode.matrix[10];
        localMat.data[2][3] = gltfNode.matrix[11];

        localMat.data[3][0] = gltfNode.matrix[12];
        localMat.data[3][1] = gltfNode.matrix[13];
        localMat.data[3][2] = gltfNode.matrix[14];
        localMat.data[3][3] = gltfNode.matrix[15];
    } else {
        let translate = new Mat4();
        let rot = new Mat4();
        let scale = new Mat4();

        if (gltfNode.translation && gltfNode.translation.length === 3) {
            translate.data[3][0] = gltfNode.translation[0];
            translate.data[3][1] = gltfNode.translation[1];
            translate.data[3][2] = gltfNode.translation[2];
        }
        if (gltfNode.rotation && gltfNode.rotation.length === 4) {
            rot = Mat4.QuatToMatrix(gltfNode.rotation[0], gltfNode.rotation[1], gltfNode.rotation[2], gltfNode.rotation[3]);
        }
        if (gltfNode.scale && gltfNode.scale.length === 3) {
            scale.data[0][0] = gltfNode.scale[0];
            scale.data[1][1] = gltfNode.scale[1];
            scale.data[2][2] = gltfNode.scale[2];
        }
        localMat = scale.multiply(rot).multiply(translate);
    }

    const xform = localMat.multiply(parentMat);

    // When at a leaf node, add an instance to the scene (if a mesh exists for it)
    if ((!gltfNode.children || gltfNode.children.length === 0) && gltfNode.mesh && gltfNode.mesh.primitives) {
        const prims = gltfNode.mesh.primitives;
        for (let i = 0; i < prims.length; i++) {
            let name = gltfNode.name;
            if (!name)
                name = `Mesh ${gltfNode.mesh} Prim${prims[i]}`;
            const instance = new MeshInstance(
                name,
                prims[i].primID,
                xform,
                prims[i].materialID < 0 ? 0 : prims[i].materialID
            );
            scene.addMeshInstance(instance);
        }
    }

    if (gltfNode.children) {
        for (let i = 0; i < gltfNode.children.length; i++) {
            traverseNodes(scene, gltfModel, gltfNode.children[i], xform, meshPrimMap);
        }
    }
}

export function loadInstances(
    scene: Scene,
    gltfModel: GLTF.GLTF,
    xform: Mat4,
    meshPrimMap: Map<number, Primitive[]>
) {
    const gltfScene = gltfModel.scene;
    for (let rootIdx = 0; rootIdx < gltfScene.nodes.length; rootIdx++) {
        traverseNodes(scene, gltfModel, gltfScene.nodes[rootIdx], xform, meshPrimMap);
    }
}

export async function loadGLTFAsync(
    filename: string,
    scene: Scene,
    renderOptions: RenderOptions,
    xform: Mat4,
    binary: boolean
): Promise<boolean> {
try {
    let gltfModel: GLTF.GLTF | null = null;
    if (binary) {
        gltfModel = await new GLBLoader().loadGLBAsync(filename);
    } else {
        gltfModel = await new GLTF.GLTFLoader().loadGLTFAsync(filename);
    }

    if (!gltfModel) {
        console.error("Failed to load model:", filename);
        return false;
    }
    
    const meshPrimMap = new Map<number, Primitive[]>();

    loadMeshes(scene, gltfModel, meshPrimMap);
    loadMaterials(scene, gltfModel);
    await loadTexturesAsync(scene, gltfModel, renderOptions.flipTexturesY);
    loadInstances(scene, gltfModel, xform, meshPrimMap);
    return true;

} catch (e) {
    console.error("Error loading GLTF file:", e);
    return false;
}
}
