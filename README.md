# Crewvia Ledger

Build a Multi-Account Accounting & Profit-Settlement Software for Crewvia

You are a senior software architect, accountant, product designer, and full-stack engineer.

I want you to design and build a complete, reliable, easy-to-use accounting and internal settlement software for my small company, Crewvia.

This is not a generic accounting application. It is a custom internal accounting system based specifically on the ownership structure, joint ventures, accounts, payments, profit distribution, ledgers, and settlement rules described below.

Your job is to fully understand the business logic first, convert it into a robust accounting model, and then implement the software without changing the underlying business context.

1. BUSINESS STRUCTURE

The main company is:

Crewvia

Crewvia has four internal equity holders:

Jafarussadiq — 30%

Mustafa — 30%

Qasim — 30%

Crewvia company reserve/business share — 10%

Total:

Jafarussadiq: 30%

Mustafa: 30%

Qasim: 30%

Crewvia: 10%

Total = 100%

The software must understand these ownership percentages as configurable ownership/distribution rules rather than hard-coded assumptions wherever practical.

2. BNI JOINT BUSINESS STRUCTURE

Crewvia is also doing business with another company/person/entity referred to as:

BNI

The BNI business arrangement is:

BNI side / Saifuddin: 50%

Crewvia: 50%

Therefore, the total BNI business is divided:

BNI/JV total = 100%

Saifuddin = 50%

Crewvia = 50%

The important part is that Crewvia's 50% does NOT belong entirely to Crewvia as a single economic share.

Crewvia's 50% must itself be distributed according to Crewvia's internal ownership structure:

Crewvia internal distribution:

Jafarussadiq = 30% of Crewvia's share

Mustafa = 30% of Crewvia's share

Qasim = 30% of Crewvia's share

Crewvia company = 10% of Crewvia's share

Therefore, when calculating the final distribution of the BNI business:

BNI's 50% goes to Saifuddin.

Crewvia's 50% is internally distributed as:

Jafarussadiq = 30% of Crewvia's 50%

Mustafa = 30% of Crewvia's 50%

Qasim = 30% of Crewvia's 50%

Crewvia = 10% of Crewvia's 50%

This means that, as a percentage of the entire BNI business:

Saifuddin = 50%

Jafarussadiq = 15%

Mustafa = 15%

Qasim = 15%

Crewvia = 5%

Total = 100%

Do not incorrectly treat the 30%, 30%, 30%, and 10% as percentages of the entire BNI business. They are percentages of Crewvia's 50% share.

The system should support this nested ownership/distribution model.

3. REQUIRED ACCOUNTS / PARTIES

The software should be able to maintain separate accounts/ledgers for at least:

Crewvia

BNI

Saifuddin

Jafarussadiq

Mustafa

Qasim

The architecture should also allow additional accounts/parties to be created later without changing the core system.

Each account should have its own:

Ledger

Transactions

Income

Expenses

Receivables

Payables

Transfers

Adjustments

Settlements

Running balance

Historical records

The system must clearly distinguish between:

Company/business accounts

Partner/member accounts

Joint venture accounts

Vendors/service providers/payees

Other users or parties

4. PAYEE / USER MANAGEMENT

The software must allow me to create people or entities that we make payments to.

For example:

I may create:

Name: Husain
Tag/Role: Developer

Other examples could be:

Designer

Developer

Freelancer

Employee

Consultant

Vendor

Marketing

Contractor

Other

A user/payee should have a profile containing information such as:

Name

Tag/category

Contact information if needed

Notes

Active/inactive status

Transaction history

When making a payment to Husain, I should NOT have to manually calculate which account it belongs to.

I should be able to:

Select Husain

Enter payment amount

Select the account/source from which the payment is being made

Enter date

Select category/tag if required

Add description/notes

Save the transaction

For example:

Payee: Husain
Role: Developer
Amount: ₹50,000
Paid from: Crewvia
Date: 2026-09-01
Description: Development work

Or:

Payee: Husain
Role: Developer
Amount: ₹50,000
Paid from: BNI
Date: 2026-09-01
Description: BNI project development work

The system must correctly attribute the transaction to the selected source account.

5. TRANSACTION SYSTEM

Create a robust transaction system.

Every transaction should have, at minimum:

Unique transaction ID

Date

Amount

Transaction type

Source account

Destination/payee/account

Category

Description

Notes

Created timestamp

Updated timestamp

User who created/updated it

Settlement status where applicable

Reference to the relevant business/JV if applicable

Transaction types should support at least:

Income

Expense

Payment

Receipt

Transfer

Partner distribution

Profit allocation

Adjustment

Settlement

Refund/reversal

Do not simply overwrite financial transactions.

If a transaction is corrected, maintain an audit/history trail or reversal mechanism so financial history remains trustworthy.

6. ACCOUNT-SOURCE SELECTION

When recording a payment or expense, I need to be able to select exactly which account/business is paying.

For example:

Pay Husain

Amount: ₹20,000

Paid from:

Crewvia

BNI

Another configured account

The system must understand that these are financially different sources.

A payment from BNI must affect BNI's financial calculation.

A payment from Crewvia must affect Crewvia's financial calculation.

Do not mix transactions between accounts.

7. DATE RANGE CALCULATION

The software must have a powerful date-range calculation feature.

I should be able to select:

Start date

End date

Examples:

1 September → 30 September

1 October → 31 October

15 September → 15 October

Any custom date range

There should also be convenient presets such as:

This month

Previous month

This quarter

Current year

Previous year

Custom range

When I click:

Calculate

the system should calculate all relevant financial activity within that date range.

8. CALCULATION ENGINE

The calculation engine is the most important part of this application.

It must calculate the financial results accurately based on:

All income during the selected period

All expenses during the selected period

All payments during the selected period

Transfers

Adjustments

Previous unsettled balances

Existing settlements

Applicable ownership/distribution rules

Applicable joint-venture rules

The calculation must NOT simply look at raw cash movement.

It needs to maintain a proper ledger so that the system can determine what each party is actually owed or owes.

The calculation should produce a clear final result.

9. BNI CALCULATION

When transactions belong to the BNI business, the calculation engine must apply:

First level:

BNI business result = 100%

Saifuddin = 50%

Crewvia = 50%

Second level:

Crewvia's 50% is distributed:

Jafarussadiq = 30% of Crewvia's 50%

Mustafa = 30% of Crewvia's 50%

Qasim = 30% of Crewvia's 50%

Crewvia = 10% of Crewvia's 50%

Equivalent final BNI distribution:

Saifuddin = 50%

Jafarussadiq = 15%

Mustafa = 15%

Qasim = 15%

Crewvia = 5%

The system should preferably show both levels so the calculation is transparent.

For example:

BNI Net Profit = ₹1,00,000

Saifuddin:

₹1,00,000 × 50% = ₹50,000

Crewvia share:

₹1,00,000 × 50% = ₹50,000

Then:

Jafarussadiq:

₹50,000 × 30% = ₹15,000

Mustafa:

₹50,000 × 30% = ₹15,000

Qasim:

₹50,000 × 30% = ₹15,000

Crewvia:

₹50,000 × 10% = ₹5,000

Final:

Saifuddin: ₹50,000

Jafarussadiq: ₹15,000

Mustafa: ₹15,000

Qasim: ₹15,000

Crewvia: ₹5,000

The calculation engine must work dynamically for any amount.

10. CREWVIA DIRECT BUSINESS CALCULATION

Crewvia itself has the following distribution structure:

Jafarussadiq = 30%

Mustafa = 30%

Qasim = 30%

Crewvia = 10%

For Crewvia's own distributable profit/result, the software must apply these percentages.

The system should clearly distinguish:

Crewvia's own business activity

from

BNI joint business activity

because their distribution rules are different at the first level.

Do not combine them incorrectly.

11. WHO OWES WHOM

After calculation, the software must determine:

Who owes whom?

This is a critical requirement.

The software should calculate each party's:

Total earned/share

Total amount already received

Total amount paid on behalf of others

Total amount owed

Total amount owing

Net balance

Then it should generate a settlement summary.

Example concept:

PartyEntitledAlready ReceivedPaid/AdvancedNet PositionJafarussadiq₹X₹Y₹Z₹...Mustafa₹X₹Y₹Z₹...Qasim₹X₹Y₹Z₹...Crewvia₹X₹Y₹Z₹...Saifuddin₹X₹Y₹Z₹...

Then produce human-readable settlement instructions such as:

Mustafa owes Jafarussadiq ₹X

Crewvia owes Qasim ₹X

Saifuddin owes Crewvia ₹X

The actual results must come from the accounting data, not be hard-coded.

The settlement engine should try to minimize the number of transfers required to settle all outstanding balances while preserving the exact net positions.

12. SETTLEMENT SYSTEM

After I calculate a period, there should be a clear:

Settle

action.

Settlement is extremely important.

Suppose September is calculated and the system says:

Jafarussadiq is owed ₹20,000

Mustafa owes ₹10,000

Qasim owes ₹10,000

If the amounts are settled, the system must record that settlement.

When I calculate again later, the September settled amounts must NOT appear as new outstanding amounts.

However, the original historical transactions and calculation must remain permanently available.

Settlement must therefore mean:

Mark/record the financial obligation as settled, not delete or alter the original ledger.

13. FUTURE CALCULATIONS MUST BE FRESH

This is a very important requirement.

Example:

I calculate:

1 September → 30 September

The system produces the September result.

I then settle the September result.

Later, I calculate:

1 October → 31 October

The system must calculate October activity correctly without duplicating September's already-settled obligations.

The historical ledger must remain intact.

If there are previous unsettled balances, those should carry forward appropriately.

Therefore, the system needs a proper distinction between:

Transaction date

Accounting period

Calculated result

Outstanding balance

Settlement

Settled amount

Carry-forward balance

Do not simply reset the ledger at the end of every month.

The overall ledger must remain continuous.

14. ACCOUNTING PERIOD / SNAPSHOT

Each calculation should create a traceable calculation result/snapshot.

For example:

September 2026 Calculation

Period:
01-09-2026 → 30-09-2026

Status:

Calculated

Partially settled

Settled

It should be possible to open an old calculation and see exactly:

What transactions were included

What income was included

What expenses were included

Which distribution rules were used

How each person's share was calculated

What had already been paid

What remained outstanding

What settlements were made

This is necessary so historical financial results can be audited and understood later.

15. LEDGER

Every account should have a detailed ledger.

A ledger should show:

Date

Transaction

Debit

Credit

Amount

Balance

Source

Destination

Category

Reference

Settlement status

There should be:

Individual ledger

For:

Jafarussadiq

Mustafa

Qasim

Saifuddin

Crewvia

BNI

Business ledger

For:

Crewvia business

BNI business

Payee ledger

For people such as:

Husain

Future developers

Designers

Vendors

Contractors

16. DASHBOARD

Create a simple but professional dashboard.

The dashboard should immediately show:

Current overall balance

Crewvia balance

BNI balance

Outstanding receivables

Outstanding payables

Partner balances

Current period income

Current period expenses

Current period net result

Unsettled amounts

Recent transactions

Upcoming/relevant settlements

There should be a clear primary action:

Calculate

and another clear action:

Settle

17. PARTNER VIEW

There should be a partner summary showing:

Jafarussadiq

Ownership

Current calculated share

Amount received

Amount paid on behalf of business

Amount owed

Amount owing

Net balance

Historical distributions

Settlement history

Same for:

Mustafa

Qasim

Saifuddin

And:

Crewvia

The system should make it immediately obvious how much each party is entitled to and why.

18. TRANSPARENCY OF CALCULATIONS

Never show only a final number.

Every calculated amount should be explainable.

For example, if Jafarussadiq receives ₹15,000 from a BNI calculation, the UI should allow me to see:

BNI net result:

₹1,00,000

BNI → Saifuddin:

50% = ₹50,000

BNI → Crewvia:

50% = ₹50,000

Crewvia → Jafarussadiq:

30% of ₹50,000 = ₹15,000

Final Jafarussadiq share:

₹15,000

This calculation breakdown should be available wherever money is distributed.

19. EXPENSE HANDLING

Expenses need to be properly associated with the correct business/account.

For example:

BNI business earns:

₹5,00,000

BNI expenses:

₹1,00,000

Net distributable result:

₹4,00,000

The system should apply the appropriate distribution percentages to the net result, not incorrectly distribute the gross revenue if the business rules define profit distribution after expenses.

The software should clearly distinguish:

Revenue/income

Expense

Net profit/result

Distribution

Actual cash payment

Settlement

Do not double-count expenses or distributions.

20. PAYMENTS MADE ON BEHALF OF OTHERS

The system must support situations where one person pays an expense on behalf of a business or another party.

Example:

Jafarussadiq personally pays ₹10,000 for a BNI business expense.

This should not simply disappear as a personal expense.

The system should record:

Who actually paid

Which business/account benefited

Amount

Date

Expense category

Whether reimbursement is due

Settlement status

The calculation engine should incorporate such advances/reimbursements into the "who owes whom" calculation.

21. TRANSFERS BETWEEN ACCOUNTS

Support transfers such as:

Crewvia → BNI

BNI → Crewvia

Crewvia → Jafarussadiq

Jafarussadiq → Crewvia

etc.

Transfers must not incorrectly be treated as revenue or expenses.

A transfer should affect the relevant account balances but should not create artificial profit.

22. CATEGORIES AND TAGS

Allow customizable categories/tags.

Examples:

Developer

Designer

Marketing

Office

Software

Hosting

Travel

Contractor

Salary

Vendor

Miscellaneous

Categories should be manageable from settings.

23. SEARCH AND FILTERING

The application should support:

Search transactions

Filter by date

Filter by account

Filter by person

Filter by category

Filter by transaction type

Filter by settlement status

Filter by business/JV

Sort by date

Sort by amount

24. REPORTS

Generate reports for any selected date range.

At minimum:

Profit/Result Report

Show:

Total income

Total expenses

Net result

Distribution Report

Show:

Total distributable amount

Each party's percentage

Each party's calculated amount

Partner Ledger

Detailed partner-level transactions.

Settlement Report

Show:

Who owes whom

Amount

Settlement status

Settlement date

Business Report

Separate reporting for:

Crewvia

BNI

Combined Overview

Show the overall financial position while keeping individual businesses logically separated.

25. DATA INTEGRITY

Financial accuracy is more important than visual complexity.

The application must prevent:

Duplicate transactions

Duplicate settlements

Incorrect percentage totals

Negative/incorrect ownership distribution caused by rounding

Double-counting transfers

Double-counting expenses

Settling the same obligation twice

Deleting historical accounting information accidentally

All monetary calculations must use appropriate decimal/fixed-precision handling.

Do not use floating-point arithmetic in a way that can create financial rounding errors.

26. ROUNDING

Define a consistent rounding policy.

If percentage calculations create fractions of the smallest currency unit, use a deterministic rounding strategy.

The system must ensure that the total distributed amount exactly equals the distributable amount after rounding.

Any rounding difference should be handled explicitly and transparently rather than silently disappearing.

27. OWNERSHIP RULE CONFIGURATION

Do not hard-code the ownership percentages throughout the application.

Create an ownership/distribution configuration system.

For example:

Crewvia

Jafarussadiq: 30%

Mustafa: 30%

Qasim: 30%

Crewvia: 10%

BNI

Saifuddin: 50%

Crewvia: 50%

Then Crewvia's 50% is linked to Crewvia's internal distribution rule.

This allows the business structure to be changed in the future without rewriting the entire calculation engine.

Important:

Historical calculations should preserve which ownership/distribution configuration was used at the time of calculation.

Changing ownership percentages in the future must not silently change historical completed calculations.

28. ACCOUNTING MODEL

Before implementing the application, design a proper underlying accounting model.

Use concepts such as:

Accounts

Parties

Transactions

Transaction lines where appropriate

Business entities

Joint ventures

Ownership rules

Distribution rules

Period calculations

Obligations

Settlements

Transfers

Audit history

Avoid building the system as a collection of unrelated balance fields.

Balances should be derived from reliable transaction/ledger data.

29. DATABASE DESIGN

Design a normalized database suitable for this application.

Consider entities/tables such as:

users

accounts

parties

businesses

joint_ventures

ownership_rules

ownership_rule_members

categories

transactions

transaction_lines

distributions

calculation_periods

calculation_results

obligations

settlements

settlement_lines

audit_logs

You may rename or restructure these if you determine a better architecture.

Explain the final schema and relationships before implementation.

Use proper primary keys, foreign keys, indexes, constraints, and transaction integrity.

30. USER EXPERIENCE

The software is for a small company, so it must be:

Simple

Fast

Clear

Professional

Easy to learn

Mobile-friendly/responsive

Difficult to make accounting mistakes in

Do not create an unnecessarily complicated enterprise accounting UI.

The most common workflow should be very quick:

Add transaction → Select account → Save → Calculate → Review → Settle

31. MAIN SCREENS

At minimum, design the following screens:

Dashboard

Accounts

Partners

Businesses / Joint Ventures

Payees

Add Transaction

Transaction List

Individual Ledger

Calculate

Calculation Details

Settlement

Settlement History

Reports

Settings

Ownership / Distribution Rules

32. ADD TRANSACTION UX

The Add Transaction screen should dynamically adapt based on transaction type.

For example:

Expense

Fields:

Date

Business/account

Paid by

Payee

Amount

Category

Description

Notes

Income

Fields:

Date

Business/account

Received from

Amount

Category

Description

Transfer

Fields:

Date

From account

To account

Amount

Description

Partner advance

Fields:

Partner

Business

Amount

Date

Description

The system should prevent invalid combinations.

33. CALCULATE WORKFLOW

The calculation screen should allow:

Start Date

End Date

Then:

Calculate

Before finalizing, show a calculation preview.

The preview should contain:

Income

Total income by business/account.

Expenses

Total expenses by business/account.

Net Result

Net result for each business/account.

Distribution

How the net result is distributed.

Existing Advances / Payments

Amounts already paid to or by partners.

Outstanding Balances

Who is owed what.

Settlement Suggestions

Who should pay whom.

Only after reviewing should I be able to finalize/save the calculation.

34. SETTLEMENT WORKFLOW

After a calculation:

Show all outstanding obligations.

For example:

Settlement required

Jafarussadiq → Mustafa: ₹X

or

Mustafa → Jafarussadiq: ₹X

The user should be able to:

Select settlement

Enter actual settlement date

Enter amount

Choose payment method if desired

Add reference/notes

Confirm settlement

Support:

Full settlement

Partial settlement

If partially settled, the remaining balance must remain outstanding.

Example:

Outstanding = ₹50,000

Settled = ₹20,000

Remaining = ₹30,000

The system must remember this correctly.

35. HISTORICAL LEDGER REQUIREMENT

Never delete historical financial information just because a month has been settled.

Example:

September:

Calculated = ₹1,00,000

Settled = ₹1,00,000

October calculation should start with the correct continuing ledger state.

September must still be accessible from:

Reports → Historical Calculations

and:

Ledger → Historical Transactions

The system should provide a complete audit trail.

36. IMPORTANT ACCOUNTING DISTINCTION

Do not confuse:

Cash balance

with:

Profit/share entitlement

with:

Receivable/payable

with:

Settlement

These are different concepts.

For example, someone can have a ₹30,000 profit entitlement while already having received ₹10,000.

The remaining obligation is ₹20,000.

Similarly, someone may have personally paid ₹15,000 on behalf of a business and therefore have a reimbursement receivable.

The calculation engine must account for these separately.

37. SECURITY

Implement appropriate authentication and authorization.

At minimum, support:

Login

Secure password handling

Session management

User roles

Admin access

Authorized accounting users

Financial data should not be publicly accessible.

Include audit logs for important changes.

38. BACKUP / DATA SAFETY

Because this is financial software, data safety is critical.

Design for:

Database backups

Data export

CSV/Excel export where appropriate

Report export

Recovery from accidental changes

Audit history

Do not create a system where the only copy of the financial ledger exists in browser/local state.

39. VALIDATION

The application must validate:

Required fields

Valid amounts

Valid dates

Valid account relationships

Ownership percentages

Distribution percentages

Settlement amounts

Duplicate transactions

Invalid transfers

Invalid settlement states

Ownership percentages should be validated so that a distribution layer totals 100%.

40. TESTING

Before considering the application complete, create comprehensive tests for the financial calculation engine.

At minimum test:

Test 1 — Crewvia distribution

Net result = ₹1,00,000

Expected:

Jafarussadiq = ₹30,000

Mustafa = ₹30,000

Qasim = ₹30,000

Crewvia = ₹10,000

Test 2 — BNI distribution

Net result = ₹1,00,000

Expected:

Saifuddin = ₹50,000

Crewvia = ₹50,000

Crewvia's ₹50,000:

Jafarussadiq = ₹15,000

Mustafa = ₹15,000

Qasim = ₹15,000

Crewvia = ₹5,000

Final:

Saifuddin = ₹50,000

Jafarussadiq = ₹15,000

Mustafa = ₹15,000

Qasim = ₹15,000

Crewvia = ₹5,000

Test 3 — Expenses

Revenue = ₹5,00,000

Expenses = ₹1,00,000

Net result = ₹4,00,000

Distribution must be based on ₹4,00,000 according to the applicable business rule.

Test 4 — Partner advance

Jafarussadiq pays ₹10,000 personally for a BNI expense.

The system must record that BNI benefited from the expense and Jafarussadiq has a ₹10,000 reimbursement/advance position.

Test 5 — Partial settlement

Outstanding = ₹50,000

Settlement = ₹20,000

Remaining = ₹30,000.

Test 6 — Full settlement

Outstanding = ₹50,000

Settlement = ₹50,000

Remaining = ₹0.

Test 7 — Historical period

September is calculated and fully settled.

October must not duplicate September's settled obligation.

Test 8 — Transfers

A ₹50,000 transfer from Crewvia to BNI must not be incorrectly recognized as ₹50,000 revenue.

Test 9 — Multiple payees

Create Husain as Developer and record multiple payments from different accounts. Verify each account's ledger remains correct.

Test 10 — Rounding

Test calculations that produce fractional currency values and verify that the final distributed total exactly matches the distributable amount.

41. UX PRINCIPLE

The application should answer these questions immediately:

How much money does Crewvia have?

How much money does BNI have?

What happened during this month?

What is the net result?

How much belongs to Jafarussadiq?

How much belongs to Mustafa?

How much belongs to Qasim?

How much belongs to Crewvia?

How much belongs to Saifuddin?

Who has already been paid?

Who is still owed money?

Who owes whom?

Which settlements have been completed?

What remains outstanding from previous periods?

42. IMPORTANT: DO NOT CHANGE THE BUSINESS LOGIC

Do not simplify the ownership structure in a way that changes its meaning.

The core structure is:

Crewvia

30% Jafarussadiq
30% Mustafa
30% Qasim
10% Crewvia

BNI

50% Saifuddin
50% Crewvia

BNI → Crewvia internal distribution

30% of Crewvia's share → Jafarussadiq
30% of Crewvia's share → Mustafa
30% of Crewvia's share → Qasim
10% of Crewvia's share → Crewvia

Equivalent BNI final distribution:

50% Saifuddin
15% Jafarussadiq
15% Mustafa
15% Qasim
5% Crewvia

This logic must remain intact.

43. IMPLEMENTATION APPROACH

Do not immediately start writing random UI code.

First:

Understand the business rules.

Identify any accounting ambiguities.

Define the accounting model.

Define the entities and relationships.

Define the transaction model.

Define the calculation engine.

Define the settlement engine.

Define the database schema.

Define the API/service architecture.

Define the UI architecture.

Define validation rules.

Define test cases.

Then implement.

If a business rule is genuinely ambiguous, explicitly identify it and make the smallest possible assumption without changing the context.

Do not invent unrelated business rules.

44. REQUIRED CALCULATION EXPLANATION

Every calculation must be explainable.

For every final balance, the application should be able to answer:

"Why is this amount ₹X?"

It should show the chain of calculations and transactions that produced it.

For example:

BNI revenue
− BNI expenses
= BNI net result

BNI net result
× 50%
= Crewvia share

Crewvia share
× 30%
= Jafarussadiq share

Then subtract already received amounts and account for advances/settlements to arrive at the final outstanding balance.

The same principle should apply to every party.

45. TECHNICAL QUALITY

Build this as real production-quality software, not a prototype that only visually demonstrates the idea.

Prioritize:

Correct financial logic

Data integrity

Maintainability

Security

Clear architecture

Testability

Responsive UI

Good error handling

Auditability

Extensibility

Avoid unnecessary complexity, but do not sacrifice accounting correctness for simplicity.

46. FINAL DELIVERABLE

I want a complete working application.

Before implementation, provide:

Your understanding of the business model

The accounting model

Ownership/distribution model

Database schema

Calculation logic

Settlement logic

Application architecture

Main UI screens

Important edge cases

Testing strategy

Then implement the application.

If you are working inside an environment where you can create files and run the application, create the actual project files and make the application runnable.

Do not stop at a conceptual explanation if the environment allows implementation.

47. ACCEPTANCE CRITERIA

The software will be considered successful only if I can perform this complete workflow:

Step 1

Create/configure:

Crewvia

BNI

Saifuddin

Jafarussadiq

Mustafa

Qasim

Step 2

Configure ownership:

Crewvia:

30% Jafarussadiq

30% Mustafa

30% Qasim

10% Crewvia

BNI:

50% Saifuddin

50% Crewvia

Crewvia's BNI share:

30% Jafarussadiq

30% Mustafa

30% Qasim

10% Crewvia

Step 3

Create:

Husain → Developer

Step 4

Record payments to Husain from a selected account such as Crewvia or BNI.

Step 5

Record income, expenses, transfers, and partner advances.

Step 6

Select any date range.

Step 7

Click Calculate.

Step 8

See:

Income

Expenses

Net result

Each party's share

Amount already received

Advances

Outstanding balances

Who owes whom

Step 9

Click Settle.

Step 10

Record full or partial settlements.

Step 11

Calculate another period.

The new calculation must correctly maintain the historical ledger and carry forward only genuine outstanding balances.

Step 12

Open historical periods and see exactly how every previous calculation was produced.

48. DESIGN PHILOSOPHY

Make the application feel like a clean, modern internal finance dashboard rather than a complicated traditional accounting package.

The interface should be intuitive enough that a non-accountant can understand:

Money In → Money Out → Net Result → Distribution → Who Owes Whom → Settlement

The underlying system should be sophisticated and accounting-safe, while the user interface should remain simple.

IMPORTANT FINAL INSTRUCTION

Think deeply about the accounting architecture and financial state transitions before implementing.

Do not merely create screens that calculate percentages.

Build a real ledger-based system where:

Transactions → Ledgers → Business Results → Ownership Distribution → Obligations → Settlements → Historical Ledger

are connected correctly.

The most important requirement is that the system must remain mathematically and financially correct over multiple months, multiple accounts, multiple businesses, multiple partners, partial settlements, advances, transfers, and historical calculations.

Do not lose historical information.

Do not double-count money.

Do not double-count settlements.

Do not mix Crewvia and BNI accounting.

Do not incorrectly apply Crewvia's internal percentages to the entire BNI business.

Always preserve the distinction between:

Business ownership

Internal ownership

Revenue

Expenses

Profit/net result

Cash movement

Partner entitlement

Receivables/payables

Settlement

Historical ledger

Build the system around these principles.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d9a2ccbd-5437-470a-be6a-8f5616fba56f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
