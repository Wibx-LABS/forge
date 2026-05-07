# Superpowers Plugin Integration Reference

The Forge framework integrates seamlessly with the Claude Superpowers plugin to enhance the UX via dialogue scaffolding. The underlying protocols are embedded in the agent templates, so the framework functions with the same rigor whether the plugin is present or not.

## 1. Brainstorming (`/brainstorming`)
**Used By:** `@Architect`
**When:** Feature intake or initial architecture phase.
**What It Does:** Activates a Socratic dialogue to lock in feature requirements before building.
**Protocol Enforced:** REQUIREMENT REFINEMENT PROTOCOL
**Output:** The plugin output is used by `@Architect` to lock in Phase 1 (Problem Statement) and Phase 2 (Design Options), ultimately producing the `TRAJECTORY.md` and `PLAN.md`.

## 2. Execution Batching (`/execute-plan`)
**Used By:** `@Builder`
**When:** Build phase, after `@Architect` locks design.
**What It Does:** Structures the plan into code-review-sized batches (1-3 files, ≤400 LOC per batch).
**Protocol Enforced:** BATCH EXECUTION PROTOCOL
**Output:** A structured chunking of work to prevent context explosion and enforce review gates.

## 3. TDD Refinement
**Used By:** `@Inspector`
**When:** Code review and test validation phase.
**What It Does:** The plugin can assist in TDD scaffolding during `/execute-plan`.
**Protocol Enforced:** RED-GREEN-REFACTOR DISCIPLINE
**Output:** Ensures all code fails a test before passing, verified by the blind inspector.

## 4. 4-Phase Debugging
**Used By:** `@Debugger`
**When:** Debugging failures or incidents.
**What It Does:** The plugin scaffolds the 4-phase debugging structure in dialogue.
**Protocol Enforced:** 4-PHASE DEBUG METHODOLOGY
**Output:** Root cause isolation, pattern analysis, hypothesis testing, and verified implementation with a hard stop trigger for repeated failures.
