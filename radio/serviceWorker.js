const staticAssets=[
    './',
    './style.css',
    './radio.js',
    './cadena100.jpg',
    './los40principales.jpg',
    './ondacero.jpg',
    './rne5.jpg',
    './rneclasica.jpg',
    './rockfm.jpg',
    './vacio.png',
    './europafm.png',
    './kissfm.png',
    './los40classic.png',
    './rne.png',
    './nordiclodge.png'
];

self.addEventListener('install', async event=>{
    const cache = await caches.open('static-cache');
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
    const req = event.request;
    const url = new URL(req.url);

    if(url.origin === location.url){
        event.respondWith(cacheFirst(req));
    } else {
        event.respondWith(newtorkFirst(req));
    }
});

async function cacheFirst(req){
    const cachedResponse = caches.match(req);
    return cachedResponse || fetch(req);
}

async function newtorkFirst(req){
    const cache = await caches.open('dynamic-cache');

    try {
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
    } catch (error) {
        return await cache.match(req);
    }
}
