# n8n Automation Project (Forge)

This project was initialized using the Forge n8n scaffold.

## Structure
- `workflows/`: Standard location for workflow JSON exports/imports.
- `src/types/workflows/`: Target for @FlowBuilder's TypeScript interface extraction.

## Orchestration
Use the **Ignition Prompt** to admit this project into the Forge engine. 
The care team assigned is:
- `@FlowBuilder` (Primary)
- `@QA` (Automation verification)

## Invariants
All workflows in this project must follow the **Sequential Chain** pattern. No parallel fan-outs are permitted.
