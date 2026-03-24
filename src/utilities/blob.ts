export class AzureBlobUtil {
    static async readBlob(blobUrl: string): Promise<Blob | null> {
        try {
            const response = await fetch(this.buildUrl(blobUrl), { method: 'GET' });
            if (response.ok) {
                return await response.blob();
            } else {
                console.error("Failed to read blob from:", blobUrl, response.statusText);
                return null;
            }
        } catch (e) {
            console.error("Failed to read blob from:", blobUrl, e);
            return null;
        }
    }

    static buildUrl(blobPath: string, blobStart: string = "scenes/shadertoy/glsl-pathtracer"): string {
        return `https://rvawebgl.blob.core.windows.net/$web/${blobStart}/${blobPath}`;
    }
}