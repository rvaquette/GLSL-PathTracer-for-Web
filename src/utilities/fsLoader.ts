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
