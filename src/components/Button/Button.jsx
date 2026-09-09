import React, { memo } from 'react';
import './Button.css';

export const Button = memo(({
  children,
  href,
  onClick,
  variant = 'secondary',
  disabled = false,
  className = '',
  target,
  rel,
  icon,
  ...props
}) => {
  const classes = [
    'system-btn',
    `system-btn-${variant}`,
    disabled ? 'is-disabled' : '',
    className
  ].filter(Boolean).join(' ');

  const content = (
    <span className="system-btn-content">
      {icon && <span className="system-btn-icon" aria-hidden="true">{icon}</span>}
      <span className="system-btn-label">{children}</span>
    </span>
  );

  if (href && !disabled) {
    const linkTarget = target || (href.startsWith('http') ? '_blank' : undefined);
    const linkRel = rel || (linkTarget === '_blank' ? 'noopener noreferrer' : undefined);

    return (
      <a
        href={href}
        className={classes}
        target={linkTarget}
        rel={linkRel}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
