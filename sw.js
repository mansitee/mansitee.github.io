self.importScripts('data.js');

// Files to cache
const cacheName = 'sima';
const appShellFiles = [
  '/',
  '/index.html',
  '/app.js',
  '/style.css',
  '/font/graduate.eot',
  '/font/graduate.ttf',
  '/font/graduate.woff',
  '/favicon.ico',
  '/img/js13kgames.png',
  '/img/bg.png',
  '/icon/icon-32.png',
  '/icon/icon-64.png',
  '/icon/icon-96.png',
  '/icons/icon-128.png',
  '/icons/icon-168.png',
  '/icons/icon-192.png',
  '/icons/icon-256.png',
  '/icons/icon-512.png',
];
const gamesImages = [];
for (let i = 0; i < games.length; i++) {
  gamesImages.push(`data/img/${games[i].slug}.jpg`);
}
const contentToCache = appShellFiles.concat(gamesImages);

// Installing Service Worker
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(contentToCache);
  })());
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) return r;
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});
 