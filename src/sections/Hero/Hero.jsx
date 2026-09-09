import React, { memo } from 'react';
import Container from '../../components/Container/Container';
import Section from '../../components/Section/Section';
import MediaPlaceholder from '../../components/MediaPlaceholder/MediaPlaceholder';
import Button from '../../components/Button/Button';
import LinkedInIcon from '../../components/icons/LinkedInIcon';
import HeroHeading from './HeroHeading';
import HeroStatement from './HeroStatement';
import thumbnailVideo from '../../components/Pictures/Thumbnail video.jpg';
import './Hero.css';

export const Hero = memo(() => {
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
              priority={true}
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
