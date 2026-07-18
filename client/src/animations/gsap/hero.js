import gsap from 'gsap';

/**
 * Cinematic hero entrance timeline.
 * Elements are targeted via data attributes so the component stays clean.
 * Returns the timeline so the caller can control play / kill.
 */
export function createHeroTimeline(scope) {
  // Respect reduced-motion preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const tl = gsap.timeline({
    defaults: {
      ease: 'power3.out',
      duration: prefersReduced ? 0 : 1,
    },
    paused: true,
  });

  if (prefersReduced) {
    // Instantly reveal everything
    gsap.set(scope.querySelectorAll('[data-hero]'), { opacity: 1, y: 0, clipPath: 'none' });
    return tl;
  }

  // Set initial hidden states
  gsap.set('[data-hero="nav"]',       { opacity: 0, y: -24 });
  gsap.set('[data-hero="status"]',    { opacity: 0, y: 16 });
  gsap.set('[data-hero="headline"]',  { opacity: 0, y: 48 });
  gsap.set('[data-hero="subtitle"]',  { opacity: 0, y: 32 });
  gsap.set('[data-hero="cta"]',       { opacity: 0, y: 24 });
  gsap.set('[data-hero="meta"]',      { opacity: 0, y: 20 });
  gsap.set('[data-hero="scroll"]',    { opacity: 0, y: 12 });
  gsap.set('[data-hero="bg"]',        { opacity: 0, scale: 1.04 });

  tl
    // Navigation slides in from top
    .to('[data-hero="nav"]', {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power2.out',
    })
    // Status badge fades up
    .to('[data-hero="status"]', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
    }, '-=0.5')
    // Headline — large, slow, cinematic
    .to('[data-hero="headline"]', {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: 'power3.out',
    }, '-=0.4')
    // Subtitle
    .to('[data-hero="subtitle"]', {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power2.out',
    }, '-=0.65')
    // CTA
    .to('[data-hero="cta"]', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.7')
    // Meta info (location, experience)
    .to('[data-hero="meta"]', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
    }, '-=0.5')
    // Background elements
    .to('[data-hero="bg"]', {
      opacity: 1,
      scale: 1,
      duration: 1.4,
      ease: 'power1.out',
    }, 0.1)
    // Scroll indicator
    .to('[data-hero="scroll"]', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.3');

  return tl;
}
