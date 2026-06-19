export default function PrayerLoading() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse px-6 py-16">
      <div className="mx-auto h-12 w-56 rounded-full bg-cream" />
      <div className="mx-auto mt-4 h-4 w-72 rounded-full bg-cream" />
      <div className="mx-auto mt-7 h-12 w-56 rounded-full bg-cream" />

      <div className="mt-10 space-y-5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-2xl border border-line bg-paper p-6">
            <div className="flex items-center justify-between">
              <div className="h-5 w-24 rounded-full bg-cream" />
              <div className="h-3 w-12 rounded-full bg-cream" />
            </div>
            <div className="mt-4 h-6 w-2/3 rounded-full bg-cream" />
            <div className="mt-3 h-4 w-full rounded-full bg-cream" />
            <div className="mt-2 h-4 w-5/6 rounded-full bg-cream" />
          </div>
        ))}
      </div>
    </div>
  );
}
