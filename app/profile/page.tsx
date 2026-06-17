// TODO: gate this route behind auth (redirect to /login if no session).
// TODO: load profile + trainer_profile from Supabase for the signed-in user.
export default function Profile() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10 flex items-center gap-5">
        <div
          aria-hidden
          className="flex h-20 w-20 items-center justify-center rounded-full bg-cream font-display text-3xl font-semibold text-gold-deep"
        >
          ?
        </div>
        <div>
          <h1 className="font-display text-4xl font-semibold text-ink">Your Profile</h1>
          <p className="text-stone">Manage how you show up in the community.</p>
        </div>
      </header>

      <section className="space-y-6">
        <div className="rounded-2xl border border-line bg-paper p-6">
          <h2 className="font-display text-2xl font-semibold text-ink">Member details</h2>
          <p className="mt-1 text-sm text-stone">
            Display name, photo, bio, location, and prayer preferences.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-stone">
            <li>• Public display name &amp; avatar</li>
            <li>• City / state / country (powers trainer matching)</li>
            <li>• Training preference: online · in person · both</li>
          </ul>
        </div>

        <div className="rounded-2xl border-2 border-gold-soft bg-cream/40 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Become a volunteer trainer
            </h2>
            <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-white">
              Optional
            </span>
          </div>
          <p className="mt-1 text-sm text-stone">
            Unlock a trainer profile: specialties, certifications, the modes you
            offer, and a calendar of hours you&apos;re giving to the community.
          </p>
          {/* TODO: toggles profiles.is_trainer + creates trainer_profiles row */}
          <button className="btn-gold mt-5 !px-6 !py-3 !text-sm">
            Enable trainer features
          </button>
        </div>
      </section>
    </div>
  );
}
