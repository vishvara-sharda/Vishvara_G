import React, { useState, useEffect, useCallback, useRef } from 'react';
import './ContentProtection.css';

export const ContentProtection = () => {
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [isShieldActive, setIsShieldActive] = useState(false);
  const toastTimeoutRef = useRef(null);

  const showToast = useCallback((message = "No, can't do.") => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ visible: true, message });
    toastTimeoutRef.current = setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 2200);
  }, []);

  // Sync class on document.body for image-specific screenshot shield
  useEffect(() => {
    if (isShieldActive) {
      document.body.classList.add('content-shield-active');
    } else {
      document.body.classList.remove('content-shield-active');
    }
  }, [isShieldActive]);

  useEffect(() => {
    // 1. Right-Click Prevention strictly on pictures and media
    const handleContextMenu = (e) => {
      const isImageOrMedia = e.target.closest(
        'img, video, picture, canvas, svg, .cached-image-wrapper, .project-video-wrapper, .personal-gallery-card, .media-placeholder-wrapper, .hero-media-wrapper'
      );
      if (isImageOrMedia) {
        e.preventDefault();
        e.stopPropagation();
        showToast("No, can't do.");
        return false;
      }
    };

    // 2. Drag & Drop Prevention on pictures
    const handleDragStart = (e) => {
      const isImageOrMedia = e.target.closest(
        'img, video, picture, canvas, svg, .cached-image-wrapper, .project-video-wrapper, .personal-gallery-card, .media-placeholder-wrapper, .hero-media-wrapper'
      );
      if (isImageOrMedia) {
        e.preventDefault();
        e.stopPropagation();
        showToast("No, can't do.");
        return false;
      }
    };

    // 3. Intercept Snipping Tool & Screenshot Shortcuts at KeyDown
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      const isInput = activeTag === 'input' || activeTag === 'textarea' || document.activeElement?.isContentEditable;

      // PrintScreen / PrtScn key (Windows & Linux)
      if (e.key === 'PrintScreen' || e.code === 'PrintScreen') {
        e.preventDefault();
        setIsShieldActive(true);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('').catch(() => {});
        }
        showToast("No, can't do.");
        return;
      }

      // Windows Snipping Tool (Win + Shift + S), Mac Screen Capture (Cmd + Shift + 3/4/5), or Shift + S
      if (!isInput) {
        if (
          (e.shiftKey && (e.key === 's' || e.key === 'S' || e.code === 'KeyS')) ||
          (e.metaKey && e.shiftKey) ||
          e.key === 'Meta'
        ) {
          setIsShieldActive(true);
          showToast("No, can't do.");
          return;
        }
      }

      // Ctrl/Cmd + S (Save Page / Save Image)
      if (cmdOrCtrl && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        showToast("No, can't do.");
        return;
      }

      // Ctrl/Cmd + P (Print / Save as PDF)
      if (cmdOrCtrl && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        showToast("No, can't do.");
        return;
      }
    };

    // 4. Wipe clipboard on keyup if PrintScreen was released
    const handleKeyUp = (e) => {
      if (e.key === 'PrintScreen' || e.code === 'PrintScreen') {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('').catch(() => {});
        }
      }
    };

    // 5. Anti-Snipping Tool: When snipping tool captures focus, shield pictures
    const handleWindowBlur = () => {
      setIsShieldActive(true);
    };

    const handleWindowFocus = () => {
      setIsShieldActive(false);
    };

    // 6. Tab visibility change (minimize or switch tab)
    const handleVisibilityChange = () => {
      if (document.hidden || document.visibilityState !== 'visible') {
        setIsShieldActive(true);
      } else {
        setIsShieldActive(false);
      }
    };

    document.addEventListener('contextmenu', handleContextMenu, true);
    document.addEventListener('dragstart', handleDragStart, true);
    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keyup', handleKeyUp, true);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu, true);
      document.removeEventListener('dragstart', handleDragStart, true);
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('keyup', handleKeyUp, true);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, [showToast]);

  return (
    <>
      {/* Toast Notification */}
      <aside
        className={`content-protection-toast ${toast.visible ? 'is-visible' : ''}`}
        role="status"
        aria-live="polite"
      >
        <div className="content-protection-toast-content">
          <span>{toast.message}</span>
        </div>
      </aside>
    </>
  );
};

export default ContentProtection;
