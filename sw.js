// Mode hors ligne du site : fichiers du site en cache, réseau d'abord (les mises à jour arrivent tout de suite
// quand on est connecté), cache si le réseau ne répond pas. Supabase et app/ (APK, version.json) ne passent pas par ici :
// l'avancement est gardé dans le navigateur et envoyé au retour du réseau.
const CACHE = "suivi-splunk-v1";
const FILES = ["./", "index.html", "config.js", "favicon.svg", "manifest.webmanifest"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(FILES.map(u => c.add(new Request(u, { cache: "reload" })).catch(() => {}))))
    .then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("suivi-splunk-") && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin || url.pathname.includes("/app/")) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const res = await fetch(req);
      if (res.ok) cache.put(req, res.clone());
      return res;
    } catch (err) {
      const hit = await cache.match(req, { ignoreSearch: true });
      if (hit) return hit;
      if (req.mode === "navigate") { const home = await cache.match("index.html") || await cache.match("./"); if (home) return home; }
      throw err;
    }
  })());
});
