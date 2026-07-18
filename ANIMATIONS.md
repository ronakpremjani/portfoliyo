# Animations

This project utilizes a highly optimized dual-engine approach to animation.

## GSAP (Scroll-Driven & Sequences)
GSAP is the primary engine used for complex timelines and scroll-driven animations because of its superior performance and ScrollTrigger capabilities.

- **ScrollTrigger Sync**: GSAP's ScrollTrigger is synced with Lenis smooth scroll using `ScrollTrigger.update`.
- **`gsap.context()`**: Every React `useLayoutEffect` utilizing GSAP is wrapped in `gsap.context()` to ensure bulletproof garbage collection and prevent memory leaks.
- **Reusability**: Animations are decoupled from components into `src/animations/gsap/` (e.g., `reveal.js`, `parallax.js`).
- **Hooks**: `useReveal` and `useTextReveal` abstract complex GSAP logic into single-line React hooks.

## Framer Motion (Interactions)
Framer Motion is utilized strictly for component-level UI interactions (e.g., hover states, simple layout transitions).

- Examples include the custom cursor (`Cursor.jsx`), button hover states, and card hover effects in the `FeaturedWork` component.

## Custom Cursor
The `useCursor.js` hook drives a custom DOM-based cursor. It uses a `requestAnimationFrame` loop to lerp (linearly interpolate) an outer ring towards the exact mouse coordinates, providing a smooth, high-end feel. It automatically detects and respects touch devices and `prefers-reduced-motion` settings.
