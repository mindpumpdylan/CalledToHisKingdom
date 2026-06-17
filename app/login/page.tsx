// TODO: wire to Supabase Auth (createBrowserClient signInWithPassword / OAuth).
export default function Login() {
  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-24 text-center">
      <h1 className="font-display text-4xl font-semibold text-ink">Welcome back</h1>
      <p className="mt-2 text-stone">Sign in to pray, post, and book sessions.</p>
      <form className="mt-8 space-y-4 text-left">
        <input type="email" placeholder="Email" className="w-full rounded-xl border border-line bg-paper px-4 py-3 outline-none focus:border-gold" />
        <input type="password" placeholder="Password" className="w-full rounded-xl border border-line bg-paper px-4 py-3 outline-none focus:border-gold" />
        <button type="button" className="btn-gold w-full">Sign in</button>
      </form>
      <p className="mt-6 text-sm text-stone">
        New here? <a href="/signup" className="font-semibold text-gold-deep">Create an account</a>
      </p>
    </div>
  );
}
