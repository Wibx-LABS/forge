# 🤖 AUTONOMY CONFIGURATION

> This file defines how autonomously the care team operates on this project.

---

## Patient
- **Project:** Cost-Optimized Feature
- **Autonomy Level:** Phase-Gated
- **Set By:** System
- **Date:** 2026-05-06

---

## Model Routing (Optional)

**Default:** All agents use premium model (Claude).

For cost optimization, specify which agent roles use reduced-cost model (GLM via z.ai):

```yaml
model_routing:
  planning: premium        # @Architect, @Strategist, @Triage — complex reasoning
  execution: reduced-cost  # @Builder, @FlowBuilder — follows plan
  qa: premium              # @Inspector, @Sentinel — judgment calls
  orchestration: reduced-cost  # @Conductor, @Monitor — routine state management
  debugging: premium       # @Debugger — root cause analysis requires reasoning
```

**Rationale:** We use GLM for the execution phase to optimize cost while keeping Claude for QA and planning.

---

## Page Me When (Always)

- [x] A phase completes and the next phase begins
- [x] Any agent enters a second fix loop on the same task
