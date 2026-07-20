import React, { useRef, useEffect } from 'react';
import { cursorController } from './cursor';

/**
 * <CustomCursor />
 *
 * Renders two DOM elements (dot + ring) that are moved by the
 * CursorController via RAF — no React re-renders for position updates.
 *
 * Hides on touch/coarse pointer devices.
 * Hides when prefers-reduced-motion is set.
 *
 * CSS data-cursor attributes control visual state:
 *   default | hover | text | image | link | magnetic
 */
export const CustomCursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Don't show on touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReduced) return;

    cursorController.mount(dotRef.current, ringRef.current);

    // Delegate hover detection to the document
    const onEnter = (e) => {
      const t = e.target;
      if (t.matches('a, button, [data-cursor-hover]')) {
        cursorController.setState('hover');
      } else if (t.matches('img, [data-cursor-image]')) {
        cursorController.setState('image');
      } else if (t.matches('p, h1, h2, h3, h4, h5, h6, span, [data-cursor-text]')) {
        cursorController.setState('text');
      }
    };

    const onLeave = (e) => {
      const t = e.target;
      if (t.matches('a, button, [data-cursor-hover], img, [data-cursor-image], p, h1, h2, h3, h4, h5, h6, span, [data-cursor-text]')) {
        cursorController.setState('default');
      }
    };

    document.addEventListener('mouseover', onEnter, { passive: true });
    document.addEventListener('mouseout',  onLeave, { passive: true });

    return () => {
      cursorController.destroy();
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout',  onLeave);
    };
  }, []);

  return (
    <>
      {/* Dot — small sharp center */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="cursor-dot"
      />
      {/* Ring — larger outer circle */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="cursor-ring"
      />
    </>
  );
};

export default CustomCursor;
