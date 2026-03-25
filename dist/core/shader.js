import { Context } from "./context.js";
export class Shader {
    shader;
    constructor(sourceObj, shaderType) {
        const gl = Context.gl;
        this.shader = gl.createShader(shaderType);
        console.log(`Compiling Shader ${sourceObj.path}`);
        gl.shaderSource(this.shader, sourceObj.src);
        gl.compileShader(this.shader);
        const success = gl.getShaderParameter(this.shader, gl.raw.COMPILE_STATUS);
        if (!success) {
            const info = gl.getShaderInfoLog(this.shader) || "Unknown error";
            gl.deleteShader(this.shader);
            this.shader = null;
            const msg = `Shader compilation error in ${sourceObj.path}\n${sourceObj.src}\n${info}`;
            alert(sourceObj.path + " : " + info);
            console.error(msg);
            throw new Error(msg);
        }
        // if (sourceObj.dump) {
        //     console.log(`Shader ${sourceObj.path} compiled successfully.`);
        //     const src = gl
        //         .getExtension("WEBGL_debug_shaders")
        //         .getTranslatedShaderSource(this.shader);
        //     console.log(src);
        // }
    }
    getObject() {
        if (!this.shader) {
            throw new Error("Shader object is null.");
        }
        return this.shader;
    }
}
//# sourceMappingURL=shader.js.map