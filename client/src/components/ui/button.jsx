import React, { useRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';
import { cn } from './Container';
import { useMagnetic } from '../../hooks/useMagnetic';

export const Button = React.forwardRef(({ className, variant = 'primary', size = 'default', asChild = false, ...props }, ref) => {
  const Component = asChild ? motion.span : motion.button;
  const magneticRef = useMagnetic(0.35);
  
  // Merge refs
  useImperativeHandle(ref, () => magneticRef.current, [magneticRef]);
  
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden";
  
  const variants = {
    primary: "bg-brand-black text-brand-white hover:bg-brand-black/90",
    outline: "border border-brand-gray bg-transparent hover:bg-brand-gray-light text-brand-black",
    ghost: "hover:bg-brand-gray-light text-brand-black",
  };
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return (
    <Component
      ref={magneticRef}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      {...props}
    />
  );
});

Button.displayName = "Button";
