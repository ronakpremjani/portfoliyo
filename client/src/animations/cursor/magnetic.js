/**
 * Magnetic effect utility.
 * Pulls an element toward the cursor when hovering nearby.
 * Returns a cleanup function.
 *
 * @param {Element} element
 * @param {number}  strength  — 0.3 = subtle, 0.5 = noticeable, 1 = strong
 * @returns {() => void}      — cleanup function
 */
export function applyMagnetic(element, strength = 0.35) {
  if (!element) return () => {};

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return () => {};

  let rafId = null;
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;
  let isHovering = false;

  const lerp = (a, b, t) => a + (b - a) * t;

  function animate() {
    currentX = lerp(currentX, targetX, 0.2);
    currentY = lerp(currentY, targetY, 0.2);

    element.style.transform = `translate(${currentX}px, ${currentY}px)`;

    if (isHovering || Math.abs(currentX) > 0.1 || Math.abs(currentY) > 0.1) {
      rafId = requestAnimationFrame(animate);
    } else {
      element.style.transform = 'translate(0px, 0px)';
      rafId = null;
    }
  }

  function onMouseMove(e) {
    const rect = element.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    targetX = (e.clientX - cx) * strength;
    targetY = (e.clientY - cy) * strength;

    if (!rafId) {
      rafId = requestAnimationFrame(animate);
    }
  }

  function onMouseEnter() {
    isHovering = true;
    element.addEventListener('mousemove', onMouseMove, { passive: true });
  }

  function onMouseLeave() {
    isHovering = false;
    targetX = 0;
    targetY = 0;
    element.removeEventListener('mousemove', onMouseMove);

    if (!rafId) {
      rafId = requestAnimationFrame(animate);
    }
  }

  element.addEventListener('mouseenter', onMouseEnter, { passive: true });
  element.addEventListener('mouseleave', onMouseLeave, { passive: true });

  return () => {
    element.removeEventListener('mouseenter', onMouseEnter);
    element.removeEventListener('mouseleave', onMouseLeave);
    element.removeEventListener('mousemove', onMouseMove);
    if (rafId) cancelAnimationFrame(rafId);
    element.style.transform = '';
  };
}
