import React from 'react';
import { cn } from '../../lib/utils';

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <a
        href="#hero"
        className={cn(
          'sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]',
          'bg-[#121315] text-[#e2e2d9] border border-border-color px-4 py-2 text-sm font-mono'
        )}
      >
        Skip to main content
      </a>

      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default Layout;
