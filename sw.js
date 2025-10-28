const CACHE_NAME = 'gestione-attivita-v3.1';
const urlsToCache = [
  './index.html',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js'
];

// Installazione - caching delle risorse
self.addEventListener('install', event => {
  console.log('[SW] Installing Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Attivazione - pulizia cache vecchie
self.addEventListener('activate', event => {
  console.log('[SW] Activating Service Worker...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - strategia cache-first per risorse, network-first per dati
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignora richieste non-GET
  if (request.method !== 'GET') return;

  // Ignora chrome extensions e altre origini
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(
    caches.match(request)
      .then(response => {
        // Cache hit - ritorna la risposta dalla cache
        if (response) {
          // Aggiorna la cache in background (stale-while-revalidate)
          fetch(request).then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then(cache => {
                cache.put(request, networkResponse);
              });
            }
          }).catch(() => {});

          return response;
        }

        // Cache miss - prova network
        return fetch(request).then(networkResponse => {
          // Salva in cache solo risposte valide
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'error') {
            return networkResponse;
          }

          // Clona la risposta (può essere letta solo una volta)
          const responseToCache = networkResponse.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseToCache);
          });

          return networkResponse;
        }).catch(() => {
          // Network fallito - potremmo ritornare una pagina offline
          return new Response('Offline - Controlla la tua connessione', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      })
  );
});

// Gestione messaggi dal client
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
