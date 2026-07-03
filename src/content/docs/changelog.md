---
title: Changelog
description: Session-by-session record of the FreeGrab project's evolution.
---

A curated, human-readable record of each working session — *what* changed, *why*, and *what's next*. The git history of the FreeGrab and freegrab-docs repos is the precise record beneath this narrative; this page is the memory.

Entries are reverse-chronological (newest first).

---

## 2026-07-03 — The UI thrust: 2D/2.5D menus, the PowerPoint canvas, and the cursor core

**What.**
- **UI generalization on the selection contract (C1→C2→cascade).** A clean-rebuilt UGUI world-space UI layer speaking the candidate contract natively: buttons/toggles are `Widget/Area` (commit anywhere within — no centre-snapping), sliders are `Span/Segment` (refined cursor = absolute "mouse-click" set, coarse gaze+pinch = relative drag), panels are `Region`. Zero interactor changes — validating the "same machine across geometries" thesis. Then 2.5D: a **hard depth detent** (`FreeGrabUiLayerConstraint`) makes each layer flat 2D to refine while hand depth picks the layer, and a **dynamic cascading menu** walks real submenus by depth (push over a parent item to unfold, pull to collapse).
- **The widget membrane, redesigned as a ratchet detent.** The cursor is *captured* by the active widget and one deliberate push past its edge steps exactly one widget in the pushed grid direction (fixed displacement, quantized axis, re-arm gate — no diagonals, no time-pressure, no skidding). Lesson recorded: *displacement detents for repeated stepping; time-pressure for deliberate boundary crossings.*
- **The "PowerPoint canvas" demonstrator** — the full-pipeline showcase. Gaze pre-selects a shape and the refining cursor is **hard-clamped inside it**, so a ballistic throw at a corner cannot overshoot: centre = move, corner quadrants = resize, edge bands = stretch — handle glyphs are affordance only, no small targets exist. Wrist roll rotates; hand depth ratchets **z-order** while the overlap stack **fans out into real depth** (the slide un-flattens so you see the z you're reordering). A sustained-push **escape membrane** (strain shown as glow — walls stay positionally exact) pops the cursor onto the canvas; a **depth-layered color picker** (XY = hue/saturation, depth = brightness layer, deeper = darker) gives a continuous 3-DOF pick that 2-DOF input structurally cannot. A desktop-mimic condition (pinch = select, then acquire real small handles) is one switch away for the A/B.
- **The quadrant depth-marking menu with pull-to-place.** A sustained **open palm** summons a full-slide layer of four huge quadrant tiles (Shape ▸ / Image ▸ / Clear / Grid); pushing into a quadrant unfolds the next full-slide layer — a marking menu whose stroke is in *depth*, with targets big enough for gaze alone. The signature move: **pinch a leaf item and pull it back through the layers** — the spawned shape rides the cursor, the menu dissolves behind it, release places it on the slide. Menu selection flows into coarse placement in one gesture.
- **The cursor core, rebuilt from headset feedback.** (1) *Disengage policy*: a completed refined pinch is a task boundary — refinement returns to latent instantly at release (dwell as fallback); a locked cursor or open panel always suppresses it. (2) *Selection-grain gating*: coarse gaze+pinch commits only object-grain candidates (Widget/Span/Region/SubObject); mesh features are refined-only — a coarse pinch on a mesh is always a whole-object grab. (3) *Border-clutch + strain*: the cursor clamps like a mouse at the screen edge (reversal moves immediately, no travel debt) while the discarded push lives on as a **boundary-strain** channel feeding every membrane — *position is clutched; pressure is strain.* (4) A **flat strain-ring cursor** on planar targets that leans and stretches along the strain — the cursor itself is the pressure display.
- **Principle recorded (recurring correction): the visual boundary IS the interaction boundary.** Overshoot slack is legitimate only where strain charges a transition (membrane pop, detent step) — never on a plain containment wall.

**Why.**
- The thrust's question is *where refinement adds value over gaze+pinch, which is already excellent at flat selection*. The answers that survived headset testing are structural, not positional: capture + hard walls turn corners into unmissable targets (edge pointing, recreated per-object by gaze); detents turn positioning into confident discrete steps; depth and wrist roll give the hand jobs 2-DOF input has no channel for; and pull-to-place collapses menu → placement into one movement. Coexistence held throughout: every coarse gaze+pinch path stays fully useful, refinement only adds.

**Next.**
- Single headset tuning session over the consolidated parameter backlog (engage/disengage, strain drain, escape, summon thresholds, layer depths, roll sign).
- High-priority slide backlog: canvas-resize as the outermost scope; the **2D↔3D portal** (a slide shape as a live RenderTexture preview of a 3D object — depth-pull extracts it into the room, push-back flattens it; Moravian star first) as the demo-video centrepiece.
- Extract the shared pressure/detent core (5+ membrane instances); docs-site "UI (2D/2.5D)" section with demonstrator clips.

---

## 2026-06-22 — Hierarchy descend/ascend: membrane + explicit lock gesture

**What.**
- **Scope model + pluggable transition seam.** A per-cursor **scope stack** with **strict re-bind** — descending confines the cursor to the child's geometry (the bound catches *within* the part) — plus an interactor seam (`DescendScope`/`AscendScope`) that mechanisms drive as decoupled observers.
- **Two mechanisms, coexisting.** (1) *Soft membrane* — push the cursor *into* a part to descend, *out* to ascend (reuses the push-through pressure model). (2) *Explicit lock gesture* — a **secondary middle-finger pinch** descends *and gaze-locks* the cursor to its target so it holds context while the eyes explore the scene; pinch again with no deeper part to ascend/unlock. The membrane stands down while locked, so the two are complementary (soft/unlocked vs. explicit/locked); each is independently optional.
- **Locked-state feedback** — the locked sub-object is outlined **purple** (vs. green hover), the legible signal that gaze is decoupled.

**Why.**
- "How do we enter and leave a sub-component" is the core nested-refinement question. Strict re-bind keeps the trust axiom at every level; the explicit lock adds a deliberate, gaze-independent working context — useful when the eyes must scan the environment while the hands keep operating on one object.

**Next / known.**
- Sub-object POI snapping makes the cursor flicker on composites (logged §7.4) — exclude `SubObject` candidates from the snap path. Lock should also work on leaf targets like the cube (decouple lock from descend). Tune + unify the 3D/2D membrane pressure model.

---

## 2026-06-22 — Composite surface constraint + sub-object free-transform (Step C)

**What.**
- **Composite navigable surface.** Headset testing of the sub-component demo showed the cursor floating in *empty space* — the parent's crude box collider was mostly air between the body and wheels, and the cursor roamed it. Fix (the researcher's diagnosis): a composite target's navigable surface is the **union of its child meshes**, not the bounding box. New `FreeGrabCompositeSurfaceConstraint` (an `IFreeGrabSurfaceConstraint`, auto-collected exactly like the deformer's) returns the nearest point across all child triangles, so the cursor rides the real body+wheels geometry and moves *freely* between parts — **no hard snapping** (rejected as too "sticky" for navigating complex meshes; light assistance + the enter/exit membrane will come instead). Shared closest-point-on-triangle math extracted to `FreeGrabGeometry`.
- **Sub-object free-transform (manipulation scope).** A pinch on a hovered part now free-transforms *that part*, not the whole vehicle. Introduced a per-cursor **manipulation scope**: the transform a free-transform acts on — the whole target by default, the hovered sub-object when refined into one (the v0.1 "hovered sub-object = implicit scope" rule). `FreeGrabFreeTransform` now operates on a scope `Transform` and groups bimanual sessions by scope, so two hands on one part scale it while parts of one parent move independently. Parent stays the `ActiveTarget` (hover/visual/POI); only the manipulation retargets — minimal coupling.
- **Tighter gaze box** computed from the child union instead of a hand-authored size.

**Why.**
- The constraint must keep the cursor on the *visible* geometry; for a composite with no dominant root, that geometry is the union of its parts. Scoped manipulation makes "gaze the car, refine to a wheel, move the wheel" actually manipulate the wheel — completing the sub-component v0.1 loop.

**Headset feedback fixed (same day).**
- The composite's parts now go **transparent/tinted** on hover/active so the cursor is visible *inside* them — feedback was previously applied only to the target's own renderer, which a composite parent lacks; generalized to all child renderers.
- A pinch on a part now actually **free-transforms that part**. A sub-object candidate was being routed into the (no-op) deformation-edit path, so nothing moved *and* the edit path let the cursor crawl out of the body — one bug, two symptoms. A hovered sub-object now takes precedence and routes to free-transform.
- The cursor now **rides the manipulated part** (re-derived from the grab point in the scope's frame), which also keeps the highlight locked to the grabbed part.

**Next.**
- Light snap-assist toward sub-objects + the **depth push-through membrane** for descend/ascend (slight help to enter a part, slight force to leave). Open design question logged: composite *parent semantics* — should one child be promoted to "primary," and by what heuristic?

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
