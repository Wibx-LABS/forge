# Admitting a patient from a GSD plan

> A field finding: when a project was already planned in **GSD** (`.planning/`), FORGE re-derives from scratch the exact artifacts GSD already produced. This document reports the finding, the evidence, and the ingestion path that closes the gap.

## The finding

FORGE and GSD are not competitors — they are two halves of one lifecycle. GSD is strong at the **front** of a fuzzy project (structured discovery, requirements, domain research); FORGE is strong at the **middle** (admit a defined project, execute autonomously, monitor drift, discharge). The clean move is to run GSD's front and hand its output to FORGE's middle.

When you do that today, FORGE's `/forge:admit` re-does work GSD already finished. The overlap is not vague — it is nearly artifact-for-artifact:

| GSD produces (`.planning/`) | FORGE re-derives at admission | Overlap |
|---|---|---|
| `PROJECT.md` — What This Is, Core Value, Key Decisions | `PATIENT.md` — objective, constraints, decisions (@Triage intake) | high |
| `REQUIREMENTS.md` — v1/v2/out-of-scope, REQ-IDs | `.forge/REQUIREMENTS.md` (admit Step 5) | **near 1:1** |
| `ROADMAP.md` — phases + success criteria | `.forge/ROADMAP.md` (admit Step 6) | **near 1:1** |
| `research/{STACK,FEATURES,ARCHITECTURE,PITFALLS}.md` + `SUMMARY.md` | `@Scout` 4 tracks → `.forge/research/SUMMARY.md` (admit Step 3) | **the same four dimensions** |

The most striking line is the last one: FORGE's `@Scout` runs **Stack / Feature / Architecture / Pitfalls** research and synthesizes a `SUMMARY.md`. GSD's project research fan-out runs **Stack / Features / Architecture / Pitfalls** and synthesizes a `SUMMARY.md`. Two frameworks, built independently, converged on the identical research shape. That is not a coincidence to paper over — it is the seam where the two tools bolt together.

So: **a GSD plan is, structurally, a FORGE admission packet that hasn't been renamed yet.** `BLUEPRINT.md` is the only artifact FORGE needs that GSD doesn't emit by that name — and it derives cleanly from GSD's `REQUIREMENTS.md` + `research/SUMMARY.md`.

## Why re-deriving is the wrong default

- **Wasted tokens and wall-clock.** Re-running @Scout's 4 research tracks over a domain GSD already researched spends the exact cost twice.
- **Drift between the two plans.** If @Triage re-interviews and re-scopes, the FORGE requirements can silently diverge from the GSD requirements the human already approved. Now there are two sources of truth for one project — the failure this repo's own "one project, one framework" discipline exists to prevent.
- **It throws away the human's decisions.** The GSD plan encodes choices the attending already made and validated during discovery. Re-deriving asks them again.

## The ingestion path

`@Triage` gains a detection step: before codebase analysis, check for a GSD plan (`.planning/PROJECT.md` + `.planning/REQUIREMENTS.md` + `.planning/ROADMAP.md`). If present, **ingest and map** instead of re-deriving:

1. `PATIENT.md` ← `PROJECT.md` (objective, Core Value, Key Decisions, constraints). Mark ingested fields `[FROM-GSD]`, not `[INFERRED]` — they are validated, not guessed.
2. `.forge/REQUIREMENTS.md` ← `REQUIREMENTS.md` (preserve REQ-IDs and v1/v2/out-of-scope split verbatim). Admit Step 5 becomes a copy, not a re-extraction.
3. `.forge/ROADMAP.md` ← `ROADMAP.md` (preserve phases + success criteria). Admit Step 6 becomes a copy for confirmation, not a fresh authoring.
4. `.forge/research/` ← `.planning/research/` (STACK/FEATURES/ARCHITECTURE/PITFALLS/SUMMARY). Admit Step 3 **skips the @Scout fan-out** — the research already exists. Log the skip.
5. `BLUEPRINT.md` ← derived from the ingested REQUIREMENTS + research SUMMARY (the one genuinely new artifact).

The attending still confirms the assembled admission packet — ingestion pre-fills, it does not auto-admit. `HEALTH.md` and `AUTONOMY.md` are still produced normally (GSD does not encode discharge criteria or autonomy).

## The rule that keeps this safe

**One project, one framework at a time.** The handoff is a baton pass, not co-ownership: GSD owns discovery and writes `.planning/`; at admission FORGE ingests it and from then on `.forge/` is the single source of truth. The two `STATE` files never run live at once. After ingestion, changes flow through FORGE — the GSD `.planning/` becomes a historical record of how the patient was scoped.

## Evidence (real handoff, not a thought experiment)

This finding came out of running both tools end-to-end on one real project (a finance-reconciliation tool):

1. **GSD front:** discovery questioning → `PROJECT.md`; a 4-dimension research fan-out → `research/`; requirements scoping that cut an over-scoped request (4 reconciliation pairs) down to a defensible v1 (2 pairs) → `REQUIREMENTS.md`; phased `ROADMAP.md`. The research even caught a design trap in a choice made during discovery (modeling a fee as a ±% tolerance band, which hides a real error — corrected to a deterministic transform).
2. **Handoff:** the `.planning/` artifacts were mapped by hand into a FORGE `.forge/` admission packet (PATIENT/BLUEPRINT/STATE/HEALTH). The mapping was mechanical — which is exactly why @Triage should do it automatically. Notably, @Monitor's admission reconciliation (see the durability/admission-reconciliation change) correctly read the plan as a *true* greenfield with no drift.
3. **FORGE middle:** built the v1 from the ingested blueprint — a working, tested tool. The plan carried through intact.

The hand-mapping in step 2 is the manual labor this document proposes to remove.

## Scope of this change

Docs + a `@Triage` detection/ingestion step + a note in `/forge:admit` that Steps 3/5/6 are satisfied by an ingested plan. No change to execution, no new dependency on GSD (the ingestion is best-effort — absent a `.planning/`, admission behaves exactly as before).
