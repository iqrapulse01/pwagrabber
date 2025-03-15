const CACHE_NAME = "deal-grabber-v1";
const urlsToCache = [
  "/", 
  "/index.html",
  "/manifest.json",
  // "/favicon.ico",
  "/logo192.png",
  "/logo512.png",
  "/images/dealgrabber1bg.png",
  "/images/logo.png",
  "/screenshots/screenshot1.png",
  "/screenshots/screenshot2.png"
];

// Install event (Caching assets)
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error("❌ Cache addAll failed:", error);
      })
  );
  self.skipWaiting();
});

// Activate event (Claim control & delete old cache)
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("🗑 Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch event (Serve cached assets)
self.addEventListener("fetch", (event) => {
  console.log("Fetching:", event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log("✅ Serving from cache:", event.request.url);
        return response;
      }
      return fetch(event.request).catch((error) => {
        console.error("❌ Fetch failed:", event.request.url, error);
      });
    })
  );
});
