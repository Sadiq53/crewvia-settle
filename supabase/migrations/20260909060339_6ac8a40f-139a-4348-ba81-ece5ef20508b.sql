create extension if not exists pgcrypto;

create table public.workspace_businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  name text not null,
  kind text not null check (kind in ('company','joint_venture')),
  code text not null,
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.workspace_businesses to authenticated;
grant all on public.workspace_businesses to service_role;
alter table public.workspace_businesses enable row level security;
create policy "Members manage their own businesses" on public.workspace_businesses for all to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create table public.workspace_parties (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  name text not null,
  kind text not null check (kind in ('company','partner','payee','external')),
  tag text,
  contact text,
  notes text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.workspace_parties to authenticated;
grant all on public.workspace_parties to service_role;
alter table public.workspace_parties enable row level security;
create policy "Members manage their own parties" on public.workspace_parties for all to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create table public.workspace_accounts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  party_id uuid references public.workspace_parties(id) on delete set null,
  business_id uuid references public.workspace_businesses(id) on delete set null,
  name text not null,
  kind text not null check (kind in ('cash','business','partner','payee','clearing')),
  opening_balance_minor bigint not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.workspace_accounts to authenticated;
grant all on public.workspace_accounts to service_role;
alter table public.workspace_accounts enable row level security;
create policy "Members manage their own accounts" on public.workspace_accounts for all to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create table public.workspace_categories (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  name text not null,
  kind text not null default 'general',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (owner_id, name)
);
grant select, insert, update, delete on public.workspace_categories to authenticated;
grant all on public.workspace_categories to service_role;
alter table public.workspace_categories enable row level security;
create policy "Members manage their own categories" on public.workspace_categories for all to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create table public.workspace_distribution_rules (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  name text not null,
  scope text not null check (scope in ('business','nested')),
  version integer not null default 1,
  effective_from date not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.workspace_distribution_rules to authenticated;
grant all on public.workspace_distribution_rules to service_role;
alter table public.workspace_distribution_rules enable row level security;
create policy "Members manage their own distribution rules" on public.workspace_distribution_rules for all to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create table public.workspace_rule_members (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  rule_id uuid not null references public.workspace_distribution_rules(id) on delete cascade,
  party_id uuid not null references public.workspace_parties(id) on delete restrict,
  parent_member_id uuid references public.workspace_rule_members(id) on delete cascade,
  percentage_basis numeric(8,5) not null check (percentage_basis >= 0 and percentage_basis <= 100),
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.workspace_rule_members to authenticated;
grant all on public.workspace_rule_members to service_role;
alter table public.workspace_rule_members enable row level security;
create policy "Members manage their own rule members" on public.workspace_rule_members for all to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create table public.workspace_transactions (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  occurred_on date not null,
  transaction_type text not null check (transaction_type in ('income','expense','payment','receipt','transfer','partner_distribution','profit_allocation','adjustment','settlement','refund')),
  amount_minor bigint not null check (amount_minor > 0),
  business_id uuid references public.workspace_businesses(id) on delete set null,
  source_account_id uuid references public.workspace_accounts(id) on delete set null,
  destination_account_id uuid references public.workspace_accounts(id) on delete set null,
  payee_party_id uuid references public.workspace_parties(id) on delete set null,
  category_id uuid references public.workspace_categories(id) on delete set null,
  description text not null,
  notes text,
  reversal_of uuid references public.workspace_transactions(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.workspace_transactions to authenticated;
grant all on public.workspace_transactions to service_role;
alter table public.workspace_transactions enable row level security;
create policy "Members view their own transactions" on public.workspace_transactions for select to authenticated using (owner_id = auth.uid());
create policy "Members add transactions to their workspace" on public.workspace_transactions for insert to authenticated with check (owner_id = auth.uid());
create policy "Members update transactions in their workspace" on public.workspace_transactions for update to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create table public.workspace_calculation_periods (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  label text not null,
  period_start date not null,
  period_end date not null,
  status text not null default 'calculated' check (status in ('calculated','partially_settled','settled')),
  rule_snapshot jsonb not null,
  transaction_snapshot jsonb not null,
  created_at timestamptz not null default now(),
  check (period_end >= period_start)
);
grant select, insert, update on public.workspace_calculation_periods to authenticated;
grant all on public.workspace_calculation_periods to service_role;
alter table public.workspace_calculation_periods enable row level security;
create policy "Members manage their own calculation periods" on public.workspace_calculation_periods for all to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create table public.workspace_calculation_results (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  period_id uuid not null references public.workspace_calculation_periods(id) on delete restrict,
  party_id uuid not null references public.workspace_parties(id) on delete restrict,
  business_id uuid references public.workspace_businesses(id) on delete set null,
  entitlement_minor bigint not null default 0,
  received_minor bigint not null default 0,
  advance_minor bigint not null default 0,
  settled_minor bigint not null default 0,
  net_position_minor bigint not null default 0,
  explanation jsonb not null,
  created_at timestamptz not null default now()
);
grant select, insert on public.workspace_calculation_results to authenticated;
grant all on public.workspace_calculation_results to service_role;
alter table public.workspace_calculation_results enable row level security;
create policy "Members view their own calculation results" on public.workspace_calculation_results for select to authenticated using (owner_id = auth.uid());
create policy "Members add calculation results to their workspace" on public.workspace_calculation_results for insert to authenticated with check (owner_id = auth.uid());

create table public.workspace_obligations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  period_id uuid not null references public.workspace_calculation_periods(id) on delete restrict,
  creditor_party_id uuid not null references public.workspace_parties(id) on delete restrict,
  debtor_party_id uuid not null references public.workspace_parties(id) on delete restrict,
  amount_minor bigint not null check (amount_minor > 0),
  settled_minor bigint not null default 0 check (settled_minor >= 0 and settled_minor <= amount_minor),
  created_at timestamptz not null default now(),
  check (creditor_party_id <> debtor_party_id)
);
grant select, insert, update on public.workspace_obligations to authenticated;
grant all on public.workspace_obligations to service_role;
alter table public.workspace_obligations enable row level security;
create policy "Members manage their own obligations" on public.workspace_obligations for all to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create table public.workspace_settlements (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  obligation_id uuid not null references public.workspace_obligations(id) on delete restrict,
  settled_on date not null,
  amount_minor bigint not null check (amount_minor > 0),
  payment_method text,
  notes text,
  created_at timestamptz not null default now()
);
grant select, insert on public.workspace_settlements to authenticated;
grant all on public.workspace_settlements to service_role;
alter table public.workspace_settlements enable row level security;
create policy "Members manage their own settlements" on public.workspace_settlements for all to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create index workspace_transactions_owner_date_idx on public.workspace_transactions(owner_id, occurred_on desc);
create index workspace_transactions_business_idx on public.workspace_transactions(business_id, occurred_on desc);
create index workspace_obligations_owner_status_idx on public.workspace_obligations(owner_id, settled_minor, created_at desc);
create index workspace_calculation_periods_owner_date_idx on public.workspace_calculation_periods(owner_id, period_start desc);

create or replace function public.workspace_touch_updated_at() returns trigger language plpgsql set search_path = public as $$ begin new.updated_at = now(); return new; end; $$;
create trigger workspace_transactions_touch_updated_at before update on public.workspace_transactions for each row execute function public.workspace_touch_updated_at();