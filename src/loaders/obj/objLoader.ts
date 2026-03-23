import { loadFile } from "../../utilities/fsLoader.js";
import Mesh from "./mesh.js";

export class OBJLoader {
    static async loadObjFileAsync(filePath: string): Promise<Mesh[]> {
        const response = await loadFile(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load OBJ file: ${response.statusText}`);
        }

        const text = await response.text();
        return Mesh.loadObjFile(text);
    }
}

export { Mesh };
