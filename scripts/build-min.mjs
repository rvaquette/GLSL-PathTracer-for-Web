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
      convert: "src/convert.ts"
    },
    outdir,
    bundle: true,
    format: "esm",
    platform: "node",
    target: ["node20"],
    minify: true,
    sourcemap: false,
    packages: "external"
  });

  console.log("Minified build written to dist-min");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
