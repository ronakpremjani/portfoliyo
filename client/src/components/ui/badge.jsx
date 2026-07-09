import React from 'react';
import { cn } from '../../lib/utils';

export const Badge = ({
  children,
  className,
  variant = 'primary',
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold select-none border',
        variant === 'primary' && 'bg-brand-primary/10 text-brand-primary border-brand-primary/20',
        variant === 'secondary' && 'bg-background-tertiary text-text-secondary border-border-muted',
        variant === 'accent' && 'bg-brand-secondary/10 text-brand-secondary border-brand-secondary/20',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
