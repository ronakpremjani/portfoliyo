import React from 'react';
import { cn } from '../../lib/utils';

export const Chapter = ({
  id,
  className,
  children,
  ...props
}) => {
  return (
    <section
      id={id}
      className={cn('py-24 md:py-32 scroll-mt-20', className)}
      {...props}
    >
      {children}
    </section>
  );
};

export default Chapter;
