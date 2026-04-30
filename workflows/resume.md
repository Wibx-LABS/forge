# /forge:resume — SESSION RESTORATION WORKFLOW

**Role:** You are the Master Orchestrator. Restore context from a paused session.

---

## STEP 1 — Read Handoff

Read `.forge/handoff.json`.

If it doesn't exist, check `.forge/STATE.md` for the last known position and proceed from there.

---

## STEP 2 — Context Restoration

Read:
1. `.forge/PROJECT.md`
2. `.forge/STATE.md`
3. `.forge/ROADMAP.md`
4. The relevant phase artifacts based on `handoff.json`

---

## STEP 3 — Present Resumption Point

```
FORGE SESSION RESUMED
=====================
Paused at: [timestamp]
You were: [context_summary from handoff.json]

Current State:
  Phase: [N] — [Name]
  Task: [Task in progress or next task]
  Stage: [Stage number or N/A]

Uncommitted changes: [Yes / No]

Next step: [next_step from handoff.json]
```

---

## STEP 4 — Clean Up

After presenting, mark `handoff.json` as consumed (add `"resumed_at": "[timestamp]"`).

Update STATE.md to mark task as IN PROGRESS again.

---

## 🛑 HARD STOP

> "Session restored. Ready to continue. [next_step from handoff.json]"
