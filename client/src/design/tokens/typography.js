/**
 * ── Typography Tokens ─────────────────────────────────────
 *
 * Philosophy: "Typography is the hero."
 *
 * Hierarchy is created through size, weight, spacing, and alignment
 * – never through colour alone.
 *
 * ── Scale ─────────────────────────────────────────────────
 *
 * Uses a 1.25 modular scale (major third) with a 16px base.
 * All values are in rem for accessibility (respects user font-size).
 *
 * ── Usage ─────────────────────────────────────────────────
 *   import { typography } from '@/design/tokens'
 *   typography.fontFamily.sans
 *   typography.size.body
 */

/** @type {{ [key: string]: string }} */
const fontFamily = {
  /** Primary body type. Clean, highly legible on screen. */
  sans: "'Inter', system-ui, -apple-system, sans-serif",
  /** Display / heading type. Distinct, confident. */
  heading: "'Outfit', 'Inter', system-ui, sans-serif",
  /** Monospace for code and data. */
  mono: "'JetBrains Mono', 'Fira Code', monospace",
}

/** @type {{ [key: string]: number }} */
const fontSize = {
  /** Tiny labels, badges, meta. 11px */
  caption: 0.6875,
  /** Compact UI text. 13px */
  small: 0.8125,
  /** Default body text. 16px */
  body: 1,
  /** Emphasised body / intro paragraph. 18px */
  lead: 1.125,
  /** Section heading. 24px */
  heading3: 1.5,
  /** Page heading. 30px */
  heading2: 1.875,
  /** Hero heading. 36px */
  heading1: 2.25,
  /** Large hero / display. 48px */
  display: 3,
  /** Monumental hero. 64px */
  hero: 4,
}

/** @type {{ [key: string]: number }} */
const lineHeight = {
  /** Tight: headings, buttons, labels. */
  tight: 1.15,
  /** Default body rhythm. */
  normal: 1.6,
  /** Relaxed: long-form reading, lead paragraphs. */
  relaxed: 1.8,
}

/** @type {{ [key: string]: string | number }} */
const fontWeight = {
  thin: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
}

/** @type {{ [key: string]: string | number }} */
const letterSpacing = {
  /** Compact UI, dense layouts.  -0.025em */
  tight: '-0.025em',
  /** Default. 0 */
  normal: '0',
  /** Editorial, labels, uppercase. 0.05em */
  wide: '0.05em',
  /** Display / hero headlines. 0.01em */
  display: '0.01em',
}

/**
 * Typography preset map.
 *
 * Each preset combines size / weight / line-height /
 * letter-spacing in one reference.
 */
/** @type {{ [key: string]: { size: number, weight: number, lineHeight: number, letterSpacing: string } }} */
const preset = {
  caption: {
    size: fontSize.caption,
    weight: fontWeight.medium,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.wide,
  },
  small: {
    size: fontSize.small,
    weight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  body: {
    size: fontSize.body,
    weight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  lead: {
    size: fontSize.lead,
    weight: fontWeight.regular,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },
  heading3: {
    size: fontSize.heading3,
    weight: fontWeight.semibold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  heading2: {
    size: fontSize.heading2,
    weight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  heading1: {
    size: fontSize.heading1,
    weight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  display: {
    size: fontSize.display,
    weight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.display,
  },
  hero: {
    size: fontSize.hero,
    weight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.display,
  },
}

/**
 * Complete typography token map.
 *
 *   typography.fontFamily.sans
 *   typography.size.body
 *   typography.preset.lead
 */
export const typography = {
  fontFamily,
  size: fontSize,
  lineHeight,
  fontWeight,
  letterSpacing,
  preset,
}

export default typography
