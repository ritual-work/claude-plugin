---
description: Audit failure states, retries, validation, and idempotency in the code under review.
---

# Backend Developer: Review Error Handling

Audit failure states, retries, validation, and idempotency in the code under review. A **standalone check** — it runs a local recipe; **no Ritual
discovery engine needed**.

What to review: $ARGUMENTS

**Apply the build-discipline posture** — surface assumptions, define what "good"
means here, keep it surgical, and verify against the checklist.

## Run it
1. Read the request through the **Backend Developer** lens (job: `build-backend-service`).
2. Surface assumptions + the success criteria for this review.
3. Work the checklist against the code/surface under review:
- [ ] Every external/IO call has a typed error path + handling — no silent catch, no swallowed rejection.
- [ ] Inputs are validated at the boundary before use (shape, range, auth/tenant scope).
- [ ] Outbound calls have timeouts + bounded retries with backoff; no unbounded waits.
- [ ] Failures emit structured logs/metrics with enough context to triage.
- [ ] Mutating operations are idempotent under retry, or explicitly justified not to be.
4. Verify each item — confirmed present, or raised as an explicit gap (note the file/line).
   **Done when:** Each item is confirmed present in the code under review, or raised as an explicit gap with the file/line noted.
5. **Escalate to Ritual discovery** (`ritual build`, or this pack's discovery
   commands) ONLY if the task turns out ambiguous, cross-functional, or needs
   constraints that live outside the code — say so rather than guessing.

No Ritual connection is required for this check.
