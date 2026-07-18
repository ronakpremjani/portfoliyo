import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Attaches a scrub-based parallax to an element.
 * speed > 1 = faster (moves more), speed < 1 = slower (moves less).
 *
 * @param {Element} element
 * @param {number}  speed     — default 0.3 (subtle)
 * @param {string}  start     — ScrollTrigger start
 * @param {string}  end       — ScrollTrigger end
 * @returns {ScrollTrigger}
 */
export function createParallax(element, speed = 0.3, start = 'top bottom', end = 'bottom top') {
  if (!element) return null;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return null;

  const yPercent = speed * 30; // scale to a visible but subtle range

  return gsap.to(element, {
    yPercent: -yPercent,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub: true,
    },
  });
}

/**
 * Horizontal parallax variant — useful for decorative elements.
 */
export function createHorizontalParallax(element, speed = 0.2) {
  if (!element) return null;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return null;

  const xPercent = speed * 20;

  return gsap.to(element, {
    xPercent: xPercent,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}
