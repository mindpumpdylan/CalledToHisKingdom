import Link from "next/link";
import { Sparkles } from "lucide-react";
import TrainerCard from "@/components/TrainerCard";
import ScrollReveal from "@/components/ScrollReveal";
import { createClient } from "@/lib/supabase/server";

const filters = ["All", "Online", "In person", "Strength", "Mobility", "Weight loss"];
const modeFilters = new Set(["Online", "In person"]);

function filterHref(f: string) {
  if (f === "All") return "/trainers";
  if (modeFilters.has(f)) return `/trainers?mode=${encodeURIComponent(f)}`;
  return `/trainers?specialty=${encodeURIComponent(f)}`;
}

function isActive(f: string, mode?: string, specialty?: string) {
  if (f === "All") return !mode && !specialty;
  if (modeFilters.has(f)) return mode === f;
  return specialty === f;
}

export default async function Trainers({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; specialty?: string }>;
}) {
  const { mode, specialty } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("trainer_profiles")
    .select("*, profiles(display_name, location_city, location_state)")
    .eq("accepting_clients", true);

  if (mode === "Online") query = query.in("modes", ["online", "both"]);
  if (mode === "In person") query = query.in("modes", ["in_person", "both"]);
  if (specialty) query = query.contains("specialties", [specialty]);

  const { data: trainerRows } = await query;

  const trainers = (trainerRows ?? []).map((t) => ({
    id: t.profile_id as string,
    name: t.profiles?.display_name ?? "A trainer",
    location:
      t.modes === "online"
        ? "Online only"
        : [t.profiles?.location_city, t.profiles?.location_state].filter(Boolean).join(", ") ||
          "Location not set",
    modes: t.modes === "both" ? ["Online", "In person"] : t.modes === "online" ? ["Online"] : ["In person"],
    specialties: t.specialties ?? [],
    blurb: t.long_bio ?? "A volunteer trainer in this community.",
  }));

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-10 text-center">
        <h1 className="font-display text-5xl font-semibold text-ink">Find a Trainer</h1>
        <p className="mx-auto mt-3 max-w-xl text-stone">
          These trainers volunteer their time so that cost is never a barrier to
          caring for the body God gave you. Browse freely; sign in to book a session.
        </p>
        <Link href="/trainers/volunteer" className="btn-outline mt-7">
          I want to volunteer my time
        </Link>
      </header>

      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {filters.map((f) => (
          <Link
            key={f}
            href={filterHref(f)}
            className={
              isActive(f, mode, specialty)
                ? "rounded-full bg-gold px-5 py-2 text-sm font-semibold text-white"
                : "rounded-full border border-line px-5 py-2 text-sm font-medium text-stone hover:bg-cream"
            }
          >
            {f}
          </Link>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trainers.map((t, i) => (
          <ScrollReveal key={i} style={{ transitionDelay: `${Math.min(i, 5) * 80}ms` }}>
            <TrainerCard trainer={t} />
          </ScrollReveal>
        ))}
      </div>
      {trainers.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-10 text-center text-stone">
          <Sparkles size={32} className="text-gold-soft" />
          <p>No trainers match yet — check back soon, or volunteer your own time.</p>
        </div>
      )}
    </div>
  );
}
