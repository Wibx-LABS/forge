# 🏥 PATIENT HEALTH RECORD

> This file defines the discharge criteria for this project.
> It is produced at admission by `@Triage` and `@Architect`, and owned by `@Conductor`.
> A patient cannot be discharged until every criterion in this file is met.
> Criteria are project-specific — generic pass conditions are not acceptable here.

---

## Patient
- **Project:** [Project Name]
- **Admitted:** [Date]
- **Attending:** [Your name]
- **Last Updated:** [Date — updated by @Conductor on each phase completion]

---

## Discharge Criteria

> Each criterion must be objectively verifiable — no "works correctly" or "looks good."
> @Conductor checks this file before approving any discharge request.

### Code Quality
- [ ] [e.g., "Zero TypeScript errors across all source files"]
- [ ] [e.g., "ESLint passes with zero warnings"]
- [ ] [e.g., "No functions exceed 40 lines"]
- [ ] [e.g., "All functions have type hints and docstrings"]

### Test Coverage
- [ ] [e.g., "QA report shows 100% pass rate across all tasks"]
- [ ] [e.g., "Happy path, sad path, and 2 edge cases covered per feature"]
- [ ] [e.g., "All regression tests pass on affected modules"]

### Security
- [ ] [e.g., "security_audit.md verdict: APPROVED or APPROVED WITH CONDITIONS"]
- [ ] [e.g., "Zero critical security findings open"]
- [ ] [e.g., "No hardcoded secrets in any tracked file"]
- [ ] [e.g., "All environment variables documented in .env.example"]

### Architecture
- [ ] [e.g., "BLUEPRINT.md reflects current system state — no drift"]
- [ ] [e.g., "All modules have defined boundaries per BLUEPRINT.md"]
- [ ] [e.g., "No circular dependencies"]

### Domain-Specific (n8n / NEXUS)
> Remove this section if not applicable.
- [ ] [e.g., "All n8n workflows import without errors"]
- [ ] [e.g., "All workflow nodes have notes"]
- [ ] [e.g., "No parallel fan-outs in any workflow"]
- [ ] [e.g., "All workflow data shapes have corresponding TypeScript interfaces"]
- [ ] [e.g., "executionOrder: v1 present in all workflow settings blocks"]

### Domain-Specific (Antigravity / IDE)
> Remove this section if not applicable.
- [ ] [e.g., "All IDE context files are current and not stale"]
- [ ] [e.g., "PATIENT.md reflects actual project state"]

### User Acceptance
- [ ] [e.g., "UAT.md shows PASS for all Phase N deliverables"]
- [ ] [e.g., "Attending physician has reviewed and signed off"]

### Documentation
- [ ] [e.g., "README.md updated to reflect current features"]
- [ ] [e.g., "BLUEPRINT.md Open Questions section is empty"]
- [ ] [e.g., "STATE.md shows all phases COMPLETE with no open blockers"]

---

## Current Health Status

> Updated by @Conductor after each phase or audit.

| Criterion Group | Status | Last Checked | Notes |
|:----------------|:-------|:-------------|:------|
| Code Quality | ⬜ PENDING | — | — |
| Test Coverage | ⬜ PENDING | — | — |
| Security | ⬜ PENDING | — | — |
| Architecture | ⬜ PENDING | — | — |
| Domain-Specific | ⬜ PENDING | — | — |
| User Acceptance | ⬜ PENDING | — | — |
| Documentation | ⬜ PENDING | — | — |

**Overall Health:** ⬜ NOT DISCHARGE ELIGIBLE

---

## Discharge History

> Log of discharge checks run against this patient.

| Date | Checked By | Result | Blocking Criteria |
|:-----|:-----------|:-------|:------------------|
| — | — | — | — |

---

## Notes

> Any project-specific health context that doesn't fit the criteria above.

[Free text — or "None"]
