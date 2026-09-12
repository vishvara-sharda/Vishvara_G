import React, { useEffect, memo, useCallback } from 'react';
import Container from '../../components/Container/Container';
import { Button } from '../../components/Button/Button';
import group30Img from '../../components/Pictures/Projects/Margdarshak/Group 30.jpg';
import group31Img from '../../components/Pictures/Projects/Margdarshak/Group 31.jpg';
import group32Img from '../../components/Pictures/Projects/Margdarshak/Group 32.jpg';
import group33Img from '../../components/Pictures/Projects/Margdarshak/Group 33.jpg';
import group34Img from '../../components/Pictures/Projects/Margdarshak/Group 34.jpg';
import ideationImg from '../../components/Pictures/Projects/Margdarshak/Ideation .png';
import ideationImg2 from '../../components/Pictures/Projects/Margdarshak/1.png';
import affinityMappingImg from '../../components/Pictures/Projects/Margdarshak/affinity mapping.png';
import recommendationImg from '../../components/Pictures/Projects/Margdarshak/recommendation.png';
import homeImg from '../../components/Pictures/Projects/Margdarshak/home.png';
import schemeImg from '../../components/Pictures/Projects/Margdarshak/scheme.png';
import aiImg from '../../components/Pictures/Projects/Margdarshak/ai.png';
import schemesImg from '../../components/Pictures/Projects/Margdarshak/Schemes.jpg';
import operateImg from '../../components/Pictures/Projects/Margdarshak/operate.jpg';
import bookGuideImg from '../../components/Pictures/Projects/Margdarshak/book guide.png';
import chooseLanguageImg from '../../components/Pictures/Projects/Margdarshak/choose-language.svg';
import physicalGuideImg from '../../components/Pictures/Projects/Margdarshak/physical guide.png';
import physicalGuide2Img from '../../components/Pictures/Projects/Margdarshak/physical guide 2.png';
import { imageCache, browserCache } from '../../utils/cache';
import './CaseStudy.css';

const MARGDARSHAK_ROLE_IMAGES = [
  { src: group30Img, alt: 'User research interview with community family' },
  { src: group31Img, alt: 'Field research team discussion' },
  { src: group32Img, alt: 'Community immersion and user interaction' },
  { src: group33Img, alt: 'On-ground user study and feedback interview' },
  { src: group34Img, alt: 'In-home interview with community members' }
];

export const MARGDARSHAK_ALL_ASSETS = [
  group30Img,
  group31Img,
  group32Img,
  group33Img,
  group34Img,
  affinityMappingImg,
  ideationImg,
  ideationImg2,
  recommendationImg,
  homeImg,
  schemeImg,
  aiImg,
  schemesImg,
  chooseLanguageImg,
  operateImg,
  bookGuideImg,
  physicalGuideImg,
  physicalGuide2Img
];

/**
 * Case Studies Project Meta Registry
 * Allows additional case studies and project-specific content to plug in seamlessly.
 */
const CASE_STUDIES_METADATA = {
  murmur: {
    title: 'Murmur',
    tagline: 'Making government schemes easier to access.',
    prototypeUrl: 'https://www.figma.com/proto/oKryn0vKJGZ8oZw63x1drX/Margdarshak01?node-id=2285-32311&t=nLrxO20iXKaRMBne-0&scaling=scale-down&content-scaling=fixed&page-id=1972%3A1741&starting-point-node-id=2285%3A32298&show-proto-sidebar=1',
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
    tagline: 'Making government schemes easier to access.',
    prototypeUrl: 'https://www.figma.com/proto/oKryn0vKJGZ8oZw63x1drX/Margdarshak01?node-id=2285-32311&t=nLrxO20iXKaRMBne-0&scaling=scale-down&content-scaling=fixed&page-id=1972%3A1741&starting-point-node-id=2285%3A32298&show-proto-sidebar=1',
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
    tagline: 'Making government schemes easier to access.',
    prototypeUrl: 'https://www.figma.com/proto/oKryn0vKJGZ8oZw63x1drX/Margdarshak01?node-id=2285-32311&t=nLrxO20iXKaRMBne-0&scaling=scale-down&content-scaling=fixed&page-id=1972%3A1741&starting-point-node-id=2285%3A32298&show-proto-sidebar=1',
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

export const CaseStudy = memo(({ projectSlug = 'margdarshak', onNavigateBack }) => {
  const meta = CASE_STUDIES_METADATA[projectSlug?.toLowerCase()] || CASE_STUDIES_METADATA.margdarshak || CASE_STUDIES_METADATA.default;

  // Set document title
  useEffect(() => {
    document.title = 'Margdarshak Case Study | Vishvara';
    return () => {
      document.title = 'Vishvara | Product Designer & UX Researcher';
    };
  }, []);

  // Scroll to top upon entering case study
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [projectSlug]);

  // Pre-cache all case study assets into memory and browser cache
  useEffect(() => {
    imageCache.preloadAll(MARGDARSHAK_ALL_ASSETS);
    browserCache.cacheUrls(MARGDARSHAK_ALL_ASSETS);
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
          <span className="case-study-category-badge">Margdarshak Case Study</span>
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

            {/* Affinity Mapping: Left-aligned image with h3 heading on the right */}
            <div className="case-study-affinity-block">
              <div className="case-study-affinity-img-wrap">
                <img
                  src={affinityMappingImg}
                  alt="Affinity mapping synthesized after user interviews"
                  className="case-study-affinity-img"
                  loading="lazy"
                />
              </div>
              <div className="case-study-affinity-content">
                <h3 className="case-study-affinity-heading">
                  after user interview and affinity mapping
                </h3>
              </div>
            </div>

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
                    <span className="user-seg-group-state">Tier 1</span>
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
                    <span className="user-seg-group-state">Tier 2</span>
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
              5. PAIN POINTS OF THE USERS
              ================================================================ */}
          <section className="case-study-section pain-points-section" id="pain-points" aria-labelledby="heading-pain-points">
            <h2 id="heading-pain-points" className="case-study-section-heading">
              Pain points of the users
            </h2>
            <p className="case-study-supporting-text">
              Understanding the distinct friction points across each user segment to guide our systemic intervention.
            </p>

            <div className="pain-points-grid">
              {/* Half 1: Tier 1 — User 1 */}
              <div className="pain-points-col">
                <div className="pain-points-header">
                  <span className="pain-points-tier">Tier 1</span>
                  <h3 className="pain-points-user">User 1</h3>
                </div>
                <ul className="pain-points-list" role="list">
                  <li className="pain-points-item">
                    <span className="pain-points-item-num">01</span>
                    <div className="pain-points-item-content">
                      <p className="pain-points-item-desc">
                        <strong>Not enough time or energy</strong> to find relevant schemes.
                      </p>
                    </div>
                  </li>
                  <li className="pain-points-item">
                    <span className="pain-points-item-num">02</span>
                    <div className="pain-points-item-content">
                      <p className="pain-points-item-desc">
                        <strong>Too many platforms</strong> for too many different schemes.
                      </p>
                    </div>
                  </li>
                  <li className="pain-points-item">
                    <span className="pain-points-item-num">03</span>
                    <div className="pain-points-item-content">
                      <p className="pain-points-item-desc">
                        Users have to do <strong>a lot of research before applying</strong>, creating too much cognitive load.
                      </p>
                    </div>
                  </li>
                  <li className="pain-points-item">
                    <span className="pain-points-item-num">04</span>
                    <div className="pain-points-item-content">
                      <p className="pain-points-item-desc">
                        <strong>If an application fails</strong>, users have to start the entire process again.
                      </p>
                    </div>
                  </li>
                  <li className="pain-points-item">
                    <span className="pain-points-item-num">05</span>
                    <div className="pain-points-item-content">
                      <p className="pain-points-item-desc">
                        <strong>Government portals are poorly designed</strong>, making it difficult to navigate and sometimes causing users to lose their progress during submission.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Half 2: Tier 2 — User 2 */}
              <div className="pain-points-col">
                <div className="pain-points-header">
                  <span className="pain-points-tier">Tier 2</span>
                  <h3 className="pain-points-user">User 2</h3>
                </div>

                <div className="pain-points-inherited-block">
                  <span className="pain-points-inherited-text">Pain points of User 1</span>
                  <span className="pain-points-inherited-plus" aria-hidden="true">+</span>
                </div>

                <ul className="pain-points-list" role="list">
                  <li className="pain-points-item">
                    <span className="pain-points-item-num">01</span>
                    <div className="pain-points-item-content">
                      <p className="pain-points-item-desc">
                        <strong>Not proficient with digital devices</strong>, making online processes difficult to navigate independently.
                      </p>
                    </div>
                  </li>
                  <li className="pain-points-item">
                    <span className="pain-points-item-num">02</span>
                    <div className="pain-points-item-content">
                      <p className="pain-points-item-desc">
                        Some users <strong>live in rural areas</strong>, where access to reliable digital infrastructure may be limited.
                      </p>
                    </div>
                  </li>
                  <li className="pain-points-item">
                    <span className="pain-points-item-num">03</span>
                    <div className="pain-points-item-content">
                      <p className="pain-points-item-desc">
                        <strong>No one to assist them</strong> when they get stuck during the application process.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="case-study-extension-slot" />
          </section>

          {/* ================================================================
              6. IDEATION
              ================================================================ */}
          <section className="case-study-section ideation-section" id="ideation" aria-labelledby="heading-ideation">
            <h2 id="heading-ideation" className="case-study-section-heading">
              Ideation and after
            </h2>
            <div className="case-study-ideation-wrapper">
              <img
                src={ideationImg}
                alt="Ideation matrix exploring concepts across brainstorming rounds"
                className="case-study-ideation-img"
                loading="lazy"
              />
              <img
                src={ideationImg2}
                alt="Ideation process and synthesis artifact"
                className="case-study-ideation-img"
                loading="lazy"
              />
              <div className="case-study-ideation-text-wrap">
                <p className="case-study-ideation-text">
                  During ideation, we came up with various ideas like money management and budgeting apps, but they didn’t work for the users we were catering to. So we decided to focus on government schemes and limit the resources.
                </p>
              </div>
            </div>

            <h3 className="case-study-ideation-subheading">
              We decided to go for Govt schemes and limit the resources to these
            </h3>

            <div className="case-study-extension-slot" />
          </section>

          {/* ================================================================
              7. THE RESOURCES WE TOOK
              ================================================================ */}
          <section className="case-study-section resources-section" id="resources" aria-labelledby="heading-resources">
            <h2 id="heading-resources" className="case-study-section-heading">
              The resources we took
            </h2>
            <p className="case-study-supporting-text">
              We fixed our resources and limited them, then designed around their constraints.
            </p>

            <div className="resources-grid">
              {/* RESOURCE 1 */}
              <div className="resources-col">
                <div className="resources-header">
                  <span className="resources-tag">Resource 1</span>
                  <h3 className="resources-title">Smart Devices</h3>
                </div>
                <p className="resources-desc">
                  We used smart devices as the primary digital resource, while designing around differences in access and proficiency.
                </p>
              </div>

              {/* RESOURCE 2 */}
              <div className="resources-col">
                <div className="resources-header">
                  <span className="resources-tag">Resource 2</span>
                  <h3 className="resources-title">Public Government Properties</h3>
                </div>
                <p className="resources-desc">
                  We used existing public government properties — schools, Anganwadis, dispensaries, etc. — as physical access points for people who may not have reliable access to digital resources.
                </p>
              </div>
            </div>

            <div className="case-study-extension-slot" />
          </section>

          {/* ================================================================
              6. APPROACH AROUND RESOURCE 1
              ================================================================ */}
          <section className="case-study-section resource-1-section" id="resource-1" aria-labelledby="heading-resource-1">
            <h3 id="heading-resource-1" className="case-study-section-heading case-study-section-heading--sub">
              Approach around Resource 1
            </h3>

            {/* 1. User Identification */}
            <div className="resource-user-banner">
              <div className="resource-user-badge-wrap">
                <span className="resource-user-tag">USER 1</span>
                <span className="resource-user-divider">·</span>
                <span className="resource-user-tier">TIER 1</span>
              </div>
              <div className="resource-user-attrs">
                <span className="resource-user-attr">High–Medium literacy rate</span>
                <span className="resource-user-dot">•</span>
                <span className="resource-user-attr">High–Medium proficiency in digital devices</span>
              </div>
            </div>

            {/* 2. Context */}
            <p className="case-study-supporting-text">
              We designed around smart devices to tackle the key pain points of User 1.
            </p>

            {/* 3. Pain Points → Solutions (Two-Column Table) */}
            <div className="resource-solutions-table-wrap">
              <table className="resource-solutions-table">
                <thead>
                  <tr>
                    <th scope="col">Core pain points</th>
                    <th scope="col">How we solved it</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label="Core pain points"><span className="table-accent-regular">Finding relevant schemes</span> takes too much time and effort.</td>
                    <td data-label="How we solved it"><span className="table-weight-regular">Recommended schemes</span> based on state, occupation, and annual salary.</td>
                  </tr>
                  <tr>
                    <td data-label="Core pain points"><span className="table-accent-regular">Schemes are scattered</span> across too many platforms.</td>
                    <td data-label="How we solved it"><span className="table-weight-regular">All schemes</span> brought together on <span className="table-weight-regular">one platform</span>.</td>
                  </tr>
                  <tr>
                    <td data-label="Core pain points"><span className="table-accent-regular">Too much research</span> is required before applying.</td>
                    <td data-label="How we solved it">Recommended schemes <span className="table-weight-regular">reduce</span> the research and <span className="table-weight-regular">cognitive load</span>.</td>
                  </tr>
                  <tr>
                    <td data-label="Core pain points"><span className="table-accent-regular">Government portals are difficult</span> to navigate and users can lose progress.</td>
                    <td data-label="How we solved it">Simple, <span className="table-weight-regular">easy-to-use interface</span>.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Smart Devices Product Screens Gallery */}
            <div className="resource-screens-grid" role="group" aria-label="Smart device interface screens">
              <div className="resource-screen-card">
                <img
                  src={recommendationImg}
                  alt="Recommended schemes interface"
                  className="resource-screen-img"
                  loading="lazy"
                />
              </div>
              <div className="resource-screen-card">
                <img
                  src={homeImg}
                  alt="All schemes unified on one platform home interface"
                  className="resource-screen-img"
                  loading="lazy"
                />
              </div>
              <div className="resource-screen-card">
                <img
                  src={schemeImg}
                  alt="Scheme details and easy-to-use interface"
                  className="resource-screen-img"
                  loading="lazy"
                />
              </div>
              <div className="resource-screen-card">
                <img
                  src={aiImg}
                  alt="AI-assisted form filling and inquiry interface"
                  className="resource-screen-img"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="case-study-extension-slot" />
          </section>

          {/* ================================================================
              USER TESTING MOMENT
              ================================================================ */}
          <section className="case-study-section user-testing-section" id="user-testing" aria-labelledby="label-user-testing">
            <div className="user-testing-grid">
              {/* LEFT SIDE: Extremely simple observation & Prototype CTA */}
              <div className="user-testing-content">
                <span id="label-user-testing" className="user-testing-heading">
                  DURING USER TESTING, WE FOUND
                </span>
                <p className="user-testing-main-text">
                  People struggled to find the right information on their documents.
                </p>
                <div className="user-testing-prototype-wrap">
                  <Button
                    variant="accent"
                    href={meta.prototypeUrl || '#'}
                    className="case-study-prototype-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View prototype"
                    icon={
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="#000000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    }
                  >
                    View Prototype
                  </Button>
                </div>
              </div>

              {/* RIGHT SIDE — PHONE MOCKUP & WE SOLVED IT CALLOUT */}
              <div className="user-testing-visual">
                <div className="user-testing-phone-container">
                  <div className="device-mockup">
                    {/* Hardware Buttons on Right */}
                    <div className="device-btn-power" aria-hidden="true" />
                    <div className="device-btn-volume" aria-hidden="true" />

                    {/* Device Screen Container */}
                    <div className="device-screen-wrap">
                      <div className="device-punch-hole" aria-hidden="true" />
                      <img
                        src={schemesImg}
                        alt="Margdarshak family member details form interface showing PAN card input field and contextual guidance"
                        className="device-screen-img"
                        loading="lazy"
                      />
                      <div className="user-testing-field-target" aria-hidden="true" />
                    </div>
                  </div>

                  {/* CALLOUT — WE SOLVED IT */}
                  <aside className="user-testing-callout" aria-label="Design solution callout">
                    <svg className="user-testing-callout-arrow" viewBox="0 0 32 16" fill="none" aria-hidden="true">
                      <path
                        d="M32 8H4M4 8L10 2M4 8L10 14"
                        stroke="#E2A9F1"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <div className="user-testing-callout-card">
                      <span className="user-testing-callout-badge">WE SOLVED IT</span>
                      <p className="user-testing-callout-text">
                        Contextual help, right where they needed it.
                      </p>
                    </div>
                  </aside>
                </div>
              </div>
            </div>

            {/* TRANSITION TO RESOURCE 2 */}
            <div className="user-testing-transition">
              <p className="user-testing-transition-text">
                But not every moment of uncertainty could be solved inside the app.
              </p>
            </div>

            <div className="case-study-extension-slot" />
          </section>

          {/* ================================================================
              7. WHY WE NEED RESOURCE 2
              ================================================================ */}
          <section className="case-study-section resource-2-section" id="resource-2" aria-labelledby="heading-resource-2">
            {/* 1. WHY WE NEED RESOURCE 2 */}
            <header className="resource-2-header">
              <span id="heading-resource-2" className="resource-2-accent-label">
                WHY WE NEED RESOURCE 2
              </span>
              <p className="resource-2-headline">
                Resource 1 couldn’t support every user.
              </p>
            </header>

            {/* 2. USER 2 & TWO BRANCHES */}
            <div className="resource-2-user-flow">
              <div className="user-2-anchor">
                <span className="user-2-pill">USER 2</span>
                <span className="user-2-persona-label">Less-educated adults → older people</span>
              </div>

              {/* Vertical connector down to branches */}
              <div className="flow-vertical-connector" aria-hidden="true">
                <svg width="12" height="24" viewBox="0 0 12 24" fill="none">
                  <path d="M6 0V18M6 18L2 14M6 18L10 14" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Two simple system branches */}
              <div className="user-2-branches">
                {/* Branch 1 */}
                <div className="user-2-branch">
                  <span className="branch-condition">Can use digital devices but needs assistance</span>
                  <div className="branch-arrow" aria-hidden="true">
                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
                      <path d="M5 0V12M5 12L1 8M5 12L9 8" stroke="#E2A9F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="branch-action-tag">DIGITAL GUIDE</span>
                </div>

                {/* Vertical divider */}
                <div className="user-2-branches-sep" aria-hidden="true" />

                {/* Branch 2 */}
                <div className="user-2-branch">
                  <span className="branch-condition">No smartphone / keypad phone</span>
                  <div className="branch-arrow" aria-hidden="true">
                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
                      <path d="M5 0V12M5 12L1 8M5 12L9 8" stroke="#E2A9F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="branch-action-tag">PHYSICAL GUIDE</span>
                </div>
              </div>
            </div>

            {/* 3. PATH 01 — DIGITAL GUIDE */}
            <div className="guide-path-block digital-guide-block">
              <div className="guide-path-meta">
                <span className="guide-path-badge">PATH 01 · <span className="text-accent">DIGITAL GUIDE</span></span>
                <p className="guide-path-sub">For users who have a digital device but need assistance.</p>
              </div>

              {/* Horizontal 3-Phone Screen Visual Sequence */}
              <div className="digital-sequence-track">
                {/* Step 01 · Choose language */}
                <div className="sequence-step-card">
                  <span className="sequence-step-num">01 · Choose language</span>
                  <div className="device-mockup device-mockup--sequence">
                    <div className="device-btn-power" aria-hidden="true" />
                    <div className="device-btn-volume" aria-hidden="true" />
                    <div className="device-screen-wrap device-screen-wrap--917">
                      <div className="device-punch-hole" aria-hidden="true" />
                      <img
                        src={chooseLanguageImg}
                        alt="Language selection screen in Margdarshak app"
                        className="device-screen-img"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                {/* Directional arrow between 01 and 02 */}
                <div className="sequence-track-arrow" aria-hidden="true">
                  <svg viewBox="0 0 28 16" fill="none">
                    <path d="M0 8H24M24 8L17 2M24 8L17 14" stroke="#E2A9F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Step 02 · Operate (Inside the provided phone base) */}
                <div className="sequence-step-card">
                  <span className="sequence-step-num">02 · Operate</span>
                  <div className="device-mockup device-mockup--sequence">
                    <div className="device-btn-power" aria-hidden="true" />
                    <div className="device-btn-volume" aria-hidden="true" />
                    <div className="device-screen-wrap device-screen-wrap--917">
                      <div className="device-punch-hole" aria-hidden="true" />
                      <img
                        src={operateImg}
                        alt="Operate interface with I need help to operate option"
                        className="device-screen-img"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                {/* Directional arrow between 02 and 03 */}
                <div className="sequence-track-arrow" aria-hidden="true">
                  <svg viewBox="0 0 28 16" fill="none">
                    <path d="M0 8H24M24 8L17 2M24 8L17 14" stroke="#E2A9F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Step 03 · Guide */}
                <div className="sequence-step-card">
                  <span className="sequence-step-num">03 · Guide</span>
                  <div className="device-standalone-frame">
                    <img
                      src={bookGuideImg}
                      alt="Nearby verified guides list interface for booking in-person guidance"
                      className="device-standalone-img"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Single concise line describing the sequence */}
              <p className="sequence-caption-line">
                Choose a language <span className="caption-sep">→</span> request a guide <span className="caption-sep">→</span> connect with the nearest guide.
              </p>
            </div>

            {/* 4. PATH 02 — PHYSICAL GUIDE */}
            <div className="guide-path-block physical-guide-block">
              <div className="guide-path-meta">
                <span className="guide-path-badge">PATH 02 · <span className="text-accent">PHYSICAL GUIDE</span></span>
                <p className="guide-path-sub">For users without a smartphone or with a basic keypad phone.</p>
              </div>

              {/* Connected Visual Flow */}
              <div className="physical-flow-diagram" aria-label="Physical guide workflow">
                {/* Node: USER */}
                <div className="flow-step flow-step--user">
                  <span className="flow-step-pill">USER</span>
                </div>

                <div className="flow-step-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 16" fill="none">
                    <path d="M0 8H20M20 8L14 2M20 8L14 14" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Node: LOCAL GOVERNMENT SPACE & Connected Subnodes */}
                <div className="flow-step flow-step--spaces">
                  <span className="flow-step-label">LOCAL GOVERNMENT SPACE</span>
                  <div className="space-nodes-cluster">
                    <span className="space-node-pill">School</span>
                    <span className="space-node-pill">Anganwadi</span>
                    <span className="space-node-pill">Dispensary</span>
                    <span className="space-node-pill space-node-pill--muted">etc.</span>
                  </div>
                </div>

                <div className="flow-step-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 16" fill="none">
                    <path d="M0 8H20M20 8L14 2M20 8L14 14" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Node: GUIDE */}
                <div className="flow-step flow-step--guide">
                  <span className="flow-step-pill flow-step-pill--accent">GUIDE</span>
                </div>

                <div className="flow-step-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 16" fill="none">
                    <path d="M0 8H20M20 8L14 2M20 8L14 14" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Node: ASSISTANCE */}
                <div className="flow-step flow-step--assistance">
                  <span className="flow-step-pill">ASSISTANCE</span>
                </div>
              </div>

              {/* Physical Guide: Idea to Reality Comparison */}
              <div className="physical-guide-showcase">
                <div className="physical-guide-comparison">
                  <div className="physical-guide-card">
                    <img
                      src={physicalGuideImg}
                      alt="Physical guide concept illustration"
                      className="physical-guide-img"
                      loading="lazy"
                    />
                  </div>

                  <div className="physical-guide-arrow" aria-hidden="true">
                    <svg viewBox="0 0 28 16" fill="none">
                      <path d="M0 8H24M24 8L17 2M24 8L17 14" stroke="#E2A9F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <div className="physical-guide-card">
                    <img
                      src={physicalGuide2Img}
                      alt="Physical guide real-world on-ground assistance"
                      className="physical-guide-img"
                      loading="lazy"
                    />
                  </div>
                </div>

                <p className="physical-guide-caption">
                  Ideas could be sometimes reality
                </p>
              </div>
            </div>

            {/* 6. CLOSING LINE */}
            <div className="resource-2-closing">
              <p className="resource-2-closing-quote">
                “When the device couldn’t come to the user, we brought the <span className="text-accent">guide</span> to the user.”
              </p>
            </div>

            <div className="case-study-extension-slot" />
          </section>

          {/* ================================================================
              8. FUTURE SCOPE
              ================================================================ */}
          <section className="case-study-section future-scope-section" id="future-scope" aria-labelledby="heading-future-scope">
            {/* Header */}
            <header className="future-scope-header">
              <h2 id="heading-future-scope" className="future-scope-accent-label">
                WHAT I WANTED BUT COULDN’T
              </h2>
              <p className="future-scope-subtext">
                Keypad phone <span className="caption-sep">→</span> Lightweight application <span className="caption-sep">→</span> Book a guide <span className="caption-sep">→</span> Get local assistance
              </p>
            </header>

            {/* Visual Flow: KEYPAD PHONE -> BOOK A GUIDE -> LOCAL GUIDE */}
            <div className="future-scope-flow" aria-label="Future keypad phone guide flow">
              <div className="future-flow-step">
                <span className="future-flow-pill">KEYPAD PHONE</span>
              </div>

              <div className="future-flow-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 16" fill="none">
                  <path d="M0 8H20M20 8L14 2M20 8L14 14" stroke="#E2A9F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div className="future-flow-step">
                <span className="future-flow-pill">BOOK A GUIDE</span>
              </div>

              <div className="future-flow-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 16" fill="none">
                  <path d="M0 8H20M20 8L14 2M20 8L14 14" stroke="#E2A9F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div className="future-flow-step">
                <span className="future-flow-pill future-flow-pill--accent">LOCAL GUIDE</span>
              </div>
            </div>

            {/* Closing Line */}
            <div className="future-scope-closing">
              <p className="future-scope-closing-line">
                This would extend access to users who don’t have a smartphone.
              </p>
            </div>

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

CaseStudy.displayName = 'MargdarshakCaseStudy';

export const MargdarshakCaseStudy = CaseStudy;
export default CaseStudy;
