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

  // Sync class on document.body for deep CSS blanking
  useEffect(() => {
    if (isShieldActive) {
      document.body.classList.add('content-shield-active');
    } else {
      document.body.classList.remove('content-shield-active');
    }
  }, [isShieldActive]);

  useEffect(() => {
    // 1. Right-Click / Context Menu Prevention
    const handleContextMenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
      showToast('🔒 Right-click and saving images are disabled');
      return false;
    };

    // 2. Drag & Drop Prevention
    const handleDragStart = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
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
        showToast('🔒 Screenshots are disabled');
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
          showToast('🔒 Screenshot capture is disabled');
          return;
        }
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

    // 4. Wipe clipboard on keyup if PrintScreen was released
    const handleKeyUp = (e) => {
      if (e.key === 'PrintScreen' || e.code === 'PrintScreen') {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('').catch(() => {});
        }
      }
    };

    // 5. Anti-Snipping Tool & Window Defocus Shields:
    // When Snipping Tool, Snip & Sketch, or screen grab opens, browser window loses focus.
    const handleWindowBlur = () => {
      setIsShieldActive(true);
    };

    const handleWindowFocus = () => {
      setIsShieldActive(false);
    };

    // When the mouse leaves the browser window (e.g. moving cursor to taskbar to click Snipping Tool)
    const handleMouseLeave = () => {
      setIsShieldActive(true);
    };

    const handleMouseEnter = () => {
      if (document.hasFocus()) {
        setIsShieldActive(false);
      }
    };

    // When user clicks the shield, if document is focused, remove shield
    const handleShieldClick = () => {
      if (document.hasFocus()) {
        setIsShieldActive(false);
      }
    };

    // Continuous heartbeat check: if the browser window does not have focus, enforce shield!
    const focusHeartbeat = setInterval(() => {
      if (!document.hasFocus()) {
        setIsShieldActive(true);
      }
    }, 120);

    // 6. Copy Prevention
    const handleCopy = (e) => {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      const isInput = activeTag === 'input' || activeTag === 'textarea' || document.activeElement?.isContentEditable;
      if (!isInput) {
        e.preventDefault();
        showToast('🔒 Content copying is disabled');
      }
    };

    // 7. Visibility Change (Tab switch or minimize)
    const handleVisibilityChange = () => {
      if (document.hidden || document.visibilityState !== 'visible') {
        setIsShieldActive(true);
      }
    };

    document.addEventListener('contextmenu', handleContextMenu, true);
    document.addEventListener('dragstart', handleDragStart, true);
    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keyup', handleKeyUp, true);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('copy', handleCopy, true);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu, true);
      document.removeEventListener('dragstart', handleDragStart, true);
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('keyup', handleKeyUp, true);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('copy', handleCopy, true);
      clearInterval(focusHeartbeat);
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, [showToast]);

  return (
    <>
      {/* Full-screen opaque shield that blanks everything for snipping tools */}
      <div
        className={`content-protection-shield ${isShieldActive ? 'is-active' : ''}`}
        aria-hidden="true"
        onClick={() => {
          if (document.hasFocus()) {
            setIsShieldActive(false);
          }
        }}
      >
        <div className="content-protection-shield-badge">
          <span className="content-protection-lock-icon">🔒</span>
          <span>Protected Portfolio • Click anywhere to view</span>
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
