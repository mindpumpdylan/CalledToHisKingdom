import Link from "next/link";
import { notFound } from "next/navigation";
import { Laptop, MapPin, CalendarX } from "lucide-react";
import BookSlotForm from "@/components/BookSlotForm";
import ScrollReveal from "@/components/ScrollReveal";
import { createClient } from "@/lib/supabase/server";
import { formatSlot } from "@/lib/format";

export default async function TrainerDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: userData } = await supabase.auth.getUser();
  const viewerId = userData.user?.id ?? null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, location_city, location_state")
    .eq("id", id)
    .maybeSingle();

  const { data: trainerProfile } = await supabase
    .from("trainer_profiles")
    .select("*")
    .eq("profile_id", id)
    .maybeSingle();

  if (!profile || !trainerProfile) notFound();

  const { data: slots } = await supabase
    .from("trainer_availability")
    .select("id, starts_at, ends_at, mode")
    .eq("trainer_id", id)
    .eq("is_booked", false)
    .gte("starts_at", new Date().toISOString())
    .order("starts_at", { ascending: true });

  const location =
    trainerProfile.modes === "online"
      ? "Online only"
      : [profile.location_city, profile.location_state].filter(Boolean).join(", ") ||
        "Location not set";

  const modes =
    trainerProfile.modes === "both"
      ? ["Online", "In person"]
      : trainerProfile.modes === "online"
      ? ["Online"]
      : ["In person"];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/trainers" className="text-sm font-medium text-gold-deep hover:underline">
        ← Back to all trainers
      </Link>

      <header className="mt-6 flex items-center gap-5">
        <div
          aria-hidden
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-cream font-display text-2xl font-semibold text-gold-deep"
        >
          {profile.display_name.charAt(0)}
        </div>
        <div>
          <h1 className="font-display text-4xl font-semibold text-ink">{profile.display_name}</h1>
          <p className="text-stone">{location}</p>
        </div>
      </header>

      <div className="mt-4 flex flex-wrap gap-2">
        {modes.map((m) => (
          <span key={m} className="badge-gold inline-flex items-center gap-1">
            {m === "Online" ? <Laptop size={12} /> : <MapPin size={12} />}
            {m}
          </span>
        ))}
        {(trainerProfile.specialties ?? []).map((s: string) => (
          <span key={s} className="rounded-full border border-line px-3 py-1 text-xs text-stone">
            {s}
          </span>
        ))}
      </div>

      {trainerProfile.long_bio && (
        <p className="mt-6 leading-relaxed text-stone">{trainerProfile.long_bio}</p>
      )}

      <h2 className="mt-12 font-display text-2xl font-semibold text-ink">Open times</h2>
      <p className="mt-1 text-sm text-stone">
        Request a time below. {profile.display_name} will confirm it from their profile.
      </p>

      <div className="mt-6 space-y-3">
        {(slots ?? []).map((slot, i) => (
          <ScrollReveal key={slot.id} style={{ transitionDelay: `${Math.min(i, 5) * 60}ms` }}>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-paper px-5 py-4">
              <div>
                <p className="font-semibold text-ink">{formatSlot(slot.starts_at, slot.ends_at)}</p>
                <p className="text-xs uppercase tracking-wide text-stone">
                  {slot.mode === "online" ? "Online" : "In person"}
                </p>
              </div>
              {viewerId ? (
                <BookSlotForm
                  trainerId={id}
                  availabilityId={slot.id}
                  mode={slot.mode}
                  scheduledAt={slot.starts_at}
                />
              ) : (
                <Link href={`/login?redirectTo=/trainers/${id}`} className="btn-gold-sm">
                  Sign in to request
                </Link>
              )}
            </div>
          </ScrollReveal>
        ))}
        {(slots ?? []).length === 0 && (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-paper py-12 text-center text-stone">
            <CalendarX size={28} className="text-gold-soft" />
            <p>No open times right now — check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
