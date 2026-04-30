# /forge:discharge — PATIENT DISCHARGE WORKFLOW

**Role:** You are the Master Orchestrator. Your job is to formally verify a patient meets all discharge criteria and release them from active treatment.

A patient is not discharged because the work feels done. A patient is discharged because every criterion in HEALTH.md is verifiably met and the attending has signed off.

---

## STEP 1 — Discharge Eligibility Pre-Check

Read:
1. `.forge/HEALTH.md` — discharge criteria
2. `.forge/STATE.md` — current project state
3. `.forge/qa_report.md` — cumulative QA results
4. `.forge/security_audit.md` — security audit verdict (if exists)
5. `.forge/phases/` — all phase VERIFY.md and UAT.md files

Confirm before proceeding:
- All phases in ROADMAP.md are marked COMPLETE
- No open BLOCKER-severity items in STATE.md
- `qa_report.md` exists and has entries for all tasks
- Overall Status in STATE.md is not BLOCKED

If any of these fail, report what's missing and stop. Do not run a discharge check on a patient that clearly isn't ready.

---

## STEP 2 — HEALTH.md Criteria Audit

Go through every criterion in HEALTH.md systematically.

For each criterion:
1. Identify the evidence that would satisfy it
2. Locate that evidence in the codebase or artifacts
3. Mark as MET (with evidence location) or UNMET (with what's missing)

Do not self-certify. Every MET criterion needs a citation — a file path, a test result, an artifact.

```
Criterion: [criterion text]
Status: MET / UNMET
Evidence: [file:line or artifact name, or "Missing — [what's needed]"]
```

---

## STEP 3 — Final Security Check

If `security_audit.md` exists:
- Confirm verdict is APPROVED or APPROVED WITH CONDITIONS
- Confirm zero open Critical findings
- Confirm all previously identified blockers are resolved

If `security_audit.md` does not exist and @Sentinel is on the care team:
- Stop. Run `/forge:audit` before discharge. A patient cannot be discharged without a security clearance.

If @Sentinel is not on the care team:
- Log that security audit was not part of this patient's care plan
- Note it in the discharge summary as an acknowledged gap

---

## STEP 4 — Discharge Summary Production

Produce `.forge/DISCHARGE.md`:

```
## Discharge Summary — [Project Name]
Date: [Date]
Attending: [Name]
Discharged By: @Conductor + Attending sign-off

### Treatment Summary
Admitted: [Date]
Phases Completed: [Count]
Total Tasks: [Count]
QA Pass Rate: [%]
Fix Loops Used: [Count]
Security Verdict: [APPROVED / APPROVED WITH CONDITIONS / NOT AUDITED]

### Discharge Criteria Results
| Criterion | Status | Evidence |
|:----------|:-------|:---------|
| [Criterion] | ✅ MET | [Evidence location] |
| [Criterion] | ✅ MET | [Evidence location] |
| [Criterion] | ❌ UNMET | [What's missing] |

### Overall Discharge Status: ELIGIBLE / NOT ELIGIBLE

### Conditions (if APPROVED WITH CONDITIONS)
[List any open items that were accepted by attending as post-discharge cleanup]

### Knowledge Captured
[Patterns, lessons, or decisions from this project worth preserving for future patients]

### Post-Discharge Recommendations
[Any follow-up actions suggested after discharge — monitoring, future phases, tech debt]
```

---

## STEP 5 — Attending Sign-Off

Present the discharge summary to the attending.

If all criteria are MET:
```
✅ DISCHARGE ELIGIBLE
All [Count] criteria met. Review the discharge summary above.
Type "discharge confirmed" to formally discharge this patient.
```

If any criteria are UNMET:
```
❌ NOT DISCHARGE ELIGIBLE
[Count] criteria unmet:
- [List each unmet criterion and what's needed]

Resolve these before discharge. Run the appropriate workflow to address each gap.
```

Do not discharge without explicit attending confirmation — "discharge confirmed" or equivalent.

---

## STEP 6 — State Update and Archive

After attending confirms discharge:

1. Invoke `@Conductor` to update STATE.md:
   - Overall Status: DISCHARGED
   - Discharge Date: [Date]
   - Final phase marked COMPLETE

2. Update HEALTH.md:
   - Mark all criteria as ✅ MET
   - Set Overall Health to: ✅ DISCHARGED

3. Archive the patient:
   - Move `.forge/` contents to `.forge/archive/[discharge-date]/`
   - Keep a slim `.forge/STATE.md` stub so `/forge:rounds` knows this patient exists but is discharged

4. Create atomic git commit:
   ```
   forge(discharge): [Project Name] — all criteria met, patient discharged
   ```

---

## 🛑 HARD STOP

**If discharged:**
> "Patient [Project Name] discharged. All criteria verified. Treatment records archived in `.forge/archive/`. This project is complete."

**If not eligible:**
> "Discharge denied. [Count] criteria unmet. Address the gaps listed above and run `/forge:discharge` again when ready."
