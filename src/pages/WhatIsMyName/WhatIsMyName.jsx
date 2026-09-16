import React, { useState, useEffect, useCallback, memo } from 'react';
import { imageCache, browserCache } from '../../utils/cache';
import './WhatIsMyName.css';

// Character image asset imports from src/assets
import calciferPng from '../../assets/calcifer.png';
import sataoPng from '../../assets/satao.png';
import sadijinPng from '../../assets/sadijin.png';

/**
 * Character image assets list for instant memory & browser caching
 */
const CHARACTER_ASSETS = [calciferPng, sataoPng, sadijinPng];

/**
 * 6 Cards (3 Matching Pairs)
 * Pairs: Calcifer, Satao, Sadijin
 */
const SIX_CARDS_DATA = [
  // Pair 1: Calcifer
  { id: 'calcifer-a', pairId: 'calcifer', name: 'Calcifer', imgSrc: calciferPng },
  { id: 'calcifer-b', pairId: 'calcifer', name: 'Calcifer', imgSrc: calciferPng },
  // Pair 2: Satao
  { id: 'satao-a',    pairId: 'satao',    name: 'Satao',    imgSrc: sataoPng },
  { id: 'satao-b',    pairId: 'satao',    name: 'Satao',    imgSrc: sataoPng },
  // Pair 3: Sadijin
  { id: 'sadijin-a',  pairId: 'sadijin',  name: 'Sadijin',  imgSrc: sadijinPng },
  { id: 'sadijin-b',  pairId: 'sadijin',  name: 'Sadijin',  imgSrc: sadijinPng }
];

/**
 * Fisher-Yates shuffle algorithm
 */
const shuffleCards = (cards) => {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const generateShuffledCards = () => shuffleCards(SIX_CARDS_DATA);

export const WhatIsMyName = memo(({ onNavigateBack }) => {
  // Preload and cache character images into memory & browser cache on mount
  useEffect(() => {
    imageCache.preloadAll(CHARACTER_ASSETS);
    browserCache.cacheUrls(CHARACTER_ASSETS);

    // Clean up any obsolete session storage keys
    try {
      sessionStorage.removeItem('name_discovery_ghibli_cards_state');
      sessionStorage.removeItem('name_discovery_6_cards_state');
      sessionStorage.removeItem('name_discovery_game_state');
    } catch {
      // Ignore if sessionStorage is not accessible
    }
  }, []);

  // Cards reshuffle fresh on every page load / mount
  const [cards, setCards] = useState(() => generateShuffledCards());

  // Currently flipped card IDs (max 2 at a time)
  const [flippedCardIds, setFlippedCardIds] = useState([]);

  // Set of matched card IDs
  const [matchedCardIds, setMatchedCardIds] = useState(() => new Set());

  // Lock click interactions during flip / match delay
  const [isLocked, setIsLocked] = useState(false);

  // Completed game state
  const [isCompleted, setIsCompleted] = useState(false);

  // Modal reveal state when user finishes matching all 6 blocks
  const [showNameReveal, setShowNameReveal] = useState(false);

  // Reset / Reshuffle Game
  const handleResetGame = useCallback(() => {
    setCards(generateShuffledCards());
    setFlippedCardIds([]);
    setMatchedCardIds(new Set());
    setIsLocked(false);
    setIsCompleted(false);
    setShowNameReveal(false);
  }, []);

  // Handle escape key to close reveal modal
  useEffect(() => {
    if (!showNameReveal) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowNameReveal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showNameReveal]);

  // Handle Card Click
  const handleCardClick = useCallback((card) => {
    if (isLocked) return;
    if (matchedCardIds.has(card.id)) return;
    if (flippedCardIds.includes(card.id)) return;

    const newFlipped = [...flippedCardIds, card.id];
    setFlippedCardIds(newFlipped);

    // If 2 cards are flipped
    if (newFlipped.length === 2) {
      setIsLocked(true);
      const firstCard = cards.find((c) => c.id === newFlipped[0]);
      const secondCard = card;

      const isMatch = firstCard.pairId === secondCard.pairId;

      if (isMatch) {
        // MATCH: Keep cards flipped
        setTimeout(() => {
          setMatchedCardIds((prev) => {
            const next = new Set(prev);
            next.add(firstCard.id);
            next.add(secondCard.id);

            // When all 6 cards are matched
            if (next.size === 6) {
              setTimeout(() => {
                setIsCompleted(true);
                setShowNameReveal(true);
              }, 400);
            }
            return next;
          });

          setFlippedCardIds([]);
          setIsLocked(false);
        }, 400);
      } else {
        // NOT A MATCH: brief delay, then flip back
        setTimeout(() => {
          setFlippedCardIds([]);
          setIsLocked(false);
        }, 850);
      }
    }
  }, [cards, flippedCardIds, matchedCardIds, isLocked]);

  return (
    <div className={`name-discovery-page ${showNameReveal ? 'has-reveal-active' : ''}`}>
      {/* Top Navigation */}
      <nav className="name-nav-bar" aria-label="Page navigation">
        <button
          type="button"
          className="name-back-btn"
          onClick={onNavigateBack}
          aria-label="Return to portfolio"
        >
          <span className="back-arrow" aria-hidden="true">←</span>
          <span>Back to portfolio</span>
        </button>

        <button
          type="button"
          className="name-restart-btn"
          onClick={handleResetGame}
          aria-label="Restart and reshuffle cards"
          title="Reshuffle cards"
        >
          <span>Shuffle / Restart</span>
        </button>
      </nav>

      {/* Main unified 6-block game area */}
      <main className="name-game-container">
        <section
          className="memory-unified-section"
          aria-label="Memory matching card grid with 6 cards"
        >
          <div className="memory-cards-grid">
            {cards.map((card) => {
              const isFlipped = flippedCardIds.includes(card.id) || matchedCardIds.has(card.id);
              const isMatched = matchedCardIds.has(card.id);

              return (
                <button
                  key={card.id}
                  type="button"
                  className={`memory-card-btn ${isFlipped ? 'is-flipped' : ''} ${isMatched ? 'is-matched' : ''}`}
                  onClick={() => handleCardClick(card)}
                  disabled={isMatched || isLocked}
                  aria-label={
                    isFlipped
                      ? `${card.name} card`
                      : 'Hidden card'
                  }
                  tabIndex={0}
                >
                  <div className="card-inner-3d">
                    {/* CARD BACK: Portfolio Accent Color with Subtle Minimal Dot */}
                    <div className="card-face card-back" aria-hidden="true">
                      <span className="card-back-dot">•</span>
                    </div>

                    {/* CARD FRONT: Solid Black Surface with character image */}
                    <div className="card-face card-front">
                      <div className="character-svg-container">
                        <img
                          src={card.imgSrc}
                          alt={card.name}
                          className="character-img"
                          loading="eager"
                          decoding="async"
                        />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </main>

      {/* Pop-forward Name Reveal Modal */}
      {showNameReveal && (
        <div
          className="name-reveal-backdrop"
          onClick={() => setShowNameReveal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="name-reveal-title"
        >
          {/* Top Cross / Close Button */}
          <button
            type="button"
            className="name-reveal-top-close-btn"
            onClick={(e) => {
              e.stopPropagation();
              setShowNameReveal(false);
            }}
            aria-label="Close name reveal"
            title="Close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div
            className="name-reveal-pop-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="name-reveal-title" className="name-reveal-accent-name">
              Vishvara
            </h2>

            <p className="name-reveal-white-pronunciation">
              wish-wara
            </p>
          </div>
        </div>
      )}
    </div>
  );
});

WhatIsMyName.displayName = 'WhatIsMyName';

export default WhatIsMyName;
