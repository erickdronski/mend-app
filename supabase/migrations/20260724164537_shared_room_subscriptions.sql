-- One Mend subscription covers one two-person space. The payer owns the
-- billing relationship, while both current members inherit the entitlement.
-- Existing founder grants continue to work and are attached to the founder's
-- current space when they create or join one.

alter table public.mend_entitlements
  add column space_id uuid references public.mend_spaces(id) on delete set null,
  add column payer_user_id uuid references auth.users(id) on delete set null,
  add column provider text,
  add column provider_customer_id text,
  add column provider_subscription_id text;

update public.mend_entitlements
set
  payer_user_id = user_id,
  provider = case when source = 'stripe' then 'stripe' else 'manual' end,
  provider_customer_id = stripe_customer_id,
  provider_subscription_id = stripe_subscription_id;

alter table public.mend_entitlements
  add constraint mend_entitlements_provider_check
    check (provider is null or provider in ('stripe', 'app_store', 'manual')),
  add constraint mend_entitlements_provider_subscription_key
    unique (provider_subscription_id);

create unique index mend_entitlements_space_key
  on public.mend_entitlements (space_id)
  where space_id is not null;

create index mend_entitlements_payer_user_id_idx
  on public.mend_entitlements (payer_user_id);

create index mend_entitlements_provider_customer_id_idx
  on public.mend_entitlements (provider, provider_customer_id)
  where provider_customer_id is not null;

-- Stripe retries webhooks and may deliver them out of order. Recording the
-- provider event id makes processing idempotent without retaining payment
-- payloads or relationship data.
create table public.mend_billing_events (
  provider text not null check (provider in ('stripe', 'app_store')),
  event_id text not null,
  event_type text not null,
  status text not null default 'processing' check (status in ('processing', 'completed', 'failed')),
  created_at timestamptz not null default now(),
  processed_at timestamptz,
  primary key (provider, event_id)
);

alter table public.mend_billing_events enable row level security;
revoke all on table public.mend_billing_events from public, anon, authenticated;

-- Attach a member-owned entitlement to the room only when the room does not
-- already have one. This handles founder access and paid access symmetrically.
create or replace function public.mend_attach_member_entitlement()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public, auth
as $function$
declare
  entitlement_id uuid;
begin
  if exists (
    select 1 from public.mend_entitlements e where e.space_id = new.space_id
  ) then
    return new;
  end if;

  select e.id into entitlement_id
  from public.mend_entitlements e
  left join auth.users u on u.id = new.user_id
  where (
      e.payer_user_id = new.user_id
      or e.user_id = new.user_id
      or (e.email is not null and u.email is not null and lower(e.email) = lower(u.email))
    )
    and (
      e.source = 'founder_grant'
      or (
        e.status in ('active', 'trialing')
        and (e.current_period_end is null or e.current_period_end > now())
      )
    )
  order by case when e.source = 'founder_grant' then 0 else 1 end, e.updated_at desc
  limit 1;

  if entitlement_id is not null then
    update public.mend_entitlements
    set
      space_id = new.space_id,
      payer_user_id = coalesce(payer_user_id, new.user_id),
      updated_at = now()
    where id = entitlement_id;
  end if;

  return new;
end;
$function$;

-- A payer can always leave a room. Their paid access detaches and can follow
-- them to a future room; the former partner keeps all data but returns to free.
create or replace function public.mend_detach_member_entitlement()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public
as $function$
begin
  update public.mend_entitlements e
  set space_id = null, updated_at = now()
  where e.space_id = old.space_id
    and (e.payer_user_id = old.user_id or e.user_id = old.user_id);
  return old;
end;
$function$;

revoke execute on function public.mend_attach_member_entitlement() from public, anon, authenticated;
revoke execute on function public.mend_detach_member_entitlement() from public, anon, authenticated;

create trigger mend_attach_member_entitlement
after insert on public.mend_space_members
for each row execute function public.mend_attach_member_entitlement();

create trigger mend_detach_member_entitlement
after delete on public.mend_space_members
for each row execute function public.mend_detach_member_entitlement();

-- Rich access state for the client. No entitlement rows are directly readable;
-- this returns only the minimum billing state needed to render access.
create or replace function public.mend_my_access()
returns table (
  tier text,
  space_id uuid,
  source text,
  status text,
  current_period_end timestamptz,
  payer_user_id uuid,
  can_manage boolean,
  partner_included boolean
)
language sql
stable
security definer
set search_path = pg_catalog, public, auth
as $function$
  with me as (
    select auth.uid() as user_id, auth.jwt() ->> 'email' as email
  ),
  my_space as (
    select m.space_id
    from public.mend_space_members m, me
    where m.user_id = me.user_id
    limit 1
  ),
  eligible as (
    select e.*
    from public.mend_entitlements e, me
    where (
      e.space_id = (select ms.space_id from my_space ms)
      or e.payer_user_id = me.user_id
      or e.user_id = me.user_id
      or (e.email is not null and me.email is not null and lower(e.email) = lower(me.email))
    )
    and (
      e.source = 'founder_grant'
      or (
        e.status in ('active', 'trialing')
        and (e.current_period_end is null or e.current_period_end > now())
      )
    )
    order by case when e.source = 'founder_grant' then 0 else 1 end, e.updated_at desc
    limit 1
  ),
  selected as (
    select
      e.id,
      coalesce(e.space_id, (select ms.space_id from my_space ms)) as access_space_id,
      e.source,
      e.status,
      e.current_period_end,
      coalesce(e.payer_user_id, e.user_id) as payer_user_id
    from eligible e
  )
  select
    case when s.id is null then 'free' else 'plus' end as tier,
    coalesce(s.access_space_id, (select ms.space_id from my_space ms)) as space_id,
    s.source,
    s.status,
    s.current_period_end,
    s.payer_user_id,
    coalesce(s.payer_user_id = (select me.user_id from me), false) as can_manage,
    coalesce((
      select count(*) = 2
      from public.mend_space_members m
      where m.space_id = s.access_space_id
    ), false) as partner_included
  from (select 1) seed
  left join selected s on true;
$function$;

create or replace function public.mend_my_tier()
returns text
language sql
stable
security definer
set search_path = pg_catalog, public
as $function$
  select coalesce((select a.tier from public.mend_my_access() a limit 1), 'free');
$function$;

revoke execute on function public.mend_my_access() from public, anon;
grant execute on function public.mend_my_access() to authenticated;
alter function public.mend_my_access() set search_path = pg_catalog, public, auth;

-- Attach any active direct grants for members who already have a room. At most
-- one entitlement wins per room, matching the same invariant as the trigger.
with candidates as (
  select
    e.id as entitlement_id,
    m.space_id,
    row_number() over (
      partition by m.space_id
      order by case when e.source = 'founder_grant' then 0 else 1 end, e.updated_at desc
    ) as room_rank
  from public.mend_entitlements e
  join public.mend_space_members m on (
    e.payer_user_id = m.user_id or e.user_id = m.user_id
  )
  where e.space_id is null
    and not exists (
      select 1 from public.mend_entitlements occupied where occupied.space_id = m.space_id
    )
)
update public.mend_entitlements e
set space_id = c.space_id, updated_at = now()
from candidates c
where c.entitlement_id = e.id and c.room_rank = 1;
