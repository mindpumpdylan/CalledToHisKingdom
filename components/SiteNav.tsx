import Link from "next/link";

const links = [
  { href: "/prayer", label: "Prayer Wall" },
  { href: "/trainers", label: "Find a Trainer" },
  { href: "/profile", label: "My Profile" },
];

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gold text-gold-deep font-display text-xl"
          >
            ✝
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
          <Link href="/login" className="btn-gold !px-6 !py-2.5 !text-sm">
            Sign in
          </Link>
        </div>

        {/* Mobile: single obvious action */}
        <Link href="/login" className="btn-gold !px-5 !py-2.5 !text-sm md:hidden">
          Sign in
        </Link>
      </nav>
    </header>
  );
}
