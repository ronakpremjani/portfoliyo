import React from 'react';
import { cn } from '../../lib/utils';

export const Button = React.forwardRef(({
  children,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  type = 'button',
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-custom-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary disabled:opacity-50 disabled:pointer-events-none select-none',
        variant === 'primary' && 'bg-brand-primary text-text-primary hover:bg-brand-primary-hover border border-transparent',
        variant === 'secondary' && 'bg-background-secondary text-text-primary hover:bg-background-tertiary border border-border-muted',
        variant === 'outline' && 'border border-border-muted bg-transparent text-text-primary hover:bg-background-secondary',
        variant === 'ghost' && 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-background-secondary border border-transparent',
        size === 'sm' && 'text-xs px-3 py-1.5 h-8 gap-1.5',
        size === 'md' && 'text-sm px-4 py-2 h-10 gap-2',
        size === 'lg' && 'text-base px-6 py-3 h-12 gap-2.5',
        className
      )}
      aria-disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="inline-block h-3.5 w-3.5 border-2 border-t-transparent border-current rounded-full animate-spin" aria-hidden="true" />
      )}
      {!isLoading && leftIcon && <span className="inline-flex" aria-hidden="true">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="inline-flex" aria-hidden="true">{rightIcon}</span>}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
