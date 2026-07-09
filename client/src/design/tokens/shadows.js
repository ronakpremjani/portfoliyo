/**
 * ── Shadow Tokens ─────────────────────────────────────────
 *
 * Philosophy: "No excessive shadows."
 *
 * Shadows are used sparingly – they exist to create subtle
 * elevation, never to decorate. Prefer flat surfaces.
 *
 * ── Elevation model ───────────────────────────────────────
 *   none     – flat, no depth
 *   sm       – micro elevation (default resting state)
 *   md       – raised element (hovered card)
 *   lg       – floating element (modal, dropdown)
 *   focus    – keyboard focus indicator (not a box-shadow)
 *
 * ── Usage ─────────────────────────────────────────────────
 *   import { shadows } from '@/design/tokens'
 *   shadows.card  // '0 1px 3px …'
 */

/**
 * Semantic shadow presets.
 *
 * Each value is a CSS `box-shadow` string so it can be used
 * directly in style props or injected via Tailwind.
 *
 * @type {{ [key: string]: string }}
 */
export const shadows = {
  /** No shadow. Flat surface. */
  none: 'none',

  /** Subtle resting elevation. Use for default card / panel. */
  sm: '0 1px 2px rgba(0, 0, 0, 0.3)',

  /** Moderate elevation. Use for hovered states, dropdowns. */
  md: '0 4px 12px rgba(0, 0, 0, 0.35)',

  /** High elevation. Use for modals, sheets, floating elements. */
  lg: '0 8px 24px rgba(0, 0, 0, 0.4)',

  /** Focus ring (replaces box-shadow focus styling). */
  focus: '0 0 0 2px rgba(255, 255, 255, 0.4)',
}

export default shadows
