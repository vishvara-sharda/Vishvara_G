import React, { memo } from 'react';
import './Container.css';

export const Container = memo(({ children, className = '', as: Component = 'div', ...props }) => {
  return (
    <Component className={`container ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
});

Container.displayName = 'Container';

export default Container;
