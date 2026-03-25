import { Vec2 } from "../math/vec2.js";
import { Vec3 } from "../math/vec3.js";

export class RenderOptions {
    renderResolution: Vec2;
    windowResolution: Vec2;
    uniformLightCol: Vec3;
    backgroundCol: Vec3;
    tileWidth: number;
    tileHeight: number;
    maxDepth: number;
    maxSpp: number;
    RRDepth: number;
    texArrayWidth: number;
    texArrayHeight: number;
    denoiserFrameCnt: number;
    enableRR: boolean;
    enableDenoiser: boolean;
    enableTonemap: boolean;
    enableAces: boolean;
    simpleAcesFit: boolean;
    openglNormalMap: boolean;
    enableEnvMap: boolean;
    enableUniformLight: boolean;
    hideEmitters: boolean;
    enableBackground: boolean;
    transparentBackground: boolean;
    independentRenderSize: boolean;
    enableRoughnessMollification: boolean;
    enableVolumeMIS: boolean;
    envMapIntensity: number;
    envMapRot: number;
    roughnessMollificationAmt: number;
    pixelRatio: number;

    flipTexturesY: boolean = false;
    useRayMarching: boolean = false;

    constructor() {
        this.renderResolution = new Vec2(1280, 720);
        this.windowResolution = new Vec2(1280, 720);
        this.uniformLightCol = new Vec3(0.3, 0.3, 0.3);
        this.backgroundCol = new Vec3(1.0, 1.0, 1.0);
        this.tileWidth = 100;
        this.tileHeight = 100;
        this.maxDepth = 2;
        this.maxSpp = -1;
        this.RRDepth = 2;
        this.texArrayWidth = 2048;
        this.texArrayHeight = 2048;
        this.enableRR = true;
        this.enableDenoiser = false;
        this.denoiserFrameCnt = 10;
        this.enableTonemap = true;
        this.enableAces = false;
        this.simpleAcesFit = false;
        this.openglNormalMap = true;
        this.enableEnvMap = false;
        this.enableUniformLight = false;
        this.hideEmitters = false;
        this.enableBackground = false;
        this.transparentBackground = false;
        this.independentRenderSize = false;
        this.enableRoughnessMollification = false;
        this.enableVolumeMIS = false;
        this.envMapIntensity = 1.0;
        this.envMapRot = 0.0;
        this.roughnessMollificationAmt = 0.0;
        this.pixelRatio = 0.25;
    }
}
