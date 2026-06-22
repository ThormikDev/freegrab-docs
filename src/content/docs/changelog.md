---
title: Changelog
description: Session-by-session record of the FreeGrab project's evolution.
---

A curated, human-readable record of each working session — *what* changed, *why*, and *what's next*. The git history of the FreeGrab and freegrab-docs repos is the precise record beneath this narrative; this page is the memory.

Entries are reverse-chronological (newest first).

---

## 2026-06-22 — Geometry congruency fixes + sub-component selection (Steps A–B)

**What.**
- **Surface congruency:** added a content-provided `IFreeGrabSurfaceConstraint` (exact closest-point-on-triangle in the mesh deformer) so the cursor stays on the deformed surface instead of the bounding box / convex hull. That exposed a deeper selection regression, fixed by excluding intra-face triangulation **diagonals** from selectable edges — so a coarse "throw at a face" reliably lands on the face (and two long-standing deformer test reds went green). A minor visual residual (cursor occasionally on the wrong side of a face after a hard throw) is logged for a later pass.
- **Sub-component selection** (gaze a parent, refine to a child) begun: `FreeGrabHierarchySelectionProvider` exposes a composite's children as `SubObject` candidates on the Phase 1 contract (the cursor snaps to them with *no* interactor changes); `FreeGrabSubObjectHighlighter` outlines the hovered child via QuickOutline as a decoupled observer; a demo bootstrap builds a synthetic vehicle (body + 4 wheels) to test against.
- **Architecture decision:** "enter/leave a sub-component" is modelled as a *pluggable scope-transition* over a stable scope + candidate core, so mechanisms (depth push-through, hand-openness, pinch, dwell) can be A/B'd. v0.1 uses the hovered sub-object as the implicit scope; the **depth push-through membrane** is the first descend mechanism to prototype.

**Why.**
- The constraint must *guide* — coarse movements should land on the intended feature. The surface + crease fixes restore that for mesh faces; sub-component selection extends "gaze coarse, hand precise" one level down (the car-wheel / slide-editor test case).

**Next.**
- Step C: candidate migration so a pinch free-transforms the hovered sub-object (move the wheel); then prototype depth-push-through descend for nested mesh refinement.

---

## 2026-06-12 — Phase 2 decomposition complete

**What.**
- Finished decomposing `FreeGrabInteractor` (~1900 → ~860 lines; now config + per-frame orchestration + facade). Six focused units own the leaf concerns: `FreeGrabSnapResolver` (snap + intent), `FreeGrabCursorNavigation` (control–display gain), `FreeGrabFreeTransform` (unimanual + bimanual), `FreeGrabCursorVisualAuthority` (cursor appearance), the shared `FreeGrabCursorState` blackboard, and a `FreeGrabInteractor` wiring partial. Added an `IFreeGrabCursorSource` facade for code-level consumers (tests, replay, study tools).
- **Critical finding:** the prescribed cursor-drift "fix" was a misdiagnosis — the pinch steering is already absolute-from-start (non-accumulating), so frame-incremental "fixing" would *introduce* drift. Dropped it; if 2D drift recurs it's the gaze pipeline (where doc-06 traced it).
- Kept the per-frame orchestration (gaze → hover → pinch) as the interactor's coordinator role rather than extracting it — it depends on every collaborator, so extraction would only add plumbing. Likewise the wiring is a `partial class` file-split, not a separate object, because it is MonoBehaviour-lifecycle code.

**Why.**
- The leaf computations are now independently testable and alterable, and the interactor reads as a legible sequence — the navigable foundation for resuming the design-space exploration.

**Next.**
- Resume Phase 5 (sub-component selection / demonstrators), fix the noted surface-constraint issue, or extract the technique to a UPM package.

---

## 2026-06-09 — Phase 2: interactor decomposition begins (Steps 1–3)

**What.**
- Began decomposing the ~1900-line `FreeGrabInteractor` into focused, single-responsibility units (plain C# classes the interactor owns; all serialized config stays on the interactor, so existing scenes keep their tuned settings). Landed three: **SnapResolver** (snap + motion-guided intent), **CursorNavigation** (control–display gain / visual-angle mapping), and **FreeTransform** (unimanual + bimanual whole-object manipulation). Promoted the shared per-cursor state to a top-level `CursorRuntimeState` "blackboard" the subsystems read and write.
- Established an `InternalsVisibleTo` seam so the extracted internals stay unit-testable, and a working rhythm: the agent monitors the Unity console for compile errors via the editor bridge; the researcher runs EditMode tests and headset checks.
- Logged a known issue: after deformation the cursor can sit inside the target's bounds/collider but outside the visible mesh — the surface constraint *approximates* the geometry (AABB / convex collider / discrete face features) instead of computing the true nearest point on the live mesh. Proposed fix: a content-provided `IFreeGrabSurfaceConstraint`, consistent with the selection-candidate contract.

**Why.**
- The monolith forced every new feature through one giant class. Decomposing around the shared cursor state makes the system navigable and each concern independently alterable — the prerequisite for a clean design-space exploration.

**Next.**
- Continue: cursor-visual authority, pinch steering (with the structural fix for the cursor-drift bug), latent cursor refinement, then a thin coordinator + facade.

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
