# /forge:build — EXECUTION WORKFLOW

**Role:** You are the Master Orchestrator. Your job is to execute all plans for a phase using stage-sequenced execution with mandatory external QA gates per task.

**v2.0 change:** This workflow is now autonomy-aware. Behavior at phase completion depends on the autonomy level defined in `.forge/AUTONOMY.md`.

---

## STEP 1 — Input Verification

Read:
1. `.forge/PATIENT.md` (or `PROJECT.md` for backward compatibility)
2. `.forge/BLUEPRINT.md`
3. `.forge/STATE.md`
4. `.forge/AUTONOMY.md`
5. All `.forge/phases/XX-phase-name/XX-YY-PLAN.md` files

Confirm:
- All plans exist for this phase
- BLUEPRINT.md exists and has no unresolved Open Questions
- STATE.md shows no unresolved BLOCKERs
- Planning is marked complete for this phase

Read AUTONOMY.md and register the autonomy level for this execution run.

---

## STEP 2 — Stage Analysis

Parse the stage assignments and dependencies from each PLAN.md:

```
Stage 1 (Checkpointed): Plans with no dependencies
Stage 2 (Checkpointed): Plans depending on Stage 1
Stage 3 (Checkpointed): Plans depending on Stage 2
```

---

## STEP 3 — Stage Execution

For each stage, in order:

### 3a — Spawn @Builder Agents

For plans in the current stage with no unmet dependencies:
- Spawn a `@Builder` agent with a fresh context window
- Provide: PLAN.md, PATIENT.md, BLUEPRINT.md, CONTEXT.md (if exists), RESEARCH.md (if exists)

Independent plans within the same stage execute sequentially or via agent sub-process.

If `@FlowBuilder` is on the care team and the plan involves n8n workflows or TypeScript interface generation, route to `@FlowBuilder` instead of `@Builder`.

### 3b — Collect Builder Results

For each completed builder:
1. Verify the Handoff Format block was produced
2. Extract the verification script/command from the handoff

### 3c — External Verification Execution

**CRITICAL STEP**: The AI does not simulate verification. Read the `Verification Mode` from the `@Builder` handoff.

**If mode is `automated` or `static`:**
1. Execute the `Verification Command` provided by `@Builder`. If you have a `run_command` tool, run the command and pipe the output to `.forge/REALITY.md`.
2. If you cannot run commands, PAUSE and instruct the attending physician: "Please run `[Verification Command]` and save the output to `.forge/REALITY.md`, then type 'Continue'".

**If mode is `manual`:**
1. PAUSE execution immediately.
2. Present the `Verification Instructions` to the attending physician. 
3. Instruct them: "Please verify this manually as instructed. When complete, write 'PASS' or 'FAIL' along with any notes directly into `.forge/REALITY.md`, then type 'Continue'".

Do not proceed to `@Inspector` until `.forge/REALITY.md` is populated.

### 3d — QA Gate

For each completed task, invoke `@Inspector`:
1. @Inspector reviews against PLAN.md acceptance criteria and the raw output in `.forge/REALITY.md` ONLY.
2. Ensure @Inspector does NOT receive any self-review judgments from @Builder.
3. Results appended to `.forge/qa_report.md`.

**If QA Verdict is PASS or PASS WITH CONDITIONS:**
- Log result in STATE.md
- Conditions must be addressed before next dependent task
- Proceed to next task

**If QA Verdict is FAIL:**
- Route back to builder with specific failures from `.forge/REALITY.md`
- **Dependency Escape Hatch:** If `@Builder` returns `Verdict: ESCALATE (ARCHITECTURE FLAW)`, completely break the fix loop. PAUSE execution immediately. Page the attending physician citing the architectural mismatch/missing dependency and wait for them to resolve it natively (or via `/forge:absorb`) before resuming.
- Maximum 2 fix loops
- After 2 failures: check AUTONOMY.md — if attending page is required for this condition, page now. Otherwise escalate to @Conductor for routing decision.

### 3d — Git Commit (per task)

After each task passes QA, create atomic git commit:
```
forge(XX-YY): [task description]
```

### 3e — Stage Completion

After all plans in the current stage are complete, verified, and committed:
- Update STATE.md with stage completion
- Verify all blocking conditions for the next stage are cleared
- Proceed to next stage

---

## STEP 4 — Phase Verification

After all stages complete:

1. Verify all plans have SUMMARY.md files
2. Verify `qa_report.md` has entries for every task
3. Check all files promised by plans exist

Produce `.forge/phases/XX-phase-name/XX-VERIFY.md`:

```
## Phase [N] Verification

### Plan Results
| Plan | Status | QA Verdict | Fix Loops | Commit |
|:-----|:-------|:-----------|:----------|:-------|
| XX-01 | DONE | PASS | 0 | [hash] |

### Conditions Outstanding
[List any PASS WITH CONDITIONS items still open]

### File Inventory
[All files created or modified, verified to exist]

### Overall: PASS / FAIL
```

---

## STEP 5 — State Update

Invoke `@Conductor` to update STATE.md:
- Mark all tasks DONE
- Log implementation decisions in Decision Log
- Update phase status to COMPLETE
- Set Next Steps based on autonomy level

---

## STEP 6 — Autonomy-Aware Phase Completion

Read AUTONOMY.md and behave accordingly:

**If Full autonomy:**
- Check if next phase has plans ready
- If yes: page attending with phase completion summary, then automatically proceed to next phase unless attending responds within the session
- If no plans ready for next phase: page attending and wait

Page format:
```
📋 UPDATE: Phase [N] complete. [Count] tasks, all QA passed.
Next phase: [N+1] — [Name]. Proceeding automatically unless you intervene.
Type "pause autonomy" to hold before next phase begins.
```

**If Phase-Gated:**
```
🚨 ATTENDING PAGE: Phase [N] complete. Review results and type `/forge:build [N+1]` to continue, or `/forge:verify [N]` for acceptance testing first.
```

**If Task-Gated or Manual:**
```
Phase [N] complete. Type `/forge:verify [N]` for acceptance testing, or `/forge:build [N+1]` to continue.
```

---

## 🛑 HARD STOP CONDITIONS

Stop immediately and page attending (regardless of autonomy level) if:
- @Sentinel finds a Critical security finding mid-build
- A task modifies a function signature used by other modules
- A schema change is required that wasn't in the plan
- More than 2 consecutive tasks fail QA

Do NOT add features, refactors, or improvements not in the plans.
Do NOT proceed to `/forge:audit` automatically.
