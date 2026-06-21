/// <reference lib="webworker" />

import { defaultCache } from '@serwist/next/worker';
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';
import { 
  CacheFirst, 
  NetworkFirst, 
  StaleWhileRevalidate, 
  ExpirationPlugin, 
  CacheableResponsePlugin,
  Serwist 
} from 'serwist';

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
      matcher: ({ url }) => /^https:\/\/bot\.asuma\.my\.id\/api\/(?:chat|command)\/.*$/i.test(url.href),
      handler: new NetworkFirst({
        cacheName: 'api-dynamic-cache',
        networkTimeoutSeconds: 5,
        plugins: [
          new ExpirationPlugin({
            maxEntries: 50,
            maxAgeSeconds: 60 * 30,
          }),
          new CacheableResponsePlugin({
            statuses: [0, 200],
          }),
        ],
      }),
    },
    {
      matcher: ({ url }) => /^https:\/\/bot\.asuma\.my\.id\/api\/(?:stats|info)\/.*$/i.test(url.href),
      handler: new StaleWhileRevalidate({
        cacheName: 'api-static-cache',
        plugins: [
          new ExpirationPlugin({            maxEntries: 30,
            maxAgeSeconds: 60 * 60 * 6,
          }),
          new CacheableResponsePlugin({
            statuses: [0, 200, 404],
          }),
        ],
      }),
    },
    {
      matcher: ({ url }) => /^https:\/\/cdn\.asuma\.my\.id\/.*$/i.test(url.href),
      handler: new CacheFirst({
        cacheName: 'cdn-assets',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 200,
            maxAgeSeconds: 60 * 60 * 24 * 7,
          }),
          new CacheableResponsePlugin({
            statuses: [0, 200],
          }),
        ],
      }),
    },
    {
      matcher: ({ request }) => 
        request.destination === 'image' && 
        !request.url.includes('cdn.asuma.my.id'),
      handler: new StaleWhileRevalidate({
        cacheName: 'images-cache',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 3,
          }),
          new CacheableResponsePlugin({
            statuses: [0, 200],
          }),
        ],
      }),
    },
    {
      matcher: ({ request }) => 
        request.destination === 'style' || 
        request.destination === 'script' ||
        request.destination === 'font',
      handler: new StaleWhileRevalidate({
        cacheName: 'static-assets',
        plugins: [
          new ExpirationPlugin({            maxEntries: 60,
            maxAgeSeconds: 60 * 60 * 24 * 30,
          }),
        ],
      }),
    },
    {
      matcher: ({ url }) => url.pathname.startsWith('/icons/'),
      handler: new CacheFirst({
        cacheName: 'icons-cache',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24 * 30,
          }),
          new CacheableResponsePlugin({
            statuses: [0, 200],
          }),
        ],
      }),
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
        url: '/icons/android-chrome-192x192.png',
        matcher({ request }) {
          return request.destination === 'image';
        },
      },
    ],
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
          )          .map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    self.registration.showNotification(data.title || 'Asuma Bot', {
      body: data.body || 'Ada notifikasi baru',
      icon: '/icons/android-chrome-192x192.png',
      badge: '/icons/android-chrome-192x192.png',
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
