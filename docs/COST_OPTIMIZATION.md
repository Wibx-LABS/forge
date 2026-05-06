# Cost Optimization (Model Routing)

The Token Economy Architecture in Forge allows you to optimize API costs and execution speed by dynamically routing specific agent roles to different LLM providers.

## Setup: z.ai for GLM

To use reduced-cost execution models (like GLM), you must configure z.ai API credentials in your environment:

1. Obtain a z.ai API key.
2. Export it in your environment: `export Z_AI_API_KEY="your_key"`
3. Configure your runner to fall back to Claude if GLM is unavailable.

## Enabling Model Routing

Add the following to your project's `.forge/AUTONOMY.md`:

```yaml
model_routing:
  planning: premium        # @Architect, @Strategist, @Triage
  execution: reduced-cost  # @Builder, @FlowBuilder
  qa: premium              # @Inspector, @Sentinel
  orchestration: reduced-cost  # @Conductor, @Monitor
  debugging: premium       # @Debugger
```

### Rationale

- **Planning**: Involves novel design decisions. Requires premium models like Claude.
- **Execution**: Follows a pre-made plan. Reduced-cost models (GLM) are sufficient and 5-10x cheaper.
- **QA**: Needs judgment on edge cases. Requires Claude.
- **Orchestration**: Routine state management. GLM is sufficient.
- **Debugging**: Root cause analysis requires deep reasoning. Requires Claude.

If `model_routing` is omitted, all agents default to the premium model.
