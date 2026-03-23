import path from "path";
import { BBox } from "../bvh/bbox.js";
import { Bvh } from "../bvh/bvh.js";
import { BvhTranslator, NodeBvh } from "../bvh/bvhTranslator.js";
import { getImageData } from "../loaders/img/getImageData.js";
import { Mat4 } from "../math/mat4.js";
import { Vec3 } from "../math/vec3.js";
import { Vec4 } from "../math/vec4.js";
import { Camera } from "./camera.js";
import { Context } from "./context.js";
import { EnvironmentMap } from "./environmentMap.js";
import { Light } from "./light.js";
import { AlphaMode, Material, MediumType } from "./material.js";
import { Mesh, MeshInstance } from "./mesh.js";
import { RenderOptions } from "./renderOptions.js";
import { Texture } from "./texture.js";

export interface Indices {
    x: number;
    y: number;
    z: number;
}
export class Scene {
    renderOptions: RenderOptions = new RenderOptions();

    meshes: Mesh[] = [];
    vertIndices: Indices[] = [];
    verticesUVX: Vec4[] = [];
    normalsUVY: Vec4[] = [];
    transforms: Mat4[] = [];

    materials: Material[] = [];
    meshInstances: MeshInstance[] = [];
    lights: Light[] = [];

    envMap: EnvironmentMap | null = null;
    camera: Camera | null = null;

    bvhTranslator: BvhTranslator = new BvhTranslator();
    sceneBounds: BBox = new BBox();

    textures: Texture[] = [];
    textureMapsArray: Uint8Array = new Uint8Array();

    initialized = false;
    dirty = true;

    instancesModified = false;
    envMapModified = false;

    private sceneBvh: Bvh;
    sceneName: string;

    constructor(sceneName: string) {
        this.sceneBvh = new Bvh(10.0, 64, false);
        this.sceneName = sceneName;
    }

    dispose() {
        this.meshes.forEach(m => m.dispose?.());
        this.meshes = [];
        this.textures.forEach(t => t.dispose?.());
        this.textures = [];
        this.camera = null;
        this.envMap = null;
        this.bvhTranslator = null;
        this.sceneBvh = null;
        this.textureMapsArray = null;
    }

    addCamera(pos: Vec3, lookAt: Vec3, fov: number) {
        this.camera = new Camera(pos, lookAt, fov);
    }

    async addMeshAsync(filename: string): Promise<number> {
        const existing = this.meshes.findIndex(m => m.name === `scenes/pathtracer/${filename}`);
        if (existing !== -1) return existing;

        const mesh = new Mesh();

        console.log(`Loading model ${filename}`);
        if (await mesh.loadFromFileAsync(`scenes/pathtracer/${filename}`)) {
            this.meshes.push(mesh);
            return this.meshes.length - 1;
        }
        console.log(`Unable to load model ${filename}`);
        return -1;
    }

    async addTextureAsync(filename: string): Promise<number> {
        const existing = this.textures.findIndex(t => t.name === `scenes/pathtracer/${filename}`);
        if (existing !== -1) return existing;

        const texture = new Texture();

        console.log(`Loading texture ${filename}`);
        if (!filename.startsWith("http")) filename = `scenes/pathtracer/${filename}`;
        if (await texture.loadTextureAsync(filename)) {
            this.textures.push(texture);
            return this.textures.length - 1;
        }
        console.log(`Unable to load texture ${filename}`);
        return -1;
    }

    addMaterial(material: Material): number {
        this.materials.push(material);
        return this.materials.length - 1;
    }

    async addEnvMapAsync(filename: string) {
        if (this.envMap) {
            this.envMap.dispose();
            this.envMap = null;
        }

        this.envMap = new EnvironmentMap();
        if (await this.envMap.loadMapAsync(`/scenes/pathtracer/${filename}`)) {
            console.log(`HDR ${filename} loaded`);
        } else {
            console.log(`Unable to load HDR ${filename}`);
            this.envMap = null;
        }
        this.envMapModified = true;
        this.dirty = true;
    }

    addMeshInstance(meshInstance: MeshInstance): number {
        this.meshInstances.push(meshInstance);
        return this.meshInstances.length - 1;
    }

    addLight(light: Light): number {
        this.lights.push(light);
        return this.lights.length - 1;
    }

    createTLAS() {
        if (this.meshInstances.length === 0) return;

        const bounds: BBox[] = this.meshInstances.map((instance, i) => {
            const mesh = this.meshes[instance.meshID];
            const bbox0 = mesh.bvh.bounds();
            const matrix = instance.transform;

            const minBound = bbox0.pmin;
            const maxBound = bbox0.pmax;

            const right = new Vec3(matrix.data[0][0], matrix.data[0][1], matrix.data[0][2]);
            const up = new Vec3(matrix.data[1][0], matrix.data[1][1], matrix.data[1][2]);
            const forward = new Vec3(matrix.data[2][0], matrix.data[2][1], matrix.data[2][2]);
            const translation = new Vec3(matrix.data[3][0], matrix.data[3][1], matrix.data[3][2]);

            const xa = right.scale(minBound.x);
            const xb = right.scale(maxBound.x);
            const ya = up.scale(minBound.y);
            const yb = up.scale(maxBound.y);
            const za = forward.scale(minBound.z);
            const zb = forward.scale(maxBound.z);

            const min = Vec3.min(xa, xb).add(Vec3.min(ya, yb)).add(Vec3.min(za, zb)).add(translation);
            const max = Vec3.max(xa, xb).add(Vec3.max(ya, yb)).add(Vec3.max(za, zb)).add(translation);

            return new BBox(min, max);
        });
        this.sceneBvh.build(bounds);
        this.sceneBounds = this.sceneBvh.bounds();
    }

    createBLAS() {
        if (this.meshes.length === 0) return;

        this.meshes.forEach(mesh => {
            console.log(`Building BVH for ${mesh.name}`);
            mesh.buildBVH();
        });
    }

    rebuildInstances() {
        this.sceneBvh = new Bvh(10.0, 64, false);
        this.createTLAS();
        this.bvhTranslator.updateTLAS(this.sceneBvh, this.meshInstances);
        this.transforms = this.meshInstances.map(i => i.transform);
        this.instancesModified = true;
        this.dirty = true;
    }

    private largePush<T>(src: Array<T>, dest: Array<T>){
        const len = src.length
        for(let i = 0; i < len; i++){
            dest.push(src[i])
        }
    }

    async processSceneAsync() {
        console.log("Processing scene data");
        this.createBLAS();

        console.log("Building scene BVH");
        this.createTLAS();

        console.log("Flattening BVH");
        this.bvhTranslator.process(this.sceneBvh, this.meshes, this.meshInstances);

        let verticesCnt = 0;
        this.vertIndices = [];
        this.verticesUVX = [];
        this.normalsUVY = [];

        console.log("Copying Mesh Data");
        for (const mesh of this.meshes) {
            const numIndices = mesh.bvh.getNumIndices();
            const triIndices = mesh.bvh.getIndices();

            for (let j = 0; j < numIndices; j++) {
                const index = triIndices[j];
                const v1 = (index * 3 + 0) + verticesCnt;
                const v2 = (index * 3 + 1) + verticesCnt;
                const v3 = (index * 3 + 2) + verticesCnt;
                this.vertIndices.push({x: v1, y: v2, z: v3});
            }

            this.largePush(mesh.verticesUVX, this.verticesUVX);
            this.largePush(mesh.normalsUVY, this.normalsUVY);

            verticesCnt += mesh.verticesUVX.length;
        }

        console.log("Copying transforms");
        this.transforms = this.meshInstances.map(i => i.transform);

        if (this.textures.length > 0) {
            console.log("Copying and resizing textures");

            let gl = Context.gl;

            let maxTextureSize = 16384;
            if (gl) maxTextureSize = gl.raw.getParameter(gl.raw.MAX_TEXTURE_SIZE);
            if (this.renderOptions.texArrayHeight * this.textures.length > maxTextureSize) {
                let width = this.renderOptions.texArrayWidth;
                let height = this.renderOptions.texArrayHeight;

                while (height * this.textures.length > maxTextureSize) {
                    height = Math.floor(height / 2);
                    width = Math.floor(width / 2);
                }

                this.renderOptions.texArrayWidth = width;
                this.renderOptions.texArrayHeight = height;
            }

            const reqWidth = this.renderOptions.texArrayWidth;
            const reqHeight = this.renderOptions.texArrayHeight;
            const texBytes = reqWidth * reqHeight * 4;
            this.textureMapsArray = new Uint8Array(texBytes * this.textures.length);

            for (let i = 0; i < this.textures.length; i++) {
                let tex = this.textures[i];
                let texData: Uint8Array = null;
                if (tex.image !== null) {
                    texData = getImageData(tex.image as HTMLImageElement, reqWidth, reqHeight, tex.flipY);
                } else {
                    const sharp = await import("sharp");
                    texData = await sharp.default(Buffer.from(tex.rgba!), {
                        raw: {
                            width: tex.width!,
                            height: tex.height!,
                            channels: 4
                        }
                    })
                    .resize(reqWidth, reqHeight)
                    .flip(tex.flipY)
                    .raw()
                    .toBuffer();
                }
                this.textureMapsArray.set(texData, i * texBytes);
            }
        }

        if (!this.camera) {
            const bounds = this.sceneBvh.bounds();
            const extents = bounds.extents();
            const center = bounds.center();
            this.addCamera(
                new Vec3(center.x, center.y, center.z + Vec3.Length(extents) * 2.0),
                center,
                45.0
            );
        }

        this.initialized = true;
    }

    public bvhData(index: number | null = null) : Float32Array {
        const nodes: NodeBvh[] = index === null ? this.bvhTranslator.nodes : this.bvhTranslator.nodes.slice(index);
        const bvhData = new Float32Array(nodes.flatMap((node: NodeBvh)  => [
            node.bboxmin.x, node.bboxmin.y, node.bboxmin.z,
            node.bboxmax.x, node.bboxmax.y, node.bboxmax.z,
            node.LRLeaf.x, node.LRLeaf.y, node.LRLeaf.z
        ]));
         return bvhData;
    }

    public vertIndicesData(): Int32Array {
        const vertIndicesData = new Int32Array(this.vertIndices.flatMap((indices: Indices) => [
            indices.x, indices.y, indices.z
        ])
        );
        return vertIndicesData;
    }

    public verticesData(): Float32Array {
        const verticesUVXData = new Float32Array(this.verticesUVX.flatMap((vertex: Vec4) => [
                vertex.x, vertex.y, vertex.z, vertex.w
            ])
        );
        return verticesUVXData;
    }

    public normalsData(): Float32Array {
        const normalsData = new Float32Array(this.normalsUVY.flatMap((normal: Vec4) => [
                normal.x, normal.y, normal.z, normal.w
            ])
        );
        return normalsData;
    }

    public materialsData(): Float32Array {
        const materialsData = new Float32Array(this.materials.flatMap((material: Material) => [
                material.baseColor.x, material.baseColor.y, material.baseColor.z, material.anisotropic,
                material.emission.x, material.emission.y, material.emission.z, material.padding1,
                material.metallic, material.roughness, material.subsurface, material.specularTint,
                material.sheen, material.sheenTint, material.clearcoat, material.clearcoatGloss,
                material.specTrans, material.ior, material.mediumType, material.mediumDensity,
                material.mediumColor.x, material.mediumColor.y, material.mediumColor.z, material.mediumAnisotropy,
                material.baseColorTexID, material.metallicRoughnessTexID, material.normalmapTexID, material.emissionmapTexID,
                material.opacity, material.alphaMode, material.alphaCutoff, material.padding2
            ])
        );
        return materialsData;
    }

    public transformsData(): Float32Array {
        const transformsData = new Float32Array(this.transforms.flatMap((transform: Mat4) => [
                transform.data[0][0], transform.data[0][1], transform.data[0][2], transform.data[0][3],
                transform.data[1][0], transform.data[1][1], transform.data[1][2], transform.data[1][3],
                transform.data[2][0], transform.data[2][1], transform.data[2][2], transform.data[2][3],
                transform.data[3][0], transform.data[3][1], transform.data[3][2], transform.data[3][3]
            ])
        );
        return transformsData;
    }

    public lightsData(): Float32Array {
        const lightsData = new Float32Array(this.lights.flatMap((light: Light) => [
                light.position.x, light.position.y, light.position.z,
                light.emission.x, light.emission.y, light.emission.z,
                light.u.x, light.u.y, light.u.z,
                light.v.x, light.v.y, light.v.z,
                light.radius, light.area, light.type
            ])
        );
         return lightsData;
    }

    public getDefines(forceEnvMap: boolean = false): [string, string] {
        let pathtraceDefines = '';
        let tonemapDefines = '';

        if (this.renderOptions.enableEnvMap && (forceEnvMap || this.envMap))
            pathtraceDefines += '#define OPT_ENVMAP\n';

        if (this.lights && this.lights.length > 0)
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

        if (this.materials && this.materials.some((m: Material) => m.alphaMode !== AlphaMode.Opaque))
            pathtraceDefines += '#define OPT_ALPHA_TEST\n';

        if (this.renderOptions.enableRoughnessMollification)
            pathtraceDefines += '#define OPT_ROUGHNESS_MOLLIFICATION\n';

        if (this.materials && this.materials.some((m: Material) => m.mediumType !== MediumType.None))
            pathtraceDefines += '#define OPT_MEDIUM\n';

        if (this.renderOptions.enableVolumeMIS)
            pathtraceDefines += '#define OPT_VOL_MIS\n';

        return [pathtraceDefines, tonemapDefines];
    }

    public computeSceneData(useRayMarching: boolean) : SceneDataInfo {
        let sceneDataInfo = new SceneDataInfo();

        let data : Vec4[] = [];
        let materialsData = this.materials.map(data => [
            new Vec4(data.baseColor.x, data.baseColor.y, data.baseColor.z, data.anisotropic),
            new Vec4(data.emission.x, data.emission.y, data.emission.z, 0),
            new Vec4(data.metallic, data.roughness, data.subsurface, data.specularTint),
            new Vec4(data.sheen, data.sheenTint, data.clearcoat, data.clearcoatGloss),
            new Vec4(data.specTrans, data.ior, data.mediumType, data.mediumDensity),
            new Vec4(data.mediumColor.x, data.mediumColor.y, data.mediumColor.z, data.mediumAnisotropy),
            new Vec4(data.baseColorTexID, data.metallicRoughnessTexID, data.normalmapTexID, data.emissionmapTexID),
            new Vec4(data.opacity, data.alphaMode, data.alphaCutoff, 0)]).flat();
        data = data.concat(materialsData);

        let transformsData = this.transforms.map(data => [
            new Vec4(data.data[0][0], data.data[0][1], data.data[0][2], data.data[0][3]),
            new Vec4(data.data[1][0], data.data[1][1], data.data[1][2], data.data[1][3]),
            new Vec4(data.data[2][0], data.data[2][1], data.data[2][2], data.data[2][3]),
            new Vec4(data.data[3][0], data.data[3][1], data.data[3][2], data.data[3][3])]).flat();
        data = data.concat(transformsData);

        let lightsData = this.lights.map(data => [
            new Vec4(data.position.x, data.position.y, data.position.z, 0),
            new Vec4(data.emission.x, data.emission.y, data.emission.z, 0),
            new Vec4(data.u.x, data.u.y, data.u.z, 0),
            new Vec4(data.v.x, data.v.y, data.v.z, 0),
            new Vec4(data.radius, data.area, data.type, 0)]).flat();
        data = data.concat(lightsData);

        let bvhData = this.bvhTranslator.nodes.map(data => [
            new Vec4(data.bboxmin.x, data.bboxmin.y, data.bboxmin.z, 0), 
            new Vec4(data.bboxmax.x, data.bboxmax.y, data.bboxmax.z, 0),
            new Vec4(data.LRLeaf.x, data.LRLeaf.y, data.LRLeaf.z, 0)]).flat();
        data = data.concat(bvhData);

        let vertexIndicesData = this.vertIndices.map(data => 
            new Vec4(data.x, data.y, data.z, 0));
        data = data.concat(vertexIndicesData);

        let verticesData = this.verticesUVX.map(data => 
            new Vec4(data.x, data.y, data.z, data.w));
        data = data.concat(verticesData);

        let normalsData = this.normalsUVY.map(data =>
            new Vec4(data.x, data.y, data.z, data.w));
        data = data.concat(normalsData);

        let materialsIndex = 0;
        let transformsIndex = materialsIndex + materialsData.length;
        let lightsIndex = transformsIndex + transformsData.length;
        let bvhIndex = lightsIndex + lightsData.length;
        let vertexIndicesIndex = bvhIndex + bvhData.length;
        let verticesIndex = vertexIndicesIndex + vertexIndicesData.length;
        let normalsIndex = verticesIndex + verticesData.length;

        let textureIndicesArray = "";
        if (this.textures.length > 0 && !useRayMarching) 
            textureIndicesArray = `
int textureMapsArrayIndices[${this.textures.length}] = int[](${this.textures.map((t, index) => index).join(", ")});
`;
        else
            textureIndicesArray = `
int textureMapsArrayIndices[1] = int[](0);
`;

        sceneDataInfo.materialsIndex = materialsIndex;
        sceneDataInfo.transformsIndex = transformsIndex;
        sceneDataInfo.lightsIndex = lightsIndex;
        sceneDataInfo.bvhIndex = bvhIndex;
        sceneDataInfo.vertexIndicesIndex = vertexIndicesIndex;
        sceneDataInfo.verticesIndex = verticesIndex;
        sceneDataInfo.normalsIndex = normalsIndex;

        sceneDataInfo.data = data;

        // Build the buffer
        const buffer = new ArrayBuffer(data.length * 4 * 4);
        const floatView = new Float32Array(buffer);
        for (let i = 0; i < data.length; i++) {
            floatView[i * 4 + 0] = data[i].x;
            floatView[i * 4 + 1] = data[i].y;
            floatView[i * 4 + 2] = data[i].z;
            floatView[i * 4 + 3] = data[i].w;
        }
        sceneDataInfo.buffer = buffer;

        if (this.textureMapsArray.length > 0) {
            sceneDataInfo.textureBuffer = this.textureMapsArray.buffer;
            sceneDataInfo.textureWidth = this.renderOptions.texArrayWidth;
            sceneDataInfo.textureHeight = this.renderOptions.texArrayHeight * this.textures.length;
        }

        let pathtraceDefines = this.getDefines(true)[0].trim();

        let isHugeScene = sceneDataInfo.data.length > 1000;

        sceneDataInfo.commonCode = `${(isHugeScene && !useRayMarching) ? "#define OPT_USE_MESHDATA_BLOB" : ""}
        
${pathtraceDefines.trim()}
`.trim();

        sceneDataInfo.bufferACode = `
vec3 eye = vec3(${this.camera.position.x.toFixed(6)}, ${this.camera.position.y.toFixed(6)}, ${this.camera.position.z.toFixed(6)});
vec3 lookat = vec3(${this.camera.pivot.x.toFixed(6)}, ${this.camera.pivot.y.toFixed(6)}, ${this.camera.pivot.z.toFixed(6)});
float fov = ${(this.camera.fov / Math.PI * 180).toFixed(6)};
`.trim();

        sceneDataInfo.bufferBCode = `
#define materialsTex (${`${materialsIndex} + MESH_DATA_OFFSET`})
#define transformsTex (${`${transformsIndex} + MESH_DATA_OFFSET`})
#define lightsTex (${`${lightsIndex} + MESH_DATA_OFFSET`})
#define BVH (${`${bvhIndex} + MESH_DATA_OFFSET`})
#define vertexIndicesTex (${`${vertexIndicesIndex} + MESH_DATA_OFFSET`})
#define verticesTex (${`${verticesIndex} + MESH_DATA_OFFSET`})
#define normalsTex (${`${normalsIndex} + MESH_DATA_OFFSET`})

//-------------------------- Uniforms ---------------------------

vec3 uniformLightCol = vec3(${this.renderOptions.uniformLightCol.x.toFixed(6)}, ${this.renderOptions.uniformLightCol.y.toFixed(6)}, ${this.renderOptions.uniformLightCol.z.toFixed(6)});
int numOfLights = ${this.lights.length};
int maxDepth = ${this.renderOptions.maxDepth};
int topBVHIndex = ${this.bvhTranslator.topLevelIndex};
float roughnessMollificationAmt = ${this.renderOptions.roughnessMollificationAmt.toFixed(6)};
float envMapIntensity = ${this.renderOptions.envMapIntensity.toFixed(6)};
${textureIndicesArray}
`.trim();

        sceneDataInfo.bufferDCode = `
bool enableTonemap = ${this.renderOptions.enableTonemap ? 'true' : 'false'};
bool enableAces = ${this.renderOptions.enableAces ? 'true' : 'false'};
bool simpleAcesFit = ${this.renderOptions.simpleAcesFit ? 'true' : 'false'};
vec3 backgroundCol = vec3(${this.renderOptions.backgroundCol.x.toFixed(6)}, ${this.renderOptions.backgroundCol.y.toFixed(6)}, ${this.renderOptions.backgroundCol.z.toFixed(6)});
`.trim();

        return sceneDataInfo;
    }

    public generateMeshCode(sceneDataInfo: SceneDataInfo, useRayMarching: boolean): string {
        function toVec4String(v: Vec4): string {
            return `vec4(${v.x.toFixed(6)},${v.y.toFixed(6)},${v.z.toFixed(6)},${v.w.toFixed(6)})`;
        }
        
        let data = new Map<string, Vec4[][]>();

        let dataMaterials: Vec4[][] = [];
        for (let i = sceneDataInfo.materialsIndex; i < sceneDataInfo.transformsIndex; i+=8) {
            dataMaterials.push([
                sceneDataInfo.data[i + 0],
                sceneDataInfo.data[i + 1],
                sceneDataInfo.data[i + 2],
                sceneDataInfo.data[i + 3],
                sceneDataInfo.data[i + 4],
                sceneDataInfo.data[i + 5],
                sceneDataInfo.data[i + 6],
                sceneDataInfo.data[i + 7]
            ]);
        }
        data.set("Materials", dataMaterials);

        let dataTransforms: Vec4[][] = [];
        for (let i = sceneDataInfo.transformsIndex; i < sceneDataInfo.lightsIndex; i+=4) {
            dataTransforms.push([
                sceneDataInfo.data[i + 0],
                sceneDataInfo.data[i + 1],
                sceneDataInfo.data[i + 2],
                sceneDataInfo.data[i + 3]
            ]);
        }
        data.set("Transforms", dataTransforms);

        let dataLights: Vec4[][] = [];
        for (let i = sceneDataInfo.lightsIndex; i < sceneDataInfo.bvhIndex; i+=5) {
            dataLights.push([
                sceneDataInfo.data[i + 0],
                sceneDataInfo.data[i + 1],
                sceneDataInfo.data[i + 2],
                sceneDataInfo.data[i + 3],
                sceneDataInfo.data[i + 4]
            ]);
        }
        data.set("Lights", dataLights);

        if (!useRayMarching) {
            let dataBVH: Vec4[][] = [];
            for (let i = sceneDataInfo.bvhIndex; i < sceneDataInfo.vertexIndicesIndex; i+=3) {
                dataBVH.push([
                    sceneDataInfo.data[i + 0],
                    sceneDataInfo.data[i + 1],
                    sceneDataInfo.data[i + 2]
                ]);
            }
            data.set("BVH", dataBVH);

            let dataVertexIndices: Vec4[][] = [];
            for (let i = sceneDataInfo.vertexIndicesIndex; i < sceneDataInfo.verticesIndex; i++) {
                dataVertexIndices.push([
                    sceneDataInfo.data[i]
                ]);
            }
            data.set("Vertex Indices", dataVertexIndices);

            let dataVertices: Vec4[][] = [];
            for (let i = sceneDataInfo.verticesIndex; i < sceneDataInfo.normalsIndex; i++) {
                dataVertices.push([
                    sceneDataInfo.data[i]
                ]);
            }
            data.set("Vertices", dataVertices);

            let dataNormals: Vec4[][] = [];
            for (let i = sceneDataInfo.normalsIndex; i < sceneDataInfo.data.length; i++) {
                dataNormals.push([
                    sceneDataInfo.data[i]
                ]);
            }
            data.set("Normals", dataNormals);
        }
        
        let start = "        ";

        let index = 0;
        let dataAsString = "";
        data.forEach((vec4Array, key) => {
            dataAsString += start + `// ${key}\n`;
            vec4Array.forEach(vec4s => {
                dataAsString += start;
                vec4s.forEach(v => {
                    dataAsString += toVec4String(v) + (index < sceneDataInfo.data.length - 1 ? `,` : ``);
                    index++;
                });
                dataAsString += `\n`;
            });
            /*if ((key == "Transforms" && data.get("Lights")!.length === 0) ||
                (key == "Lights" && (data.get("BVH")?.length ?? 0) === 0)) {
                // delete last ','
                dataAsString = dataAsString.slice(0, -2) + "\n";
            }*/
        });

        let content = `
#define VEC4_COUNT ${!useRayMarching ? sceneDataInfo.data.length: sceneDataInfo.bvhIndex}

vec4[VEC4_COUNT] getData() {
    vec4 data[VEC4_COUNT] = vec4[](
${dataAsString.trimEnd()}
    );
    return data;
}
`.trim();

        return content.trim();
    }
    
}

export class SceneDataInfo {
    commonCode: string;
    bufferACode: string;
    bufferBCode: string;
    bufferDCode: string;
    buffer: ArrayBuffer;
    textureBuffer: ArrayBufferLike;
    textureWidth: number;
    textureHeight: number;
    // Internal
    data: Vec4[];
    bvhIndex: number;
    vertexIndicesIndex: number;
    verticesIndex: number;
    normalsIndex: number;
    materialsIndex: number;
    transformsIndex: number;
    lightsIndex: number;
};
