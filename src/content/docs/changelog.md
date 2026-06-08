---
title: Changelog
description: Session-by-session record of the FreeGrab project's evolution.
---

# Changelog

A curated, human-readable record of each working session — *what* changed, *why*, and *what's next*. The git history of the FreeGrab and freegrab-docs repos is the precise record beneath this narrative; this page is the memory.

Entries are reverse-chronological (newest first).

---

## 2026-06-08 — Re-orientation, ROADMAP-V2, and docs-site kickoff

**What.**
- Resumed the project after a hiatus; audited the codebase, the 3D roadmap, and the full canvas-2D design-space document series to re-establish current state.
- Reconciled three drifting planning artifacts (the 3D `ROADMAP_V1`, the canvas-2D "Reset + Refactor" plan, and the toolkit package vision) into a single ordered plan, committed as `ROADMAP-V2.md` in the main repo.
- Locked five decisions: (1) contract-first refactor, (2) decompose-in-place then extract to packages, (3) static-site docs from Markdown, (4) git source safety, (5) a ranked-internally / single-exposed selection-candidate model.
- Put the main Unity project under version control for the first time (it was not a git repo) and recorded a pre-refactor baseline commit.
- Kicked off this documentation site: chose Astro + Starlight on GitHub Pages, in a dedicated public repo separate from the heavy/private Unity project.

**Why.**
- The technique's framing ("FreeGrab *extends* Gaze+Pinch with coexistence, not replaces it") needed to be reflected consistently in both the plan and the code. The planning docs had diverged enough that "where are we" was ambiguous.
- The biggest architectural flaw — the 3D `Vertex/Edge/Face` point-of-interest vocabulary overloaded onto 2D widgets (Button/Slider/Panel) — blocks sub-component selection and the slide editor. Fixing the selection contract first avoids re-threading every interactor subsystem later.
- A large refactor with no version control was an unacceptable risk.

**Next.**
- Stand up the Astro Starlight site (Node + GitHub auth), migrate the architecture and design-space docs in, publish to GitHub Pages.
- Then begin **Phase 1**: the geometry-agnostic selection contract (`FreeGrabSelectionKind`, `FreeGrabSelectionCandidate`, `IFreeGrabSelectionProvider`) with a point-of-interest → candidate adapter so nothing regresses.

---

<!--
Template for new entries:

## YYYY-MM-DD — Short title

**What.**
- ...

**Why.**
- ...

**Next.**
- ...
-->
