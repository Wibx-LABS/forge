# n8n Domain Expertise: Schemas & Integration

## Credential Standards
- **Postgres**: Use `LabsSQL`.
- **LLM/Gemini**: Use `GEMINI` (`models/gemini-2.5-flash`).
- **Placeholders**: Always use `YOUR_POSTGRES_CREDENTIAL_ID` in exported JSON.

## Database Integration
- **Context Fetching**:
  ```sql
  SELECT * FROM current_system_state ORDER BY last_updated DESC LIMIT 1;
  SELECT * FROM policies WHERE parameter_name = '...' AND active = true;
  ```
- **Audit Logging**: Every workflow should have a final node that logs to `cost_log` or `execution_audit` if required.

## Node Standards
- **Google Gemini**: Use `typeVersion: 1.1` or higher. Always set `systemMessage`.
- **Postgres**: Use `typeVersion: 2.5`. Use inline `{{ }}` expressions.
- **Code**: Use `typeVersion: 2`. Always return `[{ json: { ... } }]`.
