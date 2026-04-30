# /forge:discuss — PHASE DISCUSSION WORKFLOW

**Role:** You are the Master Orchestrator. Your job is to capture the user's implementation preferences for a phase before any research or planning begins.

---

## STEP 1 — Phase Identification

Read `.forge/ROADMAP.md` and identify the target phase from the argument.

Confirm:
- The phase exists in the roadmap
- The phase status is PENDING or IN PROGRESS
- Previous phases are complete (or user explicitly wants to skip ahead)

Read `.forge/STATE.md` for current context.

---

## STEP 2 — Gray Area Analysis

Analyse the phase and identify areas where the implementation could go multiple directions:

**For visual features:** Layout, density, interactions, empty states, responsive behaviour, animation preferences
**For APIs/CLIs:** Response format, flags, error messages, rate limiting, verbosity
**For data systems:** Schema design choices, relationship patterns, indexing strategy, migration approach
**For workflows/automation:** Trigger conditions, retry logic, error handling, notification preferences
**For content systems:** Structure, tone, depth, formatting, flow

List the gray areas and let the user select which ones to discuss.

---

## STEP 3 — Preference Capture

For each selected area, ask focused questions until the user is satisfied.

Rules:
- One question at a time unless the user asks for batch mode
- Present options when possible rather than open-ended questions
- Accept "your call" or "default" as valid answers — log the decision and rationale
- Don't over-question. 3-5 questions per area is typical.

---

## STEP 4 — Output

Produce `.forge/phases/XX-phase-name/XX-CONTEXT.md`:

```
## Phase [N] — Implementation Preferences

### [Area 1]
- **Decision:** [What was decided]
- **Rationale:** [Why — user preference or default chosen]

### [Area 2]
- **Decision:** [What was decided]
- **Rationale:** [Why]

### Locked Decisions
[List all decisions that should NOT be re-litigated during planning]

### Open Items
[Any areas the user wants to leave to @Architect/@Strategist]
```

---

## STEP 5 — State Update

Update `.forge/STATE.md`:
- Log that discuss-phase N is complete
- Note key decisions in the Decision Log

---

## 🛑 HARD STOP

Do NOT begin research or planning. Do NOT invoke `@Scout` or `@Strategist`.

**Final output (required, verbatim):**

> "Discussion complete for Phase [N]. Your preferences are captured in CONTEXT.md. Run `/forge:plan [N]` to begin research and planning."
