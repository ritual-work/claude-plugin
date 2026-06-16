---
description: Check loading, error, empty, partial, and retry states for a UI surface.
---

# Frontend Developer: Review Loading Error Empty States

Check loading, error, empty, partial, and retry states for a UI surface. A **standalone check** — it runs a local recipe; **no Ritual
discovery engine needed**.

What to review: $ARGUMENTS

**Apply the build-discipline posture** — surface assumptions, define what "good"
means here, keep it surgical, and verify against the checklist.

## Run it
1. Read the request through the **Frontend Developer** lens (job: `build-frontend-feature`).
2. Surface assumptions + the success criteria for this review.
3. Work the checklist against the code/surface under review:
- [ ] A loading state for every async fetch (skeleton/spinner); no layout jump on resolve.
- [ ] An error state with a user-facing message and a retry affordance where recoverable.
- [ ] An empty state distinct from loading — never a blank or zero-render.
- [ ] Partial-data and slow-network behavior is defined, not accidental.
- [ ] No unhandled rejection leaves a dead UI; every failure has a visible outcome.
4. Verify each item — confirmed present, or raised as an explicit gap (note the file/line).
   **Done when:** Each state is confirmed handled, or raised as an explicit gap.
5. **Escalate to Ritual discovery** (`ritual build`, or this pack's discovery
   commands) ONLY if the task turns out ambiguous, cross-functional, or needs
   constraints that live outside the code — say so rather than guessing.

No Ritual connection is required for this check.
