# DISCHARGE CRITERIA LIBRARY

This library provides pre-written, proven criteria for `@Triage` to use when constructing `HEALTH.md`. Select the relevant items based on the project stack and domain instead of generating criteria from scratch. 

## General / Universal
- [ ] No CRITICAL or HIGH severity blockers remaining in STATE.md
- [ ] `qa_report.md` entries show 100% PASS for all planned tasks
- [ ] Code compiles/builds successfully with zero errors
- [ ] No hardcoded secrets or sensitive credentials in the source code

## Durability & Recovery
> A patient whose only copy is local is one disk failure from non-existence. No code patient discharges without a durable home.
- [ ] Source is under version control with a configured git remote (not a local-only repo)
- [ ] A push/backup to that remote has been verified during the treatment, not merely assumed
- [ ] No project artifact exists only in a single ephemeral location (Trash, `/tmp`, an uncommitted working tree, an unsynced cloud folder)

## Backend / API Development
- [ ] All API endpoints return expected standard HTTP status codes (200, 400, 401, 404, 500)
- [ ] Database schema changes are documented and migrated cleanly
- [ ] Unit test coverage is >= 80% for business logic layer
- [ ] Input validation exists on all public-facing routes
- [ ] Responses match expected JSON schemas exactly

## Frontend / UI Development
- [ ] UI exactly matches the design system and required aesthetic guidelines
- [ ] Responsive layouts work correctly across mobile, tablet, and desktop viewports
- [ ] No browser console errors present during happy-path execution
- [ ] Accessibility: all interactive elements have sufficient contrast and aria labels
- [ ] Loading states and error states are visually implemented for all async actions

## Data / Workflows (n8n & Pipelines)
- [ ] All n8n workflows import cleanly without errors
- [ ] All nodes have fully configured TypeScript interfaces (`.types.ts`)
- [ ] Authentication nodes and credentials are dynamically referenced via env variables, not hardcoded
- [ ] Error handling/fallback paths exist for critical external API calls 

## Domain-Specific Overrides
- [ ] Ensure any specific domain-level requirements cited in PATIENT.md are completely fulfilled.
