# Web3 Domain: Data Schemas

## Game State Persistence (Mock Wallet)

**File:** `user://mock_wallet.json` (Godot FileAccess)

```json
{
  "total_wibx": 1250,
  "premium_keys": 5,
  "last_session_date": "2026-04-30T14:32:00Z",
  "run_history": [
    {
      "session_id": "uuid-1",
      "duration_seconds": 125,
      "coins_collected": 45,
      "wbx_earned": 250,
      "multiplier_active_time_percent": 12,
      "power_ups_used": ["Magnet", "Multiplier"],
      "revives_spent": 2,
      "final_distance": 3500,
      "timestamp": "2026-04-30T14:00:00Z",
      "sealed": false
    }
  ]
}
```

### Top-Level Fields

| Field | Type | Purpose |
|-------|------|---------|
| `total_wibx` | Decimal | Cumulative WBX earned (not yet sealed) |
| `premium_keys` | Integer | In-game currency for tier unlocks |
| `last_session_date` | ISO 8601 | Last gameplay timestamp |
| `run_history` | Array | Historical session records (max 100) |

### Run History Entry

| Field | Type | Purpose |
|-------|------|---------|
| `session_id` | UUID | Unique session identifier |
| `duration_seconds` | Integer | Time elapsed in seconds |
| `coins_collected` | Integer | Classic coins (secondary collectible) |
| `wbx_earned` | Decimal | WBX earned this session |
| `multiplier_active_time_percent` | Integer | % of session with Multiplier active (0-100) |
| `power_ups_used` | Array[String] | List of active power-ups: Magnet, Multiplier, SuperJump, Shield |
| `revives_spent` | Integer | Number of WBX revives used |
| `final_distance` | Integer | Z-distance traveled (game units) |
| `timestamp` | ISO 8601 | Session start time |
| `sealed` | Boolean | true if ledger entry created, false if local only |

---

## NEXOS Bunker Schema (WBX Ledger)

### `creator_wallets` Table

```sql
CREATE TABLE creator_wallets (
  walletId UUID PRIMARY KEY,
  creatorId UUID UNIQUE NOT NULL,
  balance DECIMAL(12, 6) DEFAULT 0.0,
  createdAt TIMESTAMP DEFAULT NOW()
);
```

**Purpose:** Single wallet per player, tracks sealed (immutable) WBX balance.

### `ledger_entries` Table

```sql
CREATE TABLE ledger_entries (
  entryId UUID PRIMARY KEY,
  walletId UUID NOT NULL,
  transactionId UUID,
  amount DECIMAL(12, 6) NOT NULL,
  entryType ENUM(
    'seal',          -- WBX earned from game session, locked to ledger
    'use',           -- WBX spent (revive, cosmetic, pass)
    'top_up',        -- Manual admin credit
    'platform_fee'   -- Fee deduction
  ),
  originatingSignalId UUID,  -- Links to game session ID
  createdAt TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (walletId) REFERENCES creator_wallets(walletId),
  INDEX (walletId),
  INDEX (originatingSignalId)
);
```

**Entry Types:**
- `seal`: Called when player confirms "Seal Wallet" after session → game WBX → ledger
- `use`: Player spends ledger WBX (revive premium, cosmetic unlock, battle pass)
- `top_up`: Admin bonus or bridge from fintech (e.g., purchase WBX with real money)
- `platform_fee`: Fee deduction (e.g., 2% of sealed amount)

### `sealed_content` Table

```sql
CREATE TABLE sealed_content (
  contentId UUID PRIMARY KEY,
  sealId VARCHAR UNIQUE NOT NULL,
  creatorId UUID NOT NULL,
  platformId VARCHAR,  -- 'wibx-runner' or other game
  contentHash VARCHAR NOT NULL,
  contentType VARCHAR,  -- 'wbx_seal' or other type
  sealedAt TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (creatorId) REFERENCES creator_wallets(creatorId),
  INDEX (creatorId),
  INDEX (sealId)
);
```

**Purpose:** Immutable proof of WBX sealing. Each seal gets unique ID for auditability.

### `fuel_transactions` Table

```sql
CREATE TABLE fuel_transactions (
  transactionId UUID PRIMARY KEY,
  apiKeyId UUID NOT NULL,
  fuelCost DECIMAL(12, 6),  -- WBX charged from wallet
  balanceAfter DECIMAL(12, 6),
  originatingSignalId UUID,  -- game session ID
  createdAt TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (apiKeyId) REFERENCES api_keys(id),
  INDEX (apiKeyId)
);
```

**Purpose:** Track per-session WBX consumption if game authenticates via API key.

---

## `api_keys` Table (Auth Integration)

```sql
CREATE TABLE api_keys (
  id UUID PRIMARY KEY,
  apiKey VARCHAR UNIQUE NOT NULL,  -- Secret key
  walletId UUID,
  creatorId UUID,
  active BOOLEAN DEFAULT true,
  createdAt TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (walletId) REFERENCES creator_wallets(walletId),
  FOREIGN KEY (creatorId) REFERENCES platform_users(id),
  INDEX (apiKey),
  INDEX (creatorId)
);
```

**Purpose:** Players authenticate game sessions with API key, ledger tracks fuel (WBX) burned per key.

---

## Game Session Ledger (Session-Level Tracking)

When game submits session data for sealing, it includes:

```typescript
interface GameSessionSubmission {
  sessionId: string;
  playerId: string;
  walletAddress?: string;  // Optional: on-chain address for future L2
  wbxEarned: number;
  durationSeconds: number;
  coinsCollected: number;
  powersUsed: string[];
  revivesCost: number;  // WBX spent on revives during session
  finalDistance: number;
  timestamp: ISO8601;
}
```

**Ledger Reconciliation:**
- `ledger_entries.amount` = `wbxEarned - revivesCost` (net)
- `ledger_entries.entryType` = 'seal'
- `ledger_entries.originatingSignalId` = `sessionId`
- `sealed_content.sealId` = hash(sessionId + walletId + timestamp)

---

## WBX Collectible Data

In-game collectible configuration:

```json
{
  "collectibles": [
    {
      "type": "wbx_token",
      "base_value": 10,
      "visual": {
        "model": "coin_wbx.mesh",
        "color": "#22ff7b",
        "emit_intensity": 0.8,
        "particle_trail": true
      },
      "physics": {
        "collision_layer": 4,
        "despawn_time_seconds": 30
      },
      "rarity": "common"
    },
    {
      "type": "coin",
      "base_value": 1,
      "visual": {
        "model": "coin_gold.mesh",
        "color": "#ffd55e"
      },
      "physics": {
        "collision_layer": 4,
        "despawn_time_seconds": 30
      },
      "rarity": "common"
    }
  ],
  "powerups": [
    {
      "type": "magnet",
      "base_duration_seconds": 5,
      "pull_radius_units": 5,
      "max_tier": 5,
      "tier_cost_keys": [1, 2, 3, 5, 8]
    },
    {
      "type": "multiplier",
      "base_duration_seconds": 5,
      "score_multiplier": 2,
      "max_tier": 5,
      "tier_cost_keys": [1, 2, 3, 5, 8]
    },
    {
      "type": "superjump",
      "base_duration_seconds": 5,
      "max_height_multiplier": 1.5,
      "max_tier": 5,
      "tier_cost_keys": [1, 2, 3, 5, 8]
    },
    {
      "type": "shield",
      "base_duration_seconds": 30,
      "protection_hits": 1,
      "max_tier": 5,
      "tier_cost_keys": [2, 4, 6, 10, 15]
    }
  ]
}
```

---

## References

- wibx-runner (mock_wallet.json, game mechanics, power-up system)
- NEXOS (creator_wallets, ledger_entries, sealed_content, fuel_transactions, api_keys tables)
