self.addEventListener('install', (e) => {
  e.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});
// Cette ligne est OBLIGATOIRE pour Chrome Android
self.addEventListener('fetch', (e) => {
  // Un handler vide suffit pour valider l'installation
});
