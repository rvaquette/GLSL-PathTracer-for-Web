import { Material } from "./material";

export class MeshInstance {
    name: string;
    material: Material | null = null;

    constructor(name: string, material: Material | null = null) {
        this.name = name;
        this.material = material;
    }
}
