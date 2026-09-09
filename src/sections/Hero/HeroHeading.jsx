import React, { memo } from 'react';
import pencilCircleImg from '../../assets/pencil-circle.png';

export const HeroHeading = memo(() => {
  return (
    <h1 className="hero-title">
      <span className="hero-title-circled">
        System Thinking
        <img
          src={pencilCircleImg}
          alt=""
          aria-hidden="true"
          className="hero-pen-stroke"
          width="543"
          height="180"
          loading="eager"
          decoding="async"
        />
      </span>
    </h1>
  );
});

HeroHeading.displayName = 'HeroHeading';

export default HeroHeading;
