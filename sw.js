// Shrthnd service worker: the app works offline after the first visit.
// The Gregg dictionary (gdict/) is cached letter by letter as it's used, or all at once from Help.
const V = 'shrthnd-ef330d5f49';
const KEEP = [V, 'shrthnd-dict', 'shrthnd-fonts'];
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'favicon.png',
  'teeline-outlines.json', 'teeline-specials.json', 'pitman-words.json'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => !KEEP.includes(k)).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open('shrthnd-fonts').then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(r => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (url.origin !== location.origin) return;
  if (url.pathname.includes('/gdict/')) {
    const key = 'gdict/' + url.pathname.split('/gdict/')[1];
    e.respondWith(caches.open('shrthnd-dict').then(async c => {
      const hit = await c.match(key); if (hit) return hit;
      const r = await fetch(req); if (r.ok) c.put(key, r.clone()); return r;
    }));
    return;
  }
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(V).then(c => c.put('index.html', cp)); return r; })
      .catch(() => caches.match('index.html', { ignoreSearch: true })));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req)));
});
