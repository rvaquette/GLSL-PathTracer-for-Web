import { GL } from './GL.js';
import { ImGui } from "../gui/imGui.js";
export class Context {
    static _instance = null;
    document;
    canvas;
    gl;
    constructor(document, canvas) {
        this.document = document;
        this.canvas = canvas;
        this.canvas.tabIndex = 0; // make it react to keyboard
        var opts = { alpha: false,
            depth: false,
            stencil: false,
            premultipliedAlpha: false,
            antialias: false,
            preserveDrawingBuffer: true,
            powerPreference: "high-performance" };
        const rawGL = canvas.getContext('webgl2', opts);
        if (!rawGL)
            throw new Error('WebGL2 not supported');
        this.gl = new GL(rawGL);
        this.gl.getExtension('OES_texture_float_linear');
        this.gl.getExtension('EXT_color_buffer_float');
        this.gl.getExtension('OES_texture_half_float_linear');
        if (GL.profiling)
            this.gl.getExtension('WEBGL_debug_shaders');
        this.gl.raw.hint(this.gl.raw.FRAGMENT_SHADER_DERIVATIVE_HINT, this.gl.raw.NICEST);
        const available_extensions = rawGL.getSupportedExtensions();
        console.log('Available WebGL extensions:\n', available_extensions.join('\n'));
        window.addEventListener("resize", async (event) => {
            //await Main.instance.resizeAsync(window.innerWidth, window.innerHeight);
        });
        this.canvas.addEventListener("keydown", async (event) => {
            ImGui.keydown(event);
            event.preventDefault();
        }, false);
        this.canvas.addEventListener("keyup", async (event) => {
            ImGui.keyup(event);
            event.preventDefault();
        }, false);
        this.canvas.onmousedown = function (event) {
            ImGui.mouseDown(event);
        };
        this.canvas.onmouseenter = function (event) {
            ImGui.mouseEnter();
        };
        this.canvas.onmouseleave = function (event) {
            ImGui.mouseLeave();
        };
        this.canvas.onmousemove = function (event) {
            ImGui.mouseMove(event);
        };
        this.canvas.onmouseup = function (event) {
            ImGui.mouseUp();
        };
        this.canvas.onwheel = function (event) {
            ImGui.mouseWheel(event);
        };
        this.canvas.ontouchstart = function (event) {
            ImGui.touchStart(event);
        };
        this.canvas.ontouchmove = function (event) {
            ImGui.touchMove(event);
        };
        this.canvas.ontouchcancel = function (event) {
            ImGui.touchCancel(event);
        };
    }
    static get document() {
        if (Context._instance == null) {
            return null;
        }
        return Context._instance.document;
    }
    static get canvas() {
        if (Context._instance == null) {
            return null;
        }
        return Context._instance.canvas;
    }
    static get gl() {
        if (Context._instance == null) {
            return null;
        }
        return Context._instance.gl;
    }
    static setInstance(document, canvas) {
        Context._instance = new Context(document, canvas);
    }
}
//# sourceMappingURL=context.js.map