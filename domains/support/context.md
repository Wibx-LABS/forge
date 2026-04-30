# Support Domain: Context

## Business Vertical

Customer-facing diagnostic and support platform (Investigator). Support agents use encrypted BFF queries to run real-time health checks and troubleshooting against production database without exposing schema or data to frontend. Enables safe delegation of diagnostics to non-technical support staff while maintaining security and audit trails.

## Core Operations

### Support Agent Workflow
1. **Customer Issue:** User contacts support with account problem (rewards missing, transfer stuck, VIP tier not applied)
2. **Diagnostic Form:** Support agent enters customer ID + diagnostic action type
3. **Encrypted Query:** Frontend encrypts request with AES-256-CBC
4. **BFF Execution:** Gateway decrypts, validates, executes SQL query from safe module
5. **Response:** `{status, diagnosis, plainEnglish, details, timestamp}` — human-readable diagnosis
6. **Escalation:** If needed, agent flags for manual review with auto-ticket creation

### Action Map (Encrypted Endpoints)

All requests go through single endpoint: `POST /api/execute` with payload shape.

| Action | Module | Query | Purpose |
|--------|--------|-------|---------|
| `action_rewards_check` | `rewards.js` | SELECT from rewards ledger | Verify reward eligibility, pending balance |
| `action_transfer_check` | `transfer.js` | SELECT from transfer logs | Trace stuck transfers, compliance flags |
| `action_wallet_check` | `wallet.js` | SELECT from wallet ledger | Balance, seal status, transaction history |
| `action_vip_check` | `vip.js` | SELECT from user tiers | VIP status, benefits, upgrade progress |
| `action_delivery_check` | `delivery.js` | SELECT from delivery logs | Token delivery status, blockchain confirmation |

### Query Modules (Investigator Gateway)

Located in `gateway/src/queries/`:
- `common.js` — Shared utilities: connection pool, sanitization, logging
- `rewards.js` — Rewards-specific queries
- `transfer.js` — Transfer-specific queries
- `wallet.js` — Wallet/ledger-specific queries
- `vip.js` — VIP tier and benefits queries
- `delivery.js` — Delivery and blockchain status queries
- `user.js` — User profile and account queries

**Golden Rule:** Query files contain hardcoded SELECT statements with placeholders. No dynamic SQL construction. All column aliases fixed (translator expects specific names).

## Encryption Architecture

### Request Flow

```
Frontend (Dashboard)
↓
apiClient.checkRewards(customerId)
↓
[Encryption Step]
- Derive key: PBKDF2(azureAdToken, salt='wibx_investigator_salt_v1', 100k iter, SHA-256)
- Create nonce: 5-minute time window check
- Encrypt: AES-256-CBC(JSON.stringify({action, customerId, nonce}), key, IV)
- Payload: {payload: 'IV_HEX:ENCRYPTED_HEX'}
↓
POST /api/execute
↓
[Gateway Decryption]
- Extract IV, ciphertext
- Derive same key (has azureAdToken)
- Decrypt: plaintext
- Validate nonce (must be within 5 min)
↓
requestDecryption.js middleware
↓
executeRoute.js
- Route to correct query module based on action
- Execute query
- Audit log entry (action, user, timestamp, result)
- Return response
↓
Response Shape:
{
  status: 'ok' | 'error',
  data: {
    status: 'compliant' | 'requires_review' | 'blocked',
    diagnosis: 'Account is in good standing',
    plainEnglish: 'No issues found. Rewards are pending approval.',
    details: {
      // Query-specific fields, no raw DB schema exposed
      pending_balance: 1250,
      approval_pending_since: '2026-04-20',
      next_check_date: '2026-05-01'
    },
    timestamp: '2026-04-30T14:32:00Z'
  }
}
↓
[Frontend Decryption - if needed]
- apiClient.decrypt(response) if response body also encrypted
- Most responses sent plaintext (query results already redacted)
```

### Encryption Security

- **Key Derivation:** PBKDF2 with 100k iterations (industry standard for token-based derivation)
- **Salt:** Fixed but included in code comment with version (allows rotation: `salt_v2` in future)
- **AES-256-CBC:** Industry standard symmetric cipher
- **Nonce Window:** 5 minutes (prevents recorded/replayed requests from old sessions)
- **Generic Errors:** Never leak DB structure, query failures, or data details
- **Audit Log:** Every request logged with IP, user, action, timestamp, request hash, response status

## Response Types

### Health Check Success

```json
{
  "status": "ok",
  "data": {
    "status": "compliant",
    "diagnosis": "Account verified, rewards eligible",
    "plainEnglish": "Your account is in good standing. You have 1,250 WBX pending approval for next cycle.",
    "details": {
      "pending_wbx": 1250,
      "last_approved_date": "2026-04-01",
      "next_cycle_date": "2026-05-01",
      "compliance_flags": []
    },
    "timestamp": "2026-04-30T14:32:00Z"
  }
}
```

### Blocked/Requires Review

```json
{
  "status": "ok",
  "data": {
    "status": "requires_review",
    "diagnosis": "Account has pending compliance review",
    "plainEnglish": "We've flagged your account for manual review. A support specialist will contact you within 24 hours.",
    "details": {
      "review_type": "aml_check",
      "review_started": "2026-04-25",
      "estimated_completion": "2026-05-01",
      "escalation_ticket": "SUPP-2026-04-12345"
    },
    "timestamp": "2026-04-30T14:32:00Z"
  }
}
```

### Error (No Data Leak)

```json
{
  "status": "error",
  "data": {
    "diagnosis": "We couldn't complete your request",
    "plainEnglish": "Please try again in a few minutes. If the problem continues, contact support.",
    "details": {},
    "timestamp": "2026-04-30T14:32:00Z"
  }
}
```

## Escalation & Human Approvals

When support agent identifies issue requiring escalation:
1. Issue routed to `human_approvals` table
2. `actionType` = context of approval needed (e.g., "exception_reward_grant")
3. `payload` = all context (customer ID, reason, proposed action)
4. `status` = PENDING (waits manager approval)
5. Manager reviews → APPROVED / REJECTED
6. If APPROVED: auto-execute action or create separate workflow

## Support Agent Personas

### Tier 1 (Frontline)
- Can run diagnostic queries (view-only)
- Route issues to managers for escalation
- Access: `action_rewards_check`, `action_wallet_check`, `action_delivery_check`

### Tier 2 (Specialist)
- Can run all diagnostic queries
- Can initiate escalations with richer context
- Access: All actions + `human_approvals` create

### Manager
- Can review + approve escalations
- No dashboard access (controlled via portal)
- Access: `human_approvals` review

## Brazil Locale Support

- **Phone Format:** (XX) XXXXX-XXXX support
- **CPF Masking:** XXX.XXX.XXX-XX (shown on responses)
- **Currency:** BRL for fiat context, WBX for token context
- **Timestamps:** ISO 8601 in responses, formatted DD/MM/YYYY HH:mm:ss in UI

---

## References

- investigator (BFF encryption, request/response patterns, dashboard integration)
- NEXOS (human_approvals schema for escalation)
