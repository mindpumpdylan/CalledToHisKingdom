import Link from "next/link";
import PrayerCard from "@/components/PrayerCard";

// TODO: replace with Supabase query (table: prayer_requests + prayer_interactions counts).
const prayers = [
  { author: "Maria L.", category: "Healing", title: "Strength through recovery", body: "Please pray for my mother as she recovers from surgery this week. Grateful for this community.", prayingCount: 24, timeAgo: "2h ago" },
  { author: "James", category: "Guidance", title: "A new season", body: "Starting a new job and feeling the weight of it. Praying for wisdom and a calm heart.", prayingCount: 11, timeAgo: "5h ago", isAnonymous: true },
  { author: "Tabitha R.", category: "Gratitude", title: "Thank you, Lord", body: "Six months sober today. Every workout and every prayer here has carried me. Glory to God.", prayingCount: 58, timeAgo: "1d ago" },
];

export default function PrayerWall() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10 text-center">
        <h1 className="font-display text-5xl font-semibold text-ink">Prayer Wall</h1>
        <p className="mx-auto mt-3 max-w-md text-stone">
          Read freely. Sign in to pray for others, leave encouragement, and share
          your own requests.
        </p>
        <Link href="/prayer/new" className="btn-gold mt-7">
          Share a prayer request
        </Link>
      </header>

      <div className="space-y-5">
        {prayers.map((p, i) => (
          <PrayerCard key={i} prayer={p} />
        ))}
      </div>
    </div>
  );
}
