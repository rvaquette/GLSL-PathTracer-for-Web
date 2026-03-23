export class AzureBlobUtil {
    // Utility to read a blob from Azure Blob Storage
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

    static async writeBlob(blobName: string, data: string | Buffer, contentType: string | null = null): Promise<boolean> {
        console.log(`Uploading ${blobName} to Azure Blob Storage`);

        const containerName = "scenes";
        const sasToken = process.env.AZURE_STORAGE_ACCOUNT_SAS_TOKEN;
        const url = this.buildUrl(`${blobName}?${sasToken}`);
        const contentLength = typeof data === 'string' 
            ? new Blob([data]).size.toString()
            : data.byteLength.toString();
        const response = await fetch(url, {
            method: 'PUT',
            headers: {  
            'x-ms-version': '2019-12-12',
            'x-ms-date': new Date().toUTCString(),
            'x-ms-blob-type': 'BlockBlob',
            'Content-Type': contentType ?? (typeof data === 'string' ? 'application/json' : 'application/octet-stream'),
            'Content-Length': contentLength
            },
            body: typeof data === 'string' ? data : new Uint8Array(data)
        });
        if (response.ok) {
            return true;
        } else {
            console.error("Failed to create blob:", blobName, response.statusText);
            return false;
        }
    }

    static buildUrl(blobPath: string, blobStart: string = "scenes"): string {
        return `https://rvawebgl.blob.core.windows.net/$web/${blobStart}/${blobPath}`;
    }
}