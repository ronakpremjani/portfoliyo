import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateLines } from '../animations/gsap/splitText';

gsap.registerPlugin(ScrollTrigger);

export function useTextReveal(ref, selector, options = {}) {
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(selector);
      
      if (elements.length === 0) return;

      elements.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            animateLines(el, options);
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, [ref, selector, options]);
}
