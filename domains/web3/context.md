# Web3 Domain: Context

## Business Vertical

Play-to-earn mobile gaming with WBX token as core collectable. Users earn utility tokens through gameplay, which can be sealed (locked for utility functions) or traded. Monetization via in-game revive economy, power-up tiers, and environmental advertising (Indica+ placements).

## Core Game Loop (Wibx-Runner)

### Mechanics
1. **Endless Runner:** Player navigates 3 lanes, avoids obstacles, collects coins/WBX tokens
2. **Gravity Physics:** Jump/apex/fall with tuned gravity (H_max=2.5m, T_apex=0.4–0.45s)
3. **Slide Mechanic:** Collision shape transformation + position offset for low obstacles
4. **Speed Curve:** Accelerates from 13.6429 u/s to hard cap 27.5 u/s over ~175 seconds
5. **Failure States:** Stumble (glancing blow during lane swap) → Inspector chase; Crash (head-on) → Game Over

### Collectibles
- **WBX Tokens:** Glow effect, particle trail, counted as main score multiplier
- **Coins:** Traditional collectible, secondary to WBX
- **Power-ups:** Magnet (pull in nearby collectibles), Multiplier (score ×2), SuperJump (higher jumps), Shield (one-hit protection)

### Power-up Economy
- **Base Duration:** T_base (5 seconds typical)
- **Upgrade Tiers:** L_max = 5 levels (unlocked via gameplay/premium)
- **Extended Duration:** T_max = T_base + (L × 5 seconds)
- **Stacking:** Only one active power-up at a time; triggers override previous

## Monetization Model

### Revive System
- **Revive Cost:** 2^(n-1) WBX per attempt (1, 2, 4, 8, 16, ...)
- **Triggers:** Player crashes → "Save Me" screen with revive button
- **Psychology:** Loss aversion + scarcity (limited revives per session) drives engagement
- **Alternative:** Rewarded video (5-second mock countdown) → free revive

### Power-up Purchases
- **Premium Keys:** In-game currency for immediate tier unlocks
- **Pricing:** Fiat (via fintech partner) → BRL → WBX conversion
- **Whitelabel Integration:** Indica+ ads as monetization surface (billboards, train wraps)

### Advertising (Indica+)
- **Type:** Environmental/native ads (not interrupting)
- **Placement:** Holographic billboards, train wraps, skyline branding
- **Format:** Non-intrusive, thematic to Brazilian urban setting
- **Engagement:** Part of game world, not modal popups

## Economy Design

### Token Distribution
- **Earned per Collectible:** Base amount varies by collectible type
- **Multiplier Effect:** Power-ups increase rate (e.g., 2× during Multiplier active)
- **Distance Bonus:** Speed increases WBX rate over time (longer runs = better payout)

### Wallet Persistence
- **Local Storage:** `user://mock_wallet.json` (Godot FileAccess)
- **Schema:** `{total_wibx, premium_keys, last_session_date, run_history}`
- **Run History:** List of past games with: duration, coins, wbx_earned, multiplier_active, power_ups_used, revives_spent

### Backend Ledger Integration
- **Seal Transaction:** Move earned WBX from game wallet → ledger (immutable record)
- **Entry Type:** `seal` (initial issuance), `use` (spend on revive), `top_up` (bonus)
- **Cost Tracking:** Fuel transactions log per-session WBX burn

## Target Audience & Market

### Geographic Focus
- **Region:** LATAM / Brazil primary
- **Market Size:** ~90 million active mobile gamers in Brazil
- **Device:** Android first (mid-range: Snapdragon 7+ Gen 2, 8GB RAM)
- **FPS Target:** 60 sustained

### Psychographics
- Value attention compensation (earn while playing)
- Web3-curious but not crypto-native (educational opportunity)
- Casual-to-mid-core gaming (30-min sessions)

### Localization
- **Language:** Portuguese (Brazil) in-game UI
- **Currency Display:** R$ for fiat context, WBX for earned tokens
- **Cultural Elements:** Brazilian urban aesthetics (favelas, skyscrapers, graffiti), Indica+ brand integration

## Technical Design Principles

### Performance
- **Zero Runtime Instantiation:** All objects pre-pooled
- **Object Pooling:** 10–15 world chunks recycled via conveyor belt
- **Draw Calls:** <100–150 per frame
- **Draw Distance:** Camera at Y:3.5m, Z:4.0m offset; chunks recycle at Z>25.0

### Architecture
- **WorldManager:** Singleton managing chunk lifecycle
- **CharacterBody3D:** Player physics (move_and_slide)
- **Tween Interpolation:** Lane changes (0.15–0.25s, EASE_OUT TRANS_QUAD)
- **Conveyor Belt Topology:** Player at Z≈0, world moves toward camera (Vz=-13.6429 u/s)
- **Collision Layers:** 1=Player, 2=Environment, 3=Death zones, 4=Collectibles (Area3D)

### State Machine
- **Running:** Normal gameplay
- **Stumble:** Glancing blow → Inspector chase (visual feedback)
- **Crash:** Head-on collision → Game Over → Catch animation → Save Me screen
- **Revive:** Player pays WBX → Resume at pre-crash position
- **Win Condition:** Time-based (longer runs = higher rank)

## Web3 Integration Points

### Token Sealing
- After each session, earned WBX can be sealed into ledger
- Sealed tokens = immutable record on ledger, enable future utility functions
- Visual feedback: "Seal Wallet" button in TallyScreen

### API Key Integration (Future)
- Players authenticate via API key (linked to wallet)
- Per-session fuel cost tracked in ledger
- Admin dashboard monitors fuel usage per player segment

### Smart Contract Readiness (Phase 2)
- Current mock wallet structure supports future on-chain state
- Ledger entries can be bridged to smart contract balance snapshot

---

## References

- wibx-runner (game mechanics, power-ups, wallet schema, design direction)
- NEXOS (ledger schema, sealed_content, ledger_entries, fuel_transactions, creator_wallets)
