import React from 'react';
import { useCursor } from '../../hooks/useCursor';
import { cn } from './Container';

export const Cursor = () => {
  const { cursorRef, cursorState, hidden, isTouch } = useCursor();

  if (isTouch) return null;

  return (
    <div className={cn("pointer-events-none fixed inset-0 z-[999] mix-blend-difference transition-opacity duration-300", hidden ? "opacity-0" : "opacity-100")}>
      <div 
        ref={cursorRef} 
        className={cn(
          "absolute top-0 left-0 -ml-2.5 -mt-2.5 w-5 h-5 rounded-full bg-white transition-[width,height,margin,border-radius] duration-200 ease-[0.76,0,0.24,1] flex items-center justify-center",
          cursorState === 'pointer' && "w-12 h-12 -ml-6 -mt-6 bg-white",
          cursorState === 'text' && "w-1 h-8 ml-0 -mt-4 bg-white rounded-sm",
          cursorState === 'image' && "w-16 h-16 -ml-8 -mt-8 bg-white"
        )}
      >
        {cursorState === 'image' && (
          <span className="text-[10px] font-mono font-bold tracking-widest text-black uppercase">
            View
          </span>
        )}
      </div>
    </div>
  );
};

