import React, { memo } from 'react';
import './Section.css';

export const Section = memo(({
  children,
  className = '',
  id,
  as: Component = 'section',
  paddingTop = 'default',
  paddingBottom = 'default',
  ...props
}) => {
  const classes = [
    'system-section',
    `section-pt-${paddingTop}`,
    `section-pb-${paddingBottom}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <Component id={id} className={classes} {...props}>
      {children}
    </Component>
  );
});

Section.displayName = 'Section';

export default Section;
