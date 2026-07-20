/**
 * Framer Motion hover interaction configs.
 * Import individual objects and spread onto motion components.
 */

// Subtle lift — good for cards and containers
export const hoverLift = {
  whileHover: {
    y: -6,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  whileTap: {
    y: -2,
    transition: { duration: 0.15 },
  },
};

// Scale up — good for icons and small elements
export const hoverScale = {
  whileHover: {
    scale: 1.04,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
  whileTap: {
    scale: 0.97,
    transition: { duration: 0.12 },
  },
};

// Glow border — for achievement/card hover
export const hoverBorder = {
  initial: { borderColor: 'rgba(10,10,10,0.15)' },
  whileHover: {
    borderColor: 'rgba(10,10,10,0.6)',
    transition: { duration: 0.25 },
  },
};

// Press — button tactile press effect
export const pressEffect = {
  whileTap: {
    scale: 0.96,
    transition: { duration: 0.1, ease: 'easeOut' },
  },
};

// Spring config for magnetic return
export const magneticSpring = {
  type: 'spring',
  stiffness: 150,
  damping: 15,
  mass: 0.1,
};
