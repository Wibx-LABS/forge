# Support Domain: AI Prompts

## Account Health Diagnosis

**Context:** Tier 1 support agent needs AI to interpret diagnostic query results and explain status in customer-friendly language.

**Prompt Template:**
```
Diagnose account health:

Query Results:
{DIAGNOSTIC_QUERY_RESPONSE}

Schema Reference:
- Rewards: pending_balance, approval_date, compliance_flags
- Wallet: balance, sealed_status, last_transaction
- Transfer: status, initiated_date, blockchain_confirmation
- VIP: tier, benefits_active, next_tier_milestone
- Delivery: confirmed_blocks, tx_hash, confirmation_count

Task:
1. Overall Status: compliant / requires_review / blocked
2. Plain English Diagnosis: [1-2 sentences, customer-facing]
3. Actionable Details:
   - If compliant: "Your rewards are X WBX, approving on DATE"
   - If requires_review: "Your account is under review for REASON, we'll contact you by DATE"
   - If blocked: "Your account has a temporary hold. Please contact support immediately."

4. Next Steps for Agent:
   - If straightforward: None, customer can self-service
   - If ambiguous: Route to manager with context
   - If urgent: Escalate with priority flag

Output: Diagnosis JSON ready to send to customer.
```

## Reward Eligibility Check

**Context:** Support determines if customer qualifies for reward issuance, pending approval, or has eligibility blocks.

**Prompt Template:**
```
Evaluate reward eligibility:

Customer Data:
{WALLET_DATA}      # Balance, seal history
{TRANSACTION_LOG}  # Recent activity
{VIP_TIER}         # Tier + benefits

Eligibility Rules:
- Free tier: [rule set]
- VIP tier N: [rule set]
- Geographic restrictions: [list]
- Compliance status: no AML flags, no disputes

Task:
1. Eligibility status: eligible / pending_review / ineligible
2. For each active reward in queue:
   - Amount: X WBX
   - Status: approved / pending (reason) / denied (reason)
   - Next action: auto-distribute / await manual / contact customer

3. Compliance flags:
   - AML check passed? (check against compliance_flags)
   - Geographic restrictions? (infer from account)
   - Frequency limits? (check last distribution date)

4. Recommendation:
   - Immediate approve? Yes/No
   - If pending: What docs/info needed?
   - If denied: Explain why, suggest remediation

Output: Eligibility assessment + recommendation.
```

## VIP Tier Evaluation

**Context:** Support verifies VIP tier eligibility, explains benefits, and advises on next tier milestone.

**Prompt Template:**
```
Evaluate VIP tier:

Customer Data:
{VIP_TIER_DATA}      # current_tier, progress_score
{TRANSACTION_HISTORY}  # Spending, activity
{BENEFITS_ACTIVE}    # Current active benefits

VIP Tier Structure:
- Tier 0 (Free): no benefits
- Tier 1: [benefits list]
- Tier 2: [benefits list]
- ...
- Tier 5: [benefits list]

Milestone Progress:
- Points source: transactions, WBX sealed, referrals
- Current: X points toward Tier Y
- Next level: Y points needed

Task:
1. Verify tier accuracy: Is customer assigned correct tier?
2. Active benefits:
   - List all benefits customer currently qualifies for
   - Any benefits expiring soon? (flag)

3. Milestone progress:
   - Current points: X
   - Next tier requires: Y points
   - Progress: X/Y (Z%)
   - Estimated reach date (based on activity): DATE

4. Tier upgrade incentive:
   - If close (>80%): Highlight benefits of next tier
   - If far (<20%): Suggest spending/activity to accelerate

5. Recommendation:
   - Is tier correct? Yes/No
   - If no: Correct to [new_tier]
   - Any missing benefits? (escalate if found)

Output: Tier assessment + benefits summary + milestone roadmap.
```

## Transfer Status Investigation

**Context:** Support traces stuck or failed token transfers and identifies resolution path.

**Prompt Template:**
```
Investigate transfer:

Transfer Details:
{TRANSFER_LOG}     # initiated_date, amount, status, error_msg
{BLOCKCHAIN_DATA}  # tx_hash, confirmations, chain_status
{WALLET_STATE}     # Sending wallet balance, receiving wallet

Problem Statement:
{CUSTOMER_REPORT}  # "My tokens didn't arrive"

Task:
1. Transfer timeline:
   - Initiated: DATE
   - Last update: DATE
   - Duration elapsed: X hours

2. Status check:
   - Blockchain confirmed? Yes/No/pending
   - Confirmations: X/Y required
   - Chain status: submitted / included / finalized / failed
   - If failed: error_msg = ?

3. Root cause analysis:
   - Customer error (wrong address, insufficient balance)?
   - System error (failed submission, timeout)?
   - Blockchain issue (congestion, reorg, gas problem)?
   - Compliance block (AML hold, destination blacklist)?

4. Resolution path:
   - If pending: Wait X more hours (normal)
   - If confirmed but not credited: Manual reconciliation needed
   - If failed: Refund to source + reattempt with correct params
   - If blocked: Compliance team review needed

5. Customer communication:
   - Is transfer normal/expected, or problem? (set expectations)
   - ETA to resolution
   - Action customer should take (if any)

Output: Transfer status assessment + recommended next step.
```

## Delivery Status Check

**Context:** Support confirms token delivery on blockchain and provides customer with proof of delivery.

**Prompt Template:**
```
Check token delivery status:

Delivery Record:
{DELIVERY_LOG}     # initiated_date, tx_hash, amount, status
{BLOCKCHAIN_DATA}  # block_number, confirmations, gas_used
{WALLET_PROOF}     # Balance before/after delivery timestamp

Customer Question:
{CUSTOMER_INQUIRY}  # "Did my tokens arrive?"

Task:
1. Delivery confirmation:
   - Transaction hash: [tx_hash]
   - Status: confirmed / pending / failed
   - Confirmations: X (need 6+ for BTC, 12+ for others)

2. Proof of delivery:
   - Block number: X
   - Transaction link: [blockexplorer URL]
   - Amount confirmed: X.X WBX
   - Timestamp: DATE TIME

3. Timeline:
   - Submitted to blockchain: DATE
   - First confirmation: DATE
   - Final confirmation: DATE
   - Total time: X minutes

4. Wallet verification:
   - Expected balance before: A WBX
   - Amount received: X WBX
   - Balance after: B WBX
   - Verified match? Yes/No

5. Troubleshooting (if failed):
   - Transaction reverted on blockchain? (check status)
   - Customer looking at wrong address? (verify)
   - Gift not credited to game wallet? (requires bridging)

Output: Delivery confirmation + blockexplorer proof + customer-friendly explanation.
```

## Escalation Decision Logic

**Context:** Support agent needs guidance on when to escalate vs. resolve locally.

**Prompt Template:**
```
Should we escalate?

Issue:
{CUSTOMER_ISSUE}
{DIAGNOSTIC_RESULTS}

Escalation Triggers (Auto-escalate if ANY match):
1. Blocked account (compliance_flags present) → Compliance team
2. Transfer failed + blockchain error → Engineering team
3. Reward dispute (customer disagrees with calculation) → Finance team
4. VIP tier discrepancy + cannot auto-correct → Manager approval
5. Customer requesting exception (refund, bonus) → Manager approval
6. Multiple failures (>2 failed attempts) → Engineering + Manager

Local Resolution (Agent can handle):
- Tier verification + benefits explanation
- Reward status check (no disputes)
- Transfer status (pending, normal delays)
- Delivery proof + confirmation
- Simple account questions

Task:
1. Issue category: [type]
2. Root cause: [diagnosis]
3. Escalation needed? Yes / No
4. If yes:
   - Escalation type: [team]
   - Priority level: low / normal / high / critical
   - Required context for escalated team: [fields to include]
   - Suggested resolution path: [recommended action]

5. If no:
   - Resolution: [tell customer]
   - Next step: None (issue closed) / Monitor (follow up in 24h) / Customer action

Output: Escalation decision + ticket routing details.
```

---

## References

- investigator (BFF response format, diagnostic patterns)
- NEXOS (human_approvals escalation schema)
