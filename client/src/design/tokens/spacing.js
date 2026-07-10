/**
 * ── Spacing Tokens ────────────────────────────────────────
 *
 * Philosophy: "Whitespace creates luxury."
 *
 * A 4 px base unit with a 1.5 × geometric scale.
 * Every spacing value belongs to this system – nothing is arbitrary.
 *
 * ── Base unit ─────────────────────────────────────────────
 *   1 unit = 4 px
 *
 * ── Scale ─────────────────────────────────────────────────
 *   0.5    2 px
 *   1      4 px
 *   2      8 px
 *   3     12 px
 *   4     16 px
 *   5     20 px
 *   6     24 px  ←  base rhythm
 *   8     32 px
 *  10     40 px
 *  12     48 px
 *  14     56 px
 *  16     64 px
 *  20     80 px
 *  24     96 px
 *  32    128 px
 *
 * ── Usage ─────────────────────────────────────────────────
 *   import { spacing } from '@/design/tokens'
 *   spacing.section  // 96 px
 *   spacing.gap.md   // 24 px
 *
 * ── Semantic aliases ──────────────────────────────────────
 *   Semantic names abstract the raw scale so intent is clear.
 */

/**
 * Raw spacing scale (1 unit = 4 px).
 * Use these when you need exact control.
 *
 * @type {{ [key: string]: number }}
 */
const scale = {
  '0_5': 2,
  '1': 4,
  '1_5': 6,
  '2': 8,
  '2_5': 10,
  '3': 12,
  '3_5': 14,
  '4': 16,
  '5': 20,
  '6': 24,
  '7': 28,
  '8': 32,
  '10': 40,
  '12': 48,
  '14': 56,
  '16': 64,
  '20': 80,
  '24': 96,
  '28': 112,
  '32': 128,
}

/** @type {{ [key: string]: number }} */
const gap = {
  /** Tiny gap between tightly-related elements (icon + label). 4 px */
  xs: 4,
  /** Small gap between related elements. 8 px */
  sm: 8,
  /** Default gap between sibling elements. 16 px */
  md: 16,
  /** Generous gap between distinct groups. 24 px */
  lg: 24,
  /** Section-level gap. 32 px */
  xl: 32,
}

/** @type {{ [key: string]: number }} */
const padding = {
  /** Tight component padding (button, badge). 8 px */
  xs: 8,
  /** Compact component padding (input, small card). 12 px */
  sm: 12,
  /** Default component padding (card, section). 16 px */
  md: 16,
  /** Relaxed component padding. 24 px */
  lg: 24,
  /** Generous component padding (hero, modal). 32 px */
  xl: 32,
}

/** @type {{ [key: string]: number }} */
const margin = {
  /** Micro spacing between tightly-grouped elements. 4 px */
  xs: 4,
  /** Small spacing between related elements. 8 px */
  sm: 8,
  /** Default spacing between elements. 16 px */
  md: 16,
  /** Section spacing. 24 px */
  lg: 24,
  /** Large section spacing. 48 px */
  xl: 48,
}

/** @type {{ [key: string]: number }} */
const section = {
  /** Default vertical rhythm between sections. 96 px */
  default: 96,
  /** Compact vertical rhythm. 64 px */
  compact: 64,
  /** Generous vertical rhythm. 128 px */
  generous: 128,
}

/** @type {{ [key: string]: number }} */
const container = {
  /** Maximum content width. 1280 px */
  maxWidth: 1280,
  /** Page-level horizontal padding at desktop. 32 px */
  paddingX: 32,
  /** Page-level horizontal padding at mobile. 16 px */
  paddingXMobile: 16,
}

/**
 * Complete spacing token map.
 *
 *   spacing.gap.md    // 24 px
 *   spacing.section   // 96 px
 *   spacing.scale[4]  // 16 px
 */
export const spacing = {
  scale,
  gap,
  padding,
  margin,
  section,
  container,
}

export default spacing
