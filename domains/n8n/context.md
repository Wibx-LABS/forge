# n8n Domain Expertise: Context & Invariants

## Core Architectural Rules
- **Sequential Chain Integrity**: Parallel fan-outs are prohibited. Workflows must be strictly linear to ensure state consistency.
- **executionOrder: "v1"**: All workflow JSON must include `"executionOrder": "v1"` in the settings block.
- **Error Fallback**: All terminal paths and error handlers must return a valid JSON object. Fallback to `{}` if no data is available.

## Orchestration Archetypes

### Archetype A: Cascading Discovery
Used for research and intelligence signal collection.
- **Flow**: `[NICHE]` (Core) → `[MACRO]` (Geo-scaling: Global > National > Regional) → `[MICRO]` (Authorities/Entities).
- **Naming**: Nodes must be prefixed with their block type.

### Archetype B: Strategic Generation
Used for content ideation and execution.
- **Flow**: `State + Policy` → `Brain + Tools`.
- **Logic**: Use Postgres to fetch `policies` and `current_system_state`, then feed into a tool-equipped agent.
