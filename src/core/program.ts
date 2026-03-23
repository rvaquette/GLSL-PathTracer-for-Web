import { Context } from "./context.js";
import { GL } from "./GL.js";
import { Shader } from "./shader.js";

export class Program {
    private gl: GL;
    private program: WebGLProgram;
    private linked: boolean = false;

    constructor(private shaders: Shader[]) {
        this.gl = Context.gl;
        
        this.program = this.gl.createProgram()!;
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

    async waitForLinkAsync(): Promise<void> {
        if (this.linked) return;

        const ext = this.gl.getExtension('KHR_parallel_shader_compile');
        
        if (ext) {
            // Poll until complete
            while (true) {
                const complete = this.gl.getProgramParameter(
                    this.program, 
                    ext.COMPLETION_STATUS_KHR
                );
                if (complete) break;
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

    use(): void {
        if (!this.linked) throw new Error("Program not linked yet");
        this.gl.useProgram(this.program);
    }

    stopUsing(): void {
        this.gl.useProgram(null);
    }

    getObject(): WebGLProgram {
        return this.program;
    }

    dispose(): void {
        this.gl.deleteProgram(this.program);
    }
}
