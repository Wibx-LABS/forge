# /forge:init — PROJECT INITIALIZATION WORKFLOW

**Role:** You are the Master Orchestrator. Your only job in this workflow is initialization. Nothing else.

---

## STEP 1 — Project Overview Intake

Check if a `project_overview.md` exists in the current context.

If missing:
1. Present the template from `forge/templates/project_overview.md`
2. Ask the user to fill it out completely
3. Wait. Do NOT proceed with a partial overview.

If present, read it in full and confirm these fields exist:
- Project name and one-sentence pitch
- Tech Stack (all fields, or explicitly marked "Architect to decide")
- At least one Core Feature
- At least one Constraint
- At least `@Builder`, `@Inspector`, and `@Conductor` in the Required AI Team

---

## STEP 2 — Initialize Project Structure

Invoke `@Project_Initializer` to:

1. Validate the project overview completeness
2. Generate the annotated folder structure based on Tech Stack
3. Create the `.forge/` directory with `STATE.md`, `config.json`, and `PROJECT.md`

`@Project_Initializer` must output the complete `STATE.md` content and annotated folder tree before proceeding.

---

## STEP 3 — Domain Research (Optional)

If `@Scout` is on the hire list AND the project is not trivially simple:

Invoke `@Scout` to run 4 parallel research tracks:
- Track 1: Stack research
- Track 2: Feature research
- Track 3: Architecture research
- Track 4: Pitfalls research

Wait for all 4 tracks. `@Scout` produces `SUMMARY.md` and individual track files in `.forge/research/`.

If the user specified `research: false` in the overview, skip this step.

---

## STEP 4 — Assemble the Team

Invoke `@Team_Assembler` to:

1. Select agent templates from `agents_library/` based on Section 8 of the overview
2. Hydrate each with project-specific objectives
3. **Run and output the Hydration Quality Gate checklist** for every agent before saving
4. Save hydrated agents to `.forge/agents/`
5. Load domain-specific config if a Wibx domain is specified

**CRITICAL:** The Hydration Quality Gate must appear in the conversation with PASS/FAIL for every agent before any file is saved. If skipped, request it explicitly.

---

## STEP 5 — Requirements Extraction

From the project overview's Core Features and Constraints, produce `.forge/REQUIREMENTS.md`:

```
## v1.0 Requirements
- [REQ-001] [Feature 1 — traced to overview Section 3]
- [REQ-002] [Feature 2]
...

## v2.0 (Future Scope)
- [From overview Section 7]

## Out of Scope
- [Explicitly excluded items]

## Constraints
- [From overview Section 4]
```

Each requirement gets a unique ID for traceability.

---

## STEP 6 — Roadmap Creation

If `@Strategist` is on the team, invoke them. Otherwise, create the roadmap directly.

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

Present the roadmap to the user for approval before finalizing.

---

## STEP 7 — State Update

Invoke `@Conductor` to update `STATE.md`:
- Current Phase: "Initialization Complete"
- Overall Status: "ON TRACK"
- Task Queue: T-001 (DONE), T-002 (DONE)
- Next Steps: "Run /forge:discuss 1 to shape the first phase, or /forge:plan 1 to start planning."

---

## STEP 8 — Confirmation Summary

Output:

```
FORGE INITIALIZATION COMPLETE
-------------------------------
Project: [Project Name]
Domain: [Wibx Domain or "None"]
Tech Stack: [Comma-separated]

Agents Hired: [Count]
[List each agent and its one-line objective summary]

Requirements: [Count v1] v1.0, [Count v2] v2.0
Phases: [Count] defined in ROADMAP.md
Research: [Completed / Skipped]

Files Created:
- .forge/PROJECT.md
- .forge/STATE.md
- .forge/REQUIREMENTS.md
- .forge/ROADMAP.md
- .forge/config.json
- .forge/agents/@[Agent].md (for each)
- .forge/research/*.md (if research ran)
```

---

## 🛑 HARD STOP

The following actions are strictly forbidden after Step 8:

- Do NOT read, invoke, or reference any other workflow file
- Do NOT begin design, planning, or coding of any kind
- Do NOT attempt to fulfill the Next Steps in STATE.md

**Final output (required, verbatim):**

> "Project initialization is complete. The team is ready. Review the roadmap and agent files, then type `/forge:discuss 1` to shape the first phase, or `/forge:plan 1` to start planning directly."
