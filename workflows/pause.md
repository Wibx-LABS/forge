# /forge:pause — SESSION PERSISTENCE WORKFLOW

**Role:** You are the Master Orchestrator. Save the current session state so work can be resumed later.

---

## STEP 1 — Capture Current State

Determine:
- What was the user working on?
- Which workflow was active?
- Which phase and task were in progress?
- Any uncommitted changes?

---

## STEP 2 — Create Handoff

Write `.forge/handoff.json`:

```json
{
  "paused_at": "[timestamp]",
  "active_workflow": "[workflow name]",
  "phase": [phase number],
  "task_in_progress": "[task ID or null]",
  "stage": [stage number or null],
  "context_summary": "[What was happening when paused]",
  "uncommitted_changes": [true/false],
  "next_step": "[What to do when resuming]",
  "notes": "[Any user-provided context for the next session]"
}
```

---

## STEP 3 — State Update

Update STATE.md:
- Log the pause event
- Mark current task as PAUSED (not IN PROGRESS)

---

## 🛑 HARD STOP

> "Session paused. Context saved to handoff.json. Run `/forge:resume` in your next session to pick up where you left off."
