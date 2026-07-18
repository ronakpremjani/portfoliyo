import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Factory: creates a ScrollTrigger-based reveal for a single element.
 * Returns the ScrollTrigger instance so the caller can kill it.
 *
 * @param {Element} element
 * @param {Object}  options
 * @param {'fade' | 'slide' | 'clip' | 'scale'} options.type
 * @param {number}  options.delay
 * @param {number}  options.duration
 * @param {string}  options.start
 */
export function createReveal(element, options = {}) {
  if (!element) return null;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    gsap.set(element, { opacity: 1, y: 0, clipPath: 'none', scale: 1 });
    return null;
  }

  const {
    type = 'slide',
    delay = 0,
    duration = 0.9,
    start = 'top 85%',
  } = options;

  // Initial hidden state by type
  const fromVars = getFromVars(type);
  const toVars = getToVars(type);

  gsap.set(element, fromVars);

  return ScrollTrigger.create({
    trigger: element,
    start,
    once: true,
    onEnter: () => {
      gsap.to(element, {
        ...toVars,
        duration,
        delay,
        ease: 'power3.out',
      });
    },
  });
}

/**
 * Batch reveal for multiple elements with stagger.
 * Returns an array of ScrollTrigger instances.
 *
 * @param {Element[]} elements
 * @param {Object}    options
 * @param {number}    options.stagger  — delay between each element
 */
export function createBatchReveal(elements, options = {}) {
  if (!elements?.length) return [];

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    gsap.set(elements, { opacity: 1, y: 0 });
    return [];
  }

  const {
    type = 'slide',
    stagger = 0.1,
    duration = 0.85,
    start = 'top 88%',
  } = options;

  const fromVars = getFromVars(type);
  const toVars = getToVars(type);

  gsap.set(elements, fromVars);

  const triggers = [];

  ScrollTrigger.batch(elements, {
    start,
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        ...toVars,
        duration,
        stagger,
        ease: 'power3.out',
      });
    },
  });

  return triggers;
}

function getFromVars(type) {
  switch (type) {
    case 'fade':
      return { opacity: 0 };
    case 'clip':
      return { opacity: 0, clipPath: 'inset(0 100% 0 0)' };
    case 'scale':
      return { opacity: 0, scale: 0.94 };
    case 'slide':
    default:
      return { opacity: 0, y: 40 };
  }
}

function getToVars(type) {
  switch (type) {
    case 'fade':
      return { opacity: 1 };
    case 'clip':
      return { opacity: 1, clipPath: 'inset(0 0% 0 0)' };
    case 'scale':
      return { opacity: 1, scale: 1 };
    case 'slide':
    default:
      return { opacity: 1, y: 0 };
  }
}
