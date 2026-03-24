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
export async function loadSceneAsync(
        sceneName: string,
        scene: Scene,
        renderOptions: RenderOptions
): Promise<boolean> {
    
    return true;
}

