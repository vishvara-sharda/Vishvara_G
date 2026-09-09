import React, { memo, useEffect } from 'react';
import Section from '../../components/Section/Section';
import Container from '../../components/Container/Container';
import sadSnowmanImg from '../../components/Pictures/The Sad Snowman - Unlucky Day.png';
import sadSnowmanMeltdownImg from '../../components/Pictures/The Sad Snowman - Meltdown.png';
import { imageCache, browserCache } from '../../utils/cache';
import './Essays.css';

/**
 * Editorial Essays Data
 * Clean model with year, title, illustrationSvg, and destination
 */
const DEFAULT_ESSAYS = [
  {
    id: 'essay-01',
    title: 'Currencies you never know you have',
    year: '2026',
    illustrationSvg: (
      <img
        src={sadSnowmanImg}
        alt="The Sad Snowman - Unlucky Day"
        className="essay-illustration-img"
        loading="lazy"
        decoding="async"
      />
    ),
    destination:
      'https://sharda01.substack.com/p/currencies-you-never-know-you-have?r=57iabo&utm_campaign=post&utm_medium=web'
  },
  {
    id: 'essay-02',
    title: 'Is India solving any problems?',
    year: '2026',
    illustrationSvg: (
      <img
        src={sadSnowmanMeltdownImg}
        alt="The Sad Snowman - Meltdown"
        className="essay-illustration-img"
        loading="lazy"
        decoding="async"
      />
    ),
    destination: '#is-india-solving-any-problems'
  }
];

/**
 * Single Essay Card Component
 * - Year at top
 * - Image in the middle
 * - Title shifted down to bottom
 * - Subtext removed
 */
export const EssayItem = memo(({
  title,
  year = '2026',
  illustrationSvg,
  destination = '#'
}) => {
  const isExternal =
    typeof destination === 'string' &&
    (destination.startsWith('http://') || destination.startsWith('https://'));

  return (
    <a
      href={destination}
      className="essay-card"
      aria-label={`${title} (${year})`}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {/* Left side: Year and heading */}
      <div className="essay-card-left">
        <span className="essay-card-year">{year}</span>
        <h3 className="essay-card-title">{title}</h3>
      </div>

      {/* Right side: Image / illustration */}
      {illustrationSvg && (
        <div className="essay-card-right">
          {illustrationSvg}
        </div>
      )}
    </a>
  );
});

EssayItem.displayName = 'EssayItem';

/**
 * Editorial Essays Section Component — 2-Column Grid
 */
export const Essays = memo(({ essays = DEFAULT_ESSAYS, title = 'Essays' }) => {
  // Pre-cache essay illustrations in memory & browser cache
  useEffect(() => {
    imageCache.preloadAll([sadSnowmanImg, sadSnowmanMeltdownImg]);
    browserCache.cacheUrls([sadSnowmanImg, sadSnowmanMeltdownImg]);
  }, []);

  return (
    <Section id="essays" paddingTop="default" paddingBottom="default" className="essays-section">
      <Container>
        {title && (
          <header className="essays-header">
            <h2 className="essays-section-title">{title}</h2>
          </header>
        )}

        <div className="essays-grid">
          {essays.map((essay) => (
            <EssayItem
              key={essay.id || essay.title}
              title={essay.title}
              year={essay.year}
              illustrationSvg={essay.illustrationSvg}
              destination={essay.destination}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
});

Essays.displayName = 'Essays';

export default Essays;
