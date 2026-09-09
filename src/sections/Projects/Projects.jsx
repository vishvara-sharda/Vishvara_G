import React, { memo, useCallback, useEffect } from 'react';
import Section from '../../components/Section/Section';
import Container from '../../components/Container/Container';
import MediaPlaceholder from '../../components/MediaPlaceholder/MediaPlaceholder';
import murmurCover from '../../components/Pictures/Projects/Murmur/Cover page.png';
import margdarshakLogo from '../../components/Pictures/Projects/Margdarshak/Margdarshak Logo.png';
import { imageCache, browserCache } from '../../utils/cache';
import './Projects.css';

const projectsData = [
  {
    id: 'project-01',
    slug: 'murmur',
    heading: 'Murmur',
    tagline: '[Short project tagline]',
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
    tagline: '[Short project tagline]',
    mediaImage: margdarshakLogo,
    mediaAlt: 'Margdarshak logo',
    objectFit: 'contain',
    imageStyle: { padding: 'var(--space-4)' },
    mediaPlaceholder: '[Project 02 Media / Video]',
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
  }
];

const ProjectCard = memo(({ project, onSelect }) => {
  return (
    <div className="project-bento-box">
      {/* Container 1: Project Information */}
      <div className="project-info-container">
        <header className="project-info-header">
          <h3 className="project-title">{project.heading}</h3>
          <p className="project-tagline">{project.tagline}</p>
        </header>

        <div className="project-media-wrapper">
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
          <h4 className="project-about-label">{project.aboutLabel}</h4>
          <p className="project-about-caption">{project.aboutDescription}</p>
        </div>
      </div>

      {/* Three Separate Question & Answer Containers */}
      {project.qaBlocks.map((block, index) => (
        <div key={index} className="project-qa-card">
          <h4 className="project-qa-question">{block.question}</h4>
          <p className="project-qa-answer">{block.answer}</p>
        </div>
      ))}

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

export const Projects = memo(({ onSelectProject }) => {
  // Preload and cache project covers in memory & browser cache
  useEffect(() => {
    imageCache.preloadAll([murmurCover, margdarshakLogo]);
    browserCache.cacheUrls([murmurCover, margdarshakLogo]);
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
        <div className="projects-grid">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={handleCtaClick}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
});

Projects.displayName = 'Projects';

export default Projects;
