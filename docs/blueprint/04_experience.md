# Project Axiom — Experience & filmlike Map (04_experience.md)

This document maps the layout experience of the page. Instead of using standard web grid architecture, we treat the page as a continuous filmic reel, mapping the purpose, core question, emotional response, and transition trigger for every chapter.

---

## 1. Chapter 01: Hero (The Statement)

* **Filmic Equivalent**: **The Opening Frame**. A static wide shot in low lighting. Bold typography overlays the silence, establishing the tone, coordinates, and atmosphere of restraint.
* **Purpose**: To state a clear engineering position and establish that this site values thought above speed.
* **Question**: *"What type of engineer am I looking at?"*
* **Emotion**: Curious disorientation and focused expectation.
* **Transition**: A monospaced scroll invite (*"Scroll to continue"*) and a faint `↓` arrow. Scrolling down slides the text out of frame and reveals the first thin horizontal line separating chapters.

---

## 2. Chapter 02: Perspective (Principles)

* **Filmic Equivalent**: **The Close-Up**. An intimate tracking shot moving diagonally across scattered text fragments. The staggered alignment forces the eye to scan back and forth, slowing down the reading speed.
* **Purpose**: To explain the core philosophy that governs the developer's technical decisions.
* **Question**: *"How does this person approach engineering design decisions?"*
* **Emotion**: Intellectual alignment and analytical interest.
* **Transition**: The section ends with two isolated, high-contrast sentences (*"Principles without evidence / are just opinions."*) followed by a text button: `The evidence →`. Clicking or scrolling passes the final dividing line.

---

## 3. Chapter 03: Case Files (The Evidence)

* **Filmic Equivalent**: **The Forensic Sequence**. High-density information layers presented in structured columns. Wide margins, monospaced metadata headers, and horizontal dividers create the feeling of reading a dossier or system report.
* **Purpose**: To substantiate the principles in Chapter 02 by documenting real architectural trade-offs, constraints, and failures.
* **Question**: *"Can this engineer solve complex system challenges under real-world constraints?"*
* **Emotion**: Analytical immersion, verification, and deep trust.
* **Transition**: A vertical gap of `18vh` follows the final case reflection, leading into a thin horizontal border separating evidence from progression.

---

## 4. Chapter 04: Expedition (The Milestones)

* **Filmic Equivalent**: **The Retrospective Montage**. Alternating left offsets and text weights mapping a path of intellectual maturation. Not a timeline of dates, but a journey of insights and shifts.
* **Purpose**: To explain how this specific level of engineering judgment was acquired over time.
* **Question**: *"How did this developer develop this specific level of engineering judgment?"*
* **Emotion**: Maturation appreciation and context validation.
* **Transition**: The final milestone (*"Today"*) ends with a statement of ongoing discovery, transitioning into a thin dividing rule.

---

## 5. Chapter 05: Toolkit (The Instruments)

* **Filmic Equivalent**: **The Tool Bench**. A clean, structured grid displaying the developer's instruments. The layout pairs each tool name directly with a functional explanation of *why* it is reached for.
* **Purpose**: To present the technical stack through the lens of engineering utility rather than skills inventory.
* **Question**: *"What tools does this developer trust to build their systems?"*
* **Emotion**: Structural clarity and verification of restraint.
* **Transition**: A final border closes the toolkit rows. The layout immediately drops in density, leaving a wide expanse of dark space before the final shot.

---

## 6. Chapter 06: Connect (The Connect)

* **Filmic Equivalent**: **The Fade to Black**. A static wide shot. One central question, an invite, and four clean links mapping email, socials, and resume. The copyright metadata acts as the credit crawl.
* **Purpose**: To invite the reader into a high-value technical conversation.
* **Question**: *"Do we have a system bottleneck that this developer can help us resolve?"*
* **Emotion**: Focus, quiet resolution, and the decision to act.
* **Transition**: The experience ends. The custom cursor crosshair is the only active element remaining, confirming the page is static and complete.

---

## Creative Director Questions for the Builder

Before we proceed to `05_visual_language.md`, consider these experience transitions:

1. **How do we control the scroll pace?** In film, pacing is controlled by cuts and frame lengths. On a website, the user controls the scroll speed. Should we use CSS Scroll Snapping to force the reader to stop at specific chapter boundaries, or is native smooth scrolling more respectful of their control?
2. **Is the transition from Case Files to Expedition too fast?** The Case Files are dense and require deep reading. The Expedition is lighter and staggered. Does this drop in density feel like a welcome relief, or does it feel like a drop in quality?
3. **Do the monospaced numbers (`01 / 02 / 03`) function effectively as cinematic subtitles?** Juries appreciate elements that act as anchors. Do the chapter index numbers provide adequate structural orientation?
