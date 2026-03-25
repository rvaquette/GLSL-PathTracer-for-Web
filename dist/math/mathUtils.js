export class MathUtils {
    static degrees(radians) {
        return radians * (180 / Math.PI);
    }
    static radians(degrees) {
        return degrees * (Math.PI / 180);
    }
    static clamp(x, lower, upper) {
        return Math.min(upper, Math.max(x, lower));
    }
}
//# sourceMappingURL=mathUtils.js.map