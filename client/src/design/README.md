# Axiom Design System

**Engineering deserves elegance.**

This directory contains the foundational design tokens for Project Axiom.
Every visual decision in the frontend originates from these values.

---

## Directory Structure

```
design/
├── tokens/
│   ├── colors.js        # Semantic colour tokens
│   ├── typography.js    # Type scale, families, presets
│   ├── spacing.js       # Spacing scale, gaps, padding, sections
│   ├── radius.js        # Border-radius scale
│   ├── shadows.js       # Elevation tokens
│   ├── motion.js        # Duration, easing, transition presets
│   ├── breakpoints.js   # Viewport breakpoints + media helpers
│   └── index.js         # Barrel export
├── theme.js             # Combined theme object
└── README.md            # This file
```

---

## Principles

### 1. Semantic over literal

Token names describe *what something does*, not *what it looks like*.

```js
// ✓ Correct – intent is clear
colors.background.primary

// ✗ Avoid – describes hue, not purpose
colors.gray[900]
```

### 2. Single source of truth

Every colour, space, and type size in the UI must reference a token.
Hardcoded values are forbidden unless they are truly one-off
(and even then, consider adding a token).

### 3. Scalable by design

Adding a new token category means:
1. Create the file in `tokens/`
2. Export from `tokens/index.js`
3. Add to `theme.js`

No other file needs to change.

---

## Usage

```js
// Import the full theme
import { theme } from '@/design/theme'

// Or import individual token categories
import { colors, spacing, typography } from '@/design/tokens'

theme.colors.background.primary    // → '#0b0f19'
spacing.section                    // → 96
typography.fontFamily.sans         // → "'Inter', system-ui, …"
```

### With Tailwind

The Tailwind config should map these tokens into utility classes.
See `tailwind.config.js` for the current mapping.

---

## Token Reference

### Colors

| Path                    | Role                      |
|------------------------|---------------------------|
| `colors.background.*`  | Page-level canvases        |
| `colors.surface.*`     | Component-level canvases   |
| `colors.text.*`        | Typography colours         |
| `colors.border.*`      | Separation lines           |
| `colors.accent.*`      | Brand accent               |
| `colors.glass.*`       | Translucent overlays       |
| `colors.state.*`       | Semantic states            |

### Typography

| Path                        | Role                    |
|-----------------------------|-------------------------|
| `typography.fontFamily.*`   | Typeface stacks         |
| `typography.size.*`         | Font-size scale (rem)   |
| `typography.preset.*`       | Composed style presets  |
| `typography.fontWeight.*`   | Weight values           |
| `typography.letterSpacing.*`| Tracking values         |

### Spacing

| Path                  | Role                          |
|-----------------------|-------------------------------|
| `spacing.scale.*`     | Raw spacing grid (4px base)   |
| `spacing.gap.*`       | Gap between elements          |
| `spacing.padding.*`   | Component internal padding    |
| `spacing.margin.*`    | Component external spacing    |
| `spacing.section.*`   | Section vertical rhythm       |
| `spacing.container.*` | Page-level constraints        |

### Radius

| Path              | Role                              |
|-------------------|-----------------------------------|
| `radius.sm`       | Button, badge                     |
| `radius.md`       | Input, small component            |
| `radius.lg`       | Card, container                   |
| `radius.xl`       | Modal, large panel                |
| `radius.full`     | Pill, circular                    |

### Shadows

| Path            | Role                              |
|-----------------|-----------------------------------|
| `shadows.none`  | Flat surface                      |
| `shadows.sm`    | Default card                      |
| `shadows.md`    | Hovered element, dropdown         |
| `shadows.lg`    | Modal, floating element           |
| `shadows.focus` | Keyboard focus ring               |

### Motion

| Path                    | Role                              |
|-------------------------|-----------------------------------|
| `motion.duration.*`     | Timing values (ms)                |
| `motion.easing.*`       | Cubic-bezier curves               |
| `motion.transition.*`   | Composed transition shorthands    |

### Breakpoints

| Path                       | Role                        |
|----------------------------|-----------------------------|
| `breakpoints.*`            | Viewport width values (px)  |
| `media.down.*`             | Desktop-first query strings |
| `media.up.*`               | Mobile-first query strings  |

---

## Adding a New Token

1. Determine the category — if it doesn't exist, create a new file in `tokens/`
2. Export named + default from the new file
3. Re-export from `tokens/index.js`
4. Add to `theme.js`
5. Document the new tokens above

---

## Future Considerations

- **Theme switching** – `theme.js` can become a function that accepts a mode (`'dark' | 'light'`) and returns the correct token set.
- **Component tokens** – A future `tokens/components.js` could hold component-specific spacing/colour overrides.
- **Validation** – Consider adding runtime validation (e.g. Zod) to catch missing or invalid token values in development.
