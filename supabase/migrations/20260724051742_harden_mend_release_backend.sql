-- Mend's mobile clients always operate as an authenticated Supabase user,
-- including invisible anonymous accounts. The Postgres anon role needs no
-- direct table or RPC access.
revoke all on table public.mend_profiles from anon;
revoke all on table public.mend_state from anon;
revoke all on table public.mend_spaces from anon;
revoke all on table public.mend_space_members from anon;
revoke all on table public.mend_daily_answers from anon;
revoke all on table public.mend_notes from anon;
revoke all on table public.mend_entitlements from anon;

revoke all on table public.mend_profiles from authenticated;
revoke all on table public.mend_state from authenticated;
revoke all on table public.mend_spaces from authenticated;
revoke all on table public.mend_space_members from authenticated;
revoke all on table public.mend_daily_answers from authenticated;
revoke all on table public.mend_notes from authenticated;
revoke all on table public.mend_entitlements from authenticated;

grant select, insert, update on table public.mend_profiles to authenticated;
grant select, insert, update on table public.mend_state to authenticated;
grant select on table public.mend_spaces to authenticated;
grant select on table public.mend_space_members to authenticated;
grant select, insert, update on table public.mend_daily_answers to authenticated;
grant select, insert, delete on table public.mend_notes to authenticated;

-- Only client-facing RPCs are executable. Helpers and trigger functions stay
-- internal even though they live in the exposed public schema.
revoke execute on function public.mend_create_space(text) from public, anon;
revoke execute on function public.mend_join_space(text, text) from public, anon;
revoke execute on function public.mend_leave_space() from public, anon;
revoke execute on function public.mend_space_progress(uuid) from public, anon;
revoke execute on function public.mend_daily_reveal(uuid, date) from public, anon;
revoke execute on function public.mend_my_tier() from public, anon;
revoke execute on function public.mend_is_member(uuid) from public, anon;
revoke execute on function public.mend_new_code() from public, anon, authenticated;
revoke execute on function public.mend_reap_empty_space() from public, anon, authenticated;

grant execute on function public.mend_create_space(text) to authenticated;
grant execute on function public.mend_join_space(text, text) to authenticated;
grant execute on function public.mend_leave_space() to authenticated;
grant execute on function public.mend_space_progress(uuid) to authenticated;
grant execute on function public.mend_daily_reveal(uuid, date) to authenticated;
grant execute on function public.mend_my_tier() to authenticated;
grant execute on function public.mend_is_member(uuid) to authenticated;

-- Pin every definer/helper lookup path to trusted schemas.
alter function public.mend_create_space(text) set search_path = pg_catalog, public;
alter function public.mend_join_space(text, text) set search_path = pg_catalog, public;
alter function public.mend_leave_space() set search_path = pg_catalog, public;
alter function public.mend_space_progress(uuid) set search_path = pg_catalog, public;
alter function public.mend_daily_reveal(uuid, date) set search_path = pg_catalog, public;
alter function public.mend_my_tier() set search_path = pg_catalog, public;
alter function public.mend_is_member(uuid) set search_path = pg_catalog, public;
alter function public.mend_new_code() set search_path = pg_catalog, public;
alter function public.mend_reap_empty_space() set search_path = pg_catalog, public;

-- Stripe webhook upserts use ON CONFLICT (user_id). Without this constraint,
-- successful payments cannot reliably activate Plus.
drop index public.mend_entitlements_user_id_key;
alter table public.mend_entitlements
  add constraint mend_entitlements_user_id_key unique (user_id);

-- Bound user-authored and backup payloads at the database boundary.
alter table public.mend_profiles
  add constraint mend_profiles_partner_a_length check (partner_a is null or char_length(partner_a) <= 80),
  add constraint mend_profiles_partner_b_length check (partner_b is null or char_length(partner_b) <= 80);

alter table public.mend_space_members
  add constraint mend_space_members_display_name_length
  check (char_length(trim(display_name)) between 1 and 80);

alter table public.mend_daily_answers
  add constraint mend_daily_answers_question_length check (question is null or char_length(question) <= 500),
  add constraint mend_daily_answers_answer_length check (char_length(trim(answer)) between 1 and 2000);

alter table public.mend_notes
  add constraint mend_notes_body_length check (char_length(trim(body)) between 1 and 2000);

alter table public.mend_state
  add constraint mend_state_payload_size check (pg_column_size(state) <= 1048576);

create index mend_daily_answers_user_id_idx on public.mend_daily_answers (user_id);
create index mend_notes_user_id_idx on public.mend_notes (user_id);
create index mend_spaces_created_by_idx on public.mend_spaces (created_by);
