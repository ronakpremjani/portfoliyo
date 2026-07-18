/**
 * Framer Motion card variants.
 * Cards enter with a lift + shadow, image zooms on hover.
 */

// Container card — handles enter + hover lift
export const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
  hover: {
    y: -8,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

// Card image zoom — apply to the image wrapper
export const cardImageVariants = {
  rest: { scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  hover: { scale: 1.05, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

// Card shadow — applied to the card shadow element
export const cardShadowVariants = {
  rest: {
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
    transition: { duration: 0.35 },
  },
  hover: {
    boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
    transition: { duration: 0.35 },
  },
};

// Card border — subtle darkening on hover
export const cardBorderVariants = {
  rest: {
    borderColor: 'rgba(10,10,10,0.12)',
    transition: { duration: 0.25 },
  },
  hover: {
    borderColor: 'rgba(10,10,10,0.5)',
    transition: { duration: 0.25 },
  },
};

// Content reveal — tag/button area slides up on hover
export const cardContentReveal = {
  rest: { opacity: 0.7, y: 4 },
  hover: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};
