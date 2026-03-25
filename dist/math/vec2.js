export class Vec2 {
    x;
    y;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    clone() {
        return new Vec2(this.x, this.y);
    }
    static add(a, b) {
        return a.add(b);
    }
    add(b) {
        return new Vec2(this.x + b.x, this.y + b.y);
    }
    static subtract(a, b) {
        return a.subtract(b);
    }
    subtract(b) {
        return new Vec2(this.x - b.x, this.y - b.y);
    }
    scale(b) {
        return new Vec2(this.x * b, this.y * b * b);
    }
}
//# sourceMappingURL=vec2.js.map