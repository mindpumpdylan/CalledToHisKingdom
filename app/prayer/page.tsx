import Link from "next/link";
import { Inbox } from "lucide-react";
import PrayerCard from "@/components/PrayerCard";
import ScrollReveal from "@/components/ScrollReveal";
import { createClient } from "@/lib/supabase/server";
import { timeAgo } from "@/lib/format";
import type { PrayerCategory } from "@/lib/types";

type PrayerRow = {
  id: string;
  title: string;
  body: string;
  category: string;
  is_anonymous: boolean;
  is_answered: boolean;
  created_at: string;
  profiles: { display_name: string } | null;
};

const categories: PrayerCategory[] = [
  "Healing",
  "Guidance",
  "Gratitude",
  "Family",
  "Provision",
  "Other",
];

export default async function PrayerWall({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const viewerId = userData.user?.id ?? null;

  let query = supabase
    .from("prayer_requests")
    .select("id, title, body, category, is_anonymous, is_answered, created_at, profiles(display_name)")
    .order("created_at", { ascending: false });
  if (category) query = query.eq("category", category);

  const { data: prayersData } = await query;
  const prayers = prayersData as unknown as PrayerRow[] | null;

  const prayerIds = (prayers ?? []).map((p) => p.id);
  const { data: interactions } = prayerIds.length
    ? await supabase
        .from("prayer_interactions")
        .select("prayer_request_id, user_id")
        .eq("type", "praying")
        .in("prayer_request_id", prayerIds)
    : { data: [] as { prayer_request_id: string; user_id: string }[] };

  const countsByPrayer = new Map<string, number>();
  const viewerPrayedSet = new Set<string>();
  for (const i of interactions ?? []) {
    countsByPrayer.set(i.prayer_request_id, (countsByPrayer.get(i.prayer_request_id) ?? 0) + 1);
    if (viewerId && i.user_id === viewerId) viewerPrayedSet.add(i.prayer_request_id);
  }

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

      <div className="mb-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/prayer"
          className={
            !category
              ? "rounded-full bg-gold px-5 py-2 text-sm font-semibold text-white"
              : "rounded-full border border-line px-5 py-2 text-sm font-medium text-stone hover:bg-cream"
          }
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={`/prayer?category=${encodeURIComponent(c)}`}
            className={
              category === c
                ? "rounded-full bg-gold px-5 py-2 text-sm font-semibold text-white"
                : "rounded-full border border-line px-5 py-2 text-sm font-medium text-stone hover:bg-cream"
            }
          >
            {c}
          </Link>
        ))}
      </div>

      <div className="space-y-5">
        {(prayers ?? []).map((p, i) => (
          <ScrollReveal key={p.id} style={{ transitionDelay: `${Math.min(i, 5) * 80}ms` }}>
            <PrayerCard
              prayer={{
                id: p.id,
                author: p.profiles?.display_name ?? "A member",
                isAnonymous: p.is_anonymous,
                isAnswered: p.is_answered,
                category: p.category,
                title: p.title,
                body: p.body,
                prayingCount: countsByPrayer.get(p.id) ?? 0,
                timeAgo: timeAgo(p.created_at),
                isPraying: viewerPrayedSet.has(p.id),
              }}
              viewerSignedIn={!!viewerId}
            />
          </ScrollReveal>
        ))}
        {(prayers ?? []).length === 0 && (
          <div className="flex flex-col items-center gap-3 py-10 text-center text-stone">
            <Inbox size={32} className="text-gold-soft" />
            <p>
              {category
                ? `No prayers in “${category}” yet — be the first to share.`
                : "No prayers yet — be the first to share what's on your heart."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
