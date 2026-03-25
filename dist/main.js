import { Context } from "./core/context.js";
import { Renderer } from "./core/renderer.js";
import { RenderOptions } from "./core/renderOptions.js";
import { Scene } from "./core/scene.js";
import { ImGui } from "./gui/imGui.js";
import { GLBench } from "./external/gl-bench/index.js";
import { Controls } from "./gui/controls.js";
import { loadFile } from "./utilities/fsLoader.js";
import { loadSceneFromJsonAsync } from "./loaders/scene/sceneLoader.js";
export class Main {
    static _instance = null;
    stopped;
    working;
    static get instance() {
        if (!Main._instance) {
            Main._instance = new Main();
        }
        return Main._instance;
    }
    scenes = [];
    sceneConfigs = [];
    envMaps = [];
    envMapIdx = 0;
    mouseSensitivity = 0.01;
    scene = null;
    _renderer = null;
    renderOptions = new RenderOptions();
    lastTime;
    firstTime;
    bench = null;
    optionsChanged = false;
    reloadShaders = false;
    constructor() {
        this.lastTime = performance.now();
    }
    get renderer() {
        return this._renderer;
    }
    get currentScene() {
        return this.scene;
    }
    static getExt(filename) {
        if (filename.indexOf(".") === -1)
            return "";
        const parts = filename.split(".");
        return parts[parts.length - 1].toLowerCase();
    }
    async getSceneFilesAsync() {
        try {
            let path = window.location.pathname;
            const response = await loadFile("/scenes.json");
            const data = await response.json();
            if (!Array.isArray(data)) {
                this.sceneConfigs = [];
                this.scenes = [];
                return;
            }
            this.sceneConfigs = data;
            this.scenes = this.sceneConfigs.map((entry) => entry.scene);
        }
        catch (err) {
            console.error("Error fetching scene files:", err);
            this.sceneConfigs = [];
            this.scenes = [];
        }
    }
    async getEnvMapsAsync() {
        try {
            let response = await loadFile("/envmaps.json");
            this.envMaps = await response.json();
        }
        catch (err) {
            console.error("Error fetching envMaps files:", err);
        }
    }
    async loadSceneAsync(sceneName, flipTexturesY = false, useRayMarching = false, callback = null) {
        // @ts-ignore
        if (this._scene) {
            this.scene.dispose();
            this.scene = null;
        }
        if (typeof window !== "undefined") {
            if (typeof window.setSceneName === 'function') {
                window.setSceneName(sceneName);
            }
        }
        this.scene = new Scene(sceneName);
        this.renderOptions.flipTexturesY = flipTexturesY;
        this.renderOptions.useRayMarching = useRayMarching;
        let success = await loadSceneFromJsonAsync(sceneName, this.scene, this.renderOptions);
        if (!success) {
            console.error("Unable to load scene");
            //alert("Unable to load scene: " + sceneName);
            return false;
        }
        if (this.scene.envMap === null && this.envMaps.length > 0 && this.scene.numOfLights === 0) {
            await this.scene.addEnvMapAsync(`HDR/${this.envMaps[this.envMapIdx]}`);
            this.renderOptions.enableEnvMap = true;
            this.renderOptions.envMapIntensity = 1.5;
        }
        // @ts-ignore
        this.scene.renderOptions = this.renderOptions;
        this.resizeCanvas(this.renderOptions.windowResolution.x, this.renderOptions.windowResolution.y);
        return true;
    }
    async initRendererAsync() {
        if (!this.scene) {
            console.error("Scene not loaded");
            return false;
        }
        // @ts-ignore
        if (this._renderer)
            this._renderer.dispose();
        this._renderer = new Renderer();
        await this.renderer.initAsync(this.scene);
        return true;
    }
    render() {
        const gl = Context.gl;
        this.renderer.render();
        gl.bindFramebuffer(gl.raw.FRAMEBUFFER, null);
        gl.viewport(0, 0, this.renderOptions.windowResolution.x, this.renderOptions.windowResolution.y);
        this.renderer.present();
    }
    async updateAsync(secondsElapsed, secondsElapsedDelta) {
        let keyPressed = false;
        if (ImGui.isAnyMouseDown()) {
            if (ImGui.isMouseDown(0)) {
                const mouseDelta = ImGui.getMouseDragDelta(0);
                this.scene.camera.offsetOrientation(mouseDelta.x, mouseDelta.y);
                ImGui.resetMouseDragDelta(0);
            }
            else if (ImGui.isMouseDown(1)) {
                const mouseDelta = ImGui.getMouseDragDelta(1);
                this.scene.camera.setRadius(this.mouseSensitivity * mouseDelta.y);
                ImGui.resetMouseDragDelta(1);
            }
            else if (ImGui.isMouseDown(2)) {
                const mouseDelta = ImGui.getMouseDragDelta(2);
                this.scene.camera.strafe(this.mouseSensitivity * mouseDelta.x, this.mouseSensitivity * mouseDelta.y);
                ImGui.resetMouseDragDelta(2);
            }
            if (this.scene) {
                this.scene.dirty = true;
            }
        }
        await this.renderer.updateAsync(secondsElapsed, secondsElapsedDelta);
    }
    resizeCanvas(width, height) {
        const canvas = Context.canvas;
        if (canvas == null)
            return;
        canvas.width = width;
        canvas.style.width = width + "px";
        canvas.height = height;
        canvas.style.height = height + "px";
    }
    async resizeAsync(width, height) {
        this.resizeCanvas(width, height);
        this.renderOptions.windowResolution.x = width;
        this.renderOptions.windowResolution.y = height;
        if (!this.renderOptions.independentRenderSize) {
            this.renderOptions.renderResolution = this.renderOptions.windowResolution;
        }
        this.scene.renderOptions = this.renderOptions;
        await this.renderer.resizeRendererAsync();
    }
    async mainLoopAsync(now) {
        const gl = Context.gl;
        this.working = true;
        if (this.optionsChanged) {
            this.optionsChanged = false;
            this.scene.dirty = true;
            this.firstTime = now;
        }
        if (this.reloadShaders) {
            this.reloadShaders = false;
            this.scene.dirty = true;
            this.firstTime = now;
            await this.renderer.reloadShadersAsync();
        }
        this.bench?.begin("mainLoop");
        const presentTime = now;
        if (this.firstTime === undefined) {
            this.firstTime = presentTime;
        }
        const secondsElapsed = (presentTime - this.firstTime) / 1000;
        const secondsElapsedDelta = (presentTime - this.lastTime) / 1000;
        this.lastTime = presentTime;
        await this.updateAsync(secondsElapsed, secondsElapsedDelta);
        gl.clearColor(0., 0., 0., 0.);
        gl.clear(gl.raw.COLOR_BUFFER_BIT | gl.raw.DEPTH_BUFFER_BIT);
        gl.disable(gl.raw.DEPTH_TEST);
        this.render();
        this.bench?.end("mainLoop");
        this.bench?.nextFrame(now);
        this.working = false;
        if (!this.stopped) {
            requestAnimationFrame((now) => {
                if (this.stopped)
                    return;
                this.mainLoopAsync(now);
            });
        }
    }
    async startSceneAsync(sceneName) {
        this.pauseOrContinue(true);
        while (this.working) {
            await new Promise(resolve => setTimeout(resolve, 100)); // Wait for the scene to be ready
        }
        const textures = Context.document.getElementById("textures");
        textures?.replaceChildren();
        if (!await this.loadSceneAsync(sceneName, this.renderOptions.flipTexturesY, this.renderOptions.useRayMarching)) {
            return;
        }
        if (!await this.initRendererAsync()) {
            return;
        }
        Controls.build(this);
        if (typeof window.loadAllShaders === 'function') {
            window.loadAllShaders({ image: "" });
        }
        this.pauseOrContinue();
    }
    pauseOrContinue(forceStopped = false) {
        this.stopped = !this.stopped || forceStopped;
        this.renderer?.pauseOrContinue(this.stopped);
        ImGui.pauseOrContinue(this.stopped);
        if (!this.stopped) {
            requestAnimationFrame(async (now) => {
                if (this.stopped)
                    return;
                await this.mainLoopAsync(now);
            });
        }
        return this.stopped;
    }
    async runAsync(config) {
        Context.setInstance(config.document, config.canvas);
        //this.bench = new GLBench(Context.gl.raw, { trackGPU: true });
        this.bench = new GLBench(Context.gl.raw, {
            trackGPU: true,
            paramLogger: (i, cpu, gpu, mem, fps, totalTime, frameId) => {
            }
        });
        await this.getSceneFilesAsync();
        await this.getEnvMapsAsync();
        if (config.scene == '' || config.scene === null) {
            config.scene = this.scenes.length > 0 ? this.scenes[0] : null;
        }
        if (config.scene !== null && config.scene !== "") {
            await this.startSceneAsync(config.scene);
        }
        console.log();
    }
}
//# sourceMappingURL=main.js.map