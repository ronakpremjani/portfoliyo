# Performance & React Optimization

This portfolio treats performance as a feature, specifically engineered to pass Core Web Vitals with flying colors.

## Code Splitting & Lazy Loading
- **React.lazy**: Below-the-fold components (Skills, Experience, Achievements, Philosophy, Contact, Footer) are dynamically imported using `React.lazy` and `Suspense`. This significantly reduces the initial bundle size, allowing the critical rendering path (Navigation, Hero, Featured Work) to load instantly.
- **LCP Optimization**: By keeping the `Hero` component statically imported, the Largest Contentful Paint metric remains exceptionally low.

## React Rendering Optimizations
- **Memoization**: Static components that exist globally, such as `Navigation` and `Footer`, are wrapped in `React.memo` to prevent unnecessary re-renders during state changes in the main application flow.
- **Context Boundaries**: Global state like Lenis smooth scroll is tightly scoped within `LenisContext.Provider` so that only components actively subscribing to it trigger updates.

## Memory Management
- Strict cleanup functions are enforced across all GSAP ScrollTriggers (`gsap.context()`) and Framer Motion instances.
- The `requestAnimationFrame` loop in the Custom Cursor cleanly unmounts when the component is destroyed.

## Build Optimization
- The project relies on Vite for blazing-fast HMR during development and heavily optimized Rollup builds for production.
- Treeshaking automatically discards unused exports from `lucide-react` and `framer-motion`.
