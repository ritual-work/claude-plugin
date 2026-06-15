---
description: Scope "Author Skill Flow" as a DevEx Engineer — produces a Feature Specification (Agentic Coding) (a decision-ready brief, not code).
---

# DevEx Engineer: Author Skill Flow

Scope **Author Skill Flow** through the DevEx Engineer lens. This is a Ritual
discovery command — it produces a **Feature Specification (Agentic Coding)** (a decision-ready
brief, not code) by running the Ritual engine seeded with this job, then folds
that brief into plan mode before any implementation.

The user's request: $ARGUMENTS

## What you contribute (DevEx Engineer sections)
- skill trigger
- user path
- instructions
- examples
- guardrails
- test cases

The full Feature Specification (Agentic Coding) composes 19 sections
across every contributing lens; the above are the DevEx Engineer's own.

## How to run it
1. **Confirm Ritual is connected** — the `ritual` CLI or `mcp__ritual__*` tools.
   If it isn't, say so plainly and offer to connect
   (`npm i -g @ritualai/cli` → `ritual init`), then fall back to the
   **build-discipline** skill for generic tiering. Don't proceed as if the
   missing context didn't matter.
2. **Run the discovery, seeded with this job.** Create a Ritual exploration for
   the request above with **jtbd `author-skill-flow`** under the **devex-engineer** lens,
   then walk discovery → recommendations → build brief: poll
   `get_exploration_status.recommendationsStatus` until `ready`, review the
   recommendations, and fold the returned brief into plan mode.
3. **Speak the practitioner's language.** Talk about the work and its outcome in
   DevEx Engineer terms — never the routing internals (jtbd ids, registries, leaves).
