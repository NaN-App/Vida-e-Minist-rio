const CACHE_NAME = 'cronometro-v1.2';
const ASSETS = [
  './',
  './index.html', // Caso seu arquivo principal se chame index.html no GitHub
  './Vida%20&%20Minist%C3%A9rio.html', // Nome do arquivo atual codificado para URLs
  './425EB2.png'
];

// Instalação do Service Worker e Cache dos arquivos
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Responde offline puxando do cache
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
