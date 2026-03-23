import { BBox } from "../bvh/bbox.js";
import { Bvh } from "../bvh/bvh.js";
import { SplitBvh } from "../bvh/splitBvh.js";
import { OBJLoader, Mesh as ObjMesh } from "../loaders/obj/objLoader.js";
import { Mat4 } from "../math/mat4.js";
import { MathUtils } from "../math/mathUtils.js";
import { Vec3 } from "../math/vec3.js";
import { Vec4 } from "../math/vec4.js";

function sphericalTheta(v: Vec3): number {
    return Math.acos(MathUtils.clamp(v.y, -1, 1));
}

function sphericalPhi(v: Vec3): number {
    const p = Math.atan2(v.z, v.x);
    return (p < 0) ? p + 2 * Math.PI : p;
}

export class Mesh {
    name: string = '';
    verticesUVX: Vec4[] = []; // Vertex + texture Coord (u/s)
    normalsUVY: Vec4[] = [];  // Normal + texture Coord (v/t)
    bvh: Bvh;

    constructor() {
        this.bvh = new SplitBvh(2.0, 64, 0, 0.001, 0);
    }

    dispose(): void {
        this.verticesUVX = [];
        this.normalsUVY = [];
        this.bvh = null;
    }

    async loadFromFileAsync(filename: string): Promise<boolean> {
        this.name = filename;
        let meshes: ObjMesh[] = [];
        try {
            meshes = await OBJLoader.loadObjFileAsync(filename); 
        } catch (err) {
            console.error('Unable to load model', err);
            return false;
        }

        // Loop over meshes
        for (const mesh of meshes) {
            let vertices = mesh.vertices;
            let normals = mesh.vertexNormals;
            let uvs = mesh.textures;

            // Loop over faces (polygons)
            for (let indexOffset = 0; indexOffset < mesh.indices.length; indexOffset += 3) {
                for (let v = 0; v < 3; v++) {

                    const idx = mesh.indices[indexOffset + v];
                    const vx = vertices[3 * idx + 0];
                    const vy = vertices[3 * idx + 1];
                    const vz = vertices[3 * idx + 2];
                    const nx = normals[3 * idx + 0];
                    const ny = normals[3 * idx + 1];
                    const nz = normals[3 * idx + 2];

                    let tx: number, ty: number;
                    if (uvs && uvs.length > 0) {
                        tx = uvs[2 * idx + 0];
                        ty = 1.0 - uvs[2 * idx + 1];
                    } else {
                        if (v === 0) tx = ty = 0;
                        else if (v === 1) { tx = 0; ty = 1; }
                        else tx = ty = 1;
                    }

                    this.verticesUVX.push(new Vec4(vx, vy, vz, tx));
                    this.normalsUVY.push(new Vec4(nx, ny, nz, ty));
                }
            }
        }

        // Optional: Spherical mapping (commented out in original)
        /*
        let center = new Vec3(0, 0, 0);
        for (const v of this.verticesUVX) center = center.add(new Vec3(v.x, v.y, v.z));
        center = center.scale(1 / this.verticesUVX.length);

        for (let i = 0; i < this.verticesUVX.length; i++) {
            const diff = new Vec3(this.verticesUVX[i].x, this.verticesUVX[i].y, this.verticesUVX[i].z).sub(center).normalize();
            this.verticesUVX[i].w = sphericalTheta(diff) / Math.PI;
            this.normalsUVY[i].w = sphericalPhi(diff) / (2 * Math.PI);
        }
        */

        return true;
    }

    buildBVH(): void {
        const numTris = Math.floor(this.verticesUVX.length / 3);
        const bounds: BBox[] = new Array(numTris);

        for (let i = 0; i < numTris; ++i) {
            const v1 = new Vec3(this.verticesUVX[i * 3 + 0].x, this.verticesUVX[i * 3 + 0].y, this.verticesUVX[i * 3 + 0].z);
            const v2 = new Vec3(this.verticesUVX[i * 3 + 1].x, this.verticesUVX[i * 3 + 1].y, this.verticesUVX[i * 3 + 1].z);
            const v3 = new Vec3(this.verticesUVX[i * 3 + 2].x, this.verticesUVX[i * 3 + 2].y, this.verticesUVX[i * 3 + 2].z);

            const bbox = new BBox();
            bbox.grow(v1);
            bbox.grow(v2);
            bbox.grow(v3);
            bounds[i] = bbox;
        }

        this.bvh.build(bounds);
    }
}

export class MeshInstance {
    name: string;
    meshID: number;
    transform: Mat4;
    materialID: number;

    constructor(name: string, meshID: number, transform: Mat4, materialID: number) {
        this.name = name;
        this.meshID = meshID;
        this.transform = transform;
        this.materialID = materialID;
    }
}
