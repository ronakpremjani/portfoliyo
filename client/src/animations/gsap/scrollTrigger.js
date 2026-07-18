import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let _lenis = null;

/**
 * Initializes ScrollTrigger to work with Lenis smooth scrolling.
 * Must be called after Lenis is created.
 *
 * @param {import('lenis').default} lenis
 */
export function syncScrollTriggerWithLenis(lenis) {
  _lenis = lenis;

  // Tell ScrollTrigger to use Lenis for scroll position
  lenis.on('scroll', ScrollTrigger.update);

  // Add Lenis to GSAP ticker so ScrollTrigger knows about every frame
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Prevent GSAP from adding its own RAF loop on top
  gsap.ticker.lagSmoothing(0);
}

/**
 * Kills all ScrollTrigger instances and disconnects Lenis sync.
 * Call on unmount / route change.
 */
export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((st) => st.kill());
  _lenis = null;
}

/**
 * Refreshes all ScrollTrigger instances.
 * Useful after layout changes (images load, fonts swap, etc.)
 */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}
