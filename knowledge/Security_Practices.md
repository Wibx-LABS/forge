# Security Practices

## Encrypted API Pattern (Investigator BFF)

### Request Encryption
- **Protocol:** AES-256-CBC
- **Endpoint:** `POST /api/execute`
- **Payload Shape:** `{ "payload": "<iv>:<hex>" }` where `<iv>` = initialization vector, `<hex>` = encrypted data
- **Key Derivation:** PBKDF2(azureAdToken, iterations=100000, hash=SHA-256, keyLen=32 bytes)
- **Salt:** `wibx_investigator_salt_v1` (fixed, per-tenant)

### Replay Attack Prevention
- **Nonce Window:** 5-minute expiry
- **Validation:** Every request must carry unique, time-bound nonce
- **Response:** Generic error responses (no internal detail leaked)
- **Audit:** Every request logged with full context (timestamp, user, action, result)

## JWT Authentication

### Token Handling
- **Environment Variable:** `JWT_SECRET`
- **Minimum Length:** 32 characters (enforced)
- **Token Expiry:** `JWT_EXPIRES_IN=1h` (configurable per `.env`)
- **Storage:** Never hardcoded; always via environment

### Frameworks
- **Angular:** Via `@fastify/jwt` integration (Bifrost pattern)
- **Node/Fastify:** Native `@fastify/jwt` plugin
- **Session Timeout:** Auto-logout on HTTP 405 (session lost) via `SessionInterceptor`

## Environment Variable Naming

### Convention
- **Case:** `SCREAMING_SNAKE_CASE`
- **Secrets:** Never hardcoded, always `.env` (git-ignored)
- **Examples:** `JWT_SECRET`, `DATABASE_URL`, `RATE_LIMIT_MAX`, `ALLOWED_ORIGINS`, `API_KEY`
- **Committed:** `.env.example` always present with placeholder values

### Common Pattern
```
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=<min-32-chars>
JWT_EXPIRES_IN=1h
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
LOG_LEVEL=debug
ALLOWED_ORIGINS=http://localhost:5173
```

## Rate Limiting & CORS

### Rate Limiting
- **Window:** `RATE_LIMIT_WINDOW_MS` (e.g., 60000ms = 1 min)
- **Threshold:** `RATE_LIMIT_MAX` (e.g., 100 requests per window)
- **Enforcement:** Middleware-level, per-IP or per-user

### CORS
- **Allowlist:** `ALLOWED_ORIGINS` (explicit, never wildcard in production)
- **Example:** `http://localhost:5173,https://app.example.com`
- **Credentials:** Handled via `@fastify/cors` config

## Angular-Specific Patterns

### HTML Sanitization
- **Safe HTML Rendering:** Use `SafeHtmlPipe` or `DomSanitizer.bypassSecurityTrustHtml()`
- **Never:** `[innerHTML]="unsafeHtml"` without sanitization

### Forms
- **Standard:** Reactive Forms (never template-driven)
- **Validation:** Centralized, schema-based (Zod/Yup pattern)

### Error Handling
- **Centralized:** Via `ErrorHandlingService`
- **HTTP:** All errors pass through `SessionInterceptor` + error translation to i18n

### File Headers (Required)
Every `.ts` file must include:
```typescript
/**
 * Bifrost OPEN SOURCE
 * ------------------
 * Copyright (C) 2026 Open Source Community - MIT License.
 *
 * @file {filename.ts}
 * @author {Author Name} <{author@email}>
 * @date {Day}, {Date}th {Month} {Year} {HH:MM:SS am/pm}
 * @description {Brief description}
 */
```

## Database Security

### NEXOS Patterns
- **Query Files:** Stored in `gateway/src/queries/` (one per domain: `common.js`, `rewards.js`, `wallet.js`, etc.)
- **Column Aliases:** Do NOT change SELECT alias names — gateway translator expects specific names (`status`, `failure_reason`, `is_compliant`)
- **API Keys Table:** `api_keys(id, apiKey UNIQUE, walletId FK, creatorId, active, createdAt)`
- **Budget Control:** Via wallet FK + ledger balance validation

### Sensitive Data
- **PII:** CPF/CNPJ masked via `ngx-mask` in frontend
- **Money:** Handled via `SafeMath` (bignumber.js alias) for precision
- **Credentials:** Never logged; audit logs use hashed/redacted versions

## References

- investigator (BFF encryption, request/response patterns)
- bifrost-framework (JWT, Angular interceptors, GOTCHAS.md)
- NEXOS (Fastify JWT, database patterns, API key schema)
