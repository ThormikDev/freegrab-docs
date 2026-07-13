---
title: Parameters Appendix
description: The knobs inside each dimension value — component, field, default, meaning. The tuning surface, kept out of the main tables.
---

Every serialized parameter, grouped by the [dimension](/freegrab-docs/design-space/dimensions/) it tunes. Units: world metres unless noted; *canvas units* on UI targets are millimetres at the standard 0.001 canvas scale. Defaults are the current inspector values; the consolidated **tuning backlog** (one headset session across all of these) lives in the repo plan doc.

## D2.1 / D9.1 — Engagement & disengagement (`FreeGrabHandLatencyController`)

| Field | Default | Meaning |
|---|---|---|
| `_engageDisplacement` | 0.020 m | Reach distance from the resting home that materializes the cursor |
| `_stillSpeed` | 0.030 m/s | Below this, the hand counts as still (dwell accrues; home follows) |
| `_disengageDwellSeconds` | 0.70 s | Sustained stillness that returns to latent (DwellOnly/Hybrid) |
| `_speedSmoothing` | 0.35 | Exponential smoothing on the speed classifier |
| `_disengagePolicy` | Hybrid | DwellOnly · PinchBoundary · Hybrid (runtime-switchable) |

## D4 — Motion mapping (`FreeGrabInteractor`)

| Field | Default | Meaning |
|---|---|---|
| `_hoverNavigationGain` | 0.50 | CD gain while hovering (refining, unpinched) |
| `_pinchNavigationGain` | (inspector) | CD gain during a pinch-drag |
| `_strainDrainEpsilon` | 0.0005 m/frame | Opposing motion beyond this drops that strain axis instantly (border clutch) |

## D5.1 — Boundary profiles

**Shape capture / escape membrane (`FreeGrabUiShapeCapture`)**

| Field | Default | Meaning |
|---|---|---|
| `_escapeEnabled` | true | Sustained wall push may pop the cursor onto the canvas |
| `_escapeSeconds` | 0.5 s | Held push duration to pop (throw transients never charge it) |
| `_escapeMinPush` | 8 cu | Raw push past the wall before escape intent counts |
| `_recaptureBlock` | 0.25 s | After a pop, the escaped shape cannot immediately re-catch the cursor |

**Widget ratchet detent (`FreeGrabUiWidgetMembrane`)**

| Field | Default | Meaning |
|---|---|---|
| `_stepPush` | 16 cu | Displacement past the edge that fires one step |
| `_rearmPush` | 6 cu | Relax back within this to re-arm (one push = one step) |
| `_maxStretch` | 22 cu | Visual rubber-band before the pop (membrane contexts only) |
| `_minAxisAlignment` | 0.8 | Cos-angle gate: only true row/column neighbours step (no diagonals) |
| `_hopCooldown` | 0.06 s | Same-motion double-fire floor |

**Layer detent (`FreeGrabUiLayerConstraint`)**

| Field | Default | Meaning |
|---|---|---|
| `_detentHardness` | 1.0 | 0 = soft gain-valley … 1 = hard snap to the active layer plane |

## D3.2 / D5.4 — Cursor representation & strain display (`FreeGrabCursorVisualizer`, `FreeGrabUiShapeFeedback`)

| Field | Default | Meaning |
|---|---|---|
| `_cursorScale` | 0.02 m | Sphere radius / flat-ring base size |
| `_flatCursorRadiusMultiplier` | 1.35 | Flat ring radius relative to sphere scale |
| `_flatCursorThickness` | 0.22 | Disc thickness as a fraction of radius |
| `_strainForFullStretch` | 0.08 m | Strain magnitude at 100% ring stretch |
| `_strainLeanMax` | 0.008 m | Max positional lean of the ring along the strain |
| `_glyphSize` | 22 cu | Region-glyph size on shapes |
| `_pushForFullPulse` | 40 cu | Wall push at which the glyph pulse saturates |

## D6.3 — Region partition (`FreeGrabUiShape`)

| Field | Default | Meaning |
|---|---|---|
| `_handleBand` | 0.30 | Fraction of width/height per corner/edge band (centre 40% moves) |
| `_minSize` | 40 cu | Resize floor |

## D7.3 — Extra DOF channels (`FreeGrabUiShapeManipulator`, `FreeGrabUiShapeExplodedView`)

| Field | Default | Meaning |
|---|---|---|
| `_zStep` | 40 cu | Depth travel per z-order detent step |
| `_rollDeadbandDegrees` | 10° | Wrist roll ignored before rotation engages |
| `_reorderViewActivation` | 14 cu | Depth travel that engages the exploded view (sticky until release) |
| `_levelStep` (exploded) | 18 cu | Depth between stack levels while exploded |
| `_easeSpeed` (exploded) | 10 /s | Ease rate to exploded/flat depth |

## D8.2 / D8.3 — Panels (`FreeGrabUiQuadrantMenu`, `FreeGrabUiShapeColorPicker`, `FreeGrabHandInput`)

| Field | Default | Meaning |
|---|---|---|
| `_summonOnOpenPalm` / `_summonOnDepthPress` | true / true | Enumerated summon gestures (independently toggleable) |
| `_openPalmSeconds` | 0.30 s | Open-palm hold to summon |
| `_openPalmFingerDistance` | 0.13 m | Fingertip-to-wrist distance counting as extended |
| `_summonPush` / `_releaseBelow` | 32 / 12 cu | Depth press-release thresholds (menu & picker) |
| `_cancelPull` (picker) | 24 cu | Pull-back past the plane that cancels |
| `_firstLayerZ` / `_layerStep` (menu) | 60 / 60 cu | Quadrant layer depths |
| `_descendPush` / `_ascendPull` (menu) | 26 / 26 cu | Layer walk thresholds |
| `_firstLayerZ` / `_layerStep` (picker) | 40 / 40 cu | Brightness layer depths |
| `_layerValues` (picker) | 1.0 / 0.65 / 0.35 | HSV value per brightness layer (deeper = darker) |
| `_layerSwitchCooldown` (picker) | 0.12 s | Between brightness-layer switches |
| `_parentAlpha` / `_placingAlpha` (menu) | 0.25 / 0.25 | Root-layer alpha behind leaf; menu alpha during pull-to-place |

## D7.1 — Pinch detection (`FreeGrabHandInput`)

| Field | Default | Meaning |
|---|---|---|
| `_pinchEnterStrength` / `_pinchExitStrength` | 0.70 / 0.55 | Hysteresis pair on pinch strength |
| `_pinchFinger` / `_secondaryPinchFinger` | Index / Middle | Primary commit vs scope/lock channel |

## D6.2 — Snapping (`FreeGrabInteractor` presets)

| Field | Default | Meaning |
|---|---|---|
| `_snappingBehaviorPreset` | Balanced | Precise · Balanced · Sticky · Custom (drives vertex/edge/face thresholds + intent-gating knobs) |
| Cascade (`FreeGrabUiCascadeMenu`) | 40 / 24 / 24 cu, 0.25 s | `_levelDepthStep`, `_descendThreshold`, `_ascendThreshold`, `_transitionCooldown` |
