# /forge:rounds — WARD ROUNDS WORKFLOW

**Role:** You are the Master Orchestrator. Your job is to give the attending physician a complete floor view of all active patients before they decide where to spend their time.

This is an observation workflow. No treatment is started. No agents are invoked beyond @Monitor. The attending reads the briefing and decides what happens next.

---

## STEP 1 — Patient Census

Scan for all active FORGE projects:
- Check the current working directory for `.forge/STATE.md`
- Check any sibling directories if a multi-project workspace is configured in `.forge/config.json`
- Build a list of all active patients

If no active patients are found, report and stop.

---

## STEP 2 — Per-Patient Vitals

For each active patient, invoke `@Monitor` to produce or refresh `VITALS.md`:

- If VITALS.md already exists from this session (same day): use it as-is
- If VITALS.md is stale (previous session): refresh it now

Run @Monitor per patient. If multiple patients are active, run in parallel.

---

## STEP 3 — Immediate Escalations

Before producing the full briefing, check all VITALS.md files for escalation flags:

Escalation conditions (from @Monitor):
- Critical source files missing
- Hardcoded secrets detected
- STATE.md shows BLOCKED with no resolution path
- More than 30% of expected files missing or unexpectedly modified
- Dependency with critical CVE detected

If any escalations exist, surface them at the top of the briefing before anything else. These require attending decision before rounds continue.

---

## STEP 4 — Floor Briefing

Produce the consolidated rounds report:

```
🏥 WARD ROUNDS — [Date] [Time]
================================
Active Patients: [Count]
Escalations Requiring Immediate Attention: [Count — list if > 0]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚨 IMMEDIATE ESCALATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[List each escalation with patient name and description, or "None"]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PATIENT FLOOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🟢 / 🟡 / 🔴 [Patient Name]
Domain: [Wibx Domain or None]
Phase: [Current phase and status]
Health: [ON TRACK / AT RISK / DEGRADING / DISCHARGE ELIGIBLE]
Autonomy: [Level]
Open Blockers: [Count]
Last Activity: [Timestamp]

Since Last Session:
  Files Changed: [Count]
  State Drift: [Yes / No]
  Dependencies Changed: [Yes / No]

Current Task: [Active task or "Between phases"]
Next Milestone: [Next phase completion or discharge]

Attending Action Required: [Yes / No — describe if yes]

---
[Repeat for each patient]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FLOOR SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
On Track: [Count]
At Risk: [Count]
Degrading: [Count]
Discharge Eligible: [Count]
Blocked: [Count]

Suggested Focus Today:
  1. [Patient name] — [reason, e.g., "awaiting phase sign-off"]
  2. [Patient name] — [reason, e.g., "blocker needs attending decision"]
  3. [Patient name] — [reason, e.g., "discharge eligible, final sign-off needed"]
```

---

## STEP 5 — Autonomy Resume Check

For each patient with Full autonomy that is not blocked and has no attending action required:

Check if autonomous execution was in progress when the last session ended:
- If yes: confirm with attending whether to resume autonomous execution
- If no: no action needed

Output per patient:
```
[Patient Name]: Autonomous execution [was / was not] in progress.
[Resume? (yes/no)] — waiting for attending confirmation.
```

Only surfaces this for Full autonomy patients. Phase-Gated, Task-Gated, and Manual patients always wait for explicit commands.

---

## 🛑 HARD STOP

No treatment is started from this workflow. No agents beyond @Monitor are invoked.

After presenting the briefing:

> "Rounds complete. [Count] patients on the floor. [Count] requiring your attention today. Use `/forge:build`, `/forge:debug`, `/forge:discharge`, or any other workflow to begin treatment on a specific patient."
