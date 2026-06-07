#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const viewerRoot = path.resolve(projectRoot, "scenes", "materialx", "Tests", "viewer");
const materialxRoot = path.resolve(projectRoot, "scenes", "materialx", "Tests", "materials");

const defaults = {
  scene: "ShaderBall.glb",
  envmap: "san_giuseppe_bridge_2k.hdr",
  materialx: null,
  width: 256,
  height: 256,
  spp: 100,
  initTimeoutMs: 30000,
  maxWaitMs: 45000,
  output: path.join(projectRoot, "renders", "shaderball-256x256-spp100.png")
};

function ensurePngExtension(filePath) {
  if (path.extname(filePath).toLowerCase() === ".png") {
    return filePath;
  }
  return `${filePath}.png`;
}

function parseArgs(argv) {
  const args = { ...defaults };
  let outputProvided = false;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];

    if (arg === "--scene" && next) {
      args.scene = next;
      i += 1;
      continue;
    }
    if (arg === "--envmap" && next) {
      args.envmap = next;
      i += 1;
      continue;
    }
    if (arg === "--materialx" && next) {
      args.materialx = path.isAbsolute(next)
        ? next
        : path.resolve(materialxRoot, next);
      i += 1;
      continue;
    }
    if (arg === "--width" && next) {
      args.width = Number(next);
      i += 1;
      continue;
    }
    if (arg === "--height" && next) {
      args.height = Number(next);
      i += 1;
      continue;
    }
    if (arg === "--spp" && next) {
      args.spp = Number(next);
      i += 1;
      continue;
    }
    if (arg === "--init-timeout-ms" && next) {
      args.initTimeoutMs = Number(next);
      i += 1;
      continue;
    }
    if (arg === "--max-wait-ms" && next) {
      args.maxWaitMs = Number(next);
      i += 1;
      continue;
    }
    if (arg === "--output" && next) {
      args.output = path.resolve(projectRoot, next);
      outputProvided = true;
      i += 1;
      continue;
    }
    if (arg === "--png" && next) {
      args.output = path.resolve(projectRoot, next);
      outputProvided = true;
      i += 1;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      console.log("Usage: node scripts/render-shaderball-cli.mjs [options]");
      console.log("");
      console.log("Options:");
      console.log("  --scene <name>      GLB filename from scenes/materialx/Tests/viewer (default: ShaderBall.glb)");
      console.log("  --envmap <name>     HDR filename from scenes/materialx/Tests/viewer (default: san_giuseppe_bridge_2k.hdr)");
      console.log("  --materialx <path>  MaterialX path (relative to scenes/materialx/Tests/materials or absolute)");
      console.log("  --width <px>        Render width (default: 256)");
      console.log("  --height <px>       Render height (default: 256)");
      console.log("  --spp <count>       Samples per pixel target (default: 100)");
      console.log("  --init-timeout-ms <ms>  Maximum initialization wait before abort (default: 30000)");
      console.log("  --max-wait-ms <ms>  Maximum wait for spp target before fallback capture (default: 45000)");
      console.log("  --png <path>        Final render output PNG path");
      console.log("  --output <path>     Output PNG path");
      process.exit(0);
    }
  }

  if (!outputProvided && args.materialx) {
    const materialxName = path.basename(args.materialx, path.extname(args.materialx));
    args.output = path.join(projectRoot, "renders", `${materialxName}.png`);
  }

  args.output = ensurePngExtension(args.output);

  if (!Number.isFinite(args.width) || args.width <= 0) {
    throw new Error("Invalid --width value");
  }
  if (!Number.isFinite(args.height) || args.height <= 0) {
    throw new Error("Invalid --height value");
  }
  if (!Number.isFinite(args.spp) || args.spp <= 0) {
    throw new Error("Invalid --spp value");
  }
  if (!Number.isFinite(args.initTimeoutMs) || args.initTimeoutMs <= 0) {
    throw new Error("Invalid --init-timeout-ms value");
  }
  if (!Number.isFinite(args.maxWaitMs) || args.maxWaitMs <= 0) {
    throw new Error("Invalid --max-wait-ms value");
  }

  return args;
}

function ensureSceneAndEnvmap(sceneName, envmapName) {
  const sourceScene = path.isAbsolute(sceneName)
    ? sceneName
    : path.join(viewerRoot, sceneName);
  if (!fs.existsSync(sourceScene)) {
    throw new Error(`Scene file not found in viewer root: ${sourceScene}`);
  }

  const stagedSceneName = path.basename(sourceScene);
  const targetScene = path.join(projectRoot, "scenes", "pathtracer", stagedSceneName);
  if (!fs.existsSync(targetScene)) {
    fs.copyFileSync(sourceScene, targetScene);
    console.log(`Copied scene asset from viewer root to ${targetScene}`);
  }

  const sourceEnvmap = path.isAbsolute(envmapName)
    ? envmapName
    : path.join(viewerRoot, envmapName);
  if (!fs.existsSync(sourceEnvmap)) {
    throw new Error(`Envmap file not found in viewer root: ${sourceEnvmap}`);
  }

  const stagedEnvmapName = path.basename(sourceEnvmap);
  const targetEnvmap = path.join(projectRoot, "scenes", "pathtracer", "HDR", stagedEnvmapName);
  if (!fs.existsSync(targetEnvmap)) {
    fs.copyFileSync(sourceEnvmap, targetEnvmap);
    console.log(`Copied envmap from viewer root to ${targetEnvmap}`);
  }

  return { stagedSceneName, stagedEnvmapName };
}

function ensureMaterialxFile(materialxPath) {
  if (!materialxPath) return;
  if (!fs.existsSync(materialxPath)) {
    throw new Error(`MaterialX file not found: ${materialxPath}`);
  }
  if (!materialxPath.startsWith(projectRoot)) {
    throw new Error("--materialx must point to a file inside the project workspace");
  }
}

function createStaticServer(rootDir) {
  const mimeByExt = new Map([
    [".html", "text/html; charset=utf-8"],
    [".js", "application/javascript; charset=utf-8"],
    [".mjs", "application/javascript; charset=utf-8"],
    [".json", "application/json; charset=utf-8"],
    [".css", "text/css; charset=utf-8"],
    [".png", "image/png"],
    [".jpg", "image/jpeg"],
    [".jpeg", "image/jpeg"],
    [".webp", "image/webp"],
    [".gif", "image/gif"],
    [".hdr", "application/octet-stream"],
    [".glb", "application/octet-stream"],
    [".gltf", "model/gltf+json"],
    [".bin", "application/octet-stream"],
    [".wasm", "application/wasm"]
  ]);

  const server = http.createServer((req, res) => {
    const requestUrl = req.url ?? "/";
    const pathname = decodeURIComponent(requestUrl.split("?")[0]);

    if (pathname === "/__cli__") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "no-store");
      res.end(`<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <script type="importmap">
      {
        "imports": {
          "three": "/node_modules/three/build/three.module.js",
          "three/": "/node_modules/three/"
        }
      }
    </script>
  </head>
  <body>
    <canvas id="canvas"></canvas>
  </body>
</html>`);
      return;
    }

    if (pathname === "/favicon.ico" || pathname.startsWith("/favicon.ico/")) {
      res.statusCode = 204;
      res.end();
      return;
    }

    const relativePath = pathname === "/" ? "/index.html" : pathname;

    const absolutePath = path.resolve(rootDir, `.${relativePath}`);
    if (!absolutePath.startsWith(rootDir)) {
      res.statusCode = 403;
      res.end("Forbidden");
      return;
    }

    fs.readFile(absolutePath, (error, data) => {
      if (error) {
        res.statusCode = 404;
        res.end(`Not found: ${absolutePath}`);
        return;
      }

      const ext = path.extname(absolutePath).toLowerCase();
      res.setHeader("Content-Type", mimeByExt.get(ext) ?? "application/octet-stream");
      res.setHeader("Cache-Control", "no-store");
      res.statusCode = 200;
      res.end(data);
    });
  });

  return server;
}

function shouldIgnoreBrowserConsoleMessage(type, text, locationUrl) {
  if (type !== "error") {
    return false;
  }
  if (/favicon\.ico(?:$|[?#\/])/i.test(locationUrl)) {
    return true;
  }
  return /favicon\.ico/i.test(text) && /404/.test(text);
}

async function waitForSppProgress(page, targetSpp, maxWaitMs) {
  const startTime = Date.now();
  let lastReportedSpp = -1;
  let reachedTargetSpp = false;

  while (Date.now() - startTime < maxWaitMs) {
    const progress = await page.evaluate(() => {
      const renderer = window.__cliMain?.renderer;
      return {
        hasRenderer: Boolean(renderer),
        sampleCounter: renderer?.sampleCounter ?? 0
      };
    });

    if (progress.hasRenderer) {
      const spp = progress.sampleCounter;
      if (spp !== lastReportedSpp) {
        lastReportedSpp = spp;
        const ratio = targetSpp > 0 ? Math.min(1, spp / targetSpp) : 0;
        const percent = Math.round(ratio * 100);
        console.log(`[render-cli] Progress: ${spp}/${targetSpp} spp (${percent}%)`);
      }

      if (spp >= targetSpp) {
        reachedTargetSpp = true;
        break;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  return reachedTargetSpp;
}

async function waitForDenoiser(page, maxWaitMs) {
  const startTime = Date.now();

  while (Date.now() - startTime < maxWaitMs) {
    const denoiserState = await page.evaluate(() => {
      const renderer = window.__cliMain?.renderer;
      return {
        hasRenderer: Boolean(renderer),
        denoiserExecutedOneTime: Boolean(renderer?.denoiserExecutedOneTime),
        enableDenoiser: Boolean(window.__cliMain?.currentScene?.renderOptions?.enableDenoiser)
      };
    });

    if (!denoiserState.hasRenderer || !denoiserState.enableDenoiser) {
      return false;
    }

    if (denoiserState.denoiserExecutedOneTime) {
      return true;
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  return false;
}

async function evaluateWithNodeTimeout(page, fn, args, timeoutMs, timeoutMessage) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs);
  });
  return Promise.race([page.evaluate(fn, args), timeoutPromise]);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const { stagedSceneName, stagedEnvmapName } = ensureSceneAndEnvmap(args.scene, args.envmap);
  ensureMaterialxFile(args.materialx);

  const materialxUrl = args.materialx
    ? `/${path.relative(projectRoot, args.materialx).split(path.sep).join("/")}`
    : null;

  fs.mkdirSync(path.dirname(args.output), { recursive: true });

  const server = createStaticServer(projectRoot);
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => resolve());
  });

  const addressInfo = server.address();
  if (!addressInfo || typeof addressInfo === "string") {
    throw new Error("Unable to determine local server address");
  }

  const baseUrl = `http://127.0.0.1:${addressInfo.port}`;
  const browser = await chromium.launch({
    headless: true,
    args: [
      "--use-angle=swiftshader",
      "--enable-webgl",
      "--ignore-gpu-blocklist"
    ]
  });

  try {
    const context = await browser.newContext({
      viewport: { width: args.width, height: args.height }
    });
    const page = await context.newPage();

    await page.route("**/favicon.ico", async (route) => {
      await route.fulfill({ status: 204, body: "", contentType: "image/x-icon" });
    });

    page.on("console", (msg) => {
      const type = msg.type();
      const text = msg.text();
      const location = msg.location();
      const locationUrl = location?.url ?? "";
      if (shouldIgnoreBrowserConsoleMessage(type, text, locationUrl)) {
        return;
      }
      if (type === "error" || type === "warning") {
        if (locationUrl) {
          console.log(`[browser:${type}] ${text} @ ${locationUrl}`);
        } else {
          console.log(`[browser:${type}] ${text}`);
        }
      }
    });

    await page.goto(`${baseUrl}/__cli__`, { waitUntil: "domcontentloaded" });

    await evaluateWithNodeTimeout(page, async ({ scene, envmap, materialxUrl, width, height, spp }) => {
      const { Main } = await import("/dist/main.js");
      const { Material } = await import("/dist/core/material.js");
      const { Controls } = await import("/dist/gui/controls.js");
      const { MtlxLoader } = await import("/dist/loaders/mtlx/MtlxLoader.js");
      const main = Main.instance;
      const canvas = document.getElementById("canvas");

      Controls.showGui = false;
      
      await main.runAsync({ document, canvas, scene });
      main.pauseOrContinue(true);

      const currentScene = main.currentScene;
      if (!currentScene) {
        throw new Error("Scene was not initialized");
      }

      const camera = currentScene.camera;
      if (camera) {
        const targetRadius = Math.max(0.25, camera.radius * 0.65);
        camera.setRadius(targetRadius - camera.radius);
        camera.focalDist = Math.max(0.1, targetRadius);
      }

      if (materialxUrl) {
        const { doc, mtlxDir } = await MtlxLoader.fetchAndExpand(materialxUrl);
        const parsedSurfaceMaterial = MtlxLoader.parseFromDoc(doc);
        const runtimeMaterial = new Material();
        runtimeMaterial.name = `MaterialX:${materialxUrl}`;
        parsedSurfaceMaterial.toMaterial(runtimeMaterial);

        const texMap = MtlxLoader.resolveSurfaceTextures(doc, mtlxDir);
        let uvScaleApplied = false;
        for (const [field, resolved] of texMap.entries()) {
          const texId = await currentScene.addTextureByUrlAsync(resolved.filename);
          runtimeMaterial[field] = texId;

          if (!uvScaleApplied && Array.isArray(resolved.uvtiling) && resolved.uvtiling.length >= 2) {
            runtimeMaterial.uvScale.x = resolved.uvtiling[0];
            runtimeMaterial.uvScale.y = resolved.uvtiling[1];
            uvScaleApplied = true;
          }
        }

        const runtimeMaterialId = currentScene.addMaterial(runtimeMaterial);
        if (Array.isArray(currentScene.meshInstances)) {
          for (const instance of currentScene.meshInstances) {
            instance.materialID = runtimeMaterialId;
          }
        }
        currentScene.instancesModified = true;
        currentScene.dirty = true;
      }

      await currentScene.addEnvMapAsync(`HDR/${envmap}`);
      currentScene.renderOptions.enableEnvMap = true;
      currentScene.renderOptions.enableDenoiser = true;
      currentScene.renderOptions.denoiserFrameCnt = 1;
      currentScene.renderOptions.maxSpp = spp;
      currentScene.renderOptions.renderResolution = { x: width, y: height };
      currentScene.renderOptions.tileWidth = width / 8;
      currentScene.renderOptions.tileHeight = height / 8;

      await main.resizeAsync(width, height);
      currentScene.dirty = true;

      // Expose render state to Playwright waiters.
      window.__cliMain = main;
      window.__cliTargetSpp = spp;
    }, {
      scene: stagedSceneName,
      envmap: stagedEnvmapName,
      materialxUrl,
      width: args.width,
      height: args.height,
      spp: args.spp
    }, args.initTimeoutMs, `Renderer initialization timed out after ${args.initTimeoutMs}ms`);

    const reachedTargetSpp = await waitForSppProgress(page, args.spp, args.maxWaitMs);
    if (!reachedTargetSpp) {
      console.warn(`[render-cli] SPP target not reached within ${args.maxWaitMs}ms. Capturing current frame.`);
    }

    const denoiserReady = await waitForDenoiser(page, Math.min(args.maxWaitMs, 10000));
    if (!denoiserReady) {
      console.warn("[render-cli] Denoiser did not complete before capture.");
    }

    const renderState = await page.evaluate(() => {
      const main = window.__cliMain;
      const renderer = main?.renderer;
      return {
        hasRenderer: Boolean(renderer),
        sampleCounter: renderer?.sampleCounter ?? -1,
        targetSpp: window.__cliTargetSpp ?? -1,
        denoiserExecutedOneTime: Boolean(renderer?.denoiserExecutedOneTime)
      };
    });

    if (!renderState.hasRenderer) {
      throw new Error("Renderer was not initialized in browser context");
    }

    if (!reachedTargetSpp) {
      console.warn(`[render-cli] Partial capture at spp=${renderState.sampleCounter} (target=${renderState.targetSpp}).`);
    }

    try {
      await page.locator("#canvas").screenshot({
        path: args.output,
        type: "png"
      });
    } catch {
      await page.screenshot({
        path: args.output,
        type: "png"
      });
    }

    console.log(`Render complete: ${args.output} (spp=${renderState.sampleCounter}, target=${renderState.targetSpp}, denoiser=${renderState.denoiserExecutedOneTime ? "on" : "pending"})`);
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(() => resolve()));
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
