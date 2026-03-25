import { loadFile } from "../utilities/fsLoader.js";
export class ShaderInclude {
    /**
     * Loads a shader file and recursively resolves #include directives.
     * @param path URL or relative path to the shader file.
     * @param includeIdentifier The include keyword to look for (default: "#include").
     * @returns Promise resolving to ShaderSource.
     */
    static async loadAsync(path, dump = false, includeIdentifier = "#include") {
        includeIdentifier += " ";
        let response;
        try {
            response = await loadFile(path);
            if (!response.ok)
                throw new Error();
        }
        catch {
            console.error(`ERROR: could not open the shader at: ${path}`);
            return { src: "", path, dump };
        }
        const text = await response.text();
        return await ShaderInclude.loadShaderSourceAsync(text, path, dump, includeIdentifier);
    }
    static async loadShaderSourceAsync(text, path, dump = false, includeIdentifier = "#include") {
        const lines = text.split(/\r?\n/);
        let fullSourceCode = "";
        for (let line of lines) {
            if (line.includes(includeIdentifier)) {
                // Remove the include identifier, leaving the path
                const includePath = line.replace(includeIdentifier, "").trim().replace(/["<>]/g, "");
                // Resolve relative path
                const resolvedPath = ShaderInclude.resolveRelativePath(path, includePath);
                // Recursively load included file
                const included = await ShaderInclude.loadAsync(resolvedPath, dump, includeIdentifier.trim());
                fullSourceCode += included.src;
                // Do not add the #include line itself
                continue;
            }
            fullSourceCode += line + "\n";
        }
        return { src: fullSourceCode, path, dump };
    }
    /**
     * Resolves a relative path based on the parent file's path.
     * @param parentPath The path of the parent file.
     * @param relativePath The relative path to resolve.
     * @returns The resolved path.
     */
    static resolveRelativePath(parentPath, relativePath) {
        // Use URL to resolve relative paths
        if (relativePath.startsWith("http://") || relativePath.startsWith("https://")) {
            return new URL(relativePath, parentPath).toString();
        }
        else {
            // Fallback for non-browser environments
            if (relativePath.startsWith("/")) {
                return relativePath; // Absolute path
            }
            const base = parentPath.substring(0, parentPath.lastIndexOf("/") + 1);
            return base + relativePath;
        }
    }
}
//# sourceMappingURL=shaderIncludes.js.map