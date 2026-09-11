import React, { memo } from 'react';
import Container from '../Container/Container';
import './Skeleton.css';

export const PortfolioSkeleton = memo(() => {
  return (
    <div
      className="portfolio-skeleton-root"
      role="status"
      aria-busy="true"
      aria-label="Loading portfolio content"
    >
      {/* 1. Navbar Skeleton */}
      <header className="sk-navbar">
        <Container>
          <div className="sk-navbar-inner">
            <div className="sk-navbar-star skeleton-shimmer-base" />
            <nav className="sk-navbar-links" aria-hidden="true">
              <div className="sk-navbar-link-pill skeleton-shimmer-base" />
              <div className="sk-navbar-link-pill skeleton-shimmer-base" />
              <div className="sk-navbar-link-pill skeleton-shimmer-base" />
            </nav>
            <div className="sk-navbar-mobile-toggle skeleton-shimmer-base" />
          </div>
        </Container>
      </header>

      {/* 2. Hero Skeleton */}
      <section className="sk-hero-section">
        <Container>
          <div className="sk-hero-title-group">
            <div className="sk-hero-title-pill skeleton-shimmer-base" />
            <div className="sk-hero-subtitle-pill skeleton-shimmer-base" />
          </div>
          <div className="sk-hero-media skeleton-shimmer-base" />
          <div className="sk-hero-cta skeleton-shimmer-base" />
        </Container>
      </section>

      {/* 3. Question Introduction Skeleton */}
      <section className="sk-question-section">
        <Container>
          <div className="sk-question-lead skeleton-shimmer-base" style={{ margin: '0 auto var(--space-8)' }} />
          <div className="sk-question-sequence">
            <div className="sk-q-word-1 skeleton-shimmer-base" />
            <div className="sk-q-word-2 skeleton-shimmer-base" />
            <div className="sk-q-word-3 skeleton-shimmer-base" />
            <div className="sk-q-word-4 skeleton-shimmer-base" />
            <div className="sk-q-word-5 skeleton-shimmer-base" />
            <div className="sk-q-word-6 skeleton-shimmer-base" />
          </div>
        </Container>
      </section>

      {/* 4. Projects Skeleton */}
      <section className="sk-projects-section">
        <Container>
          <div className="sk-projects-container-layout">
            <div className="sk-projects-grid">
              {[1, 2].map((projId) => (
                <div key={projId} className="sk-project-bento">
                  <div className="sk-project-info-block">
                    <div className="sk-project-title-pill skeleton-shimmer-base" />
                    <div className="sk-project-tagline-pill skeleton-shimmer-base" />
                    <div className="sk-project-media-box skeleton-shimmer-base" />
                    <div className="sk-project-about-line skeleton-shimmer-base" />
                  </div>
                  <div className="sk-project-qa-row">
                    <div className="sk-project-qa-card sk-project-qa-1">
                      <div className="sk-qa-title skeleton-shimmer-base" />
                      <div className="sk-qa-body skeleton-shimmer-base" />
                    </div>
                    <div className="sk-project-qa-card sk-project-qa-2">
                      <div className="sk-qa-title skeleton-shimmer-base" />
                      <div className="sk-qa-body skeleton-shimmer-base" />
                    </div>
                    <div className="sk-project-qa-card sk-project-qa-3">
                      <div className="sk-qa-title skeleton-shimmer-base" />
                      <div className="sk-qa-body skeleton-shimmer-base" />
                    </div>
                  </div>
                  <div className="sk-project-cta-full skeleton-shimmer-base" />
                </div>
              ))}
            </div>

            <header className="sk-projects-header">
              <div className="sk-projects-sticky-title-wrap">
                <div className="sk-projects-title-pill-vertical skeleton-shimmer-base" />
              </div>
            </header>
          </div>
        </Container>
      </section>

      {/* 5. Mind at Heart (DesignerMind) Skeleton */}
      <section className="sk-mind-section">
        <Container>
          <div className="sk-mind-header skeleton-shimmer-base" style={{ margin: '0 auto var(--space-8)' }} />
          <div className="sk-mind-canvas">
            <div className="sk-mind-center-node skeleton-shimmer-base" />
            <div className="sk-mind-cluster-node sk-mc-1 skeleton-shimmer-base" />
            <div className="sk-mind-cluster-node sk-mc-2 skeleton-shimmer-base" />
            <div className="sk-mind-cluster-node sk-mc-3 skeleton-shimmer-base" />
            <div className="sk-mind-cluster-node sk-mc-4 skeleton-shimmer-base" />
          </div>
        </Container>
      </section>

      {/* 6. Essays Skeleton */}
      <section className="sk-essays-section">
        <Container>
          <div className="sk-essays-title skeleton-shimmer-base" />
          <div className="sk-essays-grid">
            {[1, 2].map((essayId) => (
              <div key={essayId} className="sk-essay-card">
                <div className="sk-essay-year skeleton-shimmer-base" />
                <div className="sk-essay-image-box skeleton-shimmer-base" />
                <div className="sk-essay-title-line skeleton-shimmer-base" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. Observations (Testimonials) Skeleton */}
      <section className="sk-testimonials-section">
        <Container>
          <div className="sk-testimonials-title skeleton-shimmer-base" />
          <div className="sk-testimonials-grid">
            {[1, 2, 3, 4].map((testId) => (
              <div key={testId} className="sk-test-card">
                <div className="sk-test-badge skeleton-shimmer-base" />
                <div className="sk-test-quote-1 skeleton-shimmer-base" />
                <div className="sk-test-quote-2 skeleton-shimmer-base" />
                <div className="sk-test-author-row">
                  <div className="sk-test-avatar skeleton-shimmer-base" />
                  <div className="sk-test-name skeleton-shimmer-base" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 8. Personal Gallery Skeleton */}
      <section className="sk-gallery-section">
        <Container>
          <div className="sk-gallery-title skeleton-shimmer-base" />
          <div className="sk-gallery-grid">
            {[1, 2, 3, 4, 5, 6, 7].map((galleryId) => (
              <div key={galleryId} className="sk-gallery-card skeleton-shimmer-base" />
            ))}
          </div>
        </Container>
      </section>

      {/* 9. Contact / Footer Skeleton */}
      <footer className="sk-footer-section">
        <Container>
          <div className="sk-footer-layout">
            <div className="sk-footer-question skeleton-shimmer-base" />
            <div className="sk-footer-form">
              <div className="sk-footer-row">
                <div className="sk-footer-input skeleton-shimmer-base" />
                <div className="sk-footer-input skeleton-shimmer-base" />
              </div>
              <div className="sk-footer-textarea skeleton-shimmer-base" />
              <div className="sk-footer-submit skeleton-shimmer-base" />
            </div>
          </div>
          <div className="sk-footer-bottom-bar">
            <div className="sk-footer-tagline skeleton-shimmer-base" />
            <div className="sk-footer-copyright skeleton-shimmer-base" />
          </div>
        </Container>
      </footer>
    </div>
  );
});

PortfolioSkeleton.displayName = 'PortfolioSkeleton';

export const CaseStudySkeleton = memo(() => {
  return (
    <div
      className="portfolio-skeleton-root"
      role="status"
      aria-busy="true"
      aria-label="Loading case study content"
    >
      <header className="sk-navbar">
        <Container>
          <div className="sk-navbar-inner">
            <div className="sk-navbar-star skeleton-shimmer-base" />
            <nav className="sk-navbar-links" aria-hidden="true">
              <div className="sk-navbar-link-pill skeleton-shimmer-base" />
              <div className="sk-navbar-link-pill skeleton-shimmer-base" />
            </nav>
            <div className="sk-navbar-mobile-toggle skeleton-shimmer-base" />
          </div>
        </Container>
      </header>

      <section className="sk-case-study">
        <Container>
          <div className="sk-cs-nav">
            <div className="sk-cs-back skeleton-shimmer-base" />
            <div className="sk-cs-badge skeleton-shimmer-base" />
          </div>
          <div className="sk-cs-header">
            <div className="sk-cs-title skeleton-shimmer-base" />
            <div className="sk-cs-tagline skeleton-shimmer-base" />
          </div>
          <div className="sk-cs-hero-media skeleton-shimmer-base" />
          <div className="sk-cs-body-block">
            <div className="sk-cs-text-1 skeleton-shimmer-base" />
            <div className="sk-cs-text-2 skeleton-shimmer-base" />
            <div className="sk-cs-text-3 skeleton-shimmer-base" />
          </div>
        </Container>
      </section>
    </div>
  );
});

CaseStudySkeleton.displayName = 'CaseStudySkeleton';

export default PortfolioSkeleton;

