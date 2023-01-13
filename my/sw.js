self.importScripts('data/games.js');

// Files to cache
const cacheName = 'sima-v1';
const appShellFiles = [
  '/sima/',
  '/sima/index.html',
  '/sima/app.js',
  '/sima/style.css',
  '/sima/fonts/graduate.eot',
  '/sima/fonts/graduate.ttf',
  '/sima/fonts/graduate.woff',
  '/sima/favicon.ico',
  '/sima/img/js13kgames.png',
  '/sima/img/bg.png',
  '/sima/icons/icon-32.png',
  '/sima/icons/icon-64.png',
  '/sima/icons/icon-96.png',
  '/sima/icons/icon-128.png',
  '/sima/icons/icon-168.png',
  '/sima/icons/icon-192.png',
  '/sima/icons/icon-256.png',
  '/sima/icons/icon-512.png',
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
