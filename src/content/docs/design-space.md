---
title: "Design Space: Overview"
description: How the FreeGrab design space is structured — layers, dimensions, contexts, and evidence codes.
---

This section is the project's central research artifact: a systematic survey of the design space of **gaze-instantiated, object-bounded cursor refinement** — the space FreeGrab occupies. It is structured so a reader can tell apart, at a glance, five things that are easy to conflate:

| Layer | What it is | Where it lives |
|---|---|---|
| **Paradigm** | The claim: refinement *coexists additively* with gaze+pinch — every coarse path stays fully useful; refinement only adds. | [Home page axioms](/freegrab-docs/) |
| **Technique** | The inherent interaction pipeline that exists regardless of content: latent gaze proxy → engagement → bounded refinement → commit → disengage. | [The Pipeline](/freegrab-docs/design-space/pipeline/) |
| **Design dimensions** | Enumerable choices at each pipeline phase (e.g. *disengage policy*, *boundary profile*, *placement locus*). Each dimension has **values**; values have **parameters** (knobs). | [Dimensions — Table 1](/freegrab-docs/design-space/dimensions/) |
| **Contexts** | The content classes the technique is applied to (1D span → 3D hierarchy). Contexts are **not** dimensions of the technique — they are the columns the technique's value is measured against. | [Value Matrix — Table 2](/freegrab-docs/design-space/value-matrix/) |
| **Applications** | Demonstrators that instantiate the space. Some are novel techniques in their own right; others are engineering. The distinction is made explicit. | [Novelty Ledger](/freegrab-docs/design-space/novelty/) |

## How to read the tables

Every dimension **value** carries an evidence code:

| Code | Meaning |
|---|---|
| ✓ | **Validated** — headset-tested by the researcher (expert first-use, N=1) and kept |
| ● | **Built** — implemented and compiling, awaiting headset validation |
| ○ | **Conceived** — designed and recorded in the backlog, not yet implemented |
| ✗ | **Rejected** — implemented, tested, and rejected *with a recorded finding* (negative results are results) |

**Defaults are bold.** Parameters (the knobs inside a value) are deliberately kept out of the main tables — they live in the [Parameters Appendix](/freegrab-docs/design-space/parameters/), one table per dimension.

## Independence structure

Three separations keep the space surveyable:

1. **Dimensions × contexts.** The technique's dimensions (Table 1) are surveyed once; their *payoff* is assessed per context (Table 2). A dimension is the same machine everywhere — the project's central architectural thesis ("the same machine across geometries").
2. **Unimanual first; bimanual as a marked open subspace.** Bimanual coordination appears as one dimension value (D7.4) with its own unexplored interior; the survey does not double every table for a region without evidence.
3. **Base case vs. structured content.** Flat targets are the base case; *hierarchies* (sub-objects, scopes) and *layered/stacked content* (2.5D) are contexts, entered through one dimension (scope structure, D5.2) rather than distributed through every phase.

## The honest evidence caveat

All ✓ marks currently mean *expert first-use by the researcher over Quest Link* — rapid formative iteration, not a controlled study. The matrix is the map of **what to study**. Per-cell claims marked "gaze+pinch structurally cannot" are analytic (2-DOF input has no channel for them); claims of *superiority* on shared capabilities (e.g. detent stepping vs. free pointing) are explicitly open questions.
