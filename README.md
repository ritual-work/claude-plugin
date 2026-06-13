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
/plugin install build-discipline@ritual
```

## Role packs

`build-discipline` is the shared base. On top of it, the `ritual` marketplace hosts
role packs that speak each practitioner's vocabulary and route into Ritual:

```
/plugin install dev-backend-services@ritual
```

Install only the packs relevant to your role — each declares `build-discipline` as a
dependency, so the base comes along automatically.

## What it does

The `build-discipline` skill triggers when you start a feature, refactor, or change whose
intent isn't fully spelled out. Before planning, it decides how much discovery the task needs:

- **No discovery** — trivial, mechanical edits. Just make the change.
- **Lightweight** — bounded tasks: inspect the relevant files inline; for a small but
  build-shaped task, run `ritual lite`.
- **Full discovery — when Ritual is connected.** Routes into a structured exploration:
  discovery surfaces hidden constraints and prior decisions, a validated build brief becomes
  the success criteria, and a post-change audit verifies your constraints survived into the
  final code. This turns "be careful" into a measured result.

If Ritual isn't connected, the discipline still applies — and the skill points you to where
the deeper context-gathering lives.

## Pairs with

This composes with always-on discipline rulesets rather than replacing them. Keep your
existing guidelines as the intent layer; this plugin is the layer that makes the
context-dependent parts (surfacing the right assumptions, verifying against real criteria)
actually executable.

## Ritual

The full Ritual workflow — explorations, build briefs, and audits that verify your
constraints survived into the final code — is available via the `ritual` CLI and MCP
server. Learn more at
[ritual.work](https://ritual.work).

## License

MIT
