import { Context } from "./context.js";
import { Program } from "./program.js";
import { GL } from "./GL.js";

export class Quad {
    private gl: GL;
    private vao: WebGLVertexArrayObject | null = null;
    private vbo: WebGLBuffer | null = null;

    constructor() {
        this.gl = Context.gl;
        this.vao = this.gl.createVertexArray();
        this.vbo = this.gl.createBuffer();

        this.gl.bindVertexArray(this.vao);
        this.gl.bindBuffer(this.gl.raw.ARRAY_BUFFER, this.vbo);

        // Vertex data: [pos.x, pos.y, uv.x, uv.y] * 6
        const vertices = new Float32Array([
            -1.0,  1.0, 0.0, 1.0,
            -1.0, -1.0, 0.0, 0.0,
             1.0, -1.0, 1.0, 0.0,
            -1.0,  1.0, 0.0, 1.0,
             1.0, -1.0, 1.0, 0.0,
             1.0,  1.0, 1.0, 1.0
        ]);

        this.gl.bufferData(this.gl.raw.ARRAY_BUFFER, vertices, this.gl.raw.STATIC_DRAW);

        // Position attribute (location = 0)
        this.gl.enableVertexAttribArray(0);
        this.gl.vertexAttribPointer(
            0, 2, this.gl.raw.FLOAT, false, 4 * Float32Array.BYTES_PER_ELEMENT, 0
        );

        // UV attribute (location = 1)
        this.gl.enableVertexAttribArray(1);
        this.gl.vertexAttribPointer(
            1, 2, this.gl.raw.FLOAT, false, 4 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT
        );

        this.gl.bindVertexArray(null);
    }

    draw(shader: Program) {
        shader.use();
        this.gl.bindVertexArray(this.vao);
        this.gl.drawArrays(this.gl.raw.TRIANGLES, 0, 6);
        this.gl.bindVertexArray(null);
        shader.stopUsing();
    }
}
