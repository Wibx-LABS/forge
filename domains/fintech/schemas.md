# Fintech Domain: Data Schemas

## CSV Input Schema (Backend Export)

**Format:** Single-quote delimited, UTF-8 encoded

```
id, user_id, user_email, payment_amount, payment_provider_data, 
payment_provider_result, created_at, pay_wibx_amount
```

| Field | Type | Nullable | Example |
|-------|------|----------|---------|
| `id` | UUID | No | `550e8400-e29b-41d4-a716-446655440000` |
| `user_id` | UUID | No | `f47ac10b-58cc-4372-a567-0e02b2c3d479` |
| `user_email` | Email | No | `user@example.com` |
| `payment_amount` | Decimal | No | `99.99` |
| `payment_provider_data` | JSON | No | See nested schema below |
| `payment_provider_result` | JSON | No | See nested schema below |
| `created_at` | ISO 8601 | No | `2026-04-30T14:32:00Z` |
| `pay_wibx_amount` | Decimal | No | `1250.50` |

### Nested: `payment_provider_data` (JSON)

```json
{
  "planName": "Premium Plus",
  "planDescription": "1250 WBX",
  "fiatPrice": 99.99,
  "benefits": [
    { "quantity": 1250, "unit": "wbx" },
    { "quantity": 1, "unit": "premium_key" }
  ],
  "quotation": 12.505,
  "whitelabelName": "Stripe Partner A",
  "customer": {
    "phoneNumber": "(11) 98765-4321"
  }
}
```

| Field | Type | Nullable | Purpose |
|-------|------|----------|---------|
| `planName` | String | No | Marketing name of package |
| `planDescription` | String | No | Token/benefit description |
| `fiatPrice` | Decimal | No | BRL price |
| `benefits[].quantity` | Integer | No | First item is WBX amount |
| `quotation` | Decimal | No | WBX/BRL conversion rate |
| `whitelabelName` | String | **Yes** | Partner name or null for direct |
| `customer.phoneNumber` | Phone | **Yes** | Backup identification |

### Nested: `payment_provider_result` (JSON)

```json
{
  "fees": 1.25
}
```

| Field | Type | Nullable | Purpose |
|-------|------|----------|---------|
| `fees` | Decimal | **Yes** | Transaction fee in BRL |

---

## Accounting Output Schema (9 Fields)

**Format:** JSON array of objects, ready for XLSX export

```typescript
interface AccountingRow {
  dataHora: string;           // "30/04/2026 14:32:00"
  userId: string;             // UUID
  identification: string;     // Email or phone
  packageName: string;        // "Premium Plus — 1250 WBX"
  valorBRL: number;           // 99.99
  wbxAmount: number;          // 1250.50
  quotation: number;          // 12.505 (WBX per BRL)
  whitelabel: string | null;  // "Stripe Partner A" or null
  fees: number | null;        // 1.25 or null
}
```

---

## NEXOS Commercial Schemas

### `commercial_products` Table

```sql
CREATE TABLE commercial_products (
  productId UUID PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  costPriceUsd DECIMAL(12,2),
  listPriceUsd DECIMAL(12,2),
  minMarginPct DECIMAL(4,2) DEFAULT 0.20,  -- 20% floor
  active BOOLEAN DEFAULT true,
  createdAt TIMESTAMP DEFAULT NOW()
);
```

### `commercial_proposals` Table

```sql
CREATE TABLE commercial_proposals (
  proposalId UUID PRIMARY KEY,
  leadId UUID NOT NULL,
  clientName VARCHAR NOT NULL,
  departmentId VARCHAR DEFAULT 'comm',
  selectedProducts JSONB,  -- [{productId, quantity, customPrice}]
  totalValueUsd DECIMAL(12,2),
  calculatedMarginPct DECIMAL(4,2),
  status ENUM('draft', 'approved', 'rejected'),
  executiveSummary TEXT,
  createdAt TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (leadId) REFERENCES commercial_leads(id)
);
```

### `commercial_leads` Table

```sql
CREATE TABLE commercial_leads (
  id UUID PRIMARY KEY,
  departmentId VARCHAR DEFAULT 'comm',
  sourceSystem VARCHAR,  -- Slack, Email, Manual, etc.
  rawPayload JSONB,      -- Original lead data
  enrichedData JSONB,    -- Extracted: company, industry, size, decision maker
  leadScore INTEGER,     -- 0-100
  status ENUM('new', 'enriched', 'actioned'),
  createdAt TIMESTAMP DEFAULT NOW()
);
```

---

## NEXOS Bunker Schema (Financial Ledger)

### `creator_wallets` Table

```sql
CREATE TABLE creator_wallets (
  walletId UUID PRIMARY KEY,
  creatorId UUID UNIQUE NOT NULL,
  balance DECIMAL(12,6) DEFAULT 0.0,  -- in WBX
  createdAt TIMESTAMP DEFAULT NOW()
);
```

### `ledger_entries` Table

```sql
CREATE TABLE ledger_entries (
  entryId UUID PRIMARY KEY,
  walletId UUID NOT NULL,
  transactionId UUID,
  amount DECIMAL(12,6) NOT NULL,  -- positive=credit, negative=debit
  entryType ENUM(
    'seal',          -- Initial issuance
    'use',           -- Consumption/burn
    'top_up',        -- Manual credit
    'platform_fee'   -- Fee deduction
  ),
  originatingSignalId UUID,  -- Links to approval/purchase source
  createdAt TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (walletId) REFERENCES creator_wallets(walletId)
);
```

### `fuel_transactions` Table

```sql
CREATE TABLE fuel_transactions (
  transactionId UUID PRIMARY KEY,
  apiKeyId UUID NOT NULL,
  fuelCost DECIMAL(12,6),  -- WBX deducted
  balanceAfter DECIMAL(12,6),
  originatingSignalId UUID,
  createdAt TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (apiKeyId) REFERENCES api_keys(id)
);
```

---

## API Response Schema (BFF Pattern)

When serving fintech data through Investigator BFF:

```typescript
interface FinanceCheckResponse {
  status: 'ok' | 'error';
  data: {
    status: 'compliant' | 'requires_review' | 'blocked';
    diagnosis: string;  // Human-readable status
    plainEnglish: string;  // Explanation
    details: {
      totalRevenueThisPeriod: number;
      totalWbxIssuedThisPeriod: number;
      outstandingSettlements: number;
      riskFlags: string[];  // e.g., ["High daily volume", "Partner dispute pending"]
    };
    timestamp: string;  // ISO 8601
  };
}
```

---

## References

- finesta (CSV input/output, 9-field extraction)
- NEXOS (commercial schemas, ledger bunker, fuel accounting)
- investigator (BFF response pattern)
