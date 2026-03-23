export class BaseTexture {
    dispose() {
    }
}

export class BaseImageTexture extends BaseTexture {
    name: string | null;
    image: TexImageSource | null;
    rgba: Uint8Array | null = null;
    width: number | null = null;
    height: number | null = null;
    flipY: boolean = false;

    constructor(name: string | null = null, image: TexImageSource | null = null) {
        super();
        this.name = name;
        this.image = image;
    }
}

export class Texture extends BaseImageTexture {
    constructor(name: string | null = null, image: HTMLImageElement | ImageBitmap | null = null) {
        super(name, image);
    }
    
    async loadTextureAsync(filename: string): Promise<boolean> {
        if (typeof window !== "undefined") {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.crossOrigin = 'anonymous';
                image.onload = () => {
                    this.name = filename;
                    this.image = image;
                    this.width = image.width;
                    this.height = image.height;
                    resolve(true);
                };
                image.onerror = () => resolve(false);
                image.src = filename;
            });
        } else {
             // Node path: decode with sharp
            try {
                const sharp = await import("sharp");
                const img = sharp.default(filename).ensureAlpha();
                const meta = await img.metadata();
                const raw = await img.raw().toBuffer();

                this.name = filename;
                this.image = null; // no HTMLImageElement in Node
                this.width = meta.width ?? null;
                this.height = meta.height ?? null;
                this.rgba = new Uint8Array(raw); // width*height*4

                return true;
            } catch (e) {
                console.error("Failed to load texture in Node:", e);
                return false;
            }
        }
    }
}
