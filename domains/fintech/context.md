# Fintech Domain: Context

## Business Vertical

Financial data processing for token package sales, with focus on multi-currency accounting (BRL fiat + WBX utility tokens) and whitelabel billing visibility.

## Core Operations

### CSV Processing Pipeline
1. **Input:** Backend exports raw CSV with single-quote delimited fields
2. **Parsing:** Client-side (browser) ingests and validates columns
3. **Extraction:** 9 accounting fields derived from nested JSON objects
4. **Export:** Excel `.xlsx` with formatted summary metrics
5. **Users:** Finance team for reconciliation and reporting

### Accounting Fields (9-Column Output)
1. `dataHora` — timestamp from `created_at`
2. `userId` — from `user_id`
3. `identification` — email or phone (from `user_email` or `ppd.customer.phoneNumber`)
4. `packageName` — combined `planName + planDescription`
5. `valorBRL` — fiat amount (from `ppd.fiatPrice` or `payment_amount`)
6. `wbxAmount` — token distributed (from `ppd.benefits[0].quantity` or `pay_wibx_amount`)
7. `quotation` — WBX/BRL exchange rate at transaction time
8. `whitelabel` — partner name from `ppd.whitelabelName`
9. `fees` — transaction fees (nullable, from `ppr.fees`)

### Backend CSV Schema (Input)
```
id, user_id, user_email, payment_amount, payment_provider_data, 
payment_provider_result, created_at, pay_wibx_amount
```

**Nested Objects:**
- `payment_provider_data` (JSON): planName, planDescription, fiatPrice, benefits[{quantity}], quotation, whitelabelName, customer.phoneNumber
- `payment_provider_result` (JSON): fees (nullable)

## Financial Standards

### Multi-Currency Handling
- **BRL (Real):** Primary accounting currency, from Stripe/payment provider
- **WBX (Wibx Token):** Utility token, distributed per purchase
- **Exchange Rate:** Captured per transaction in `quotation` field

### Brazil Locale Requirements
- **CPF Formatting:** `XXX.XXX.XXX-XX` via `ngx-mask` (Angular)
- **CNPJ Formatting:** `XX.XXX.XXX/XXXX-XX` via `ngx-mask`
- **Phone Numbers:** Formatted as `(XX) XXXXX-XXXX`
- **Currency Display:** BRL before amount: `R$ 1.234,56`
- **Date Format:** `DD/MM/YYYY HH:mm:ss`
- **Decimal Separator:** Comma (`,`) for display, period (`.`) for data

### Precision & SafeMath
- **Tool:** bignumber.js (aliased as `SafeMath` in Angular)
- **Use Case:** All money calculations to prevent floating-point errors
- **Example:** `SafeMath(1.1).plus(2.2).toFixed(2)` → `"3.30"`

## Whitelabel Billing

Each transaction can be attributed to a whitelabel partner, enabling:
- Revenue breakdown per partner
- Settlement tracking
- Commission calculations
- Partner performance analytics

## Summary Metrics (Exported)

Auto-calculated on export:
- Total BRL revenue (sum of `valorBRL`)
- Total WBX distributed (sum of `wbxAmount`)
- Average transaction fee (mean of `fees`)
- Whitelabel count (distinct `whitelabel` values)
- Unique users (distinct `userId`)
- Distinct packages (distinct `packageName`)
- Average quotation rate (mean of `quotation`)

## Technology Stack

- **Frontend:** React + Vite + Tailwind (investigator pattern)
- **Export Library:** SheetJS (XLSX)
- **Locale:** pt-BR
- **Form Validation:** ngx-mask (CPF/CNPJ), centralized error handling
- **Zero Backend:** All processing client-side (Finesta pattern)

## Compliance & Audit

- CSV audit trail: filename includes export timestamp
- No data sent to backend post-export
- Finance team verifies export locally before forwarding to accounting
- All calculations transparent in UI (preview before export)

---

## References

- finesta (token package CSV tool, 9-field accounting)
- NEXOS (commercial schemas: products, proposals, leads, ledger)
- bifrost-framework (Money handling: SafeMath, Brazil locale patterns)
