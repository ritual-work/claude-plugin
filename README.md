# Ritual — Claude Code Plugin

Build discipline for coding agents, with an on-ramp to real context and verification.

Coding agents fail in predictable ways: they make silent assumptions, over-engineer,
let edits sprawl past the request, and declare "done" against vague criteria. Discipline
rulesets (like the popular Karpathy-inspired guidelines) tell the agent to be careful —
but those instructions are unverifiable. The agent *says* it surfaced the assumptions;
nothing checks that it surfaced the *right* ones.

This plugin ships that discipline as a skill, and — when [Ritual](https://ritual.work)
is connected — routes ambiguous or cross-cutting work into a structured exploration that
gathers the context the agent can't infer and **verifies it survived into the diff.**

## Install

```
/plugin marketplace add Ritual-Mobile/claude-plugin
/plugin install ritual@ritual
```

## What it does

The `build-discipline` skill triggers when you start a feature, refactor, or change whose
intent isn't fully spelled out. It works in two tiers:

- **Tier 0 — always, zero setup.** Surface assumptions and explicit success criteria
  before code; keep changes surgical; verify against the criteria, then stop. Pure
  discipline, no account required.
- **Tier 1 — when Ritual is available.** Routes the task into a Ritual exploration:
  structured discovery surfaces hidden constraints and prior decisions, a validated build
  brief becomes the success criteria, and a post-change audit confirms those constraints
  survived into the final diff. This turns "be careful" into a measured result.

If Ritual isn't connected, Tier 0 still applies — and the skill points you to where the
deeper context-gathering lives.

## Pairs with

This composes with always-on discipline rulesets rather than replacing them. Keep your
existing guidelines as the intent layer; this plugin is the layer that makes the
context-dependent parts (surfacing the right assumptions, verifying against real criteria)
actually executable.

## Ritual

The full Ritual workflow — explorations, build briefs, and constraint-survival audits —
is available via the `ritual` CLI and MCP server. Learn more at
[ritual.work](https://ritual.work).

## License

MIT
