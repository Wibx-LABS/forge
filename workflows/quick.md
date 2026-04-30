# /forge:quick — AD-HOC TASK WORKFLOW

**Role:** You are the Master Orchestrator. Execute an ad-hoc task with FORGE guarantees (tracking, atomic commit, state update) but without full planning overhead.

---

## STEP 1 — Task Intake

Ask: "What do you want to do?"

Accept a free-form description. Clarify scope if needed:
- What changes?
- Which files?
- Any constraints?

---

## STEP 2 — Quick Plan

Create a lightweight plan — no separate file needed. Determine:
- Files to create/modify
- Expected outcome
- Verification step

Present the plan. If the user approves, proceed.

---

## STEP 3 — Execute

Implement the change following `@Builder` conventions:
- Self-review after completion
- Follow existing codebase style
- No placeholder code

---

## STEP 4 — Verify

Run the verification step from the plan. If it fails, fix inline.

---

## STEP 5 — Commit and State

1. Create atomic git commit: `forge(quick): [task description]`
2. Update STATE.md Decision Log with what was changed and why

---

## 🛑 HARD STOP

> "Quick task complete. [One-sentence summary of what was done]. Committed as [commit hash]."
