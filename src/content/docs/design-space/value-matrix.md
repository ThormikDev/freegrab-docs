---
title: "Value Matrix (Table 2)"
description: What refinement adds over gaze+pinch, per capability and per content context — with the baseline comparison made explicit in every row.
---

The payoff table: each row is a **capability**, assessed against the contexts it applies to, with the mechanism that provides it and — the honest column — **whether plain gaze+pinch can do it**. "Structurally no" means 2-DOF gaze+pinch has no input channel for it (analytic claim); "poorly" means it can but below the precision or fluency threshold (empirical claim, to be studied).

**Contexts:** ①  1D span (slider/track) · ② 2D widgets (menus, buttons) · ③ 2D freeform canvas (slide shapes) · ④ 2.5D layered/stacked · ⑤ 3D surface (deformable mesh) · ⑥ 3D composite hierarchy.

| Capability | Contexts | Mechanism (dimension) | Gaze+pinch alone? | Evidence |
|---|---|---|---|---|
| Acquire & activate a large target (button, object) | ①–⑥ | Gaze proxy + coarse pinch (D0.1, D7.1) | **Yes — identical.** FreeGrab adds nothing here *by design* (coexistence). | ✓ |
| Grab & move a whole object | ③⑤⑥ | Coarse pinch = grab (D0.2, D7.2) | **Yes — identical.** | ✓ |
| Select **below gaze accuracy** (vertex/edge/face; dense/small widgets) | ②⑤⑥ | Refined cursor + snap (D2.1, D6.2) | **No** — sub-1° targets are below tracker accuracy. *The founding capability.* | ✓ |
| Set an **absolute** value at a point (slider "click") | ① | Refined commit = absolute; coarse = relative drag (D7.2) | Poorly — coarse gaze picks the track, not the value. | ✓ |
| Step discretely between siblings (menu grid) | ② | Ratchet detent membrane (D5.1) | Yes (re-gaze each item) — **whether stepping beats re-gazing is an open study question.** | ● |
| Resize/stretch **without acquiring a handle** (throw-to-region) | ③ | Capture + hard wall + region partition (D5.1, D6.3) | **No** — the desktop model needs select → reveal → acquire a sub-accuracy handle. | ● |
| Enter/escape a scope deliberately (shape ↔ canvas, part ↔ whole) | ③⑥ | Asymmetric membrane: free entry, sustained-push escape (D5.1, D5.3) | Structurally no — no second channel to distinguish *leave* from *move*. | ✓ (3D) ● (2D) |
| Work **gaze-decoupled** (eyes explore, hands keep operating) | ②③⑤⑥ | Lock (D8.1) | **Structurally no** — gaze is the pointer. | ✓ |
| Pick the active **layer** in stacked content | ④ | Depth detent (D5.1, hysteresis variant) | **Structurally no** — no depth channel. | ✓ |
| Walk a **cascading menu** in depth | ④ | Cascade descend-over-item (D8.3) | Structurally no. | ✓ |
| Reorder **z-order** while seeing the stack | ③④ | Depth ratchet during hold + exploded view (D7.3) | Structurally no (and desktop hides the stack). | ● |
| **Continuous 3-DOF pick** (hue × saturation × brightness) | ③④ | XY on layer + depth between layers (D7.3, D8.3) | **Structurally no** — a 2-DOF pick plus mode switches at best. | ● |
| Rotate without a widget | ③ | Wrist roll during hold (D7.3) | Structurally no (no orientation channel). | ● |
| **Menu selection flowing into placement** (pull-to-place) | ③④ | Grab leaf item, pull back through dissolving layers, release places (D8.3 + D7.2) | **No** — discrete menu + pointer requires select, dismiss, re-acquire, place. | ● |
| Summon a tool panel **where you are working** | ③ | Open palm / depth press at cursor (D8.2) | Poorly — toolbar round-trips move gaze and pointer away. | ● |
| Access content **behind** the current surface | ③④ | Depth press through the plane (D8.2) | Structurally no. | ● |
| Deform a mesh feature directly | ⑤ | Refined cursor + feature snap + pinch-drag (D6.2, D7.2) | No (below accuracy; and coarse pinch is reserved for grab by D0.2). | ✓ |
| Bimanual scale/stretch of a part | ⑥ | Two cursors on one scope (D7.4) | Partially (two-hand gaze+pinch exists) — **open subspace.** | ✓ (3D base) |

## Reading the claims

- Rows where the answer is **"Yes — identical"** are the coexistence proof: FreeGrab must never regress them. They are the control conditions of any study.
- Rows marked **structurally no** are the technique's safe novelty territory: the comparison is against *augmented* baselines (gaze+pinch + mode switches / widgets), not against nothing.
- Rows marked **poorly / open question** are where honest studies live — most sharply the **stepping vs re-gazing** question (②) and **summon-at-hand vs toolbar** (③).
