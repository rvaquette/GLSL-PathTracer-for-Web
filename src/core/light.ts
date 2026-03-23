import { Vec3 } from "../math/vec3.js";

export enum LightType {
    RectLight = 0,
    SphereLight = 1,
    DistantLight = 2
}

export class Light {
    position: Vec3;
    emission: Vec3;
    u: Vec3;
    v: Vec3;
    radius: number;
    area: number;
    type: LightType;

    constructor() {
        this.position = new Vec3();
        this.emission = new Vec3();
        this.u = new Vec3();
        this.v = new Vec3();
        this.radius = 0.0;
        this.area = 0.0;
        this.type = LightType.RectLight;
    }
}