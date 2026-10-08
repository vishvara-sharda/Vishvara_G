import React, { memo, useEffect } from 'react';
import Container from '../../components/Container/Container';
import Section from '../../components/Section/Section';
import MediaPlaceholder from '../../components/MediaPlaceholder/MediaPlaceholder';
import Button from '../../components/Button/Button';
import HeroHeading from './HeroHeading';
import HeroStatement from './HeroStatement';
import thumbnailVideo from '../../components/Pictures/Thumbnail video.jpg';
import pencilCircleImg from '../../assets/pencil-circle.png';
import { imageCache, browserCache } from '../../utils/cache';
import './Hero.css';

export const Hero = memo(() => {
  // Pre-cache hero assets in memory & browser CacheStorage
  useEffect(() => {
    const heroAssets = [thumbnailVideo, pencilCircleImg].filter(Boolean);
    imageCache.preloadAll(heroAssets);
    browserCache.cacheUrls(heroAssets);
  }, []);
  const handleConnectClick = (e) => {
    e.preventDefault();
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
              variant="accent"
              href="#contact"
              onClick={handleConnectClick}
              aria-label="Connect with me"
            >
              Connect with me
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
