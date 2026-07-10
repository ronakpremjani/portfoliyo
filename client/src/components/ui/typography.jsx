import React from 'react';
import { cn } from '../../lib/utils';

const headingLevels = {
  1: 'text-3xl md:text-5xl font-bold tracking-tight text-text-primary',
  2: 'text-2xl md:text-3xl font-bold tracking-tight text-text-primary',
  3: 'text-xl md:text-2xl font-semibold tracking-tight text-text-primary',
  4: 'text-lg md:text-xl font-semibold text-text-primary',
  5: 'text-base font-semibold text-text-primary',
  6: 'text-sm font-semibold text-text-primary',
};

export const Heading = ({
  level = 1,
  gradient,
  className,
  children,
  as,
  ...props
}) => {
  const Component = as || `h${level}`;

  return (
    <Component
      className={cn(
        headingLevels[level] || headingLevels[1],
        gradient === 'primary' && 'text-gradient-primary',
        gradient === 'accent' && 'text-gradient-accent',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const Paragraph = ({
  className,
  children,
  ...props
}) => {
  return (
    <p
      className={cn('text-base text-text-secondary leading-relaxed mb-4 last:mb-0', className)}
      {...props}
    >
      {children}
    </p>
  );
};

export const Text = ({
  as: Component = 'span',
  variant = 'primary',
  className,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn(
        variant === 'primary' && 'text-text-primary',
        variant === 'secondary' && 'text-text-secondary',
        variant === 'muted' && 'text-text-muted',
        variant === 'lead' && 'text-lg md:text-xl text-text-secondary font-light',
        variant === 'small' && 'text-xs text-text-muted',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
