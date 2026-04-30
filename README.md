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

**Status:** Running as of March 2026.
**Version:** 3.0.0 (Dev)
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
*   **`knowledge/`**: Stores **Institutional DNA**. Things that apply to every project (Brand, Security, Style).
*   **`domains/`**: Stores **Vertical Expertise**. Things that only matter for specific types of projects (n8n logic, Banking schemas, etc).

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

**CLI errors: "Cannot find module"?**
The Forge Engine (v3.0.0) requires dependencies. Navigate to `tools/forge-cli` and run `npm install` followed by `npm run build` to initialize the binary.

---

## Version History

### v3.0.0 — The CLI Era (Forge Engine)

_In Development — May 2026_

**Objective:** Transition FORGE from a collection of templates into a standalone, downloadable CLI tool that automates the orchestration of agentic workflows.

**Core Pillars:**

- **Forge CLI:** A unified binary for project initialization, state management, and agent orchestration (e.g., `forge init`, `forge start`).
- **Contextual Hydration:** Automatically hydrate agent templates based on the specific folder/domain they are initialized in, using surgical markdown extraction.
- **Agent Swarm:** Orchestrate multiple specialized agents (@Architect, @Builder, @Sentinel) with cross-repo awareness.
- **Skill Injection:** Native support for skill installation in AI assistants (Claude Code, Antigravity) to bridge the gap between framework and execution.

**Inspiration:** Architecture and hydration logic adapted from the [Bifrost Framework](https://github.com/Wibx-LABS/bifrost-framework).

---

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

**Status:** SYSTEM ONLINE | **Version:** 3.0.0 (Dev)
