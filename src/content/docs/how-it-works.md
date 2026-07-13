---
title: How It Works
description: The FreeGrab interaction, step by step — explained without jargon, with the design choices unfolding on demand.
---

<style>
.fg-frame { max-width: 72ch; }
.fg-frame p { margin: 0.6rem 0; }
.fg-flow { display: flex; flex-direction: column; align-items: stretch; gap: 0; margin: 1.5rem 0; max-width: 620px; }
.fg-box {
  border: 1px solid var(--sl-color-gray-4); border-radius: 10px;
  background: var(--sl-color-gray-7, var(--sl-color-black));
  padding: 0.7rem 1rem; text-align: center;
}
.fg-box .fg-step {
  display: inline-block; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.06em;
  color: var(--sl-color-accent-high); text-transform: uppercase; margin-bottom: 0.15rem;
}
.fg-box .fg-title { font-weight: 650; }
.fg-box .fg-plain { font-size: 0.85rem; color: var(--sl-color-gray-2); margin-top: 0.1rem; }
.fg-arrow { text-align: center; color: var(--sl-color-gray-3); font-size: 1.1rem; line-height: 1.6; }
.fg-branch { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; }
.fg-branch-col { display: flex; flex-direction: column; }
.fg-branch-label {
  text-align: center; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em;
  text-transform: uppercase; color: var(--sl-color-gray-3); padding: 0.25rem 0;
}
.fg-loop { text-align: center; font-size: 0.8rem; color: var(--sl-color-gray-3); font-style: italic; margin-top: 0.2rem; }
.fg-a .fg-box { border-color: var(--sl-color-gray-3); }
.fg-b .fg-box { border-color: var(--sl-color-accent); }

.fg-rows { margin: 1.2rem 0; border: 1px solid var(--sl-color-gray-5); border-radius: 10px; overflow: hidden; }
.fg-rows details { border-bottom: 1px solid var(--sl-color-gray-5); margin: 0 !important; }
.fg-rows details:last-child { border-bottom: none; }
.fg-rows summary {
  cursor: pointer; list-style: none; display: grid;
  grid-template-columns: 3.2rem 1fr auto; gap: 0.8rem; align-items: baseline;
  padding: 0.75rem 1rem;
}
.fg-rows summary::-webkit-details-marker { display: none; }
.fg-rows summary:hover { background: var(--sl-color-gray-6); }
.fg-rows .fg-chip {
  font-size: 0.72rem; font-weight: 700; color: var(--sl-color-accent-high);
  letter-spacing: 0.05em;
}
.fg-rows .fg-sum b { font-weight: 650; }
.fg-rows .fg-sum span { color: var(--sl-color-gray-2); font-size: 0.9rem; }
.fg-rows .fg-open { color: var(--sl-color-gray-3); font-size: 0.8rem; }
.fg-rows details[open] .fg-open::before { content: "close"; }
.fg-rows details:not([open]) .fg-open::before { content: "unfold"; }
.fg-rows .fg-body { padding: 0.2rem 1rem 1rem 4.9rem; font-size: 0.92rem; }
.fg-rows .fg-body p { margin: 0.5rem 0; }
.fg-rows .fg-q { font-weight: 650; margin-top: 0.8rem; }
.fg-rows .fg-body ul { margin: 0.3rem 0 0.3rem 0; padding-left: 1.1rem; }
.fg-rows .fg-body li { margin: 0.2rem 0; }
.fg-rows .fg-chose { color: var(--sl-color-accent-high); font-weight: 650; }
@media (max-width: 640px) { .fg-branch { grid-template-columns: 1fr; } .fg-rows .fg-body { padding-left: 1rem; } }
</style>

<div class="fg-frame">

Two ways of pointing dominate computing. **Look-and-pinch** (as in Apple Vision Pro): your eyes choose, a finger-pinch confirms. It is fast and effortless — but the eyes are not precise, so everything on screen must be built big, and the whole interface ends up designed *around* the eyes' limits. **The mouse cursor**: slow to get somewhere, but wonderfully precise and steady, and it never falls off the screen. In headsets, nothing currently plays the mouse's role — pointing a hand-ray at things is shaky at distance and tiring.

**FreeGrab asks: is there a happy middle?** Keep looking-and-pinching exactly as it is — and *only when you need precision*, let a small cursor appear right where you're looking, working like a mouse cursor that lives on the thing you're pointing at. When you're done, it gets out of the way.

This page walks through one interaction, start to finish, for the simplest case: **one hand, one simple object** (a button, a slider, a shape on a whiteboard). Every step can be unfolded to see the design question behind it and what we chose. (Two-handed use and objects-with-parts are separate chapters, built on the same steps.)

</div>

## The flow

<div class="fg-flow">
  <div class="fg-box"><span class="fg-step">Step 1</span><div class="fg-title">Look around</div><div class="fg-plain">Whatever you look at gently highlights. Nothing else happens.</div></div>
  <div class="fg-arrow">↓</div>
  <div class="fg-branch">
    <div class="fg-branch-col fg-a">
      <div class="fg-branch-label">It's a simple action…</div>
      <div class="fg-box"><span class="fg-step">Step 2a</span><div class="fg-title">Pinch</div><div class="fg-plain">Acts on the whole thing you're looking at — click it, grab it, drag it.</div></div>
    </div>
    <div class="fg-branch-col fg-b">
      <div class="fg-branch-label">…or you need precision</div>
      <div class="fg-box"><span class="fg-step">Step 2b</span><div class="fg-title">Move your hand</div><div class="fg-plain">A small cursor appears exactly where you're looking.</div></div>
      <div class="fg-arrow">↓</div>
      <div class="fg-box"><span class="fg-step">Step 3</span><div class="fg-title">Steer, like a mouse</div><div class="fg-plain">The cursor rides the object and cannot fall off its edges.</div></div>
      <div class="fg-arrow">↓</div>
      <div class="fg-box"><span class="fg-step">Step 4</span><div class="fg-title">Pinch precisely</div><div class="fg-plain">Acts on exactly what the cursor touches; hold and move to adjust.</div></div>
    </div>
  </div>
  <div class="fg-arrow">↓</div>
  <div class="fg-box"><span class="fg-step">Step 5</span><div class="fg-title">Let go</div><div class="fg-plain">The cursor steps aside. You're just looking again.</div></div>
  <div class="fg-loop">…and back to Step 1.</div>
</div>

## Each step, unfolded

Click any row for the design question underneath it. <span class="fg-chose">Green</span> marks what FreeGrab currently chooses.

<div class="fg-rows">

<details>
<summary><span class="fg-chip">STEP 1</span><span class="fg-sum"><b>Look around</b> — your eyes do the traveling; the thing you look at highlights.</span><span class="fg-open"></span></summary>
<div class="fg-body">
<p>The eyes reach anything in view in a fraction of a second, with no arm effort. FreeGrab uses that as the <em>first half</em> of every action: looking chooses the object. This is identical to plain look-and-pinch — deliberately, so nothing a user already knows changes.</p>
<p class="fg-q">When you pinch, which moment of looking counts?</p>
<ul>
<li><span class="fg-chose">A split-second earlier than the pinch</span> — the eyes naturally move on before the fingers close, so the system remembers where you <em>were</em> looking.</li>
<li>The exact pinch moment — misses the target surprisingly often.</li>
</ul>
</div>
</details>

<details>
<summary><span class="fg-chip">STEP 2a</span><span class="fg-sum"><b>Pinch — the quick path</b> — one pinch acts on the whole thing.</span><span class="fg-open"></span></summary>
<div class="fg-body">
<p>If the action is coarse — press a button, grab a shape and drag it, nudge a slider — looking and pinching is already the fastest tool. FreeGrab leaves this path untouched: it must always work exactly as it would without FreeGrab installed. That is the project's ground rule.</p>
<p class="fg-q">How fine an action may a quick pinch perform?</p>
<ul>
<li><span class="fg-chose">Only "whole thing" actions.</span> A glance is accurate to roughly a thumbnail at arm's length — so a glance-plus-pinch may click a button or grab a shape, but never edit a fine detail. Fine actions are reserved for the cursor. (Before this rule, a quick pinch near an object's surface would sometimes deform it when the user simply meant "grab" — surprising and unwanted.)</li>
<li>Anything the eyes happen to rest on — rejected for exactly that surprise.</li>
</ul>
<p class="fg-q">What does holding the pinch do?</p>
<ul>
<li><span class="fg-chose">Drag, relative to where things are now</span> — like grabbing a physical slider knob: it moves <em>with</em> your hand rather than jumping to where you looked.</li>
</ul>
</div>
</details>

<details>
<summary><span class="fg-chip">STEP 2b</span><span class="fg-sum"><b>Move your hand — the cursor appears</b> — precision on demand, right where you look.</span><span class="fg-open"></span></summary>
<div class="fg-body">
<p>No button, no menu, no mode switch: a deliberate motion of the hand <em>is</em> the request for precision. The cursor materializes at the point you're looking at — so the eyes have already done the traveling, and the hand only does the last few centimetres.</p>
<p class="fg-q">How much hand movement should summon the cursor?</p>
<ul>
<li><span class="fg-chose">A deliberate reach</span> — the hand must travel a couple of centimetres away from where it was resting. Idle fidgeting and tremor stay below this bar, so the cursor never pops up uninvited.</li>
<li>Any movement above a speed limit — rejected: precise aiming is <em>slow</em>, so the cursor kept vanishing mid-aim.</li>
</ul>
<p class="fg-q">Where should it appear?</p>
<ul>
<li><span class="fg-chose">At the point you're looking at</span> — the eyes pre-position it; the hand refines from there.</li>
<li>Where the cursor last was — rejected: after a few actions it ends up somewhere awkward and far.</li>
<li>The centre of the object — a reasonable fallback, not the default.</li>
</ul>
<p class="fg-q">What does it look like?</p>
<ul>
<li><span class="fg-chose">A flat ring on flat things, a small ball on 3D things</span> — the familiar shape-language of pointers, adapted to the surface.</li>
</ul>
</div>
</details>

<details>
<summary><span class="fg-chip">STEP 3</span><span class="fg-sum"><b>Steer, like a mouse</b> — the cursor rides the object and cannot fall off.</span><span class="fg-open"></span></summary>
<div class="fg-body">
<p>This is where the mouse's virtues come in. A mouse cursor is precise for three reasons: it can move <em>slower</em> than your hand (small hand motions become tiny cursor motions), it is steady, and the screen edge stops it — you can slam the mouse sideways and the cursor waits at the edge, instantly ready when you reverse. FreeGrab gives the object's own edges that same role: the object is the cursor's "screen".</p>
<p class="fg-q">How fast should the cursor move relative to the hand?</p>
<ul>
<li><span class="fg-chose">Scaled to how big the object looks</span> — the same hand motion covers a small faraway panel and a large nearby one equally well. (In HCI terms: a control-display gain based on visual angle.)</li>
<li>One-to-one, or fixed slower/faster ratios — kept available for comparison.</li>
</ul>
<p class="fg-q">What happens at the object's edge?</p>
<ul>
<li><span class="fg-chose">Exactly what a screen edge does.</span> Push past it and the extra motion is simply ignored — reverse, and the cursor responds immediately, with no "debt" to pay back. This means you can <em>fling</em> the cursor toward a corner and it lands in the corner, guaranteed — corners become targets you cannot miss.</li>
<li>The cursor drifts a little past the edge — rejected: even a little slack broke that guarantee, and with it the user's trust.</li>
</ul>
<p class="fg-q">Is pressing against the edge wasted effort?</p>
<ul>
<li><span class="fg-chose">No — leaning on an edge is a signal.</span> The ring visibly leans and glows as you press. (In richer scenes this "pressure" is what pushes through to a neighbouring item or out of the object — but that belongs to the later chapters.)</li>
</ul>
</div>
</details>

<details>
<summary><span class="fg-chip">STEP 4</span><span class="fg-sum"><b>Pinch precisely</b> — act on exactly what the cursor touches.</span><span class="fg-open"></span></summary>
<div class="fg-body">
<p>With the cursor placed, the same pinch now means something sharper: not "the whole thing", but "<em>exactly this</em>". Set a slider to a precise value the way a mouse click does. Grab a shape by its corner and resize it. The action's meaning comes from where the cursor is — just as with a mouse.</p>
<p class="fg-q">Should a precise pinch behave differently from a quick pinch?</p>
<ul>
<li><span class="fg-chose">Yes — placement changes meaning.</span> On a slider: a quick pinch drags the knob from where it is (coarse), a cursor pinch sets the value at the cursor (precise). Both feel natural because each matches the precision of what pointed there.</li>
</ul>
<p class="fg-q">And while the pinch is held?</p>
<ul>
<li><span class="fg-chose">Move to adjust, release to confirm</span> — the standard press-drag-release contract, unchanged.</li>
</ul>
</div>
</details>

<details>
<summary><span class="fg-chip">STEP 5</span><span class="fg-sum"><b>Let go</b> — the cursor steps aside on its own.</span><span class="fg-open"></span></summary>
<div class="fg-body">
<p>A mouse cursor can sit idle in a corner because a desktop has room for it. In a headset, a lingering cursor blocks the fast path — while it exists, it (not your gaze) says what a pinch means. So the cursor must know when to leave.</p>
<p class="fg-q">When should the cursor retire?</p>
<ul>
<li><span class="fg-chose">The moment you complete a pinch</span> — finishing an action is a natural full stop. The next look starts fresh, and the next cursor appears wherever you're looking then. (Also with a resting fallback: if you summoned the cursor but never pinched, it retires once your hand has been still for a moment.)</li>
<li>Only after the hand rests — kept as an option; on its own it made users wait awkwardly after every action.</li>
<li>The instant the hand slows down — rejected: it kept vanishing mid-aim.</li>
</ul>
<p class="fg-q">Can I keep it deliberately?</p>
<ul>
<li><span class="fg-chose">Yes — pin it.</span> A second gesture (a middle-finger pinch) pins the cursor to its object, shown in purple. While pinned, you can look anywhere — checking a reference, glancing at a colleague — and your hand keeps working on the same object. A pinned cursor never retires by itself. This is something look-and-pinch fundamentally cannot offer: its eyes <em>are</em> its pointer.</li>
</ul>
</div>
</details>

</div>

## What this buys, in one table

| | Look-and-pinch alone | Mouse / cursor alone | FreeGrab |
|---|---|---|---|
| Getting to a target | instant (eyes) | slow (travel) | **instant (eyes)** |
| Fine precision | no — big targets only | yes | **yes — on demand** |
| Steady, edge-bounded control | no | yes | **yes — the object is the screen** |
| Working while looking elsewhere | impossible | yes | **yes — pin the cursor** |
| Interfaces must be redesigned? | yes — around the eyes' limits | n/a in XR | **no — quick path untouched** |
| Hands stay free and expressive | yes | no (holds a device) | **yes** |

The bet, stated plainly: *keep everything look-and-pinch is good at, add everything the mouse was good at, and pay for it only in the moments you actually need precision.*

---

*This chapter covers one hand and one simple object. The same steps extend to objects with parts (the cursor can enter a part and be fenced by it) and to both hands (each hand gets its own cursor) — those chapters come next. For the researcher-facing version of every choice above, see the [Design Space](/freegrab-docs/design-space/).*
