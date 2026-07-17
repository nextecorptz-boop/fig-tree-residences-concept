# Fig Tree Residences — Motion Strategy
### Phase 2: Experience Strategy — v1.0

This document sets the motion and pacing philosophy the eventual design and build phases must follow. It describes principles and intent only — no animation code, easing values, or frame-level specification belongs here; that is implementation work for a later phase.

## 1. The Governing Rule

Motion in this experience exists to support calm, never to demonstrate capability. Every animation decision in later phases should be tested against a single question: does this movement make a visitor feel more settled, or does it exist to show off that the site can move? If the honest answer is the latter, it should be removed, regardless of how technically well-executed it is. This is a direct extension of the thesis in `01_EXPERIENCE_THESIS.md`: nothing about this brand is trying to impress through spectacle.

## 2. What Moves

Large, full-bleed photography — the drone hero shot, the rooftop sunset, the garden living wall — may move, but slowly and minimally: a gentle parallax or slow reveal as a visitor scrolls into a new section is appropriate, because it mimics the physical experience of walking somewhere and having a view gradually open up, which is exactly the "arrival" feeling `08_STORYTELLING_FLOW.md` calls for in Act One. Section transitions may include a soft fade or gentle vertical drift as new content enters view, standing in for the unhurried pacing of moving through a real garden rather than clicking through a menu.

## 3. What Never Moves

Text should not move for its own sake — no letter-by-letter reveals, no bouncing, no attention-seeking entrance animation on headlines or body copy. Navigation should be stable and predictable; a host who keeps rearranging the furniture while a guest is trying to get their bearings is not calming, however elegant the rearrangement looks. Nothing should auto-play, auto-advance, or move without the visitor's own scroll or interaction initiating it — carousels that cycle on a timer, and background video that plays regardless of what a visitor is doing, both work against the "reserved exclusively for our guests," unhurried self-image this brand has already established for itself. And critically, given the interruption pattern flagged in `08_STORYTELLING_FLOW.md`: nothing should move in a way that demands an action (a pulsing "book now" button, a shaking icon) — urgency-coded motion is one of the clearest available signals that a brand does not trust its own content to be compelling on its own terms.

## 4. Scroll Rhythm

The experience should be built to reward slow scrolling, not to compress everything into the smallest possible number of screens. Given the five-act structure in `08_STORYTELLING_FLOW.md`, each act should feel like it occupies real scroll distance and real time — a visitor should never feel rushed from "arrival" into "invitation" in a handful of seconds. At the same time, this is not licence for padding: every extra pixel of scroll distance should be earned by a genuine change in what is being shown (a new room, a new view of the garden, a new fact about the location), not by empty whitespace inserted purely to slow someone down artificially.

## 5. Transition Rhythm

Transitions between sections and between pages should feel like scene changes in a slow, well-edited film — a beat of stillness before the next image or idea arrives, rather than an instant cut or an aggressive slide. This applies most directly to the handoff between the five acts described in the storytelling flow: the shift from Arrival to Discovery, in particular, should feel like a natural continuation of the same held breath the homepage opens with, not an abrupt change of register.

## 6. Luxury Pacing as a Design Constraint, Not a Preference

"Luxury pacing" in this context has a specific, checkable meaning: nothing on this site should ever move faster than a visitor can comfortably absorb what it is showing them. This is the direct opposite of the conventional web-performance instinct to minimise time-to-interaction at all costs — Fig Tree's brand is explicitly built on the idea that the best things should not be rushed, and the site's own motion should be the first place that promise is either kept or broken. Later technical phases will need to reconcile this pacing philosophy with genuine performance and accessibility requirements (see Section 7); the resolution should favour a small number of well-chosen, slow, purposeful movements over a larger number of decorative ones, not simply "more motion, applied slower."

## 7. Non-Negotiable Guardrails for Later Phases

Whatever this phase's calm, unhurried motion philosophy is eventually translated into, later implementation work must still respect `prefers-reduced-motion` for visitors who have requested it, must never let decorative motion interfere with reading or navigation, and must never use motion as a substitute for genuine page performance — a slow, elegant animation covering for a slow-loading page is not luxury pacing, it is a technical problem wearing luxury's clothing. These constraints are noted here as guardrails for whichever phase eventually writes real animation code; they are not addressed further in this document.
