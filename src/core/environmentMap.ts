import { HDRLoader } from "../loaders/hdr/HDRLoader.js";

// Utility function to compute luminance
function luminance(r: number, g: number, b: number): number {
    return 0.212671 * r + 0.715160 * g + 0.072169 * b;
}

export class EnvironmentMap {
    width: number;
    height: number;
    img: Float32Array | null;
    cdf: Float32Array | null;
    totalSum: number;

    constructor() {
        this.width = 0;
        this.height = 0;
        this.img = null; // Float32Array or similar
        this.cdf = null;
        this.totalSum = 0;
    }

    dispose(): void {
        this.img = null;
        this.cdf = null;
    }

    // https://pbr-book.org/3ed-2018/Light_Transport_I_Surface_Reflection/Sampling_Light_Sources#InfiniteAreaLights
    // Build the cumulative distribution function (CDF) for importance sampling
    buildCDF(): void {
        if (!this.img || !this.width || !this.height) return;

        const weights = new Float32Array(this.width * this.height);
        for (let v = 0; v < this.height; v++) {
            for (let u = 0; u < this.width; u++) {
                const imgIdx = v * this.width * 3 + u * 3;
                weights[u + v * this.width] = luminance(
                    this.img[imgIdx + 0],
                    this.img[imgIdx + 1],
                    this.img[imgIdx + 2]
                );
            }
        }

        this.cdf = new Float32Array(this.width * this.height);
        this.cdf[0] = weights[0];
        for (let i = 1; i < this.width * this.height; i++) {
            this.cdf[i] = this.cdf[i - 1] + weights[i];
        }

        this.totalSum = this.cdf[this.width * this.height - 1];
    }

    async loadMapAsync(filename: string): Promise<boolean> {
        [this.img, this.width, this.height] = await HDRLoader.loadHDRAsync(filename); 
        if (this.img == null)
            return false;

        this.buildCDF();

        return true;
    }
}