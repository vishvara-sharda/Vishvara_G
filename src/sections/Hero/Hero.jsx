import React, { memo, useEffect } from 'react';
import Container from '../../components/Container/Container';
import Section from '../../components/Section/Section';
import MediaPlaceholder from '../../components/MediaPlaceholder/MediaPlaceholder';
import Button from '../../components/Button/Button';
import LinkedInIcon from '../../components/icons/LinkedInIcon';
import HeroHeading from './HeroHeading';
import HeroStatement from './HeroStatement';
import thumbnailVideo from '../../components/Pictures/Thumbnail video.svg';
import { imageCache, browserCache } from '../../utils/cache';
import './Hero.css';

export const Hero = memo(() => {
  // Preload and cache the hero media into memory and browser cache
  useEffect(() => {
    if (thumbnailVideo) {
      imageCache.preload(thumbnailVideo);
      browserCache.cacheUrls([thumbnailVideo]);
    }
  }, []);

  return (
    <Section id="hero" paddingTop="hero" paddingBottom="hero" className="hero-section">
      <Container>
        <div className="hero-content">
          <div className="hero-heading-composition">
            <HeroHeading />
            <HeroStatement />
          </div>
          <div className="hero-media-wrapper">
            <MediaPlaceholder
              aspectRatio="16 / 9"
              src={thumbnailVideo}
              alt="System Thinking featured video thumbnail"
            />
          </div>
          <div className="hero-actions">
            <Button
              variant="apple-linkedin"
              href="https://www.linkedin.com/in/vishvara-gandharv/"
              aria-label="Visit LinkedIn profile"
              icon={<LinkedInIcon size={22} />}
            >
              LinkedIn
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
