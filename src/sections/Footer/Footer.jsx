import React, { useState, useEffect, useRef, memo } from 'react';
import Section from '../../components/Section/Section';
import Container from '../../components/Container/Container';
import { storageCache, imageCache, browserCache } from '../../utils/cache';
import calciferPng from '../../assets/calcifer.png';
import sataoPng from '../../assets/satao.png';
import sadijinPng from '../../assets/sadijin.png';
import './Footer.css';

const NAME_GAME_ASSETS = [calciferPng, sataoPng, sadijinPng];
const DEFAULT_MESSAGE = "Hey, I love your design thinking and would love to connect.";
const MURMUR_CTA_MESSAGE = "Hey, I really liked the Murmur case study. I’d love to talk about the business side of the idea and how you approached solving the problem.";

const isMurmurCtaTriggered = () => {
  if (typeof window === 'undefined') return false;
  const urlParams = new URLSearchParams(window.location.search);
  return Boolean(
    window.__murmur_cta_active ||
    window.sessionStorage.getItem('murmur_cta_active') === 'true' ||
    urlParams.get('cta') === 'murmur' ||
    window.history.state?.fromMurmurCta
  );
};

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

  // Contact Form state: Conditionally populates Murmur CTA message only when explicitly triggered
  const [formData, setFormData] = useState(() => {
    // 1. Check if explicitly triggered by the Murmur business CTA interaction
    if (isMurmurCtaTriggered()) {
      return {
        name: '',
        email: '',
        message: MURMUR_CTA_MESSAGE,
        subject: 'Murmur — Business Discussion'
      };
    }

    // 2. Default state: when opened normally, from nav, or from any other project
    // Preserve custom user input if they typed a draft, otherwise provide DEFAULT_MESSAGE
    const cached = storageCache.get('footer_form_draft');
    if (cached && (cached.name || cached.email || (cached.message && cached.message !== MURMUR_CTA_MESSAGE))) {
      return {
        name: cached.name || '',
        email: cached.email || '',
        message: cached.message || DEFAULT_MESSAGE,
        subject: cached.subject || ''
      };
    }

    return {
      name: '',
      email: '',
      message: DEFAULT_MESSAGE,
      subject: ''
    };
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');

  // Persist form draft on edits (never persist the Murmur CTA message as a permanent draft)
  useEffect(() => {
    if (
      formData.name ||
      formData.email ||
      (formData.message &&
        formData.message !== DEFAULT_MESSAGE &&
        formData.message !== MURMUR_CTA_MESSAGE)
    ) {
      storageCache.set('footer_form_draft', formData, 1000 * 60 * 60); // 1 hour TTL
    }
  }, [formData]);

  // Listen for Murmur CTA event, Navbar direct contact click, or popstate
  useEffect(() => {
    const handleMurmurCta = (e) => {
      const msg = e.detail?.message || MURMUR_CTA_MESSAGE;
      const subj = e.detail?.subject || 'Murmur — Business Discussion';
      setFormData((prev) => ({
        ...prev,
        message: msg,
        subject: subj
      }));
    };

    const handleNavContact = () => {
      if (typeof window !== 'undefined') {
        delete window.__murmur_cta_active;
        window.sessionStorage.removeItem('murmur_cta_active');
        window.sessionStorage.removeItem('murmur_cta_message');
      }
      setFormData((prev) => ({
        ...prev,
        message: DEFAULT_MESSAGE,
        subject: ''
      }));
    };

    const handlePopState = () => {
      if (isMurmurCtaTriggered()) {
        setFormData((prev) => ({
          ...prev,
          message: MURMUR_CTA_MESSAGE,
          subject: 'Murmur — Business Discussion'
        }));
      }
    };

    window.addEventListener('murmur_cta_click', handleMurmurCta);
    window.addEventListener('prefill_contact', handleMurmurCta);
    window.addEventListener('nav_contact_click', handleNavContact);
    window.addEventListener('popstate', handlePopState);

    // If Murmur CTA is triggered on mount, ensure message is set and schedule cleanup
    if (isMurmurCtaTriggered()) {
      setFormData((prev) => ({
        ...prev,
        message: MURMUR_CTA_MESSAGE,
        subject: 'Murmur — Business Discussion'
      }));

      const cleanupTimer = setTimeout(() => {
        if (typeof window !== 'undefined') {
          delete window.__murmur_cta_active;
          window.sessionStorage.removeItem('murmur_cta_active');
          window.sessionStorage.removeItem('murmur_cta_message');

          if (window.location.search.includes('cta=murmur')) {
            const url = new URL(window.location.href);
            url.searchParams.delete('cta');
            window.history.replaceState(
              { fromMurmurCta: false },
              '',
              url.pathname + (url.search ? url.search : '') + (url.hash || '#contact')
            );
          }
        }
      }, 600);

      return () => {
        clearTimeout(cleanupTimer);
        window.removeEventListener('murmur_cta_click', handleMurmurCta);
        window.removeEventListener('prefill_contact', handleMurmurCta);
        window.removeEventListener('nav_contact_click', handleNavContact);
        window.removeEventListener('popstate', handlePopState);
      };
    }

    return () => {
      window.removeEventListener('murmur_cta_click', handleMurmurCta);
      window.removeEventListener('prefill_contact', handleMurmurCta);
      window.removeEventListener('nav_contact_click', handleNavContact);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Handle user inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
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
            _subject: formData.subject || `New Portfolio Message from ${formData.name.trim()}`,
            _template: 'table',
            _captcha: 'false'
          })
        }
      );

      const data = await response.json();

      if (response.ok && (data.success === 'true' || data.success === true)) {
        setStatus('success');
        setStatusMessage('Thank you! Your message has been sent.');
        setFormData({ name: '', email: '', message: DEFAULT_MESSAGE, subject: '' });
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
        <div className="footer-layout">
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
