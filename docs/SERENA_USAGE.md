# Serena Plugin Usage — Forge

## Installation
```bash
# Claude Code
/install-plugin https://claude.com/plugins/serena
```

## Commands

### find_symbol "Name"
Locate where a symbol is defined.

```
/find_symbol "PatientService"
→ src/services/patient.ts:42 — PatientService class
```

### find_referencing_symbols "Name"
Find all places where a symbol is used.

```
/find_referencing_symbols "PatientService"
→ src/workflows/admit.ts:15
→ src/workflows/discharge.ts:28
→ src/api/routes/patient.ts:100
```

### insert_after_symbol "Name" "code"
Inject code after a symbol definition (rarely used in Forge).

## When Forge Uses Serena

- `@Scout` during `/forge:plan` → locate existing code
- `@Builder` during `/forge:build` → find patterns to follow
- `@Strategist` during `/forge:think` → architecture exploration

## If Serena Unavailable

Forge falls back to grep. Framework works normally, just ~30% slower on large repos.

## Token Impact

| Task | With Serena | With Grep | Savings |
|------|-------------|-----------|---------|
| Find one symbol | 50 tokens | 200 tokens | 75% |
| Find all references | 100 tokens | 300 tokens | 67% |
| Load targeted files | 200 tokens | 200 tokens | 0% |
| **Total exploration** | **350 tokens** | **700 tokens** | **50%** |

Larger codebases → bigger savings (Serena advantage compounds).
