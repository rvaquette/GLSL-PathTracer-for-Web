#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compiledPath = path.resolve(__dirname, "..", "dist-min", "render-shaderball-cli.js");

if (!fs.existsSync(compiledPath)) {
  console.error(`Compiled CLI not found: ${compiledPath}`);
  console.error("Run `npm run build` first to generate dist-min/render-shaderball-cli.js.");
  process.exitCode = 1;
} else {
  await import(pathToFileURL(compiledPath).href);
}
