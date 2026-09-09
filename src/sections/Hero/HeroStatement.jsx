import React, { memo } from 'react';

export const HeroStatement = memo(() => {
  return (
    <span className="hero-subtitle">
      makes everything predictable
    </span>
  );
});

HeroStatement.displayName = 'HeroStatement';

export default HeroStatement;
