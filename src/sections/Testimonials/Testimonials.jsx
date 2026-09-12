import React, { memo, useEffect } from 'react';
import Section from '../../components/Section/Section';
import Container from '../../components/Container/Container';
import bhushanImg from '../../components/Pictures/Bhushan.png';
import hiteshImg from '../../components/Pictures/Hitesh.png';
import komalImg from '../../components/Pictures/Komal.png';
import dharaImg from '../../components/Pictures/Projects/Dhara.png';
import { imageCache, browserCache } from '../../utils/cache';
import './Testimonials.css';

/**
 * Observations Data
 */
const OBSERVATIONS_DATA = [
  {
    id: 'OBS — 001',
    source: 'PRAKRITI DESIGN',
    variant: 'compact',
    quote:
      '“I particularly wish to acknowledge Vishvara for her exceptional dedication and contributions.”',
    name: 'Bhushan Sharma',
    role: 'CEO & Designer · Prakriti Design',
    photo: bhushanImg,
    photoAlt: 'Bhushan Sharma — CEO & Designer at Prakriti Design'
  },
  {
    id: 'OBS — 002',
    source: 'DFC HACKATHON',
    variant: 'medium',
    quote:
      '“I had the opportunity to work with Vishvara during the DFC Hackathon, and her dedication, hard work, and passion for learning UI/UX truly stood out.”',
    name: 'Hitesh Kumawat',
    role: 'Product Designer · Gracker AI',
    photo: hiteshImg,
    photoAlt: 'Hitesh Kumawat — Product Designer at Gracker AI'
  },
  {
    id: 'OBS — 003',
    source: 'COLLABORATOR',
    variant: 'wide',
    quote:
      '“Vishvara has a rare quality — she doesn’t just research users, she genuinely cares about them. Every insight she brings is grounded in real empathy, not just method. Working with her made our whole team think differently about who we were designing for.”',
    name: 'Komal Loat',
    role: 'Senior UX/UI Designer',
    photo: komalImg,
    photoAlt: 'Komal Loat — Senior UX/UI Designer'
  },
  {
    id: 'OBS — 004',
    source: 'ADIT',
    variant: 'wide',
    quote:
      '“What I really like about Vishvara is the way she thinks. She is smart, creative, curious, and she can come up with ideas that most of us wouldn’t even think of. She reads a lot, especially about psychology, and that naturally reflects in the way she understands people and approaches UX problems. I’ve also seen how genuinely interested she is in user research and healthcare. For me, her biggest strength is simple—she thinks differently, and that makes her stand out.”',
    name: 'Dhara Ponkia',
    role: 'Lead Product Designer · Adit',
    photo: dharaImg,
    photoAlt: 'Dhara Ponkia — Lead Product Designer at Adit',
    photoStyle: { objectPosition: 'center top' }
  }
];

/**
 * Helper to highlight any occurrence of "Vishvara" in accent color
 */
const renderWithAccent = (text) => {
  if (typeof text !== 'string') return text;
  const parts = text.split(/(Vishvara)/g);
  if (parts.length === 1) return text;
  return parts.map((part, index) =>
    part === 'Vishvara' ? (
      <span key={index} className="observation-highlight-accent">
        {part}
      </span>
    ) : (
      part
    )
  );
};

export const ObservationCard = memo(({
  id,
  source,
  quote,
  name,
  role,
  photo,
  photoAlt,
  photoStyle,
  variant = 'compact'
}) => {
  return (
    <article className={`observation-card observation-card--${variant}`}>
      {/* Top Bar: Identifier */}
      <header className="observation-card-header">
        <span className="observation-card-id">{id}</span>
      </header>

      {/* Main Quote */}
      <blockquote className="observation-card-quote">
        <p>{renderWithAccent(quote)}</p>
      </blockquote>

      {/* Bottom Section: Author info on left, photo on right */}
      <footer className="observation-card-footer">
        <div className="observation-card-author">
          <cite className="observation-card-name">{name}</cite>
          <span className="observation-card-role">{role}</span>
        </div>

        {photo && (
          <div className="observation-card-photo-wrapper">
            <img
              src={photo}
              alt={photoAlt || name}
              className="observation-card-photo"
              style={photoStyle}
              loading="lazy"
              decoding="async"
            />
          </div>
        )}
      </footer>
    </article>
  );
});

ObservationCard.displayName = 'ObservationCard';

export const Testimonials = memo(({
  observations = OBSERVATIONS_DATA,
  title = 'Testimonies'
}) => {
  // Pre-cache testimonial author photos in memory & browser cache
  useEffect(() => {
    const photos = [bhushanImg, hiteshImg, komalImg, dharaImg];
    imageCache.preloadAll(photos);
    browserCache.cacheUrls(photos);
  }, []);

  return (
    <Section
      id="observations"
      paddingTop="default"
      paddingBottom="default"
      className="observations-section"
    >
      <Container>
        {title && (
          <header className="observations-header">
            <h2 className="observations-section-title">{title}</h2>
          </header>
        )}

        <div className="observations-grid">
          {observations.map((obs) => (
            <ObservationCard
              key={obs.id}
              id={obs.id}
              source={obs.source}
              variant={obs.variant}
              quote={obs.quote}
              name={obs.name}
              role={obs.role}
              photo={obs.photo}
              photoAlt={obs.photoAlt}
              photoStyle={obs.photoStyle}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
});

Testimonials.displayName = 'Testimonials';

export default Testimonials;
