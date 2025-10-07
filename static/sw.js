const CACHE_NAME = 'ali-site-v1';

// Install event - cache everything
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Cache all pages
      return fetch('/sitemap.xml')
        .then(response => response.text())
        .then(text => {
          const urls = [];
          const parser = new DOMParser();
          const xml = parser.parseFromString(text, 'text/xml');
          const locs = xml.getElementsByTagName('loc');

          for (let loc of locs) {
            urls.push(new URL(loc.textContent).pathname);
          }

          // Add assets
          urls.push('/assets/style.css');
          urls.push('/assets/ali-robertson.jpg');

          return cache.addAll(urls);
        })
        .catch(() => {
          // Fallback if sitemap doesn't exist
          return cache.addAll([
            '/',
            '/communities/',
            '/contact/',
            '/resources/',
            '/resources/sharepoint/',
            '/resources/power-platform/',
            '/resources/windows/',
            '/assets/style.css',
            '/assets/ali-robertson.jpg'
          ]);
        });
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - cache first, update cache in background
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      // Fetch in background to update cache
      const fetchPromise = fetch(event.request).then((response) => {
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });

      // Return cached version immediately, or wait for network if not cached
      return cached || fetchPromise;
    })
  );
});
