---
title: Design Space
description: The living, tabular exploration of FreeGrab's design axes, the contexts that instantiate them, and the open research questions.
---

This is the **living research artifact**: a structured map of *what can be done* with the gaze + manual-refinement paradigm, and the design choices that govern each possibility. It is updated as the exploration proceeds. Every [application example](/freegrab-docs/application-examples/) is a point in this space — a particular setting of these parameters, not a separate system.

The framing question:

> **Given gaze for coarse acquisition and the hand for fine refinement, what is the full space of things we can do across target geometries — and which design choices make each work?**

## Applications as instantiations

Applications are not separate techniques; they are settings of the design parameters below. This table is the index from "task" to "where it sits in the space."

| Application | Primary geometry (D1) | Commit semantics (D6) | Distinctive design choices | Status |
|---|---|---|---|---|
| **Modeling** — mesh manipulation | 3D volume | Deform (move vertex / edge / face), free transform, bimanual scale/stretch | Candidate snapping on mesh features; peripersonal-reach depth gain | Baseline implemented (Moravian star, demo cube) |
| **UI navigation — 2D** | 2D planar | Widget activation (click, toggle, set value) | Cursor refinement on dense widget layouts; co-planar cursor | Baseline gaze+pinch implemented; refinement in progress |
| **UI navigation — 2.5D layered** | 2.5D layered | Widget activation + layer selection | **Depth DOF selects the active layer** — unavailable to 2-DOF Gaze+Pinch | Planned (the key comparison) |
| **UI navigation — 1D** | 1D track | Set value along a parameter | Dimensional reassignment of redundant DOFs; precision-from-orthogonal-distance | Planned |
| **UI navigation — 3D** | 3D volume / 2.5D bas-relief | Select / manipulate sub-components | Sub-component selection inside a gazed parent | Planned (post-refactor) |

## Design axes (D1–D8)

Eight axes. Each lists the **3D baseline** behaviour as currently shipped and the **question / options** that the lower-dimensional or alternative settings raise.

| Axis | What it controls | 3D baseline | Question / options |
|---|---|---|---|
| **D1 — Target geometry** | The dimensionality the cursor lives in | Closed 3D mesh (volume) | Property of the *target* (provider declares dimensionality): 2D planar, 2.5D layered, 2.5D bas-relief, 1D track |
| **D2 — Input→cursor mapping** | How redundant hand DOFs map when target dim < 3 | All 3 DOFs consumed (planar + depth) | **M1** project + clamp · **M2** constrained fusion onto surface · **M3** dimensional reassignment (e.g. depth→layer) · **M4** mode partition across hands |
| **D3 — Reference-frame anchoring** | Where the target/cursor frame is fixed | Target-local; eye-relative motion basis | World-fixed (HUD) · head-fixed · object-anchored · **hand-anchored** (non-dominant hand as tablet — Guiard) |
| **D4 — Engagement / clutch** | How refinement begins and ends | Gaze hover engages (sticky); pinch commits; release ends | 2D has a stronger natural park position (last cursor pos vs gaze hit); re-engagement policy is a study question |
| **D5 — Cursor instantiation locus** | Where the cursor appears on (re-)engagement | Gaze hit → last cursor point → bounds centre | Transfers unchanged if the target exposes a collider + local-point mapping |
| **D6 — Selection / commit semantics** | What a pinch *does* | Modify (deform) or move (free transform) | Widget activation (click/toggle/value); press-and-hold vs push-through as alternate channels in 2.5D |
| **D7 — Hover, snap, disambiguation** | How the active candidate is chosen | Provider-driven candidate snap + motion-guided intent (direction, normal, proximity); velocity-gated stickiness; presets | Most reusable axis. Open: do 3D-tuned thresholds transfer to dense widget layouts? Depth-aware scoring for near-coplanar layers? |
| **D8 — CD-gain regime** | The transfer function | Visual-angle gain (planar, clamped 0.5–4.0); peripersonal-reach gain (depth); hover 0.5 / pinch 1.0 | Visual-angle transfers directly; depth gain degenerate in pure 2D, re-becomes relevant in 2.5D (reach→layer-stack vs reach→object-depth) |

## Demonstrator contexts (C1–C4)

Concrete cells of the (D1 × … × D8) cross-product, with most axes pinned at 3D defaults.

| Context | Geometry (D1) | Key mapping (D2) | Why it matters / hypothesis |
|---|---|---|---|
| **C1 — Flat 2D menu** | 2D planar panel | M1 (project + clamp) | FreeGrab in its *weakest* 2D configuration; tests whether the indirection paradigm alone beats Gaze+Pinch on a flat panel |
| **C2 — 2.5D layered menu** | Layered panels at depth | **M3** (depth → layer) | Where FreeGrab plausibly *beats* Gaze+Pinch — depth is a native channel a 2-DOF pointer lacks. The central comparison. |
| **C3 — 2.5D bas-relief** | Curved / low-relief surface | M2 (constrained fusion) | Does the precision advantage survive on a non-planar but locally-2D surface? Reuses the existing surface-constraint path |
| **C4 — 1D slider** | 1D parametric segment | Project to axis; orthogonal distance → precision | Stresses dimensional reassignment hardest (five redundant DOFs) |

## What transfers, what changes

| Transfers unchanged | Needs a thin new layer | Needs a study to resolve |
|---|---|---|
| Gaze sampling, lookback, sticky hover | Per-geometry candidate providers | Do 3D-tuned snap thresholds transfer to widget density? |
| Provider-driven candidate ranking + motion-guided intent | Widget-commit dispatch (click/toggle/value) | Does depth-as-layer-selector (C2) beat Gaze+Pinch + a scroll modifier? |
| Visual-angle planar gain; hover/pinch dual gain | A flattened (disc/ring) cursor visual for planar targets | Hand-distance-as-precision-dial: weaker on 2D? negligible? reversed? |
| Local-point constraint (planar & bas-relief) | — | Re-engagement / clutch policy on a 2D panel (generalizes back to 3D) |

## Open research questions

1. Does motion-guided snapping (tuned against 3D mesh density) transfer to widget layouts, or do widgets need their own preset?
2. Does the visual-angle gain default feel right for menu interaction, or should hover/pinch gain ratios change?
3. Does depth-as-layer-selector (C2) actually beat a 2-DOF Gaze+Pinch pointer with a scroll modifier? — the central comparison.
4. Hand-distance-as-precision-dial: weaker on 2D, negligible, or reversed?
5. Re-engagement / clutch policy on a 2D panel — does "last cursor position" win over "gaze hit"?
6. Bimanual on 2D: useful symmetrically, or only as the substrate for asymmetric tools (one hand pans, the other picks)?
7. Snap policy for *near-coplanar* widgets in C2 — does the proximity bypass need a depth-aware variant?
8. Threshold vs layer-spacing calibration in 2.5D (layer spacing can be smaller than the snap radius).

:::tip[This page is living]
As the exploration proceeds, application rows move from *planned* to *implemented*, axis cells gain concrete settings, and resolved questions move out of the open list into the relevant axis. The source treatment (axis-by-axis prose, with per-axis 3D-vs-2D divergence notes) lives in the main repo and will be folded in here as it stabilizes.
:::
