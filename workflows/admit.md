# /forge:admit — PATIENT ADMISSION WORKFLOW

**Role:** You are the Master Orchestrator. Your job is to admit a new patient under the v2.0 hospital model. This is the primary entry point for all new projects.

This workflow supersedes `/forge:init`. If invoked via `/forge:init`, you are already here — proceed normally.

---

## STEP 1 — Triage Intake

Invoke `@Triage` to conduct admission intake.

@Triage will:
1. Ask the attending up to 7 targeted questions (no more)
2. If an existing codebase is present, run `/forge:map` automatically to analyse it
3. Produce three files:
   - `PATIENT.md` — patient intake form (complete)
   - `HEALTH.md` — discharge criteria matched to this project
   - `AUTONOMY.md` — autonomy contract with level set

Do not proceed until all three files exist and are confirmed non-empty.

Present the three files to the attending for review:
```
@Triage intake complete. Please review:
- PATIENT.md — your project intake form
- HEALTH.md — proposed discharge criteria
- AUTONOMY.md — autonomy level and page conditions

Confirm or request corrections before initialization begins.
```

Wait for attending confirmation.

---

## STEP 2 — Initialize Project

Invoke `@Project_Initializer` with the confirmed PATIENT.md, HEALTH.md, and AUTONOMY.md.

@Project_Initializer will:
1. Validate all required fields in PATIENT.md
2. Generate the full annotated folder structure for this patient
3. Bootstrap `STATE.md` with autonomy level and health tracking
4. Create `config.json` at version 2.0.0
5. Copy and alias PATIENT.md, HEALTH.md, AUTONOMY.md into `.forge/`

@Project_Initializer must output the complete folder tree and file list before proceeding.

---

## STEP 3 — Domain Research

Read Section 8 of PATIENT.md to check if `@Scout` is on the care team.

If `@Scout` is listed AND the project is not trivially simple:

Invoke `@Scout` to run 4 parallel research tracks:
- Track 1: Stack research — libraries, frameworks, ecosystem
- Track 2: Feature research — how comparable features are implemented
- Track 3: Architecture research — patterns, trade-offs, precedents
- Track 4: Pitfalls research — known failure modes, gotchas, CVEs

Wait for all 4 tracks. `@Scout` produces `SUMMARY.md` and individual track files in `.forge/research/`.

If `@Scout` is not on the team, skip this step and log it.

---

## STEP 4 — Assemble the Care Team

Invoke `@Team_Assembler` to:

1. Read Section 8 of PATIENT.md for the confirmed agent roster
2. Source templates from `agents_library/` for each agent
3. Read AUTONOMY.md and extract the autonomy context
4. Hydrate each agent with project-specific objectives and autonomy context
5. **Run and output the Hydration Quality Gate checklist** for every agent before saving
6. Save hydrated agents to `.forge/agents/`
7. Load domain-specific config if a Wibx domain is specified in PATIENT.md Section 1

**CRITICAL:** The Hydration Quality Gate must appear in the conversation with explicit PASS/FAIL for every check before any file is saved. If a check FAIL appears, rewrite and re-check. Do not save until all agents show all PASS.

---

## STEP 5 — Requirements Extraction

From PATIENT.md Section 5 (Features) and Section 6 (Constraints), produce `.forge/REQUIREMENTS.md`:

```
## v1.0 Requirements
- [REQ-001] [Feature — traced to PATIENT.md Section 5]
- [REQ-002] [Feature]
...

## v2.0 (Future Scope)
- [From PATIENT.md Section 7 if present]

## Out of Scope
- [Explicitly excluded items]

## Constraints
- [From PATIENT.md Section 6]
```

Each requirement gets a unique REQ-NNN ID for traceability.

---

## STEP 6 — Roadmap Creation

If `@Strategist` is on the care team, invoke them. Otherwise, create the roadmap directly.

Produce `.forge/ROADMAP.md`:

```
## Phase 1: [Name]
Status: PENDING
Requirements: [REQ-001, REQ-002]
Description: [What this phase delivers]

## Phase 2: [Name]
Status: PENDING
Requirements: [REQ-003]
Description: [What this phase delivers]

...
```

Present the roadmap to the attending for approval.

> "Review the roadmap and confirm. Type 'roadmap confirmed' to proceed, or describe any changes."

Wait for attending confirmation before finalizing.

---

## STEP 7 — State Update and Autonomy Orientation

Invoke `@Conductor` to update `STATE.md`:
- Current Phase: "Admission Complete"
- Overall Status: "ON TRACK"
- Autonomy Level: [from AUTONOMY.md]
- Task Queue: T-001 "Triage" (DONE), T-002 "Initialization" (DONE), T-003 "Team Assembly" (DONE), T-004 "Roadmap" (DONE)
- Next Steps: based on autonomy level (see below)

---

## STEP 8 — Autonomy-Aware Handoff

Read AUTONOMY.md and behave accordingly:

**If Full autonomy:**
```
📋 ADMISSION COMPLETE — [Project Name]

Patient is admitted and care team is operational.
Autonomy: Full — I will drive treatment automatically.

Beginning Phase 1: [Name] now.
I will page you at: [Page conditions from AUTONOMY.md]
Type "pause autonomy" at any time to hold before the next step.
```
→ Immediately invoke `/forge:plan 1` to begin treatment.

**If Phase-Gated:**
```
🚨 ATTENDING PAGE — [Project Name] admitted.

Autonomy: Phase-Gated — your confirmation is required before each phase begins.
Review the roadmap and type `/forge:discuss 1` or `/forge:plan 1` to start Phase 1.
```

**If Task-Gated or Manual:**
```
ADMISSION COMPLETE — [Project Name]

Autonomy: [Task-Gated / Manual] — I will wait for your direction at each step.
Review the roadmap and agents, then type `/forge:discuss 1` to begin Phase 1.
```

---

## STEP 9 — Confirmation Summary

Output the admission summary regardless of autonomy level:

```
FORGE ADMISSION COMPLETE
------------------------
Patient: [Project Name]
Type: [Greenfield / Existing / Migration]
Domain: [Wibx Domain or "None"]
Treatment Stack: [Comma-separated]
Autonomy Level: [Level]
Discharge Criteria: [Count] defined

Care Team:
- @[AgentName] — [one-line objective summary]
(repeat for each agent)

Requirements: [Count v1] v1.0, [Count] future scope
Phases: [Count] defined in ROADMAP.md
Research: [Completed / Skipped]

Files Created:
- .forge/PATIENT.md — patient intake form
- .forge/PROJECT.md — backward compatibility alias
- .forge/HEALTH.md — discharge criteria
- .forge/AUTONOMY.md — autonomy contract
- .forge/STATE.md — project state bootstrapped
- .forge/ROADMAP.md — phase plan
- .forge/REQUIREMENTS.md — traced requirements
- .forge/config.json — workflow configuration (v2.0.0)
- .forge/agents/@[Agent].md (for each hired agent)
- .forge/research/*.md (if research ran)
```

---

## 🛑 HARD STOP (non-Full autonomy)

The following actions are strictly forbidden after Step 9 unless autonomy is Full:

- Do NOT begin design, planning, architecture, or coding
- Do NOT invoke any build or plan workflows unsolicited
- Do NOT attempt to fulfill the Next Steps in STATE.md

**Final output (non-Full autonomy, required verbatim):**

> "Patient admitted. The care team is ready. Review the roadmap and agent files, then type `/forge:discuss 1` to shape Phase 1, or `/forge:plan 1` to start planning directly."
