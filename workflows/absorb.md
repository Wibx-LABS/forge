# /forge:absorb — DRIFT RECONCILIATION WORKFLOW

**Role:** You are the Master Orchestrator. Your job is to reverse-engineer manual developer edits (State Drift) into a "Ghost Plan" and stitch the project's state back into alignment with reality.

---

## STEP 1 — Context Loading

Read in order:
1. `.forge/PATIENT.md`
2. `.forge/BLUEPRINT.md`
3. `.forge/STATE.md`
4. `.forge/VITALS.md` — To understand the exact drift flagged by `@Monitor`.

Confirm:
- `VITALS.md` shows State Drift.
- The project is under Git version control.

---

## STEP 2 — Capture Reality (The Diff)

**CRITICAL STEP**: We must see exactly what the developer changed outside of the framework's knowledge.

Instruct the execution agent (or the attending physician) to capture the unrecorded changes:
1. Run `git diff HEAD > .forge/REALITY_DIFF.md`
2. Run `git ls-files --others --exclude-standard >> .forge/REALITY_DIFF.md` to append untracked files.
3. PAUSE until `.forge/REALITY_DIFF.md` is populated.

---

## STEP 3 — Ghost Plan Generation

Once `.forge/REALITY_DIFF.md` is populated, invoke `@Scout` (or process it directly yourself) to analyze the diff:
1. Identify all files modified, created, or deleted.
2. Deduce the intent of the changes (what feature was built/fixed?).

Generate a **Ghost Plan** (`.forge/phases/XX-phase-name/XX-YY-MANUAL-PLAN.md`), mimicking the structure of a standard `@Strategist` PLAN.md, but representing work *already completed*:

```xml
<task type="manual">
  <name>[Deduced name of the manual human update]</name>
  <id>[Phase-Task, e.g., 01-MANUAL]</id>
  <stage>[Current Stage]</stage>
  <depends>none</depends>
  <files>[Comma-separated list of files affected]</files>
  <action>
    [Description of what the human developer implemented, reverse-engineered from the diff]
  </action>
  <verification_script>
    N/A - Human Executed
  </verification_script>
  <verify>
    Automatically PASS (Manual execution bypasses Inspector)
  </verify>
  <done>Human changes cleanly absorbed into project state</done>
</task>
```

---

## STEP 4 — Blueprint Evolution

If the `REALITY_DIFF.md` reveals that the developer introduced new APIs, new data models, or new structural modules not present in `.forge/BLUEPRINT.md`:

- Invoke `@Architect` to surgically update `BLUEPRINT.md`.
- Ensure new architectural facts override old assumptions. *Reality always wins.*

---

## STEP 5 — State Reconciliation

Invoke `@Conductor` to update `.forge/STATE.md`:
1. Inject the new "Ghost Plan" (e.g. `T-MANUAL`) into the Task Queue.
2. Mark its status instantly as `DONE (Human Executed)`.
3. Mark its QA Verdict as `PASS (Manual)`.
4. Log a Decision Log entry: "Absorbed manual state drift via /forge:absorb."
5. Clear the drift warnings from `VITALS.md` findings.

---

## STEP 6 — Git Commit

After `STATE.md` and `BLUEPRINT.md` are updated, create an atomic git commit to secure the newly absorbed reality:
```
forge(absorb): reconcile manual state drift with framework artifacts
```

---

## STEP 7 — Output

Present the absorption summary to the user:

```
🔄 DRIFT ABSORBED
----------------------------
Files Reconciled: [Count]
Ghost Plan Created: [Plan ID] - [Deduced intent]
Blueprint Updated: [Yes / No]
State Synchronized: YES

The framework has fully documented your manual edits. You may now continue execution with `/forge:build [N]`.
```
