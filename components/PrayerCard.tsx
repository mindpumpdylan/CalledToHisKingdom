type Prayer = {
  author: string;
  isAnonymous?: boolean;
  category: string;
  title: string;
  body: string;
  prayingCount: number;
  timeAgo: string;
};

export default function PrayerCard({ prayer }: { prayer: Prayer }) {
  const name = prayer.isAnonymous ? "Anonymous" : prayer.author;
  return (
    <article className="rounded-2xl border border-line bg-paper p-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-deep">
          {prayer.category}
        </span>
        <span className="text-xs text-stone">{prayer.timeAgo}</span>
      </div>
      <h3 className="font-display text-2xl font-semibold text-ink">{prayer.title}</h3>
      <p className="mt-2 leading-relaxed text-stone">{prayer.body}</p>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <span className="text-sm text-stone">Shared by {name}</span>
        {/* TODO: requires auth — wire to prayer_interactions insert */}
        <button className="inline-flex items-center gap-2 rounded-full border-2 border-gold px-4 py-2 text-sm font-semibold text-gold-deep transition-colors hover:bg-cream">
          🙏 I&apos;m praying · {prayer.prayingCount}
        </button>
      </div>
    </article>
  );
}
