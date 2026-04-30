# Web3 Domain: AI Prompts

## Token Distribution Balance Analysis

**Context:** Game designers need to tune WBX earning rates to maintain engagement without inflating token supply.

**Prompt Template:**
```
Analyze the WBX token distribution across game sessions:

Current Settings:
- Base WBX per token collectible: {BASE_WBX}
- Multiplier power-up effect: {MULTIPLIER_RATE}x
- Speed bonus curve: +{BONUS_PER_SECOND}% WBX/sec as game speed increases
- Revive cost: 2^(n-1) WBX

Historical Data:
{SESSION_LEDGER_DATA}

For each session segment (grouped by player level/duration):
1. Calculate average WBX earned per minute
2. Compare vs target earning rate (should feel rewarding but not inflationary)
3. Identify broken incentive loops:
   - Sessions where revive cost exceeded session earnings (frustration risk)
   - Power-up durations too short/long (engagement sweet spot: 5-15 sec)
   - Multiplier uptime % (goal: 15-25% active)

4. Predict long-term ledger impact:
   - If current earning continues 1 month → total supply growth
   - Recommend rate adjustment if supply growth >20%

Output: Tuning recommendations with rationale
- Adjust base collectible value? (↑ for engagement, ↓ for scarcity)
- Change multiplier effect? (affects power-up desirability)
- Speed bonus curve? (keeps long sessions valuable)
```

## Revive Cost Calibration

**Context:** Monetization team wants optimal revive pricing (in WBX) that maximizes player retention without frustrating free players.

**Prompt Template:**
```
Optimize WBX revive cost structure:

Current Formula: Cost = 2^(n-1) where n = revive attempt number
- 1st revive: 1 WBX
- 2nd revive: 2 WBX
- 3rd revive: 4 WBX
- 4th revive: 8 WBX
- ...

Player Data:
{PLAYER_SESSION_HISTORY}

Analyze:
1. Revive Acceptance Rate by Cost Level:
   - What % of players accept 1-WBX revive? 2-WBX? 4-WBX?
   - Drop-off point (cost where players leave game)

2. Revive Video Ad Usage:
   - What % choose free revive (ad watch) vs paid?
   - Ad fatigue signal: declining video accept rate over session

3. Loss Aversion Effectiveness:
   - Sessions with 2-4 revives show higher engagement than 0-revive sessions?
   - Does losing WBX drive faster next-game restart (viral loop)?

4. Whale vs F2P Balance:
   - High spenders: using revives as primary game loop (healthy)
   - Free players: hitting wall (churn risk)

Recommend:
- Adjust cost curve (e.g., 1, 2, 4, 8, 16 vs 1, 2, 3, 4, 5 for softer curve)
- First X revives free per day? (retention boost)
- Hybrid: 1st revive free (video), 2nd WBX, 3rd video, ...
- Bonus revives for achievement unlock?

Target: >40% revive engagement rate, <3% revenue impact on earned WBX
```

## Power-up Tier & Duration Design

**Context:** Game balance team needs to ensure power-ups feel impactful but don't dominate gameplay.

**Prompt Template:**
```
Balance power-up tier progression:

Current System:
- Max tier level: L_max = 5
- Base duration: T_base = 5 seconds
- Extended duration: T_max = T_base + (L × 5 seconds)
- Tiers: Magnet, Multiplier, SuperJump, Shield

Tier Progression:
- L1: 5s base + 5s bonus = 10s total
- L2: 5s base + 10s bonus = 15s total
- L3: 5s base + 15s bonus = 20s total
- L4: 5s base + 20s bonus = 25s total
- L5: 5s base + 25s bonus = 30s total

Player Progression Data:
{PLAYER_TIER_DATA}

Analyze each power-up type:
1. Magnet (Pull-in collectibles):
   - Active usage % per tier (how many players reach L5?)
   - Score impact: avg score with/without Magnet active
   - If L5 Magnet = 30s full pull-in → too dominant? Risk trivializing gameplay
   
2. Multiplier (Score ×2):
   - Psychological impact: does 5s feel too short? (expect >7s preference)
   - Stacking abuse: if player chains Multiplier+Magnet, score spike?
   
3. SuperJump (Higher/further jumps):
   - Mechanic clarity: players understand upgrade = height increase?
   - Progression bottleneck: are most players stuck at L2 (cost too high)?
   
4. Shield (One-hit protection):
   - Most used power-up? (suggests revive economy not painful enough)
   - Ideal: <20% of session time with active Shield (not safety net)

Recommend:
- Tier cost curve (if premium keys required)
- Duration curve adjustment (e.g., linear vs exponential)
- Per-power-up balancing (Magnet may need shorter max than Shield)
- Stacking rules (can player overlap Magnet+Multiplier? Suggest no)

Goal: Tiers 1-3 feeling natural progression, Tier 4-5 aspirational (grind target)
```

## Advertising Placement Logic (Indica+)

**Context:** Revenue team needs AI to optimize ad placement frequency and relevance without breaking immersion.

**Prompt Template:**
```
Optimize Indica+ environmental ad delivery:

Current Ad Placements:
- Holographic billboards (changeable in real-time during gameplay)
- Train wraps (static per session, 3-4 visible per avg session)
- Skyline branding (always-on background, low cognitive load)

Player Engagement Data:
{SESSION_VIEW_TIME_BY_AD_PLACEMENT}

Rules:
1. No modal/fullscreen ads (game keeps running)
2. No ad changes during obstacles (player attention on survival)
3. Natural placement: immersive to game world (Brazilian urban setting)

Analysis:
1. View Duration by Placement:
   - How long do players spend looking at each ad type?
   - Correlation: longer view time = better brand recall?

2. Ad Frequency Tolerance:
   - Current: X billboards per session
   - Player churn if we increase to X+1? (saturation point)
   - Optimal: max 5-8 unique ad impressions per 5-min session

3. Placement-Specific Optimization:
   - Billboards: rotate every 20-30 seconds? (keep fresh but not jarring)
   - Train wraps: 1 per track section (procedural placement)
   - Skyline: subtle, low-frequency change (once per session)

4. Player Segment Targeting:
   - Spenders: tolerate more ads (already invested)
   - Free players: need light ad load (retention sensitive)
   - New players: minimal ads first 3 sessions (onboarding)

Recommend:
- Ad rotation schedule per placement type
- Frequency cap per session (avoid fatigue)
- A/B test results: does 5 ads → 7 ads reduce session length? (trade-off analysis)
- Indica+ brand integration intensity (can billboard show product? Or just brand colors?)

Goal: Revenue contribution + player retention score > current baseline
```

## Token Economics Sustainability

**Context:** Long-term game health requires balancing earning, sinking, and ledger growth.

**Prompt Template:**
```
Project WBX token economics over 12 months:

Current State:
- Daily active users: {DAU}
- Avg WBX earned per session: {AVG_EARN}
- Sessions per user per day: {SESSIONS_PER_DAY}
- Revive spending (WBX burn): {AVG_REVIVE_BURN_PER_SESSION}%
- Seal rate (WBX locked to ledger): {SEAL_RATE}%

Projected Growth:
- User growth: {GROWTH_RATE}% MoM
- Power-up monetization: {PCT_USERS} of users pay for tiers
- Ad impression value: {USD_PER_MILLE}

Model:

Month 1-3 (Growth Phase):
- Supply = DAU × sessions × avg_earn - burn
- If supply growth >15% per month → risk inflation

Month 4-6 (Maturity Phase):
- New user cohorts at lower earning (late joiners at disadvantage)
- Recommend: Tier-based earning (veteran users earn less)

Month 7-12 (Sustainability Phase):
- Sealed WBX reduces circulating supply
- Introduce WBX sinks: cosmetics, power-up unlocks, passes

Red Flags:
- Total ledger WBX > total earned (accounting error or hack)
- Seal rate <20% (players not valuing ledger)
- Revive cost exceeds avg session earnings (players churn)

Recommend:
1. Dynamic earning rate (adjust base collectible value if supply >target)
2. Anti-inflation sink: weekly cosmetic shop requires WBX
3. Battle pass (seasonal): costs WBX, rewards cosmetics + tokens
4. Waypoint: unlock permanent WBX boost after X sessions (engagement hook)

Monitoring: Monthly supply/burn reconciliation, flag anomalies >5%
```

---

## References

- wibx-runner (game mechanics, revive economy, power-up tiers, wallet persistence)
- NEXOS (ledger schema, creator_wallets, ledger_entries, fuel_transactions)
