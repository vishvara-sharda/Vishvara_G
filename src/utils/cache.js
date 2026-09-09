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
  }

  has(src) {
    return this.cache.has(src);
  }

  get(src) {
    return this.cache.get(src);
  }

  set(src, imgElement) {
    this.cache.set(src, imgElement);
  }

  preload(src) {
    if (!src || typeof window === 'undefined') return Promise.resolve(null);
    if (this.cache.has(src)) {
      return Promise.resolve(this.cache.get(src));
    }

    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;

      // When decoded or loaded, cache it
      if ('decode' in img) {
        img.decode()
          .then(() => {
            this.cache.set(src, img);
            resolve(img);
          })
          .catch(() => {
            // Fallback to standard onload
            img.onload = () => {
              this.cache.set(src, img);
              resolve(img);
            };
            img.onerror = () => resolve(null);
          });
      } else {
        img.onload = () => {
          this.cache.set(src, img);
          resolve(img);
        };
        img.onerror = () => resolve(null);
      }
    });
  }

  preloadAll(sources = []) {
    return Promise.all(sources.map((src) => this.preload(src)));
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
    if (typeof window === 'undefined') return;
    try {
      const store = storage === 'local' ? window.localStorage : window.sessionStorage;
      const item = {
        data,
        expires: ttlMs ? Date.now() + ttlMs : null
      };
      store.setItem(`pf_cache_${key}`, JSON.stringify(item));
    } catch {
      // Ignore quota errors
    }
  },

  remove(key, storage = 'session') {
    if (typeof window === 'undefined') return;
    try {
      const store = storage === 'local' ? window.localStorage : window.sessionStorage;
      store.removeItem(`pf_cache_${key}`);
    } catch {
      // Ignore
    }
  }
};

// 3. Browser Cache API Integration for Static Media
export const browserCache = {
  CACHE_NAME: 'portfolio-media-v1',

  async cacheUrls(urls = []) {
    if (typeof window === 'undefined' || !('caches' in window)) return;
    try {
      const cache = await window.caches.open(this.CACHE_NAME);
      await Promise.all(
        urls.map(async (url) => {
          try {
            const match = await cache.match(url);
            if (!match) {
              await cache.add(url);
            }
          } catch {
            // Ignore offline or CORS asset errors
          }
        })
      );
    } catch {
      // Cache API not available or blocked
    }
  }
};

export default {
  imageCache,
  storageCache,
  browserCache
};
