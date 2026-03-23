import { Context } from "../core/context.js";
import { Main } from "../main.js";
import { Vec2 } from "../math/vec2.js";

export class ImGui
{
    private static _isMouseDown : boolean = false;
    private static _isMouseOver : boolean = false;
    private static _isMouseWheel : boolean = false;
    private static _escapePressed : boolean = false;
    private static _paused : boolean = false;

    private static buttons : number = 0;
    public static downPosition : Vec2 = new Vec2(0, 0);
    public static movePosition : Vec2 = new Vec2(0, 0);
    public static deltaPosition : Vec2 = new Vec2(0, 0);
    
    static pauseOrContinue(paused: boolean) {
        ImGui._paused = paused;
    }

    static isMouseDown(buttons: number) : boolean {
        if (ImGui._paused) return false;
        if (buttons === 2) {
            return ImGui._isMouseDown && (ImGui.buttons & 4) !== 0;
        }   
        return ImGui._isMouseDown && (ImGui.buttons & (buttons + 1)) !== 0;
    }

    static keydown(event: KeyboardEvent) {
        if (ImGui._paused) return;
        if (event.key === "Escape") {
            Main.instance.pauseOrContinue();            
        }
    }

    static keyup(event: KeyboardEvent) {
        if (ImGui._paused) return;
    }

    static mouseEnter() {
        if (ImGui._paused) return;
        ImGui._isMouseOver = true;
    }

    static mouseLeave() {
        if (ImGui._paused) return;
        ImGui._isMouseOver = false;
    }

    static mouseDown(event: MouseEvent) {
        if (ImGui._paused) return;
        ImGui._isMouseDown = true;
        ImGui.buttons = event.buttons;
        ImGui.downPosition = new Vec2(event.offsetX, Context.canvas.height - event.offsetY);
    }

    static touchStart(event: TouchEvent) {
        if (ImGui._paused) return;
        ImGui._isMouseDown = true;
        ImGui.buttons = 1; // Assuming touch is equivalent to left mouse button
        ImGui.downPosition = new Vec2(event.changedTouches[0].screenX, Context.canvas.height - event.changedTouches[0].screenY);
    }

    static mouseMove(event: MouseEvent) {
        if (ImGui._paused) return;
        if (ImGui._isMouseDown) 
            ImGui.movePosition = new Vec2(event.offsetX, Context.canvas.height - event.offsetY);
    }

    static touchMove(event: TouchEvent) {
        if (ImGui._paused) return;
        if (ImGui._isMouseDown) {
            ImGui.movePosition = new Vec2(event.changedTouches[0].screenX, Context.canvas.height - event.changedTouches[0].screenY);
        }
    }

    static mouseUp() {
        if (ImGui._paused) return;
        ImGui._isMouseDown = false;
        ImGui.downPosition = new Vec2(0, 0);
    }

    static touchCancel(event: TouchEvent) {
        if (ImGui._paused) return;
        ImGui._isMouseDown = false;
        ImGui.downPosition = new Vec2(0, 0);
    }
    
    static mouseWheel(event: WheelEvent) {
        if (ImGui._paused) return;
        ImGui._isMouseWheel = true;
        ImGui.deltaPosition = new Vec2(event.deltaX, event.deltaY);
    }
    
    static isAnyMouseDown() {
        if (ImGui._paused) return false;
        return ImGui._isMouseDown;
    }

    static getMouseDragDelta(button: number) : Vec2 {
        if (ImGui.isMouseDown(button)) {
            return new Vec2(ImGui.movePosition.x - ImGui.downPosition.x, ImGui.movePosition.y - ImGui.downPosition.y);
        }
        return new Vec2(0, 0);
    }

    static resetMouseDragDelta(button: number) {
        if (ImGui.isMouseDown(button)) {
            ImGui.downPosition = ImGui.movePosition;
        }
    }


}