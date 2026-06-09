---
title: Changelog
description: Session-by-session record of the FreeGrab project's evolution.
---

A curated, human-readable record of each working session — *what* changed, *why*, and *what's next*. The git history of the FreeGrab and freegrab-docs repos is the precise record beneath this narrative; this page is the memory.

Entries are reverse-chronological (newest first).

---

## 2026-06-09 — Phase 1: geometry-agnostic selection contract

**What.**
- Landed the selection contract that retires the `Vertex/Edge/Face` overload: separated **`FreeGrabSelectionKind`** (semantic identity → commit meaning) from **`FreeGrabSelectionGeometry`** (snap shape → magnetism). Added `FreeGrabSelectionCandidate`, `IFreeGrabSelectionProvider`, and a lossless point-of-interest ⇄ candidate adapter.
- Reworked `FreeGrabTarget` to rank across both new providers and adapted legacy providers through one authoritative, allocation-free spine; reimplemented the old POI query as a thin compatibility view so the interactor, cursor visualizer, and content providers stayed untouched and behaviourally identical.
- Added 7 EditMode regression tests (adapter round-trips, legacy equivalence on the cube deformer, mixed-provider ranking, geometry tie-break) — all green; no compile errors.

**Why.**
- The POI vocabulary overload was the most expensive deferred decision. Fixing the contract *first* (before decomposing the interactor) avoids re-threading every subsystem later. Separating geometry from kind answers "is a slider an Edge?" cleanly: a slider is `Kind = Widget, Geometry = Segment`.

**Next.**
- Verification workflow is set: the agent monitors the Unity console for compile errors via the editor bridge; the researcher tests the human-in-the-loop interaction over Quest Link. Pure-logic parts get EditMode tests.
- Continue Phase 1 (migrate the canvas provider to emit `Widget` candidates; carry the candidate on the edit context) or begin Phase 2 (decompose the interactor).

---

## 2026-06-08 — Re-orientation, ROADMAP-V2, and docs-site kickoff

**What.**
- Resumed the project after a hiatus; audited the codebase, the 3D roadmap, and the full canvas-2D design-space document series to re-establish current state.
- Reconciled three drifting planning artifacts (the 3D `ROADMAP_V1`, the canvas-2D "Reset + Refactor" plan, and the toolkit package vision) into a single ordered plan, committed as `ROADMAP-V2.md` in the main repo.
- Locked five decisions: (1) contract-first refactor, (2) decompose-in-place then extract to packages, (3) static-site docs from Markdown, (4) git source safety, (5) a ranked-internally / single-exposed selection-candidate model.
- Put the main Unity project under version control for the first time (it was not a git repo) and recorded a pre-refactor baseline commit.
- Stood up this Astro + Starlight documentation site and published it to GitHub Pages at https://thormikdev.github.io/freegrab-docs/ — auto-deploying from `main` (CI pinned to Node 24).
- Reframed the site around a clean three-layer story — **paradigm → technique → applications** — with the design axioms on the home page, a new *The Technique* concept page, and the *Design Space* as a living, tabular HCI-style artifact. **Deferred** any code-architecture diagrams until the implementation stabilizes.

**Why.**
- The technique's framing ("FreeGrab *extends* Gaze+Pinch with coexistence, not replaces it") needed to be reflected consistently in both the plan and the code. The planning docs had diverged enough that "where are we" was ambiguous.
- The biggest architectural flaw — the 3D `Vertex/Edge/Face` point-of-interest vocabulary overloaded onto 2D widgets (Button/Slider/Panel) — blocks sub-component selection and the slide editor. Fixing the selection contract first avoids re-threading every interactor subsystem later.
- A large refactor with no version control was an unacceptable risk.
- The previous Mermaid architecture diagrams had low communicative value, and Phase 1+ will move a lot of code. The clearest way to communicate the project now is to make the axioms explicit, keep the design space living and tabular, and make "what is what" unambiguous — not to diagram a codebase mid-refactor.

**Next.**
- Record short demonstrator clips for the Application Examples gallery.
- Begin **Phase 1**: the geometry-agnostic selection contract (`FreeGrabSelectionKind`, `FreeGrabSelectionCandidate`, `IFreeGrabSelectionProvider`) with a point-of-interest → candidate adapter so nothing regresses.

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
