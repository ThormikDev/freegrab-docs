---
title: FreeGrab
description: A refinement-based, gaze-assisted indirect pointing technique for XR.
---

# FreeGrab

**FreeGrab is a refinement-based, gaze-assisted indirect pointing technique for XR.**
Gaze+Pinch is the foundation; FreeGrab is the refinement layer that materializes when the user signals intent for precision.

It decouples **coarse target acquisition** (eye gaze) from **precise sub-target pointing** (a hand-steered cursor with configurable control–display gain), and generalizes the same machine across 3D volumes, 2D panels, 2.5D layered UI, and 1D tracks.

---

## The interaction in one breath

1. **Gaze acquires** — coarse, fast, discrete: which target is attended to.
2. **The user signals intent** — pinch with no refinement → commit on the gaze-preselected target (state-of-the-art Gaze+Pinch); or start moving the hand → a cursor materializes.
3. **The hand steers** — hand motion drives the cursor *within the acquired target's bounds*; gaze is locked from warping it (anti-warp).
4. **Pinch commits** — on whatever the cursor (or gaze, if no cursor) is bound to.

Plain Gaze+Pinch always works; FreeGrab is purely additive on top of it.

---

## Design axioms

The invariants the technique defends. Every feature is measured against these.

1. **Gaze coarse, hand precise.** Decouple acquisition (fast, discrete) from refinement (proportional, precise).
2. **Coexistence, not replacement.** Gaze+Pinch is the floor; FreeGrab is additive refinement that materializes on hand-motion intent (latent cursor).
3. **Content provides candidates; the technique steers the cursor.** Target/provider separation; the technique is invariant from slider to star.
4. **Selection precedes manipulation and is informed by the goal.** How we select is shaped by how we intend to manipulate.
5. **Progressive specificity.** Coarse candidate regions refine only as the user's intent becomes clear.
6. **Gesture economy via context.** The same gesture means different things based on what was hovered when it began.
7. **The boundary is a gradient, not a wall.** Corners arm resize, edges arm move/1D-resize, the membrane is the soft escape — a continuous interaction map.
8. **One paradigm across 1D / 2D / 2.5D / 3D.** The test of generalization is that the same machine handles all geometries without forking the code path.

---

## Explore

- **Architecture** — the technique model, the target/provider/editable contract, and the per-frame execution pipeline.
- **Application Examples** — short video demonstrations: the Moravian-star deformation, the 2D panel, the slider, and (soon) the slide editor.
- **Design Space** — the eight design axes (D1–D8) and four demonstrator contexts (C1–C4) that frame the systematic exploration.
- **Changelog** — a session-by-session record of how the project and its thinking evolve.
