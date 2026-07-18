import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { syncScrollTriggerWithLenis, killAllScrollTriggers } from '../animations/gsap/scrollTrigger';

/**
 * useLenis — creates and manages a Lenis smooth scroll instance.
 *
 * - Creates Lenis once on mount
 * - Syncs with GSAP ScrollTrigger
 * - Drives its RAF loop via requestAnimationFrame
 * - Destroys cleanly on unmount
 *
 * @returns {{ lenis: React.MutableRefObject<Lenis | null> }}
 */
export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Don't use smooth scroll if user prefers reduced motion
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential ease
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Sync ScrollTrigger with Lenis
    syncScrollTriggerWithLenis(lenis);

    // RAF loop — Let GSAP ticker handle it (set up in syncScrollTriggerWithLenis)
    // We do not need a duplicate RAF loop here.

    return () => {
      killAllScrollTriggers();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = (target) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target);
    }
  };

  return { lenis: lenisRef.current, scrollTo };
}

export default useLenis;
