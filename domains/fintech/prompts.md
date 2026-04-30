# Fintech Domain: AI Prompts

## CSV Ingestion & Validation

**Context:** You are processing financial transaction data exported from a payment processor. Your task is to validate format integrity and extract accounting-required fields.

**Prompt Template:**
```
Given the following CSV export (single-quote delimited) of WBX/BRL token package sales:

{CSV_DATA}

1. Validate that all required columns are present: id, user_id, user_email, payment_amount, 
   payment_provider_data (JSON), payment_provider_result (JSON), created_at, pay_wibx_amount

2. For each row, extract these 9 accounting fields:
   - dataHora (from created_at, format: DD/MM/YYYY HH:mm:ss)
   - userId (from user_id)
   - identification (email or phone, prefer email)
   - packageName (planName + planDescription)
   - valorBRL (fiatPrice or fallback payment_amount)
   - wbxAmount (benefits[0].quantity or fallback pay_wibx_amount)
   - quotation (WBX/BRL rate at transaction time)
   - whitelabel (whitelabelName, may be null)
   - fees (from payment_provider_result, may be null)

3. Flag any rows with missing critical fields (excluding nullable fees/whitelabel).

4. Return a JSON array of 9-field objects ready for Excel export.
```

## Accounting Reconciliation

**Context:** Finance team needs to reconcile token distributions against revenue and verify whitelabel settlements.

**Prompt Template:**
```
Analyze this fintech transaction dataset:

{EXTRACTED_DATA_JSON}

For each whitelabel partner (or "Direct" for null whitelabel):
1. Sum total BRL revenue
2. Sum total WBX distributed
3. Calculate WBX/BRL weighted average rate
4. Identify outlier transactions (fees > 2× median)
5. Check for date clustering (same-hour bulk purchases → potential test/fraud)

Generate a reconciliation summary:
- Partner: [name]
- Revenue: R$ [total]
- WBX Issued: [amount]
- Avg Rate: [quotation]
- Transaction Count: [n]
- Flagged Outliers: [list]
- Recommendation: [approve/review/investigate]
```

## Whitelabel Revenue Breakdown

**Context:** Executive needs visibility into per-partner revenue contribution and WBX distribution efficiency.

**Prompt Template:**
```
Given the fintech export dataset with whitelabel info:

{EXTRACTED_DATA_JSON}

Generate a whitelabel performance report:

For each whitelabel (sorted by revenue DESC):
1. Revenue contribution: R$ [total] ([% of total])
2. WBX distribution: [amount] ([avg cost per unit BRL])
3. Transaction volume: [n] transactions
4. Average order value: R$ [mean]
5. Customer retention proxy: [unique_users / transactions]
6. Fee impact: [avg fee %]
7. Trend: [↑ or ↓ vs last period if available]

Highlight:
- Top 3 partners by revenue
- Most cost-efficient distribution (WBX per BRL)
- Partners requiring review (high fees, low volume, etc.)
```

## WBX Quotation Analysis

**Context:** Understand token pricing trends and settlement accuracy over time.

**Prompt Template:**
```
Analyze WBX/BRL quotation data from this period:

{EXTRACTED_DATA_JSON}

1. Time-series quotation trend:
   - Min/Max/Mean rate
   - Volatility (std dev)
   - Detect rate jumps (>5% change between consecutive txns)

2. Quotation vs transaction size:
   - Were larger purchases offered better rates?
   - Correlation between valorBRL and quotation

3. Settlement accuracy:
   - Expected WBX payout: valorBRL / quotation
   - Actual WBX amount (wbxAmount)
   - Variance check (flag >1% discrepancies)

4. Pricing fairness:
   - All whitelabels offered same quotation?
   - Or custom per-partner rates?

Generate a quotation audit report with recommendations for next period's rate setting.
```

## Multi-Currency Reconciliation (Advanced)

**Context:** Accounting needs to reconcile BRL bank transfers against WBX ledger entries.

**Prompt Template:**
```
Cross-reference fintech CSV export with blockchain/ledger data:

Fintech Export (BRL):
{CSV_DATA}

Ledger Data (WBX):
{LEDGER_DATA}

For each user:
1. Match CSV user_id to ledger wallet address
2. Verify WBX amount matches exactly (or flag discrepancy with variance %)
3. Check timing: transaction created_at should match ledger seal timestamp (within 5 min window)
4. Detect orphan entries:
   - CSV row with no ledger seal = failed distribution
   - Ledger entry with no CSV source = phantom issuance

Generate reconciliation matrix:
- Matched pairs: [n]
- Timing mismatches: [n] (list)
- Amount discrepancies: [n] (list)
- Orphans (CSV side): [n] (list)
- Orphans (ledger side): [n] (list)
- Overall reconciliation %: [n]%

Recommend manual review for all non-matched entries.
```

## Tax & Compliance Report (Brazil)

**Context:** Tax preparation requires itemized transaction records and partner tax ID mapping.

**Prompt Template:**
```
Generate a Brazil tax compliance report from fintech data:

{EXTRACTED_DATA_JSON}

1. Revenue summary (per fiscal period):
   - Total BRL received (gross)
   - Total fees paid (deductible)
   - Net revenue
   - WBX liability (if revenue-recognized, value at issuance)

2. Whitelabel partner ledger:
   - Partner name, tax ID (CNPJ if available)
   - Gross payout (BRL)
   - Net after fees
   - Settlement status (paid / pending / disputed)

3. Customer base (anonymized):
   - Total unique users
   - Geographic distribution (infer from user_id pattern if available)
   - User acquisition channel (if available in CSV)

4. Tax risk flags:
   - Large single-user purchases (>R$5k)
   - Rapid successive transactions from same user (>5 in 1 hour)
   - Payments from high-risk geographies (if OFAC data available)

Output: CSV for accountant + flagged list for compliance review
```

---

## References

- finesta (CSV tool, 9-field extraction logic)
- NEXOS (commercial product/proposal schemas, ledger/wallet reconciliation)
