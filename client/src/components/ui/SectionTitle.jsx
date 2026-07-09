import React from 'react';
import { Heading } from './typography';
import { cn } from '../../lib/utils';

export const SectionTitle = ({
  title,
  subtitle,
  className,
  ...props
}) => {
  return (
    <div className={cn('mb-10', className)} {...props}>
      {subtitle && (
        <span className="text-xs font-bold tracking-widest text-brand-primary uppercase mb-2 block select-none">
          {subtitle}
        </span>
      )}
      <Heading level={2} className="font-bold border-none pb-0">
        {title}
      </Heading>
      <div className="h-1 w-12 bg-brand-primary mt-3 rounded-full" />
    </div>
  );
};

export default SectionTitle;
