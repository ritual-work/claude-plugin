---
description: Scope "Debug Production Issue" as a Developer — produces a Debugging Brief (a decision-ready brief, not code).
---

# Developer: Debug Production Issue

Scope **Debug Production Issue** through the Developer lens — a Ritual discovery
command that produces a **Debugging Brief** (a decision-ready brief,
not code), then folds that brief into plan mode before any implementation. When
Ritual is connected this is the same flow as `ritual build`, seeded for this job.

The user's request: $ARGUMENTS

**Apply the build-discipline posture throughout** — surface assumptions, define
success criteria, keep changes surgical, and verify the constraints survived.
(`build-discipline` is this pack's dependency + offline fallback; its posture is
woven into the steps below, so you don't rely on it firing ambiently.)

## 1 · Frame — before Ritual
- Read the request through the **Developer** lens and this job (**debug-production-issue**).
- Surface assumptions, missing inputs, constraints, and anti-goals — state them
  explicitly; never silently guess a load-bearing ambiguity.
- Establish the success criteria for the deliverable.

## 2 · Discover — run Ritual (MCP is the runtime)
Discovery runs on the **Ritual MCP**. Check, in order:
1. **Ritual MCP available** (`mcp__ritual__*` tools present)? → **use it.** Create
   an exploration for the request seeded with **jtbd `debug-production-issue`** under the
   **developer** lens, focused on the Developer sections below; walk discovery →
   recommendations → build brief (poll
   `get_exploration_status.recommendationsStatus` until `ready`), review the
   recommendations, and fold the returned brief into plan mode. Same experience
   as `ritual build` today.
2. **Only the `ritual` CLI is present** (MCP not wired yet)? → the CLI is the
   **setup path**: `ritual init` authenticates + connects the MCP, then re-run
   this command. The CLI is how you install/connect/repair Ritual — not a runtime
   dependency.
3. **Neither** → Ritual isn't connected this session. Say so plainly and offer the
   one-step setup (don't imply the CLI is always required — a user may already
   have the MCP wired via a custom connector / Claude Code MCP config, in which
   case step 1 applies):
   ```
   ritual init   # authenticate, connect the Ritual MCP, install recommended plugins
   ```
   While not connected, offer to either (a) continue with a local checklist only,
   or (b) stop here until Ritual is connected. Don't proceed as if the missing
   context were resolved.

## 3 · Verify — after Ritual
- Confirm the resulting brief/output preserves the original constraints + success
  criteria.
- Explicitly list any unresolved assumptions, questions, or risks. Don't proceed
  as if uncertain points are resolved.

## What you contribute (Developer sections)
- incident summary
- symptoms
- investigation timeline
- root cause
- hypotheses
- proposed fix
- rollback plan

The full Debugging Brief composes 22 sections
across every contributing lens; the above are the Developer's own. Speak in the
practitioner's language — the work and its outcome, never routing internals.
