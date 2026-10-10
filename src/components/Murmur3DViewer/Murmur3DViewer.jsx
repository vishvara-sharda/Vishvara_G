import React, { useState, useRef, useEffect, memo } from 'react';
import '@google/model-viewer';
import manGlbUrl from '../Pictures/Projects/Murmur/models/Man.glb';
import womanGlbUrl from '../Pictures/Projects/Murmur/models/Woman.glb';
import './Murmur3DViewer.css';

/**
 * Single 3D Model Viewport Card using @google/model-viewer
 */
const ModelCard = memo(function ModelCard({
  title,
  subtitle,
  src,
  poster,
  specs = [],
  initialOrbit = '0deg 75deg 105%',
}) {
  const viewerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const handleProgress = (event) => {
      const progress = Math.round((event.detail.totalProgress || 0) * 100);
      setLoadProgress(progress);
      if (progress >= 100) {
        setIsLoading(false);
      }
    };

    const handleLoad = () => {
      setIsLoading(false);
    };

    viewer.addEventListener('progress', handleProgress);
    viewer.addEventListener('load', handleLoad);

    return () => {
      viewer.removeEventListener('progress', handleProgress);
      viewer.removeEventListener('load', handleLoad);
    };
  }, []);

  const handleResetCamera = () => {
    if (viewerRef.current) {
      viewerRef.current.cameraOrbit = initialOrbit;
      viewerRef.current.cameraTarget = 'auto auto auto';
      viewerRef.current.fieldOfView = 'auto';
    }
  };

  const handleToggleAutoRotate = () => {
    if (viewerRef.current) {
      const next = !isAutoRotating;
      viewerRef.current.autoRotate = next;
      setIsAutoRotating(next);
    }
  };

  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`murmur-3d-card ${isFullscreen ? 'is-fullscreen' : ''}`}
    >
      <div className="murmur-3d-stage">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="murmur-3d-loading-overlay">
            <div className="murmur-3d-spinner" />
            <span className="murmur-3d-loading-text">
              Loading 3D model {loadProgress > 0 ? `${loadProgress}%` : '...'}
            </span>
          </div>
        )}

        {/* 3D Model Viewer Web Component */}
        <model-viewer
          ref={viewerRef}
          src={src}
          poster={poster}
          alt={`Interactive 3D model of Murmur ${title}`}
          camera-controls
          auto-rotate
          auto-rotate-delay="2500"
          rotation-per-second="24deg"
          shadow-intensity="1.4"
          shadow-softness="0.9"
          exposure="1.08"
          camera-orbit={initialOrbit}
          touch-action="pan-y"
          ar
          ar-modes="webxr scene-viewer quick-look"
          interaction-prompt="auto"
          className="murmur-3d-canvas"
        />

        {/* Floating Controls Overlay */}
        <div className="murmur-3d-toolbar" aria-label="3D Controls">
          <button
            type="button"
            className="murmur-3d-tool-btn"
            onClick={handleResetCamera}
            title="Reset Camera View"
            aria-label="Reset camera view"
          >
            ↺ Reset
          </button>
          <button
            type="button"
            className={`murmur-3d-tool-btn ${isAutoRotating ? 'is-active' : ''}`}
            onClick={handleToggleAutoRotate}
            title={isAutoRotating ? 'Pause rotation' : 'Start auto-rotation'}
            aria-label={isAutoRotating ? 'Pause rotation' : 'Start auto-rotation'}
          >
            {isAutoRotating ? '⏸ Pause' : '▶ Rotate'}
          </button>
          <button
            type="button"
            className="murmur-3d-tool-btn"
            onClick={handleToggleFullscreen}
            title="Toggle Fullscreen"
            aria-label="Toggle fullscreen view"
          >
            {isFullscreen ? '✕ Exit' : '⛶ Fullscreen'}
          </button>
        </div>
      </div>

      {/* Footer Specs / Hints */}
      <div className="murmur-3d-card-footer">
        <div className="murmur-3d-specs">
          {specs.map((spec, i) => (
            <span key={i} className="murmur-3d-spec-badge">
              {spec}
            </span>
          ))}
        </div>
        <p className="murmur-3d-interaction-hint">
          Drag to orbit · Pinch or scroll to zoom · Double tap to focus
        </p>
      </div>
    </div>
  );
});

/**
 * Main Murmur 3D Viewport Section
 */
export const Murmur3DViewer = memo(function Murmur3DViewer() {
  const [activeTab, setActiveTab] = useState('both'); // 'woman' | 'man' | 'both'

  return (
    <section className="murmur-3d-section" id="3d-models" aria-labelledby="heading-3d-models">
      <div className="murmur-3d-header">
        <h2 id="heading-3d-models" className="murmur-3d-heading">
          explore <span className="murmur-heading-accent">Murmur</span> in 3D
        </h2>

        {/* View Switcher Tabs */}
        <div className="murmur-3d-tab-bar" role="tablist" aria-label="3D model views">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'both'}
            className={`murmur-3d-tab ${activeTab === 'both' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('both')}
          >
            Both Models
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'woman'}
            className={`murmur-3d-tab ${activeTab === 'woman' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('woman')}
          >
            Woman Model
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'man'}
            className={`murmur-3d-tab ${activeTab === 'man' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('man')}
          >
            Man Model
          </button>
        </div>
      </div>

      {/* Grid of 3D Models */}
      <div className={`murmur-3d-grid mode-${activeTab}`}>
        {(activeTab === 'both' || activeTab === 'woman') && (
          <ModelCard
            title="Woman Doll"
            subtitle="Mother Figure"
            src={womanGlbUrl}
            initialOrbit="0deg 75deg 105%"
            specs={['Soft Silicone Belly', 'Heating Assembly', 'Touch Sensor']}
          />
        )}
        {(activeTab === 'both' || activeTab === 'man') && (
          <ModelCard
            title="Man Doll"
            subtitle="Partner Figure"
            src={manGlbUrl}
            initialOrbit="0deg 75deg 105%"
            specs={['Palm-sized Form Factor', 'Breathing Bladder', 'Vibration Motor']}
          />
        )}
      </div>
    </section>
  );
});

export default Murmur3DViewer;
