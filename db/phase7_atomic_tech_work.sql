-- Atomic merges into tickets.tech_work.
--
-- Why: every writer used to do a read-modify-write of the whole JSON column —
-- read tech_work, spread it, write the entire object back. Two concurrent
-- writers therefore lose each other's fields (last write wins).
--
-- The bug that surfaced it: tapping "Reached" fires POST /step (enroute) and
-- POST /arrival-otp at the same moment. Both read tech_work before either
-- wrote. /arrival-otp stored the OTP hash AND WhatsApped the code to the
-- customer; /step then wrote its stale copy back, dropping arrival_otp. The
-- customer held a valid code while the server insisted none was issued
-- ("Tap Reached to send the code first.").
--
-- `||` merges at the top level in Postgres, so each writer now only sends the
-- keys it actually changed and cannot clobber anyone else's.
--
-- Apply this BEFORE deploying the backend that calls it.

-- tech_work was added outside db/schema.sql, so make sure it exists and is
-- jsonb — the || operator is not defined for the json type.
do $$
declare
  col_type text;
begin
  select data_type into col_type
    from information_schema.columns
   where table_name = 'tickets' and column_name = 'tech_work';

  if col_type is null then
    alter table tickets add column tech_work jsonb not null default '{}'::jsonb;
  elsif col_type = 'json' then
    alter table tickets alter column tech_work type jsonb using tech_work::jsonb;
  end if;
end $$;

create or replace function merge_tech_work(p_ticket_id uuid, p_patch jsonb)
returns jsonb
language plpgsql
as $$
declare
  merged jsonb;
begin
  update tickets
     set tech_work = coalesce(tech_work, '{}'::jsonb) || coalesce(p_patch, '{}'::jsonb),
         updated_at = now()
   where id = p_ticket_id
  returning tech_work into merged;

  if merged is null then
    raise exception 'merge_tech_work: ticket % not found', p_ticket_id;
  end if;
  return merged;
end;
$$;

-- Called with the service-role key from the backend only.
revoke all on function merge_tech_work(uuid, jsonb) from public, anon, authenticated;
grant execute on function merge_tech_work(uuid, jsonb) to service_role;
