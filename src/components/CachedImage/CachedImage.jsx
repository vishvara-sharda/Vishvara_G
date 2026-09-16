import React, { useState, useEffect, useRef, memo } from 'react';
import { imageCache, browserCache } from '../../utils/cache';
import './CachedImage.css';

/**
 * CachedImage:
 * High-performance, zero-flicker cached image component.
 * 
 * Features:
 * - Instant synchronous render if asset is already in imageCache (no blink).
 * - Off-thread decoding via HTMLImageElement.decode().
 * - Background persistence into browser CacheStorage.
 * - Smooth fade-in crossfade once decoded.
 * - Shimmer skeleton state matching Murmur design system while network fetches.
 */
export const CachedImage = memo(function CachedImage({
  src,
  alt = '',
  className = '',
  wrapperClassName = '',
  aspectRatio,
  priority = false,
  objectFit = 'contain',
  style = {},
  wrapperStyle = {},
  onLoad,
  onError,
  ...props
}) {
  const isInitiallyCached = Boolean(src && imageCache.has(src));
  const [isLoaded, setIsLoaded] = useState(isInitiallyCached);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // If already loaded in browser cache upon render, mark loaded without flicker
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      if (src) imageCache.set(src, imgRef.current);
      setIsLoaded(true);
    }
  }, [src]);

  useEffect(() => {
    if (!src) return;

    if (imageCache.has(src)) {
      setIsLoaded(true);
      return;
    }

    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      imageCache.set(src, imgRef.current);
      setIsLoaded(true);
      return;
    }

    let isMounted = true;
    setIsLoaded(false);
    setHasError(false);

    // Trigger preloading and decoding in parallel
    imageCache.preload(src, !priority)
      .then((img) => {
        if (!isMounted) return;
        if (img) {
          setIsLoaded(true);
          if (onLoad) onLoad();
        } else {
          setHasError(true);
          if (onError) onError();
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setHasError(true);
        if (onError) onError();
      });

    // Also persist in browser CacheStorage
    browserCache.cacheUrls([src]);

    return () => {
      isMounted = false;
    };
  }, [src, priority, onLoad, onError]);

  return (
    <div
      className={`cached-image-wrapper ${isLoaded ? 'is-loaded' : 'is-loading'} ${hasError ? 'has-error' : ''} ${wrapperClassName}`.trim()}
      style={{
        ...(aspectRatio ? { aspectRatio } : {}),
        ...wrapperStyle
      }}
    >
      {!isLoaded && !hasError && (
        <div className="cached-image-shimmer" aria-hidden="true" />
      )}

      {src && !hasError && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`cached-image-element ${isLoaded ? 'is-visible' : 'is-hidden'} ${className}`.trim()}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => {
            if (!isLoaded) {
              imageCache.set(src, imgRef.current);
              setIsLoaded(true);
              if (onLoad) onLoad();
            }
          }}
          onError={() => {
            setHasError(true);
            if (onError) onError();
          }}
          style={{
            objectFit,
            ...style
          }}
          {...props}
        />
      )}

      {hasError && (
        <div className="cached-image-error" role="status" aria-label={alt || 'Image failed to load'}>
          <span className="cached-image-error-text">Failed to load</span>
        </div>
      )}
    </div>
  );
});

export default CachedImage;
