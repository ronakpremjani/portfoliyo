/**
 * ── Theme ─────────────────────────────────────────────────
 *
 * The single source of truth for the Axiom design system.
 *
 * Combines every token category into one consumable object.
 * Components import from this theme rather than individual
 * token files to ensure consistency and enable future
 * theme switching (light / dark / high-contrast).
 *
 * ── Usage ─────────────────────────────────────────────────
 *   import { theme } from '@/design/theme'
 *   theme.colors.background.primary
 *   theme.spacing.section
 *   theme.typography.fontFamily.sans
 *
 * ── Extending ─────────────────────────────────────────────
 *   Add new token categories here. Keep alphabetical order.
 *
 *   theme = {
 *     breakpoints,
 *     colors,
 *     motion,
 *     radius,
 *     shadows,
 *     spacing,
 *     typography,
 *   }
 */

import { colors } from './tokens/colors'
import { typography } from './tokens/typography'
import { spacing } from './tokens/spacing'
import { radius } from './tokens/radius'
import { shadows } from './tokens/shadows'
import { motion } from './tokens/motion'
import { breakpoints, media } from './tokens/breakpoints'

/**
 * @typedef {Object} Theme
 * @property {import('./tokens/colors').colors} colors
 * @property {import('./tokens/typography').typography} typography
 * @property {import('./tokens/spacing').spacing} spacing
 * @property {import('./tokens/radius').radius} radius
 * @property {import('./tokens/shadows').shadows} shadows
 * @property {import('./tokens/motion').motion} motion
 * @property {import('./tokens/breakpoints').breakpoints} breakpoints
 * @property {import('./tokens/breakpoints').media} media
 */

/** @type {Theme} */
export const theme = {
  breakpoints,
  colors,
  media,
  motion,
  radius,
  shadows,
  spacing,
  typography,
}

export default theme
