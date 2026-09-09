# Crewvia accounting workspace

## Outcome
Build a polished, mobile-friendly internal finance workspace centered on the real workflow: record money movement, calculate a date range, inspect transparent distributions, then settle obligations without erasing history.

## Business model
- Crewvia direct business distributes net result through a configurable 30% Jafarussadiq / 30% Mustafa / 30% Qasim / 10% Crewvia rule.
- BNI first distributes 50% to Saifuddin and 50% to Crewvia, then cascades Crewvia's share through the same internal rule. The effective BNI result is 50% Saifuddin, 15% each for Jafarussadiq, Mustafa, and Qasim, and 5% Crewvia.
- Profit entitlement, cash balances, partner advances, receivables/payables, and settlement payments remain separate concepts.

## Accounting model
- Parties and accounts are distinct: parties represent people/entities; accounts represent business, partner, JV, payee, or cash ledgers.
- Immutable transactions capture date, type, amount in minor currency units, source/destination, business, category, payee, notes, and reversal/audit metadata.
- Business rules are versioned ownership snapshots. A calculation period snapshots the exact rules and included transaction IDs.
- Calculations derive income minus expenses per business, apply direct or nested distribution rules, then create obligations. Existing receipts, partner-paid advances, and prior settlement allocations reduce or increase each party's net position.
- Settlements append settlement records against obligations; partial settlement leaves the remainder open. Transfers affect cash ledgers only and never profit.

## Data shape to persist in Lovable Cloud
- `parties`, `accounts`, `businesses`, `categories`
- `distribution_rules`, `distribution_rule_members` with optional child-rule links
- `transactions`, `transaction_lines`, `audit_logs`
- `calculation_periods`, `calculation_inputs`, `calculation_results`, `calculation_result_lines`
- `obligations`, `settlements`, `settlement_lines`

All financial tables get explicit grants, RLS, indexes, decimal-safe amount constraints, and uniqueness guards for duplicate transaction/settlement references. Historical calculation rows store immutable rule and result snapshots.

## Calculation and settlement behavior
1. Validate the date range and active rule totals.
2. Include only non-reversed transactions in the range; separate income, expenses, transfers, distributions, and partner advances.
3. Compute each business net result with fixed-point integer minor units.
4. Apply a deterministic largest-remainder rounding allocator so distributed totals equal the exact source amount.
5. Roll forward open obligations from earlier periods, then apply current entitlements, advances, receipts, and recorded settlements.
6. Net party positions and minimize settlement instructions by matching debtors to creditors greedily, preserving exact cents.
7. Save a reviewable snapshot only after confirmation.

## UI architecture
- A single workbench route at `/` with a compact left rail and responsive mobile navigation.
- Dashboard view: period controls, cash/result cards, partner net positions, settlement queue, and recent transactions.
- Transactions view: searchable/filterable ledger plus a guided Add transaction sheet supporting expense, income, transfer, receipt, and partner advance.
- Calculate view: preview by business, nested BNI explanation, partner entitlement/received/advance/net table, and a finalize action.
- Settlements view: open obligations, suggested transfers, partial/full settlement dialog, and settlement history.
- Accounts, partners, payees, reports, and settings views provide focused summaries without duplicating the accounting logic.

## Important assumptions
- Currency is INR and amounts are entered in rupees but stored as integer paise.
- A transaction's selected business is the profit context; selected source/destination accounts drive cash and reimbursement attribution.
- “Already received” means recorded receipts/distributions/payments toward an entitlement, not arbitrary cash transfers.
- The first usable release ships with the provided Crewvia/BNI parties, rules, and example transactions as clearly marked demo data, while keeping all records editable through the app.

## Validation strategy
- Unit-test fixed-point distribution, nested BNI allocation, expense netting, transfers, advances, partial/full settlements, historical carry-forward, multiple payees, duplicate prevention, and rounding.
- Validate every form with shared schemas on the client and server; reject invalid rule totals, negative amounts, invalid transfer endpoints, duplicate references, and over-settlements.
- Verify the dashboard, calculation breakdown, settlement update, and mobile layout against the running preview before completion.
