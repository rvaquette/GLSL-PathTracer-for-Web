export class FileResponse {
    ok;
    statusText;
    arrayBuffer;
    text;
    json;
    blob;
}
export async function fileExists(url) {
    const response = await loadFile(url);
    return response.ok;
}
export async function loadFile(url) {
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
        const full = pathIsAbs(url) ? `.${url}` : pathJoin(process.cwd(), url);
        return {
            ok: fs.existsSync(full),
            statusText: fs.existsSync(full) ? "OK" : "Not Found",
            arrayBuffer: async () => fs.readFileSync(full).buffer,
            text: async () => fs.readFileSync(full, { encoding: "utf8" }),
            json: async () => JSON.parse(fs.readFileSync(full, { encoding: "utf8" })),
            blob: async () => new Blob([fs.readFileSync(full)])
        };
    }
    catch (e) {
        console.error("Failed to read local file:", url, e);
        return {
            ok: false,
            statusText: e.message,
            arrayBuffer: async () => new ArrayBuffer(0),
            text: async () => "",
            json: async () => null,
            blob: async () => null
        };
    }
}
//# sourceMappingURL=fsLoader.js.map