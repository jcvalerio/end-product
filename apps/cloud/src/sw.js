/* eslint-disable no-restricted-globals */
import { environment } from '@kleeen/environment';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

const SW_VERSION = environment.deployment.version;

precacheAndRoute(self.__WB_MANIFEST);

/**
 * Local resources
 */

// Cache image files with a cache-first strategy for 30 days
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'static-resources',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 80,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

/**
 * Remote resources
 */

// Cache Google Fonts webfonts files with a cache-first strategy for 1 year
registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 Year
        maxEntries: 30,
      }),
    ],
  }),
);

// Cache Google Fonts stylesheets with a stale-while-revalidate strategy
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  }),
);

/**
 * External Communication
 */

self.addEventListener('message', (event) => {
  if (event?.data?.type === 'GET_VERSION') {
    event.ports[0].postMessage(SW_VERSION);
  }

  if (event?.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
