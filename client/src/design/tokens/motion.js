/**
 * ── Motion Tokens ─────────────────────────────────────────
 *
 * Philosophy: "Motion has purpose."
 *
 * Animation should guide attention, never distract from content.
 * Timing should be slow. Movement should feel natural.
 * The best animation is the one people feel rather than notice.
 *
 * ── Timing ────────────────────────────────────────────────
 *   instant      0 ms     – no animation, instant change
 *   fast        150 ms    – micro-interactions, hover states
 *   normal      300 ms    – standard transitions
 *   slow        500 ms    – emphasis transitions, page reveals
 *   deliberate  800 ms    – deliberate reveals, scroll-triggered
 *
 * ── Easing ────────────────────────────────────────────────
 *   We use cubic-bezier curves that feel natural.
 *   Avoid bouncy or exaggerated easings.
 *
 * ── Usage ─────────────────────────────────────────────────
 *   import { motion } from '@/design/tokens'
 *   motion.duration.normal  // 300
 *   motion.easing.out       // [0.25, 0.1, 0.25, 1]
 */

/** @type {{ [key: string]: number }} */
const duration = {
  /** No animation. Use for instant visibility changes. */
  instant: 0,
  /** Micro-interactions: hover, active, focus. */
  fast: 150,
  /** Standard transitions: colour shifts, border changes. */
  normal: 300,
  /** Emphasis: section reveals, content transitions. */
  slow: 500,
  /** Deliberate: scroll-triggered reveals, hero transitions. */
  deliberate: 800,
}

/**
 * Cubic-bezier easing curves.
 *
 * Each value is an array `[x1, y1, x2, y2]` ready for CSS.
 *
 * @type {{ [key: string]: [number, number, number, number] }}
 */
const easing = {
  /** Gentle ease-out – natural deceleration. */
  out: [0.25, 0.1, 0.25, 1],
  /** Subtle ease-in – natural acceleration. */
  in: [0.4, 0, 1, 1],
  /** Symmetric ease-in-out. */
  inOut: [0.4, 0, 0.2, 1],
  /** Smooth deceleration – Apple-inspired. */
  smooth: [0.2, 0, 0.2, 1],
}

/** @type {{ [key: string]: string }} */
const transition = {
  /** Default property transition shorthand. */
  default: `color 300ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
  /** Background and colour changes. */
  surface: `background-color 300ms cubic-bezier(0.25, 0.1, 0.25, 1), color 300ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
  /** Opacity and transform fades. */
  fade: `opacity 500ms cubic-bezier(0.25, 0.1, 0.25, 1), transform 500ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
}

/**
 * Complete motion token map.
 *
 *   motion.duration.normal   // 300
 *   motion.easing.out        // [0.25, 0.1, 0.25, 1]
 *   motion.transition.fade   // "opacity 500ms …"
 */
export const motion = {
  duration,
  easing,
  transition,
}

export default motion
