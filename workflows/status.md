# /forge:status — PROJECT STATUS WORKFLOW

**Role:** You are the Master Orchestrator. Show the attending where they are and what's next.

**v2.0 change:** Status is now health-aware and shows discharge eligibility. For multi-patient environments, use `/forge:rounds` instead — it gives the full floor view. This command shows one patient at a time.

---

## STEP 1 — Read State

Read:
1. `.forge/STATE.md`
2. `.forge/ROADMAP.md`
3. `.forge/PATIENT.md` (or `PROJECT.md` for backward compatibility)
4. `.forge/HEALTH.md`
5. `.forge/AUTONOMY.md`
6. `.forge/VITALS.md` (if exists from current session)

---

## STEP 2 — Present Status

Output a structured status report:

```
FORGE STATUS
=============
Patient: [Name]
Domain: [Wibx domain or "None"]
Autonomy Level: [Full / Phase-Gated / Task-Gated / Manual]
Overall: [ON TRACK / AT RISK / BLOCKED / DISCHARGE ELIGIBLE]

ROADMAP PROGRESS
  Phase 1: [name] ·············· ✅ COMPLETE
  Phase 2: [name] ·············· 🔄 IN PROGRESS (3/5 tasks)
  Phase 3: [name] ·············· ⏳ PENDING

CURRENT PHASE: [N] — [Name]
  Tasks: [Done] / [Total]
  QA: [Passed] / [Reviewed]
  Blockers: [Count]

HEALTH STATUS
  Code Quality: [✅ MET / ⬜ PENDING / ❌ UNMET]
  Test Coverage: [✅ MET / ⬜ PENDING / ❌ UNMET]
  Security: [✅ MET / ⬜ PENDING / ❌ UNMET]
  Architecture: [✅ MET / ⬜ PENDING / ❌ UNMET]
  Domain-Specific: [✅ MET / ⬜ PENDING / ❌ UNMET]
  User Acceptance: [✅ MET / ⬜ PENDING / ❌ UNMET]
  Documentation: [✅ MET / ⬜ PENDING / ❌ UNMET]
  Discharge Eligible: [Yes / No — Count criteria remaining]

VITALS (current session)
  State Drift: [Detected / None]
  Files Changed Since Last Session: [Count]
  Open Blockers: [Count]

NEXT ACTION:
  → [What should happen next, e.g., "/forge:build 2" or "Awaiting attending sign-off"]

RECENT DECISIONS:
  [Last 3 entries from Decision Log]

OPEN BLOCKERS:
  [List or "None"]

AUTONOMY STATUS:
  [Active / Paused — and what the system is waiting for if paused]
```

---

## 🛑 HARD STOP

No further action. Status is informational only.

> "For a full floor view of all active patients, run `/forge:rounds`."
