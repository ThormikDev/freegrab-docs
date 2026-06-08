---
title: Application Examples
description: Short video demonstrations of FreeGrab across target geometries.
---

Each demonstrator is a small, captioned video clip showing FreeGrab on a different target geometry. Clips live in `public/videos/` (committed, compressed). This page becomes a gallery of the technique "in the wild."

> 🚧 Clips not yet recorded. The structure below is the intended layout; each entry gets a `<video>` embed once footage exists.

---

## 3D volume — Moravian star deformation

The original baseline: gaze selects the star, a hand-steered cursor snaps to vertices / edges / faces, and pinch deforms the mesh. Bimanual symmetric scaling and asymmetric stretching included.

*Video: TODO.*

## 2D panel — gaze+pinch with cursor refinement

A world-space UGUI panel. Pure Gaze+Pinch activates widgets directly; when the hand moves, a co-planar cursor materializes for precise widget acquisition on dense layouts.

*Video: TODO.*

## 1D track — slider

The slider as a single `Edge`-flavored target: the cursor slides along the track, the handle follows, pinch commits the value. Stresses dimensional reassignment of the redundant DOFs.

*Video: TODO.*

## 2.5D layered — where FreeGrab earns its keep

Stacked panels at different depths; the depth DOF picks the active layer — something a 2-DOF Gaze+Pinch pointer cannot natively express. The central comparison of the design-space study.

*Video: TODO.*

## Slide editor (planned demonstrator)

The integrative demonstrator: move / resize / rotate elements via implicit edge-and-corner zones, bimanual close-pinch creation, magnetic guides, and membrane escape — all in a domain everyone recognizes.

*Video: TODO.*
