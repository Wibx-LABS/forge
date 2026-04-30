# /forge:help — COMMAND REFERENCE

**Role:** Display all available FORGE commands and usage guidance.

---

Output the following:

```
🔥 FORGE — Framework for Orchestrated Rapid Generation and Execution
=====================================================================

CORE PIPELINE
  /forge:init              Initialize project: intake → research → team → roadmap
  /forge:discuss <N>       Capture implementation preferences for phase N
  /forge:plan <N>          Research → architecture → task plans for phase N
  /forge:build <N>         Execute plans (stage-sequenced) with External QA gates
  /forge:verify <N>        User acceptance testing for phase N
  /forge:absorb            Analyze and absorb manual state drift into Ghost Plans
  /forge:patch <desc>      Fast-track a micro code edit, bypassing heavy QA
  /forge:ship <N>          Generate PR from verified phase work

ITERATION
  /forge:iterate           Add feature to existing codebase (impact assessment first)
  /forge:audit             Full security + quality review via @Sentinel
  /forge:debug             Isolate and fix one specific bug

UTILITIES
  /forge:quick             Ad-hoc task with FORGE guarantees (tracking + commit)
  /forge:status            Where am I? What's next?
  /forge:pause             Save session for later resumption
  /forge:resume            Restore from paused session
  /forge:map               Analyse existing codebase (4-track parallel)
  /forge:help              This help message

THE THREE LAWS
  1. The State is Truth — STATE.md is always updated
  2. Physical Artifacts Only — every phase produces files
  3. Hard Stops are Mandatory — no auto-proceeding

TYPICAL FLOW
  /forge:init → /forge:discuss 1 → /forge:plan 1 → /forge:build 1 → /forge:verify 1 → /forge:ship 1

THE AGENT TEAM
  @Architect    System design, blueprints, impact assessments
  @Builder      Code implementation from plans
  @Sentinel     Security audit and quality enforcement
  @Inspector    QA: happy path, sad path, edge cases, regression
  @Conductor    Project state management and agent routing
  @Scout        Domain research (4 parallel tracks)
  @Strategist   Phase planning and task decomposition
  @Debugger     Root cause isolation and surgical fixes

Version: 1.0.0
```
