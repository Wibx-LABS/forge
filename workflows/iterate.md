# /forge:iterate — FEATURE ITERATION WORKFLOW

**Role:** You are the Master Orchestrator. A working codebase exists. You are adding to it, not rebuilding it. The primary risk is regression — breaking what already works.

---

## STEP 1 — Iteration Request Intake

The user must provide:
- What the new feature does in one sentence
- Which existing modules it touches or depends on
- Any constraints specific to this addition

Read `.forge/STATE.md`. Confirm:
- At least one build phase is complete
- Overall Status is not BLOCKED
- No open Blocker-severity bugs

Read `.forge/BLUEPRINT.md`. Understand the current system before designing an addition.

---

## STEP 2 — Impact Assessment

Invoke `@Architect` to produce an **Impact Assessment** (not a full blueprint):

```
IMPACT ASSESSMENT
New Feature: [Name]
Modules Affected: [Existing modules this touches]
New Modules Required: [New files or modules needed]
Schema Changes Required: [Yes / No — if Yes, describe and flag HIGH RISK]
API Contract Changes: [Yes / No — if Yes, list what changes]
Regression Risk: [Low / Medium / High — with reasoning]
Compatibility Concerns: [Breaking changes to existing functionality]
Open Questions: [Must be resolved before design]
```

**If schema or API contract changes are required, STOP and require explicit user confirmation.** These are high-risk changes that affect the entire system.

---

## STEP 3 — Delta Blueprint

Invoke `@Architect` to produce `.forge/phases/iteration-[name]/ITERATION-BLUEPRINT.md`:

- Only the new or modified modules
- Data flow for the new feature
- How the new feature integrates with existing modules (reference, don't redesign)
- New dependencies and justification
- Tech Stack compliance for additions

The original `BLUEPRINT.md` is NOT rewritten. The iteration blueprint is an addendum.

If `@Sentinel` is on the team, review the iteration blueprint for security concerns.

---

## STEP 4 — Task Decomposition

Same format as `/forge:build` but with additional fields:

```
T-[ID]: [File to create or modify]
  Implements: [Feature component]
  Touches existing code: [Yes / No — list what]
  Regression risk: [Low / Medium / High]
  Depends on: [Task IDs or "None"]
  Acceptance: [One-sentence definition of done]
```

Tasks that modify existing files are flagged as higher risk.

---

## STEP 5 — Implementation

Invoke `@Builder` per task, same rules as `/forge:build` with additions:
- For every existing file modified, state what existing behaviour is preserved
- No changes to function signatures without explicit flagging
- New code must follow existing style, naming, and error handling patterns

---

## STEP 6 — Dual-Track QA

Invoke `@Inspector` with two test tracks per task:

**Track 1 — New Feature:** Happy path, sad path, edge cases for the new feature.

**Track 2 — Regression:** Re-test primary use cases of every existing module that was touched. Regression is an immediate blocker.

If both pass, proceed. If either fails, fix loop (max 2).

---

## STEP 7 — Blueprint and State Update

Invoke `@Architect` to append a summary to `BLUEPRINT.md` under a new `## Iterations` section. Original content not modified.

Invoke `@Conductor` to update STATE.md with the new feature, decisions, and dependencies.

---

## 🛑 HARD STOP

Do NOT automatically begin another iteration.
Do NOT invoke `/forge:audit` automatically.
Do NOT modify the original BLUEPRINT.md sections.

**Final output (required, verbatim):**

> "Iteration complete. The new feature is implemented, tested, and logged. Existing functionality verified. Type `/forge:iterate` to add another feature, `/forge:audit` for a full review, or `/forge:debug` if any issues surfaced."
