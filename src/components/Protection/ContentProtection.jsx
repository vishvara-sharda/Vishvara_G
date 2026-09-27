import React, { useState, useEffect, useCallback, useRef } from 'react';
import './ContentProtection.css';

export const ContentProtection = () => {
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [isShieldActive, setIsShieldActive] = useState(false);
  const toastTimeoutRef = useRef(null);

  const showToast = useCallback((message) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ visible: true, message });
    toastTimeoutRef.current = setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 2200);
  }, []);

  useEffect(() => {
    // 1. Prevent Right-Click / Context Menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      showToast('🔒 Right-click and saving images are disabled');
    };

    // 2. Prevent Drag & Drop of Images and Media
    const handleDragStart = (e) => {
      e.preventDefault();
    };

    // 3. Prevent Screenshot & Save Keyboard Shortcuts
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // PrintScreen key
      if (e.key === 'PrintScreen' || e.code === 'PrintScreen') {
        e.preventDefault();
        setIsShieldActive(true);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('').catch(() => {});
        }
        showToast('🔒 Screenshots are disabled');
        setTimeout(() => setIsShieldActive(false), 1500);
        return;
      }

      // Ctrl/Cmd + S (Save Page)
      if (cmdOrCtrl && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        showToast('🔒 Saving page is disabled');
        return;
      }

      // Ctrl/Cmd + P (Print / Save as PDF)
      if (cmdOrCtrl && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        showToast('🔒 Printing is disabled');
        return;
      }

      // Ctrl/Cmd + U (View Source)
      if (cmdOrCtrl && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        showToast('🔒 Source viewing is disabled');
        return;
      }

      // F12 or Inspect shortcuts
      if (
        e.key === 'F12' ||
        (cmdOrCtrl && e.shiftKey && ['i', 'I', 'j', 'J', 'c', 'C'].includes(e.key))
      ) {
        e.preventDefault();
        showToast('🔒 Developer tools shortcut is disabled');
        return;
      }
    };

    // 4. Overwrite clipboard on PrintScreen keyup as well (OS-level backup)
    const handleKeyUp = (e) => {
      if (e.key === 'PrintScreen' || e.code === 'PrintScreen') {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('').catch(() => {});
        }
      }
    };

    // 5. Anti-Snipping Tool Defense:
    // When snipping tools (Win+Shift+S, Mac grab) activate, window loses focus.
    const handleWindowBlur = () => {
      setIsShieldActive(true);
    };

    const handleWindowFocus = () => {
      setIsShieldActive(false);
    };

    const handleUserInteraction = () => {
      setIsShieldActive(false);
    };

    // 6. Prevent Copying unless inside an input/textarea
    const handleCopy = (e) => {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      const isInput = activeTag === 'input' || activeTag === 'textarea' || document.activeElement?.isContentEditable;
      if (!isInput) {
        e.preventDefault();
        showToast('🔒 Content copying is disabled');
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('mousemove', handleUserInteraction);
    window.addEventListener('pointerdown', handleUserInteraction);
    document.addEventListener('copy', handleCopy);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('mousemove', handleUserInteraction);
      window.removeEventListener('pointerdown', handleUserInteraction);
      document.removeEventListener('copy', handleCopy);
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, [showToast]);

  return (
    <>
      {/* Anti-screenshot & defocus shield */}
      <div
        className={`content-protection-shield ${isShieldActive ? 'is-active' : ''}`}
        aria-hidden="true"
      >
        <div className="content-protection-shield-badge">
          <span className="content-protection-lock-icon">🔒</span>
          <span>Content Protected • Click to Resume</span>
        </div>
      </div>

      {/* Discrete security toast */}
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
