import React from 'react';
import './Typography.css';

const DEFAULT_TAG_MAP = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  heroSub: 'p',
  bodyLarge: 'p',
  body: 'p',
  bodySmall: 'p',
  caption: 'span',
  label: 'span',
  button: 'span',
  link: 'span'
};

export const Typography = ({
  children,
  variant = 'body',
  as,
  color = 'primary',
  italic = false,
  className = '',
  ...props
}) => {
  const Component = as || DEFAULT_TAG_MAP[variant] || 'p';

  const classes = [
    'type-token',
    `type-${variant}`,
    `color-${color}`,
    italic ? 'type-italic' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
