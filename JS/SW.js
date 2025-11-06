const CACHE_NAME = 'pwa-firebase-poo-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/register.html',
  '/profile.html',
  '/style.css',
  '/app.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});