export class AzureBlobUtil {
    static async readBlob(blobUrl) {
        try {
            const response = await fetch(this.buildUrl(blobUrl), { method: 'GET' });
            if (response.ok) {
                return await response.blob();
            }
            else {
                console.error("Failed to read blob from:", blobUrl, response.statusText);
                return null;
            }
        }
        catch (e) {
            console.error("Failed to read blob from:", blobUrl, e);
            return null;
        }
    }
    static buildUrl(blobPath, blobStart = "scenes/shadertoy/examples/glsl-pathtracer") {
        return `https://rvawebgl.blob.core.windows.net/$web/${blobStart}/${blobPath}`;
    }
}
//# sourceMappingURL=blob.js.map