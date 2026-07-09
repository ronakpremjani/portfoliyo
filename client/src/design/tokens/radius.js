/**
 * ── Radius Tokens ─────────────────────────────────────────
 *
 * Philosophy: "Precision over decoration."
 *
 * Every radius value is intentional and belongs to the same system.
 * Radii are kept subtle – we round corners, not soften edges.
 *
 * ── Scale ─────────────────────────────────────────────────
 *   none     0 px   – sharp, precise
 *   sm       4 px   – micro corners
 *   md       6 px   – default control radius
 *   lg       8 px   – card / container radius
 *   xl      12 px   – generous containers
 *   2xl      16 px   – large panels
 *   full   9999 px  – pill / circular
 *
 * ── Usage ─────────────────────────────────────────────────
 *   import { radius } from '@/design/tokens'
 *   radius.card   // 8 px
 *   radius.button // 4 px
 */

/**
 * Raw radius scale.
 *
 * @type {{ [key: string]: number }}
 */
const scale = {
  none: 0,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  full: 9999,
}

/** @type {{ [key: string]: number }} */
const button = scale.sm
const input = scale.md
const card = scale.lg
const modal = scale.xl
const nav = scale['2xl']
const pill = scale.full

/**
 * Semantic alias map.
 *
 *   radius.sm         // raw access
 *   radius.button     // 4 px
 *   radius.card       // 8 px
 */
export const radius = {
  ...scale,
  button,
  input,
  card,
  modal,
  nav,
  pill,
}

export default radius
