---
title: FreeGrab
description: A multimodal gaze + manual-refinement interaction technique for XR, and the design space it opens.
---

**FreeGrab is, first and foremost, an interaction technique** for XR: it lets a user act on *gazeable targets* by combining **coarse acquisition through gaze** with **precise refinement through the hand**. Gaze+Pinch is the foundation; FreeGrab is the refinement layer that materializes when the user signals intent for precision.

Because it is a *technique*, not an application, the same machine drives many tasks — and the systematic study of what that machine can do is the research contribution.

:::note[Working title]
"FreeGrab" is a tentative name for the technique while the research is in progress.
:::

## What is what

The project has three clearly separated layers. Keeping them distinct is essential to the research framing.

| Layer | What it is | Examples |
|---|---|---|
| **Paradigm** | Multimodal **gaze + manual refinement**: gaze acquires, the hand refines, a pinch commits. | — |
| **Technique** | **FreeGrab** — the concrete instantiation of the paradigm that steers a cursor over gazeable targets, with snapping, control–display gain, and a latent cursor. | — |
| **Applications** | Real tasks the technique *drives*. Each is an instantiation of design choices within the paradigm. | Modeling via mesh manipulation; UI navigation in 1D, 2D, 2.5D, and 3D. |

The **design space** is the thorough exploration of *what we can do with this kind of multimodal gaze + manual refinement*. Every application example is a point in that space — a particular setting of the design parameters, not a separate system. See **[The Technique](/freegrab-docs/technique/)** for the conceptual model and **[Design Space](/freegrab-docs/design-space/)** for the living exploration.

## The interaction in one breath

1. **Gaze acquires** — coarse, fast, discrete: which target is attended to.
2. **The user signals intent** — pinch with no refinement → commit on the gaze-preselected target (state-of-the-art Gaze+Pinch); or start moving the hand → a cursor materializes.
3. **The hand steers** — hand motion drives the cursor *within the acquired target's bounds*; gaze is locked from warping it (anti-warp).
4. **Pinch commits** — on whatever the cursor (or gaze, if no cursor) is bound to.

Plain Gaze+Pinch always works; FreeGrab is purely additive on top of it.

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

## Explore

- **[The Technique](/freegrab-docs/technique/)** — the conceptual model: gazeable targets, the gaze + manual-refinement loop, and how technique, content, and application separate.
- **[Design Space](/freegrab-docs/design-space/)** — the living, tabular exploration of the design axes and the contexts/applications that instantiate them.
- **[Application Examples](/freegrab-docs/application-examples/)** — short video demonstrations of instantiations across target geometries.
- **[Changelog](/freegrab-docs/changelog/)** — a session-by-session record of how the project and its thinking evolve.
