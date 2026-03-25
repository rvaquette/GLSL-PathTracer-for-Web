import { Vec3 } from "../math/vec3.js";
/**
 * @param left
 * @param right
 * @param bottom
 * @param top
 * @param znear
 * @param zfar
 * @param m16
 */
function frustum(left, right, bottom, top, znear, zfar, m16) {
    const temp = 2.0 * znear;
    const temp2 = right - left;
    const temp3 = top - bottom;
    const temp4 = zfar - znear;
    m16[0] = temp / temp2;
    m16[1] = 0.0;
    m16[2] = 0.0;
    m16[3] = 0.0;
    m16[4] = 0.0;
    m16[5] = temp / temp3;
    m16[6] = 0.0;
    m16[7] = 0.0;
    m16[8] = (right + left) / temp2;
    m16[9] = (top + bottom) / temp3;
    m16[10] = (-zfar - znear) / temp4;
    m16[11] = -1.0;
    m16[12] = 0.0;
    m16[13] = 0.0;
    m16[14] = (-temp * zfar) / temp4;
    m16[15] = 0.0;
}
function perspective(fovyInDegrees, aspectRatio, znear, zfar, m16) {
    const ymax = znear * Math.tan(fovyInDegrees * Math.PI / 180.0);
    const xmax = ymax * aspectRatio;
    frustum(-xmax, xmax, -ymax, ymax, znear, zfar, m16);
}
function normalize(a) {
    const len = 1.0 / (Vec3.Length(a) + 1e-7);
    return a.scale(1 / len);
}
function lookAt(eye, at, up, m16) {
    let Z = normalize(eye.subtract(at));
    let X = normalize(Vec3.cross(up, Z));
    let Y = Vec3.cross(Z, X);
    m16[0] = X.x;
    m16[1] = Y.x;
    m16[2] = Z.x;
    m16[3] = 0.0;
    m16[4] = X.y;
    m16[5] = Y.y;
    m16[6] = Z.y;
    m16[7] = 0.0;
    m16[8] = X.z;
    m16[9] = Y.z;
    m16[10] = Z.z;
    m16[11] = 0.0;
    m16[12] = -Vec3.dot(X, eye);
    m16[13] = -Vec3.dot(Y, eye);
    m16[14] = -Vec3.dot(Z, eye);
    m16[15] = 1.0;
}
export class Camera {
    position;
    pivot;
    worldUp;
    pitch;
    yaw;
    radius;
    fov;
    focalDist;
    aperture;
    isMoving = false;
    forward = new Vec3(0, 0, 0);
    right = new Vec3(0, 0, 0);
    up = new Vec3(0, 0, 0);
    constructor(eye, lookat, fov) {
        this.position = eye.clone();
        this.pivot = lookat.clone();
        this.worldUp = new Vec3(0, 1, 0);
        const dir = Vec3.normalize(this.pivot.subtract(this.position));
        this.pitch = Math.asin(dir.y) * 180 / Math.PI;
        this.yaw = Math.atan2(dir.z, dir.x) * 180 / Math.PI;
        this.radius = Vec3.distance(eye, lookat);
        this.fov = fov * Math.PI / 180;
        this.focalDist = 0.1;
        this.aperture = 0.0;
        this.updateCamera();
    }
    clone() {
        const c = new Camera(this.position, this.pivot, this.fov * 180 / Math.PI);
        c.pitch = this.pitch;
        c.yaw = this.yaw;
        c.radius = this.radius;
        c.focalDist = this.focalDist;
        c.aperture = this.aperture;
        c.isMoving = this.isMoving;
        c.forward = this.forward.clone();
        c.right = this.right.clone();
        c.up = this.up.clone();
        return c;
    }
    offsetOrientation(dx, dy) {
        this.pitch -= dy;
        this.yaw += dx;
        this.updateCamera();
    }
    strafe(dx, dy) {
        const translation = this.right.scale(-dx).add(this.up.scale(dy));
        this.pivot = this.pivot.add(translation);
        this.updateCamera();
    }
    setRadius(dr) {
        this.radius += dr;
        this.updateCamera();
    }
    setFov(val) {
        this.fov = val * Math.PI / 180;
    }
    updateCamera() {
        const radYaw = this.yaw * Math.PI / 180;
        const radPitch = this.pitch * Math.PI / 180;
        const forwardTemp = new Vec3(Math.cos(radYaw) * Math.cos(radPitch), Math.sin(radPitch), Math.sin(radYaw) * Math.cos(radPitch));
        this.forward = Vec3.normalize(forwardTemp);
        this.position = this.pivot.add(this.forward.scale(-this.radius));
        this.right = Vec3.normalize(Vec3.cross(this.forward, this.worldUp));
        this.up = Vec3.normalize(Vec3.cross(this.right, this.forward));
    }
    computeViewProjectionMatrix(view, projection, ratio) {
        const at = this.position.add(this.forward);
        lookAt(this.position, at, this.up, view);
        const fov_v = (1.0 / ratio) * Math.tan(this.fov / 2.0);
        perspective(fov_v * 180 / Math.PI, ratio, 0.1, 1000.0, projection);
    }
}
//# sourceMappingURL=camera.js.map