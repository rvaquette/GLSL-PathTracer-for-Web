// Service Worker pour assign.html.
// Intercepte les requêtes depuis l'iframe index.html pour :
//   - pathtracer.json  → retourne uniquement la scène sélectionnée
//   - shadertoy*.json  → retourne [] pour désactiver les scènes shadertoy
//   - /scenes/pathtracer/<scene> → retourne la scène patchée avec les assignments MaterialX

let pendingConfig = null; // { scene, assignments: [{instanceName, relPath}], resolution?, generator? }

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('message', (event) => {
    if (event.data?.type === 'SET_CONFIG') {
        pendingConfig = event.data.config;
    } else if (event.data?.type === 'CLEAR_CONFIG') {
        pendingConfig = null;
    }
});

self.addEventListener('fetch', (event) => {
    if (!pendingConfig) return;
    const url = new URL(event.request.url);
    const p = url.pathname;

    if (p.endsWith('/pathtracer.json')) {
        event.respondWith(json([pendingConfig.scene]));
        return;
    }
    if (p.endsWith('/shadertoy.json') || p.endsWith('/shadertoy-glsl-pathtracer.json')) {
        event.respondWith(json([]));
        return;
    }
    // Patch the .scene file with material assignments.
    if (p.includes('/scenes/pathtracer/') && p.endsWith(pendingConfig.scene)) {
        event.respondWith(
            fetch(event.request).then(r => {
                if (!r.ok) return r;
                return r.text().then(text => {
                    let patched = applyAssignments(text, pendingConfig.assignments);
                    if (pendingConfig.resolution) patched = applyResolution(patched, pendingConfig.resolution);
                    return new Response(patched, { headers: { 'Content-Type': 'text/plain' } });
                });
            })
        );
    }
});

function json(data) {
    return Promise.resolve(new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    }));
}

// Même logique que applyMtlxAssignmentsToScene dans render-scene-headless.mjs.
function applyAssignments(text, assignments) {
    if (!assignments || assignments.length === 0) return text;
    const meshMatMap = new Map();
    const meshBlockRe = /\bmesh\s*\{([^}]*)\}/gs;
    let m;
    while ((m = meshBlockRe.exec(text)) !== null) {
        const nameM = /^\s*name\s+(\S+)/m.exec(m[1]);
        const matM  = /^\s*material\s+(\S+)/m.exec(m[1]);
        if (nameM && matM) meshMatMap.set(nameM[1], matM[1]);
    }
    for (const { instanceName, relPath } of assignments) {
        const matName = meshMatMap.get(instanceName);
        if (!matName) continue;
        const newMatName  = `${matName}__${instanceName}`;
        const matNameEsc  = matName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        text = text.replace(/\bmesh\s*\{([^}]*)\}/gs, (full, block) => {
            const nm = /^\s*name\s+(\S+)/m.exec(block);
            if (!nm || nm[1] !== instanceName) return full;
            return full.replace(new RegExp(`^(\\s*material\\s+)${matNameEsc}(\\s*)$`, 'm'), `$1${newMatName}$2`);
        });
        const meshIdx = text.search(/\bmesh\s*\{/);
        const newBlock = `material ${newMatName}\n{\n\tmaterialx_document ../materialx/materials/${relPath}\n}\n\n`;
        text = meshIdx > 0 ? text.slice(0, meshIdx) + newBlock + text.slice(meshIdx) : text + '\n' + newBlock;
    }
    return text;
}

// Patch resolution/tilesize lines in a .scene (mirrors render-scene-headless.mjs setLine logic).
function applyResolution(text, size) {
    const w = size, h = size;
    const tw = Math.max(1, Math.floor(w / 8));
    const th = Math.max(1, Math.floor(h / 8));
    const setLine = (t, key, val) =>
        new RegExp(`^\\s*${key}\\s+.*$`, 'm').test(t)
            ? t.replace(new RegExp(`^(\\s*)${key}\\s+.*$`, 'm'), `$1${key} ${val}`)
            : t.replace(/(renderer\s*\{)/, `$1\n    ${key} ${val}`);
    text = setLine(text, 'resolution', `${w} ${h}`);
    text = setLine(text, 'tilewidth', `${tw}`);
    text = setLine(text, 'tileheight', `${th}`);
    return text;
}
