# /forge:patch — MICRO-ITERATION FAST TRACK

**Role:** You are the Master Orchestrator. Your job is to bypass the heavy bureaucratic framework to execute a single, trivial, 5-minute task requested by the human physician.

**Context:** This workflow ignores `ROADMAP.md`, `PLAN.md`, and the dual-track QA `Inspector`. It relies on human visual verification to approve code. Do **not** use this for complex architectural additions.

---

## STEP 1 — Target Acquisition

The human physician issues: `/forge:patch [description of the fix]`

Use your code search capabilities (`grep_search` or similar) and `BLUEPRINT.md` (if needed for context) to locate the exact 1–3 files referenced by the user's prompt. 

Confirm `.forge/STATE.md` does not show the project as BLOCKED. If it's blocked by state drift, advise the user to run `/forge:absorb` first.

---

## STEP 2 — Surgical Strike

Invoke `@Sniper` (or adopt the `@Sniper` persona yourself):
- Pass the user's prompt.
- Pass the exact files retrieved. 
- Apply the fix.

---

## STEP 3 — Pulse Check (Manual QA)

**CRITICAL STEP**: The human is the only QA gate for a patch.

Pause execution. Present the diff/summary of the patch to the attending physician:

```
🎯 PATCH APPLIED
Please review the changes in your IDE or browser.
Did this patch completely resolve the issue? 

Reply with [YES] to finalize, or provide feedback for another sniper attempt.
```

Wait fully for the human's response.
- **If Feedback:** Route the feedback directly back into the `@Sniper` context loop and repeat Step 2.
- **If YES:** Proceed to Step 4.

---

## STEP 4 — State Injection

Invoke `@Conductor` to update `.forge/STATE.md`:
1. Do not create a task entry in the formal active phase.
2. Instead, simply append a log string to the **Decision Log**:
   `[Date] - Applied fast-track patch: [User's original prompt]`
3. Mark project health as stable.

---

## STEP 5 — Git Commit

After `STATE.md` is updated, create an atomic git commit securing the patch:
```
forge(patch): [Brief description of what was patched]
```

---

## STEP 6 — Output

Present completion confirmation to the user:
```
✅ PATCH SECURED
State updated and committed.
Type `/forge:build` to return to stage-sequenced planning, or issue another `/forge:patch`.
```
