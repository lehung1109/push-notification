declare var self: ServiceWorkerGlobalScope;

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('push', (event: PushEvent) => {
  console.log(`dataReceived: ${JSON.stringify(event.data?.json())}`);
  const {title, body} = event.data?.json() || {};

  event.waitUntil(Promise.resolve().then(() => {
    return self.registration.showNotification(title, {body});
  }))
});