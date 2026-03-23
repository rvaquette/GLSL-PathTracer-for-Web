import { Vec3 } from "./vec3.js";

export class Mat4 {
    data: number[][];

    constructor(
        m00: number = 1, m01: number = 0, m02: number = 0, m03: number = 0,
        m10: number = 0, m11: number = 1, m12: number = 0, m13: number = 0,
        m20: number = 0, m21: number = 0, m22: number = 1, m23: number = 0,
        m30: number = 0, m31: number = 0, m32: number = 0, m33: number = 1
    ) {
        this.data = [
            [m00, m01, m02, m03],
            [m10, m11, m12, m13],
            [m20, m21, m22, m23],
            [m30, m31, m32, m33]
        ];
    }
    /**
     * @param {Vec3} a
     * @return {Mat4}
     */
    static Translate(a: Vec3): Mat4 {
        const out = new Mat4();
        out.data[3][0] = a.x;
        out.data[3][1] = a.y;
        out.data[3][2] = a.z;
        return out;
    }

    /**
     * @param {Vec3} a
     * @return {Mat4}
     */
    static Scale(a: Vec3): Mat4 {
        const out = new Mat4();
        out.data[0][0] = a.x;
        out.data[1][1] = a.y;
        out.data[2][2] = a.z;
        return out;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} w
     * @return {Mat4}
     */
    static QuatToMatrix(x: number, y: number, z: number, w: number): Mat4 {
        const out = new Mat4();

        const x2 = x + x;
        const y2 = y + y;
        const z2 = z + z;

        const xx = x * x2;
        const xy = x * y2;
        const xz = x * z2;

        const yy = y * y2;
        const yz = y * z2;
        const zz = z * z2;

        const wx = w * x2;
        const wy = w * y2;
        const wz = w * z2;

        out.data[0][0] = 1.0 - (yy + zz);
        out.data[0][1] = xy + wz;
        out.data[0][2] = xz - wy;
        out.data[0][3] = 0.0;

        out.data[1][0] = xy - wz;
        out.data[1][1] = 1.0 - (xx + zz);
        out.data[1][2] = yz + wx;
        out.data[1][3] = 0.0;

        out.data[2][0] = xz + wy;
        out.data[2][1] = yz - wx;
        out.data[2][2] = 1.0 - (xx + yy);
        out.data[2][3] = 0.0;

        out.data[3][0] = 0;
        out.data[3][1] = 0;
        out.data[3][2] = 0;
        out.data[3][3] = 1.0;

        return out;
    }

    /**
     * @param {Mat4} b
     * @return {Mat4}
     */
    multiply(b: Mat4): Mat4 {
        const out = new Mat4();
        for (let i = 0; i < 4; ++i) {
            for (let j = 0; j < 4; ++j) {
                out.data[i][j] = 0;
                for (let k = 0; k < 4; ++k) {
                    out.data[i][j] += this.data[i][k] * b.data[k][j];
                }
            }
        }
        return out;
    }

    // Optional: for easier access like mat[0][1]
    get(i: number): number[] {
        return this.data[i];
    }

    decompose(): { translation: Vec3, scale: Vec3, rotation: Vec3 } {
        const translation = new Vec3(this.data[3][0], this.data[3][1], this.data[3][2]);

        const scale = new Vec3(
            Math.sqrt(this.data[0][0] * this.data[0][0] + this.data[0][1] * this.data[0][1] + this.data[0][2] * this.data[0][2]),
            Math.sqrt(this.data[1][0] * this.data[1][0] + this.data[1][1] * this.data[1][1] + this.data[1][2] * this.data[1][2]),
            Math.sqrt(this.data[2][0] * this.data[2][0] + this.data[2][1] * this.data[2][1] + this.data[2][2] * this.data[2][2])
        );

        // Normalize the rotation matrix
        const rotation = new Vec3(
            (this.data[0][0] / scale.x),
            (this.data[1][1] / scale.y),
            (this.data[2][2] / scale.z)
        );

        return { translation, scale, rotation };
    }

    static fromDecomposed(translation: Vec3, scale: Vec3, rotation: Vec3): Mat4 {
        const rotationMatrix = Mat4.QuatToMatrix(rotation.x, rotation.y, rotation.z, 1); // Assuming w=1 for simplicity
        const scaleMatrix = Mat4.Scale(scale);
        const translationMatrix = Mat4.Translate(translation);

        return translationMatrix.multiply(scaleMatrix).multiply(rotationMatrix);
    }
}