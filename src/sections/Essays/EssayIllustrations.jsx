import React from 'react';

/**
 * Editorial SVG Illustrations
 * Clean, minimal line-art vectors designed as secondary editorial illustrations.
 * Bounded optical dimensions, inheriting or defaulting to #C4C4C4.
 */

export const SystemsLoopIllustration = ({ className = '', size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Interlocking feedback loop nodes & orbital flow */}
    <circle cx="22" cy="32" r="14" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="42" cy="32" r="14" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="22" cy="32" r="4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="42" cy="32" r="4" stroke="currentColor" strokeWidth="1.5" />
    <line x1="22" y1="18" x2="42" y2="18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
    <line x1="22" y1="46" x2="42" y2="46" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
  </svg>
);

export const FocalLensIllustration = ({ className = '', size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Concentric inquiry lens with crosshair calibration marks */}
    <circle cx="30" cy="30" r="18" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="30" cy="30" r="10" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="30" cy="30" r="2.5" fill="currentColor" />
    <line x1="30" y1="6" x2="30" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="30" y1="50" x2="30" y2="54" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="6" y1="30" x2="10" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="50" y1="30" x2="54" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M43 43L56 56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const MentalModelIllustration = ({ className = '', size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Multi-tier isometric planes showing structured layered thinking */}
    <path d="M32 10L52 20L32 30L12 20Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M12 28L32 38L52 28" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeDasharray="3 3" />
    <path d="M12 36L32 46L52 36" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="32" y1="30" x2="32" y2="46" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const EditorialStructureIllustration = ({ className = '', size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Editorial typographic grid and proportions */}
    <rect x="12" y="12" width="40" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" />
    <line x1="12" y1="26" x2="52" y2="26" stroke="currentColor" strokeWidth="1.5" />
    <line x1="28" y1="26" x2="28" y2="52" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
    <line x1="18" y1="34" x2="24" y2="34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="18" y1="40" x2="24" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="34" y1="34" x2="46" y2="34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="34" y1="40" x2="42" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="34" y1="46" x2="44" y2="46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
