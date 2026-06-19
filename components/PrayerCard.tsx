import Link from "next/link";
import { HandHeart } from "lucide-react";
import PrayingButton from "@/components/PrayingButton";

type Prayer = {
  id: string;
  author: string;
  isAnonymous?: boolean;
  category: string;
  title: string;
  body: string;
  prayingCount: number;
  timeAgo: string;
  isPraying: boolean;
};

export default function PrayerCard({
  prayer,
  viewerSignedIn,
}: {
  prayer: Prayer;
  viewerSignedIn: boolean;
}) {
  const name = prayer.isAnonymous ? "Anonymous" : prayer.author;
  return (
    <article className="card hover:-translate-y-1 hover:border-gold-soft">
      <div className="mb-3 flex items-center justify-between">
        <span className="badge-gold uppercase tracking-wide">{prayer.category}</span>
        <span className="text-xs text-stone">{prayer.timeAgo}</span>
      </div>
      <h3 className="font-display text-2xl font-semibold text-ink">{prayer.title}</h3>
      <p className="mt-2 leading-relaxed text-stone">{prayer.body}</p>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <span className="text-sm text-stone">Shared by {name}</span>
        {viewerSignedIn ? (
          <PrayingButton
            prayerId={prayer.id}
            initialCount={prayer.prayingCount}
            initialIsPraying={prayer.isPraying}
          />
        ) : (
          <Link
            href="/login?redirectTo=/prayer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-gold px-4 py-2 text-sm font-semibold text-gold-deep transition-colors hover:bg-cream"
          >
            <HandHeart size={16} /> I&apos;m praying · {prayer.prayingCount}
          </Link>
        )}
      </div>
    </article>
  );
}
