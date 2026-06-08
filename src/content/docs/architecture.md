---
title: Architecture
description: The FreeGrab technique model, contracts, and execution pipeline.
---

> 🚧 To be migrated from the main repo's existing documentation set
> (`Assets/Scripts/FreeGrab/Documentation/` — eight Mermaid-Markdown documents).

The migration brings these in as Starlight pages (the diagrams already use Mermaid and render natively):

| Source doc | Becomes |
|---|---|
| `07-architecture-overview.md` | Architecture → Overview (component graph, per-frame sequence) |
| `01-interaction-state-machine.md` | Architecture → Interaction state machine |
| `02-target-selection-pipeline.md` | Architecture → Target selection pipeline |
| `03-snapping-and-intent.md` | Architecture → Snapping & intent prediction |
| `04-cd-gain-system.md` | Architecture → CD-gain / transfer functions |
| `05-cursor-visualization.md` | Architecture → Cursor visualization |
| `06-bimanual-interaction.md` | Architecture → Bimanual interaction |
| `08-pseudocode.md` | Reference → Key algorithm pseudocode |

## The load-bearing pattern

Every interactable GameObject carries a triad:

- **`FreeGrabTarget`** — owns bounds, the local-cursor constraint, and hover/active feedback.
- **`IFreeGrabSelectionProvider`** (Phase 1; today `IFreeGrabPointOfInterestProvider`) — *content* declares its selectable candidates.
- **`IFreeGrabEditable`** — *content* declares how a commit mutates it.

The interactor neither knows nor cares whether it points at a Moravian star, a UGUI panel, or a Meta `PointableCanvas`. Porting from 3D to 2D required zero interactor changes — the generalization test the architecture is built to pass.

A note on the in-flight refactor (see the main repo's `ROADMAP-V2.md`): the technique is being decomposed from a single ~1900-line interactor into focused subsystems (selection router, cursor refinement, pinch steering, snap resolver, free-transform session, cursor-visual authority) around a new geometry-agnostic selection contract. This page will track that structure as it lands.
