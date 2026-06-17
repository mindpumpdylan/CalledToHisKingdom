// TODO: gate behind auth; sets profiles.is_trainer and opens availability calendar.
export default function Volunteer() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="font-display text-4xl font-semibold text-ink">Volunteer your time</h1>
      <p className="mx-auto mt-3 max-w-md text-stone">
        Offer your training skills to those who can&apos;t afford them. Set the hours
        you&apos;re willing to give, online or in person, and let the community find you.
      </p>
      <a href="/signup" className="btn-gold mt-8">Get started</a>
    </div>
  );
}
