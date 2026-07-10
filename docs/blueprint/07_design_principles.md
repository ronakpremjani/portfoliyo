# Project Axiom — Design Principles (07_design_principles.md)

This document establishes the design principles for Project Axiom. To prevent these from becoming vague guidelines, **every principle listed below contains an explicit, actionable rule for enforcement.**

---

## 1. Questions Before Answers

> **"We do not document solutions. We document the process of solving."**

* **Actionable Rule**: No project, milestone, or section may lead with its answer (e.g., the technology, the code, or the title). Every element must be introduced by the core question or problem that prompted its creation. 
* **In Practice**: Instead of a header reading `"Employee Management System"`, the section must lead with: *“How do you build a system that stays fast as the organization grows?”*

---

## 2. Typography Before Decoration

> **"Contrast and whitespace are the only decorative materials we trust."**

* **Actionable Rule**: If a design layout feels "plain," you are forbidden from adding borders, container boxes, gradients, background cards, or icons to make it interesting. You must instead increase typographic contrast (skewing size ratios, weights, or line heights) and expand whitespace boundaries.
* **In Practice**: If a list of tools looks empty, we do not add tech logo icons. We double the size of the tool name and double the margin gaps around it.

---

## 3. Understanding Before Implementation (The Candor Rule)

> **"Real systems have compromises. The documentation must prove them."**

* **Actionable Rule**: Every project case file must feature a dedicated `"Trade-offs"` and `"Reflection"` field detailing a failure, a deferred decision, or an unresolved conflict. If a case file presents a story of flawless success, the entire case is rejected as marketing copy.
* **In Practice**: We explicitly print lines like: *“Conflict resolution was a known limitation... it remains unresolved.”*

---

## 4. Remove Before Adding

> **"Luxury is defined by what is left out."**

* **Actionable Rule**: Before any new element, text line, or visual indicator is added to the page, you must identify at least one existing element to simplify or delete. The interface must always tend toward a system of record in its idle state.
* **In Practice**: When adding the scroll progress line, we deleted the floating text indicator next to it. The line must communicate the state alone.

---

## 5. Precision Before Speed

> **"Motion is calibration, not expression."**

* **Actionable Rule**: Every animation on the site must use the same kinetic weight (the single cubic-bezier ease curve). If a hover effect or transition uses a custom bounce, a different duration, or dynamic wiggle offsets, it must be normalized.
* **In Practice**: The cursor hover confirms focus target locking by expanding and locking. It does not spin, pop, or track with spring-bounce dynamics.

---

## Creative Director Questions for the Builder

Before we proceed to `08_rejection_criteria.md`, consider these principles:

1. **How do we enforce the "Remove Before Adding" rule in future updates?** In software, we write tests to prevent regressions. Should we establish a "visual budget" (e.g., maximum number of visual dividers or font weights allowed on a single screen) to enforce this programmatically?
2. **Does the "Candor Rule" have a limit?** While founders appreciate honesty, listing severe system errors without clear recovery outcomes can backfire. Should our rule state that *every documented failure must explain the decision-making process during recovery*?
3. **Are we over-constraining the layouts?** By forcing "Typography Before Decoration," we restrict ourselves to a pure print-editorial format. Are we confident that this restraint will look premium rather than unfinished to standard reviewers?
