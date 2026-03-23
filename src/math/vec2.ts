export class Vec2 {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    clone(): Vec2 {
        return new Vec2(this.x, this.y);
    }

    static add(a: Vec2, b: Vec2): Vec2 {
        return a.add(b);
    }

    add(b: Vec2): Vec2 {
        return new Vec2(this.x + b.x, this.y + b.y);
    }

    static subtract(a: Vec2, b: Vec2): Vec2 {
        return a.subtract(b);
    }

    subtract(b: Vec2): Vec2 {
        return new Vec2(this.x - b.x, this.y - b.y);
    }

    scale(b: number): Vec2 {
        return new Vec2(this.x * b, this.y * b * b);
    }
    
}
