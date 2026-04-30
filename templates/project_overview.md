# 🎯 PROJECT OVERVIEW

> **Instructions:** Fill every field. If genuinely undecided, write `"Architect to decide"` or `"User to confirm"` — never leave blank. Blank fields cause agents to make assumptions that cost time later. The more specific you are here, the less the AI team needs to ask.

---

## 1. Project Identity

- **Project Name:** [e.g., "Chronos Task Manager"]
- **One-Sentence Pitch:** [What does it do and for whom?]
- **Target Audience:** [Who uses this? Be specific.]
- **Success Criteria:** [How do you know v1.0 is done? Measurable conditions.]
- **Wibx Domain:** [NEXUS / Webview / Home Configurator / Mobile / Other — determines which domain module loads]

---

## 2. Technical Stack

> Do not leave these blank. `@Architect` cannot decide your hosting budget, existing infrastructure, or language preference.

- **Language / Runtime:** [e.g., Python 3.11, Node.js 20, Go 1.22]
- **Frontend Framework:** [e.g., React 18, Next.js 14, Vue 3, or "N/A"]
- **Styling / UI Library:** [e.g., Tailwind CSS, Shadcn UI, or "N/A"]
- **Backend / API Layer:** [e.g., FastAPI, Express, Django REST, or "N/A"]
- **Database:** [e.g., PostgreSQL via Prisma, SQLite, MongoDB, or "None"]
- **Authentication:** [e.g., Firebase Auth, Custom JWT, or "None"]
- **External APIs / Services:** [e.g., OpenWeatherMap, Stripe, S3, or "None"]
- **Hosting / Deployment Target:** [e.g., Vercel, AWS EC2, Docker, local only]
- **Package Manager / Build Tool:** [e.g., pip, npm, poetry, or "Architect to decide"]
- **Automation Platform:** [e.g., n8n, GitHub Actions, or "None"]

---

## 3. Core Features (The MVP)

> List only what is required for v1.0. Nice-to-haves go in Section 7.

- **Feature 1:** [Specific, actionable description]
- **Feature 2:** [Specific, actionable description]
- **Feature 3:** [Specific, actionable description]
- **Feature N:** [Add more as needed]

---

## 4. Strict Project Constraints

> Hard rules the AI team must never violate. Vague constraints get ignored.

- **Coding Standard:** [e.g., "Strict PEP 8. Type hints on all functions. No `any` types."]
- **Dependency Rule:** [e.g., "Standard library only where possible."]
- **Security Rule:** [e.g., "No hardcoded secrets. All from `.env` via `python-dotenv`."]
- **Formatting Rule:** [e.g., "Docstrings on every function. Google-style format."]
- **Architecture Rule:** [e.g., "Business logic and I/O in separate modules."]
- **Other Constraints:** [Licensing, performance, compatibility requirements]

---

## 5. Pre-Existing Decisions

> Already-settled choices. Prevents agents from re-litigating.

- **Decision 1:** [e.g., "We use PostgreSQL, not MongoDB. This is final."]
- **Decision 2:** [e.g., "The brand guidelines in `brand_guidelines.md` must be followed for all UI."]
- **Decision 3:** [Add more, or "None — greenfield project."]

---

## 6. Known Anti-Patterns to Avoid

> What has been tried and rejected? What is explicitly off-limits?

- [e.g., "Do not use parallel fan-outs in n8n. Causes exponential duplication."]
- [e.g., "Do not use `requests-cache`. Caused issues previously."]
- [Write "None" if fresh start.]

---

## 7. Future Scope (Out of v1.0)

> Intentionally deferred features. Prevents scope creep.

- [e.g., "Multi-tenant support."]
- [e.g., "Mobile responsive version."]
- [Write "None defined yet" if unknown.]

---

## 8. Required AI Team

> Check only agents whose work is required for v1.0.

- [ ] `@Architect` — Required if the system has more than one module or file.
- [ ] `@Builder` — Required for all implementation work.
- [ ] `@Sentinel` — Required if handling user data, secrets, auth, or external APIs.
- [ ] `@Inspector` — Required for all projects.
- [ ] `@Conductor` — Required for all projects.
- [ ] `@Scout` — Required if domain research is needed before planning.
- [ ] `@Strategist` — Required for multi-phase projects.
- [ ] `@Debugger` — Required if iterating on existing codebase.
- [ ] `@[Custom Agent]` — [Describe if adding a non-standard agent.]

---

## 9. Existing Codebase

> Fill this if you're iterating on existing code, not starting fresh.

- **Codebase Location:** [Path or repo URL, or "N/A — new project"]
- **Current State:** [What works, what's broken, what's missing]
- **Run `/forge:map` first?** [Yes / No — recommended for existing codebases]

---

## 10. Current Status and First Action

- **Status:** [e.g., "Brand new, no files" or "Existing codebase needs new feature"]
- **First Action Post-Setup:** [e.g., "Have @Architect design the system structure"]
- **Deadline or Time Constraint:** [e.g., "MVP in 2 weeks" or "No deadline"]
