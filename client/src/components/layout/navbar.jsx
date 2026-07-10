import React from 'react';
import { cn } from '../../lib/utils';

export const Navbar = ({
  items = [],
  activeItem = '',
  onItemClick,
  className,
}) => {
  return (
    <nav
      className={cn(
        'fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 sm:px-6 max-w-[92%] sm:max-w-lg w-auto',
        className
      )}
      aria-label="Section navigation"
    >
      <div className="flex items-center justify-center gap-5 sm:gap-8 py-3 rounded-2xl bg-[#161616] overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const isActive = activeItem === item.path;
          const Icon = item.icon;

          return (
            <a
              key={item.path}
              href={item.path}
              onClick={(e) => {
                if (onItemClick) {
                  onItemClick(e, item.path);
                }
              }}
              className={cn(
                'relative flex flex-col items-center gap-2 px-3 py-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded select-none',
                isActive ? 'text-white' : 'text-white/20 hover:text-white/50'
              )}
              aria-current={isActive ? 'true' : undefined}
            >
              {Icon && <Icon className="w-4 h-4" aria-hidden="true" strokeWidth={1.5} />}
              <span className="text-[11px] font-normal leading-none tracking-[0.01em]">
                {item.label}
              </span>
              <span
                className={cn(
                  'block w-3 h-px mt-1 mx-auto',
                  isActive ? 'bg-white/60' : 'bg-transparent'
                )}
                aria-hidden="true"
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
