# FORGE

```
 /$$$$$$$$ /$$$$$$  /$$$$$$$   /$$$$$$  /$$$$$$$$
| $$_____//$$__  $$| $$__  $$ /$$__  $$| $$_____/
| $$     | $$  \ $$| $$  \ $$| $$  \__/| $$
| $$$$$  | $$  | $$| $$$$$$$/| $$ /$$$$| $$$$$
| $$__/  | $$  | $$| $$__  $$| $$|_  $$| $$__/
| $$     | $$  | $$| $$  \ $$| $$  \ $$| $$
| $$     |  $$$$$$/| $$  | $$|  $$$$$$/| $$$$$$$$
|__/      \______/ |__/  |__/ \______/ |________/
```

Built and maintained by the Wibx Labs team. Internal use only.

**Status:** Operational. Industrial Phase.
**Version:** 3.4.0 (Stable)
**Repository:** [FORGE](https://github.com/Wibx-LABS/forge)
scientist: [Caio Maciel](https://github.com/kvag0)

---

## Why FORGE Exists

Two problems with AI-assisted development at Wibx:

1. **Context rot** — Quality degrades as the AI fills its context window. The 50th file edit in a session is significantly worse than the 1st.
2. **Inconsistency** — Without structured workflows, the same request produces different results depending on how you phrase it, what's in context, and which session you're in.

FORGE solves both. Structured artifacts give every agent exactly what it needs. Fresh context per task prevents degradation. Named agent personas with defined Chain of Thought ensure consistency.

In v2.0, a third problem is solved: **input overhead**. Running multiple projects in parallel with the old system required too much manual driving. The attending physician was spending time operating the system instead of making decisions. The hospital model fixes this — the system runs autonomously and pages you when it genuinely needs a human.

---

## 🛠 Installation

```bash
curl -sSL https://raw.githubusercontent.com/Wibx-LABS/forge/main/install.sh | bash
```

## 🚀 Quick Start: Ignition Workflow

Forge builds a **Contextual Engine** for your AI agents.

### 1. Admission

Run the CLI in your project directory (new or existing):

```bash
forge init
```

### 2. Ignition

Open your project in **Claude Code**, **Cursor**, or **Antigravity** and paste the **Ignition Prompt**:

> "Initialize Forge mode. Read `.forge/PATIENT.md` for our objective and `.forge/AUTONOMY.md` for our rules. Adopt the persona in `.forge/agents/Architect_HYDRATED.md` and check `.forge/STATE.md` to begin Phase 1."

### 3. Orchestration

The agent will now follow the **Chain of Thought** defined in its hydrated template, using the **Institutional DNA** and **Vertical Expertise** injected by the Forge engine.

---

## The Hospital Model

Projects are patients. The attending physician is you.

| Hospital                | FORGE                            |
| :---------------------- | :------------------------------- |
| Admission intake        | `/forge:admit` + @Triage         |
| Initial exams           | `/forge:map` + @Scout research   |
| Diagnosis               | BLUEPRINT.md + ROADMAP.md        |
| Treatment plan          | PLAN.md files                    |
| Medication / procedures | @Builder, @FlowBuilder execution |
| Ongoing monitoring      | @Monitor + VITALS.md             |
| Ward rounds             | `/forge:rounds`                  |
| Discharge criteria      | HEALTH.md                        |
| Discharge               | `/forge:discharge`               |
| Attending physician     | You                              |

The system runs the treatment plan. You get paged when decisions require human judgment — phase completions, escalations, schema changes, security findings. Everything else executes autonomously.

---

## The Three Laws

### 1. The State is Truth

No turn ends without `@Conductor` updating `STATE.md`. If it's not in the state, it didn't happen.

### 2. Physical Artifacts Only

Every phase produces a physical file. `BLUEPRINT.md`, `security_audit.md`, `qa_report.md` — these are your save points. Abstract plans or verbal summaries are not acceptable outputs.

### 3. Hard Stops are Mandatory

Critical decisions always stop for attending confirmation. Routine execution does not. AUTONOMY.md defines the boundary between the two.

---

## The Agent Team

### Core Agents (`/agents_library`)

| Agent          | Role                                                                             | Primary Output                           |
| :------------- | :------------------------------------------------------------------------------- | :--------------------------------------- |
| `@Triage`      | Admission intake specialist. Auto-fills PATIENT.md from codebase analysis.       | `PATIENT.md`, `HEALTH.md`, `AUTONOMY.md` |
| `@Architect`   | System design, module boundaries, data flow, API contracts                       | `BLUEPRINT.md`                           |
| `@Builder`     | Translates plans into production code. Self-review before handoff.               | Source files                             |
| `@FlowBuilder` | n8n workflow design, import validation, TypeScript interface extraction          | Workflow JSON, `.types.ts` files         |
| `@Sentinel`    | Security audit, blocker verification, OWASP scan                                 | `security_audit.md`                      |
| `@Inspector`   | QA: happy path, sad path, edge cases. Regression testing.                        | `qa_report.md`                           |
| `@Conductor`   | Owns `STATE.md`. Drives autonomous execution. Validates QA and health artifacts. | Updated `STATE.md`, `HEALTH.md`          |
| `@Monitor`     | Session-start observation. Detects drift, surfaces changes, produces vitals.     | `VITALS.md`                              |
| `@Scout`       | Domain research. Investigates stack, features, architecture, pitfalls.           | Research artifacts                       |
| `@Strategist`  | Plans phases into atomic tasks. Verification steps built in.                     | `PLAN.md` files                          |
| `@Debugger`    | Root cause isolation. Surgical fixes. One bug per run.                           | Fixed source files                       |

### Setup Agents (`/setup_agents`)

| Agent                  | Role                                                                                                 |
| :--------------------- | :--------------------------------------------------------------------------------------------------- |
| `@Project_Initializer` | Validates PATIENT.md, scaffolds folders, bootstraps STATE.md and v2.0 artifact stubs                 |
| `@Team_Assembler`      | Selects templates, hydrates with project-specific objectives, injects autonomy context, quality gate |

---

## Workflow Pipeline

### Core Commands

| Command                          | Purpose                                                            |
| :------------------------------- | :----------------------------------------------------------------- |
| `/forge:admit`                   | Admit a new patient: triage → research → team → roadmap            |
| `/forge:quick-admit`             | Fast path admission: bypasses research, map, and extensive setup   |
| `/forge:rounds`                  | Ward rounds: full floor view of all active patients                |
| `/forge:discuss <N>`             | Capture implementation preferences for a phase                     |
| `/forge:plan <N>`                | Research → architecture → task plans for phase N                   |
| `/forge:build <N>`               | Execute all plans (stage-sequenced) with QA gates — autonomy-aware |
| `/forge:verify <N>`              | User acceptance testing for phase N                                |
| `/forge:iterate`                 | Add feature to existing codebase with impact assessment            |
| `/forge:absorb`                  | Analyze and absorb manual state drift into a Ghost Plan            |
| `/forge:patch <desc>`            | Fast-track a micro code edit, bypassing heavy QA and planning      |
| `/forge:audit`                   | Full security + quality review                                     |
| `/forge:debug`                   | Isolate and fix one specific bug — accepts stack traces            |
| `/forge:discharge`               | Formal discharge check against HEALTH.md                           |
| `forge deploy`                   | Execute unified CI/CD deployment pipeline (Handoff Gate)           |
| `/forge:ship <N>`                | Generate PR from verified phase work                               |
| `/forge:quick`                   | Ad-hoc task with FORGE guarantees                                  |
| `/forge:status`                  | Single-patient status with health and discharge eligibility        |
| `/forge:pause` / `/forge:resume` | Session persistence                                                |
| `/forge:map`                     | Analyse existing codebase (4-track parallel)                       |
| `/forge:help`                    | All commands                                                       |
| `/forge:init`                    | Legacy alias for `/forge:admit` (backward compatible)              |

### Workflow Sequence

```
New patient (Full autonomy):
/forge:admit → autonomous execution → pages at phase completions → /forge:discharge

New patient (Phase-Gated):
/forge:admit → /forge:discuss 1 → /forge:plan 1 → /forge:build 1
→ [page] → /forge:verify 1 → /forge:ship 1 → /forge:discuss 2 → ...

Daily workflow (multi-project):
/forge:rounds → decide focus → resume treatment on chosen patient

Bug resolution:
/forge:debug → resumes treatment automatically (Full autonomy)
           → hard stop (all other levels)
```

### Stage Sequencing Model

Plans are grouped by dependency into sequential stages. All plans in Stage 1 must be fully built and externally verified before Stage 2 begins. The value is strict dependency discipline, not parallelism.

```
┌────────────────────────────────────────────────────────────┐
│  PHASE EXECUTION                                           │
├────────────────────────────────────────────────────────────┤
│                                                            │
│    STAGE 1 (Checkpointed)    STAGE 2 (Checkpointed) STAGE 3│
│  ┌─────────┐ ┌─────────┐  ┌─────────┐ ┌─────────┐ ┌─────┐│
│  │ Plan 01 │ │ Plan 02 │→ │ Plan 03 │ │ Plan 04 │→│ 05  ││
│  │@Build / │ │@Build / │  │ @Build  │ │@FlowBld │ │@Bld ││
│  │@FlowBld │ │@FlowBld │  └────┬────┘ └────┬────┘ └──┬──┘│
│  └────┬────┘ └────┬────┘       │           │          │   │
│       ▼           ▼            ▼           ▼          ▼   │
│  @Inspector  @Inspector   @Inspector  @Inspector @Inspect │
│  (Ext. QA)   (Ext. QA)    (Ext. QA)   (Ext. QA)  (QA)    │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

---

## Token Economy

Forge uses a Token Economy Architecture to prevent context rot and optimize costs.
- **Artifact Compression**: Inter-agent artifacts use formats like `caveman-lite`, `caveman-review`, and `cavecrew-investigator` to remove filler words and prose bloat, preserving the context window for actual execution logic. Target compression is 30-35% size reduction for `STATE.md`.
- **Model Routing**: Configure `model_routing` in `AUTONOMY.md` to route complex planning/debugging to premium models (Claude) and routine execution to reduced-cost models (GLM via z.ai). See `docs/COST_OPTIMIZATION.md` for details.

---

## Autonomy Levels

Set per patient in `AUTONOMY.md`. Cannot be changed globally — each patient has its own contract.

| Level           | Behavior                                                                                       | Best For                                                     |
| :-------------- | :--------------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| **Full**        | System executes entire treatment plan. Pages only on failures, escalations, phase completions. | Established codebases, trusted domain, experienced attending |
| **Phase-Gated** | Autonomous within a phase. Stops and pages at every phase boundary.                            | New domains, moderate oversight needed                       |
| **Task-Gated**  | One task at a time. Pages after every task for approval.                                       | High-risk changes, unfamiliar codebase                       |
| **Manual**      | No autonomous execution. Equivalent to FORGE 1.0 behavior.                                     | Maximum control, learning the system                         |

Mid-session override: type `"pause autonomy"` to temporarily switch to Manual. Type `"resume autonomy"` to restore the configured level.

---

## Project Structure

### Framework Files

```
forge/
├── agents_library/              # Master agent templates — never modified per project
│   ├── Architect_Template.md
│   ├── Builder_Template.md
│   ├── Conductor_Template.md    # v2.0 — autonomy-aware
│   ├── Debugger_Template.md
│   ├── FlowBuilder_Template.md  # v2.0 — new
│   ├── Inspector_Template.md
│   ├── Monitor_Template.md      # v2.0 — new
│   ├── Sentinel_Template.md
│   ├── Scout_Template.md
│   ├── Strategist_Template.md
│   └── Triage_Template.md       # v2.0 — new
│
├── setup_agents/                # One-time initialization agents
│   ├── Project_Initializer.md   # v2.0 — updated
│   └── Team_Assembler.md        # v2.0 — updated
│
├── workflows/                   # Slash command definitions
│   ├── admit.md                 # v2.0 — new (replaces init as primary)
│   ├── absorb.md                # v2.0 — new
│   ├── patch.md                 # v2.0 — new (fast-track)
│   ├── audit.md
│   ├── build.md                 # v2.0 — updated (autonomy-aware)
│   ├── debug.md                 # v2.0 — updated (stack trace intake)
│   ├── discharge.md             # v2.0 — new
│   ├── discuss.md
│   ├── help.md
│   ├── init.md                  # Legacy — routes to admit.md
│   ├── iterate.md
│   ├── map.md
│   ├── pause.md
│   ├── plan.md
│   ├── quick.md
│   ├── resume.md
│   ├── rounds.md                # v2.0 — new
│   ├── ship.md
│   ├── status.md                # v2.0 — updated (health-aware)
│   └── verify.md
│
├── knowledge/                   # Institutional DNA — Master guidelines and standards
│   └── Brand_Guidelines.md      # Master WiBX design system and brand logic
│
├── domains/                     # Vertical Expertise — Project-specific logic and context
│   └── nexus/
│       └── domain_config.md
│
├── templates/                   # Artifact templates
│   ├── AUTONOMY.md              # v2.0 — new
│   ├── HEALTH.md                # v2.0 — new
│   ├── PATIENT.md               # v2.0 — new (replaces project_overview.md)
│   └── project_overview.md      # Legacy — preserved for backward compatibility
│
└── README.md
```

---

## The Zero-Config Engine (v3.0)

Forge 3.0 is designed for frictionless, industrial-grade onboarding. The CLI is now "self-aware."

### 🏠 Automatic Root Detection

You no longer need to set `FORGE_HOME`. The CLI automatically traces its own path back to the Forge core, making it truly portable within your environment.

### 🏹 The Brand Hunter

When you initialize a project, the engine executes a recursive search for the **WiBX DNA** (`Brand_Guidelines.md`). It searches in this order:

1. **Local Project**: Custom guidelines for the specific patient.
2. **Knowledge Base**: Master institutional guidelines in `knowledge/`.
3. **Docs/Parent Folders**: Any intermediate documentation.

This ensures every project is born with the correct WiBX identity (Neon Green accents, Red Hat Display typography, and Premium Dark Mode).

### 🧠 DNA vs. Expertise

- **`knowledge/`**: Stores **Institutional DNA**. Things that apply to every project (Brand, Security, Style).
- **`domains/`**: Stores **Vertical Expertise**. Things that only matter for specific types of projects (n8n logic, Banking schemas, etc).

---

## Unified Deployment Pipeline (v3.2.0)

Forge now includes a state-driven CI/CD deployment pipeline that handles local validation, routing, and automated stakeholder handoff.

### 🛡️ Pre-Flight Integrity

Network operations are prohibited until the local state is validated:
- **Sync Verification**: Ensures the local branch is synchronized with remote HEAD.
- **Secret Scanning**: Scans for exposed API keys (AWS, GitHub, Slack) using regex scanning.

### 🚦 State-Driven Routing

Deployment builds are dynamically routed based on the project format detected during `forge init`:
- **Static/PWA**: Direct build and deployment via `rsync` to the Labs Nginx container.
- **Vite/Dynamic**: Automated Docker containerization, GHCR push, and remote SSH trigger for pull/restart.

### 📝 The Handoff Gate

The `forge deploy` command interrupts execution to query the developer for business viability data:
- **Objective**: Deployment business goal.
- **Architecture**: Structural integrity summary.
- **Cost**: Resource usage and infrastructure efficiency.

This data is compiled into a `HANDOFF.md` manifest, committed, pushed, and used to automatically generate a Pull Request.

---

### Per-Project Files (`.forge/`)

```
your-project/
├── .forge/
│   ├── PATIENT.md               # Patient intake form (v2.0)
│   ├── PROJECT.md               # Alias for PATIENT.md (backward compat)
│   ├── HEALTH.md                # Discharge criteria and health tracking
│   ├── AUTONOMY.md              # Autonomy configuration
│   ├── BLUEPRINT.md             # Architecture
│   ├── ROADMAP.md               # Phase breakdown
│   ├── REQUIREMENTS.md          # Traced requirements
│   ├── STATE.md                 # Living memory
│   ├── VITALS.md                # Session-start observation snapshot
│   ├── config.json              # Workflow config (v2.0.0)
│   ├── qa_report.md             # Cumulative QA results
│   ├── security_audit.md        # Security review
│   ├── archive/                 # Discharged patient records
│   ├── agents/                  # Hydrated agents for this project
│   ├── research/                # Domain research
│   ├── phases/                  # Phase-specific artifacts
│   │   └── XX-phase-name/
│   │       ├── XX-CONTEXT.md
│   │       ├── XX-IMPACT.md
│   │       ├── XX-RESEARCH.md
│   │       ├── XX-YY-PLAN.md
│   │       ├── XX-YY-SUMMARY.md
│   │       ├── XX-VERIFY.md
│   │       └── XX-QA.md
│   └── handoff.json             # Session persistence
├── src/
├── workflows/                   # n8n workflow JSON files (@FlowBuilder projects)
├── tests/
└── docs/
```

---

## How to Use

### Admitting a New Patient

1. Run `/forge:admit` — @Triage will ask you 7 questions max
2. If an existing codebase is present, @Triage runs `/forge:map` automatically
3. Review the PATIENT.md draft — confirm or correct
4. Set your autonomy level — Full for hands-off, Manual for full control
5. Review the roadmap — confirm and let the system run

### Daily Workflow (Multi-Project)

1. Run `/forge:rounds` — see all active patients and what needs your attention
2. Address any immediate escalations first
3. Resume or start treatment on your chosen patient

### Iterating on Existing Code

1. Run `/forge:iterate` with a description of the feature
2. Review the Impact Assessment — confirm before design proceeds
3. Run `/forge:audit` after significant iterations

### Fixing Bugs

Run `/forge:debug` with a stack trace, error message, or file:line reference. One bug per run. Full autonomy patients resume treatment automatically after the fix.

### Discharging a Patient

Run `/forge:discharge`. Every criterion in HEALTH.md must have evidence. You confirm the final sign-off. The patient is archived, not deleted.

### n8n / Typed System Work

@FlowBuilder handles n8n workflow design and TypeScript interface extraction automatically when checked in PATIENT.md Section 8. `/forge:build` routes n8n tasks to @FlowBuilder instead of @Builder.

---

## Troubleshooting

**AUTONOMY.md missing at admission?**
@Triage must produce it. Re-run `/forge:admit` or create AUTONOMY.md manually from `templates/AUTONOMY.md` and set the level before proceeding.

**HEALTH.md criteria keep failing discharge?**
The criteria may be too strict or the work genuinely isn't done. Run `/forge:status` to see which specific criteria are unmet and what evidence is required.

**@Monitor flagging state drift?**
STATE.md is out of sync with the filesystem. Run `/forge:absorb` to have the framework reverse-engineer your manual edits into a Ghost Plan and reconcile the state automatically. Do not manually edit STATE.md unless the drift is trivial.

**@FlowBuilder workflow fails import?**
The self-review checklist in @FlowBuilder's handoff format will identify the exact failure. Most common causes: orphaned node (in `nodes[]` but not in `connections{}`), missing `executionOrder: v1`, or parameterized SQL.

**Agent producing generic output?**
Check the hydration quality gate output in @Team_Assembler. Every objective must name a specific file, function, or feature. Re-run `/forge:admit` with a more detailed PATIENT.md.

**QA report missing at phase completion?**
The build did not complete correctly. Invoke @Inspector manually before proceeding.

**Session lost mid-phase?**
Run `/forge:resume`. It reads `handoff.json` and restores context. If no handoff exists, run `/forge:rounds` to get current patient state.

**Running FORGE 1.0 projects with v2.0?**
Full backward compatibility. `project_overview.md` is accepted anywhere `PATIENT.md` is expected. `/forge:init` routes to `/forge:admit` internally. `PROJECT.md` is aliased to `PATIENT.md`. No migration required.

**CLI errors: "Cannot find module" or outdated DNA?**
The Forge Engine (v3.1.3) is a living library. If you encounter errors or want the latest WiBX expertise, run the maintenance command:

```bash
forge update
```

**My phase is slow?**
If execution phases are taking too long or costing too much context window, configure GLM routing for execution agents. See `docs/COST_OPTIMIZATION.md`.

---

## Version History

### v3.4.0 — Healthcare Quality Gates

_Released May 6, 2026_

**Objective:** Embed code quality enforcement and healthcare domain standards directly into Forge agent templates, ensuring EHR projects meet clean-code, clean-architecture, WCAG 2.1 AA, HIPAA, patient safety, and HL7/FHIR requirements by default.

**Changes:**
- **Inspector:** CODE QUALITY GATES section — clean-code gates (naming, function size, error handling), clean-architecture gates (layering, DI, SoC, god objects), WCAG 2.1 Level AA accessibility gates, hard stop auto-fail criteria, caveman-review output format with examples
- **Builder:** HEALTHCARE VALIDATION GATES section — HIPAA compliance (PHI, encryption, access control, audit trail), patient safety (drug interactions, allergies, clinical alerts, dosage, contraindications), HL7/FHIR data integrity (Patient resource, clinical codes, references, date/time)
- **Architect:** EHR PATTERNS & COMMON WORKFLOWS section — 5 standard workflows (admission, medication order, discharge, vital signs monitoring, lab result processing) with component specs and key safety checks
- **workflows/build.md:** CODE QUALITY VALIDATION pre-sign-off gate — mandates Inspector review before build completion, hard stops, QA_REPORT.md handoff
- **workflows/verify.md:** ACCESSIBILITY AUDIT final gate — WCAG 2.1 AA checklist, auto-fail criteria, escalation path

---

### v3.3.0 — The Token Economy

_Released May 6, 2026_

**Objective:** Formalize Superpowers and Serena Protocols to minimize context overhead, reduce operational costs, and enforce architectural discipline.

**Key Features:**

- **Token Economy:** Implemented `caveman-lite` and `caveman-review` artifact compression protocols to drastically reduce token consumption.
- **Model Routing:** Introduced cost-optimized model routing in `AUTONOMY.md` to offload routine execution to GLM models.
- **Superpowers Integration:** Embedded Requirement Refinement, Batch Execution, RGR TDD, and 4-Phase Debugging into core agent templates.
- **Serena Protocols:** Enforced Symbol-level Retrieval and Query-Before-Coding patterns for the `@Scout`, `@Builder`, and `@Strategist` agents.

---

### v3.2.0 — The Pipeline Architect

_Released May 2, 2026_

**Objective:** Implement a unified CI/CD deployment pipeline with state-driven routing and automated handoff.

**Key Features:**

- **Unified Deployment:** Dynamic build routing for Static, PWA, and Vite projects.
- **Integrity Shield:** Pre-flight sync verification and secret scanning.
- **Handoff Gate:** Automated `HANDOFF.md` generation and PR creation with business data.
- **Release Archiving:** Historical release manifests stored in `.forge/releases/`.

---

### v3.1.2 — The Industrial Orchestrator

_Released May 2026_

**Objective:** Finalize the cinematic developer experience with zero-config automation and institutional DNA injection.

**Key Features:**

- **Zero-Config Engine:** Automatic root detection and environment mapping.
- **Brand Hunter:** Recursive WiBX branding injection (Neon Green/Deep Black).
- **Vertical Expertise:** Surgical hydration for Fintech, Web3, Content-AI, Support, and n8n Automations.
- **n8n Native Support:** First-class scaffold and orchestration for automation workflows.
- **Self-Maintenance:** Integrated version checking and `forge update` command.

---

### v3.0.0 — The CLI Era (Forge Engine)

_Released April 2026_

**Objective:** Transition FORGE from a collection of templates into a standalone, downloadable CLI tool.

**Core Pillars:**

- **Forge CLI:** Unified binary for project initialization (`forge init`).
- **Contextual Hydration:** Surgical markdown extraction for agent personas.
- **Agent Swarm:** Orchestration of specialized agents with cross-repo awareness.

### v2.0.0 — The Hospital Model

_Released March 2026_

**New agents:**

- `@Triage` — admission specialist, replaces manual project_overview.md intake
- `@Monitor` — session-start observer, produces VITALS.md
- `@FlowBuilder` — n8n workflow specialist and typed system engineer

**New workflows:**

- `/forge:admit` — replaces `/forge:init` as the primary admission command
- `/forge:rounds` — multi-patient floor briefing
- `/forge:discharge` — formal exit check against HEALTH.md

**New templates:**

- `PATIENT.md` — replaces `project_overview.md` with hospital-model structure
- `HEALTH.md` — per-project discharge criteria
- `AUTONOMY.md` — per-project autonomy contract

**Updated agents:**

- `@Conductor` — now drives autonomous execution, reads AUTONOMY.md before every handoff, tracks HEALTH.md with evidence citations
- `@Team_Assembler` — knows new agents, injects AUTONOMY CONTEXT into all hydrated agents
- `@Project_Initializer` — produces full v2.0 folder structure, expects PATIENT.md + HEALTH.md + AUTONOMY.md

**Updated workflows:**

- `/forge:build` — autonomy-aware phase completion, routes @FlowBuilder for n8n tasks
- `/forge:status` — shows HEALTH.md criteria and discharge eligibility
- `/forge:debug` — accepts stack traces as intake, Full autonomy patients auto-resume

**Backward compatibility:**

- `project_overview.md` accepted anywhere `PATIENT.md` is expected
- `/forge:init` routes to `/forge:admit` internally
- `PROJECT.md` aliased to `PATIENT.md`
- All v1.0 workflows unchanged except build, status, debug

---

### v1.0.0 — Initial Release

_Released March 28, 2026_

Initial FORGE framework. Eight agents, fourteen workflows, NEXUS domain config.
Single-project, manually-driven execution. Hard stop after every workflow step.

**Agents:** @Architect, @Builder, @Sentinel, @Inspector, @Conductor, @Scout, @Strategist, @Debugger

**Workflows:** init, discuss, plan, build, verify, iterate, audit, debug, ship, quick, status, pause, resume, map, help

---

**Status:** SYSTEM ONLINE | **Version:** 3.4.0 (Stable)
