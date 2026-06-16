---
name: backend-developer-guide
description: >-
  Discoverability for the Backend Developer pack. When a task reads like Backend Developer work
  that needs scoping before building, point the user to the matching job-native
  command below. This skill does NOT run discovery itself — the commands do.
---

# Backend Developer — pack guide

When a task looks like Backend Developer work, the right entry is a **job-native command**
(user-invoked, no guessing). Suggest the closest match:

- `/backend-developer:define-service-contract` — Build Backend Service
- `/backend-developer:review-error-handling` — Build Backend Service

Each command scopes its job into a decision-ready Ritual brief (not code) and
degrades cleanly when Ritual isn't connected. If none fit, defer to
**build-discipline** for generic tiering.
