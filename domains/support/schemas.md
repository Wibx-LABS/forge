# Support Domain: Data Schemas

## BFF Response Schema (Investigator Pattern)

All diagnostic queries return a standardized response shape, hiding internal DB structure from frontend.

### Response Envelope

```typescript
interface DiagnosticResponse {
  status: 'ok' | 'error';
  data: {
    status: 'compliant' | 'requires_review' | 'blocked';
    diagnosis: string;        // Concise status
    plainEnglish: string;     // Customer-readable explanation
    details: DiagnosticDetails;
    timestamp: string;        // ISO 8601
  };
}

interface DiagnosticDetails {
  [key: string]: any;  // Query-specific fields, see below
}
```

### Error Response (No Data Leak)

```json
{
  "status": "error",
  "data": {
    "diagnosis": "Unable to complete request",
    "plainEnglish": "Please try again or contact support if the problem persists.",
    "details": {},
    "timestamp": "2026-04-30T14:32:00Z"
  }
}
```

**Security Rule:** No error messages, stack traces, or DB schema exposed. All failures return generic message.

## Query-Specific Response Details

### `action_rewards_check` Response

```typescript
interface RewardsCheckDetails {
  pending_balance: number;           // Total WBX pending approval
  approved_balance: number;          // Already-approved, waiting distribution
  last_approved_date: string;        // ISO 8601
  next_cycle_date: string;           // When next approval batch runs
  approval_pending_since: string;    // ISO 8601 of oldest pending
  compliance_flags: string[];        // Empty if compliant
  eligibility_status: 'eligible' | 'pending' | 'ineligible';
}
```

Example:
```json
{
  "status": "ok",
  "data": {
    "status": "compliant",
    "diagnosis": "Rewards pending next cycle approval",
    "plainEnglish": "You have 1,250 WBX pending. These will be approved on May 1st and distributed within 24 hours.",
    "details": {
      "pending_balance": 1250.50,
      "approved_balance": 0,
      "last_approved_date": "2026-04-01",
      "next_cycle_date": "2026-05-01",
      "approval_pending_since": "2026-04-15",
      "compliance_flags": [],
      "eligibility_status": "eligible"
    },
    "timestamp": "2026-04-30T14:32:00Z"
  }
}
```

### `action_wallet_check` Response

```typescript
interface WalletCheckDetails {
  total_balance: number;             // All WBX in wallet
  sealed_balance: number;            // Locked to ledger
  liquid_balance: number;            // Spendable
  last_transaction_date: string;     // ISO 8601
  wallet_age_days: number;
  seal_status: 'active' | 'paused' | 'blocked';
  compliance_notes: string;          // If any flags
}
```

### `action_transfer_check` Response

```typescript
interface TransferCheckDetails {
  transfer_id: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  initiated_date: string;            // ISO 8601
  completed_date: string;            // ISO 8601 (if done)
  blockchain_tx_hash: string;        // If available
  blockchain_confirmations: number;
  error_reason: string;              // If failed (generic: "Transfer not yet confirmed")
  estimated_completion: string;      // ISO 8601 (if pending)
}
```

### `action_vip_check` Response

```typescript
interface VIPCheckDetails {
  current_tier: number;              // 0-5
  tier_name: string;                 // 'Free', 'Bronze', 'Silver', etc.
  active_benefits: string[];         // List of benefit names
  points_toward_next_tier: number;   // X out of Y
  points_required_next: number;
  progress_percent: number;          // 0-100
  estimated_reach_date: string;      // ISO 8601 (if on current trajectory)
  tier_changed_date: string;         // ISO 8601 of last tier change
}
```

### `action_delivery_check` Response

```typescript
interface DeliveryCheckDetails {
  delivery_id: string;
  amount: number;
  blockchain_tx_hash: string;
  blockchain_status: 'confirmed' | 'pending' | 'failed';
  block_number: number;              // If confirmed
  confirmations: number;
  initiated_date: string;            // ISO 8601
  confirmed_date: string;            // ISO 8601 (if done)
  tokens_received: boolean;          // Wallet balance matches
  blockexplorer_url: string;         // Direct link to transaction proof
}
```

## NEXOS Human Approvals Schema (Escalation)

### `human_approvals` Table

```sql
CREATE TABLE human_approvals (
  approvalId UUID PRIMARY KEY,
  departmentId VARCHAR NOT NULL,
  actionType VARCHAR NOT NULL,           -- 'exception_reward_grant', 'vip_downgrade_override', etc.
  payload JSONB NOT NULL,                -- Full context: customer_id, reason, proposed_action, details
  status ENUM('PENDING', 'APPROVED', 'REJECTED'),
  severity severityEnum,                 -- low/medium/high/critical
  reviewerId UUID,                       -- Manager who reviewed
  rejectionReason VARCHAR,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW(),
  INDEX (departmentId),
  INDEX (status),
  INDEX (createdAt)
);
```

### Escalation Payload Structure

```json
{
  "customer_id": "uuid-123",
  "customer_name": "John Doe",
  "issue_type": "reward_dispute",
  "severity": "medium",
  "reason": "Customer claims incorrect balance calculation",
  "proposed_action": "Manual audit + recompute",
  "supporting_diagnostics": {
    "pending_balance": 1250,
    "approved_balance": 500,
    "customer_expectation": 2000,
    "discrepancy": 250
  },
  "created_by_agent": "SUPP-agent-456",
  "urgency": "normal",
  "deadline": "2026-05-03T14:00:00Z"
}
```

## Query Module Pattern (gateway/src/queries/)

### Structure

```javascript
// rewards.js — Rewards Query Module
'use strict';

const db = require('../middleware/database');
const logger = require('../middleware/logger');

async function checkRewardsEligibility(customerId) {
  const query = `
    SELECT
      COALESCE(SUM(amount), 0) as pending_balance,
      MAX(created_at) as last_transaction_date,
      (CASE
        WHEN compliance_flags IS NULL OR array_length(compliance_flags, 1) = 0
        THEN 'compliant'
        ELSE 'flagged'
      END) as status
    FROM rewards_ledger
    WHERE customer_id = $1
    AND status = 'pending'
  `;
  
  try {
    const result = await db.query(query, [customerId]);
    return {
      status: 'ok',
      data: result.rows[0] || { pending_balance: 0, status: 'compliant' }
    };
  } catch (error) {
    logger.error('Rewards check failed', { customerId, error: error.message });
    return { status: 'error' };  // Generic error, no details
  }
}

module.exports = {
  checkRewardsEligibility
};
```

### Golden Rules
1. **No dynamic SQL:** All queries hardcoded with `$1, $2` placeholders
2. **Fixed column aliases:** Translator expects specific names (see response schema)
3. **Error handling:** Catch all exceptions, return generic error (never expose DB details)
4. **Logging:** Audit-friendly logs with customer_id, query type, timestamp, result status
5. **No sensitive data in response:** Strip internal flags, expose only summary

## API Gateway Routes (investigator/gateway/src/app.js)

### Encrypted Endpoint

```javascript
app.post('/api/execute', [
  requestDecryption,      // Decrypt payload, validate nonce
  auditLog,               // Log attempt
  routeAction             // Route to correct query module
], async (req, res) => {
  // req.decrypted.action = 'action_rewards_check'
  // req.decrypted.customerId = 'uuid-123'
  
  const handler = actionRouter[req.decrypted.action];
  if (!handler) return res.json({ status: 'error', data: {...} });
  
  const result = await handler(req.decrypted.customerId);
  return res.json(result);
});
```

## Mock Data for Frontend Development

For local development with `VITE_USE_MOCK_DATA=true`:

### Mock Wallet Check Response

```json
{
  "status": "ok",
  "data": {
    "status": "compliant",
    "diagnosis": "Wallet verified",
    "plainEnglish": "Your wallet is active with a balance of 2,500.50 WBX.",
    "details": {
      "total_balance": 2500.50,
      "sealed_balance": 1250,
      "liquid_balance": 1250.50,
      "last_transaction_date": "2026-04-25T10:30:00Z",
      "wallet_age_days": 180,
      "seal_status": "active",
      "compliance_notes": ""
    },
    "timestamp": "2026-04-30T14:32:00Z"
  }
}
```

---

## References

- investigator (BFF pattern, encryption, response format)
- NEXOS (human_approvals table, ledger schemas)
