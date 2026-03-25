export class GL {
    static profiling = false;
    raw;
    mVBO_Quad;
    constructor(gl) {
        this.raw = gl;
        var vertices = new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0]);
        this.mVBO_Quad = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mVBO_Quad);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
    checkError(method) {
        if (!GL.profiling)
            return;
        return;
        const err = this.raw.getError();
        if (err !== this.raw.NO_ERROR) {
            // check warning
            if (err === this.raw.INVALID_VALUE) {
                console.log(`WebGL warning after ${method}: 0x${err.toString(16)}`);
            }
            else {
                //alert(`WebGL error after ${method}: 0x${err.toString(16)}`);
                console.log(`WebGL error after ${method}: 0x${err.toString(16)}`);
            }
        }
    }
    // static addTrace(trace: string): void {
    //     if (!GL.profiling) return;
    //     GL.traces.push(">>> " + trace);
    // }
    // static eraseTraces(): void {
    //     GL.traces = [];
    // }
    // static exportTraces(filename: string): void {
    //     if (!GL.profiling) return;
    //     // Export to new file
    //     let traces = GL.traces.join('\n');
    //     const blob = new Blob([traces], { type: 'text/plain' });
    //     const url = URL.createObjectURL(blob);
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = filename;
    //     a.click();
    //     URL.revokeObjectURL(url);
    //     GL.eraseTraces();
    // }
    generateMipmap(target) {
        return this.raw.generateMipmap(target);
    }
    getExtension(name) {
        return this.raw.getExtension(name);
    }
    createVertexArray() {
        const result = this.raw.createVertexArray();
        this.checkError('createVertexArray');
        return result;
    }
    bindVertexArray(vao) {
        this.raw.bindVertexArray(vao);
        this.checkError('bindVertexArray');
    }
    // --- Program and Shader Methods ---
    createProgram() {
        const result = this.raw.createProgram();
        this.checkError('createProgram');
        return result;
    }
    deleteProgram(program) {
        if (program)
            this.raw.deleteProgram(program);
        this.checkError('deleteProgram');
    }
    attachShader(program, shader) {
        this.raw.attachShader(program, shader);
        this.checkError('attachShader');
    }
    detachShader(program, shader) {
        this.raw.detachShader(program, shader);
        this.checkError('detachShader');
    }
    linkProgram(program) {
        this.raw.linkProgram(program);
        this.checkError('linkProgram');
    }
    useProgram(program) {
        this.raw.useProgram(program);
        this.checkError('useProgram');
    }
    getProgramParameter(program, pname) {
        const result = this.raw.getProgramParameter(program, pname);
        this.checkError(`getProgramParameter ${pname}`);
        return result;
    }
    getProgramInfoLog(program) {
        const result = this.raw.getProgramInfoLog(program);
        this.checkError('getProgramInfoLog');
        return result;
    }
    // --- Shader Methods ---
    createShader(type) {
        const result = this.raw.createShader(type);
        this.checkError(`createShader ${type}`);
        return result;
    }
    shaderSource(shader, source) {
        this.raw.shaderSource(shader, source);
        this.checkError(`shaderSource`);
    }
    compileShader(shader) {
        this.raw.compileShader(shader);
        this.checkError('compileShader');
    }
    getShaderParameter(shader, pname) {
        const result = this.raw.getShaderParameter(shader, pname);
        this.checkError(`getShaderParameter ${pname}`);
        return result;
    }
    getShaderInfoLog(shader) {
        const result = this.raw.getShaderInfoLog(shader);
        this.checkError('getShaderInfoLog');
        return result;
    }
    deleteShader(shader) {
        if (shader)
            this.raw.deleteShader(shader);
        this.checkError('deleteShader');
    }
    // --- Uniform/Attrib Methods ---
    getUniformLocation(program, name) {
        const result = this.raw.getUniformLocation(program, name);
        this.checkError(`getUniformLocation ${name}`);
        return result;
    }
    uniform1i(location, x) {
        this.raw.uniform1i(location, x);
        this.checkError(`uniform1i ${x}`);
    }
    uniform2i(location, x, y) {
        this.raw.uniform2i(location, x, y);
        this.checkError(`uniform2i ${x}, ${y}`);
    }
    uniform1f(location, x) {
        this.raw.uniform1f(location, x);
        this.checkError(`uniform1f ${x}`);
    }
    uniform2f(location, x, y) {
        this.raw.uniform2f(location, x, y);
        this.checkError(`uniform2f ${x}, ${y}`);
    }
    uniform3f(location, x, y, z) {
        this.raw.uniform3f(location, x, y, z);
        this.checkError(`uniform3f ${x}, ${y}, ${z}`);
    }
    uniform3fv(location, values) {
        this.raw.uniform3fv(location, values);
        this.checkError(`uniform3fv ${values}`);
    }
    uniform4f(location, x, y, z, w) {
        this.raw.uniform4f(location, x, y, z, w);
        this.checkError(`uniform4f ${x}, ${y}, ${z}, ${w}`);
    }
    uniform4fv(location, values) {
        this.raw.uniform4fv(location, values);
        this.checkError(`uniform4fv ${values}`);
    }
    uniformMatrix4fv(location, transpose, value) {
        this.raw.uniformMatrix4fv(location, transpose, value);
        this.checkError(`uniformMatrix4fv ${transpose}, ${value}`);
    }
    getAttribLocation(program, name) {
        const result = this.raw.getAttribLocation(program, name);
        this.checkError(`getAttribLocation ${name}`);
        return result;
    }
    enableVertexAttribArray(index) {
        this.raw.enableVertexAttribArray(index);
        this.checkError(`enableVertexAttribArray ${index}`);
    }
    vertexAttribPointer(index, size, type, normalized, stride, offset) {
        this.raw.vertexAttribPointer(index, size, type, normalized, stride, offset);
        this.checkError(`vertexAttribPointer ${index}, ${size}, ${type}, ${normalized}, ${stride}, ${offset}`);
    }
    disableVertexAttribArray(index) {
        this.raw.disableVertexAttribArray(index);
        this.checkError(`disableVertexAttribArray ${index}`);
    }
    // --- Buffer Methods ---
    createBuffer() {
        const result = this.raw.createBuffer();
        this.checkError('createBuffer');
        return result;
    }
    bindBuffer(target, buffer) {
        this.raw.bindBuffer(target, buffer);
        this.checkError(`bindBuffer ${target}`);
    }
    bufferData(target, data, usage) {
        this.raw.bufferData(target, data, usage);
        this.checkError(`bufferData ${target} ${usage}`);
    }
    bufferSubData(target, offset, data) {
        this.raw.bufferSubData(target, offset, data);
        this.checkError(`bufferSubData ${target} ${offset}`);
    }
    deleteBuffer(buffer) {
        if (buffer)
            this.raw.deleteBuffer(buffer);
        this.checkError('deleteBuffer');
    }
    // --- Drawing Methods ---
    drawArrays(mode, first, count) {
        this.raw.drawArrays(mode, first, count);
        this.checkError(`drawArrays ${mode}, ${first}, ${count}`);
    }
    drawElements(mode, count, type, offset) {
        this.raw.drawElements(mode, count, type, offset);
        this.checkError(`drawElements ${mode}, ${count}, ${type}, ${offset}`);
    }
    // --- State Methods ---
    enable(cap) {
        this.raw.enable(cap);
        this.checkError(`enable ${cap}`);
    }
    disable(cap) {
        this.raw.disable(cap);
        this.checkError(`disable ${cap}`);
    }
    clearColor(r, g, b, a) {
        this.raw.clearColor(r, g, b, a);
        this.checkError(`clearColor ${r}, ${g}, ${b}, ${a}`);
    }
    clear(mask) {
        this.raw.clear(mask);
        this.checkError(`clear ${mask}`);
    }
    viewport(x, y, width, height) {
        this.raw.viewport(x, y, width, height);
        this.checkError(`viewport ${x}, ${y}, ${width}, ${height}`);
    }
    // --- Texture Methods ---
    createTexture() {
        const result = this.raw.createTexture();
        this.checkError('createTexture');
        return result;
    }
    deleteTexture(texture) {
        if (texture)
            this.raw.deleteTexture(texture);
        this.checkError('deleteTexture');
    }
    bindTexture(target, texture) {
        this.raw.bindTexture(target, texture);
        this.checkError(`bindTexture ${target}`);
    }
    texImage2D(target, level, internalformat, widthOrFormat, heightOrType, borderOrPixels, format, type, pixels) {
        // Determine which overload is being called based on arguments
        if (typeof format === 'number' &&
            typeof type === 'number' &&
            (pixels === null || ArrayBuffer.isView(pixels))) {
            // texImage2D(target, level, internalformat, width, height, border, format, type, pixels)
            this.raw.texImage2D(target, level, internalformat, widthOrFormat, heightOrType, borderOrPixels, format, type, pixels);
            this.checkError(`texImage2D ${target} ${level} ${internalformat} ${widthOrFormat} ${heightOrType} ${borderOrPixels} ${format}, ${type}`);
        }
        else {
            // texImage2D(target, level, internalformat, format, type, pixels)
            this.raw.texImage2D(target, level, internalformat, widthOrFormat, heightOrType, borderOrPixels);
            this.checkError(`texImage2D ${target} ${level} ${internalformat} ${widthOrFormat} ${heightOrType}`);
        }
    }
    texParameteri(target, pname, param) {
        this.raw.texParameteri(target, pname, param);
        this.checkError(`texParameteri ${target} ${pname} ${param}`);
    }
    activeTexture(texture) {
        this.raw.activeTexture(texture);
        this.checkError(`activeTexture ${texture}`);
    }
    texImage3D(target, level, internalformat, width, height, depth, border, format, type, pixels) {
        this.raw.texImage3D(target, level, internalformat, width, height, depth, border, format, type, pixels);
        this.checkError(`texImage3D ${target} ${level} ${internalformat} ${width} ${height} ${depth} ${border} ${format} ${type}`);
    }
    texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels) {
        this.raw.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels);
        this.checkError(`texSubImage2D ${target} ${level} ${xoffset} ${yoffset} ${width} ${height} ${format} ${type}`);
    }
    // --- Framebuffer Methods ---
    createFramebuffer() {
        const result = this.raw.createFramebuffer();
        this.checkError('createFramebuffer');
        return result;
    }
    deleteFramebuffer(fbo) {
        if (fbo)
            this.raw.deleteFramebuffer(fbo);
        this.checkError('deleteFramebuffer');
    }
    bindFramebuffer(target, fbo) {
        this.raw.bindFramebuffer(target, fbo);
        this.checkError(`bindFramebuffer ${target}`);
    }
    framebufferTexture2D(target, attachment, textarget, texture, level) {
        this.raw.framebufferTexture2D(target, attachment, textarget, texture, level);
        this.checkError(`framebufferTexture2D ${target} ${attachment} ${textarget} ${level}`);
    }
    // --- Pixel Methods ---
    pixelStorei(pname, param) {
        this.raw.pixelStorei(pname, param);
        // this.checkError(`pixelStorei ${pname} ${param}`);
    }
    readPixels(x, y, width, height, format, type, pixels, offset) {
        this.raw.readPixels(x, y, width, height, format, type, pixels, offset);
        this.checkError(`readPixels ${x} ${y} ${width} ${height} ${format} ${type} ${offset}`);
    }
    drawUnitQuad_XY(vpos) {
        this.bindBuffer(this.raw.ARRAY_BUFFER, this.mVBO_Quad);
        this.vertexAttribPointer(vpos, 2, this.raw.FLOAT, false, 0, 0);
        this.enableVertexAttribArray(vpos);
        this.drawArrays(this.raw.TRIANGLES, 0, 6);
        this.disableVertexAttribArray(vpos);
        this.bindBuffer(this.raw.ARRAY_BUFFER, null);
    }
    ;
}
//# sourceMappingURL=GL.js.map