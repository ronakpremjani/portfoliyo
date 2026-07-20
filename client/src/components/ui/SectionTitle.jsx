import React from 'react';
import { cn } from './Container';

export const SectionTitle = ({ title, subtitle, className }) => {
  return (
    <div className={cn("flex flex-col gap-xs mb-xl", className)}>
      {subtitle && (
        <span className="font-mono text-xs tracking-[0.2em] text-brand-gray-dark uppercase">
          {subtitle}
        </span>
      )}
      <h2 className="reveal-text text-3xl md:text-4xl font-semibold tracking-tight text-brand-black">
        {title}
      </h2>
    </div>
  );
};
