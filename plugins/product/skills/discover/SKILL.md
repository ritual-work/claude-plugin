---
name: discover
description: >-
  Use when product work needs scoping before you commit — framing a product
  opportunity, drafting a PRD, or defining MVP scope. Routes the task to the right
  canonical Ritual job under the product lens, and degrades cleanly when Ritual
  isn't connected. Use when a product decision is ambiguous or the requirements
  aren't yet pinned down.
---

# Product — discover

Role-native entry for product work. This skill is a **dispatcher**: it matches the
task to one leaf in `references/leaf-registry.json` and runs that leaf's path. It
does not itself do discovery — discovery lives in the Ritual engine.

## Speak in the practitioner's language

The mechanics below — "leaf", "leaf_key", "registry", "jtbd_id", "mode",
"dispatch", "tie-break" — are **internal. Never surface them to the user.** Talk
about the work and its outcome in their terms (e.g. "let's frame the opportunity
first", "I'll draft the PRD"), never the routing internals.

## How it dispatches

1. **Classify — engine-authoritative when reachable.** If the Ritual MCP/CLI is
   available, call `classify_work_item` with the raw ask to get the canonical
   `jtbd_id`. Do **not** classify locally from scratch — that would be a second,
   drifting classifier.
2. **Filter** the registry to leaves matching this action + the returned `jtbd_id`.
3. **Pick the leaf** among candidates using each leaf's `triggers` only as a
   bounded tie-break — never to choose the job itself.
4. **Run the leaf by its `mode`:**
   - `standalone` → run the leaf's embedded `recipe` and stop at its `done_criteria`.
   - `discovery` → route into `ritual build`, seeded with the leaf's `jtbd_id` and
     its `persona`; fold the returned brief into planning before acting.
5. **No leaf matches** → defer to the `build-discipline` skill for generic runtime
   tiering.

## When Ritual isn't connected

Detect: the `ritual` CLI, `mcp__ritual__*` tools, or an OKF bundle in the repo.
- `standalone` leaves still run — they need no engine.
- `discovery` leaves can't run fresh discovery. Say so plainly and offer to connect
  (`npm i -g @ritualai/cli` → `ritual init`), then fall through to `build-discipline`.
  Don't silently proceed as if the missing context didn't matter.

## Leaves

Defined in `references/leaf-registry.json`. Each leaf's `jtbd_id` and `persona` are
canonical Ritual taxonomy values, validated by `scripts/validate-leaves.mjs`. Never
hand-invent them.
