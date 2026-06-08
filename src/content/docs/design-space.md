---
title: Design Space
description: The eight design axes and four demonstrator contexts framing the FreeGrab exploration.
---

# Design Space

> 🚧 To be migrated from the main repo's `Assets/Scripts/FreeGrab/Documentation/canvas-2d/00-design-space.md`.

FreeGrab is, fundamentally, **an indirection technique that adds hand transport and hand–eye coordination as first-class citizens to the gaze-assisted indirection paradigm**. The exploration asks: *what does the paradigm look like when the steered cursor lives on a 2D, 2.5D, layered, or 1D target — and what design choices does that force?*

## Eight design axes

| Axis | Concern |
|---|---|
| **D1** | Target geometry (3D volume, 2D planar, 2.5D layered, 2.5D bas-relief, 1D track) |
| **D2** | Input-to-cursor mapping (project / constrained fusion / dimensional reassignment / mode partition) |
| **D3** | Reference-frame anchoring (world / head / object / hand-anchored) |
| **D4** | Engagement & disengagement (clutch) |
| **D5** | Cursor instantiation locus |
| **D6** | Selection / commit semantics |
| **D7** | Hover, snap, and disambiguation |
| **D8** | CD-gain regime |

## Four demonstrator contexts

| Context | Geometry | Why it matters |
|---|---|---|
| **C1** | Flat 2D menu | FreeGrab in its weakest 2D configuration — baseline vs Gaze+Pinch |
| **C2** | 2.5D layered menu | Depth DOF picks the layer — where FreeGrab plausibly *beats* Gaze+Pinch |
| **C3** | 2.5D bas-relief | Precision on a non-planar but locally-2D surface; reuses the surface-constraint path |
| **C4** | 1D slider | Stresses dimensional reassignment hardest |

The full axis-by-axis treatment (3D baseline behavior, the 2D/2.5D question each axis raises, what transfers, what needs a study) is in the source document pending migration.
