# Project Axiom — Motion Language (06_motion_language.md)

This document establishes the kinetic behavior, pacing, and emotional cues for Project Axiom. In accordance with project parameters, **no software libraries (e.g., GSAP, Framer Motion) are mentioned or discussed.** Motion is defined entirely through weight, mechanics, and human feeling.

---

## 1. Core Motion Principles

* **Kinetic Mass**: Elements must behave as if they have physical mass and weight. They do not slide frictionlessly or bounce playfully. When an interface element moves, it moves like a milled plate of metal sliding across a lubricated guide rail—starting with quiet resistance and decelerating to a precise, solid halt.
* **The Single Easing Curve**: To create a coherent rhythm, every transition, scroll reveal, and interface response must share the exact same acceleration and deceleration profile. This consistency creates a unified signature, suggesting a singular, engineered mechanism beneath the page.
* **Functional Necessity**: Motion exists only to establish spatial relationships, reveal hidden detail, or confirm user intent. Any animation that exists purely to look impressive is a decorative error and must be removed.

---

## 2. Pacing & Rhythm

* **The Shutter breath**: The loading experience must feel like a mechanical shutter opening on a darkroom plate. A moment of darkness, a quiet transition, and then presence. 
* **Reading Pace**: Reveals are timed to match the speed of human comprehension. Text elements do not rush onto the screen. They emerge in a staggered sequence, giving the reader time to digest the first sentence before the second demands attention.

---

## 3. Entrance & Exit Dynamics

* **The Stamp-Emboss Reveal**: Text entrances slide vertically by a small offset (20–30px) while fading in. This matches the visual feeling of type being physically stamped or pressed into the page, rather than floating over it.
* **Clean Exits**: When elements leave the viewport, they fade out using simple opacity changes. We reject dramatic exit scales or translations, which create unnecessary visual clutter in the peripheral vision.

---

## 4. Scrolling & Tactile Control

* **Respect for Direct Control**: We reject scrolljacking. Scrolljacking intercepts the user's manual trackpad inputs, creating a mismatch between physical finger movement and visual page reaction. This breaks the Leica principle of manual control. The page must scroll natively, responding immediately and predictably to the user's hand.
* **Spatial Anchors**: As the page scrolls, the left-side vertical nav updates with absolute precision. The active indicator does not pop; it shifts its focus highlight quietly, like an index marker on a slide rule.

---

## 5. Hover Philosophy: Target Lock

* **Autofocus Feedback**: The custom crosshair cursor is a target alignment tool. When hovering over an interactive element, the crosshair expands slightly and the center gold pip becomes solid. This mimics the autofocus confirmation inside a high-end camera viewfinder—a mechanical target lock.
* **The Ink Underline**: Link underlines do not snap into place. They draw from left to right at a deliberate speed, suggesting a mechanical pen drawing a reference line on paper.
* **Restrained Response**: Buttons do not bounce or pop on hover. They receive a subtle background color wash, indicating a change in system state without calling for visual celebration.

---

## Creative Director Questions for the Builder

Before we proceed to `07_design_principles.md`, consider these motion dynamics:

1. **How do we handle click transitions?** When clicking a nav number, the page scrolls smoothly to the section. Should this scroll be near-instant to maintain utility, or should it run at our signature heavy pace to reinforce the physical weight of the page?
2. **Should the thought-stream fragments in Chapter 02 hover separately?** The "constantly thinking about" fragments alternate in opacity. If hover makes them highlight individually, does that encourage exploration, or does it disrupt the unified block of text?
3. **Is the cursor lag noticeable?** The crosshair has a small interpolation delay to look smooth. Juries appreciate lag-free responsiveness. Does this delay feel like premium dampening (like a fluid tripod head) or does it feel like system latency?
