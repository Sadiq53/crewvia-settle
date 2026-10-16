import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownLeft,
  ArrowLeftRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CircleDollarSign,
  ClipboardList,
  Landmark,
  LayoutDashboard,
  Scale,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  calculateDistribution,
  demoTransactions,
  formatINR,
  getNetResult,
  getOutstanding,
  initialSettlements,
  parties,
  type Transaction,
} from "@/lib/finance";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Crewvia Ledger — Finance workspace" },
      {
        name: "description",
        content: "Crewvia and BNI accounting workspace with transaction activity, profit distribution, and settlement overview.",
      },
      { property: "og:title", content: "Crewvia Ledger — Finance workspace" },
      {
        property: "og:description",
        content: "A clear view of Crewvia and BNI results, ownership distribution, and settlement activity.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FinanceWorkspace,
});

const views = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "settlements", label: "Settlements", icon: Scale },
] as const;

type WorkspaceView = (typeof views)[number]["id"];

const revenue = demoTransactions
  .filter((transaction) => transaction.type === "income")
  .reduce((sum, transaction) => sum + transaction.amount, 0);
const expenses = demoTransactions
  .filter((transaction) => transaction.type === "expense")
  .reduce((sum, transaction) => sum + transaction.amount, 0);
const advances = demoTransactions
  .filter((transaction) => transaction.type === "advance")
  .reduce((sum, transaction) => sum + transaction.amount, 0);
const crewviaResult = getNetResult(demoTransactions, "crewvia");
const bniResult = getNetResult(demoTransactions, "bni");
const distribution = calculateDistribution(demoTransactions);
const outstanding = getOutstanding(initialSettlements);

function FinanceWorkspace() {
  const [view, setView] = useState<WorkspaceView>("overview");
  const activeView = views.find((item) => item.id === view);

  return (
    <div className="min-h-screen bg-background text-foreground md:grid md:grid-cols-[228px_minmax(0,1fr)]">
      <aside className="flex flex-col border-b border-border bg-primary text-primary-foreground md:min-h-screen md:border-b-0 md:border-r md:border-primary-foreground/10">
        <div className="flex h-16 items-center gap-3 border-b border-primary-foreground/10 px-5">
          <div className="flex size-8 items-center justify-center rounded-sm bg-primary-foreground text-primary">
            <Landmark aria-hidden="true" className="size-4" />
          </div>
          <div>
            <p className="text-sm font-semibold">Crewvia</p>
            <p className="text-xs text-primary-foreground/65">Finance workspace</p>
          </div>
        </div>

        <nav aria-label="Finance sections" className="flex gap-1 overflow-x-auto p-3 md:flex-col">
          {views.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              type="button"
              variant="ghost"
              aria-current={view === id ? "page" : undefined}
              onClick={() => setView(id)}
              className={`h-10 justify-start px-3 text-sm ${
                view === id
                  ? "bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
                  : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              }`}
            >
              <Icon aria-hidden="true" className="size-4" />
              {label}
            </Button>
          ))}
        </nav>

        <div className="mt-auto hidden border-t border-primary-foreground/10 px-5 py-4 md:block">
          <div className="flex items-center gap-2 text-xs text-primary-foreground/70">
            <BookOpen aria-hidden="true" className="size-4" />
            Internal ledger
          </div>
        </div>
      </aside>

      <main className="min-w-0">
        <header className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-sm bg-muted text-foreground md:hidden">
              <Landmark aria-hidden="true" className="size-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">Crewvia ledger</p>
              <p className="text-xs text-muted-foreground">Internal accounting</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays aria-hidden="true" className="size-4" />
            <span>September 1–30, 2026</span>
          </div>
        </header>

        <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 sm:py-9">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">September close</p>
              <h1 className="text-2xl font-semibold">{activeView?.label ?? "Overview"}</h1>
              <p className="mt-1 text-sm text-muted-foreground">Crewvia direct business and BNI joint venture</p>
            </div>
            <div className="inline-flex items-center gap-2 border border-border px-3 py-2 text-xs text-muted-foreground">
              <span className="size-2 rounded-full bg-chart-2" />
              Sample ledger
            </div>
          </div>

          <div className="mb-7 flex items-start gap-3 border-l-2 border-chart-3 bg-muted/40 px-4 py-3 text-sm">
            <ClipboardList aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <p className="text-muted-foreground">
              Illustrative figures only. The live ledger currently has no recorded entries.
            </p>
          </div>

          {view === "overview" && <Overview />}
          {view === "transactions" && <TransactionView transactions={demoTransactions} />}
          {view === "settlements" && <SettlementView />}
        </div>
      </main>
    </div>
  );
}

function Overview() {
  const metrics = [
    { label: "Crewvia net result", value: crewviaResult, note: "Direct business", icon: Landmark },
    { label: "BNI net result", value: bniResult, note: "After BNI expenses", icon: CircleDollarSign },
    { label: "Open settlements", value: outstanding, note: "Across sample items", icon: Scale },
  ];

  return (
    <>
      <section aria-label="September summary" className="mb-8 grid border-y border-border sm:grid-cols-3">
        {metrics.map(({ label, value, note, icon: Icon }, index) => (
          <div
            key={label}
            className={`min-w-0 py-5 sm:px-5 ${index > 0 ? "border-t border-border sm:border-l sm:border-t-0" : "sm:pl-0"}`}
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="text-sm text-muted-foreground">{label}</p>
              <Icon aria-hidden="true" className="size-4 text-muted-foreground" />
            </div>
            <p className="font-mono text-2xl font-semibold">{formatINR(value)}</p>
            <p className="mt-1 text-xs text-muted-foreground">{note}</p>
          </div>
        ))}
      </section>

      <section aria-label="Period activity" className="mb-9">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold">Period activity</h2>
            <p className="mt-1 text-sm text-muted-foreground">Operating activity stays separate from transfers and advances.</p>
          </div>
          <p className="shrink-0 text-xs text-muted-foreground">INR</p>
        </div>
        <div className="grid gap-0 border-y border-border sm:grid-cols-3">
          <SummaryLine label="Income" value={revenue} icon={<ArrowDownLeft aria-hidden="true" className="size-4" />} />
          <SummaryLine label="Expenses" value={expenses} icon={<ArrowUpRight aria-hidden="true" className="size-4" />} />
          <SummaryLine label="Partner advance activity" value={advances} icon={<ArrowLeftRight aria-hidden="true" className="size-4" />} />
        </div>
      </section>

      <section aria-label="Distribution by party" className="mb-9">
        <div className="mb-4">
          <h2 className="text-base font-semibold">Distribution by party</h2>
          <p className="mt-1 text-sm text-muted-foreground">Crewvia’s direct share and the nested BNI split are shown together.</p>
        </div>
        <div className="divide-y divide-border border-y border-border">
          {parties.map((party) => (
            <div key={party.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
              <div>
                <p className="text-sm font-medium">{party.name}</p>
                <p className="text-xs text-muted-foreground">{party.role}</p>
              </div>
              <p className="font-mono text-sm font-semibold">{formatINR(distribution.totals[party.id])}</p>
            </div>
          ))}
        </div>
      </section>

      <RecentTransactions transactions={demoTransactions.slice(0, 4)} />
    </>
  );
}

function SummaryLine({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-4 sm:px-4 sm:first:pl-0">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className="font-mono text-sm font-medium">{formatINR(value)}</p>
    </div>
  );
}

function TransactionView({ transactions }: { transactions: Transaction[] }) {
  return (
    <section aria-label="Sample transactions">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold">Ledger activity</h2>
          <p className="mt-1 text-sm text-muted-foreground">{transactions.length} illustrative entries · transfers and advances remain distinct.</p>
        </div>
        <p className="text-xs text-muted-foreground">INR</p>
      </div>
      <TransactionTable transactions={transactions} />
    </section>
  );
}

function RecentTransactions({ transactions }: { transactions: Transaction[] }) {
  return (
    <section aria-label="Recent transactions">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold">Recent transactions</h2>
          <p className="mt-1 text-sm text-muted-foreground">Latest sample ledger activity</p>
        </div>
      </div>
      <TransactionTable transactions={transactions} />
    </section>
  );
}

function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="overflow-x-auto border-y border-border">
      <table className="w-full min-w-[650px] text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs text-muted-foreground">
            <th className="py-3 pr-4 font-medium">Date</th>
            <th className="px-3 py-3 font-medium">Description</th>
            <th className="px-3 py-3 font-medium">Business</th>
            <th className="px-3 py-3 font-medium">Type</th>
            <th className="py-3 pl-3 text-right font-medium">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="whitespace-nowrap py-3 pr-4 text-muted-foreground">{formatDate(transaction.date)}</td>
              <td className="px-3 py-3">
                <p className="font-medium">{transaction.description}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{transaction.source} → {transaction.destination}</p>
              </td>
              <td className="px-3 py-3">{transaction.business === "bni" ? "BNI" : "Crewvia"}</td>
              <td className="px-3 py-3 capitalize text-muted-foreground">{transaction.type}</td>
              <td className="whitespace-nowrap py-3 pl-3 text-right font-mono">{formatINR(transaction.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SettlementView() {
  return (
    <section aria-label="Sample settlements">
      <div className="mb-5">
        <h2 className="text-base font-semibold">Open obligations</h2>
        <p className="mt-1 text-sm text-muted-foreground">Partial payments leave the unpaid amount visible.</p>
      </div>
      <div className="divide-y divide-border border-y border-border">
        {initialSettlements.map((settlement) => {
          const creditor = parties.find((party) => party.id === settlement.creditor);
          const debtor = parties.find((party) => party.id === settlement.debtor);
          const remaining = settlement.amount - settlement.settled;
          return (
            <div key={settlement.id} className="grid gap-2 py-4 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-8">
              <div>
                <p className="text-sm font-medium">{debtor?.name ?? "Unknown"} owes {creditor?.name ?? "Unknown"}</p>
                <p className="mt-1 text-xs text-muted-foreground">{settlement.id} · {formatDate(settlement.date)}</p>
              </div>
              <p className="text-xs text-muted-foreground">Settled {formatINR(settlement.settled)} of {formatINR(settlement.amount)}</p>
              <p className="font-mono text-sm font-semibold">{formatINR(remaining)} open</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short" }).format(new Date(`${date}T12:00:00`));
}