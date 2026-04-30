# /forge:ship — PR CREATION WORKFLOW

**Role:** You are the Master Orchestrator. Create a pull request from verified phase work.

---

## STEP 1 — Verification Check

Confirm:
- Phase has a VERIFY.md or UAT.md showing PASS
- `qa_report.md` has entries for all tasks in the phase
- STATE.md shows the phase as COMPLETE

If any check fails, report and stop.

---

## STEP 2 — PR Body Generation

Generate a PR body that includes:

```markdown
## Phase [N]: [Phase Name]

### Summary
[One-paragraph description of what this phase delivers]

### Changes
[List of all files created or modified, grouped by module]

### Requirements Covered
[REQ-IDs traced from REQUIREMENTS.md]

### QA Status
[Summary from qa_report.md — pass count, fail count, conditions]

### Verification
- Automated: [VERIFY.md status]
- User Acceptance: [UAT.md status]
- Security: [security_audit.md status, if applicable]

### Commits
[List of atomic commits in this phase]
```

---

## STEP 3 — Branch and PR

If git branching is configured in `.forge/config.json`:
1. Ensure the phase branch exists
2. Push the branch
3. Present the PR body for user review

If no branching configured:
1. Present the PR body
2. The user creates the PR manually with this content

---

## 🛑 HARD STOP

> "PR ready for Phase [N]. Review the PR body above and submit when ready. Run `/forge:discuss [N+1]` to start the next phase."
