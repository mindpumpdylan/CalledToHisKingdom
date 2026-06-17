// TODO: gate behind auth; insert into prayer_requests on submit.
export default function NewPrayer() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="font-display text-4xl font-semibold text-ink">Share a prayer request</h1>
      <p className="mt-2 text-stone">Your words may be exactly what someone needs to read today.</p>
      <form className="mt-8 space-y-4">
        <input type="text" placeholder="Title" className="w-full rounded-xl border border-line bg-paper px-4 py-3 outline-none focus:border-gold" />
        <textarea placeholder="What would you like prayer for?" rows={6} className="w-full rounded-xl border border-line bg-paper px-4 py-3 outline-none focus:border-gold" />
        <label className="flex items-center gap-2 text-sm text-stone">
          <input type="checkbox" /> Post anonymously
        </label>
        <button type="button" className="btn-gold w-full">Share with the community</button>
      </form>
    </div>
  );
}
