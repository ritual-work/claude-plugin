---
description: Scope "Design Technical Approach" as a Eng Lead — produces a Technical Design Brief (a decision-ready brief, not code).
---

# Eng Lead: Design Technical Approach

Scope **Design Technical Approach** through the Eng Lead lens. This is a Ritual
discovery command — it produces a **Technical Design Brief** (a decision-ready
brief, not code) by running the Ritual engine seeded with this job, then folds
that brief into plan mode before any implementation.

The user's request: $ARGUMENTS

## What you contribute (Eng Lead sections)
- approach options
- tradeoffs
- architecture decision
- sequencing
- risk mitigation

The full Technical Design Brief composes 17 sections
across every contributing lens; the above are the Eng Lead's own.

## How to run it
1. **Confirm Ritual is connected** — the `ritual` CLI or `mcp__ritual__*` tools.
   If it isn't, say so plainly and offer to connect
   (`npm i -g @ritualai/cli` → `ritual init`), then fall back to the
   **build-discipline** skill for generic tiering. Don't proceed as if the
   missing context didn't matter.
2. **Run the discovery, seeded with this job.** Create a Ritual exploration for
   the request above with **jtbd `design-technical-approach`** under the **eng-lead** lens,
   then walk discovery → recommendations → build brief: poll
   `get_exploration_status.recommendationsStatus` until `ready`, review the
   recommendations, and fold the returned brief into plan mode.
3. **Speak the practitioner's language.** Talk about the work and its outcome in
   Eng Lead terms — never the routing internals (jtbd ids, registries, leaves).
