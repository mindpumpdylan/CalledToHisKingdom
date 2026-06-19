import { redirect } from "next/navigation";
import { CalendarClock, CheckCircle2, Clock, Trash2, XCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/auth-helpers";
import { becomeTrainer } from "@/app/actions/profile";
import {
  cancelBooking,
  completeBooking,
  confirmBooking,
  removeAvailability,
} from "@/app/actions/trainer";
import AddAvailabilityForm from "@/components/AddAvailabilityForm";
import { formatDateTime, formatSlot } from "@/lib/format";
import type { TrainerProfile } from "@/lib/types";

const statusStyles: Record<string, string> = {
  requested: "bg-cream text-gold-deep",
  confirmed: "bg-gold text-white",
  completed: "bg-line text-stone",
  cancelled: "bg-line text-stone line-through",
};

export default async function Profile() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login?redirectTo=/profile");

  const supabase = await createClient();
  let trainerProfile: TrainerProfile | null = null;
  let availability: { id: string; starts_at: string; ends_at: string; mode: string; is_booked: boolean }[] = [];
  let incomingBookings: { id: string; status: string; scheduled_at: string | null; notes: string | null; profiles: { display_name: string } | null }[] = [];

  if (profile.is_trainer) {
    const { data } = await supabase
      .from("trainer_profiles")
      .select("*")
      .eq("profile_id", profile.id)
      .maybeSingle();
    trainerProfile = data ?? null;

    const { data: slots } = await supabase
      .from("trainer_availability")
      .select("id, starts_at, ends_at, mode, is_booked")
      .eq("trainer_id", profile.id)
      .gte("starts_at", new Date().toISOString())
      .order("starts_at", { ascending: true });
    availability = slots ?? [];

    const { data: bookings } = await supabase
      .from("bookings")
      .select("id, status, scheduled_at, notes, profiles!bookings_client_id_fkey(display_name)")
      .eq("trainer_id", profile.id)
      .order("created_at", { ascending: false });
    incomingBookings = (bookings ?? []) as unknown as typeof incomingBookings;
  }

  const { data: myBookingsData } = await supabase
    .from("bookings")
    .select("id, status, scheduled_at, notes, profiles!bookings_trainer_id_fkey(display_name)")
    .eq("client_id", profile.id)
    .order("created_at", { ascending: false });
  const myBookings = (myBookingsData ?? []) as unknown as {
    id: string;
    status: string;
    scheduled_at: string | null;
    notes: string | null;
    profiles: { display_name: string } | null;
  }[];

  const location = [profile.location_city, profile.location_state, profile.location_country]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10 flex items-center gap-5">
        <div
          aria-hidden
          className="flex h-20 w-20 items-center justify-center rounded-full bg-cream font-display text-3xl font-semibold text-gold-deep"
        >
          {profile.display_name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="font-display text-4xl font-semibold text-ink">{profile.display_name}</h1>
          <p className="text-stone">Manage how you show up in the community.</p>
        </div>
      </header>

      <section className="space-y-6">
        <div className="card">
          <h2 className="font-display text-2xl font-semibold text-ink">Member details</h2>
          <p className="mt-1 text-sm text-stone">
            Display name, photo, bio, location, and prayer preferences.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-stone">
            <li>• Public display name: {profile.display_name}</li>
            <li>• Location: {location || "Not set"}</li>
            <li>• Training preference: {profile.training_preference ?? "Not set"}</li>
          </ul>
        </div>

        {profile.is_trainer ? (
          <div className="rounded-2xl border-2 border-gold-soft bg-cream/40 p-6">
            <h2 className="font-display text-2xl font-semibold text-ink">Your trainer profile</h2>
            <p className="mt-1 text-sm text-stone">
              {trainerProfile?.accepting_clients
                ? "You're listed and currently accepting clients on the Find a Trainer page."
                : "Not currently accepting clients."}
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-gold-soft bg-cream/40 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold text-ink">
                Become a volunteer trainer
              </h2>
              <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-white">
                Optional
              </span>
            </div>
            <p className="mt-1 text-sm text-stone">
              Unlock a trainer profile: specialties, certifications, the modes you
              offer, and a calendar of hours you&apos;re giving to the community.
            </p>
            <form action={becomeTrainer}>
              <button type="submit" className="btn-gold-sm mt-5">
                Enable trainer features
              </button>
            </form>
          </div>
        )}

        {profile.is_trainer && (
          <div className="card">
            <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-ink">
              <CalendarClock size={22} className="text-gold-deep" /> Manage availability
            </h2>
            <p className="mt-1 text-sm text-stone">
              Add hours you&apos;re willing to give. They&apos;ll appear on your public
              profile until someone requests them.
            </p>
            <div className="mt-5">
              <AddAvailabilityForm />
            </div>
            <ul className="mt-6 space-y-2">
              {availability.map((slot) => (
                <li
                  key={slot.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-line px-4 py-3 text-sm"
                >
                  <div>
                    <p className="font-medium text-ink">{formatSlot(slot.starts_at, slot.ends_at)}</p>
                    <p className="text-xs uppercase tracking-wide text-stone">
                      {slot.mode === "online" ? "Online" : "In person"} ·{" "}
                      {slot.is_booked ? "Booked" : "Open"}
                    </p>
                  </div>
                  {!slot.is_booked && (
                    <form action={removeAvailability}>
                      <input type="hidden" name="slotId" value={slot.id} />
                      <button
                        type="submit"
                        aria-label="Remove slot"
                        className="flex h-8 w-8 items-center justify-center rounded-full text-stone transition-colors hover:bg-cream hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </form>
                  )}
                </li>
              ))}
              {availability.length === 0 && (
                <li className="py-4 text-center text-sm text-stone">
                  No upcoming hours added yet.
                </li>
              )}
            </ul>
          </div>
        )}

        {profile.is_trainer && (
          <div className="card">
            <h2 className="font-display text-2xl font-semibold text-ink">Booking requests</h2>
            <p className="mt-1 text-sm text-stone">
              Members who&apos;ve requested a session with you.
            </p>
            <ul className="mt-5 space-y-3">
              {incomingBookings.map((b) => (
                <li key={b.id} className="rounded-xl border border-line px-4 py-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-medium text-ink">
                        {b.profiles?.display_name ?? "A member"}
                        {b.scheduled_at && (
                          <span className="ml-2 text-sm text-stone">
                            · {formatDateTime(b.scheduled_at)}
                          </span>
                        )}
                      </p>
                      {b.notes && <p className="mt-1 text-sm text-stone">{b.notes}</p>}
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[b.status]}`}>
                      {b.status}
                    </span>
                  </div>
                  {b.status === "requested" && (
                    <div className="mt-3 flex gap-2">
                      <form action={confirmBooking}>
                        <input type="hidden" name="bookingId" value={b.id} />
                        <button type="submit" className="btn-gold-sm">
                          <CheckCircle2 size={16} /> Confirm
                        </button>
                      </form>
                      <form action={cancelBooking}>
                        <input type="hidden" name="bookingId" value={b.id} />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 rounded-full border-2 border-line px-4 py-2 text-sm font-semibold text-stone transition-colors hover:bg-cream"
                        >
                          <XCircle size={16} /> Decline
                        </button>
                      </form>
                    </div>
                  )}
                  {b.status === "confirmed" && (
                    <div className="mt-3">
                      <form action={completeBooking}>
                        <input type="hidden" name="bookingId" value={b.id} />
                        <button type="submit" className="btn-gold-sm">
                          <Clock size={16} /> Mark completed
                        </button>
                      </form>
                    </div>
                  )}
                </li>
              ))}
              {incomingBookings.length === 0 && (
                <li className="py-4 text-center text-sm text-stone">
                  No booking requests yet.
                </li>
              )}
            </ul>
          </div>
        )}

        {myBookings.length > 0 && (
          <div className="card">
            <h2 className="font-display text-2xl font-semibold text-ink">My bookings</h2>
            <p className="mt-1 text-sm text-stone">Sessions you&apos;ve requested with trainers.</p>
            <ul className="mt-5 space-y-3">
              {myBookings.map((b) => (
                <li
                  key={b.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-ink">
                      {b.profiles?.display_name ?? "A trainer"}
                      {b.scheduled_at && (
                        <span className="ml-2 text-sm text-stone">
                          · {formatDateTime(b.scheduled_at)}
                        </span>
                      )}
                    </p>
                    {b.notes && <p className="mt-1 text-sm text-stone">{b.notes}</p>}
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[b.status]}`}>
                    {b.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
