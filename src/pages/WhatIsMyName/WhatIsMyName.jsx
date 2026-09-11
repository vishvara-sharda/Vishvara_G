import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { imageCache, browserCache, storageCache } from '../../utils/cache';
import './WhatIsMyName.css';

// Direct SVG character asset imports from src/assets
import v1Svg from '../../assets/V_character_exact_transparent.svg';
import iSvg from '../../assets/I_character_transparent.svg';
import sSvg from '../../assets/S_character_transparent.svg';
import hSvg from '../../assets/H_character_transparent.svg';
import v2Svg from '../../assets/V_character_transparent.svg';
import a1Svg from '../../assets/A_character_transparent.svg';
import rSvg from '../../assets/R_character_transparent.svg';
import a2Svg from '../../assets/A_character_smile_transparent.svg';

/**
 * Character SVG assets list for instant memory & browser caching
 */
const CHARACTER_ASSETS = [v1Svg, iSvg, sSvg, hSvg, v2Svg, a1Svg, rSvg, a2Svg];
const CACHE_KEY = 'name_discovery_game_state';

/**
 * The 8 Letters of the name "V I S H V A R A"
 * Target slot indices 0 to 7.
 */
const TARGET_NAME = [
  { index: 0, letter: 'V', pairId: 'v1', label: 'First letter V' },
  { index: 1, letter: 'I', pairId: 'i',  label: 'Letter I' },
  { index: 2, letter: 'S', pairId: 's',  label: 'Letter S' },
  { index: 3, letter: 'H', pairId: 'h',  label: 'Letter H' },
  { index: 4, letter: 'V', pairId: 'v2', label: 'Second letter V' },
  { index: 5, letter: 'A', pairId: 'a1', label: 'First letter A' },
  { index: 6, letter: 'R', pairId: 'r',  label: 'Letter R' },
  { index: 7, letter: 'A', pairId: 'a2', label: 'Second letter A' }
];

/**
 * 16 Cards (8 Matching Pairs) using the exact images from src/assets.
 * Two distinct types of V:
 *   - v1: V_character_exact_transparent.svg (Target Slot 0)
 *   - v2: V_character_transparent.svg (Target Slot 4)
 * Two distinct types of A:
 *   - a1: A_character_transparent.svg (Target Slot 5)
 *   - a2: A_character_smile_transparent.svg (Target Slot 7)
 * Cards match ONLY when both flipped cards have the EXACT same image (pairId).
 */
const INITIAL_CARD_DATA = [
  // Pair 1: V1
  { id: 'v1-a', letter: 'V', pairId: 'v1', name: 'Observer V', imgSrc: v1Svg, targetSlotIndex: 0 },
  { id: 'v1-b', letter: 'V', pairId: 'v1', name: 'Observer V', imgSrc: v1Svg, targetSlotIndex: 0 },
  // Pair 2: I
  { id: 'i-a',  letter: 'I', pairId: 'i',  name: 'Calm I', imgSrc: iSvg, targetSlotIndex: 1 },
  { id: 'i-b',  letter: 'I', pairId: 'i',  name: 'Calm I', imgSrc: iSvg, targetSlotIndex: 1 },
  // Pair 3: S
  { id: 's-a',  letter: 'S', pairId: 's',  name: 'Playful S', imgSrc: sSvg, targetSlotIndex: 2 },
  { id: 's-b',  letter: 'S', pairId: 's',  name: 'Playful S', imgSrc: sSvg, targetSlotIndex: 2 },
  // Pair 4: H
  { id: 'h-a',  letter: 'H', pairId: 'h',  name: 'Supporter H', imgSrc: hSvg, targetSlotIndex: 3 },
  { id: 'h-b',  letter: 'H', pairId: 'h',  name: 'Supporter H', imgSrc: hSvg, targetSlotIndex: 3 },
  // Pair 5: V2
  { id: 'v2-a', letter: 'V', pairId: 'v2', name: 'Cool V', imgSrc: v2Svg, targetSlotIndex: 4 },
  { id: 'v2-b', letter: 'V', pairId: 'v2', name: 'Cool V', imgSrc: v2Svg, targetSlotIndex: 4 },
  // Pair 6: A1
  { id: 'a1-a', letter: 'A', pairId: 'a1', name: 'Curious A', imgSrc: a1Svg, targetSlotIndex: 5 },
  { id: 'a1-b', letter: 'A', pairId: 'a1', name: 'Curious A', imgSrc: a1Svg, targetSlotIndex: 5 },
  // Pair 7: R
  { id: 'r-a',  letter: 'R', pairId: 'r',  name: 'Explorer R', imgSrc: rSvg, targetSlotIndex: 6 },
  { id: 'r-b',  letter: 'R', pairId: 'r',  name: 'Explorer R', imgSrc: rSvg, targetSlotIndex: 6 },
  // Pair 8: A2
  { id: 'a2-a', letter: 'A', pairId: 'a2', name: 'Smiling A', imgSrc: a2Svg, targetSlotIndex: 7 },
  { id: 'a2-b', letter: 'A', pairId: 'a2', name: 'Smiling A', imgSrc: a2Svg, targetSlotIndex: 7 }
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

export const WhatIsMyName = memo(({ onNavigateBack }) => {
  // Preload and cache all 8 character SVGs into memory & CacheStorage on mount
  useEffect(() => {
    imageCache.preloadAll(CHARACTER_ASSETS);
    browserCache.cacheUrls(CHARACTER_ASSETS);
  }, []);

  // Restore game state from storage cache if available
  const [cards, setCards] = useState(() => {
    const cached = storageCache.get(CACHE_KEY, 'session');
    if (cached && Array.isArray(cached.cards) && cached.cards.length === 16) {
      return cached.cards;
    }
    return shuffleCards(INITIAL_CARD_DATA);
  });

  // Currently flipped card IDs (max 2 at a time)
  const [flippedCardIds, setFlippedCardIds] = useState([]);

  // Set of matched card IDs (restored from cache if user leaves and returns)
  const [matchedCardIds, setMatchedCardIds] = useState(() => {
    const cached = storageCache.get(CACHE_KEY, 'session');
    if (cached && Array.isArray(cached.matchedCardIds)) {
      return new Set(cached.matchedCardIds);
    }
    return new Set();
  });

  // Filled slot states in V I S H V A R A (Array of 8 booleans)
  const [filledSlots, setFilledSlots] = useState(() => {
    const cached = storageCache.get(CACHE_KEY, 'session');
    if (cached && Array.isArray(cached.filledSlots) && cached.filledSlots.length === 8) {
      return cached.filledSlots;
    }
    return Array(8).fill(false);
  });

  // Lock click interactions during match/mismatch animation
  const [isLocked, setIsLocked] = useState(false);

  // Completed game state
  const [isCompleted, setIsCompleted] = useState(() => {
    const cached = storageCache.get(CACHE_KEY, 'session');
    return Boolean(cached?.isCompleted);
  });

  // Flying letter transitions currently in-flight
  const [flyingLetters, setFlyingLetters] = useState([]);

  // DOM Refs for measuring positions for the flying transform
  const cardRefs = useRef({});
  const slotRefs = useRef({});

  // Sync game progress to session storage cache whenever cards, matches, or slots change
  useEffect(() => {
    storageCache.set(
      CACHE_KEY,
      {
        cards,
        matchedCardIds: Array.from(matchedCardIds),
        filledSlots,
        isCompleted
      },
      1000 * 60 * 60, // 1 hour TTL
      'session'
    );
  }, [cards, matchedCardIds, filledSlots, isCompleted]);

  // Reset / Reshuffle Game — Clears session cache
  const handleResetGame = useCallback(() => {
    storageCache.remove(CACHE_KEY, 'session');
    setCards(shuffleCards(INITIAL_CARD_DATA));
    setFlippedCardIds([]);
    setMatchedCardIds(new Set());
    setFilledSlots(Array(8).fill(false));
    setIsLocked(false);
    setIsCompleted(false);
    setFlyingLetters([]);
  }, []);

  // Trigger smooth flight from card to target slot with cartoon -> outline morph
  const triggerFlyingLetter = useCallback((cardId, imgSrc, letter, targetSlotIndex) => {
    const cardEl = cardRefs.current[cardId];
    const slotEl = slotRefs.current[targetSlotIndex];

    if (!cardEl || !slotEl) {
      // Fallback: fill slot directly
      setFilledSlots((prev) => {
        const next = [...prev];
        next[targetSlotIndex] = true;
        return next;
      });
      return;
    }

    const cardRect = cardEl.getBoundingClientRect();
    const slotRect = slotEl.getBoundingClientRect();

    const flightId = `${cardId}-${Date.now()}-${Math.random()}`;

    const newFlight = {
      id: flightId,
      imgSrc,
      letter,
      targetSlotIndex,
      startX: cardRect.left + cardRect.width / 2,
      startY: cardRect.top + cardRect.height / 2,
      targetX: slotRect.left + slotRect.width / 2,
      targetY: slotRect.top + slotRect.height / 2
    };

    setFlyingLetters((prev) => [...prev, newFlight]);

    // When flight finishes (~750ms), fill the slot and remove flight element
    setTimeout(() => {
      setFilledSlots((prev) => {
        const next = [...prev];
        next[targetSlotIndex] = true;
        return next;
      });

      setFlyingLetters((prev) => prev.filter((f) => f.id !== flightId));
    }, 750);
  }, []);

  // Handle Card Click / Keyboard Selection
  const handleCardClick = useCallback((card) => {
    if (isLocked) return;
    if (matchedCardIds.has(card.id)) return;
    if (flippedCardIds.includes(card.id)) return;

    const newFlipped = [...flippedCardIds, card.id];
    setFlippedCardIds(newFlipped);

    // If this is the second card flipped:
    if (newFlipped.length === 2) {
      setIsLocked(true);
      const firstCard = cards.find((c) => c.id === newFlipped[0]);
      const secondCard = card;

      // Matching Rule: Cards match ONLY when they have the exact same image (same pairId)!
      // (e.g. V1 matches V1 only; V2 matches V2 only; A1 matches A1 only; A2 matches A2 only)
      const isMatch = firstCard.pairId === secondCard.pairId;

      if (isMatch) {
        // SUCCESSFUL MATCH
        setTimeout(() => {
          setMatchedCardIds((prev) => {
            const next = new Set(prev);
            next.add(firstCard.id);
            next.add(secondCard.id);
            return next;
          });

          // Trigger flying morph to its designated slot
          const targetSlot = firstCard.targetSlotIndex;
          triggerFlyingLetter(firstCard.id, firstCard.imgSrc, firstCard.letter, targetSlot);
          setTimeout(() => {
            triggerFlyingLetter(secondCard.id, secondCard.imgSrc, secondCard.letter, targetSlot);
          }, 80);

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
  }, [cards, flippedCardIds, matchedCardIds, isLocked, triggerFlyingLetter]);

  // Check for game completion when all 8 slots are filled
  useEffect(() => {
    const allFilled = filledSlots.every(Boolean);
    if (allFilled && matchedCardIds.size === 16 && !isCompleted) {
      const timer = setTimeout(() => {
        setIsCompleted(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [filledSlots, matchedCardIds, isCompleted]);

  return (
    <div className="name-discovery-page">
      {/* Subdued Back Button */}
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

      <main className="name-game-container">
        {/* ================================================================
            1. PAGE INTRO: Title & 8 Name Slots
            ================================================================ */}
        <header className="name-header-section">
          <h1 className="name-game-title">WHAT IS MY NAME?</h1>

          {/* 8 Letter Slots in V I S H V A R A */}
          <div
            className={`name-slots-row ${isCompleted ? 'is-completed-name' : ''}`}
            role="status"
            aria-label="Discovered name letters"
          >
            {TARGET_NAME.map((item, idx) => {
              const isSlotFilled = filledSlots[idx];

              return (
                <div
                  key={`slot-${item.index}`}
                  ref={(el) => { slotRefs.current[idx] = el; }}
                  className={`name-slot-box ${isSlotFilled ? 'is-filled' : 'is-empty'}`}
                  aria-label={isSlotFilled ? `Slot ${idx + 1}: ${item.letter}` : `Slot ${idx + 1}: empty`}
                >
                  {isSlotFilled ? (
                    <span className="name-slot-letter-filled">
                      {item.letter}
                    </span>
                  ) : (
                    <span className="name-slot-dash" aria-hidden="true">_</span>
                  )}
                </div>
              );
            })}
          </div>
        </header>

        {/* ================================================================
            2. THE MEMORY MATCHING GAME: 16 Cards (4x4 Grid)
            ================================================================ */}
        <section
          className="memory-grid-wrapper"
          aria-label="Memory matching card grid"
        >
          <div className="memory-grid-4x4">
            {cards.map((card) => {
              const isFlipped = flippedCardIds.includes(card.id) || matchedCardIds.has(card.id);
              const isMatched = matchedCardIds.has(card.id);

              return (
                <button
                  key={card.id}
                  ref={(el) => { cardRefs.current[card.id] = el; }}
                  type="button"
                  className={`memory-card-btn ${isFlipped ? 'is-flipped' : ''} ${isMatched ? 'is-matched' : ''}`}
                  onClick={() => handleCardClick(card)}
                  disabled={isMatched || isLocked}
                  aria-label={
                    isFlipped
                      ? `Letter ${card.letter} character (${card.name})`
                      : 'Hidden letter card'
                  }
                  tabIndex={0}
                >
                  <div className="card-inner-3d">
                    {/* CARD BACK: Portfolio Accent Color with Subtle Minimal Dot */}
                    <div className="card-face card-back" aria-hidden="true">
                      <span className="card-back-dot">•</span>
                    </div>

                    {/* CARD FRONT: Cream/Neutral surface with exact character SVG from src/assets */}
                    <div className="card-face card-front">
                      <div className="character-svg-container">
                        <img
                          src={card.imgSrc}
                          alt={`Letter ${card.letter} character`}
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

        {/* ================================================================
            3. QUIET COMPLETION MOMENT
            ================================================================ */}
        {isCompleted && (
          <footer className="completion-reveal-section" aria-live="polite">
            <p className="completion-phrase">“Now you know.”</p>
            <p className="completion-signature">Vishvara</p>
          </footer>
        )}
      </main>

      {/* ================================================================
          4. FLOATING FLYER CLONES (Fly from card to slot with morph)
          ================================================================ */}
      {flyingLetters.map((flight) => (
        <div
          key={flight.id}
          className="flying-letter-clone"
          style={{
            '--start-x': `${flight.startX}px`,
            '--start-y': `${flight.startY}px`,
            '--target-x': `${flight.targetX}px`,
            '--target-y': `${flight.targetY}px`
          }}
          aria-hidden="true"
        >
          {/* Cartoon Character Layer from src/assets (Fades Out) */}
          <div className="flyer-cartoon-layer">
            <img src={flight.imgSrc} alt="" className="flyer-img" />
          </div>

          {/* Refined Filled Letter Layer (Fades In) */}
          <div className="flyer-outline-layer">
            <span className="name-slot-letter-filled">{flight.letter}</span>
          </div>
        </div>
      ))}
    </div>
  );
});

WhatIsMyName.displayName = 'WhatIsMyName';

export default WhatIsMyName;
