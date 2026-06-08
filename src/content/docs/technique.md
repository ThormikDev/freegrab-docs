---
title: The Technique
description: The conceptual model of FreeGrab — gazeable targets, the gaze + manual-refinement loop, and the separation of technique, content, and application.
---

This page describes *what FreeGrab is* at the conceptual level — deliberately independent of the current code structure. The detailed code architecture is **intentionally deferred** until the implementation stabilizes after the in-progress refactor (see [Changelog](/freegrab-docs/changelog/)); diagrams of a moving codebase have low communicative value.

## The paradigm: gaze + manual refinement

Eye gaze is **fast but coarse** — excellent for saying *which* thing among many, poor at saying *exactly where* or *exactly how much*. The hand is **slow but precise** — poor for long transport, excellent for fine, proportional control. State-of-the-art XR input (Gaze+Pinch) uses gaze to point and a pinch to click, but discards the hand's spatial precision.

FreeGrab's paradigm is to **keep both channels and let each do what it is good at**:

- **Gaze acquires** the target (coarse, discrete).
- **The hand refines** within that target (precise, proportional, with control–display gain).
- **A pinch commits** the action.

Refinement is *latent*: if the user just looks and pinches, the technique behaves exactly like Gaze+Pinch. A cursor only materializes when the user starts moving their hand — signalling intent for precision. This **coexistence** is a hard requirement, not a convenience: the familiar baseline must always work.

## Gazeable targets

A **gazeable target** is anything the user can look at and act on: a 3D object, a UI panel, a slider, a stacked set of layers. A target is responsible for three things, and *only* a target knows them:

- **Its bounds and geometry** — where the cursor is allowed to live, and in how many dimensions.
- **Its candidates** — the selectable features the cursor can snap to (a vertex, an edge, a button, a track, a region).
- **How a commit changes it** — deforming a mesh, clicking a button, setting a slider value.

The technique itself knows none of this. It asks the target.

## Separation of technique, content, and application

The single most important architectural idea: **the technique steers the cursor; the content provides the targets and candidates; the application consumes the commits.** These are distinct concerns with clean contracts between them.

| Concern | Owns | Does *not* own |
|---|---|---|
| **Technique** (FreeGrab) | Gaze acquisition, cursor steering, control–display gain, snapping, the latent-cursor lifecycle, pinch routing. | Anything about *what* the target is or *what* a commit means. |
| **Content** (target + candidate provider) | Target bounds/geometry, the set of selectable candidates, how a commit mutates the target. | How the cursor is steered or when it appears. |
| **Application** | The task and its meaning — a modeling tool, a settings panel, a slide editor. | The mechanics of pointing and refinement. |

This separation is what lets one technique drive many applications. The test of generalization is concrete: porting from a 3D mesh to a 2D panel required **no change to the technique** — only a different content provider.

## Why this matters for the research

Because the technique is decoupled from the content, the research question becomes tractable and general:

> **Given gaze for coarse acquisition and the hand for fine refinement, what is the full space of things we can do across target geometries — and which design choices make each work?**

Every application — mesh modeling, 1D/2D/2.5D/3D UI navigation — is an *instantiation* of choices within that space, not a bespoke system. The [Design Space](/freegrab-docs/design-space/) lays out those choices; the [Application Examples](/freegrab-docs/application-examples/) show instantiations of them.
