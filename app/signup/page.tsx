// TODO: wire to Supabase Auth signUp + create matching profiles row.
export default function Signup() {
  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-24 text-center">
      <h1 className="font-display text-4xl font-semibold text-ink">Join the community</h1>
      <p className="mt-2 text-stone">Create an account to take part fully.</p>
      <form className="mt-8 space-y-4 text-left">
        <input type="text" placeholder="Display name" className="w-full rounded-xl border border-line bg-paper px-4 py-3 outline-none focus:border-gold" />
        <input type="email" placeholder="Email" className="w-full rounded-xl border border-line bg-paper px-4 py-3 outline-none focus:border-gold" />
        <input type="password" placeholder="Password" className="w-full rounded-xl border border-line bg-paper px-4 py-3 outline-none focus:border-gold" />
        <button type="button" className="btn-gold w-full">Create account</button>
      </form>
    </div>
  );
}
