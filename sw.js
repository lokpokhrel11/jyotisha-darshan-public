// Replaces the previously deployed worker at the same URL and scope.
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => /^jyotisha-darshan-v\d+$/.test(key))
      .map(key => caches.delete(key)));
    await self.clients.claim();
    await self.registration.unregister();
  })());
});
