import React, { useEffect, memo, useCallback } from 'react';
import Container from '../../components/Container/Container';
import group30Img from '../../components/Pictures/Projects/Margdarshak/Group 30.jpg';
import group31Img from '../../components/Pictures/Projects/Margdarshak/Group 31.jpg';
import group32Img from '../../components/Pictures/Projects/Margdarshak/Group 32.jpg';
import group33Img from '../../components/Pictures/Projects/Margdarshak/Group 33.jpg';
import group34Img from '../../components/Pictures/Projects/Margdarshak/Group 34.jpg';
import { imageCache, browserCache } from '../../utils/cache';
import './CaseStudy.css';

const MARGDARSHAK_ROLE_IMAGES = [
  { src: group30Img, alt: 'User research interview with community family' },
  { src: group31Img, alt: 'Field research team discussion' },
  { src: group32Img, alt: 'Community immersion and user interaction' },
  { src: group33Img, alt: 'On-ground user study and feedback interview' },
  { src: group34Img, alt: 'In-home interview with community members' }
];

/**
 * Case Studies Project Meta Registry
 * Allows additional case studies and project-specific content to plug in seamlessly.
 */
const CASE_STUDIES_METADATA = {
  murmur: {
    title: 'Murmur',
    tagline: 'Helping families claim govt schemes.',
    roleSummary: (
      <>
        Product <span className="case-study-text-accent">Designer</span> &{' '}
        <span className="case-study-text-accent">Lead</span> UX Researcher in a team of 9
      </>
    ),
    roleImages: MARGDARSHAK_ROLE_IMAGES,
    problem: (
      <>
        Families with{' '}
        <span className="case-study-text-accent">
          low income background struggle to save up for future and emergencies
        </span>
        , so how can we help them get emergency funds?
      </>
    )
  },
  margdarshak: {
    title: 'Margdarshak',
    tagline: 'Helping families claim govt schemes.',
    roleSummary: (
      <>
        Product <span className="case-study-text-accent">Designer</span> &{' '}
        <span className="case-study-text-accent">Lead</span> UX Researcher in a team of 9
      </>
    ),
    roleImages: MARGDARSHAK_ROLE_IMAGES,
    problem: (
      <>
        Families with{' '}
        <span className="case-study-text-accent">
          low income background struggle to save up for future and emergencies
        </span>
        , so how can we help them get emergency funds?
      </>
    )
  },
  default: {
    title: 'Project Case Study',
    tagline: 'Helping families claim govt schemes.',
    roleSummary: (
      <>
        Product <span className="case-study-text-accent">Designer</span> &{' '}
        <span className="case-study-text-accent">Lead</span> UX Researcher in a team of 9
      </>
    ),
    roleImages: MARGDARSHAK_ROLE_IMAGES,
    problem: (
      <>
        Families with{' '}
        <span className="case-study-text-accent">
          low income background struggle to save up for future and emergencies
        </span>
        , so how can we help them get emergency funds?
      </>
    )
  }
};

export const CaseStudy = memo(({ projectSlug = 'murmur', onNavigateBack }) => {
  const meta = CASE_STUDIES_METADATA[projectSlug?.toLowerCase()] || CASE_STUDIES_METADATA.default;

  // Scroll to top upon entering case study
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [projectSlug]);

  // Pre-cache case study research images into memory and browser cache
  useEffect(() => {
    const images = MARGDARSHAK_ROLE_IMAGES.map((img) => img.src);
    imageCache.preloadAll(images);
    browserCache.cacheUrls(images);
  }, []);

  const handleBack = useCallback((e) => {
    if (e) e.preventDefault();
    if (onNavigateBack) {
      onNavigateBack();
    } else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }, [onNavigateBack]);

  return (
    <div className="case-study-page">
      <Container>
        {/* Minimal Editorial Breadcrumb / Back Bar */}
        <nav className="case-study-nav-bar" aria-label="Breadcrumb">
          <button
            type="button"
            onClick={handleBack}
            className="case-study-back-btn"
            aria-label="Return to portfolio projects overview"
          >
            ← Back to Projects
          </button>
          <span className="case-study-category-badge">Case Study</span>
        </nav>

        {/* Case Study Hero Header */}
        <header className="case-study-header">
          <h1 className="case-study-project-title">{meta.title}</h1>
          <div className="case-study-meta-row">
            <p className="case-study-tagline">{meta.tagline}</p>
          </div>
        </header>

        {/* Main Case Study Editorial Flow */}
        <div className="case-study-content">
          {/* ================================================================
              1. THE PROBLEM
              ================================================================ */}
          <section className="case-study-section" id="problem" aria-labelledby="heading-problem">
            <h2 id="heading-problem" className="case-study-section-heading">
              The Problem
            </h2>
            <p className="case-study-body-text">
              {meta.problem || 'Families with low income background struggle to save up for future and emergencies, so how can we help them get emergency funds?'}
            </p>
            <div className="case-study-extension-slot" />
          </section>

          {/* ================================================================
              2. MY ROLE / SOLVING IT
              ================================================================ */}
          <section className="case-study-section" id="role" aria-labelledby="heading-role">
            <h2 id="heading-role" className="case-study-section-heading">
              My role · Solving it
            </h2>
            <p className="case-study-supporting-text">
              {meta.roleSummary}
            </p>
            {meta.roleImages && (
              <div className="case-study-media-grid" role="group" aria-label="Role research photographs">
                {meta.roleImages.map((img, idx) => (
                  <div key={idx} className="case-study-media-box">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="case-study-media-img"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="case-study-extension-slot" />
          </section>

          {/* ================================================================
              3. THE ANGLE I TOOK TO ANALYSE — BEEC FRAMEWORK & EMOTION MAPPING
              ================================================================ */}
          <section className="case-study-section" id="angle" aria-labelledby="heading-angle">
            <h2 id="heading-angle" className="case-study-section-heading">
              The angle I took to analyse
            </h2>
            <p className="case-study-supporting-text">
              I used the BEEC framework to understand how a person’s day-to-day environment influences their emotions, behaviour, and cognitive load.
            </p>

            {/* PART 1 — BEEC Framework Components */}
            <div className="beec-framework-group" role="region" aria-label="BEEC Framework Components">
              <div className="beec-blocks-row">
                <div className="beec-unit">
                  <div className="beec-box">
                    <span className="beec-letter">B</span>
                  </div>
                  <span className="beec-label">BEHAVIOUR</span>
                </div>
                <div className="beec-unit">
                  <div className="beec-box">
                    <span className="beec-letter">E</span>
                  </div>
                  <span className="beec-label">ENVIRONMENT</span>
                </div>
                <div className="beec-unit">
                  <div className="beec-box">
                    <span className="beec-letter">E</span>
                  </div>
                  <span className="beec-label">EMOTION</span>
                </div>
                <div className="beec-unit">
                  <div className="beec-box">
                    <span className="beec-letter">C</span>
                  </div>
                  <span className="beec-label">COGNITIVE LOAD</span>
                </div>
              </div>
            </div>

            {/* PART 2 — BEEC as a System (Causal Flow) */}
            <div className="beec-system-container" role="region" aria-label="BEEC System Interaction Diagram">
              <span className="beec-system-caption">System Interaction</span>
              <div className="beec-system-flow">
                <div className="beec-system-node">
                  <span className="beec-node-step">01</span>
                  <span className="beec-node-title">Environment</span>
                </div>

                <div className="beec-system-connector" aria-hidden="true">
                  <span className="beec-connector-tag">triggers</span>
                  <span className="beec-connector-line" />
                  <span className="beec-connector-arrow">→</span>
                </div>

                <div className="beec-system-node">
                  <span className="beec-node-step">02</span>
                  <span className="beec-node-title">Emotion</span>
                </div>

                <div className="beec-system-connector" aria-hidden="true">
                  <span className="beec-connector-tag">triggers</span>
                  <span className="beec-connector-line" />
                  <span className="beec-connector-arrow">→</span>
                </div>

                <div className="beec-system-node">
                  <span className="beec-node-step">03</span>
                  <span className="beec-node-title">Behaviour</span>
                </div>

                <div className="beec-system-connector" aria-hidden="true">
                  <span className="beec-connector-tag">triggers</span>
                  <span className="beec-connector-line" />
                  <span className="beec-connector-arrow">→</span>
                </div>

                <div className="beec-system-node">
                  <span className="beec-node-step">04</span>
                  <span className="beec-node-title">Cognitive Load</span>
                </div>
              </div>
            </div>

            {/* PART 3 — Mapping Emotions (Behaviour vs. Emotional Response) */}
            <div className="beec-mapping-container">
              <div className="beec-mapping-header">
                <h3 className="beec-subheading">Mapping the behaviour</h3>
                <p className="case-study-supporting-text">
                  I mapped behaviour against the main emotions people experience in this environment to understand which emotion appeared most strongly.
                </p>
              </div>

              <div className="beec-chart-wrapper" role="region" aria-label="Graph: Behaviour vs. Emotional Response">
                <div className="beec-chart-meta">
                  <span className="beec-chart-axis-label">
                    Y-AXIS · OBSERVED BEHAVIOURAL RESPONSE
                  </span>
                  <span className="beec-chart-state-badge">Analytical Mapping</span>
                </div>

                <div className="beec-chart-stage">
                  {/* Grid guideline levels */}
                  <div className="beec-chart-gridlines" aria-hidden="true">
                    <span className="beec-gridline"><span className="beec-gridline-val">High</span></span>
                    <span className="beec-gridline"><span className="beec-gridline-val">Medium</span></span>
                    <span className="beec-gridline"><span className="beec-gridline-val">Low</span></span>
                    <span className="beec-gridline"><span className="beec-gridline-val">Baseline</span></span>
                  </div>

                  {/* Visual Bar Plot */}
                  <div className="beec-chart-bars">
                    {/* FEAR — Highlighted Finding */}
                    <div className="beec-bar-col beec-bar-col--featured">
                      <span className="beec-bar-badge">Strongest</span>
                      <div className="beec-bar-track">
                        <div className="beec-bar-fill beec-bar-fill--fear" style={{ height: '90%' }} />
                      </div>
                      <span className="beec-bar-label beec-bar-label--featured">FEAR</span>
                    </div>

                    {/* Secondary Emotion 2 */}
                    <div className="beec-bar-col">
                      <div className="beec-bar-track">
                        <div className="beec-bar-fill" style={{ height: '58%' }} />
                      </div>
                      <span className="beec-bar-label">Hesitation</span>
                    </div>

                    {/* Secondary Emotion 3 */}
                    <div className="beec-bar-col">
                      <div className="beec-bar-track">
                        <div className="beec-bar-fill" style={{ height: '46%' }} />
                      </div>
                      <span className="beec-bar-label">Confusion</span>
                    </div>

                    {/* Secondary Emotion 4 */}
                    <div className="beec-bar-col">
                      <div className="beec-bar-track">
                        <div className="beec-bar-fill" style={{ height: '36%' }} />
                      </div>
                      <span className="beec-bar-label">Frustration</span>
                    </div>

                    {/* Secondary Emotion 5 */}
                    <div className="beec-bar-col">
                      <div className="beec-bar-track">
                        <div className="beec-bar-fill" style={{ height: '28%' }} />
                      </div>
                      <span className="beec-bar-label">Helplessness</span>
                    </div>
                  </div>
                </div>

                <div className="beec-chart-footer">
                  <span className="beec-chart-caption">
                    X-AXIS · IDENTIFIED EMOTIONAL RESPONSES
                  </span>
                </div>
              </div>
            </div>

            {/* PART 4 — The Insight */}
            <div className="beec-insight-block">
              <h3 className="beec-insight-heading">
                Fear was the strongest signal.
              </h3>
              <p className="case-study-supporting-text">
                The analysis pointed to fear as the emotion people experience most strongly in this environment. That became the key emotion I needed to tackle.
              </p>
            </div>

            <div className="case-study-extension-slot" />
          </section>

          {/* ================================================================
              4. THE DIRECTION WE TOOK — USER SEGMENTATION SYSTEM
              ================================================================ */}
          <section className="case-study-section user-seg-section" id="direction" aria-labelledby="heading-direction">
            <h2 id="heading-direction" className="case-study-section-heading">
              The direction we took
            </h2>
            <p className="case-study-supporting-text">
              We divided our users into two groups based on two parameters: literacy rate and proficiency in digital devices.
            </p>

            {/* PART 1 — THE TWO MEASUREMENT PARAMETERS */}
            <div className="user-seg-parameters-block" role="region" aria-label="Measurement Parameters">
              <span className="user-seg-system-caption">01 · Measurement Parameters</span>

              <div className="user-seg-parameters-row">
                {/* Parameter 1 */}
                <div className="user-seg-param-card">
                  <div className="user-seg-param-top">
                    <span className="user-seg-param-index">PARAMETER 01</span>
                    <span className="user-seg-param-type">Dimension</span>
                  </div>
                  <h3 className="user-seg-param-title">Literacy rate</h3>
                  <div className="user-seg-param-scale">
                    <span className="user-seg-scale-end">Low</span>
                    <div className="user-seg-scale-line" aria-hidden="true">
                      <span className="user-seg-scale-arrow-left">←</span>
                      <span className="user-seg-scale-bar" />
                      <span className="user-seg-scale-arrow-right">→</span>
                    </div>
                    <span className="user-seg-scale-end">High</span>
                  </div>
                </div>

                {/* Operator */}
                <div className="user-seg-param-operator" aria-hidden="true">
                  <span className="user-seg-operator-symbol">+</span>
                </div>

                {/* Parameter 2 */}
                <div className="user-seg-param-card">
                  <div className="user-seg-param-top">
                    <span className="user-seg-param-index">PARAMETER 02</span>
                    <span className="user-seg-param-type">Dimension</span>
                  </div>
                  <h3 className="user-seg-param-title">Proficiency in digital devices</h3>
                  <div className="user-seg-param-scale">
                    <span className="user-seg-scale-end">Low</span>
                    <div className="user-seg-scale-line" aria-hidden="true">
                      <span className="user-seg-scale-arrow-left">←</span>
                      <span className="user-seg-scale-bar" />
                      <span className="user-seg-scale-arrow-right">→</span>
                    </div>
                    <span className="user-seg-scale-end">High</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FLOW STEP: TRANSITION TO SEGMENTATION */}
            <div className="user-seg-system-transition" aria-hidden="true">
              <div className="user-seg-transition-line" />
              <span className="user-seg-transition-badge">Qualitative 2-Axis Mapping</span>
              <span className="user-seg-transition-arrow">↓</span>
            </div>

            {/* PART 2 — USER SEGMENTATION SYSTEM (2-AXIS QUALITATIVE MATRIX) */}
            <div className="user-seg-matrix-container" role="region" aria-label="User Segmentation 2-Axis System">
              <span className="user-seg-system-caption">02 · Qualitative Segmentation Matrix</span>

              <div className="user-seg-matrix-layout">
                {/* Y-Axis Label */}
                <div className="user-seg-axis-y">
                  <span className="user-seg-axis-dir">High ↑</span>
                  <span className="user-seg-axis-title">
                    LITERACY RATE
                  </span>
                  <span className="user-seg-axis-dir">Low ↓</span>
                </div>

                {/* The 2-Axis Stage */}
                <div className="user-seg-stage-wrapper">
                  <div className="user-seg-stage">
                    {/* Background Quadrant Gridlines */}
                    <div className="user-seg-stage-lines" aria-hidden="true">
                      <div className="user-seg-stage-split-h" />
                      <div className="user-seg-stage-split-v" />
                    </div>

                    {/* Quadrant 1: Top-Right — USER 01 (High-Medium) */}
                    <div className="user-seg-quadrant user-seg-quadrant--q1">
                      <div className="user-seg-node user-seg-node--user1">
                        <div className="user-seg-node-marker">
                          <span className="user-seg-node-pulse" />
                          <span className="user-seg-node-dot" />
                        </div>
                        <div className="user-seg-node-info">
                          <span className="user-seg-node-tag">USER 01</span>
                          <span className="user-seg-node-sub">High – Medium Zone</span>
                        </div>
                      </div>
                    </div>

                    {/* Quadrant 2: Bottom-Left — USER 02 (Medium-Low) */}
                    <div className="user-seg-quadrant user-seg-quadrant--q3">
                      <div className="user-seg-node user-seg-node--user2">
                        <div className="user-seg-node-marker">
                          <span className="user-seg-node-dot user-seg-node-dot--secondary" />
                        </div>
                        <div className="user-seg-node-info">
                          <span className="user-seg-node-tag user-seg-node-tag--secondary">USER 02</span>
                          <span className="user-seg-node-sub">Medium – Low Zone</span>
                        </div>
                      </div>
                    </div>

                    {/* Subtle empty spectrum zones */}
                    <div className="user-seg-quadrant user-seg-quadrant--q2" aria-hidden="true">
                      <span className="user-seg-empty-indicator">High Lit · Low Dev</span>
                    </div>
                    <div className="user-seg-quadrant user-seg-quadrant--q4" aria-hidden="true">
                      <span className="user-seg-empty-indicator">Low Lit · High Dev</span>
                    </div>
                  </div>

                  {/* X-Axis Label */}
                  <div className="user-seg-axis-x">
                    <span className="user-seg-axis-dir-x">← Low</span>
                    <span className="user-seg-axis-title-x">
                      PROFICIENCY IN DIGITAL DEVICES
                    </span>
                    <span className="user-seg-axis-dir-x">High →</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PART 3 — RESULTING USER GROUPS SPECIFICATION */}
            <div className="user-seg-groups-container" role="region" aria-label="Resulting User Groups">
              <span className="user-seg-system-caption">03 · Two Distinct User Groups</span>

              <div className="user-seg-groups-grid">
                {/* User 01 Spec */}
                <div className="user-seg-group-col user-seg-group-col--primary">
                  <div className="user-seg-group-header">
                    <span className="user-seg-group-badge user-seg-group-badge--primary">USER 01</span>
                    <span className="user-seg-group-state">Primary Focus</span>
                  </div>
                  <div className="user-seg-group-attributes">
                    <div className="user-seg-attr-row">
                      <span className="user-seg-attr-label">Literacy Rate</span>
                      <span className="user-seg-attr-val user-seg-attr-val--accent">High – Medium</span>
                    </div>
                    <div className="user-seg-attr-divider" />
                    <div className="user-seg-attr-row">
                      <span className="user-seg-attr-label">Proficiency in digital devices</span>
                      <span className="user-seg-attr-val user-seg-attr-val--accent">High – Medium</span>
                    </div>
                  </div>
                </div>

                {/* User 02 Spec */}
                <div className="user-seg-group-col">
                  <div className="user-seg-group-header">
                    <span className="user-seg-group-badge">USER 02</span>
                    <span className="user-seg-group-state">Secondary Focus</span>
                  </div>
                  <div className="user-seg-group-attributes">
                    <div className="user-seg-attr-row">
                      <span className="user-seg-attr-label">Literacy Rate</span>
                      <span className="user-seg-attr-val">Medium – Low</span>
                    </div>
                    <div className="user-seg-attr-divider" />
                    <div className="user-seg-attr-row">
                      <span className="user-seg-attr-label">Proficiency in digital devices</span>
                      <span className="user-seg-attr-val">Medium – Low</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PART 4 — DESIGN IMPLICATION INSIGHT */}
            <div className="user-seg-insight-block">
              <span className="user-seg-insight-tag">Design Implication</span>
              <p className="case-study-body-text" style={{ margin: 0 }}>
                Bifurcating users into distinct segments gives us a clear understanding of who we are designing for and allows us to address their pain points separately.
              </p>
            </div>

            <div className="case-study-extension-slot" />
          </section>

          {/* ================================================================
              5. THE RESOURCES WE TOOK
              ================================================================ */}
          <section className="case-study-section" id="resources" aria-labelledby="heading-resources">
            <h2 id="heading-resources" className="case-study-section-heading">
              The resources we took
            </h2>
            <p className="case-study-supporting-text case-study-supporting-text--italic">
              Fitting into the existing system
            </p>
            <p className="case-study-placeholder">
              [Explanation of the resources/tools/methods used goes here]
            </p>
            <div className="case-study-extension-slot" />
          </section>

          {/* ================================================================
              6. APPROACH AROUND RESOURCE 1
              ================================================================ */}
          <section className="case-study-section" id="resource-1" aria-labelledby="heading-resource-1">
            <h2 id="heading-resource-1" className="case-study-section-heading">
              Approach around Resource 1
            </h2>
            <p className="case-study-placeholder">
              [Resource 1 approach, selection rationale, and findings go here]
            </p>
            <div className="case-study-extension-slot" />
          </section>

          {/* ================================================================
              7. WHY AND WHERE WE NEED RESOURCE 2
              ================================================================ */}
          <section className="case-study-section" id="resource-2" aria-labelledby="heading-resource-2">
            <h2 id="heading-resource-2" className="case-study-section-heading case-study-section-heading--single-line">
              Why and where we need Resource 2?
            </h2>
            <p className="case-study-placeholder">
              [Resource 2 necessity, system fit, and complementary role go here]
            </p>
            <div className="case-study-extension-slot" />
          </section>
        </div>

        {/* Minimal Footer Navigation to Return to Projects */}
        <footer className="case-study-footer-nav">
          <button
            type="button"
            onClick={handleBack}
            className="case-study-return-link"
          >
            ← Return to Projects
          </button>
          <span className="case-study-category-badge">Portfolio 2026</span>
        </footer>
      </Container>
    </div>
  );
});

CaseStudy.displayName = 'CaseStudy';

export default CaseStudy;
