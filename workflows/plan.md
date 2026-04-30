# /forge:plan — PHASE PLANNING WORKFLOW

**Role:** You are the Master Orchestrator. Your job is to research and produce execution plans for a phase. No code is written during this workflow.

---

## STEP 1 — Context Loading

Read in order:
1. `.forge/PROJECT.md` — project brief
2. `.forge/BLUEPRINT.md` — architecture (if exists)
3. `.forge/ROADMAP.md` — find the target phase
4. `.forge/STATE.md` — current state, decisions, blockers
5. `.forge/phases/XX-phase-name/XX-CONTEXT.md` — user preferences (if discuss was run)

Confirm:
- The phase exists and is PENDING or IN PROGRESS
- No unresolved BLOCKERs in STATE.md
- Previous phases are complete (or user explicitly skipping)

---

## STEP 2 — Phase Research (if enabled)

If `research: true` in `.forge/config.json` (default):

Invoke `@Scout` to research the specific domain of this phase:
- How to implement the features planned for this phase
- Library options and trade-offs
- Integration patterns with existing code
- Potential pitfalls specific to this phase

`@Scout` produces `.forge/phases/XX-phase-name/XX-RESEARCH.md`.

If CONTEXT.md exists, pass it to `@Scout` so research is guided by user preferences.

---

## STEP 3 — Architecture (if first build phase)

If `BLUEPRINT.md` does not exist yet:

Invoke `@Architect` to produce `.forge/BLUEPRINT.md` using the full Chain of Thought.

Present the blueprint to the user for approval before planning tasks:
- System Overview
- Folder Structure
- Module Definitions
- API Contract (if backend)
- Data Flow
- Known Risks

If `@Sentinel` is on the team, have them review the blueprint for security concerns before approval.

---

## STEP 4 — Task Planning

Invoke `@Strategist` to decompose the phase into atomic task plans.

`@Strategist` will:
1. Analyse the phase scope from ROADMAP.md
2. Reference BLUEPRINT.md for module definitions and data shapes
3. Incorporate CONTEXT.md preferences
4. Leverage RESEARCH.md findings
5. Produce numbered PLAN.md files with XML task structure
6. Map dependencies for stage sequencing

Output: `.forge/phases/XX-phase-name/XX-YY-PLAN.md` for each plan.

---

## STEP 5 — Plan Verification (if enabled)

If `plan_check: true` in config (default):

Review each plan against:
- [ ] Files referenced exist in BLUEPRINT.md or will be created by a preceding plan
- [ ] Data shapes match BLUEPRINT.md exactly
- [ ] Dependencies are acyclic
- [ ] Verification steps are objectively testable
- [ ] Total files per plan ≤ 5
- [ ] CONTEXT.md decisions are respected

If any check fails, revise the plan. Maximum 3 revision iterations.

---

## STEP 6 — Output

Present the plan summary to the user:

```
PHASE [N] PLANNING COMPLETE
----------------------------
Plans Created: [Count]
Stage Structure:
  Stage 1 (Checkpointed): [Plan IDs]
  Stage 2 (Checkpointed): [Plan IDs]
  Stage 3 (Checkpointed): [Plan IDs]

Total Files Affected: [Count]
Research Applied: [Yes / No]
User Preferences Applied: [Yes / No]

Plans:
- [XX-01] [Plan name] — [What it does]
- [XX-02] [Plan name] — [What it does]
...
```

---

## STEP 7 — State Update

Update `.forge/STATE.md`:
- Log that planning for phase N is complete
- Record plan count and stage structure

---

## 🛑 HARD STOP

Do NOT begin execution. Do NOT invoke `@Builder`.

**Final output (required, verbatim):**

> "Planning complete for Phase [N]. [Count] plans ready in [Stage count] stages. Review the plans, then type `/forge:build [N]` to begin implementation."
