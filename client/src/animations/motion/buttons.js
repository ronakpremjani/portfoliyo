/**
 * Framer Motion button variants.
 * Magnetic hover and press effects.
 */

// Primary button — scale + press
export const buttonVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
  tap: {
    scale: 0.96,
    transition: { duration: 0.1, ease: 'easeOut' },
  },
};

// Underline animation — for link-style buttons / nav items
// Use a <motion.span> as the underline element
export const underlineVariants = {
  rest: { scaleX: 0, originX: 0 },
  hover: {
    scaleX: 1,
    originX: 0,
    transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] },
  },
};

// Underline exit — retracts from right
export const underlineExitVariants = {
  rest: { scaleX: 0, originX: 1 },
  hover: {
    scaleX: 1,
    originX: 1,
    transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] },
  },
};

// Icon arrow shift on hover
export const arrowVariants = {
  rest: { x: 0 },
  hover: {
    x: 4,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
};
