import React, { useState, useEffect, memo, useCallback } from 'react';
import Container from '../../components/Container/Container';
import CachedImage from '../../components/CachedImage/CachedImage';
import murmurCover from '../../components/Pictures/Projects/Murmur/Cover page.png';
import iaImg from '../../components/Pictures/Projects/Murmur/IA.png';
import ia3Img from '../../components/Pictures/Projects/Murmur/Ia 3.png';
import ia4Img from '../../components/Pictures/Projects/Murmur/IA4.png';
import iaHerImg from '../../components/Pictures/Projects/Murmur/IAher.png';
import iaHimImg from '../../components/Pictures/Projects/Murmur/iahim.png';
import researchIAImg from '../../components/Pictures/Projects/Murmur/research IA.png';
import idea2Img from '../../components/Pictures/Projects/Murmur/idea2.png';
import idea4Img from '../../components/Pictures/Projects/Murmur/idea4.png';
import idea5Img from '../../components/Pictures/Projects/Murmur/idea5.jpg';
import fullViewImg from '../../components/Pictures/Projects/Murmur/full view.png';
import fullViewManImg from '../../components/Pictures/Projects/Murmur/full view man.png';
import belliesImg from '../../components/Pictures/Projects/Murmur/bellies.png';
import pvmGlowRedImg from '../../components/Pictures/Projects/Murmur/pvm glow red.png';
import pvwGlowRedImg from '../../components/Pictures/Projects/Murmur/pvw glow red.png';
import p1Img from '../../components/Pictures/Projects/Murmur/p1.png';
import p2Img from '../../components/Pictures/Projects/Murmur/p2.png';
import p3Img from '../../components/Pictures/Projects/Murmur/p3.png';
import p4Img from '../../components/Pictures/Projects/Murmur/p4.png';
import p5Img from '../../components/Pictures/Projects/Murmur/p5.png';
import p6Img from '../../components/Pictures/Projects/Murmur/p6.png';
import femaleVideo from '../../components/Pictures/Projects/Murmur/female.mp4';
import maleVideo from '../../components/Pictures/Projects/Murmur/male.mp4';
import technicalViewImg from '../../components/Pictures/Projects/Murmur/technical view.png';
import menTechnicalImg from '../../components/Pictures/Projects/Murmur/men techoncal.png';
import { imageCache, browserCache, storageCache } from '../../utils/cache';
import './CaseStudy.css';
import './MurmurCaseStudy.css';

export const MURMUR_ALL_ASSETS = [
  murmurCover,
  belliesImg,
  pvmGlowRedImg,
  pvwGlowRedImg,
  p1Img,
  p2Img,
  p3Img,
  p4Img,
  p5Img,
  p6Img,
  idea4Img,
  idea5Img,
  idea2Img,
  fullViewImg,
  fullViewManImg,
  technicalViewImg,
  menTechnicalImg,
  researchIAImg,
  ia4Img,
  iaImg,
  ia3Img,
  iaHerImg,
  iaHimImg
];

// Eagerly warm up in-memory decode cache and browser CacheStorage immediately
if (typeof window !== 'undefined') {
  imageCache.preloadAll(MURMUR_ALL_ASSETS);
  browserCache.cacheUrls(MURMUR_ALL_ASSETS);
}

/**
 * Postpartum Experience Research Synthesis Data
 */
const POSTPARTUM_DIMENSIONS = [
  {
    number: "01",
    title: "FAMILY",
    painPoints: [
      "Elders may not let her rest or take a break.",
      "Cultural practices can feel suffocating.",
      "Family may ignore doctor’s advice.",
      "Relatives may give the baby things doctors don’t recommend.",
      "Family may place dietary restrictions on her."
    ]
  },
  {
    number: "02",
    title: "PARTNER",
    painPoints: [
      "He may not understand how she feels.",
      "He wants to help but doesn’t know what to do.",
      "His attempts to help can overwhelm her.",
      "Work can make him less available.",
      "Distance can make them feel less connected."
    ]
  },
  {
    number: "03",
    title: "SELF",
    painPoints: [
      "She can feel disconnected from herself.",
      "She may lose her sense of purpose.",
      "Things she once enjoyed may no longer feel interesting.",
      "She may have no time for herself.",
      "Poor sleep and constant care can leave her overstimulated and drained."
    ]
  }
];

/**
 * Subcomponent: Parent Node (Solid white fill, Murmur yellow text, rounded pill, minimal)
 */
const ExperienceHeader = () => (
  <div className="postpartum-parent-wrapper">
    <div className="postpartum-parent-badge">
      <span className="postpartum-parent-text">users affect mother</span>
    </div>
  </div>
);

/**
 * Subcomponent: HierarchyConnector
 * Desktop: Thin vertical line from parent branching horizontally into 3 columns
 * Mobile: Clean vertical stem line downward
 */
const HierarchyConnector = () => (
  <>
    <div className="postpartum-connector-desktop" aria-hidden="true">
      <svg
        className="postpartum-tree-svg"
        viewBox="0 0 1000 52"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M500 0 V26 M166.7 26 H833.3 M166.7 26 V52 M500 26 V52 M833.3 26 V52"
          stroke="rgba(248, 195, 99, 0.45)"
          strokeWidth="1.5"
        />
        <circle cx="500" cy="0" r="3" fill="#F8C363" />
        <circle cx="166.7" cy="52" r="3" fill="#F8C363" />
        <circle cx="500" cy="52" r="3" fill="#F8C363" />
        <circle cx="833.3" cy="52" r="3" fill="#F8C363" />
      </svg>
    </div>
    <div className="postpartum-connector-mobile" aria-hidden="true">
      <div className="postpartum-stem-line" />
      <span className="postpartum-stem-arrow">↓</span>
    </div>
  </>
);

/**
 * Subcomponent: Single Research Dimension Column (Editorial, not cards)
 */
const ResearchDimension = ({ dimension }) => (
  <article
    className={`postpartum-dimension-col postpartum-dim-${dimension.title.toLowerCase()}`}
    aria-label={`Dimension: ${dimension.title}`}
  >
    <div className="postpartum-dimension-header">
      {dimension.title === 'PARTNER' && (
        <h6 className="postpartum-partner-tagline">the user we took</h6>
      )}
      <h3 className="postpartum-dimension-heading">{dimension.title}</h3>
    </div>
    <div className="postpartum-dimension-divider" aria-hidden="true" />
    <ul className="postpartum-pain-list">
      {dimension.painPoints.map((point, idx) => (
        <li key={idx} className="postpartum-pain-item">
          <span className="postpartum-pain-dash" aria-hidden="true">—</span>
          <span className="postpartum-pain-text">{point}</span>
        </li>
      ))}
    </ul>
  </article>
);

/**
 * Subcomponent: DimensionsGrid
 * 3 equal columns side-by-side on desktop; responsive 1-column stack on mobile
 */
const DimensionsGrid = ({ dimensions }) => (
  <div className="postpartum-dimensions-grid" role="region" aria-label="Postpartum dimensions comparison">
    {dimensions.map((dim, idx) => (
      <React.Fragment key={dim.number}>
        {idx > 0 && (
          <div className="postpartum-mobile-divider" aria-hidden="true">
            <span className="postpartum-mobile-stem-line" />
            <span className="postpartum-mobile-arrow">↓</span>
          </div>
        )}
        <ResearchDimension dimension={dim} />
      </React.Fragment>
    ))}
  </div>
);

/**
 * Primary PostpartumExperience Component
 */
const PostpartumExperience = ({ dimensions = POSTPARTUM_DIMENSIONS }) => (
  <div className="postpartum-experience-map" aria-label="Postpartum Experience Research Synthesis">
    <ExperienceHeader />
    <HierarchyConnector />
    <DimensionsGrid dimensions={dimensions} />
  </div>
);

/**
 * Structured Data: Research & Information Architecture Bento Showcase
 */
const MURMUR_IA_SHOWCASE = [
  {
    id: 'research-ia',
    src: researchIAImg,
    alt: 'Murmur information architecture research and synthesis',
    className: 'bento-tile-research-ia'
  },
  {
    id: 'ia4',
    src: ia4Img,
    alt: 'Murmur information architecture flow exploration',
    className: 'bento-tile-ia4'
  },
  {
    id: 'ia',
    src: iaImg,
    alt: 'Murmur core information architecture pillars',
    className: 'bento-tile-ia'
  },
  {
    id: 'ia3',
    src: ia3Img,
    alt: 'Murmur system architecture and feature map',
    className: 'bento-tile-ia3'
  },
  {
    id: 'ia-her',
    src: iaHerImg,
    alt: 'Murmur user flow and information architecture for the mother',
    className: 'bento-tile-ia-her'
  },
  {
    id: 'ia-him',
    src: iaHimImg,
    alt: 'Murmur user flow and information architecture for the partner',
    className: 'bento-tile-ia-him'
  },
  {
    id: 'idea4',
    src: idea4Img,
    alt: 'Murmur mobile application interface, color palette, and feature set',
    className: 'bento-tile-idea4'
  }
];

/**
 * Subcomponent: ImageLightbox
 * Full-screen modal for high-resolution inspection of research artifacts.
 * Supports backdrop click, × button, and Escape key to close.
 */
const ImageLightbox = memo(function ImageLightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      className="murmur-lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Inspect research artifact"
    >
      <button
        type="button"
        className="murmur-lightbox-close"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <span aria-hidden="true">✕</span>
      </button>

      <div
        className="murmur-lightbox-content"
        onClick={(e) => e.stopPropagation()}
      >
        <CachedImage
          src={image.src}
          alt={image.alt}
          className="murmur-lightbox-img"
          priority={true}
          objectFit="contain"
        />
      </div>
    </div>
  );
});

/**
 * Subcomponent: BentoTile
 * Tightly hugs the image's natural aspect ratio with zero wasted container space.
 */
const BentoTile = memo(function BentoTile({ item, onSelect }) {
  return (
    <button
      type="button"
      className={`murmur-bento-tile ${item.className}`}
      onClick={() => onSelect(item)}
      aria-label={`Open full size view: ${item.alt}`}
    >
      <CachedImage
        src={item.src}
        alt={item.alt}
        className="murmur-bento-img"
        priority={true}
        objectFit="contain"
      />
    </button>
  );
});

/**
 * Subcomponent: IABento
 * Tightly packed, aspect-ratio calibrated bento composition.
 */
const IABento = memo(function IABento({ items, onSelectImage }) {
  return (
    <div
      className="murmur-bento-wall"
      role="region"
      aria-label="Information Architecture and Research Artifacts Showcase"
    >
      {/* Row 1: research IA (1.774) + IA4 (1.364) */}
      <div className="murmur-bento-row murmur-bento-row-1">
        <BentoTile item={items[0]} onSelect={onSelectImage} />
        <BentoTile item={items[1]} onSelect={onSelectImage} />
      </div>

      {/* Row 2: IA (1.500) + Ia 3 (1.899) */}
      <div className="murmur-bento-row murmur-bento-row-2">
        <BentoTile item={items[2]} onSelect={onSelectImage} />
        <BentoTile item={items[3]} onSelect={onSelectImage} />
      </div>

      {/* Row 3: IAher (0.910) + iahim (1.621) + idea4 (0.940) */}
      <div className="murmur-bento-row murmur-bento-row-3">
        <BentoTile item={items[4]} onSelect={onSelectImage} />
        <BentoTile item={items[5]} onSelect={onSelectImage} />
        <BentoTile item={items[6]} onSelect={onSelectImage} />
      </div>
    </div>
  );
});

/**
 * Structured Data: Murmur Doll Features & Product Story Cards
 */
const MURMUR_DOLL_FEATURES = [
  {
    id: 'detachable-bellies',
    number: '01',
    name: 'Detachable bellies',
    image: belliesImg,
    aspectRatio: '1683 / 935',
    alt: 'Detachable bellies progressive magnetic attachments',
    howItWorks: (
      <>
        <strong>He changes</strong> the belly every month.
        <br />
        Magnetic click.
      </>
    ),
    whyThis: (
      <>
        A small ritual that <strong>creates</strong> a sense of{' '}
        <strong>belonging</strong> and shared{' '}
        <strong>anticipation</strong>.
      </>
    )
  },
  {
    id: 'warmth-connection',
    number: '02',
    name: 'Warmth / paired connection',
    images: [pvwGlowRedImg, pvmGlowRedImg],
    alt: 'Murmur partner figures gentle warming and ambient red glow',
    howItWorks: (
      <>
        <strong>Pick it up</strong> and <strong>turn it on</strong>.
        <br />
        <br />
        It gently <strong>warms</strong> to feel like <strong>human skin</strong>. When one partner turns theirs on, the other one <strong>buzzes</strong> too. When held, <strong>both begin to warm</strong>, <strong>no matter the distance</strong>.
      </>
    ),
    whyThis: (
      <>
        A <strong>secret code between partners</strong>, where <strong>familiar warmth</strong> creates a <strong>sense of closeness</strong>, even from <strong>far away</strong>.
      </>
    )
  },
  {
    id: 'human-breathing',
    number: '03',
    name: 'Human breathing',
    videos: [femaleVideo, maleVideo],
    aspectRatio: '1536 / 1024',
    alt: 'Murmur synced breathing partner figures simulation',
    howItWorks: (
      <>
        <strong>Mimics human breathing</strong>.
        <br />
        <br />
        When <strong>both partners</strong> hold their dolls together, they begin to{' '}
        <strong>breathe and warm up together</strong>.
      </>
    ),
    whyThis: (
      <>
        Creates a <strong>sense of belonging</strong> and a{' '}
        <strong>secret language</strong> — a{' '}
        <strong>shared rhythm</strong> that belongs{' '}
        <strong>only to them</strong>.
      </>
    )
  }
];

/**
 * Component: FeatureCard
 * Editorial product-story card for each Murmur doll feature.
 * 3-Column structure on desktop: Feature image / name | How it works? | Why this?
 * Mobile: Clean vertical stack.
 */
const FeatureCard = memo(function FeatureCard({ feature, onSelectImage }) {
  return (
    <article className="murmur-feature-card" aria-label={`Feature: ${feature.name || feature.id}`}>
      {/* Column 1 — Feature: Label + Visual Anchor + Name on Bottom */}
      <div className="murmur-card-col murmur-card-col-feature">
        <div className="murmur-card-col-header">
          <span className="murmur-card-col-label">
            {feature.number ? `${feature.number} · FEATURE` : 'FEATURE'}
          </span>
        </div>

        {/* Feature Visual(s): Videos or Images */}
        {feature.videos && feature.videos.length > 0 ? (
          <div className="murmur-feature-gallery-grid">
            {feature.videos.map((vidSrc, vidIdx) => (
              <div key={vidIdx} className="murmur-feature-video-item">
                <div
                  className="murmur-feature-img-wrap murmur-feature-video-wrap"
                  style={{ aspectRatio: feature.aspectRatio || '1536 / 1024' }}
                >
                  <video
                    src={vidSrc}
                    className="murmur-feature-img murmur-feature-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-label={`${feature.name || 'Murmur partner figure video'} view ${vidIdx + 1}`}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : feature.video ? (
          <div className="murmur-feature-video-item">
            <div
              className="murmur-feature-img-wrap murmur-feature-video-wrap"
              style={{ aspectRatio: feature.aspectRatio || '1683 / 935' }}
            >
              <video
                src={feature.video}
                className="murmur-feature-img murmur-feature-video"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label={feature.alt || feature.name || 'Feature video'}
              />
            </div>
          </div>
        ) : feature.images && feature.images.length > 0 ? (
          <div className="murmur-feature-gallery-grid">
            {feature.images.map((imgSrc, imgIdx) => (
              <button
                key={imgIdx}
                type="button"
                className="murmur-feature-img-btn murmur-feature-gallery-btn"
                onClick={() => onSelectImage?.({ src: imgSrc, alt: `${feature.name || 'Murmur partner figure'} view ${imgIdx + 1}` })}
                aria-label={`Inspect visual ${imgIdx + 1}`}
              >
                <CachedImage
                  src={imgSrc}
                  alt={`${feature.name || 'Murmur partner figure'} view ${imgIdx + 1}`}
                  className="murmur-feature-img"
                  wrapperClassName="murmur-feature-img-wrap"
                  aspectRatio="1536 / 1024"
                  objectFit="cover"
                />
              </button>
            ))}
          </div>
        ) : feature.image ? (
          <button
            type="button"
            className="murmur-feature-img-btn"
            onClick={() => onSelectImage?.({ src: feature.image, alt: feature.alt || feature.name || 'Feature visual' })}
            aria-label={feature.alt || feature.name || "Inspect feature visual"}
          >
            <CachedImage
              src={feature.image}
              alt={feature.alt || feature.name || 'Feature visual'}
              className="murmur-feature-img"
              wrapperClassName="murmur-feature-img-wrap"
              aspectRatio={feature.aspectRatio || "1683 / 935"}
              objectFit="cover"
            />
          </button>
        ) : null}

        {/* Feature Name placed on bottom of image for every card */}
        {feature.name && (
          <div className="murmur-card-feature-bottom-meta">
            <h3 className="murmur-card-feature-name">{feature.name}</h3>
          </div>
        )}
      </div>

      {/* Column 2 — How it works? */}
      <div className="murmur-card-col murmur-card-col-how">
        <div className="murmur-card-col-header">
          <span className="murmur-card-col-label">HOW IT WORKS?</span>
        </div>
        <div className="murmur-card-body-text murmur-card-how-text">
          {feature.howItWorks}
        </div>
      </div>

      {/* Column 3 — Why this? */}
      <div className="murmur-card-col murmur-card-col-why">
        <div className="murmur-card-col-header">
          <span className="murmur-card-col-label">WHY THIS?</span>
        </div>
        <div className="murmur-card-body-text murmur-card-why-text">
          {feature.whyThis}
        </div>
      </div>
    </article>
  );
});

export const MurmurCaseStudy = memo(({ onNavigateBack }) => {
  const [activeLightboxImage, setActiveLightboxImage] = useState(null);

  const handleOpenLightbox = useCallback((item) => {
    setActiveLightboxImage(item);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setActiveLightboxImage(null);
  }, []);
  // Set document title
  useEffect(() => {
    document.title = 'Murmur Case Study | Vishvara';
    return () => {
      document.title = 'Vishvara | Product Designer & UX Researcher';
    };
  }, []);

  // Scroll to top upon entry
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Preload and cache Murmur assets
  useEffect(() => {
    imageCache.preloadAll(MURMUR_ALL_ASSETS);
    browserCache.cacheUrls(MURMUR_ALL_ASSETS);
  }, []);

  const handleBack = useCallback((e) => {
    if (e) e.preventDefault();
    if (typeof window !== 'undefined') {
      delete window.__murmur_cta_active;
      window.sessionStorage.removeItem('murmur_cta_active');
      window.sessionStorage.removeItem('murmur_cta_message');
    }
    if (onNavigateBack) {
      onNavigateBack();
    } else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }, [onNavigateBack]);

  const handleLetsTalkClick = useCallback((e) => {
    if (e) e.preventDefault();

    const murmurMessage = "Hey, I really liked the Murmur case study. I’d love to talk about the business side of the idea and how you approached solving the problem.";
    const prefillData = {
      message: murmurMessage,
      subject: "Murmur — Business Discussion"
    };

    // 1. Clear any persistent draft so standard visits are never contaminated
    storageCache.remove('footer_form_draft');
    storageCache.remove('contact_prefill');

    // 2. Set temporary context specifically for this CTA interaction
    if (typeof window !== 'undefined') {
      window.__murmur_cta_active = true;
      window.sessionStorage.setItem('murmur_cta_active', 'true');
      window.sessionStorage.setItem('murmur_cta_message', murmurMessage);
    }

    // 3. Dispatch specific event to notify any already mounted Contact listener
    window.dispatchEvent(new CustomEvent('murmur_cta_click', { detail: prefillData }));
    window.dispatchEvent(new CustomEvent('prefill_contact', { detail: prefillData }));

    // 4. Navigate to Contact with temporary query parameter identifying the Murmur CTA
    window.history.pushState({ fromMurmurCta: true }, '', '/?cta=murmur#contact');
    window.dispatchEvent(new PopStateEvent('popstate'));

    // 5. Smooth scroll down to contact section
    const scrollToContact = () => {
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        const navHeight = 60;
        const targetPosition = contactElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth'
        });
      }
    };

    setTimeout(scrollToContact, 60);
    setTimeout(scrollToContact, 200);
    setTimeout(scrollToContact, 400);
  }, []);

  return (
    <div className="murmur-case-study-page">
      <Container>
        {/* Navigation / Breadcrumb Bar */}
        <nav className="murmur-nav-bar" aria-label="Breadcrumb">
          <button
            type="button"
            onClick={handleBack}
            className="murmur-back-btn"
            aria-label="Return to portfolio projects overview"
          >
            ← Back to Projects
          </button>
          <span className="murmur-category-badge">
            <CachedImage
              src={murmurCover}
              alt=""
              className="murmur-sunflower-icon"
              wrapperClassName="murmur-sunflower-icon-wrap"
              priority={true}
              aria-hidden="true"
            />
            Murmur Case Study
          </span>
        </nav>

        {/* Header */}
        <header className="murmur-header">
          <div className="murmur-project-title-row">
            <h1 className="murmur-project-title">Murmur</h1>
            <CachedImage
              src={murmurCover}
              alt="Murmur emblem"
              className="murmur-header-logo"
              wrapperClassName="murmur-header-logo-wrap"
              priority={true}
              objectFit="contain"
            />
          </div>
          <p className="murmur-tagline">
            A kinder journey, together · Postpartum care & emotional connection ecosystem for new parents.
          </p>
        </header>

        {/* Main Content Flow */}
        <main className="murmur-content">
          {/* ================================================================
              1. THE PROBLEM
              ================================================================ */}
          <section className="case-study-section" id="problem" aria-labelledby="heading-problem">
            <h2 id="heading-problem" className="case-study-section-heading">
              The Problem
            </h2>
            <p className="case-study-body-text">
              During pregnancy and postpartum,{' '}
              <span className="case-study-text-accent murmur-text-accent">
                mothers and families often struggle to know what she needs and how to support her
              </span>
              .{' '}
              Most of the time, support feels like{' '}
              <span className="case-study-text-accent murmur-text-accent">
                telling her what to do, rather than listening to what she needs
              </span>
              .
            </p>

            {/* What we designed — side-by-side videos */}
            <div className="murmur-designed-section">
              <h4 className="murmur-designed-heading">what we designed</h4>
              <div className="murmur-videos-grid" role="group" aria-label="Murmur design showcase videos">
                <div className="murmur-video-card">
                  <video
                    src={femaleVideo}
                    className="murmur-designed-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    preload="metadata"
                    aria-label="Murmur design preview - Mother experience"
                  />
                </div>
                <div className="murmur-video-card">
                  <video
                    src={maleVideo}
                    className="murmur-designed-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    preload="metadata"
                    aria-label="Murmur design preview - Partner experience"
                  />
                </div>
              </div>

              {/* Transition: Why we design this? */}
              <h1 className="murmur-why-heading">why we design this?</h1>
              <h6 className="murmur-start-heading">let's start from the start</h6>

              {/* My role · Solving it */}
              <div className="murmur-role-section" id="role">
                <h2 id="heading-role" className="case-study-section-heading">
                  My role · Solving it
                </h2>
                <p className="case-study-supporting-text">
                  <span className="case-study-text-accent murmur-text-accent">Lead</span> Product{' '}
                  <span className="case-study-text-accent murmur-text-accent">Designer</span> & UX Researcher in a team of 9
                </p>
              </div>
            </div>
          </section>

          {/* ================================================================
              2. USER RESEARCH
              ================================================================ */}
          <section className="case-study-section" id="research" aria-labelledby="heading-research">
            <h2 id="heading-research" className="case-study-section-heading">
              User Research
            </h2>
            <p className="case-study-body-text">
              We spoke to mothers and families to understand what happens between needing support and actually being able to receive it.
            </p>

            <div className="murmur-field-gallery-row" role="group" aria-label="Field research photographs">
              {[
                { img: p1Img, alt: 'Field research interview documentation 1' },
                { img: p2Img, alt: 'Field research interview documentation 2' },
                { img: p3Img, alt: 'Field research interview documentation 3' },
                { img: p4Img, alt: 'Field research interview documentation 4' },
                { img: p5Img, alt: 'Field research interview documentation 5' },
                { img: p6Img, alt: 'Field research interview documentation 6' }
              ].map((photo, idx) => (
                <figure key={idx} className="murmur-field-photo-card">
                  <CachedImage
                    src={photo.img}
                    alt={photo.alt}
                    className="murmur-field-photo"
                    objectFit="cover"
                  />
                </figure>
              ))}
            </div>
          </section>

          {/* ================================================================
              3. POSTPARTUM EXPERIENCE / WHAT WE FOUND
              ================================================================ */}
          <section className="case-study-section" id="postpartum-experience" aria-labelledby="heading-synthesis">
            <h2 id="heading-synthesis" className="case-study-section-heading">
              What we found
            </h2>
            <p className="case-study-body-text">
              Beyond baby, three people shape a mother’s everyday experience :{' '}
              <span className="case-study-text-accent murmur-text-accent">
                family, partner, herself.
              </span>
            </p>

            {/* Editorial 3-Column Hierarchy on Desktop / 1-Column on Mobile */}
            <PostpartumExperience />

            {/* Concluding Editorial Takeaway */}
            <div className="postpartum-takeaway-block">
              <p className="postpartum-takeaway-text">
                The postpartum experience is not one problem. It is a system of pressures and gaps across{' '}
                <span className="postpartum-takeaway-highlight">Family</span>,{' '}
                <span className="postpartum-takeaway-highlight">Partner</span>, and{' '}
                <span className="postpartum-takeaway-highlight">Self</span>.
              </p>
            </div>
          </section>

          {/* ================================================================
              4. THE SOLUTIONS WE THOUGHT
              ================================================================ */}
          <section className="case-study-section" id="proposed-solutions" aria-labelledby="heading-solutions">
            <h2 id="heading-solutions" className="case-study-section-heading">
              The solution we thought might work
            </h2>
            <p className="case-study-body-text">
              We explored an <span className="murmur-flow-ai-word">AI</span> companion for both mothers and fathers, available through a mobile app, a smartwatch, or a desk companion for the father.
            </p>

            <div className="murmur-solutions-grid" role="group" aria-label="Proposed solutions concepts">
              <figure className="murmur-solution-card">
                <div className="murmur-solution-image-wrap">
                  <CachedImage
                    src={idea4Img}
                    alt="Mobile app solution"
                    className="murmur-solution-img"
                    objectFit="cover"
                  />
                </div>
                <figcaption className="murmur-solution-caption">
                  mobile app
                </figcaption>
              </figure>

              <figure className="murmur-solution-card">
                <div className="murmur-solution-image-wrap">
                  <CachedImage
                    src={idea5Img}
                    alt="Watch app solution"
                    className="murmur-solution-img"
                    objectFit="cover"
                  />
                </div>
                <figcaption className="murmur-solution-caption">
                  watch app
                </figcaption>
              </figure>

              <figure className="murmur-solution-card">
                <div className="murmur-solution-image-wrap">
                  <CachedImage
                    src={idea2Img}
                    alt="Desk companion solution"
                    className="murmur-solution-img"
                    objectFit="cover"
                  />
                </div>
                <figcaption className="murmur-solution-caption">
                  desk companion
                </figcaption>
              </figure>
            </div>
          </section>

          {/* ================================================================
              THE SOLUTION WE CHOSE
              ================================================================ */}
          <section
            className="case-study-section murmur-chosen-section"
            id="chosen-solution"
            aria-labelledby="heading-chosen"
          >
            <div className="murmur-chosen-intro">
              <h2 id="heading-chosen" className="case-study-section-heading">
                The solution we chose
              </h2>

              <div className="murmur-app-concept-flow" role="region" aria-label="First app concept flow">
                <div className="murmur-flow-track">
                  {/* Stage 1 */}
                  <div className="murmur-flow-node">
                    <span className="murmur-flow-title">Her health + mood</span>
                  </div>

                  {/* Connector 1 */}
                  <div className="murmur-flow-arrow" aria-hidden="true">
                    <span className="murmur-arrow-desktop">→</span>
                    <span className="murmur-arrow-mobile">↓</span>
                  </div>

                  {/* Stage 2 */}
                  <div className="murmur-flow-node murmur-flow-node-ai">
                    <span className="murmur-flow-title">
                      <span className="murmur-flow-ai-word">AI</span> companion
                    </span>
                  </div>

                  {/* Connector 2 */}
                  <div className="murmur-flow-arrow" aria-hidden="true">
                    <span className="murmur-arrow-desktop">→</span>
                    <span className="murmur-arrow-mobile">↓</span>
                  </div>

                  {/* Stage 3 */}
                  <div className="murmur-flow-node murmur-flow-node-father">
                    <span className="murmur-flow-title murmur-node-desktop-title">Father</span>
                    <span className="murmur-flow-title murmur-node-mobile-title">Guides & nudges father to help</span>
                  </div>
                </div>

                <p className="murmur-flow-support-text">
                  The <span className="murmur-flow-ai-word">AI</span> <span className="murmur-flow-accent">nudges and guides the father on how to support her</span> — such as when to check in, how to talk to her, when to bring her something she likes, or how to help with the baby.
                </p>
              </div>
            </div>

            <IABento
              items={MURMUR_IA_SHOWCASE}
              onSelectImage={handleOpenLightbox}
            />
          </section>

          {/* ================================================================
              TURNING POINT: IT FAILED.
              ================================================================ */}
          <section
            className="case-study-section murmur-turning-point-section"
            id="turning-point"
            aria-labelledby="heading-turning-point"
          >
            {/* Turning Point Major H1 */}
            <header className="murmur-turning-header">
              <h1 id="heading-turning-point" className="murmur-turning-title">
                It failed.
              </h1>
              <h3 className="murmur-turning-why">
                why
              </h3>
              <p className="murmur-turning-understood">
                After more fathers interview we understood :
              </p>
            </header>

            <div className="murmur-turning-content-flow">
              {/* 1. MORE INTERVIEWS / KEY FINDINGS */}
              <article className="murmur-turning-block" id="more-interviews">
                <h3 className="murmur-turning-problem-line">
                  <strong className="murmur-problem-bold">The problem</strong>{' '}
                  <span className="murmur-problem-regular">wasn't father's don't know what to do.</span>
                </h3>
                <h4 className="murmur-turning-found-h4">
                  actually we found Fathers who want to be present already find ways to show up.
                </h4>
                <div className="murmur-turning-missing-group">
                  <div className="murmur-turning-missing-row">
                    <h1 className="murmur-turning-what-was-h1">so what was</h1>
                    <div className="murmur-turning-track-col">
                      {/* Long horizontal blank line in Murmur yellow */}
                      <div className="murmur-turning-blank-line" aria-hidden="true" />

                      {/* Continuous flowing vertical line extending across scroll space */}
                      <svg
                        className="murmur-turning-flow-svg"
                        viewBox="0 0 80 800"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M 40 0 C 40 70, 52 130, 48 200 C 44 270, 30 340, 34 420 C 38 500, 48 560, 46 640 C 44 710, 40 760, 40 800"
                          stroke="#F8C363"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>

                      {/* The answer revealed upon scrolling */}
                      <h3 className="murmur-turning-connection-h3">the connection</h3>
                      <h4 className="murmur-turning-connection-sub">
                        Less time together → emotional connection fades → presence feels invisible.
                      </h4>
                      <p className="murmur-turning-connection-context">
                        during post pregnancy it is common for couples to spend less time together
                      </p>
                    </div>
                    <h1 className="murmur-turning-missing-h1">missing?</h1>
                  </div>
                </div>

                <div className="murmur-turning-solve-group">
                  <div className="murmur-turning-solve-row">
                    <span className="case-study-section-heading murmur-solve-prefix">how do</span>
                    <div className="murmur-solve-we-col">
                      <h2 className="case-study-section-heading murmur-turning-solve-h2">
                        we solve for this?
                      </h2>
                      <h5 className="murmur-turning-solve-sub">
                        by building them a small language and a symbol of each other.
                      </h5>
                    </div>
                  </div>
                </div>

                {/* Full View Concepts Showcase */}
                <div className="murmur-solve-images-grid" role="group" aria-label="Murmur full view concepts">
                  <figure
                    className="murmur-solve-image-card"
                    onClick={() => handleOpenLightbox({ src: fullViewImg, alt: 'Murmur ecosystem interface full view' })}
                  >
                    <div className="murmur-solve-image-wrap">
                      <CachedImage
                        src={fullViewImg}
                        alt="Murmur ecosystem interface full view"
                        className="murmur-solve-img"
                        objectFit="cover"
                      />
                    </div>
                  </figure>

                  <figure
                    className="murmur-solve-image-card"
                    onClick={() => handleOpenLightbox({ src: fullViewManImg, alt: 'Murmur companion experience for partner full view' })}
                  >
                    <div className="murmur-solve-image-wrap">
                      <CachedImage
                        src={fullViewManImg}
                        alt="Murmur companion experience for partner full view"
                        className="murmur-solve-img"
                        objectFit="cover"
                      />
                    </div>
                  </figure>
                </div>
              </article>
            </div>
          </section>

          {/* HOW IT WORKS / WHY THESE FEATURES SECTION */}
          <section className="murmur-how-it-works-section" id="how-it-works" aria-label="How it works? Why these features?">
            <div className="murmur-how-it-works-group">
              <div className="murmur-how-grid">
                <span className="murmur-how-line">how it works</span>
                <span className="murmur-how-line">?</span>
                <span className="murmur-how-line murmur-how-secondary">why these features?</span>
              </div>
            </div>

            {/* Individual Feature Story Cards */}
            <div className="murmur-feature-cards-wrap" role="region" aria-label="Murmur doll feature stories">
              {MURMUR_DOLL_FEATURES.map((feature) => (
                <FeatureCard
                  key={feature.id}
                  feature={feature}
                  onSelectImage={handleOpenLightbox}
                />
              ))}
            </div>
          </section>

          {/* THE TECHNICALITIES SECTION */}
          <section className="murmur-technicalities-section" id="technicalities" aria-label="The technicalities">
            <div className="murmur-technicalities-header">
              <h2 className="murmur-technicalities-heading">the technicalities</h2>
            </div>
            <div className="murmur-technicalities-grid" role="group" aria-label="Technical internal diagrams side by side">
              <button
                type="button"
                className="murmur-technical-card"
                onClick={() => handleOpenLightbox({ src: technicalViewImg, alt: 'Technical internal view - Mother figure' })}
                aria-label="Inspect mother figure technical internal view"
              >
                <div className="murmur-technical-img-wrap">
                  <CachedImage
                    src={technicalViewImg}
                    alt="Technical internal view - Mother figure"
                    className="murmur-technical-img"
                    aspectRatio="1024 / 1536"
                    objectFit="cover"
                  />
                </div>
              </button>

              <button
                type="button"
                className="murmur-technical-card"
                onClick={() => handleOpenLightbox({ src: menTechnicalImg, alt: 'Technical internal view - Partner figure' })}
                aria-label="Inspect partner figure technical internal view"
              >
                <div className="murmur-technical-img-wrap">
                  <CachedImage
                    src={menTechnicalImg}
                    alt="Technical internal view - Partner figure"
                    className="murmur-technical-img"
                    aspectRatio="1024 / 1536"
                    objectFit="cover"
                  />
                </div>
              </button>
            </div>
          </section>

          {/* FINAL BUSINESS CTA SECTION */}
          <section className="murmur-business-cta-section" id="business-cta" aria-label="Business discussion">
            <div className="murmur-business-cta-container">
              <h2 className="murmur-business-cta-heading">
                curious how Murmur could become a business?
              </h2>
              <button
                type="button"
                className="murmur-business-cta-btn"
                onClick={handleLetsTalkClick}
                aria-label="Discuss how Murmur could become a business"
              >
                yes
              </button>
              <h3 className="murmur-business-cta-caption">
                The whole point of Murmur was never to teach someone how to be a better partner. It was to help <span className="murmur-cta-highlight">couples stay connected</span>, no matter the distance between them.
              </h3>
            </div>
          </section>

          {/* Full-screen Inspection Lightbox */}
          <ImageLightbox
            image={activeLightboxImage}
            onClose={handleCloseLightbox}
          />

          <footer className="murmur-footer-nav" style={{ marginTop: '80px' }}>
            <button
              type="button"
              onClick={handleBack}
              className="murmur-return-btn"
              aria-label="Back to projects overview"
            >
              ← Return to Projects
            </button>
            <span className="murmur-category-badge">
              Vishvara · Portfolio 2026
            </span>
          </footer>
        </main>
      </Container>
    </div>
  );
});

MurmurCaseStudy.displayName = 'MurmurCaseStudy';

export default MurmurCaseStudy;
