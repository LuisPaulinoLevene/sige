const CACHE_NAME = "sige-v2";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./manifest.json",
    "./offline.html",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
    );

    self.skipWaiting();
});


self.addEventListener("activate", event => {
    event.waitUntil(
        clients.claim()
    );
});


self.addEventListener("fetch", event => {
    event.respondWith(
        fetch(event.request)
            .catch(() => {
                return caches.match("./offline.html");
            })
    );
});
