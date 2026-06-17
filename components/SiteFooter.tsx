import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-cream/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold text-ink">
            Called To His Kingdom
          </p>
          <p className="mt-2 max-w-xs text-sm text-stone">
            A Christian workout community built on prayer, scripture, and the
            gift of time freely given.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold text-ink">Community</p>
          <ul className="space-y-2 text-stone">
            <li><Link href="/prayer" className="hover:text-gold-deep">Prayer Wall</Link></li>
            <li><Link href="/trainers" className="hover:text-gold-deep">Find a Trainer</Link></li>
            <li><Link href="/trainers/volunteer" className="hover:text-gold-deep">Volunteer your time</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold text-ink">Account</p>
          <ul className="space-y-2 text-stone">
            <li><Link href="/login" className="hover:text-gold-deep">Sign in</Link></li>
            <li><Link href="/signup" className="hover:text-gold-deep">Create an account</Link></li>
            <li><Link href="/profile" className="hover:text-gold-deep">My profile</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-stone">
        “Whatever you do, work heartily, as for the Lord.” — Colossians 3:23
      </div>
    </footer>
  );
}
