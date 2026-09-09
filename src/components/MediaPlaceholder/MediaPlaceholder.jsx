import React, { memo, useEffect } from 'react';
import { imageCache } from '../../utils/cache';
import './MediaPlaceholder.css';

export const MediaPlaceholder = memo(({
  aspectRatio = '16 / 9',
  label = 'This is where the video will live.',
  src,
  alt = 'Featured media content',
  className = '',
  objectFit,
  imageStyle = {},
  style = {},
  priority = false,
  ...props
}) => {
  return (
    <div
      className={`media-placeholder-container ${className}`.trim()}
      style={{ aspectRatio, ...style }}
      role="region"
      aria-label="Video presentation placeholder"
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="media-placeholder-image"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          style={{
            ...(objectFit ? { objectFit } : {}),
            ...imageStyle
          }}
        />
      ) : (
        <div className="media-placeholder-content">
          <span className="media-placeholder-label">{label}</span>
        </div>
      )}
    </div>
  );
});

MediaPlaceholder.displayName = 'MediaPlaceholder';

export default MediaPlaceholder;
