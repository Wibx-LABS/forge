# CI/CD & Deployment Templates

## GitHub Actions Workflows (Bifrost Standard)

### Build Validation (`bifrost-build.yml`)

**Trigger:** On every push

```yaml
name: Bifrost Build Validation
on: [push]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Check if .bifrost exists
        id: check_bifrost
        run: |
          if [ -d ".bifrost" ]; then
            echo "exists=true" >> $GITHUB_OUTPUT
          else
            echo "exists=false" >> $GITHUB_OUTPUT
          fi

      - name: Validate STATE.md
        if: steps.check_bifrost.outputs.exists == 'true'
        run: ./scripts/bifrost-validate state .bifrost/STATE.md
      
      - name: Validate PLAN.md
        if: steps.check_bifrost.outputs.exists == 'true'
        run: ./scripts/bifrost-validate plan .bifrost/PLAN.md
      
      - name: Check API contracts (against graph)
        if: steps.check_bifrost.outputs.exists == 'true'
        run: ./scripts/bifrost-validate api-calls --graph knowledge/
      
      - name: Lint generated code
        if: steps.check_bifrost.outputs.exists == 'true'
        run: ./scripts/bifrost-validate code-standards .bifrost/
      
      - name: Run QA checklist
        if: steps.check_bifrost.outputs.exists == 'true'
        run: ./scripts/bifrost-validate qa-report .bifrost/QA_REPORT.md
      
      - name: Pre-merge check
        if: github.event_name == 'pull_request' && steps.check_bifrost.outputs.exists == 'true'
        run: ./scripts/bifrost-validate merge-ready
```

### QA Validation (`bifrost-qa.yml`)

**Trigger:** On PR open, sync, reopen

```yaml
name: Bifrost QA Validation
on: 
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  qa:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Check if .bifrost exists
        id: check_bifrost
        run: |
          if [ -d ".bifrost" ]; then
            echo "exists=true" >> $GITHUB_OUTPUT
          else
            echo "exists=false" >> $GITHUB_OUTPUT
          fi

      - name: Check QA Report Integrity
        if: steps.check_bifrost.outputs.exists == 'true'
        run: ./scripts/bifrost-validate qa-report .bifrost/QA_REPORT.md

      - name: Assert Zero Open Blockers
        if: steps.check_bifrost.outputs.exists == 'true'
        run: ./scripts/bifrost-validate state .bifrost/STATE.md --ensure-no-blockers
```

## Standard Job Configuration

### Runner & Environment
- **OS:** `ubuntu-latest`
- **Node Version:** 20.x
- **Package Manager:** Yarn 3.5.0 (Berry, PnP disabled)
- **Checkout Action:** `actions/checkout@v4`

### Dependency Caching
- **Key Strategy:** Hash of `yarn.lock` file
- **Example:** `yarn-cache-${{ hashFiles('**/yarn.lock') }}`
- **Optional:** nx-cloud remote cache (if enabled)

## CI/CD Configuration (YAML Hook Config)

### `ci-cd/hooks-config.yaml` Pattern

```yaml
hooks:
  pre-commit:
    enabled: true
    validate_state: true
    strict: true
  post-merge:
    enabled: true

validation:
  state:
    require_feature_id: true
    require_timeline: true
  qa:
    require_passed: true
    fail_on_warnings: false
  api:
    check_against_graph: true
    allow_deprecated: false

telemetry:
  enabled: true
  metrics_output: ".bifrost/METRICS.json"
```

### Validation Gates
1. **State Validation:** Feature ID, timeline required
2. **QA Validation:** Tests must pass (warnings allowed)
3. **API Validation:** Contract checks against knowledge graph
4. **Code Standards:** Linting + formatting enforcement
5. **Merge Readiness:** Pre-merge checklist verification

## Telemetry

**Output File:** `.bifrost/METRICS.json`
- Build duration
- Test coverage
- Validation results
- Performance benchmarks

## Projects Without CI/CD

- **finesta:** Static HTML tool (no CI needed)
- **investigator:** Docker-compose local dev only
- **NEXOS:** No GitHub Actions workflow present
- **wibx-runner:** Godot project (manual export presets)

---

## References

- bifrost-framework (.github/workflows, ci-cd config)
