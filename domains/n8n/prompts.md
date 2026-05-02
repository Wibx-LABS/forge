# n8n Domain Expertise: Prompt Anatomy & Language

## Agent Node Anatomy
All LLM/Agent nodes must use the visual separator pattern:

```text
===OUTPUT ONLY.
Em caso de erro, retorne EXATAMENTE: {}

================================
[SECTION_NAME]
================================
[Content/Expressions]
```

## Mandatory System Sections
1. **IDIOMA (REGRA ABSOLUTA)**: Strict pt-BR enforcement. No English/European Portuguese in outputs.
2. **PERSPECTIVA (IMUTÁVEL)**: Role definition (e.g., "Você coleta sinais externos").
3. **COMPLIANCE**: Strict prohibition of financial advice/investment terms.
4. **CONTRATO DE SAÍDA (INVIOLÁVEL)**: Valid JSON only. No markdown, no narration.

## Language Enforcement
- All research tasks and agent responses must be in Brazilian Portuguese.
- Use visual separators `================` to divide context from task instructions.
