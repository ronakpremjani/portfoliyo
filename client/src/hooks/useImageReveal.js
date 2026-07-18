import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { createReveal } from '../animations/gsap/reveal';
import { createParallax } from '../animations/gsap/parallax';

/**
 * Hook to apply ScrollTrigger clip-path reveals to elements, typically images or large backgrounds.
 * Optionally applies a parallax effect as well.
 * 
 * @param {React.MutableRefObject} ref - The container ref.
 * @param {string} selector - The CSS selector for elements to reveal.
 * @param {boolean} withParallax - Whether to apply parallax to the element.
 */
export function useImageReveal(ref, selector, withParallax = false) {
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(selector);
      
      if (elements.length === 0) return;

      elements.forEach(el => {
        createReveal(el, { type: 'clip', duration: 1.2, start: 'top 90%' });
        
        if (withParallax) {
          // Inner element usually needs the parallax, assuming standard img/wrapper setup
          const innerEl = el.querySelector('img') || el;
          createParallax(innerEl, 0.2);
        }
      });
    }, ref);

    return () => ctx.revert();
  }, [ref, selector, withParallax]);
}
