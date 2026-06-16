---
description: Check keyboard, screen-reader, contrast, focus, and semantics for a UI surface.
---

# Frontend Developer: Review Accessibility

Check keyboard, screen-reader, contrast, focus, and semantics for a UI surface. A **standalone check** — it runs a local recipe; **no Ritual
discovery engine needed**.

What to review: $ARGUMENTS

**Apply the build-discipline posture** — surface assumptions, define what "good"
means here, keep it surgical, and verify against the checklist.

## Run it
1. Read the request through the **Frontend Developer** lens (job: `build-frontend-feature`).
2. Surface assumptions + the success criteria for this review.
3. Work the checklist against the code/surface under review:
- [ ] Every interactive element is keyboard-reachable and operable — no mouse-only paths.
- [ ] Semantic elements / ARIA roles + labels are correct; landmarks present.
- [ ] Visible focus state on all focusable elements; focus order is logical.
- [ ] Text and essential UI meet WCAG AA contrast.
- [ ] Dynamic changes are announced (aria-live / role) where the user must notice them.
4. Verify each item — confirmed present, or raised as an explicit gap (note the file/line).
   **Done when:** Each item is confirmed, or raised as an explicit gap with the offending element noted.
5. **Escalate to Ritual discovery** (`ritual build`, or this pack's discovery
   commands) ONLY if the task turns out ambiguous, cross-functional, or needs
   constraints that live outside the code — say so rather than guessing.

No Ritual connection is required for this check.
