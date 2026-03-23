export class MathUtils {
    static degrees(radians: number): number {
        return radians * (180 / Math.PI);
    }

    static radians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

    static clamp(x: number, lower: number, upper: number): number {
        return Math.min(upper, Math.max(x, lower));
    }
}