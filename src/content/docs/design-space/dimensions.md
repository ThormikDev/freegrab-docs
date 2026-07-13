---
title: "Dimensions (Table 1)"
description: The morphological design space — every dimension with its enumerated values, evidence codes, and the finding that decided the default.
---

The technique's design dimensions, grouped by [pipeline phase](/freegrab-docs/design-space/pipeline/). Codes: ✓ validated · ● built · ○ conceived · ✗ rejected (with finding). **Defaults bold.** Knobs per value: [Parameters Appendix](/freegrab-docs/design-space/parameters/).

## P0 — Latent

| Dim | Dimension | Values | Key finding / rationale |
|---|---|---|---|
| D0.1 | Latent cursor existence | none — classic gaze+pinch ✓ · **gaze-proxy, invisible** ✓ · always-visible cursor ✓ (classic FreeGrab) | The proxy is load-bearing: it is what lets a coarse pinch commit the gazed widget. Refinement must be the *special case*, not the default. |
| D0.2 | Coarse-commit grain | everything ✗ · **object-grain only** (Widget/Span/Region/SubObject) ● · nothing (grab-only) ○ | ✗ "everything": a latent cursor over a cube face made gaze+pinch *face-stretch* instead of grab. Principle: **selection grain must match input precision** (~1° gaze ≈ object grain). |

## P1 — Pre-selection (gaze)

| Dim | Dimension | Values | Key finding / rationale |
|---|---|---|---|
| D1.1 | Acquisition timing | live sample · **gaze lookback at pinch onset** ✓ | Compensates natural eye-hand latency; eyes leave the target before the pinch lands. |
| D1.2 | Pre-selection feedback | none · **outline on gazed element** ✓ | The gaze+pinch baseline's confidence channel; kept identical under FreeGrab. |
| D1.3 | Overlap disambiguation | nearest centre ✗ · **topmost drawn** ● | The eye selects what it *sees*; draw order is what it sees on stacked 2D content. |

## P2 — Engagement

| Dim | Dimension | Values | Key finding / rationale |
|---|---|---|---|
| D2.1 | Refinement trigger | speed threshold ✗ · **intentful displacement from a resting home** ✓ · explicit gesture ○ · dwell ○ · always-on ✓ (classic) | ✗ speed: the cursor flickered off in the slow corrective phase of aiming. Displacement-engage/dwell-disengage asymmetry follows the two-component (ballistic + corrective) model. |
| D2.2 | Post-commit re-arm | immediate ○ · **settle once before next engage** ● | Post-release arm travel must not instantly re-materialize the cursor. |

## P3 — Instantiation

| Dim | Dimension | Values | Key finding / rationale |
|---|---|---|---|
| D3.1 | Placement locus | last cursor position ✗ · **gaze hit** ✓ · geometry centre ○ · comfortable "home" pose ○ | ✗ last-position: successive actions drift the cursor into crossed/unreachable poses. Gaze-hit placement + pinch-boundary disengage (D9.1) re-homes every action. |
| D3.2 | Representation | **sphere** (volumetric) ✓ · **flat strain-ring** (planar) ● · articulated hand ✓ · sphere + ghost hand ✓ | The flat ring doubles as the strain display (leans/stretches against walls) — representation and pressure feedback unified. |
| D3.3 | Surface-style source | auto-detect content ○ · **target-declared** (planar/volumetric flag) ● | Explicit declaration keeps the design decision visible and covers flat-but-not-UI surfaces. |

## P4 — Refinement motion

| Dim | Dimension | Values | Key finding / rationale |
|---|---|---|---|
| D4.1 | CD gain regime | 1:1 ✓ · **visual-angle gain** ✓ · fixed 0.5 / 2.0 ✓ · hover vs pinch gains ✓ | Visual-angle gain transfers across target sizes/distances; per-mode gains tune ballistic vs corrective. |
| D4.2 | Border mapping | absolute offset ✗ · **border-clutch + strain channel** ● | ✗ absolute: outward overshoot became "ghost debt" the hand had to pay back. Mouse model: outward motion at a bound is discarded (reversal moves instantly); the discarded push lives on as a parallel **boundary-strain** channel feeding membranes and depth gestures. *Position is clutched; pressure is strain.* |
| D4.3 | Cursor filtering | **none** · 1€ filter ○ | Backlogged; orthogonal to engagement. |

## P5 — Containment & structure

| Dim | Dimension | Values | Key finding / rationale |
|---|---|---|---|
| D5.1 | Boundary profile (per boundary) | rubber-band on walls ✗ · **hard wall** ✓ · sustained-pressure membrane (pop-through) ● · displacement ratchet detent (step) ● · positional hysteresis detent ✓ | ✗ rubber-band: visual slack past a wall broke throw confidence and hover validity. Principle: **the visual boundary IS the interaction boundary** — slack only where strain charges a transition. Complementary lesson: *time-pressure for deliberate crossings; displacement detents for repeated stepping.* |
| D5.2 | Scope structure | **flat target** ✓ · hierarchy (descend/ascend stack) ✓ · capture-scope on 2D sub-shapes ● | Strict re-bind on descend: the bound catches *within* the part at every level. |
| D5.3 | Scope transition | soft membrane (push in/out) ✓ · explicit lock gesture (middle pinch) ✓ · relax-to-latent + re-gaze ● | Complementary pair: soft/unlocked vs explicit/locked; membrane stands down while locked. |
| D5.4 | Strain display | none ✗ · **region-glyph glow + charge colour** ● · **cursor lean/stretch** ● | ✗ none: "nearly impossible to see what is going on" at a hard wall. |

## P6 — Resolution

| Dim | Dimension | Values | Key finding / rationale |
|---|---|---|---|
| D6.1 | Selection vocabulary | mesh-only (Vertex/Edge/Face) ✗ · **kind × geometry contract** (semantic kind ⊥ snap geometry) ✓ | ✗ overloading mesh kinds onto widgets caused the repeated 2D-layer restarts. A slider is *Kind = Span, Geometry = Segment* — question dissolved. |
| D6.2 | Snapping | always-magnetize ✗ · **motion-guided intent snap** ✓ · none ✓ | SubObject/Volume candidates excluded from snap (✗ magnetizing them yanked the cursor between part centres). Snap is display-only under D4.2 — it never re-bases the clutch. |
| D6.3 | In-target region partition | none · **centre/corners/edges partition, glyphs as affordance only** ● | No small handle targets exist; the whole quadrant is the hit region — with the hard wall this makes corners effectively unmissable (edge/corner pointing, per-object). |

## P7 — Commit & manipulation

| Dim | Dimension | Values | Key finding / rationale |
|---|---|---|---|
| D7.1 | Commit trigger | **pinch** ✓ · dwell ○ · depth push-through ○ | Pinch keeps parity with the gaze+pinch baseline. |
| D7.2 | Commit semantics | **content-defined (commit-as-strategy)** ✓ — e.g. slider: refined = absolute set, coarse = relative drag ✓; shape: region × refinement ● ; button: click ✓ | The pinch's meaning is decided by the content and the refinement state, not a global mode switch. |
| D7.3 | Extra DOF during hold | none · **depth → z-order ratchet** ● · **wrist roll → rotate** ● · depth → cascade descend ✓ | The hand's spare DOFs get one honest job each; 2-DOF input has no channel for any of them. |
| D7.4 | Hands | **unimanual** ✓ · bimanual scale/rotate (3D) ✓ · bimanual 2D ○ | Marked **open subspace** — deliberately not yet surveyed. |

## P8 — Sustained modes

| Dim | Dimension | Values | Key finding / rationale |
|---|---|---|---|
| D8.1 | Lock | none · **whole-target / scope lock, purple** ✓ | Gaze decoupling: eyes explore while the hands keep operating — structurally impossible for gaze+pinch (gaze *is* its pointer). |
| D8.2 | Panel summon gesture | depth press-release ● · open-palm posture ● · **both enabled** ● · empty-canvas-only press ✗ | ✗ requiring empty canvas: stabilizing the cursor on a free area first was too finicky. Gesture grammar: *open palm / unlocked press = slide-level panel; lock + press = object-level panel.* |
| D8.3 | Panel navigation | z-layer detent ✓ · cascade descend-over-item ✓ · **quadrant depth-marking** ● | Quadrant marking: full-surface 2×2 tiles per layer, stroke in depth — targets big enough for gaze alone. |

## P9 — Disengagement

| Dim | Dimension | Values | Key finding / rationale |
|---|---|---|---|
| D9.1 | Policy | any-stillness ✗ · dwell ✓ · pinch-boundary ● · **hybrid** ● · gaze-saccade ○ | ✗ any-stillness: dropped the cursor mid-aim. Dwell fixed that but held the cursor hostage *after* commits; pinch release is a task boundary (corrective phase ended at commit) → instant latent return, dwell as no-pinch fallback. |
| D9.2 | Suppression | none ✗ · **lock + open-panel holds** ● | An explicit refinement context (purple lock, open picker/menu) must never evaporate under the user. |
