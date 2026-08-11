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

    if (p.endsWith('pathtracer.json')) {
        // Only filter to a single scene for the render iframe, not for assign.html itself.
        event.respondWith(
            self.clients.get(event.clientId).then(client => {
                if (!client || !client.url.includes('index.html')) return fetch(event.request);
                return json([pendingConfig.scene]);
            })
        );
        return;
    }
    if (p.endsWith('shadertoy.json') || p.endsWith('shadertoy-glsl-pathtracer.json')) {
        event.respondWith(json([]));
        return;
    }
    // Patch the .scene file with material assignments.
    if (p.includes('scenes/pathtracer/') && p.endsWith(pendingConfig.scene)) {
        event.respondWith(
            fetch(event.request).then(r => {
                if (!r.ok) return r;
                return r.text().then(text => {
                    let patched = applyAssignments(text, pendingConfig.assignments);
                    if (pendingConfig.resolution) patched = applyResolution(patched, pendingConfig.resolution);
                    if (pendingConfig.generator && pendingConfig.generator !== 'auto') patched = applyGenerator(patched, pendingConfig.generator);
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
    // Strip materialx_document/surface from material blocks no longer referenced by any mesh.
    const referencedMats = new Set();
    text.replace(/\bmesh\s*\{([^}]*)\}/gs, (_, block) => {
        const matM = /^\s*material\s+(\S+)/m.exec(block);
        if (matM) referencedMats.add(matM[1]);
    });
    text = text.replace(/\bmaterial\s+(\S+)\s*\{([^}]*)\}/gs, (full, name, body) => {
        if (referencedMats.has(name)) return full;
        const cleaned = body
            .replace(/^\s*materialx_document\s+.*$/mg, '')
            .replace(/^\s*materialx_surface\s+.*$/mg, '');
        return `material ${name}\n{${cleaned}}`;
    });
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

// Inject or replace the top-level materialx_generator directive in the scene text.
function applyGenerator(text, generator) {
    if (/^\s*materialx_generator\s+\S+/m.test(text))
        return text.replace(/^(\s*materialx_generator\s+)\S+/m, `$1${generator}`);
    // Prepend before the first block so the top-level parser sees it.
    return `materialx_generator ${generator}\n` + text;
}
