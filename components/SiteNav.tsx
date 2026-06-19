import Link from "next/link";
import { Cross } from "lucide-react";
import { getCurrentProfile } from "@/lib/supabase/auth-helpers";
import { signOut } from "@/app/actions/auth";
import MobileNav from "@/components/MobileNav";

const links = [
  { href: "/prayer", label: "Prayer Wall" },
  { href: "/trainers", label: "Find a Trainer" },
  { href: "/profile", label: "My Profile" },
];

export default async function SiteNav() {
  const profile = await getCurrentProfile();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gold text-gold-deep"
          >
            <Cross size={18} strokeWidth={2} />
          </span>
          <span className="font-display text-xl font-semibold leading-tight text-ink">
            Called To His Kingdom
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-stone transition-colors hover:text-gold-deep"
            >
              {l.label}
            </Link>
          ))}
          {profile ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cream font-display text-sm font-semibold text-gold-deep"
              >
                {profile.display_name.charAt(0).toUpperCase()}
              </Link>
              <form action={signOut}>
                <button type="submit" className="text-sm font-medium text-stone transition-colors hover:text-gold-deep">
                  Sign out
                </button>
              </form>
            </div>
          ) : (
            <Link href="/login" className="btn-gold-sm">
              Sign in
            </Link>
          )}
        </div>

        <MobileNav signedIn={!!profile} displayName={profile?.display_name} />
      </nav>
    </header>
  );
}
