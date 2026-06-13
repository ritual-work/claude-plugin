---
name: discover
description: >-
  Use when a backend-service or API task needs scoping before you build — designing
  a service contract, planning an implementation, or sanity-checking error handling
  as a backend developer. Decides whether the task is a known standalone check or
  warrants a Ritual exploration, routes it to the right canonical job under the
  backend-developer lens, and degrades cleanly when Ritual isn't connected.
---

# Backend services — discover

Role-native entry for backend-service work. This skill is a **dispatcher**: it
matches the task to one leaf in `references/leaf-registry.json` and runs that
leaf's path. It does not itself do discovery — discovery lives in the Ritual
engine.

## How it dispatches

1. **Classify — engine-authoritative when reachable.** If the Ritual MCP/CLI is
   available, call `classify_work_item` with the raw ask to get the canonical
   `jtbd_id`. Do **not** classify locally from scratch — that would be a second,
   drifting classifier.
2. **Filter** the registry to leaves matching this role + action + the returned
   `jtbd_id`.
3. **Pick the leaf** among the remaining candidates using each leaf's `triggers`
   only as a bounded tie-break — never to choose the job itself.
4. **Run the leaf by its `mode`:**
   - `standalone` → run the leaf's embedded `recipe` and stop at its
     `done_criteria`. No Ritual discovery needed.
   - `discovery` → route into `ritual build`, seeded with the leaf's `jtbd_id`
     **and** `persona` (`backend-developer`); fold the returned brief into plan
     mode before writing code.
5. **No leaf matches** → defer to the `build-discipline` skill for generic
   runtime tiering.

## When Ritual isn't connected

Detect: the `ritual` CLI, `mcp__ritual__*` tools, or an OKF bundle in the repo.
- `standalone` leaves still run — they need no engine.
- `discovery` leaves can't run fresh discovery. Say so plainly and offer to
  connect (`npm i -g @ritualai/cli` → `ritual init`), then fall through to
  `build-discipline`. Don't silently proceed as if the missing context didn't
  matter.

## Leaves

Defined in `references/leaf-registry.json`. Each leaf's `jtbd_id` and `persona`
are canonical Ritual taxonomy values, validated by `scripts/validate-leaves.mjs`.
Never hand-invent them.
