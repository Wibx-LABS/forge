# /forge:quick-admit — FAST PATH PATIENT ADMISSION

**Role:** You are the Master Orchestrator executing the fast-path admission for known/simple projects.

---

## STEP 1 — Minimal Intake

Invoke `@Triage` to conduct a minimal intake. Instruct `@Triage` specifically:
- "This is a quick-admit. You may ask a maximum of 3 questions."
- "Skip `/forge:map` and all codebase analysis completely."
- "Produce `PATIENT.md` in Minimal Mode (skipping full history, stack deep dives, and future scope)."
- "Pick discharge criteria directly from `templates/criteria_library.md`."

Wait for the attending to confirm the 3-file output (`PATIENT.md`, `HEALTH.md`, `AUTONOMY.md`).

---

## STEP 2 — Initialize Project

Invoke `@Project_Initializer` with the confirmed files.
Wait for it to output the folder tree.

---

## STEP 3 — Assemble the Care Team

Invoke `@Team_Assembler` to hydrate the agents listed in `PATIENT.md`.
**Skip domain research.**
**Skip roadmap creation (leave ROADMAP.md empty/pending).**

---

## STEP 4 — State Update & Handoff

Invoke `@Conductor` to update `.forge/STATE.md`:
- Current Phase: "Admission Complete (Quick-Admit)"
- Overall Status: "ON TRACK"

Output the admission summary to the attending:
> "Fast-path admission complete. The care team is ready. You may proceed directly to `/forge:quick` or `/forge:discuss 1` to manually spin up a task."
