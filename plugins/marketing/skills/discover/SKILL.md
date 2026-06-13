---
name: discover
description: >-
  Use when marketing work needs scoping before you commit — defining product
  positioning, writing a go-to-market launch brief, or designing a growth
  experiment. Routes the task to the right canonical Ritual job under the relevant
  marketing lens, and degrades cleanly when Ritual isn't connected. Use when the
  angle, audience, or success measures aren't yet pinned down.
---

# Marketing — discover

Role-native entry for marketing work. This skill is a **dispatcher**: it matches
the task to one entry in `references/leaf-registry.json` and runs that entry's
path. It does not itself do discovery — discovery lives in the Ritual engine.

## Speak in the practitioner's language

The mechanics below — "leaf", "leaf_key", "registry", "jtbd_id", "mode",
"dispatch", "tie-break" — are **internal. Never surface them to the user.** Talk
about the work and its outcome in their terms ("let's nail the positioning",
"I'll draft the launch brief"), never the routing internals.

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
   - `standalone` → run the embedded `recipe` and stop at its `done_criteria`.
   - `discovery` → route into `ritual build`, seeded with the entry's `jtbd_id`
     **and** its `persona`; fold the returned brief into planning before acting.
6. **No match (or registry unavailable)** → defer to the `build-discipline` skill
   for generic runtime tiering.

## When Ritual isn't connected

Detect: the `ritual` CLI, `mcp__ritual__*` tools, or an OKF bundle in the repo.
Without the engine you cannot classify — so:
- **`standalone` entries still run.** Here you MAY match a standalone entry
  locally by its `triggers` — the sanctioned offline path, distinct from the
  forbidden "classify the job from scratch" — then run its `recipe`.
- **`discovery` entries can't run fresh discovery.** Say so plainly and offer to
  connect (`npm i -g @ritualai/cli` → `ritual init`), then fall through to
  `build-discipline`. Don't silently proceed as if the missing context didn't
  matter.

## Reference

`references/leaf-registry.json` ships with this skill. Each entry's `jtbd_id` and
`persona` are canonical Ritual taxonomy values, validated by
`scripts/validate-leaves.mjs`. Never hand-invent them.
