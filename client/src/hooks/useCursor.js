import { useEffect, useRef, useState } from 'react';

export function useCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  
  const [cursorState, setCursorState] = useState('default');
  const [hidden, setHidden] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Position state
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    
    if (prefersReduced || isCoarse) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      // Look for data-cursor attribute on hovered elements
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setCursorState(target.getAttribute('data-cursor'));
      } else if (e.target.closest('a') || e.target.closest('button')) {
        setCursorState('pointer');
      } else if (e.target.closest('input') || e.target.closest('textarea') || e.target.closest('p, h1, h2, h3, h4, h5, h6')) {
        setCursorState('text');
      } else {
        setCursorState('default');
      }
    };

    const onMouseEnter = () => setHidden(false);
    const onMouseLeave = () => setHidden(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    let rafId;
    
    // rAF loop — snap directly to mouse position (no lerp delay)
    const render = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }
      
      // Instant snap for inner dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };
    
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return { cursorRef, dotRef, cursorState, hidden, isTouch };
}
