import React, { useState, useEffect, useCallback } from 'react';
import './styles/tokens.css';
import './styles/typography.css';
import './styles/globals.css';
import './styles/responsive.css';
import './components/Skeleton/Skeleton.css';
import ClickSpark from './components/ClickSpark/ClickSpark';
import Hero from './sections/Hero/Hero';
import QuestionIntroduction from './sections/QuestionIntroduction/QuestionIntroduction';
import Projects from './sections/Projects/Projects';
import DesignerMind from './sections/DesignerMind/DesignerMind';
import Essays from './sections/Essays/Essays';
import Testimonials from './sections/Testimonials/Testimonials';
import PersonalGallery from './sections/PersonalGallery/PersonalGallery';
import Footer from './sections/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import CaseStudy from './pages/CaseStudy/CaseStudy';
import { PortfolioSkeleton, CaseStudySkeleton } from './components/Skeleton/PortfolioSkeleton';

const parseRoute = () => {
  const pathname = window.location.pathname;
  const hash = window.location.hash;

  if (pathname.startsWith('/case-study')) {
    const parts = pathname.split('/').filter(Boolean);
    const slug = parts[1] || 'murmur';
    return { page: 'case-study', projectSlug: slug };
  }

  if (hash.startsWith('#/case-study')) {
    const cleanHash = hash.replace('#/case-study', '');
    const parts = cleanHash.split('/').filter(Boolean);
    const slug = parts[0] || 'murmur';
    return { page: 'case-study', projectSlug: slug };
  }

  return { page: 'home', projectSlug: null };
};

export function App() {
  const [route, setRoute] = useState(parseRoute);
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const onComplete = () => {
      if (!isMounted) return;
      setIsFadingOut(true);
      setTimeout(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      }, 400); // matches 0.4s crossfade in Skeleton.css
    };

    // Check when fonts and document state are ready
    const fontReady = document.fonts ? document.fonts.ready : Promise.resolve();
    const pageLoaded = new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', () => resolve(), { once: true });
      }
    });

    // Failsafe limit: if slow network or hanging external resource, don't keep user waiting past 2s
    const failsafe = new Promise((resolve) => setTimeout(resolve, 2000));

    Promise.race([
      Promise.all([fontReady, pageLoaded]),
      failsafe
    ]).then(onComplete);

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseRoute());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToCaseStudy = useCallback((slug) => {
    window.history.pushState({}, '', `/case-study/${slug}`);
    setRoute({ page: 'case-study', projectSlug: slug });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const navigateToHome = useCallback(() => {
    window.history.pushState({}, '', '/');
    setRoute({ page: 'home', projectSlug: null });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="portfolio-loading-container">
        {isLoading && (
          <div
            className={`portfolio-skeleton-layer ${isFadingOut ? 'is-fading' : ''}`}
            aria-hidden={!isLoading}
          >
            {route.page === 'case-study' ? (
              <CaseStudySkeleton />
            ) : (
              <PortfolioSkeleton />
            )}
          </div>
        )}

        <div
          className={`portfolio-content-layer ${isLoading && !isFadingOut ? 'is-hidden' : 'is-visible'}`}
          aria-busy={isLoading}
        >
          <div className="app-root">
            <Navbar />
            <main>
              {route.page === 'case-study' ? (
                <CaseStudy
                  projectSlug={route.projectSlug}
                  onNavigateBack={navigateToHome}
                />
              ) : (
                <>
                  <Hero />
                  <QuestionIntroduction />
                  <Projects onSelectProject={navigateToCaseStudy} />
                  <DesignerMind />
                  <Essays />
                  <Testimonials />
                  <PersonalGallery />
                  <Footer />
                </>
              )}
            </main>
          </div>
        </div>
      </div>
    </ClickSpark>
  );
}

export default App;

