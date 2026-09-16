import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import Container from '../Container/Container';
import './Navbar.css';

const NAV_ITEMS = [
  { label: 'Work', targetId: 'projects' },
  { label: 'Essays', targetId: 'essays' },
  { label: 'Contacts', targetId: 'contact' }
];

export const Navbar = memo(() => {
  const [activeSection, setActiveSection] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  // Smooth scroll handler with offset for sticky navbar
  const scrollToTarget = useCallback((targetId, e) => {
    if (e) e.preventDefault();
    setIsMobileMenuOpen(false);

    if (targetId === 'contact') {
      window.dispatchEvent(new CustomEvent('nav_contact_click'));
    }

    const isSubpage =
      window.location.pathname.startsWith('/case-study') ||
      window.location.hash.startsWith('#/case-study') ||
      window.location.pathname.startsWith('/what-is-my-name') ||
      window.location.hash.startsWith('#/what-is-my-name') ||
      window.location.pathname.startsWith('/name');

    if (isSubpage) {
      const targetHash = targetId && targetId !== 'hero' ? `#${targetId}` : '';
      window.history.pushState({}, '', `/${targetHash}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
      setTimeout(() => {
        if (targetId === 'hero' || !targetId) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.getElementById(targetId);
          if (element) {
            const navHeight = 60;
            const elementTop = element.getBoundingClientRect().top;
            const targetPosition = elementTop + window.pageYOffset - navHeight;
            window.scrollTo({
              top: Math.max(0, targetPosition),
              behavior: 'smooth'
            });
          }
        }
      }, 50);
      return;
    }

    if (targetId === 'hero' || !targetId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const navHeight = 60;
      const elementTop = element.getBoundingClientRect().top;
      const targetPosition = elementTop + window.pageYOffset - navHeight;
      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth'
      });
    }
  }, []);

  // Active section detection & scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      // Toggle subtle border when scrolled
      setIsScrolled(window.scrollY > 20);

      const isSubpage =
        window.location.pathname.startsWith('/case-study') ||
        window.location.hash.startsWith('#/case-study') ||
        window.location.pathname.startsWith('/what-is-my-name') ||
        window.location.hash.startsWith('#/what-is-my-name') ||
        window.location.pathname.startsWith('/name');

      if (isSubpage) {
        setActiveSection(null);
        return;
      }

      // Check if near bottom of page -> activate Contact
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60;

      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      // Check from bottom section upward
      const offset = 140;
      const scrollPos = window.scrollY + offset;

      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.getElementById(item.targetId);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(item.targetId);
          return;
        }
      }

      // If above the first section (in Hero/Intro)
      setActiveSection(null);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <header
      ref={navRef}
      className={`portfolio-navbar ${isScrolled ? 'is-scrolled' : ''}`}
    >
      <Container className="navbar-container">
        {/* Left: Purple Five-Pointed Star Only */}
        <a
          href="#hero"
          onClick={(e) => scrollToTarget('hero', e)}
          className="navbar-brand"
          aria-label="Vishvara — Back to top"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="var(--color-accent, #E2A9F1)"
            xmlns="http://www.w3.org/2000/svg"
            className="navbar-star-icon"
            aria-hidden="true"
          >
            <path d="M12 2l2.9 6.26L21.8 9.27l-5 4.87 1.18 6.88L12 17.77l-5.98 3.25 1.18-6.88-5-4.87 6.9-1.01L12 2z" />
          </svg>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="navbar-desktop-nav" aria-label="Main Navigation">
          <ul className="navbar-links-list">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.targetId;
              return (
                <li key={item.targetId} className="navbar-link-item">
                  <a
                    href={`#${item.targetId}`}
                    onClick={(e) => scrollToTarget(item.targetId, e)}
                    className={`navbar-nav-link ${isActive ? 'is-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          className="navbar-mobile-toggle"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <span
            className={`navbar-toggle-line ${isMobileMenuOpen ? 'is-open' : ''}`}
          />
        </button>
      </Container>

      {/* Mobile Menu Drawer */}
      <div
        className={`navbar-mobile-drawer ${isMobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <ul className="navbar-mobile-list">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.targetId;
            return (
              <li key={item.targetId} className="navbar-mobile-item">
                <a
                  href={`#${item.targetId}`}
                  onClick={(e) => scrollToTarget(item.targetId, e)}
                  className={`navbar-mobile-link ${isActive ? 'is-active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
