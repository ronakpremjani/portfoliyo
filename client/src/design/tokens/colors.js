/**
 * ── Color Tokens ──────────────────────────────────────────
 *
 * Colors are named by material and role, not by hue.
 * This follows the design philosophy: "Think in materials, not colors."
 *
 * Materials:
 *   charcoal   – darkest backgrounds
 *   graphite   – elevated surfaces
 *   paper      – warm, content-forward surfaces
 *   metal      – interactive elements, borders
 *   glass      – translucent overlays
 *
 * Roles:
 *   background – page-level canvases
 *   surface    – component-level canvases
 *   text       – typography
 *   border     – separation lines
 *   accent     – the single muted brand note
 *
 * ── Usage ─────────────────────────────────────────────────
 *   import { colors } from '@/design/tokens'
 *   colors.background.primary
 *
 * ── Notes ─────────────────────────────────────────────────
 *   All values below are initial placeholders.
 *   Refine with the actual design team before release.
 */

/** @type {{ [key: string]: string }} */
const background = {
  /** Main page canvas. Deepest layer. */
  primary: '#0b0f19',
  /** Elevated canvas: cards, sections, panels. */
  secondary: '#131c31',
  /** Hovered or active canvas within elevated surfaces. */
  tertiary: '#1e293b',
}

/** @type {{ [key: string]: string }} */
const surface = {
  /** Default component surface. */
  primary: '#161616',
  /** Lighter surface for contrast within a component. */
  secondary: '#1e1e1e',
  /** The lightest surface tone, close to paper. */
  tertiary: '#2a2a2a',
}

/** @type {{ [key: string]: string }} */
const text = {
  /** Primary body and heading colour. High-emphasis. */
  primary: '#f8fafc',
  /** Secondary / supporting text. Medium-emphasis. */
  secondary: '#94a3b8',
  /** Placeholder, disabled, or tertiary labels. Low-emphasis. */
  muted: '#64748b',
  /** Text on inverted / accent surfaces. */
  inverse: '#0b0f19',
}

/** @type {{ [key: string]: string }} */
const border = {
  /** Default border for cards, inputs, dividers. */
  primary: 'rgba(255, 255, 255, 0.08)',
  /** Stronger border: focus rings, active states. */
  focus: 'rgba(255, 255, 255, 0.5)',
  /** The lightest hairline. */
  subtle: 'rgba(255, 255, 255, 0.04)',
}

/** @type {{ [key: string]: string }} */
const accent = {
  /** The single brand accent. Muted, warm, never saturated. */
  primary: '#a8a29e',
  /** Hover state of the accent. */
  hover: '#c0b8b2',
  /** Accent on dark backgrounds – slightly lighter. */
  muted: 'rgba(168, 162, 158, 0.3)',
  /** Subtle accent background tint. */
  subtle: 'rgba(168, 162, 158, 0.1)',
}

/** @type {{ [key: string]: string }} */
const glass = {
  /** Translucent overlay for navigation, modals, sheets. */
  background: 'rgba(22, 22, 22, 0.85)',
  /** Glass surface border. */
  border: 'rgba(255, 255, 255, 0.06)',
  /** Glass tint variation. */
  tint: 'rgba(255, 255, 255, 0.03)',
}

/** @type {{ [key: string]: string }} */
const state = {
  /** Error / destructive actions. Muted – never pure red. */
  error: '#b91c1c',
  /** Success confirmation. Muted – never pure green. */
  success: '#166534',
  /** Informational cues. Muted – never pure blue. */
  info: '#1e3a5f',
  /** Warning. Muted – never pure yellow. */
  warning: '#713f12',
}

/**
 * Complete colour token map.
 *
 * Access every colour through semantic paths:
 *   colors.background.primary
 *   colors.text.muted
 *   colors.border.focus
 */
export const colors = {
  background,
  surface,
  text,
  border,
  accent,
  glass,
  state,
}

export default colors
