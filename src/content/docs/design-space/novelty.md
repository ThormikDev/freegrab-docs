---
title: Novelty Ledger
description: What is claimable as a contribution, what is a technique built on top, and what is engineering — kept honest before any submission.
---

Everything in the project falls into one of three classes. The distinction decides what a paper can *claim*, what it *demonstrates*, and what it merely *needed to build*. This ledger is drafted by the working session and reviewed by the researcher; contested rows are marked.

## C — Core technique claims

The contributions that define FreeGrab itself. Each is a principle + mechanism pair, grounded in a recorded finding.

| Claim | One-line statement | Grounding |
|---|---|---|
| **Coexistence-additive refinement** | The latent cursor is a gaze proxy, not an effector: plain gaze+pinch stays byte-identical in behaviour, refinement only adds. | The paradigm axioms; every "Yes — identical" row in Table 2 |
| **Asymmetric engagement** | Engage on intentful displacement, never disengage during the corrective phase; a completed pinch is a task boundary that returns to gaze instantly. | Two-component model of aiming; ✗ speed-threshold and ✗ any-stillness findings |
| **Selection-grain gating** | A commit's allowed selection grain must match the precision of the input that placed it: coarse pinch = object grain; refined = any grain. | The face-stretch-instead-of-grab finding |
| **Position is clutched, pressure is strain** | Containment bounds behave like a mouse at the screen edge (no travel debt), while the discarded push becomes a first-class *strain* channel driving membranes, detents, and depth gestures. | ✗ absolute-offset "ghost debt" finding |
| **The boundary is the interface** | Hard walls (visual = interaction boundary), membranes (sustained pressure crosses deliberately), and detents (displacement steps discretely) form a small grammar of boundary profiles; picking the right profile per boundary is a design decision with recorded selection rules. | ✗ rubber-band-on-walls finding; time-vs-displacement lesson |

## T — Novel techniques built on the core

Interaction techniques that are claimable *demonstrations* — each could carry its own figure in a paper, and each is only possible because the core exists.

| Technique | What it is | Status |
|---|---|---|
| **Throw-to-region manipulation** | Gaze scopes a shape; the hard-clamped cursor is *thrown* at a corner that cannot be missed (per-object edge pointing); regions replace handles entirely. | ● built, throw validated after hard-wall fix |
| **Quadrant depth-marking menu** | A marking menu whose stroke is in depth: full-surface 2×2 quadrant layers, content of the next layer depends on the chosen quadrant. | ● built |
| **Pull-to-place** | Pinch a menu leaf item and pull it back through the dissolving layers onto the content — menu selection and coarse placement in one gesture. | ● built |
| **Depth-layered continuous color picker** | XY = hue/saturation on a panel, hand depth = brightness layer (deeper = darker); live preview, pinch commits. A continuous 3-DOF pick. | ● built |
| **Exploded z-order** | While depth-reordering, the 2D overlap stack fans out into real depth and re-flattens on release — z made visible in z, for coarse and refined grabs alike. | ● built |
| **Cascading depth menus** | Submenus unfold one layer deeper when pushed into over a parent item; pull back collapses. | ✓ validated |
| **Ratchet widget stepping** | One deliberate push past a widget's edge steps exactly one widget in the pushed grid direction. | ● built (v2 after ✗ pressure-pop v1) |
| **Scope membrane + lock pair** | Soft push-through descend/ascend with an explicit gaze-decoupling lock as its complement. | ✓ validated (3D) |

## E — Engineering (necessary, not claimable)

The machinery that makes the above run. Listed so it is never accidentally presented as novelty.

- The selection contract implementation (providers, candidates, adapters, ranking spine) — *the contract-first framing is at most a minor systems note.*
- UGUI world-space backends: widget/shape providers, commit editables, bootstraps, shape factory, highlighters.
- Mode/condition coordinators (exclusive constraint sets, A/B switchers), refresh plumbing, self-guarding conventions.
- Runtime-generated sprites/textures (circle, star, checker, grid), demo scenes, editor bridge tooling.
- Open-palm posture detection (distance heuristic) — the *gesture grammar* that uses it is claimable (D8.2); the detector is not.

## Contested / to review

- **Commit-as-strategy** (content defines the pinch's meaning): C-claim or E? Drafted as *E with a systems note*; arguably a C-claim about where commit semantics should live.
- **Flat strain-ring cursor**: representation engineering, or part of the strain C-claim? Drafted as the *display half* of "position clutched, pressure strain".
- **Gaze+lock as "parking"**: subsumed under coexistence, or its own claim? Drafted under C-coexistence.
