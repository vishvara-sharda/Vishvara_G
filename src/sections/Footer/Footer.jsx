import React, { useState, useEffect, useRef, memo } from 'react';
import Section from '../../components/Section/Section';
import Container from '../../components/Container/Container';
import { storageCache, imageCache, browserCache } from '../../utils/cache';
import v1Svg from '../../assets/V_character_exact_transparent.svg';
import iSvg from '../../assets/I_character_transparent.svg';
import sSvg from '../../assets/S_character_transparent.svg';
import hSvg from '../../assets/H_character_transparent.svg';
import v2Svg from '../../assets/V_character_transparent.svg';
import a1Svg from '../../assets/A_character_transparent.svg';
import rSvg from '../../assets/R_character_transparent.svg';
import a2Svg from '../../assets/A_character_smile_transparent.svg';
import './Footer.css';

const NAME_GAME_ASSETS = [v1Svg, iSvg, sSvg, hSvg, v2Svg, a1Svg, rSvg, a2Svg];
const DEFAULT_MESSAGE = "Hey,\n\nI love your design and would love to connect with you.";

export const Footer = memo(({ onOpenNameGame }) => {
  // Idle pre-cache "What Is My Name?" assets when user reaches the footer
  useEffect(() => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        imageCache.preloadAll(NAME_GAME_ASSETS);
        browserCache.cacheUrls(NAME_GAME_ASSETS);
      }, { timeout: 4000 });
    } else {
      setTimeout(() => {
        imageCache.preloadAll(NAME_GAME_ASSETS);
        browserCache.cacheUrls(NAME_GAME_ASSETS);
      }, 2500);
    }
  }, []);
  // Contact Form state with cached session draft support
  const [formData, setFormData] = useState(() => {
    const cached = storageCache.get('footer_form_draft');
    if (cached && (cached.name || cached.email || cached.message)) {
      return cached;
    }
    return {
      name: '',
      email: '',
      message: ''
    };
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');

  // Persist form draft on edits
  useEffect(() => {
    if (formData.name || formData.email || (formData.message && formData.message !== DEFAULT_MESSAGE)) {
      storageCache.set('footer_form_draft', formData, 1000 * 60 * 60); // 1 hour TTL
    }
  }, [formData]);

  // Typewriter state for textarea
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [hasCompletedTyping, setHasCompletedTyping] = useState(false);
  const userInteractedRef = useRef(false);
  const footerRef = useRef(null);
  const timerRef = useRef(null);

  // Trigger typewriter inside textarea when section enters viewport
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setFormData((prev) => ({ ...prev, message: DEFAULT_MESSAGE }));
      setHasStartedTyping(true);
      setHasCompletedTyping(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStartedTyping) {
          setHasStartedTyping(true);
        }
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasStartedTyping]);

  // Typewriter execution inside textarea
  useEffect(() => {
    if (!hasStartedTyping || hasCompletedTyping) return;

    let charIndex = 0;
    timerRef.current = setInterval(() => {
      // If user started editing or focused, stop the animation immediately
      if (userInteractedRef.current) {
        clearInterval(timerRef.current);
        setHasCompletedTyping(true);
        return;
      }

      charIndex += 1;
      setFormData((prev) => ({
        ...prev,
        message: DEFAULT_MESSAGE.slice(0, charIndex)
      }));

      if (charIndex >= DEFAULT_MESSAGE.length) {
        clearInterval(timerRef.current);
        setHasCompletedTyping(true);
      }
    }, 28);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hasStartedTyping, hasCompletedTyping]);

  // Handle user inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message') {
      userInteractedRef.current = true;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleTextareaFocus = () => {
    userInteractedRef.current = true;
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      newErrors.name = 'Please enter your name';
    }

    if (!trimmedEmail) {
      newErrors.email = 'Please enter your email';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (!trimmedMessage) {
      newErrors.message = 'Please write your message';
    }

    return newErrors;
  };

  // Form Submission via FormSubmit.co
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus('sending');
    setStatusMessage('');

    try {
      const response = await fetch(
        'https://formsubmit.co/ajax/vishvara.ux@gmail.com',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            message: formData.message.trim(),
            _subject: `New Portfolio Message from ${formData.name.trim()}`,
            _template: 'table',
            _captcha: 'false'
          })
        }
      );

      const data = await response.json();

      if (response.ok && (data.success === 'true' || data.success === true)) {
        setStatus('success');
        setStatusMessage('Thank you! Your message has been sent.');
        setFormData({ name: '', email: '', message: '' });
        storageCache.remove('footer_form_draft');
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      setStatusMessage(
        'Unable to send right now. Please try again or reach out directly at vishvara.ux@gmail.com'
      );
    }
  };

  return (
    <Section
      as="footer"
      id="contact"
      paddingTop="default"
      paddingBottom="hero"
      className="footer-section"
    >
      <Container>
        <div ref={footerRef} className="footer-layout">
          {/* Left Column: The Final Question */}
          <div className="footer-left">
            <h2
              className={`footer-question ${onOpenNameGame ? 'footer-question--interactive' : ''}`}
              onClick={onOpenNameGame}
              role={onOpenNameGame ? 'button' : undefined}
              tabIndex={onOpenNameGame ? 0 : undefined}
              onKeyDown={(e) => {
                if (onOpenNameGame && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  onOpenNameGame();
                }
              }}
              title={onOpenNameGame ? 'Click to play and discover my name' : undefined}
            >
              What is my <span className="footer-name-highlight">name</span>?
            </h2>

            {onOpenNameGame && (
              <button
                type="button"
                className="footer-discover-link"
                onClick={onOpenNameGame}
                aria-label="Play interactive game to discover my name"
              >
                <span>Play to discover</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          </div>

          {/* Right Column: Contact Form with Typewritten Textarea */}
          <div className="footer-right">
            {/* Real Contact Form */}
            <form
              className="footer-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="footer-form-grid">
                {/* Name Field */}
                <div className="footer-field">
                  <label htmlFor="footer-name" className="footer-label">
                    Name
                  </label>
                  <input
                    id="footer-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    disabled={status === 'sending'}
                    className={`footer-input ${errors.name ? 'is-invalid' : ''}`}
                    autoComplete="name"
                    required
                  />
                  {errors.name && (
                    <span className="footer-field-error" role="alert">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email Field */}
                <div className="footer-field">
                  <label htmlFor="footer-email" className="footer-label">
                    Email
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your email"
                    disabled={status === 'sending'}
                    className={`footer-input ${errors.email ? 'is-invalid' : ''}`}
                    autoComplete="email"
                    required
                  />
                  {errors.email && (
                    <span className="footer-field-error" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Message Field with Typewriter Effect */}
              <div className="footer-field footer-field--full">
                <label htmlFor="footer-message" className="footer-label">
                  Message
                </label>
                <textarea
                  id="footer-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={handleTextareaFocus}
                  placeholder="Write your message…"
                  disabled={status === 'sending'}
                  className={`footer-textarea ${errors.message ? 'is-invalid' : ''}`}
                  required
                />
                {errors.message && (
                  <span className="footer-field-error" role="alert">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Status Notifications */}
              {status === 'success' && (
                <div className="footer-status-alert is-success" role="status">
                  {statusMessage}
                </div>
              )}

              {status === 'error' && (
                <div className="footer-status-alert is-error" role="alert">
                  {statusMessage}
                </div>
              )}

              {/* Form Action Row: Send or LinkedIn */}
              <div className="footer-form-actions">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="footer-submit-btn"
                >
                  {status === 'sending' ? 'Sending…' : 'Send'}
                </button>

                <div className="footer-secondary-wrapper">
                  <span className="footer-secondary-separator">or</span>
                  <a
                    href="https://www.linkedin.com/in/vishvara-gandharv/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-secondary-link"
                    aria-label="Connect with Vishvara on LinkedIn"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p className="footer-tagline">I design products that tell stories.</p>
          <p className="footer-copyright">
            © {new Date().getFullYear()} · Made with{' '}
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="footer-heart-icon"
              aria-label="love"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            , by{' '}
            <button
              type="button"
              onClick={onOpenNameGame}
              className="footer-name-easter-egg"
              aria-label="Discover who created this portfolio"
            >
              yours truly
            </button>
          </p>
        </div>
      </Container>
    </Section>
  );
});

Footer.displayName = 'Footer';

export default Footer;
