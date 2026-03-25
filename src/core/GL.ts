export class GL {

    public static profiling: boolean = false;

    public raw: WebGL2RenderingContext;

    private mVBO_Quad: WebGLBuffer;

    constructor(gl: WebGL2RenderingContext) {
        this.raw = gl;

        var vertices = new Float32Array( [ -1.0, -1.0,   1.0, -1.0,    -1.0,  1.0,     1.0, -1.0,    1.0,  1.0,    -1.0,  1.0] );
        this.mVBO_Quad = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, this.mVBO_Quad );
        gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW );
        gl.bindBuffer( gl.ARRAY_BUFFER, null );
    }

    private checkError(method: string): void {
        if (!GL.profiling) return;

        const err = this.raw.getError();
        if (err !== this.raw.NO_ERROR) {
            // check warning
            if (err === this.raw.INVALID_VALUE) {
                console.log(`WebGL warning after ${method}: 0x${err.toString(16)}`);
            } else {
                //alert(`WebGL error after ${method}: 0x${err.toString(16)}`);
                console.log(`WebGL error after ${method}: 0x${err.toString(16)}`);
            }
        }
    }

    generateMipmap(target: number) {
        return this.raw.generateMipmap(target);
    }

    getExtension(name: string) {
        return this.raw.getExtension(name);
    }

    createVertexArray(): WebGLVertexArrayObject {
        const result = this.raw.createVertexArray();
        this.checkError('createVertexArray');
        return result;
    }
    bindVertexArray(vao: WebGLVertexArrayObject) {
        this.raw.bindVertexArray(vao);
        this.checkError('bindVertexArray');
    }

    // --- Program and Shader Methods ---
    createProgram(): WebGLProgram | null {
        const result = this.raw.createProgram();
        this.checkError('createProgram');
        return result;
    }

    deleteProgram(program: WebGLProgram | null): void {
        if (program) this.raw.deleteProgram(program);
        this.checkError('deleteProgram');
    }

    attachShader(program: WebGLProgram, shader: WebGLShader): void {
        this.raw.attachShader(program, shader);
        this.checkError('attachShader');
    }

    detachShader(program: WebGLProgram, shader: WebGLShader): void {
        this.raw.detachShader(program, shader);
        this.checkError('detachShader');
    }

    linkProgram(program: WebGLProgram): void {
        this.raw.linkProgram(program);
        this.checkError('linkProgram');
    }

    useProgram(program: WebGLProgram | null): void {
        this.raw.useProgram(program);
        this.checkError('useProgram');
    }

    getProgramParameter(program: WebGLProgram, pname: number): any {
        const result = this.raw.getProgramParameter(program, pname);
        this.checkError(`getProgramParameter ${pname}`);
        return result;
    }

    getProgramInfoLog(program: WebGLProgram): string | null {
        const result = this.raw.getProgramInfoLog(program);
        this.checkError('getProgramInfoLog');
        return result;
    }

    // --- Shader Methods ---
    createShader(type: number): WebGLShader | null {
        const result = this.raw.createShader(type);
        this.checkError(`createShader ${type}`);
        return result;
    }

    shaderSource(shader: WebGLShader, source: string): void {
        this.raw.shaderSource(shader, source);
        this.checkError(`shaderSource`);
    }

    compileShader(shader: WebGLShader): void {
        this.raw.compileShader(shader);
        this.checkError('compileShader');
    }

    getShaderParameter(shader: WebGLShader, pname: number): any {
        const result = this.raw.getShaderParameter(shader, pname);
        this.checkError(`getShaderParameter ${pname}`);
        return result;
    }

    getShaderInfoLog(shader: WebGLShader): string | null {
        const result = this.raw.getShaderInfoLog(shader);
        this.checkError('getShaderInfoLog');
        return result;
    }

    deleteShader(shader: WebGLShader | null): void {
        if (shader) this.raw.deleteShader(shader);
        this.checkError('deleteShader');
    }

    // --- Uniform/Attrib Methods ---
    getUniformLocation(program: WebGLProgram, name: string): WebGLUniformLocation | null {
        const result = this.raw.getUniformLocation(program, name);
        this.checkError(`getUniformLocation ${name}`);
        return result;
    }

    uniform1i(location: WebGLUniformLocation | null, x: number): void {
        this.raw.uniform1i(location, x);
        this.checkError(`uniform1i ${x}`);
    }

    uniform2i(location: WebGLUniformLocation | null, x: number, y: number): void {
        this.raw.uniform2i(location, x, y);
        this.checkError(`uniform2i ${x}, ${y}`);
    }

    uniform1f(location: WebGLUniformLocation | null, x: number): void {
        this.raw.uniform1f(location, x);
        this.checkError(`uniform1f ${x}`);
    }

    uniform2f(location: WebGLUniformLocation | null, x: number, y: number): void {
        this.raw.uniform2f(location, x, y);
        this.checkError(`uniform2f ${x}, ${y}`);
    }

    uniform3f(location: WebGLUniformLocation | null, x: number, y: number, z: number): void {
        this.raw.uniform3f(location, x, y, z);
        this.checkError(`uniform3f ${x}, ${y}, ${z}`);
    }

    uniform3fv(location: WebGLUniformLocation | null, values: Iterable<GLfloat>): void {
        this.raw.uniform3fv(location, values);
        this.checkError(`uniform3fv ${values}`);
    }

    uniform4f(location: WebGLUniformLocation | null, x: number, y: number, z: number, w: number): void {
        this.raw.uniform4f(location, x, y, z, w);
        this.checkError(`uniform4f ${x}, ${y}, ${z}, ${w}`);
    }
   
    uniform4fv(location: WebGLUniformLocation | null, values: Iterable<GLfloat>): void {
        this.raw.uniform4fv(location, values);
        this.checkError(`uniform4fv ${values}`);
    }

    uniformMatrix4fv(location: WebGLUniformLocation | null, transpose: boolean, value: Float32List): void {
        this.raw.uniformMatrix4fv(location, transpose, value);
        this.checkError(`uniformMatrix4fv ${transpose}, ${value}`);
    }

    getAttribLocation(program: WebGLProgram, name: string): number {
        const result = this.raw.getAttribLocation(program, name);
        this.checkError(`getAttribLocation ${name}`);
        return result;
    }

    enableVertexAttribArray(index: number): void {
        this.raw.enableVertexAttribArray(index);
        this.checkError(`enableVertexAttribArray ${index}`);
    }

    vertexAttribPointer(index: number, size: number, type: number, normalized: boolean, stride: number, offset: number): void {
        this.raw.vertexAttribPointer(index, size, type, normalized, stride, offset);
        this.checkError(`vertexAttribPointer ${index}, ${size}, ${type}, ${normalized}, ${stride}, ${offset}`);
    }

    disableVertexAttribArray(index: number): void {
        this.raw.disableVertexAttribArray(index);
        this.checkError(`disableVertexAttribArray ${index}`);
    }

    // --- Buffer Methods ---
    createBuffer(): WebGLBuffer | null {
        const result = this.raw.createBuffer();
        this.checkError('createBuffer');
        return result;
    }

    bindBuffer(target: number, buffer: WebGLBuffer | null): void {
        this.raw.bindBuffer(target, buffer);
        this.checkError(`bindBuffer ${target}`);
    }

    bufferData(target: number, data: BufferSource, usage: number): void {
        this.raw.bufferData(target, data, usage);
        this.checkError(`bufferData ${target} ${usage}`);
    }

    bufferSubData(target: number, offset: number, data: BufferSource): void {
        this.raw.bufferSubData(target, offset, data);
        this.checkError(`bufferSubData ${target} ${offset}`);
    }

    deleteBuffer(buffer: WebGLBuffer | null): void {
        if (buffer) this.raw.deleteBuffer(buffer);
        this.checkError('deleteBuffer');
    }

    // --- Drawing Methods ---
    drawArrays(mode: number, first: number, count: number): void {
        this.raw.drawArrays(mode, first, count);
        this.checkError(`drawArrays ${mode}, ${first}, ${count}`);
    }

    drawElements(mode: number, count: number, type: number, offset: number): void {
        this.raw.drawElements(mode, count, type, offset);
        this.checkError(`drawElements ${mode}, ${count}, ${type}, ${offset}`);
    }

    // --- State Methods ---
    enable(cap: number): void {
        this.raw.enable(cap);
        this.checkError(`enable ${cap}`);
    }

    disable(cap: number): void {
        this.raw.disable(cap);
        this.checkError(`disable ${cap}`);
    }

    clearColor(r: number, g: number, b: number, a: number): void {
        this.raw.clearColor(r, g, b, a);
        this.checkError(`clearColor ${r}, ${g}, ${b}, ${a}`);
    }

    clear(mask: number): void {
        this.raw.clear(mask);
        this.checkError(`clear ${mask}`);
    }

    viewport(x: number, y: number, width: number, height: number): void {
        this.raw.viewport(x, y, width, height);
        this.checkError(`viewport ${x}, ${y}, ${width}, ${height}`);
    }

    // --- Texture Methods ---
    createTexture(): WebGLTexture | null {
        const result = this.raw.createTexture();
        this.checkError('createTexture');
        return result;
    }

    deleteTexture(texture: WebGLTexture | null): void {
        if (texture) this.raw.deleteTexture(texture);
        this.checkError('deleteTexture');
    }

    bindTexture(target: number, texture: WebGLTexture): void {
        this.raw.bindTexture(target, texture);
        this.checkError(`bindTexture ${target}`);
    }

    texImage2D(
        target: number, level: number, internalformat: number,
        widthOrFormat: number, heightOrType: number, borderOrPixels: number | TexImageSource | null,
        format?: number, type?: number, pixels?: ArrayBufferView | TexImageSource | null
    ): void {
        // Determine which overload is being called based on arguments
        if (
            typeof format === 'number' &&
            typeof type === 'number' &&
            (pixels === null || ArrayBuffer.isView(pixels))
        ) {
            // texImage2D(target, level, internalformat, width, height, border, format, type, pixels)
            this.raw.texImage2D(
                target,
                level,
                internalformat,
                widthOrFormat as number,
                heightOrType as number,
                borderOrPixels as number,
                format,
                type,
                pixels as ArrayBufferView<ArrayBufferLike> | null
            );
            this.checkError(`texImage2D ${target} ${level} ${internalformat} ${widthOrFormat} ${heightOrType} ${borderOrPixels} ${format}, ${type}`);
        } else {
            // texImage2D(target, level, internalformat, format, type, pixels)
            this.raw.texImage2D(
                target,
                level,
                internalformat,
                widthOrFormat as number,
                heightOrType as number,
                borderOrPixels as TexImageSource | null
            );
            this.checkError(`texImage2D ${target} ${level} ${internalformat} ${widthOrFormat} ${heightOrType}`);
        }
    }

    texParameteri(target: number, pname: number, param: number): void {
        this.raw.texParameteri(target, pname, param);
        this.checkError(`texParameteri ${target} ${pname} ${param}`);
    }

    activeTexture(texture: number): void {
        this.raw.activeTexture(texture);
        this.checkError(`activeTexture ${texture}`);
    }

    texImage3D(
        target: number, level: number, internalformat: number,
        width: number, height: number, depth: number, border: number,
        format: number, type: number, pixels: ArrayBufferView<ArrayBufferLike> | null
    ): void {
        this.raw.texImage3D(target, level, internalformat, width, height, depth, border, format, type, pixels);
        this.checkError(`texImage3D ${target} ${level} ${internalformat} ${width} ${height} ${depth} ${border} ${format} ${type}`);
    }

    texSubImage2D(
        target: number, level: number, xoffset: number, yoffset: number,
        width: number, height: number, format: number, type: number, pixels: ArrayBufferView<ArrayBufferLike>
    ): void {
        this.raw.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels);
        this.checkError(`texSubImage2D ${target} ${level} ${xoffset} ${yoffset} ${width} ${height} ${format} ${type}`);
    }

    // --- Framebuffer Methods ---
    createFramebuffer(): WebGLFramebuffer | null {
        const result = this.raw.createFramebuffer();
        this.checkError('createFramebuffer');
        return result;
    }

    deleteFramebuffer(fbo: WebGLFramebuffer | null): void {
        if (fbo) this.raw.deleteFramebuffer(fbo);
        this.checkError('deleteFramebuffer');
    }

    bindFramebuffer(target: number, fbo: WebGLFramebuffer | null): void {
        this.raw.bindFramebuffer(target, fbo);
        this.checkError(`bindFramebuffer ${target}`);
    }

    framebufferTexture2D(
        target: number, attachment: number, textarget: number,
        texture: WebGLTexture | null, level: number
    ): void {
        this.raw.framebufferTexture2D(target, attachment, textarget, texture, level);
        this.checkError(`framebufferTexture2D ${target} ${attachment} ${textarget} ${level}`);
    }

    // --- Pixel Methods ---
    pixelStorei(pname: number, param: number | boolean): void {
        this.raw.pixelStorei(pname, param);
       // this.checkError(`pixelStorei ${pname} ${param}`);
    }

    readPixels(
        x: number, y: number, width: number, height: number,
        format: number, type: number, pixels: ArrayBufferView, offset: number
    ): void {
        this.raw.readPixels(x, y, width, height, format, type, pixels, offset);
        this.checkError(`readPixels ${x} ${y} ${width} ${height} ${format} ${type} ${offset}`);
    }

    drawUnitQuad_XY( vpos: number)
    {
        this.bindBuffer( this.raw.ARRAY_BUFFER, this.mVBO_Quad );
        this.vertexAttribPointer( vpos, 2, this.raw.FLOAT, false, 0, 0 );
        this.enableVertexAttribArray( vpos );
        this.drawArrays( this.raw.TRIANGLES, 0, 6 );
        this.disableVertexAttribArray( vpos );
        this.bindBuffer( this.raw.ARRAY_BUFFER, null );
    };
}
