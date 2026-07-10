# IMPLEMENTATION RULES

> Every AI assistant contributing to this project MUST read:
>
> - DESIGN_PHILOSOPHY.md
> - ART_DIRECTION.md
>
> before making any code changes.

---

# Purpose

The goal of this project is NOT to build a portfolio.

The goal is to build a memorable digital experience that represents craftsmanship, curiosity, and engineering precision.

Every implementation decision must support this vision.

---

# General Rules

- Never prioritize speed over quality.
- Never create unnecessary components.
- Never duplicate code.
- Prefer reusable components.
- Keep the codebase scalable and maintainable.
- Follow feature-based architecture.
- Keep files small and focused.
- Do not over-engineer.

---

# UI Rules

The interface should feel:

- Calm
- Premium
- Editorial
- Minimal
- Intentional

Avoid:

- Dashboard layouts
- Generic Tailwind components
- Heavy glassmorphism
- Bright gradients
- Neon colors
- Excessive shadows
- Decorative animations

---

# Design System

Never introduce new values without checking existing design tokens.

Always use:

- colors.js
- spacing.js
- typography.js
- radius.js
- motion.js

Do not hardcode:

- colors
- spacing
- border radius
- animation durations
- font sizes

---

# Components

Before creating a new component ask:

Can an existing component be reused?

If yes,

Reuse it.

If no,

Create a reusable component.

Never create one-off UI components unless absolutely necessary.

---

# Typography

Typography is the primary design element.

Never rely on colors to create hierarchy.

Hierarchy should come from:

- size
- weight
- spacing
- alignment

---

# Layout

Every page should use the shared Container component.

Maintain consistent spacing across every section.

Whitespace is part of the design.

Never reduce spacing simply to fit more content.

---

# Motion

Animation exists to guide attention.

Never animate purely for decoration.

Animations should feel:

- smooth
- subtle
- natural

Avoid:

- bouncing
- exaggerated scaling
- unnecessary rotations
- flashy transitions

---

# Navigation

Navigation is not just a menu.

It is a permanent part of the experience.

It should feel like a precision-engineered object.

Never redesign the navigation without considering the overall design philosophy.

---

# Accessibility

Always:

- use semantic HTML
- support keyboard navigation
- provide accessible labels
- maintain sufficient color contrast

Accessibility is not optional.

---

# Performance

Avoid unnecessary renders.

Lazy load heavy assets.

Optimize images.

Keep bundle size minimal.

Do not install libraries unless they solve a real problem.

---

# Responsive Design

Desktop-first.

Then tablet.

Then mobile.

Do not build desktop-only components.

Every feature must work across screen sizes.

---

# Code Quality

Use meaningful variable names.

Keep components focused.

Extract reusable logic into hooks.

Avoid deeply nested JSX.

Prefer readability over clever code.

---

# Before Completing Any Task

Verify:

✓ Responsive

✓ Accessible

✓ Matches Design Philosophy

✓ Matches Art Direction

✓ Uses Design Tokens

✓ Uses Existing Components

✓ Clean Code

Only after all checks pass should the implementation be considered complete.

---

# Final Principle

Do not build what is requested literally.

Understand the intention behind the request.

The objective is always to create a better experience while remaining faithful to the project's design philosophy.

# AI Collaboration Rules

Do not assume design decisions.

If the design is unclear,

ask for clarification rather than inventing UI.

When multiple implementation approaches are possible,

choose the solution that is:

1. Simpler
2. More maintainable
3. More reusable
4. More consistent with the existing system

Never sacrifice consistency for novelty.