const CACHE_NAME = 'halacha-cache-v4';

const urlsToCache = [
  '/',
  '/luach',
  '/styles/globals.css',
  // Ajoutez ici d'autres ressources à mettre en cache
];

// Liste des routes à ne jamais mettre en cache
const neverCacheUrls = [
  '/api/'
];

// Fonction pour vérifier si une URL ne doit pas être mise en cache
function shouldNotCache(url) {
  return neverCacheUrls.some(excludeUrl => url.includes(excludeUrl));
}

self.addEventListener('install', (event) => {
  // Force le service worker à devenir actif immédiatement
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Mettre en cache uniquement les ressources qui existent
        return Promise.allSettled(
          urlsToCache.map(url =>
            cache.add(url).catch(err => {
              console.warn('Failed to cache:', url, err);
            })
          )
        );
      })
  );
});

self.addEventListener('activate', (event) => {
  // Prend le contrôle immédiatement de toutes les pages ouvertes
  event.waitUntil(clients.claim());
  
  // Nettoie les anciens caches
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
});

self.addEventListener('fetch', (event) => {
  // Ne pas intercepter les requêtes vers les API
  if (shouldNotCache(event.request.url)) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        
        return fetch(event.request)
          .then((response) => {
            // Ne pas mettre en cache si la réponse n'est pas valide
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone la réponse
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          });
      })
  );
});
