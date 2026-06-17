import Link from "next/link";
import TrainerCard from "@/components/TrainerCard";

// TODO: replace with Supabase query (trainer_profiles joined to profiles + availability).
const trainers = [
  { name: "Daniel Owens", location: "Austin, TX", modes: ["In person", "Online"], specialties: ["Strength", "Beginners"], blurb: "Certified trainer of 8 years. I believe the body is a temple, and I'd love to help you steward yours.", openSlots: 5 },
  { name: "Grace Kim", location: "Online only", modes: ["Online"], specialties: ["Mobility", "Postpartum"], blurb: "Meeting you wherever you are. Gentle, sustainable programming rooted in encouragement.", openSlots: 9 },
  { name: "Marcus Bell", location: "Atlanta, GA", modes: ["In person"], specialties: ["Weight loss", "Accountability"], blurb: "No judgment, just brotherhood. Let's get to work and give thanks for every step forward.", openSlots: 3 },
];

const filters = ["All", "Online", "In person", "Strength", "Mobility", "Weight loss"];

export default function Trainers() {
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

      {/* TODO: wire filters to query params + Supabase filtering by mode/specialty/location */}
      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {filters.map((f, i) => (
          <button
            key={f}
            className={
              i === 0
                ? "rounded-full bg-gold px-5 py-2 text-sm font-semibold text-white"
                : "rounded-full border border-line px-5 py-2 text-sm font-medium text-stone hover:bg-cream"
            }
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trainers.map((t, i) => (
          <TrainerCard key={i} trainer={t} />
        ))}
      </div>
    </div>
  );
}
