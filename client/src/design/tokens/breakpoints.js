/**
 * ── Breakpoint Tokens ─────────────────────────────────────
 *
 * Strategy: Desktop-first, then tablet, then mobile.
 *
 * Breakpoints define the viewport ranges where layouts adapt.
 * We use `max-width` (desktop-first) for media queries.
 *
 * ── Scale ─────────────────────────────────────────────────
 *   mobile   480  px   – small phones
 *   tablet   768  px   – landscape phones, small tablets
 *   laptop   1024 px   – large tablets, small laptops
 *   desktop  1280 px   – standard desktop
 *   wide     1440 px   – wide desktop
 *
 * ── Usage ─────────────────────────────────────────────────
 *   import { breakpoints } from '@/design/tokens'
 *   breakpoints.desktop  // 1280
 */

/**
 * Breakpoint values in px.
 *
 * @type {{ [key: string]: number }}
 */
export const breakpoints = {
  /** Small phones and below. */
  mobile: 480,
  /** Landscape phones, small tablets. */
  tablet: 768,
  /** Large tablets, small laptops. */
  laptop: 1024,
  /** Standard desktop. */
  desktop: 1280,
  /** Wide / high-resolution desktop. */
  wide: 1440,
}

/**
 * Media-query helper strings.
 *
 * Desktop-first (max-width) so you can write:
 *   @media ${breakpoints.media.down.tablet} { ... }
 *
 * @type {{ [key: string]: { down: { [key: string]: string }, up: { [key: string]: string } } }}
 */
export const media = {
  down: {
    mobile: `(max-width: ${breakpoints.mobile}px)`,
    tablet: `(max-width: ${breakpoints.tablet}px)`,
    laptop: `(max-width: ${breakpoints.laptop}px)`,
    desktop: `(max-width: ${breakpoints.desktop}px)`,
    wide: `(max-width: ${breakpoints.wide}px)`,
  },
  up: {
    mobile: `(min-width: ${breakpoints.mobile + 1}px)`,
    tablet: `(min-width: ${breakpoints.tablet + 1}px)`,
    laptop: `(min-width: ${breakpoints.laptop + 1}px)`,
    desktop: `(min-width: ${breakpoints.desktop + 1}px)`,
    wide: `(min-width: ${breakpoints.wide + 1}px)`,
  },
}

export default breakpoints
