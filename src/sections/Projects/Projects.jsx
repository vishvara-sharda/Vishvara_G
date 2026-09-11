import React, { memo, useCallback, useEffect } from 'react';
import Section from '../../components/Section/Section';
import Container from '../../components/Container/Container';
import MediaPlaceholder from '../../components/MediaPlaceholder/MediaPlaceholder';
import murmurCover from '../../components/Pictures/Projects/Murmur/Cover page.png';
import margdarshakLogo from '../../components/Pictures/Projects/Margdarshak/Margdarshak Logo.png';
import { MARGDARSHAK_ALL_ASSETS } from '../../pages/CaseStudy/CaseStudy';
import { imageCache, browserCache } from '../../utils/cache';
import './Projects.css';

const projectsData = [
  {
    id: 'project-01',
    slug: 'murmur',
    heading: 'Murmur',
    tagline: 'Making government schemes easier to access.',
    mediaImage: murmurCover,
    mediaAlt: 'Murmur project cover',
    objectFit: 'contain',
    imageStyle: { padding: 'var(--space-4)' },
    mediaPlaceholder: '[Project 01 Media / Video]',
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
    mediaImage: margdarshakLogo,
    mediaAlt: 'Margdarshak logo',
    objectFit: 'contain',
    imageStyle: { padding: 'var(--space-4)' },
    mediaPlaceholder: '[Project 02 Media / Video]',
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
      {/* Container 1: Project Information */}
      <div className="project-info-container">
        <header className="project-info-header">
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
        </header>

        <div
          className="project-media-wrapper"
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
          aria-label={`View ${project.heading} Case Study`}
        >
          <MediaPlaceholder
            aspectRatio="16 / 9"
            src={project.mediaImage}
            alt={project.mediaAlt || project.heading}
            label={project.mediaPlaceholder}
            objectFit={project.objectFit}
            imageStyle={project.imageStyle}
            style={project.mediaContainerStyle}
          />
        </div>

        <div className="project-about-layer">
          <span className="project-about-label">{project.aboutLabel}</span>
          <p className="project-about-caption">{project.aboutDescription}</p>
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
    imageCache.preloadAll([murmurCover, margdarshakLogo]);
    browserCache.cacheUrls([murmurCover, margdarshakLogo]);

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
