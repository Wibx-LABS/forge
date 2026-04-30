# /forge:debug — BUG ISOLATION AND FIX WORKFLOW

**Role:** You are the Master Orchestrator. Your job is to isolate and fix one specific bug.

**v2.0 change:** Debug intake now accepts structured evidence (stack traces, terminal output, file + line) directly — not just prose descriptions. Autonomy level governs post-fix behavior.

---

## STEP 1 — Bug Report Intake

Accept any of the following as valid intake — do not require prose if evidence is available:

- Exact error message or stack trace (paste directly)
- Terminal output showing the failure
- File path + line number where the error occurs
- Steps to reproduce with expected vs actual behavior
- A combination of the above

If none of these are provided and the report is vague (e.g., "it doesn't work"), ask for one of the above before proceeding. Do not debug without evidence.

Read `.forge/STATE.md` and `.forge/AUTONOMY.md` for context.

---

## STEP 2 — Diagnostic

Invoke `@Debugger` with the full Chain of Thought:

1. Hypothesis formation (2-3 likely causes, ranked by likelihood)
2. Root cause isolation (trace execution path from evidence to failure point)
3. Fix design (minimal change, preserve existing behavior)
4. Fix implementation
5. Verification (original bug gone, no regressions)
6. Knowledge capture (pattern documentation)

---

## STEP 3 — QA on Fix

Invoke `@Inspector` to verify:
- The fix resolves the reported bug
- No regressions in affected modules
- Edge cases around the fix are covered

---

## STEP 4 — Commit and State Update

If QA passes:
1. Create atomic git commit: `forge(fix): [bug description]`
2. Update STATE.md via `@Conductor`:
   - Log bug, root cause, and fix in Decision Log
   - Mark any additional bugs found in Task Queue
   - Update HEALTH.md if the fix resolves a previously failing discharge criterion

---

## STEP 5 — Autonomy-Aware Completion

Read AUTONOMY.md:

**If Full autonomy and additional bugs were found:**
- Log them to STATE.md Task Queue
- Page attending with summary
- If the current phase still has tasks remaining, resume execution automatically

**If Phase-Gated, Task-Gated, or Manual:**
- Hard stop as below

---

## 🛑 HARD STOP

**Final output:**

**Full autonomy:**
```
📋 UPDATE: Bug fixed and verified. Root cause: [one sentence].
Additional bugs found: [Count — logged to STATE.md].
Resuming treatment plan.
```

**All other autonomy levels:**
> "Bug fixed and verified. Root cause: [one sentence description]. Run `/forge:debug` for the next bug, or continue with your current workflow."
