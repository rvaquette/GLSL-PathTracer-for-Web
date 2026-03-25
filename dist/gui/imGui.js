import { Context } from "../core/context.js";
import { Main } from "../main.js";
import { Vec2 } from "../math/vec2.js";
export class ImGui {
    static _isMouseDown = false;
    static _isMouseOver = false;
    static _isMouseWheel = false;
    static _escapePressed = false;
    static _paused = false;
    static buttons = 0;
    static downPosition = new Vec2(0, 0);
    static movePosition = new Vec2(0, 0);
    static deltaPosition = new Vec2(0, 0);
    static pauseOrContinue(paused) {
        ImGui._paused = paused;
    }
    static isMouseDown(buttons) {
        if (ImGui._paused)
            return false;
        if (buttons === 2) {
            return ImGui._isMouseDown && (ImGui.buttons & 4) !== 0;
        }
        return ImGui._isMouseDown && (ImGui.buttons & (buttons + 1)) !== 0;
    }
    static keydown(event) {
        if (ImGui._paused)
            return;
        if (event.key === "Escape") {
            Main.instance.pauseOrContinue();
        }
    }
    static keyup(event) {
        if (ImGui._paused)
            return;
    }
    static mouseEnter() {
        if (ImGui._paused)
            return;
        ImGui._isMouseOver = true;
    }
    static mouseLeave() {
        if (ImGui._paused)
            return;
        ImGui._isMouseOver = false;
    }
    static mouseDown(event) {
        if (ImGui._paused)
            return;
        ImGui._isMouseDown = true;
        ImGui.buttons = event.buttons;
        ImGui.downPosition = new Vec2(event.offsetX, Context.canvas.height - event.offsetY);
    }
    static touchStart(event) {
        if (ImGui._paused)
            return;
        ImGui._isMouseDown = true;
        ImGui.buttons = 1; // Assuming touch is equivalent to left mouse button
        ImGui.downPosition = new Vec2(event.changedTouches[0].screenX, Context.canvas.height - event.changedTouches[0].screenY);
    }
    static mouseMove(event) {
        if (ImGui._paused)
            return;
        if (ImGui._isMouseDown)
            ImGui.movePosition = new Vec2(event.offsetX, Context.canvas.height - event.offsetY);
    }
    static touchMove(event) {
        if (ImGui._paused)
            return;
        if (ImGui._isMouseDown) {
            ImGui.movePosition = new Vec2(event.changedTouches[0].screenX, Context.canvas.height - event.changedTouches[0].screenY);
        }
    }
    static mouseUp() {
        if (ImGui._paused)
            return;
        ImGui._isMouseDown = false;
        ImGui.downPosition = new Vec2(0, 0);
    }
    static touchCancel(event) {
        if (ImGui._paused)
            return;
        ImGui._isMouseDown = false;
        ImGui.downPosition = new Vec2(0, 0);
    }
    static mouseWheel(event) {
        if (ImGui._paused)
            return;
        ImGui._isMouseWheel = true;
        ImGui.deltaPosition = new Vec2(event.deltaX, event.deltaY);
    }
    static isAnyMouseDown() {
        if (ImGui._paused)
            return false;
        return ImGui._isMouseDown;
    }
    static getMouseDragDelta(button) {
        if (ImGui.isMouseDown(button)) {
            return new Vec2(ImGui.movePosition.x - ImGui.downPosition.x, ImGui.movePosition.y - ImGui.downPosition.y);
        }
        return new Vec2(0, 0);
    }
    static resetMouseDragDelta(button) {
        if (ImGui.isMouseDown(button)) {
            ImGui.downPosition = ImGui.movePosition;
        }
    }
}
//# sourceMappingURL=imGui.js.map