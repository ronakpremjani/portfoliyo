import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { createReveal, createBatchReveal } from '../animations/gsap/reveal';

/**
 * Hook to apply ScrollTrigger reveals to elements.
 * 
 * @param {React.MutableRefObject} ref - The container ref.
 * @param {string} selector - The CSS selector for elements to reveal (e.g. '.reveal-item')
 * @param {Object} options - Reveal options (type, stagger, duration, start)
 * @param {boolean} isBatch - Whether to use batch reveal (staggered) or single reveal.
 */
export function useReveal(ref, selector, options = {}, isBatch = false) {
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(selector);
      
      if (elements.length === 0) return;

      if (isBatch) {
        createBatchReveal(elements, options);
      } else {
        elements.forEach(el => createReveal(el, options));
      }
    }, ref);

    return () => ctx.revert();
  }, [ref, selector, options, isBatch]);
}
