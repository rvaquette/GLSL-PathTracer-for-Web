import { Context } from "./context.js";
export class Program {
    shaders;
    gl;
    program;
    linked = false;
    constructor(shaders) {
        this.shaders = shaders;
        this.gl = Context.gl;
        this.program = this.gl.createProgram();
        if (!this.program) {
            throw new Error("Unable to create WebGL program.");
        }
        // Attach shaders
        for (const shader of shaders) {
            this.gl.attachShader(this.program, shader.getObject());
        }
        // Link program
        this.gl.linkProgram(this.program);
    }
    async waitForLinkAsync() {
        if (this.linked)
            return;
        const ext = this.gl.getExtension('KHR_parallel_shader_compile');
        if (ext) {
            // Poll until complete
            while (true) {
                const complete = this.gl.getProgramParameter(this.program, ext.COMPLETION_STATUS_KHR);
                if (complete)
                    break;
                await new Promise(resolve => setTimeout(resolve, 0));
            }
        }
        // Detach shaders
        for (const shader of this.shaders) {
            this.gl.detachShader(this.program, shader.getObject());
        }
        // Check link status
        if (!this.gl.getProgramParameter(this.program, this.gl.raw.LINK_STATUS)) {
            const info = this.gl.getProgramInfoLog(this.program);
            this.gl.deleteProgram(this.program);
            throw new Error(`Error linking program: ${info}`);
        }
        this.linked = true;
    }
    use() {
        if (!this.linked)
            throw new Error("Program not linked yet");
        this.gl.useProgram(this.program);
    }
    stopUsing() {
        this.gl.useProgram(null);
    }
    getObject() {
        return this.program;
    }
    dispose() {
        this.gl.deleteProgram(this.program);
    }
}
//# sourceMappingURL=program.js.map