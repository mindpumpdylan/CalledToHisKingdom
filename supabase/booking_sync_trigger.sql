-- ============================================================================
-- Keeps trainer_availability.is_booked in sync with bookings automatically.
-- Run once in the SQL Editor, after schema.sql. Safe to re-run.
--
-- Why a trigger: a client books a trainer's slot, but RLS only lets a
-- trainer update their own trainer_availability rows. A security-definer
-- trigger (same pattern as handle_new_user() in schema.sql) updates the
-- slot on the trainer's behalf whenever a booking referencing it changes.
-- ============================================================================
create or replace function public.sync_availability_booked()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (tg_op = 'DELETE') then
    if old.availability_id is not null then
      update trainer_availability set is_booked = false where id = old.availability_id;
    end if;
    return old;
  end if;

  if new.availability_id is not null then
    update trainer_availability
      set is_booked = (new.status <> 'cancelled')
      where id = new.availability_id;
  end if;
  return new;
end;
$$;

drop trigger if exists on_booking_change on bookings;
create trigger on_booking_change
  after insert or update or delete on bookings
  for each row execute function public.sync_availability_booked();
