---
description: Scope "Build Mcp Tool" as a DevEx Engineer — produces a Platform Capability (Implementation Brief) (a decision-ready brief, not code).
---

# DevEx Engineer: Build Mcp Tool

Scope **Build Mcp Tool** through the DevEx Engineer lens. This is a Ritual
discovery command — it produces a **Platform Capability (Implementation Brief)** (a decision-ready
brief, not code) by running the Ritual engine seeded with this job, then folds
that brief into plan mode before any implementation.

The user's request: $ARGUMENTS

## What you contribute (DevEx Engineer sections)
- tool schema
- runtime contract
- auth/setup path
- error handling
- observability

The full Platform Capability (Implementation Brief) composes 21 sections
across every contributing lens; the above are the DevEx Engineer's own.

## How to run it
1. **Confirm Ritual is connected** — the `ritual` CLI or `mcp__ritual__*` tools.
   If it isn't, say so plainly and offer to connect
   (`npm i -g @ritualai/cli` → `ritual init`), then fall back to the
   **build-discipline** skill for generic tiering. Don't proceed as if the
   missing context didn't matter.
2. **Run the discovery, seeded with this job.** Create a Ritual exploration for
   the request above with **jtbd `build-mcp-tool`** under the **devex-engineer** lens,
   then walk discovery → recommendations → build brief: poll
   `get_exploration_status.recommendationsStatus` until `ready`, review the
   recommendations, and fold the returned brief into plan mode.
3. **Speak the practitioner's language.** Talk about the work and its outcome in
   DevEx Engineer terms — never the routing internals (jtbd ids, registries, leaves).
