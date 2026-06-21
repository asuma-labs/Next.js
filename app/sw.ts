import { defaultCache } from '@serwist/next/worker';
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';
import { Serwist } from 'serwist';

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  disableDevLogs: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/bot\.asuma\.my\.id\/api\/(?:chat|command)\/.*$/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-dynamic-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 30,
        },
        networkTimeoutSeconds: 5,
        cacheableResponse: { statuses: [0, 200] },
      },
    },
    {
      urlPattern: /^https:\/\/bot\.asuma\.my\.id\/api\/(?:stats|info)\/.*$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'api-static-cache',
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 60 * 60 * 6,
        },
        cacheableResponse: { statuses: [0, 200, 404] },
      },
    },
    {
      urlPattern: /^https:\/\/cdn\.asuma\.my\.id\/.*$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'cdn-assets',
        expiration: {          maxEntries: 200,
          maxAgeSeconds: 60 * 60 * 24 * 7,
        },
        cacheableResponse: { statuses: [0, 200] },
      },
    },
    {
      urlPattern: ({ request }) => 
        request.destination === 'image' && 
        !request.url.includes('cdn.asuma.my.id'),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'images-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 3,
        },
        cacheableResponse: { statuses: [0, 200] },
      },
    },
    {
      urlPattern: ({ request }) => 
        request.destination === 'style' || 
        request.destination === 'script' ||
        request.destination === 'font',
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-assets',
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
      },
    },
    ...defaultCache,
  ],
  fallbacks: {
    entries: [
      {
        url: '/offline',
        matcher({ request }) {
          return request.destination === 'document';
        },
      },
      {
        url: '/offline-image.png',
        matcher({ request }) {
          return request.destination === 'image';
        },
      },    ],
  },
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => 
            !name.includes('asuma') && 
            !name.includes('serwist')
          )
          .map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    self.registration.showNotification(data.title || 'Asuma Bot', {
      body: data.body || 'Ada notifikasi baru',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      data: data.data || {},
    });
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return self.clients.openWindow('/');
    })
  );
});

serwist.addEventListeners();
