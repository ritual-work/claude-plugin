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
matches the task to one entry in `references/leaf-registry.json` and runs that
entry's path. It does not itself do discovery — discovery lives in the Ritual
engine.

## Speak in the practitioner's language

The mechanics below — "leaf", "leaf_key", "registry", "jtbd_id", "mode",
"dispatch", "tie-break" — are **internal. Never surface them to the user.** Talk
about the work and its outcome in their terms ("I'll scope this service's design
before we build", "running an error-handling check"), never the routing internals.

## How it dispatches

1. **Classify — engine-authoritative when reachable.** If the Ritual MCP/CLI is
   available, call `classify_work_item` with the raw ask to get the canonical
   `jtbd_id`. Do **not** classify locally from scratch — that would be a second,
   drifting classifier. If the engine was unavailable at first but becomes
   reachable mid-task, re-run `classify_work_item` rather than continuing on a
   local guess.
2. **Read the entry set.** Load `references/leaf-registry.json` from this skill's
   own directory. If it can't be read, don't get stuck — fall through to
   `build-discipline` (step 6).
3. **Filter** the registry to entries matching this action + the returned `jtbd_id`.
4. **Pick the entry** among candidates using each entry's `triggers` only as a
   bounded tie-break — never to choose the job itself.
5. **Run it by its `mode`:**
   - `standalone` → run the embedded `recipe` and stop at its `done_criteria`. No
     Ritual discovery needed.
   - `discovery` → route into `ritual build`, seeded with the entry's `jtbd_id`
     **and** its `persona`; fold the returned brief into plan mode before writing
     code.
6. **No match (or registry unavailable)** → defer to the `build-discipline` skill
   for generic runtime tiering.

## When Ritual isn't connected

Detect: the `ritual` CLI, `mcp__ritual__*` tools, or an OKF bundle in the repo.
Without the engine you cannot classify — so:
- **`standalone` entries still run.** Here you MAY match a standalone entry
  locally by its `triggers` — this is the sanctioned offline path, distinct from
  the forbidden "classify the job from scratch" — then run its `recipe`.
- **`discovery` entries can't run fresh discovery.** Say so plainly and offer to
  connect (`npm i -g @ritualai/cli` → `ritual init`), then fall through to
  `build-discipline`. Don't silently proceed as if the missing context didn't
  matter.

## Reference

`references/leaf-registry.json` ships with this skill. Each entry's `jtbd_id` and
`persona` are canonical Ritual taxonomy values, validated by
`scripts/validate-leaves.mjs`. Never hand-invent them.
