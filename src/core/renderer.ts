import { Vec2 } from "../math/vec2.js";
import { Vec3 } from "../math/vec3.js";
import { Context } from "./context.js";
import { GL } from "./GL.js";
import { Program } from "./program.js";
import { Quad } from "./quad.js";
import { Scene } from "./scene.js";
import { Shader } from "./shader.js";
import { ShaderInclude, ShaderSource } from "./shaderIncludes.js";
import { Denoiser } from "../external/denoiser/denoiser.js";

export class Renderer {
    public static maxBufferTextureWidth = 4096;

    private gl: GL;
    private _scene: Scene;
    private shadersDirectory: string;

    private BVHTex: WebGLTexture | null = null;
    private vertexIndicesTex: WebGLTexture | null = null;
    private verticesTex: WebGLTexture | null = null;
    private normalsTex: WebGLTexture | null = null;
    private materialsTex: WebGLTexture | null = null;
    private transformsTex: WebGLTexture | null = null;
    private lightsTex: WebGLTexture | null = null;
    private textureMapsArrayTex: WebGLTexture | null = null;
    private envMapTex: WebGLTexture | null = null;
    private envMapCDFTex: WebGLTexture | null = null;

    private pathTraceTextureLowRes: WebGLTexture | null = null;
    private pathTraceTexture: WebGLTexture | null = null;
    private accumTexture: WebGLTexture | null = null;
    private tileOutputTexture: [WebGLTexture | null, WebGLTexture | null] = [null, null];

    private pathTraceFBO: WebGLFramebuffer | null = null;
    private pathTraceFBOLowRes: WebGLFramebuffer | null = null;
    private accumFBO: WebGLFramebuffer | null = null;
    private outputFBO: WebGLFramebuffer | null = null;

    private pathTraceShader: Program | null = null;
    private pathTraceShaderLowRes: Program | null = null;
    private outputShader: Program | null = null;
    private tonemapShader: Program | null = null;

    private programs: Program[] = [];

    private quad: Quad;
    private pixelRatio: number;

    backendReady: boolean = false;
    denoiser: Denoiser | null = null;
    denoiserExecutedOneTime: boolean = false;
    denoised: boolean = false;
    denoiserFBO: WebGLFramebuffer | null = null;
    denoiserTexture: WebGLTexture | null = null;
    denoiserInputFramePtr: Float32Array | null = null;
    denoiserCanvas: HTMLCanvasElement | null = null;

    private _sampleCounter = 1;
    private currentBuffer = 0;
    private frameCounter = 1;
    private _renderSize: Vec2 = new Vec2(0, 0);
    private windowSize: Vec2 = new Vec2(0, 0);
    private tileWidth = 0;
    private tileHeight = 0;
    private invNumTiles: Vec2 = new Vec2(0, 0);
    public numTiles: Vec2 = new Vec2(0, 0);
    public tile: Vec2 = new Vec2(0, 0);

    public get scene(): Scene {
        return this._scene;
    }

    public get renderSize(): Vec2 {
        return this._renderSize;
    }

    public get sampleCounter(): number {
        return this._sampleCounter;
    }

    public set sampleCounter(value: number) {
        this._sampleCounter = value;
    }

    async initAsync(scene: Scene): Promise<void> {
        this.gl = Context.gl;
        this._scene = scene;
        this.shadersDirectory = "./shaders/";

        this.initGPUDataBuffers();
        this.quad = new Quad();
        this.pixelRatio = scene.renderOptions.pixelRatio;

        await this.initFBOsAsync();
        await this.initShadersAsync();
    }

    private createTexture(internalFormat: number, width: number, height: number, format: number, type: number, data: ArrayBufferView | null): WebGLTexture {
        const gl = this.gl;

        const texture = gl.createTexture();
        gl.bindTexture(gl.raw.TEXTURE_2D, texture);
        gl.texImage2D(gl.raw.TEXTURE_2D, 0, internalFormat, width, height, 0, format, type, data);
        gl.texParameteri(gl.raw.TEXTURE_2D, gl.raw.TEXTURE_WRAP_S, gl.raw.CLAMP_TO_EDGE);
        gl.texParameteri(gl.raw.TEXTURE_2D, gl.raw.TEXTURE_WRAP_T, gl.raw.CLAMP_TO_EDGE);
        gl.texParameteri(gl.raw.TEXTURE_2D, gl.raw.TEXTURE_MAG_FILTER, gl.raw.NEAREST);
        gl.texParameteri(gl.raw.TEXTURE_2D, gl.raw.TEXTURE_MIN_FILTER, gl.raw.NEAREST);
        gl.bindTexture(gl.raw.TEXTURE_2D, null);

        return texture;
    }

    private createBufferTexture(data: Float32Array, format: number): WebGLTexture {
        const totalElements = data.length / format;
        const width = Math.min(Renderer.maxBufferTextureWidth, totalElements);
        const height = Math.ceil(totalElements / width);

        if (width * height * format !== data.length) {
            const tmp = new Float32Array(width * height * format);
            tmp.set(data);
            data = tmp;
        }

        return this.createTexture(
            format === 4 ? this.gl.raw.RGBA32F : this.gl.raw.RGB32F,
            width,
            height,
            format === 4 ? this.gl.raw.RGBA : this.gl.raw.RGB,
            this.gl.raw.FLOAT,
            data
        );
    }

    private createBufferTextureInt(data: Int32Array, format: number): WebGLTexture {
        const totalElements = data.length / format;
        const width = Math.min(Renderer.maxBufferTextureWidth, totalElements);
        const height = Math.ceil(totalElements / width);

        if (width * height * format !== data.length) {
            const tmp = new Int32Array(width * height * format);
            tmp.set(data);
            data = tmp;
        }

        return this.createTexture(
            format === 4 ? this.gl.raw.RGBA32I : this.gl.raw.RGB32I,
            width,
            height,
            format === 4 ? this.gl.raw.RGBA_INTEGER : this.gl.raw.RGB_INTEGER,
            this.gl.raw.INT,
            data
        );
    }

    private createBufferTextureUint(data: Uint8Array, format: number): WebGLTexture {
        const totalElements = data.length / format;
        const width = this.scene.renderOptions.texArrayWidth;
        const height = Math.ceil(totalElements / width);

        return this.createTexture(
            format === 4 ? this.gl.raw.RGBA8UI : this.gl.raw.RGB8UI,
            width,
            height,
            format === 4 ? this.gl.raw.RGBA_INTEGER : this.gl.raw.RGB_INTEGER,
            this.gl.raw.UNSIGNED_BYTE,
            data
        );
    }

    private initGPUDataBuffers(): void {
        const gl = this.gl;

        gl.pixelStorei(gl.raw.PACK_ALIGNMENT, 1);

        this.BVHTex = this.createBufferTexture(this.scene.bvhDataArray, 3);
        this.vertexIndicesTex = this.createBufferTextureInt(this.scene.vertIndicesDataArray, 3);
        this.verticesTex = this.createBufferTexture(this.scene.verticesDataArray, 4);
        this.normalsTex = this.createBufferTexture(this.scene.normalsDataArray, 4);
        this.materialsTex = this.createBufferTexture(this.scene.materialsDataArray, 4);
        this.transformsTex = this.createBufferTexture(this.scene.transformsDataArray, 4);

        if (this.scene.lightsDataArray && this.scene.lightsDataArray.length > 0) {
            this.lightsTex = this.createBufferTexture(this.scene.lightsDataArray, 3);
        }

        if (this.scene.textureMapsArray && this.scene.textureMapsArray.length > 0) {
            this.textureMapsArrayTex = this.createBufferTextureUint(this.scene.textureMapsArray, 4);
        }

        if (this.scene.envMap) {
            const envMap = this.scene.envMap;

            this.envMapTex = gl.createTexture();
            gl.bindTexture(gl.raw.TEXTURE_2D, this.envMapTex);
            gl.texImage2D(gl.raw.TEXTURE_2D, 0, gl.raw.RGB32F, envMap.width, envMap.height, 0, gl.raw.RGB, gl.raw.FLOAT, envMap.img);
            gl.texParameteri(gl.raw.TEXTURE_2D, gl.raw.TEXTURE_MAG_FILTER, gl.raw.LINEAR);
            gl.texParameteri(gl.raw.TEXTURE_2D, gl.raw.TEXTURE_MIN_FILTER, gl.raw.LINEAR);
            gl.bindTexture(gl.raw.TEXTURE_2D, null);

            this.envMapCDFTex = gl.createTexture();
            gl.bindTexture(gl.raw.TEXTURE_2D, this.envMapCDFTex);
            gl.texImage2D(gl.raw.TEXTURE_2D, 0, gl.raw.R32F, envMap.width, envMap.height, 0, gl.raw.RED, gl.raw.FLOAT, envMap.cdf);
            gl.texParameteri(gl.raw.TEXTURE_2D, gl.raw.TEXTURE_MAG_FILTER, gl.raw.NEAREST);
            gl.texParameteri(gl.raw.TEXTURE_2D, gl.raw.TEXTURE_MIN_FILTER, gl.raw.NEAREST);
            gl.bindTexture(gl.raw.TEXTURE_2D, null);
        }

        gl.activeTexture(gl.raw.TEXTURE1); gl.bindTexture(gl.raw.TEXTURE_2D, this.BVHTex);
        gl.activeTexture(gl.raw.TEXTURE2); gl.bindTexture(gl.raw.TEXTURE_2D, this.vertexIndicesTex);
        gl.activeTexture(gl.raw.TEXTURE3); gl.bindTexture(gl.raw.TEXTURE_2D, this.verticesTex);
        gl.activeTexture(gl.raw.TEXTURE4); gl.bindTexture(gl.raw.TEXTURE_2D, this.normalsTex);
        gl.activeTexture(gl.raw.TEXTURE5); gl.bindTexture(gl.raw.TEXTURE_2D, this.materialsTex);
        gl.activeTexture(gl.raw.TEXTURE6); gl.bindTexture(gl.raw.TEXTURE_2D, this.transformsTex);
        gl.activeTexture(gl.raw.TEXTURE7); gl.bindTexture(gl.raw.TEXTURE_2D, this.lightsTex);
        gl.activeTexture(gl.raw.TEXTURE8); gl.bindTexture(gl.raw.TEXTURE_2D, this.textureMapsArrayTex);
        gl.activeTexture(gl.raw.TEXTURE9); gl.bindTexture(gl.raw.TEXTURE_2D, this.envMapTex);
        gl.activeTexture(gl.raw.TEXTURE10); gl.bindTexture(gl.raw.TEXTURE_2D, this.envMapCDFTex);
    }

    public dispose(): void {
        const gl = this.gl;

        [
            this.pathTraceTexture, this.pathTraceTextureLowRes, this.accumTexture,
            this.tileOutputTexture[0], this.tileOutputTexture[1], this.denoiserTexture, this.BVHTex,
            this.vertexIndicesTex, this.verticesTex, this.normalsTex, this.materialsTex,
            this.transformsTex, this.lightsTex, this.textureMapsArrayTex, this.envMapTex,
            this.envMapCDFTex
        ].forEach(t => t && gl.deleteTexture(t));

        this.pathTraceTexture = null;
        this.pathTraceTextureLowRes = null;
        this.accumTexture = null;
        this.tileOutputTexture = [null, null];
        this.denoiserTexture = null;
        this.BVHTex = null;
        this.vertexIndicesTex = null;
        this.verticesTex = null;
        this.normalsTex = null;
        this.materialsTex = null;
        this.transformsTex = null;
        this.lightsTex = null;
        this.textureMapsArrayTex = null;
        this.envMapTex = null;
        this.envMapCDFTex = null;

        if (this.denoiser) {
            this.denoiser.dispose();
            this.denoiser = null;
        }

        [this.pathTraceFBO, this.pathTraceFBOLowRes, this.accumFBO, this.outputFBO, this.denoiserFBO]
            .forEach(f => f && gl.deleteFramebuffer(f));

        this.pathTraceFBO = null;
        this.pathTraceFBOLowRes = null;
        this.accumFBO = null;
        this.outputFBO = null;

        [this.pathTraceShader, this.pathTraceShaderLowRes, this.outputShader, this.tonemapShader]
            .forEach(p => p && p.dispose());

        this.pathTraceShader = null;
        this.pathTraceShaderLowRes = null;
        this.outputShader = null;
        this.tonemapShader = null;

        this.programs.forEach(program => program.dispose());
        this.programs = [];
    }

    public async resizeRendererAsync(): Promise<void> {
        this.dispose();
        await this.initFBOsAsync();
        await this.initShadersAsync();
    }

    public pauseOrContinue(_paused: boolean): void {
    }

    private async initFBOsAsync(): Promise<void> {
        const gl = this.gl;

        this.sampleCounter = 1;
        this.currentBuffer = 0;
        this.frameCounter = 1;

        this._renderSize = this.scene.renderOptions.renderResolution;
        this.windowSize = this.scene.renderOptions.windowResolution;
        this.tileWidth = this.scene.renderOptions.tileWidth;
        this.tileHeight = this.scene.renderOptions.tileHeight;

        this.invNumTiles.x = this.tileWidth / this.renderSize.x;
        this.invNumTiles.y = this.tileHeight / this.renderSize.y;

        this.numTiles.x = Math.ceil(this.renderSize.x / this.tileWidth);
        this.numTiles.y = Math.ceil(this.renderSize.y / this.tileHeight);

        this.tile.x = -1;
        this.tile.y = this.numTiles.y - 1;

        this.pathTraceFBO = gl.createFramebuffer();
        gl.bindFramebuffer(gl.raw.FRAMEBUFFER, this.pathTraceFBO);

        this.pathTraceTexture = this.createTexture(gl.raw.RGBA32F, this.tileWidth, this.tileHeight, gl.raw.RGBA, gl.raw.FLOAT, null);
        gl.framebufferTexture2D(gl.raw.FRAMEBUFFER, gl.raw.COLOR_ATTACHMENT0, gl.raw.TEXTURE_2D, this.pathTraceTexture, 0);

        this.pathTraceFBOLowRes = gl.createFramebuffer();
        gl.bindFramebuffer(gl.raw.FRAMEBUFFER, this.pathTraceFBOLowRes);

        this.pathTraceTextureLowRes = this.createTexture(
            gl.raw.RGBA32F,
            Math.floor(this.windowSize.x * this.pixelRatio),
            Math.floor(this.windowSize.y * this.pixelRatio),
            gl.raw.RGBA,
            gl.raw.FLOAT,
            null
        );
        gl.framebufferTexture2D(gl.raw.FRAMEBUFFER, gl.raw.COLOR_ATTACHMENT0, gl.raw.TEXTURE_2D, this.pathTraceTextureLowRes, 0);

        this.accumFBO = gl.createFramebuffer();
        gl.bindFramebuffer(gl.raw.FRAMEBUFFER, this.accumFBO);

        this.accumTexture = this.createTexture(gl.raw.RGBA32F, this.renderSize.x, this.renderSize.y, gl.raw.RGBA, gl.raw.FLOAT, null);
        gl.framebufferTexture2D(gl.raw.FRAMEBUFFER, gl.raw.COLOR_ATTACHMENT0, gl.raw.TEXTURE_2D, this.accumTexture, 0);

        this.outputFBO = gl.createFramebuffer();
        gl.bindFramebuffer(gl.raw.FRAMEBUFFER, this.outputFBO);

        this.tileOutputTexture[0] = this.createTexture(gl.raw.RGBA32F, this.renderSize.x, this.renderSize.y, gl.raw.RGBA, gl.raw.FLOAT, null);
        this.tileOutputTexture[1] = this.createTexture(gl.raw.RGBA32F, this.renderSize.x, this.renderSize.y, gl.raw.RGBA, gl.raw.FLOAT, null);
        gl.framebufferTexture2D(gl.raw.FRAMEBUFFER, gl.raw.COLOR_ATTACHMENT0, gl.raw.TEXTURE_2D, this.tileOutputTexture[this.currentBuffer], 0);

        this.backendReady = !this.scene.renderOptions.enableDenoiser;

        if (this.scene.renderOptions.enableDenoiser) {
            this.denoiserInputFramePtr = new Float32Array(this.renderSize.x * this.renderSize.y * 4);

            this.denoiserTexture = this.createTexture(gl.raw.RGBA32F, this.renderSize.x, this.renderSize.y, gl.raw.RGBA, gl.raw.FLOAT, null);
        
            this.denoiserFBO = gl.createFramebuffer();

            let denoiserCanvas = document.getElementById('_denoiserOutput');
            if (denoiserCanvas === null) {
                denoiserCanvas = document.createElement('canvas');
                denoiserCanvas.id = '_denoiserOutput';
                denoiserCanvas.style.display = 'none';
                document.body.appendChild(denoiserCanvas);
            }
            this.denoiser = new Denoiser("webgl", denoiserCanvas);

            await new Promise<void>((resolve) => {
                this.denoiser.onBackendReady(() => {
                    this.denoiser.useTiling = true;
                    this.denoiser.onExecute((frameOutputPtr: Float32Array) => {
                        gl.bindFramebuffer(gl.raw.FRAMEBUFFER, this.denoiserFBO);
                        gl.bindTexture(gl.raw.TEXTURE_2D, this.denoiserTexture);
                        gl.texSubImage2D(gl.raw.TEXTURE_2D, 0, 0, 0, this.denoiser.width, this.denoiser.height, gl.raw.RGBA, gl.raw.FLOAT, frameOutputPtr);
                        gl.bindFramebuffer(gl.raw.FRAMEBUFFER, null);

                        if (!this.denoiserExecutedOneTime) this.denoiserExecutedOneTime = true;
                    }, "float32");

                    this.backendReady = true;
                    resolve();
                });
            });
        }

        gl.bindTexture(gl.raw.TEXTURE_2D, null);
        gl.bindFramebuffer(gl.raw.FRAMEBUFFER, null);
    }

    public async reloadShadersAsync(): Promise<void> {
        [this.pathTraceShader, this.pathTraceShaderLowRes, this.outputShader, this.tonemapShader]
            .forEach(p => p && p.dispose());

        this.pathTraceShader = null;
        this.pathTraceShaderLowRes = null;
        this.outputShader = null;
        this.tonemapShader = null;
        this.denoiser = null;

        this.programs.forEach(program => program.dispose());
        this.programs = [];

        await this.initShadersAsync();
    }

    private loadShaders(vertexSource: ShaderSource, fragmentSource: ShaderSource): Program {
        const shaders: Shader[] = [
            new Shader(vertexSource, this.gl.raw.VERTEX_SHADER),
            new Shader(fragmentSource, this.gl.raw.FRAGMENT_SHADER)
        ];

        const program = new Program(shaders);
        this.programs.push(program);
        return program;
    }

    private async initShadersAsync(): Promise<void> {
        const gl = this.gl;
        const scene = this.scene;

        const [
            vertexShaderSrc,
            pathTraceShaderSrc,
            pathTraceShaderLowResSrc,
            outputShaderSrc,
            tonemapShaderSrc
        ] = await Promise.all([
            ShaderInclude.loadAsync(this.shadersDirectory + "common/vertex.glsl"),
            ShaderInclude.loadAsync(this.shadersDirectory + "tile.glsl"),
            ShaderInclude.loadAsync(this.shadersDirectory + "preview.glsl"),
            ShaderInclude.loadAsync(this.shadersDirectory + "output.glsl"),
            ShaderInclude.loadAsync(this.shadersDirectory + "tonemap.glsl")
        ]);

        const [pathtraceDefines, tonemapDefines] = this.scene.getDefines();

        const insertDefines = (obj: ShaderSource, defines: string): void => {
            const versionIdx = obj.src.indexOf("#version");
            if (versionIdx !== -1) {
                const lineEnd = obj.src.indexOf("\n", versionIdx);
                obj.src = obj.src.slice(0, lineEnd + 1) + defines + obj.src.slice(lineEnd + 1);
            } else {
                obj.src = defines + obj.src;
            }
        };

        insertDefines(pathTraceShaderSrc, pathtraceDefines);
        insertDefines(pathTraceShaderLowResSrc, pathtraceDefines);
        insertDefines(tonemapShaderSrc, tonemapDefines);

        this.outputShader = this.loadShaders(vertexShaderSrc, outputShaderSrc);
        this.tonemapShader = this.loadShaders(vertexShaderSrc, tonemapShaderSrc);
        this.pathTraceShader = this.loadShaders(vertexShaderSrc, pathTraceShaderSrc);
        this.pathTraceShaderLowRes = this.loadShaders(vertexShaderSrc, pathTraceShaderLowResSrc);

        await Promise.all(this.programs.map(program => program.waitForLinkAsync()));

        this.pathTraceShader.use();
        let shaderObject = this.pathTraceShader.getObject();

        if (scene.envMap) {
            gl.uniform2f(gl.raw.getUniformLocation(shaderObject, "envMapRes"), scene.envMap.width, scene.envMap.height);
            gl.uniform1f(gl.raw.getUniformLocation(shaderObject, "envMapTotalSum"), scene.envMap.totalSum);
        }

        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "topBVHIndex"), scene.topLevelIndex);
        gl.uniform2f(gl.raw.getUniformLocation(shaderObject, "resolution"), this.renderSize.x, this.renderSize.y);
        gl.uniform2f(gl.raw.getUniformLocation(shaderObject, "invNumTiles"), this.invNumTiles.x, this.invNumTiles.y);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "numOfLights"), scene.numOfLights);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "accumTexture"), 0);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "BVH"), 1);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "vertexIndicesTex"), 2);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "verticesTex"), 3);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "normalsTex"), 4);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "materialsTex"), 5);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "transformsTex"), 6);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "lightsTex"), 7);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "textureMapsArrayTex"), 8);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "envMapTex"), 9);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "envMapCDFTex"), 10);
        this.pathTraceShader.stopUsing();

        this.pathTraceShaderLowRes.use();
        shaderObject = this.pathTraceShaderLowRes.getObject();

        if (scene.envMap) {
            gl.uniform2f(gl.raw.getUniformLocation(shaderObject, "envMapRes"), scene.envMap.width, scene.envMap.height);
            gl.uniform1f(gl.raw.getUniformLocation(shaderObject, "envMapTotalSum"), scene.envMap.totalSum);
        }

        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "topBVHIndex"), scene.topLevelIndex);
        gl.uniform2f(gl.raw.getUniformLocation(shaderObject, "resolution"), this.renderSize.x, this.renderSize.y);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "numOfLights"), scene.numOfLights);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "accumTexture"), 0);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "BVH"), 1);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "vertexIndicesTex"), 2);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "verticesTex"), 3);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "normalsTex"), 4);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "materialsTex"), 5);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "transformsTex"), 6);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "lightsTex"), 7);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "textureMapsArrayTex"), 8);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "envMapTex"), 9);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "envMapCDFTex"), 10);
        this.pathTraceShaderLowRes.stopUsing();
    }

    public render(): void {
        const gl = this.gl;

        if (!this.scene.dirty && this.scene.renderOptions.maxSpp !== -1 && this.sampleCounter >= this.scene.renderOptions.maxSpp) {
            return;
        }

        gl.activeTexture(gl.raw.TEXTURE0);

        if (this.scene.dirty) {
            gl.bindFramebuffer(gl.raw.FRAMEBUFFER, this.pathTraceFBOLowRes);
            gl.viewport(0, 0, Math.floor(this.windowSize.x * this.pixelRatio), Math.floor(this.windowSize.y * this.pixelRatio));
            this.quad.draw(this.pathTraceShaderLowRes!);

            this.scene.dirty = false;
            this.scene.envMapModified = false;
        } else {
            gl.bindFramebuffer(gl.raw.FRAMEBUFFER, this.pathTraceFBO);
            gl.viewport(0, 0, this.tileWidth, this.tileHeight);
            gl.bindTexture(gl.raw.TEXTURE_2D, this.accumTexture);
            this.quad.draw(this.pathTraceShader!);

            gl.bindFramebuffer(gl.raw.FRAMEBUFFER, this.accumFBO);
            gl.viewport(this.tileWidth * this.tile.x, this.tileHeight * this.tile.y, this.tileWidth, this.tileHeight);
            gl.bindTexture(gl.raw.TEXTURE_2D, this.pathTraceTexture);
            this.quad.draw(this.outputShader!);
        }

        gl.bindFramebuffer(gl.raw.FRAMEBUFFER, null);
    }

    public present(): void {
        const gl = this.gl;

        gl.activeTexture(gl.raw.TEXTURE0);

        if (this.scene.dirty || this.sampleCounter === 1) {
            gl.bindTexture(gl.raw.TEXTURE_2D, this.pathTraceTextureLowRes);
            this.quad.draw(this.tonemapShader!);
        } else {
            if (this.scene.renderOptions.enableDenoiser && this.denoiserExecutedOneTime)
                gl.bindTexture(gl.raw.TEXTURE_2D, this.denoiserTexture);
            else
                gl.bindTexture(gl.raw.TEXTURE_2D, this.tileOutputTexture[1 - this.currentBuffer]);
            this.quad.draw(this.outputShader!);
        }
    }

    public getProgress(): number {
        const maxSpp = this.scene.renderOptions.maxSpp;
        return maxSpp <= 0 ? 0.0 : (this.sampleCounter * 100.0) / maxSpp;
    }

    public getSampleCount(): number {
        return this.sampleCounter;
    }

    public exportTextureToImage(texture: WebGLTexture | null, width: number, height: number, filename: string): void {
        if (!texture) {
            return;
        }

        const gl = this.gl;

        const fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.raw.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.raw.FRAMEBUFFER, gl.raw.COLOR_ATTACHMENT0, gl.raw.TEXTURE_2D, texture, 0);

        if (gl.raw.checkFramebufferStatus(gl.raw.FRAMEBUFFER) !== gl.raw.FRAMEBUFFER_COMPLETE) {
            gl.bindFramebuffer(gl.raw.FRAMEBUFFER, null);
            gl.deleteFramebuffer(fbo);
            return;
        }

        const pixelsFloat = new Float32Array(width * height * 4);
        gl.raw.readPixels(0, 0, width, height, gl.raw.RGBA, gl.raw.FLOAT, pixelsFloat);

        const pixels = new Uint8Array(width * height * 4);
        for (let i = 0; i < pixelsFloat.length; i++) {
            pixels[i] = Math.min(255, Math.max(0, Math.floor(pixelsFloat[i] * 255)));
        }

        gl.bindFramebuffer(gl.raw.FRAMEBUFFER, null);
        gl.deleteFramebuffer(fbo);

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            return;
        }

        const imageData = ctx.createImageData(width, height);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const srcIdx = (y * width + x) * 4;
                const dstIdx = ((height - 1 - y) * width + x) * 4;
                imageData.data[dstIdx] = pixels[srcIdx];
                imageData.data[dstIdx + 1] = pixels[srcIdx + 1];
                imageData.data[dstIdx + 2] = pixels[srcIdx + 2];
                imageData.data[dstIdx + 3] = pixels[srcIdx + 3];
            }
        }

        ctx.putImageData(imageData, 0, 0);
        Context.document.getElementById(filename)?.appendChild(canvas);
    }

    public async updateAsync(_secondsElapsed: number, _secondsElapsedDelta: number): Promise<void> {
        const gl = this.gl;
        const scene = this.scene;

        if (!scene.dirty && scene.renderOptions.maxSpp !== -1 && this.sampleCounter >= scene.renderOptions.maxSpp) {
            return;
        }

        if (scene.envMapModified && scene.envMap) {
            if (this.envMapTex) {
                gl.bindTexture(gl.raw.TEXTURE_2D, this.envMapTex);
                gl.texImage2D(gl.raw.TEXTURE_2D, 0, gl.raw.RGB32F, scene.envMap.width, scene.envMap.height, 0, gl.raw.RGB, gl.raw.FLOAT, scene.envMap.img);
            }
            if (this.envMapCDFTex) {
                gl.bindTexture(gl.raw.TEXTURE_2D, this.envMapCDFTex);
                gl.texImage2D(gl.raw.TEXTURE_2D, 0, gl.raw.R32F, scene.envMap.width, scene.envMap.height, 0, gl.raw.RED, gl.raw.FLOAT, scene.envMap.cdf);
            }

            if (this.pathTraceShader && this.pathTraceShaderLowRes) {
                this.pathTraceShader.use();
                let shaderObject = this.pathTraceShader.getObject();
                gl.uniform2f(gl.raw.getUniformLocation(shaderObject, "envMapRes"), scene.envMap.width, scene.envMap.height);
                gl.uniform1f(gl.raw.getUniformLocation(shaderObject, "envMapTotalSum"), scene.envMap.totalSum);
                this.pathTraceShader.stopUsing();

                this.pathTraceShaderLowRes.use();
                shaderObject = this.pathTraceShaderLowRes.getObject();
                gl.uniform2f(gl.raw.getUniformLocation(shaderObject, "envMapRes"), scene.envMap.width, scene.envMap.height);
                gl.uniform1f(gl.raw.getUniformLocation(shaderObject, "envMapTotalSum"), scene.envMap.totalSum);
                this.pathTraceShaderLowRes.stopUsing();
            }
        }

        if (scene.renderOptions.enableDenoiser && this.sampleCounter > 1)
        {
            if (!this.denoised || (this.frameCounter % (scene.renderOptions.denoiserFrameCnt * (this.numTiles.x * this.numTiles.y)) == 0))
            {
                if (this.denoiserInputFramePtr === null || this.denoiserInputFramePtr.length !== this._renderSize.x * this._renderSize.y * 4) {
                  this.denoiserInputFramePtr = new Float32Array(this._renderSize.x * this._renderSize.y * 4); // RGBA
                }

                gl.bindFramebuffer(gl.raw.FRAMEBUFFER, this.denoiserFBO);
                gl.bindTexture(gl.raw.TEXTURE_2D, this.tileOutputTexture[1 - this.currentBuffer]);
                gl.raw.readPixels(0, 0, this._renderSize.x, this._renderSize.y, gl.raw.RGBA, gl.raw.FLOAT, this.denoiserInputFramePtr);

                // clamp values to [0, 1] range to avoid issues with the denoiser
                for (let i = 0; i < this.denoiserInputFramePtr.length; i++) {
                  this.denoiserInputFramePtr[i] = Math.min(Math.max(this.denoiserInputFramePtr[i], 0), 1);
                }

                this.denoised = true;

                this.denoiser.width = this._renderSize.x;
                this.denoiser.height = this._renderSize.y;

                await this.denoiser.setInputData("color", this.denoiserInputFramePtr);
                await this.denoiser.execute(); 
            }
        }
        else
            this.denoised = false;

        if (scene.dirty) {
            if (GL.profiling) {
                ["bufferA", "bufferB", "bufferC", "bufferD", "image"].forEach(id => Context.document.getElementById(id)?.replaceChildren());
            }

            this.tile.x = -1;
            this.tile.y = this.numTiles.y - 1;
            this.sampleCounter = 1;
            this.denoised = false;
            this.frameCounter = 1;

            if (scene.renderOptions.enableDenoiser) {
                this.denoiser.abort();
                this.denoiserExecutedOneTime = false;
                this.denoised = false;
            }

            if (this.accumFBO) {
                gl.bindFramebuffer(gl.raw.FRAMEBUFFER, this.accumFBO);
                gl.clear(gl.raw.COLOR_BUFFER_BIT);
                gl.bindFramebuffer(gl.raw.FRAMEBUFFER, null);
            }
        } else {
            this.frameCounter++;
            this.tile.x++;
            if (this.tile.x >= this.numTiles.x) {
                this.tile.x = 0;
                this.tile.y--;
                if (this.tile.y < 0) {
                    this.tile.x = 0;
                    this.tile.y = this.numTiles.y - 1;
                    this.sampleCounter++;
                    this.currentBuffer = 1 - this.currentBuffer;
                }
            }
        }

        this.pathTraceShader!.use();
        let shaderObject = this.pathTraceShader!.getObject();
        gl.uniform3f(gl.raw.getUniformLocation(shaderObject, "camera.position"), scene.camera.position.x, scene.camera.position.y, scene.camera.position.z);
        gl.uniform3f(gl.raw.getUniformLocation(shaderObject, "camera.right"), scene.camera.right.x, scene.camera.right.y, scene.camera.right.z);
        gl.uniform3f(gl.raw.getUniformLocation(shaderObject, "camera.up"), scene.camera.up.x, scene.camera.up.y, scene.camera.up.z);
        gl.uniform3f(gl.raw.getUniformLocation(shaderObject, "camera.forward"), scene.camera.forward.x, scene.camera.forward.y, scene.camera.forward.z);
        gl.uniform1f(gl.raw.getUniformLocation(shaderObject, "camera.fov"), scene.camera.fov);
        gl.uniform1f(gl.raw.getUniformLocation(shaderObject, "camera.focalDist"), scene.camera.focalDist);
        gl.uniform1f(gl.raw.getUniformLocation(shaderObject, "camera.aperture"), scene.camera.aperture);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "enableEnvMap"), (scene.envMap === null ? false : scene.renderOptions.enableEnvMap) ? 1 : 0);
        gl.uniform1f(gl.raw.getUniformLocation(shaderObject, "envMapIntensity"), scene.renderOptions.envMapIntensity);
        gl.uniform1f(gl.raw.getUniformLocation(shaderObject, "envMapRot"), scene.renderOptions.envMapRot / 360.0);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "maxDepth"), scene.dirty ? 2 : scene.renderOptions.maxDepth);
        gl.uniform2f(gl.raw.getUniformLocation(shaderObject, "tileOffset"), this.tile.x * this.invNumTiles.x, this.tile.y * this.invNumTiles.y);
        gl.uniform3f(gl.raw.getUniformLocation(shaderObject, "uniformLightCol"), scene.renderOptions.uniformLightCol.x, scene.renderOptions.uniformLightCol.y, scene.renderOptions.uniformLightCol.z);
        gl.uniform1f(gl.raw.getUniformLocation(shaderObject, "roughnessMollificationAmt"), scene.renderOptions.roughnessMollificationAmt);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "frameNum"), this.frameCounter);
        this.pathTraceShader!.stopUsing();

        this.pathTraceShaderLowRes!.use();
        shaderObject = this.pathTraceShaderLowRes!.getObject();
        gl.uniform3f(gl.raw.getUniformLocation(shaderObject, "camera.position"), scene.camera.position.x, scene.camera.position.y, scene.camera.position.z);
        gl.uniform3f(gl.raw.getUniformLocation(shaderObject, "camera.right"), scene.camera.right.x, scene.camera.right.y, scene.camera.right.z);
        gl.uniform3f(gl.raw.getUniformLocation(shaderObject, "camera.up"), scene.camera.up.x, scene.camera.up.y, scene.camera.up.z);
        gl.uniform3f(gl.raw.getUniformLocation(shaderObject, "camera.forward"), scene.camera.forward.x, scene.camera.forward.y, scene.camera.forward.z);
        gl.uniform1f(gl.raw.getUniformLocation(shaderObject, "camera.fov"), scene.camera.fov);
        gl.uniform1f(gl.raw.getUniformLocation(shaderObject, "camera.focalDist"), scene.camera.focalDist);
        gl.uniform1f(gl.raw.getUniformLocation(shaderObject, "camera.aperture"), scene.camera.aperture);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "enableEnvMap"), (scene.envMap === null ? false : scene.renderOptions.enableEnvMap) ? 1 : 0);
        gl.uniform1f(gl.raw.getUniformLocation(shaderObject, "envMapIntensity"), scene.renderOptions.envMapIntensity);
        gl.uniform1f(gl.raw.getUniformLocation(shaderObject, "envMapRot"), scene.renderOptions.envMapRot / 360.0);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "maxDepth"), scene.renderOptions.maxDepth);
        gl.uniform3f(gl.raw.getUniformLocation(shaderObject, "uniformLightCol"), scene.renderOptions.uniformLightCol.x, scene.renderOptions.uniformLightCol.y, scene.renderOptions.uniformLightCol.z);
        gl.uniform1f(gl.raw.getUniformLocation(shaderObject, "roughnessMollificationAmt"), scene.renderOptions.roughnessMollificationAmt);
        this.pathTraceShaderLowRes!.stopUsing();

        this.tonemapShader!.use();
        shaderObject = this.tonemapShader!.getObject();
        gl.uniform1f(gl.raw.getUniformLocation(shaderObject, "invSampleCounter"), 1.0 / this.sampleCounter);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "enableTonemap"), scene.renderOptions.enableTonemap ? 1 : 0);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "enableAces"), scene.renderOptions.enableAces ? 1 : 0);
        gl.uniform1i(gl.raw.getUniformLocation(shaderObject, "simpleAcesFit"), scene.renderOptions.simpleAcesFit ? 1 : 0);
        gl.uniform3f(gl.raw.getUniformLocation(shaderObject, "backgroundCol"), scene.renderOptions.backgroundCol.x, scene.renderOptions.backgroundCol.y, scene.renderOptions.backgroundCol.z);
        this.tonemapShader!.stopUsing();
    }
}
