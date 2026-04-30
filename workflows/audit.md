# /forge:admit — PATIENT ADMISSION WORKFLOW

**Role:** You are the Master Orchestrator. Your job is to admit a new patient into FORGE with the minimum input required from the attending physician.

This workflow replaces `/forge:init` for v2.0. `/forge:init` remains available for backward compatibility but routes here internally.

---

## STEP 1 — Pre-Admission Check

Before anything else, check:
- Is there an existing `.forge/PATIENT.md` in the current project?
  - If yes: this patient may already be admitted. Read STATE.md and confirm with attending before re-admitting.
- Is there an existing codebase in the working directory?
  - If yes: flag it — @Triage will need to run `/forge:map` as part of intake.

---

## STEP 2 — Triage

Invoke `@Triage` with full Chain of Thought:

1. Codebase detection — run `/forge:map` if codebase exists
2. Focused intake — maximum 7 questions, presented at once
3. PATIENT.md draft production — all inferred fields marked [INFERRED]
4. HEALTH.md draft production — discharge criteria from patient context
5. AUTONOMY.md draft production — autonomy contract from attending preference
6. Admission confirmation — explicit attending sign-off required

**Hard stop inside triage:** Do not proceed past Step 2 until attending confirms PATIENT.md.

---

## STEP 3 — Project Structure Initialization

Invoke `@Project_Initializer` with the confirmed PATIENT.md:

1. Validate PATIENT.md completeness
2. Generate annotated folder structure based on treatment stack
3. Create `.forge/` directory with bootstrapped STATE.md, config.json, PROJECT.md
4. Copy PATIENT.md, HEALTH.md, AUTONOMY.md into `.forge/`

`@Project_Initializer` must output the complete STATE.md content and folder tree before proceeding.

---

## STEP 4 — Domain Research (if applicable)

If `@Scout` is on the care team AND research is not disabled in PATIENT.md:

Invoke `@Scout` to run 4 parallel research tracks:
- Track 1: Stack research
- Track 2: Feature research
- Track 3: Architecture research
- Track 4: Pitfalls research

`@Scout` produces `SUMMARY.md` and track files in `.forge/research/`.

If the attending specified `research: false` during triage, skip this step.

---

## STEP 5 — Care Team Assembly

Invoke `@Team_Assembler` to:

1. Select agent templates from `agents_library/` based on Section 8 of PATIENT.md
2. Hydrate each with project-specific objectives
3. Run and output the Hydration Quality Gate checklist for every agent
4. Save hydrated agents to `.forge/agents/`
5. Load domain config if a Wibx domain is specified in PATIENT.md

**CRITICAL:** Hydration Quality Gate must appear in conversation with PASS/FAIL for every agent before any file is saved.

New agents available for hydration: `@Triage`, `@Monitor`, `@FlowBuilder`.

---

## STEP 6 — Requirements Extraction

From PATIENT.md Sections 5 and 6, produce `.forge/REQUIREMENTS.md`:

```
## v1.0 Requirements
- [REQ-001] [Feature — traced to PATIENT.md Section 5]
- [REQ-002] [Feature]
...

## Future Scope
- [From PATIENT.md Section 9]

## Out of Scope
- [Explicitly excluded items]

## Constraints
- [From PATIENT.md Section 6]
```

Each requirement gets a unique ID for traceability.

---

## STEP 7 — Roadmap Creation

If `@Strategist` is on the care team, invoke them. Otherwise create directly.

Produce `.forge/ROADMAP.md`:

```
## Phase 1: [Name]
Status: PENDING
Requirements: [REQ-IDs]
Description: [What this phase delivers]

## Phase 2: [Name]
Status: PENDING
...
```

Present roadmap to attending for approval before finalizing.

---

## STEP 8 — Autonomy Configuration

Read `.forge/AUTONOMY.md`. Register the autonomy level with @Conductor:

- If **Full**: @Conductor is authorized to drive all handoffs without paging attending, except for conditions defined in AUTONOMY.md
- If **Phase-Gated**: @Conductor pages attending at every phase boundary
- If **Task-Gated**: @Conductor pages attending after every task
- If **Manual**: @Conductor waits for explicit user command at every step

Log the autonomy level in STATE.md. This setting governs all subsequent workflows for this patient.

---

## STEP 9 — State Update

Invoke `@Conductor` to update STATE.md:
- Current Phase: "Admission Complete"
- Overall Status: "ON TRACK"
- Autonomy Level: [from AUTONOMY.md]
- Task Queue: T-001 DONE, T-002 DONE
- Next Steps: based on autonomy level

---

## STEP 10 — Admission Confirmation Summary

Output:

```
🏥 PATIENT ADMITTED
--------------------
Patient: [Project Name]
Domain: [Wibx Domain or None]
Type: [Greenfield / Existing / Migration]
Urgency: [Level]
Autonomy Level: [Level]

Care Team: [Count] agents
[List each agent and one-line objective]

Requirements: [Count] defined
Phases: [Count] in ROADMAP.md
Research: [Completed / Skipped]
Discharge Criteria: [Count] defined in HEALTH.md

Files Created:
- .forge/PATIENT.md
- .forge/HEALTH.md
- .forge/AUTONOMY.md
- .forge/STATE.md
- .forge/REQUIREMENTS.md
- .forge/ROADMAP.md
- .forge/config.json
- .forge/agents/@[Agent].md (for each)
- .forge/research/*.md (if research ran)
```

---

## 🛑 HARD STOP

**If Autonomy Level is Full:**
> "Patient admitted. Treatment plan is ready. The care team will execute autonomously and page you at phase completions and escalations. Type `/forge:rounds` at any time to check patient status, or `/forge:discuss 1` to shape the first phase before treatment begins."

**If Autonomy Level is Phase-Gated or Task-Gated:**
> "Patient admitted. Review the roadmap, then type `/forge:discuss 1` to shape the first phase, or `/forge:plan 1` to start planning directly."

**If Autonomy Level is Manual:**
> "Patient admitted. Review the roadmap and agent files, then type `/forge:discuss 1` to shape the first phase, or `/forge:plan 1` to start planning directly."
