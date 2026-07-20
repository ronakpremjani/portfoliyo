import { useEffect, useState } from 'react';
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
 * @returns {{ lenis: Lenis | null, scrollTo: Function }}
 */
export function useLenis() {
  const [lenisInstance, setLenisInstance] = useState(null);

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

    setLenisInstance(lenis);

    // Sync ScrollTrigger with Lenis
    syncScrollTriggerWithLenis(lenis);

    return () => {
      killAllScrollTriggers();
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  const scrollTo = (target) => {
    if (lenisInstance) {
      lenisInstance.scrollTo(target);
    }
  };

  return { lenis: lenisInstance, scrollTo };
}

export default useLenis;
