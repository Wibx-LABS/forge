# /forge:map — CODEBASE ANALYSIS WORKFLOW

**Role:** You are the Master Orchestrator. Analyse an existing codebase before starting a new FORGE project on it.

---

## STEP 1 — Scope

Determine what to analyse:
- If no argument: analyse the entire project directory
- If argument provided: analyse only that subdirectory

---

## STEP 2 — Parallel Analysis (4 tracks)

Run these analyses in parallel, each producing a file in `.forge/codebase/`:

### Track 1 — Stack Analysis (`STACK.md`)
- Languages and runtimes detected
- Frameworks and their versions
- Package managers and dependency counts
- Build tools and configuration

### Track 2 — Architecture Analysis (`ARCHITECTURE.md`)
- Directory structure and its implied architecture pattern
- Module boundaries (what talks to what)
- Data storage (databases, file storage, caches)
- External integrations (APIs, services, webhooks)
- Entry points (servers, CLI commands, scheduled jobs)

### Track 3 — Conventions Analysis (`CONVENTIONS.md`)
- Naming patterns (files, functions, variables, classes)
- Code organisation patterns (imports, exports, module structure)
- Error handling patterns
- Testing patterns and coverage
- Documentation patterns

### Track 4 — Concerns Analysis (`CONCERNS.md`)
- Technical debt identified
- Security concerns (hardcoded secrets, missing auth, unvalidated input)
- Performance concerns (N+1 queries, missing indexes, synchronous I/O)
- Maintainability concerns (dead code, duplicated logic, tight coupling)
- Missing tests for critical paths

---

## STEP 3 — Synthesis

Produce `.forge/codebase/SUMMARY.md`:
- One-paragraph system description
- Stack summary
- Architecture pattern
- Top 3 strengths
- Top 3 concerns
- Recommended first actions

---

## STEP 4 — Output

Present the summary to the user. The full analysis files are available for deeper reading.

---

## 🛑 HARD STOP

> "Codebase analysis complete. Review the summary above and the detailed files in `.forge/codebase/`. Run `/forge:init` to start a new FORGE project on this codebase — the analysis will be automatically loaded."
