export class FileResponse  {
    ok: boolean; 
    statusText?: string;
    arrayBuffer:  () => Promise<ArrayBuffer>;  
    text: () => Promise<string>;
    json: () => Promise<any>;
    blob: () => Promise<Blob | null>;
}

export async function fileExists(url: string) : Promise<boolean> {
    const response = await loadFile(url);
    return response.ok;
}

export async function loadFile(url: string): Promise<FileResponse> {

// Treat as remote if starts with http(s)
    if (/^https?:\/\//i.test(url) || typeof window !== "undefined") {
        const r = await fetch(url);
        return {
            ok: r.ok,
            statusText: r.statusText,
            arrayBuffer: () => r.arrayBuffer(),
            text: () => r.text(),
            json: () => r.json(),
            blob: () => r.blob()
        };
    }
    // Local file path (Node)
    
    // Lazy import (avoids bundler complaints in browser)
    const fs = await import("fs");
    const path = await import("path");
    let pathJoin = path.join;
    let pathIsAbs = path.isAbsolute;

    try {
        const full = pathIsAbs!(url) ? `.${url}` : pathJoin!(process.cwd(), url);
        return {
            ok: fs.existsSync(full),
            statusText: fs.existsSync(full) ? "OK" : "Not Found",
            arrayBuffer: async () => fs.readFileSync(full).buffer,
            text: async () => fs.readFileSync(full, { encoding: "utf8" }),
            json: async () => JSON.parse(fs.readFileSync(full, { encoding: "utf8" })),
            blob: async () => new Blob([fs.readFileSync(full)])
        };
    } catch (e) {
        console.error("Failed to read local file:", url, e);
        return {
            ok: false,
            statusText: (e as Error).message,
            arrayBuffer: async () => new ArrayBuffer(0),
            text: async () => "",
            json: async () => null,
            blob: async () => null
        };
    }
}

export function saveFile(filePath: string, data: string | ArrayBufferLike): Promise<boolean> {
    console.log(`Saving ${filePath}`);
    return new Promise<boolean>(async (resolve) => {
        if (typeof window !== "undefined") {
            // Browser environment
            const blob = new Blob([data as ArrayBuffer], { type: "application/octet-stream" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filePath;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            resolve(true);
        } else {
            // Node.js environment
            const fs = await import("fs/promises");
            try {
                if (data instanceof ArrayBuffer || data instanceof SharedArrayBuffer) {
                    const buffer = Buffer.from(data);
                    await fs.writeFile(filePath, buffer);
                } else {
                    const path = await import("path/win32");
                    await fs.writeFile(filePath, data, "utf8");
                }
                resolve(true);
            } catch (e) {
                console.error("Failed to save file:", filePath, e);
                resolve(false);
            }
        }
    });
}

export function copyFile(srcPath: string, destPath: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
        if (typeof window !== "undefined") {
            // Browser environment
            const blob = await (await fetch(srcPath)).blob();
            const newBlob = new Blob([blob], { type: blob.type });
            const url = URL.createObjectURL(newBlob);
            const a = document.createElement("a");
            a.href = url;
            a.download = destPath;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            resolve(true);
        } else {
            // Node.js environment
            const fs = await import("fs/promises");
            try {
                await fs.copyFile(srcPath, destPath);
                resolve(true);
            } catch (e) {
                console.error("Failed to copy file:", srcPath, e);
                resolve(false);
            }
        }
    });
}

// Utility to upload on an Url
export async function uploadFile(url: string, data: Blob | ArrayBuffer | string): Promise<boolean> {
    try {
        let body: BodyInit;
        if (data instanceof Blob) {
            body = data;
        } else if (data instanceof ArrayBuffer) {
            body = new Blob([data]);
        } else {
            body = new Blob([data], { type: "text/plain" });
        }
        const response = await fetch(url, {
            method: 'PUT',
            body: body
        });
        console.log(response.status);
        console.log(await response.text());
        return response.ok;
    } catch (e) {
        console.error("Failed to upload file to:", url, e);
        return false;
    }
}

// Utility to download from an Url
export async function downloadFile(url: string): Promise<Blob | null> {
    try {
        const response = await fetch(url, { method: 'GET' });
        if (response.ok) {
            return await response.blob();
        } else {
            console.error("Failed to download file from:", url, response.statusText);
            return null;
        }
    } catch (e) {
        console.error("Failed to download file from:", url, e);
        return null;
    }
}
