import React, { memo, useCallback, useEffect } from 'react';
import Section from '../../components/Section/Section';
import Container from '../../components/Container/Container';
import murmurCover from '../../components/Pictures/Projects/Murmur/Cover page.png';
import margdarshakLogo from '../../components/Pictures/Projects/Margdarshak/Margdarshak Logo.png';
import margdarshakHome from '../../components/Pictures/Projects/Margdarshak/home.png';
import { MARGDARSHAK_ALL_ASSETS } from '../../pages/CaseStudy/CaseStudy';
import { imageCache, browserCache } from '../../utils/cache';
import './Projects.css';

const projectsData = [
  {
    id: 'project-01',
    slug: 'murmur',
    heading: 'Murmur',
    tagline: 'Making government schemes easier to access.',
    logoImage: murmurCover,
    logoAlt: 'Murmur project logo',
    videoSrc: null,
    videoImage: null,
    videoAlt: 'Murmur walkthrough video',
    videoPlaceholder: 'Walkthrough Video',
    aboutLabel: 'About the project',
    aboutDescription: '[Short one-line description / caption]',
    qaBlocks: [
      {
        question: 'What was the problem?',
        answer: 'One concise line explaining the problem.'
      },
      {
        question: 'What was the action I took?',
        answer: 'A concise description of what I did.'
      },
      {
        question: 'How did I solve it?',
        answer: 'A concise explanation of the approach/system.'
      }
    ]
  },
  {
    id: 'project-02',
    slug: 'margdarshak',
    heading: 'Margdarshak',
    tagline: 'Making government schemes easier to access.',
    logoImage: margdarshakLogo,
    logoAlt: 'Margdarshak logo',
    videoSrc: null,
    videoImage: null,
    videoAlt: 'Margdarshak walkthrough video',
    videoPlaceholder: 'Walkthrough Video',
    aboutLabel: 'About the project',
    aboutDescription: 'Margdarshak is a system designed to help people discover and access government schemes with less friction.',
    qaBlocks: [
      {
        question: 'What was the problem?',
        answer: 'One concise line explaining the problem.'
      },
      {
        question: 'What was the action I took?',
        answer: 'A concise description of what I did.'
      },
      {
        question: 'How did I solve it?',
        answer: 'A concise explanation of the approach/system.'
      }
    ]
  }
];

const ProjectCard = memo(({ project, onSelect }) => {
  return (
    <div className="project-bento-box">
      {/* Upper Section: 3-Box Bento Layout */}
      <div className="project-upper-bento">
        {/* Box 1 — Project Heading (Horizontal Rectangular Box) */}
        <div className="project-box-heading">
          <h3
            className="project-title"
            onClick={() => onSelect(project.slug || project.id)}
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(project.slug || project.id);
              }
            }}
          >
            {project.heading}
          </h3>
          <p className="project-tagline">{project.tagline}</p>
        </div>

        {/* Box 2 — Project Logo (Compact Square-ish Box) */}
        <div
          className="project-box-logo"
          onClick={() => onSelect(project.slug || project.id)}
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect(project.slug || project.id);
            }
          }}
          title={`${project.heading} Logo`}
        >
          {project.logoImage && (
            <img
              src={project.logoImage}
              alt={project.logoAlt || `${project.heading} Logo`}
              className="project-box-logo-img"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>

        {/* Box 3 — Project Media + Description (Largest Rectangular Box) */}
        <div className="project-box-media">
          <div
            className="project-video-wrapper"
            onClick={() => onSelect(project.slug || project.id)}
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(project.slug || project.id);
              }
            }}
            aria-label={`View ${project.heading} walkthrough`}
          >
            {project.videoSrc ? (
              <video
                src={project.videoSrc}
                className="project-video-player"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : project.videoImage ? (
              <div className="project-video-preview-wrap">
                <img
                  src={project.videoImage}
                  alt={project.videoAlt || `${project.heading} Walkthrough`}
                  className="project-video-preview-image"
                  loading="lazy"
                  decoding="async"
                />
                <div className="project-video-overlay">
                  <div className="project-video-play-btn" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                      <polygon points="7,4 20,12 7,20" />
                    </svg>
                  </div>
                  <span className="project-video-badge">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" style={{ marginRight: '5px' }}>
                      <polygon points="6,4 19,12 6,20" />
                    </svg>
                    Walkthrough Video
                  </span>
                </div>
              </div>
            ) : (
              <div className="project-video-placeholder">
                <div className="project-video-placeholder-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <polygon points="8,5 19,12 8,19" />
                  </svg>
                </div>
                <span className="project-video-placeholder-label">
                  {project.videoPlaceholder || 'Walkthrough Video'}
                </span>
              </div>
            )}
          </div>

          <div className="project-about-layer">
            <span className="project-about-label">{project.aboutLabel}</span>
            <p className="project-about-caption">{project.aboutDescription}</p>
          </div>
        </div>
      </div>

      {/* Container 2: Horizontal Row of 3 Question & Answer Cards */}
      <div className="project-qa-row">
        {project.qaBlocks.map((block, index) => (
          <div key={index} className="project-qa-card">
            <h4 className="project-qa-question">{block.question}</h4>
            <p className="project-qa-answer">{block.answer}</p>
          </div>
        ))}
      </div>

      {/* Dedicated Full-Width CTA */}
      <button
        type="button"
        className="project-why-cta"
        onClick={() => onSelect(project.slug || project.id)}
        aria-label={`View case study: Why I did what I did for ${project.heading}`}
      >
        Why I did What I did ?
      </button>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export const Projects = memo(({ onSelectProject, title = 'Projects' }) => {
  // Preload and cache project covers and idle-preload case study assets
  useEffect(() => {
    // Immediate cover pre-cache
    imageCache.preloadAll([murmurCover, margdarshakLogo, margdarshakHome]);
    browserCache.cacheUrls([murmurCover, margdarshakLogo, margdarshakHome]);

    // Idle preload all Case Study assets in background for instant transition
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        imageCache.preloadAll(MARGDARSHAK_ALL_ASSETS);
        browserCache.cacheUrls(MARGDARSHAK_ALL_ASSETS);
      }, { timeout: 3500 });
    } else {
      setTimeout(() => {
        imageCache.preloadAll(MARGDARSHAK_ALL_ASSETS);
        browserCache.cacheUrls(MARGDARSHAK_ALL_ASSETS);
      }, 2000);
    }
  }, []);

  const handleCtaClick = useCallback((slug) => {
    if (onSelectProject) {
      onSelectProject(slug);
    } else {
      window.history.pushState({}, '', `/case-study/${slug}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }, [onSelectProject]);

  return (
    <Section id="projects" paddingTop="default" paddingBottom="default" className="projects-section">
      <Container>
        <div className="projects-container-layout">
          <div className="projects-layout-spacer" aria-hidden="true" />
          <div className="projects-grid">
            {projectsData.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={handleCtaClick}
              />
            ))}
          </div>

          <header className="projects-section-header">
            <div className="projects-sticky-title-wrap">
              <h2 className="projects-section-title">{title}</h2>
            </div>
          </header>
        </div>
      </Container>
    </Section>
  );
});

Projects.displayName = 'Projects';

export default Projects;
