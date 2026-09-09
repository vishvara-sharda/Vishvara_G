import React, { useState, useEffect, memo, useCallback } from 'react';
import Section from '../../components/Section/Section';
import Container from '../../components/Container/Container';
import img1 from '../../components/Pictures/CircularGallary/1.jpeg';
import img2 from '../../components/Pictures/CircularGallary/2.jpeg';
import img3 from '../../components/Pictures/CircularGallary/3.jpeg';
import img4 from '../../components/Pictures/CircularGallary/4.jpeg';
import img5 from '../../components/Pictures/CircularGallary/5.jpeg';
import img6 from '../../components/Pictures/CircularGallary/6.jpeg';
import img7 from '../../components/Pictures/CircularGallary/7.jpeg';
import { imageCache, browserCache } from '../../utils/cache';
import './PersonalGallery.css';

const GALLERY_ITEMS = [
  {
    id: 1,
    image: img1,
    text: "Almost got mugged for ₹500 that day because some people thought my bestie and I were a couple.",
    span: 1,
    aspectRatio: '4 / 5'
  },
  {
    id: 2,
    image: img2,
    text: "Wore my mum’s 20-year-old saree for my bachelor’s farewell.",
    span: 1,
    aspectRatio: '4 / 5'
  },
  {
    id: 3,
    image: img3,
    text: "After the last exam of my bachelor’s, celebrating because we knew we’d pass.",
    span: 1,
    aspectRatio: '4 / 5'
  },
  {
    id: 4,
    image: img4,
    text: "Got ready at the last minute and started panicking because I couldn’t get a cab to my master’s freshers.",
    span: 1,
    aspectRatio: '4 / 5'
  },
  {
    id: 5,
    image: img5,
    text: "Watched a movie in a theatre for the first time, and it was DHURANDHAR!!! Best first experience ever.",
    span: 1,
    aspectRatio: '4 / 5'
  },
  {
    id: 6,
    image: img6,
    text: "Spent my birthday alone because my bestie and I weren’t talking. Went to an art gallery and did some self-reflection. We talked it through later.",
    span: 1,
    aspectRatio: '4 / 5'
  },
  {
    id: 7,
    image: img7,
    text: "Took this picture at 4 AM with makeup on, got pimples and a headache the next day, and slept till 2 PM.",
    span: 2,
    aspectRatio: '16 / 10',
    objectPosition: 'center 15%'
  }
];

const GalleryCard = memo(({ item, isActive, onClick }) => {
  return (
    <div
      className={`personal-gallery-card personal-gallery-card--span-${item.span} ${
        isActive ? 'is-active' : ''
      }`}
      style={{ aspectRatio: item.aspectRatio }}
      tabIndex={0}
      role="button"
      aria-label={item.text}
      onClick={(e) => onClick(item.id, e)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(item.id, e);
        }
      }}
    >
      <img
        src={item.image}
        alt={item.text}
        className="personal-gallery-img"
        style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
        loading="lazy"
        decoding="async"
      />
      <div className="personal-gallery-overlay">
        <p className="personal-gallery-caption">
          {item.text}
        </p>
      </div>
    </div>
  );
});

GalleryCard.displayName = 'GalleryCard';

export const PersonalGallery = memo(({ items = GALLERY_ITEMS }) => {
  const [activeId, setActiveId] = useState(null);

  // Pre-cache all gallery images into memory and browser cache
  useEffect(() => {
    const images = [img1, img2, img3, img4, img5, img6, img7];
    imageCache.preloadAll(images);
    browserCache.cacheUrls(images);
  }, []);

  const handleCardClick = useCallback((id, e) => {
    if (e) e.stopPropagation();
    setActiveId((prev) => (prev === id ? null : id));
  }, []);

  useEffect(() => {
    if (activeId === null) return;
    const handleOutsideClick = () => {
      setActiveId(null);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [activeId]);

  return (
    <Section
      id="me"
      paddingTop="large"
      paddingBottom="large"
      className="personal-gallery-section"
    >
      <Container>
        <h2 className="personal-gallery-title">Inside designer's heart</h2>
        <div className="personal-gallery-grid">
          {items.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
              isActive={activeId === item.id}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
});

PersonalGallery.displayName = 'PersonalGallery';

export default PersonalGallery;
