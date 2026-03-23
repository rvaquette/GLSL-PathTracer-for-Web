import { create } from "domain";
import { Context } from "../../core/context.js";

export function getImageData(image: HTMLImageElement | ImageBitmap, width: number, height: number, flip: boolean = false): Uint8Array | null {
    const imageData = getImageDataCore(image, width, height, flip);
    if (!imageData) {
        return null;
    }

    return new Uint8Array(imageData.data.buffer);
}

export function getImageBitmapAsync(image: HTMLImageElement | ImageBitmap, width: number, height: number, flip: boolean = false): Promise<ImageBitmap | null> {
    const imageData = getImageDataCore(image, width, height, flip);
    if (!imageData) {
        return Promise.resolve(null);
    }

    return createImageBitmap(imageData);
}

export function getImageDataCore(image: HTMLImageElement | ImageBitmap, width: number, height: number, flip: boolean = false): ImageData {
    const textures = Context.document.getElementById("textures");
    
    const canvas = Context.document.createElement('canvas');
    textures?.appendChild(canvas);

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return null;
    }
    if (flip) {
        // Flip the image vertically
        ctx.scale(1, -1);
        ctx.drawImage(image, 0, -height, width, height);
    } else {
        ctx.drawImage(image, 0, 0, width, height);
    }   
    const imageData = ctx.getImageData(0, 0, width, height);

    return imageData;
}