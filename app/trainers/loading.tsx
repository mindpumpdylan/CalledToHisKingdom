export default function TrainersLoading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-6 py-16">
      <div className="mx-auto h-12 w-64 rounded-full bg-cream" />
      <div className="mx-auto mt-4 h-4 w-96 rounded-full bg-cream" />
      <div className="mx-auto mt-7 h-12 w-64 rounded-full bg-cream" />

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-9 w-20 rounded-full bg-cream" />
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-2xl border border-line bg-paper p-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-cream" />
              <div className="flex-1">
                <div className="h-5 w-2/3 rounded-full bg-cream" />
                <div className="mt-2 h-3 w-1/2 rounded-full bg-cream" />
              </div>
            </div>
            <div className="mt-4 h-4 w-full rounded-full bg-cream" />
            <div className="mt-2 h-4 w-5/6 rounded-full bg-cream" />
          </div>
        ))}
      </div>
    </div>
  );
}
