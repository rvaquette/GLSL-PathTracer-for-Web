import { rm } from "node:fs/promises";
import { build } from "esbuild";

const outdir = "dist-min";

async function main() {
  await rm(outdir, { recursive: true, force: true });

  await build({
    entryPoints: {
      main: "src/main.ts",
      "core/GL": "src/core/GL.ts"
    },
    outdir,
    bundle: true,
    format: "esm",
    platform: "browser",
    target: ["es2022"],
    minify: true,
    splitting: true,
    sourcemap: false,
    chunkNames: "chunks/[name]-[hash]",
    external: [
      "fs",
      "fs/promises",
      "path",
      "path/win32",
      "sharp",
      "node-fetch",
      "util"
    ]
  });

  await build({
    entryPoints: {
      runStatic: "src/runStatic.ts",
      "render-shaderball-cli": "src/render-shaderball-cli.ts"
    },
    outdir,
    bundle: true,
    format: "esm",
    platform: "node",
    target: ["node20"],
    minify: true,
    sourcemap: false,
    packages: "external",
    // The dynamic imports of /dist/*.js inside page.evaluate() are browser-side
    // URLs resolved at runtime by Playwright — esbuild must not try to bundle them.
    external: ["/dist/*"]
  });

  console.log("Minified build written to dist-min");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
