# 🏥 PATIENT INTAKE FORM

> **Instructions:** This file is produced by `@Triage` during `/forge:admit`. 
> Fields marked `[INFERRED]` were auto-populated from codebase analysis — verify before confirming admission.
> Fields marked `[REQUIRED]` must be filled before admission is complete.
> Never leave a field blank. Write `"Architect to decide"` or `"Triage to infer"` if genuinely unknown.

---

## 1. Patient Identity

- **Project Name:** [REQUIRED]
- **One-Sentence Description:** [What does it do and for whom?]
- **Patient Type:** [Greenfield / Existing Codebase / Migration / Prototype]
- **Admitted By:** [Your name]
- **Admission Date:** [Date]
- **Admission Mode:** [Full / Minimal]
- **Wibx Domain:** [NEXUS / Antigravity / Home Configurator / Mobile / Other / None]

---

## 2. Presenting Condition

> What is the reason for admission? What needs to happen for this project?

- **Primary Objective:** [The one thing this project must deliver]
- **Current State:** [What exists today — or "None, greenfield"]
- **Known Issues:** [Bugs, blockers, or pain points already identified — or "None"]
- **Urgency:** [Critical / High / Normal / Low]

---

## 3. Medical History (Existing Codebase Only)

> Skip this section for greenfield projects. Write "N/A — greenfield."

- **Codebase Location:** [INFERRED — path or repo URL]
- **Stack Detected:** [INFERRED — languages, frameworks, runtimes]
- **Architecture Pattern:** [INFERRED — monolith, microservices, n8n workflows, etc.]
- **Known Anti-Patterns:** [INFERRED from /forge:map — or user-provided]
- **Test Coverage:** [INFERRED — estimated % or "Unknown"]
- **Last Active Development:** [INFERRED — date or "Unknown"]

---

## 4. Treatment Stack

> What technologies are in play for this project?

- **Language / Runtime:** [e.g., TypeScript, Python 3.11, Node.js 20]
- **Frontend Framework:** [e.g., React 18, Next.js 14, or "N/A"]
- **Styling / UI Library:** [e.g., Tailwind CSS, Shadcn UI, or "N/A"]
- **Backend / API Layer:** [e.g., FastAPI, Express, or "N/A"]
- **Database:** [e.g., PostgreSQL via Prisma, or "None"]
- **Automation Platform:** [e.g., n8n, GitHub Actions, or "None"]
- **Authentication:** [e.g., Firebase Auth, Custom JWT, or "None"]
- **External APIs / Services:** [e.g., OpenAI, Stripe, or "None"]
- **Hosting / Deployment Target:** [e.g., Vercel, Docker, local only]
- **Package Manager:** [e.g., npm, pip, poetry]

---

## 5. Treatment Plan (Core Features)

> List only what is required for this admission to close. Nice-to-haves go in Section 9.

- **Feature 1:** [Specific, actionable description]
- **Feature 2:** [Specific, actionable description]
- **Feature 3:** [Specific, actionable description]
- **Feature N:** [Add as needed]

---

## 6. Treatment Constraints

> Hard rules the care team must never violate.

- **Coding Standard:** [e.g., "Strict TypeScript. No any types. ESLint enforced."]
- **Dependency Rule:** [e.g., "No new dependencies without explicit approval."]
- **Security Rule:** [e.g., "No hardcoded secrets. All from .env."]
- **Architecture Rule:** [e.g., "Business logic and I/O in separate modules."]
- **Domain Rule:** [Any domain-specific constraint not covered above]
- **Other:** [Licensing, performance, compatibility]

---

## 7. Pre-Existing Decisions

> Already-settled choices. Prevents agents from re-litigating.

- **Decision 1:** [e.g., "We use PostgreSQL. Final."]
- **Decision 2:** [e.g., "Brand guidelines in brand.md must be followed."]
- **Decision N:** [Add as needed, or "None — greenfield."]

---

## 8. Required Care Team

> Check only agents whose work is required for this admission.

- [ ] `@Triage` — Always required for admission
- [ ] `@Architect` — Required if system has more than one module
- [ ] `@Builder` — Required for all implementation work
- [ ] `@Sentinel` — Required if handling user data, secrets, auth, or external APIs
- [ ] `@Inspector` — Required for all projects
- [ ] `@Conductor` — Required for all projects
- [ ] `@Monitor` — Required for all projects with ongoing development
- [ ] `@Scout` — Required if domain research is needed before planning
- [ ] `@Strategist` — Required for multi-phase projects
- [ ] `@Debugger` — Required if iterating on existing codebase
- [ ] `@FlowBuilder` — Required for n8n workflow development or typed system conversion
- [ ] `@[Custom Agent]` — [Describe if adding a non-standard agent]

---

## 9. Future Scope (Out of This Admission)

> Intentionally deferred. Prevents scope creep.

- [e.g., "Multi-tenant support"]
- [e.g., "Mobile responsive version"]
- [Write "None defined yet" if unknown]

---

## 10. Autonomy Configuration

> Defines how much the care team can do without paging the attending physician.
> Full details live in `AUTONOMY.md` — this is the summary reference.

- **Autonomy Level:** [Full / Phase-Gated / Task-Gated / Manual]
- **Page Me When:** [e.g., "Phase completions, failures after 2 loops, security findings"]
- **Never Proceed Without Me:** [e.g., "Schema changes, API contract changes, dependency additions"]
- **AUTONOMY.md Location:** `.forge/AUTONOMY.md`

---

## 11. Discharge Criteria

> Explicit, measurable conditions that define when this patient is healthy and done.
> Full details live in `HEALTH.md` — this is the summary reference.

- **Primary Discharge Condition:** [e.g., "All v1.0 features implemented and UAT verified"]
- **Quality Gate:** [e.g., "Zero critical security findings, QA pass rate 100%"]
- **Domain-Specific Gate:** [e.g., "All n8n workflows import cleanly, all nodes typed"]
- **HEALTH.md Location:** `.forge/HEALTH.md`

---

## 12. Current Status and First Action

- **Admission Status:** [PENDING CONFIRMATION / ADMITTED / IN TREATMENT / DISCHARGE ELIGIBLE]
- **First Action Post-Admission:** [e.g., "@Architect to design system structure"]
- **Deadline or Time Constraint:** [e.g., "MVP in 2 weeks" or "None"]
