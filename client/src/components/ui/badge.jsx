import React from 'react';
import { cn } from './Container';

export const Badge = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-black focus:ring-offset-2";
  
  const variants = {
    default: "border-transparent bg-brand-black text-brand-white hover:bg-brand-black/80",
    secondary: "border-transparent bg-brand-gray-light text-brand-black hover:bg-brand-gray",
    outline: "text-brand-black border-brand-gray",
  };

  return (
    <div
      ref={ref}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    />
  );
});

Badge.displayName = "Badge";
