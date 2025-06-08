
// LingoQuest Service Worker
// Bump cache versions whenever assets change to force refresh
const CACHE_NAME = 'lingoquest-v1.0.4';
const STATIC_CACHE_NAME = 'lingoquest-static-v1.0.4';
const DYNAMIC_CACHE_NAME = 'lingoquest-dynamic-v1.0.4';

// Base path for GitHub Pages support
const BASE_PATH = new URL(self.registration.scope).pathname;

// Helper to prefix asset paths with base path
const url = (path) => BASE_PATH + path;

// Files to cache for offline functionality
const STATIC_ASSETS = [
  'index.html',
  'manifest.json',
  
  // CSS Files
  'css/main.css',
  'css/themes.css',
  'css/components.css',
  'css/responsive.css',
  'css/animations.css',
  // Corrected path for accessibility styles
  'css/modules/accessibility.css',
  
  // JavaScript Core Files
  'js/main.js',
  'js/modules/core/componentLoader.js',
  'js/modules/core/uiManager.js',
  'js/modules/core/eventManager.js',
  'js/modules/core/storageManager.js',
  'js/modules/settings/themeManager.js',
  'js/modules/settings/languageManager.js',
  'js/modules/settings/settingsManager.js',
  'js/modules/game/gameLogic.js',
  'js/modules/game/gameStateManager.js',
  'js/modules/game/mcqGenerator.js',
  
  // HTML Components
  'components/header.html',
  'components/home-screen.html',
  'components/game-screen.html',
  'components/results-screen.html',
  'components/settings-screen.html',
  'components/instructions-screen.html',
  'components/loading-overlay.html',
  'components/toast-container.html',
  
  // Essential Assets
  'assets/icons/icon-192x192.png',
  'assets/icons/icon-512x512.png',
  'assets/icons/favicon.ico',
  
  // Game Data
  'js/data/translations/en.js',
  'js/data/questions/classic/names.js',
  'js/data/questions/classic/places.js',
  'js/data/questions/classic/animals.js',
  'js/data/questions/classic/things.js',
  'js/data/questions/hollybolly/movies.js'
];

// URLs that should always be fetched from network
const NETWORK_FIRST_URLS = [
  'js/data/questions/hollybolly/boxOfficeData.js',
  'js/data/questions/hollybolly/directorsData.js',
  'js/data/questions/hollybolly/actorsData.js'
];

// Install Event - Cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS.map(url));
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME &&
                cacheName.startsWith('lingoquest-')) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch Event - Handle requests with different caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests and chrome-extension URLs
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return;
  }
  
  // Handle different types of requests
  if (isStaticAsset(request.url)) {
    event.respondWith(cacheFirst(request));
  } else if (isNetworkFirstAsset(request.url)) {
    event.respondWith(networkFirst(request));
  } else if (isGameData(request.url)) {
    event.respondWith(staleWhileRevalidate(request));
  } else if (isHTMLRequest(request)) {
    event.respondWith(handleHTMLRequest(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

// Caching Strategies

// Cache First Strategy - For static assets
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.status === 200) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
    
  } catch (error) {
    console.error('[SW] Cache first failed:', error);
    return createErrorResponse('Resource temporarily unavailable');
  }
}

// Network First Strategy - For dynamic content
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
    
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return createErrorResponse('Content not available offline');
  }
}

// Stale While Revalidate Strategy - For game data
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => {
    console.log('[SW] Network failed for:', request.url);
  });
  
  // Return cached version immediately if available, otherwise wait for network
  return cachedResponse || fetchPromise;
}

// HTML Request Handler - Always return index.html for SPA routing
async function handleHTMLRequest(request) {
  try {
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (error) {
    // Return cached index.html for offline SPA functionality
    const cachedIndex = await caches.match(url('index.html'));
    if (cachedIndex) {
      return cachedIndex;
    }
    
    return createErrorResponse('Application not available offline');
  }
}

// Helper Functions

function isStaticAsset(url) {
  return STATIC_ASSETS.some(asset => url.includes(asset)) ||
         url.includes('.css') ||
         url.includes('.js') ||
         url.includes('.png') ||
         url.includes('.jpg') ||
         url.includes('.svg') ||
         url.includes('.ico') ||
         url.includes('.woff') ||
         url.includes('.woff2');
}

function isNetworkFirstAsset(url) {
  return NETWORK_FIRST_URLS.some(asset => url.includes(asset));
}

function isGameData(url) {
  return url.includes('js/data/') && !isNetworkFirstAsset(url);
}

function isHTMLRequest(request) {
  return request.headers.get('accept')?.includes('text/html');
}

function createErrorResponse(message) {
  return new Response(
    JSON.stringify({
      error: true,
      message: message,
      timestamp: new Date().toISOString()
    }),
    {
      status: 503,
      statusText: 'Service Unavailable',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    }
  );
}

// Background Sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'save-game-progress') {
    event.waitUntil(syncGameProgress());
  } else if (event.tag === 'sync-settings') {
    event.waitUntil(syncSettings());
  }
});

async function syncGameProgress() {
  try {
    // Get pending game data from IndexedDB
    const pendingData = await getPendingGameData();
    
    if (pendingData.length > 0) {
      for (const data of pendingData) {
        await fetch(url('api/save-progress'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      }
      
      // Clear pending data after successful sync
      await clearPendingGameData();
      console.log('[SW] Game progress synced successfully');
    }
  } catch (error) {
    console.error('[SW] Failed to sync game progress:', error);
  }
}

async function syncSettings() {
  try {
    // Sync settings with server if needed
    console.log('[SW] Settings synced');
  } catch (error) {
    console.error('[SW] Failed to sync settings:', error);
  }
}

// Push Notifications
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
  
  const options = {
    body: event.data?.text() || 'New update available!',
    icon: url('assets/icons/icon-192x192.png'),
    badge: url('assets/icons/icon-96x96.png'),
    tag: 'lingoquest-notification',
    requireInteraction: false,
    actions: [
      {
        action: 'open',
        title: 'Open LingoQuest'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('LingoQuest', options)
  );
});

// Notification Click Handler
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        // Focus existing window if available
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Open new window if no existing window
        if (clients.openWindow) {
          return clients.openWindow(BASE_PATH);
        }
      })
    );
  }
});

// Message Handler for communication with main thread
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'CACHE_GAME_DATA':
      event.waitUntil(cacheGameData(payload));
      break;
      
    case 'CLEAR_CACHE':
      event.waitUntil(clearAllCaches());
      break;
      
    case 'GET_CACHE_STATUS':
      event.waitUntil(getCacheStatus().then(status => {
        event.ports[0]?.postMessage(status);
      }));
      break;
      
    default:
      console.log('[SW] Unknown message type:', type);
  }
});

async function cacheGameData(gameData) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const response = new Response(JSON.stringify(gameData));
    await cache.put(url('game-data-cache'), response);
    console.log('[SW] Game data cached');
  } catch (error) {
    console.error('[SW] Failed to cache game data:', error);
  }
}

async function clearAllCaches() {
  try {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(name => caches.delete(name))
    );
    console.log('[SW] All caches cleared');
  } catch (error) {
    console.error('[SW] Failed to clear caches:', error);
  }
}

async function getCacheStatus() {
  try {
    const cacheNames = await caches.keys();
    const staticCache = await caches.open(STATIC_CACHE_NAME);
    const staticKeys = await staticCache.keys();
    
    return {
      caches: cacheNames.length,
      staticAssets: staticKeys.length,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('[SW] Failed to get cache status:', error);
    return { error: 'Failed to get cache status' };
  }
}

// Utility functions for IndexedDB operations
async function getPendingGameData() {
  // Placeholder for IndexedDB operations
  return [];
}

async function clearPendingGameData() {
  // Placeholder for IndexedDB operations
  console.log('[SW] Pending game data cleared');
}

// Error handling for unhandled promise rejections
self.addEventListener('unhandledrejection', (event) => {
  console.error('[SW] Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

// Log service worker version
console.log(`[SW] LingoQuest Service Worker ${CACHE_NAME} loaded`);

