# Project Axiom — Visual Language (05_visual_language.md)

This document establishes the tactile, typographic, and composition parameters for Project Axiom. In accordance with the project workflow, **no color selections or hex codes are defined in this document.**

---

## 1. Materials & Textures

The digital canvas must transcend flat screens by mimicking the textures of premium physical artifacts:

* **Tactile Paper Grain**: The background must feel like heavy, matte paper stock. A micro-grain texture that breaks digital flatness without becoming a visible pattern.
* **Anodized Metal**: Controls, buttons, and borders must behave like brushed aluminum or titanium. They represent cold structural frames—unyielding and solid.
* **Optical Glass**: Hover layers, indicators, and details use refractive, glass-like containment boundaries, suggesting precision lens elements (e.g., Leica viewfinders).

---

## 2. Typography Philosophy

Typography is the primary visual block. We use it like concrete in architecture:

* **The Grotesque Core**: A single grotesque sans-serif family (Inter) is used at extreme scale ratios. Scale differences create meaning.
* **The Monospaced Annotation**: A technical monospace family (IBM Plex Mono) is reserved exclusively for coordinates, chapter indicators, numbers, and structural metrics. It is never used for body text.
* **Tight Tracking**: Headings use negative letter-spacing (tighter tracking) to make the letterforms feel locked together, like letters stamped into metal.
* **Unmixed Faces**: We reject font-mixing. Using only two type families enforces the feeling of reading a technical manual.

---

## 3. Composition & Whitespace Philosophy

* **Asymmetrical Tension**: Avoid center-aligned grids. Aligning elements off-center creates spatial tension, drawing the eye across empty areas.
* **Whitespace as a Material**: Whitespace is not "empty space." It is a positive building block that creates focus and prestige. Large expanses of empty screen space signal that the content is important enough to stand alone.
* **Marginal Rules**: Margins match the proportion of classic publishing layouts (8% horizontal gutters). Thin, structural lines act as architectural beams, holding content blocks together.

---

## 4. Luxury & Editorial Principles

* **Restraint over Expression**: If a design element exists only to fill space, it must be removed. 
* **Earned Disclosures**: Detail is hidden until the user interacts. The interface remains quiet and clean; information density increases only when the reader actively zooms in.
* **The Magazine Page**: Layouts are designed to resemble editorial spreads. We prioritize single-column technical logs and block quotes over standard multi-column grid layouts.

---

## 5. Industrial Design Influences

Our visual vocabulary draws directly from classic product craftsmanship:

* **Leica (Mechanical Calibration)**: Sharp corners, tiny structural index ticks, and monospaced number labels that resemble focal distance markings on a lens barrel.
* **Dieter Rams (Functionalism)**: Controls must look and behave like structural buttons. Flat surfaces, clear margins, and zero decorative elements.
* **Porsche (Aerodynamic Line)**: Layout flows continuously without jarring breaks. Borders and rules are thin and light, acting as simple structural guide rails.

---

## Creative Director Questions for the Builder

Before we proceed to `06_motion_language.md`, review these visual rules:

1. **How do we handle image frames?** In an editorial magazine, photos have precise boundaries, captions, and reference numbers. Should we wrap any future image or project visual in a structured, monospaced "frame" detailing image coordinates and capture metadata?
2. **Is a 100% custom scrollbar too extreme?** We increased the scrollbar width to 6px for usability, but should we style it further to resemble an anodized metal slider bar, or does standard styling look cleaner?
3. **Should the margins expand on wider screens?** An 8% margin is clean on laptop viewports, but on ultra-wide screens, it can push text too far apart. Do we want to lock the maximum readable content container to a fixed width (e.g., 1200px) to preserve the editorial grid?
