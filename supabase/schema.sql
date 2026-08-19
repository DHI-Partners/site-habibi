-- Схема личного кабинета партнёра Habibi.
-- Выполнить один раз в Supabase → SQL Editor (кнопка Run).
-- Повторный запуск безопасен: всё через if not exists / or replace.

-- ── Таблицы ──────────────────────────────────────────────────────────

-- Партнёр: одна строка на аккаунт auth.users.
create table if not exists public.partners (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null unique references auth.users (id) on delete cascade,
  slug            text not null unique check (slug ~ '^[a-z0-9-]{3,30}$'),
  name            text not null default '',
  contact_channel text not null default '' check (contact_channel in ('', 'whatsapp', 'telegram')),
  contact_value   text not null default '',
  created_at      timestamptz not null default now()
);

-- Переходы по реферальной ссылке /ref/<slug>.
create table if not exists public.ref_clicks (
  id         bigint generated always as identity primary key,
  partner_id uuid not null references public.partners (id) on delete cascade,
  referrer   text not null default '',
  created_at timestamptz not null default now()
);
create index if not exists ref_clicks_partner_idx on public.ref_clicks (partner_id);

-- Клиенты партнёра: лид → демо → платящий → ушёл.
create table if not exists public.referrals (
  id                bigint generated always as identity primary key,
  partner_id        uuid not null references public.partners (id) on delete cascade,
  name              text not null default '',
  contact           text not null default '',
  status            text not null default 'lead' check (status in ('lead', 'trial', 'paying', 'churned')),
  tariff            text not null default '' check (tariff in ('', 'base', 'pro', 'premium', 'exclusive')),
  monthly_price     numeric not null default 0,
  started_paying_at timestamptz,
  churned_at        timestamptz,
  created_at        timestamptz not null default now()
);
create index if not exists referrals_partner_idx on public.referrals (partner_id);

-- Выплаты партнёру.
create table if not exists public.payouts (
  id         bigint generated always as identity primary key,
  partner_id uuid not null references public.partners (id) on delete cascade,
  amount     numeric not null check (amount > 0),
  status     text not null default 'pending' check (status in ('pending', 'paid')),
  created_at timestamptz not null default now(),
  paid_at    timestamptz
);
create index if not exists payouts_partner_idx on public.payouts (partner_id);

-- ── RLS ──────────────────────────────────────────────────────────────
-- Партнёр читает только своё; пишет только собственную строку partners
-- при регистрации. Все прочие записи делает сервер (service role — мимо RLS).

alter table public.partners  enable row level security;
alter table public.ref_clicks enable row level security;
alter table public.referrals enable row level security;
alter table public.payouts   enable row level security;

drop policy if exists partners_select_own on public.partners;
create policy partners_select_own on public.partners
  for select using (user_id = auth.uid());

drop policy if exists partners_insert_own on public.partners;
create policy partners_insert_own on public.partners
  for insert with check (user_id = auth.uid());

drop policy if exists ref_clicks_select_own on public.ref_clicks;
create policy ref_clicks_select_own on public.ref_clicks
  for select using (
    partner_id in (select id from public.partners where user_id = auth.uid())
  );

drop policy if exists referrals_select_own on public.referrals;
create policy referrals_select_own on public.referrals
  for select using (
    partner_id in (select id from public.partners where user_id = auth.uid())
  );

drop policy if exists payouts_select_own on public.payouts;
create policy payouts_select_own on public.payouts
  for select using (
    partner_id in (select id from public.partners where user_id = auth.uid())
  );


-- ── Права ролей ──────────────────────────────────────────────────────
-- Явные гранты: при выполнении схемы не через дашборд дефолтные
-- привилегии Supabase могут не примениться. RLS всё равно ограничивает
-- строки; гранты лишь открывают доступ к таблицам как таковым.

grant usage on schema public to anon, authenticated, service_role;

-- Партнёр: читает своё, создаёт свою строку при регистрации.
grant select, insert on public.partners to authenticated;
grant select on public.ref_clicks, public.referrals, public.payouts to authenticated;

-- Сервисная роль (api/track.js, api/admin.js): полный доступ.
grant all on all tables in schema public to service_role;
grant usage, select on all sequences in schema public to service_role;

-- ── Представления ────────────────────────────────────────────────────

-- Сводка по партнёру: security_invoker — RLS таблиц действует и на view,
-- поэтому партнёр видит только свою строку, а сервис — все.
create or replace view public.partner_stats
with (security_invoker = on) as
select
  p.id,
  p.user_id,
  p.slug,
  p.name,
  p.contact_channel,
  p.contact_value,
  p.created_at,
  (select count(*) from public.ref_clicks c where c.partner_id = p.id)                          as clicks,
  (select count(*) from public.referrals r where r.partner_id = p.id)                           as regs,
  (select count(*) from public.referrals r where r.partner_id = p.id and r.status = 'trial')    as trials,
  (select count(*) from public.referrals r where r.partner_id = p.id and r.status = 'paying')   as paying
from public.partners p;

grant select on public.partner_stats to authenticated, service_role;

-- ── Функции ──────────────────────────────────────────────────────────

-- Проверка занятости slug при регистрации (не раскрывая чужие строки).
create or replace function public.slug_taken(p_slug text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (select 1 from public.partners where slug = lower(p_slug));
$$;

grant execute on function public.slug_taken(text) to anon, authenticated;
