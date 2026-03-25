import { Vec3 } from "./vec3.js";
export class Vec4 {
    x;
    y;
    z;
    w;
    constructor(x = 0, y = 0, z = 0, w = 0) {
        if (x instanceof Vec3) {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
            this.w = y;
        }
        else {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
    }
    get(i) {
        switch (i) {
            case 0:
                return this.x;
            case 1:
                return this.y;
            case 2:
                return this.z;
            case 3:
                return this.w;
            default:
                throw new RangeError("Index out of range for Vec4");
        }
    }
    get xyz() {
        return new Vec3(this.x, this.y, this.z);
    }
    get wxy() {
        return new Vec3(this.w, this.x, this.y);
    }
    toString() {
        return `Vec4(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
    }
}
//# sourceMappingURL=vec4.js.map