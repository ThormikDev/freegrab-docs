---
title: The Pipeline
description: The technique's inherent interaction flow — a state model whose phases group the design dimensions in chronological order.
---

The technique is presented **chronologically**: the phases below follow one interaction from rest to release. Each phase is governed by a small set of design dimensions (detailed in [Table 1](/freegrab-docs/design-space/dimensions/)); the phase structure is what stays constant while the dimensions vary.

## State model

```text
            gaze roams freely; cursor is a GAZE PROXY (invisible)
                 ┌──────────────────────────────────────┐
                 │              P0  LATENT              │◄────────────────┐
                 └──────┬────────────────────┬──────────┘                 │
              coarse    │                    │  intentful hand motion     │
              pinch     │                    │  (P2: engagement)          │
                 ┌──────▼──────┐      ┌──────▼──────────────────────┐     │
                 │ P7 COARSE   │      │        P3–P6  REFINED       │     │
                 │ COMMIT      │      │  cursor materialized at the │     │
                 │ object-grain│      │  gaze hit, hand-driven,     │     │
                 │ only (D0.2) │      │  bounded by the target      │     │
                 └──────┬──────┘      └──────┬───────────────┬──────┘     │
                        │              pinch │               │ P9         │
                        │                    │               │ disengage  │
                        │             ┌──────▼──────┐        │ (policy +  │
                        │             │ P7 REFINED  │        │ suppress)  │
                        │             │ COMMIT      │        │            │
                        │             │ any grain   │        │            │
                        │             └──────┬──────┘        │            │
                        │       release =    │               │            │
                        │       task boundary│               │            │
                        └───────────────►────┴────────►──────┴────────────┘
```

Two properties of this model carry the coexistence claim:

- **The latent cursor is a proxy, not an effector.** While latent it tracks the live gaze hit, so a coarse pinch commits *what the eye sees* — this is what makes plain gaze+pinch fully functional inside FreeGrab (buttons click, objects grab). It holds no stale hand-relative state.
- **The branch is asymmetric by grain.** A coarse pinch may only commit *object-grain* selections; sub-gaze-accuracy selections (mesh features, resize regions) require the refined cursor. *Selection grain must match input precision.*

## Phases

| Phase | Name | What happens | Dimensions |
|---|---|---|---|
| **P0** | Latent | Hand at rest; gaze pre-selects; the invisible cursor rides the gaze hit | D0.1–D0.2 |
| **P1** | Pre-selection | Gaze acquires a target; feedback (outline) shows what a pinch would act on; overlaps disambiguated | D1.1–D1.3 |
| **P2** | Engagement | The branch: coarse pinch commits now, or intentful hand motion materializes the cursor | D2.1–D2.2 |
| **P3** | Instantiation | The cursor appears — where (locus) and as what (representation) | D3.1–D3.3 |
| **P4** | Refinement motion | Hand motion drives the cursor: gain, mapping, border behaviour | D4.1–D4.3 |
| **P5** | Containment & structure | Target bounds catch the cursor; boundary profiles, strain, scopes, capture | D5.1–D5.4 |
| **P6** | Resolution | What is selected under the cursor: candidates, snapping, region partition | D6.1–D6.3 |
| **P7** | Commit & manipulation | The pinch's meaning; extra DOF channels during the hold; hands | D7.1–D7.4 |
| **P8** | Sustained modes | Explicit refinement contexts that outlive single actions: locks, summoned panels | D8.1–D8.3 |
| **P9** | Disengagement | How refinement returns to latent; what suppresses that; where the next engagement lands | D9.1–D9.2 |

Phases P5 and P8 are where FreeGrab diverges most from a plain cursor: the boundary is not a limitation but the **primary interactive structure** — walls to throw against, membranes to push through, detents to step across, layers to descend into.
