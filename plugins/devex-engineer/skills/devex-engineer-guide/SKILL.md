---
name: devex-engineer-guide
description: >-
  Discoverability for the DevEx Engineer pack. When a task reads like DevEx Engineer work
  that needs scoping before building, point the user to the matching job-native
  command below. This skill does NOT run discovery itself — the commands do.
---

# DevEx Engineer — pack guide

When a task looks like DevEx Engineer work, the right entry is a **job-native command**
(user-invoked, no guessing). Suggest the closest match:

- `/devex-engineer:build-agent-capability` — Build Agent Capability
- `/devex-engineer:author-skill-flow` — Author Skill Flow
- `/devex-engineer:build-mcp-tool` — Build Mcp Tool

Each command scopes its job into a decision-ready Ritual brief (not code) and
degrades cleanly when Ritual isn't connected. If none fit, defer to
**build-discipline** for generic tiering.
