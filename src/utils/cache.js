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

  preload(src, idle = true) {
    if (!src || typeof window === 'undefined') return Promise.resolve(null);
    if (this.cache.has(src)) {
      return Promise.resolve(this.cache.get(src));
    }

    const loadTask = () =>
      new Promise((resolve) => {
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

    if (idle && 'requestIdleCallback' in window) {
      return new Promise((resolve) => {
        window.requestIdleCallback(() => resolve(loadTask()), { timeout: 3000 });
      });
    }

    return loadTask();
  }

  preloadAll(sources = [], idle = true) {
    return Promise.all(sources.map((src) => this.preload(src, idle)));
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
    const task = async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(urls.filter(Boolean));
      } catch (err) {
        // Ignore offline or CORS asset errors
      }
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(task, { timeout: 4000 });
    } else {
      setTimeout(task, 2500);
    }
  }
};

export default {
  imageCache,
  storageCache,
  browserCache
};
