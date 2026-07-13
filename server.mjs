// Serveur Node sans dependance.
// Sert D:\WebGL2\GLSL-PathTracer-for-Web sous le chemin virtuel /test_root.
// Usage: node server.mjs
import http from 'node:http';
import { promises as fs, createReadStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const PREFIX = '/test_root';
const PORT = process.env.PORT ? Number(process.env.PORT) : 5505;
const HOST = '127.0.0.1';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.wasm': 'application/wasm',
  '.glsl': 'text/plain; charset=utf-8',
  '.frag': 'text/plain; charset=utf-8',
  '.vert': 'text/plain; charset=utf-8',
  '.scene': 'text/plain; charset=utf-8',
  '.mtlx': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.hdr': 'application/octet-stream',
  '.exr': 'application/octet-stream',
  '.bin': 'application/octet-stream',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function sendText(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(body);
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    let pathname = decodeURIComponent(url.pathname);

    // Redirige la racine vers le chemin virtuel.
    if (pathname === '/' || pathname === '') {
      res.writeHead(302, { Location: `${PREFIX}/` });
      res.end();
      return;
    }

    // Seul le prefixe virtuel est servi.
    if (pathname !== PREFIX && !pathname.startsWith(`${PREFIX}/`)) {
      sendText(res, 404, 'Not Found');
      return;
    }

    // Retire le prefixe pour obtenir le chemin relatif reel.
    let rel = pathname.slice(PREFIX.length);
    if (rel === '' || rel === '/') rel = '/index.html';

    // Empeche la traversee de repertoire.
    const target = path.normalize(path.join(ROOT, rel));
    if (!target.startsWith(ROOT)) {
      sendText(res, 403, 'Forbidden');
      return;
    }

    let stat;
    try {
      stat = await fs.stat(target);
    } catch {
      sendText(res, 404, 'Not Found');
      return;
    }

    let filePath = target;
    if (stat.isDirectory()) {
      filePath = path.join(target, 'index.html');
      try {
        await fs.access(filePath);
      } catch {
        sendText(res, 404, 'Not Found');
        return;
      }
    }

    const type = MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type });
    createReadStream(filePath).pipe(res);
  } catch (err) {
    sendText(res, 500, 'Internal Server Error');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Serveur pret : http://${HOST}:${PORT}${PREFIX}/`);
});
