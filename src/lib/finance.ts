export type BusinessId = "crewvia" | "bni";
export type PartyId = "jafarussadiq" | "mustafa" | "qasim" | "crewvia" | "saifuddin";
export type TransactionType = "income" | "expense" | "payment" | "transfer" | "advance";

export type Party = {
  id: PartyId;
  name: string;
  initials: string;
  tone: "teal" | "blue" | "amber" | "coral" | "violet";
  role: string;
};

export type Transaction = {
  id: string;
  date: string;
  type: TransactionType;
  amount: number;
  business: BusinessId;
  source: string;
  destination: string;
  category: string;
  description: string;
  payee?: string;
  party?: PartyId;
};

export type Settlement = {
  id: string;
  creditor: PartyId;
  debtor: PartyId;
  amount: number;
  settled: number;
  date: string;
};

export const parties: Party[] = [
  { id: "jafarussadiq", name: "Jafarussadiq", initials: "J", tone: "teal", role: "Partner · 30%" },
  { id: "mustafa", name: "Mustafa", initials: "M", tone: "blue", role: "Partner · 30%" },
  { id: "qasim", name: "Qasim", initials: "Q", tone: "amber", role: "Partner · 30%" },
  { id: "crewvia", name: "Crewvia", initials: "C", tone: "coral", role: "Company reserve · 10%" },
  { id: "saifuddin", name: "Saifuddin", initials: "S", tone: "violet", role: "BNI partner · 50%" },
];

export const demoTransactions: Transaction[] = [
  { id: "TX-1048", date: "2026-09-08", type: "income", amount: 286000, business: "bni", source: "Saifuddin", destination: "BNI", category: "Client receipt", description: "September BNI project receipt" },
  { id: "TX-1047", date: "2026-09-07", type: "expense", amount: 42000, business: "bni", source: "BNI", destination: "Husain", category: "Developer", description: "BNI project development work", payee: "Husain" },
  { id: "TX-1046", date: "2026-09-05", type: "income", amount: 182500, business: "crewvia", source: "Client · Northstar", destination: "Crewvia", category: "Consulting", description: "Northstar retainer · September" },
  { id: "TX-1045", date: "2026-09-04", type: "advance", amount: 10000, business: "bni", source: "Jafarussadiq", destination: "BNI", category: "Partner advance", description: "Paid on behalf of BNI", party: "jafarussadiq" },
  { id: "TX-1044", date: "2026-09-02", type: "transfer", amount: 50000, business: "bni", source: "Crewvia", destination: "BNI", category: "Internal transfer", description: "Working capital transfer" },
  { id: "TX-1043", date: "2026-09-01", type: "expense", amount: 18500, business: "crewvia", source: "Crewvia", destination: "Cloud provider", category: "Software", description: "Infrastructure and tools" },
];

export const initialSettlements: Settlement[] = [
  { id: "ST-019", creditor: "jafarussadiq", debtor: "mustafa", amount: 24000, settled: 12000, date: "2026-08-31" },
  { id: "ST-018", creditor: "crewvia", debtor: "saifuddin", amount: 18000, settled: 0, date: "2026-09-08" },
];

export const directRule = [
  { party: "jafarussadiq" as PartyId, percent: 30 },
  { party: "mustafa" as PartyId, percent: 30 },
  { party: "qasim" as PartyId, percent: 30 },
  { party: "crewvia" as PartyId, percent: 10 },
];

export const bniRule = [
  { party: "saifuddin" as PartyId, percent: 50 },
  { party: "crewvia" as PartyId, percent: 50 },
];

export function formatINR(amount: number, compact = false) {
  if (compact && Math.abs(amount) >= 100000) {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", notation: "compact", maximumFractionDigits: 1 }).format(amount);
  }
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

export function getNetResult(transactions: Transaction[], business: BusinessId) {
  return transactions.filter((tx) => tx.business === business).reduce((sum, tx) => {
    if (tx.type === "income") return sum + tx.amount;
    if (tx.type === "expense" || tx.type === "advance") return sum - tx.amount;
    return sum;
  }, 0);
}

export function getCashBalance(transactions: Transaction[], account: string) {
  return transactions.reduce((sum, tx) => {
    if (tx.source === account && ["expense", "payment", "transfer", "advance"].includes(tx.type)) return sum - tx.amount;
    if (tx.destination === account && ["income", "receipt", "transfer"].includes(tx.type)) return sum + tx.amount;
    return sum;
  }, 0);
}

export function allocate(amount: number, rules: { party: PartyId; percent: number }[]) {
  const floorValues = rules.map((rule) => ({ ...rule, value: Math.floor((amount * rule.percent) / 100) }));
  let remainder = amount - floorValues.reduce((sum, item) => sum + item.value, 0);
  return floorValues.map((item, index) => ({
    ...item,
    value: item.value + (index === floorValues.length - 1 ? remainder : 0),
  }));
}

export function calculateDistribution(transactions: Transaction[]) {
  const crewviaNet = getNetResult(transactions, "crewvia");
  const bniNet = getNetResult(transactions, "bni");
  const direct = allocate(Math.max(0, crewviaNet), directRule);
  const bniFirstLevel = allocate(Math.max(0, bniNet), bniRule);
  const crewviaBniShare = bniFirstLevel.find((item) => item.party === "crewvia")?.value ?? 0;
  const bniInternal = allocate(crewviaBniShare, directRule);
  const totals = parties.reduce<Record<PartyId, number>>((acc, party) => {
    acc[party.id] = 0;
    return acc;
  }, {} as Record<PartyId, number>);
  direct.forEach((item) => { totals[item.party] += item.value; });
  bniFirstLevel.forEach((item) => { if (item.party !== "crewvia") totals[item.party] += item.value; });
  bniInternal.forEach((item) => { totals[item.party] += item.value; });
  return { crewviaNet, bniNet, direct, bniFirstLevel, bniInternal, totals };
}

export function getOutstanding(settlements: Settlement[]) {
  return settlements.reduce((sum, item) => sum + item.amount - item.settled, 0);
}
