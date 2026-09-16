/**
 * Multi-Tier Caching Utilities for Portfolio
 * 
 * 1. Image & Asset Memory Cache:
 *    Preloads and retains decoded HTMLImageElement instances in a singleton Map.
 *    Eliminates image decodes, refetches, and layout reflows on navigation.
 * 
 * 2. Storage Cache:
 *    Resilient wrapper around sessionStorage/localStorage with TTL expiration.
 *    Preserves user inputs (form drafts) and UI states across page switches.
 * 
 * 3. Browser Cache API Helper:
 *    Interfaces with window.caches to ensure heavy assets (like large SVGs)
 *    are cached persistently in the browser's CacheStorage.
 */

// 1. In-Memory Image Cache Singleton
class ImageCacheManager {
  constructor() {
    this.cache = new Map();
    this.pendingLoads = new Map();
  }

  has(src) {
    if (!src) return false;
    return this.cache.has(src);
  }

  get(src) {
    if (!src) return null;
    return this.cache.get(src);
  }

  set(src, imgElement) {
    if (!src) return;
    this.cache.set(src, imgElement);
  }

  preload(src, idle = false) {
    if (!src || typeof window === 'undefined') return Promise.resolve(null);
    if (this.cache.has(src)) {
      return Promise.resolve(this.cache.get(src));
    }
    if (this.pendingLoads.has(src)) {
      return this.pendingLoads.get(src);
    }

    const loadTask = () =>
      new Promise((resolve) => {
        const img = new Image();
        img.src = src;

        const onDone = (success) => {
          this.pendingLoads.delete(src);
          if (success) {
            this.cache.set(src, img);
            resolve(img);
          } else {
            resolve(null);
          }
        };

        if ('decode' in img) {
          img.decode()
            .then(() => onDone(true))
            .catch(() => {
              img.onload = () => onDone(true);
              img.onerror = () => onDone(false);
            });
        } else {
          img.onload = () => onDone(true);
          img.onerror = () => onDone(false);
        }
      });

    const promise = (idle && 'requestIdleCallback' in window)
      ? new Promise((resolve) => {
          window.requestIdleCallback(() => resolve(loadTask()), { timeout: 2000 });
        })
      : loadTask();

    this.pendingLoads.set(src, promise);
    return promise;
  }

  preloadAll(sources = [], idle = false) {
    return Promise.all(sources.filter(Boolean).map((src) => this.preload(src, idle)));
  }
}

export const imageCache = new ImageCacheManager();

// 2. Storage Cache (Local / Session with optional TTL)
export const storageCache = {
  get(key, storage = 'session') {
    if (typeof window === 'undefined') return null;
    try {
      const store = storage === 'local' ? window.localStorage : window.sessionStorage;
      const raw = store.getItem(`pf_cache_${key}`);
      if (!raw) return null;

      const item = JSON.parse(raw);
      if (item.expires && Date.now() > item.expires) {
        store.removeItem(`pf_cache_${key}`);
        return null;
      }
      return item.data;
    } catch {
      return null;
    }
  },

  set(key, data, ttlMs = null, storage = 'session') {
    if (typeof window === 'undefined') return false;
    try {
      const store = storage === 'local' ? window.localStorage : window.sessionStorage;
      const item = {
        data,
        expires: ttlMs ? Date.now() + ttlMs : null,
        timestamp: Date.now()
      };
      store.setItem(`pf_cache_${key}`, JSON.stringify(item));
      return true;
    } catch {
      return false;
    }
  },

  remove(key, storage = 'session') {
    if (typeof window === 'undefined') return;
    try {
      const store = storage === 'local' ? window.localStorage : window.sessionStorage;
      store.removeItem(`pf_cache_${key}`);
    } catch {
      // ignore
    }
  }
};

// 3. Browser Cache API Manager (CacheStorage)
const CACHE_NAME = 'portfolio-media-v1';

export const browserCache = {
  supported: typeof window !== 'undefined' && 'caches' in window,

  async cacheUrls(urls = []) {
    if (!this.supported || !urls.length) return;
    const cleanUrls = urls.filter(Boolean);
    try {
      const cache = await caches.open(CACHE_NAME);
      await Promise.allSettled(
        cleanUrls.map(async (url) => {
          try {
            const match = await cache.match(url);
            if (!match) {
              const res = await fetch(url, { mode: 'no-cors' });
              if (res && (res.ok || res.type === 'opaque')) {
                await cache.put(url, res);
              }
            }
          } catch {
            // Ignore individual fetch errors
          }
        })
      );
    } catch {
      // Ignore cache open error
    }
  },

  async has(url) {
    if (!this.supported || !url) return false;
    try {
      const cache = await caches.open(CACHE_NAME);
      const match = await cache.match(url);
      return Boolean(match);
    } catch {
      return false;
    }
  }
};

export default {
  imageCache,
  storageCache,
  browserCache
};
