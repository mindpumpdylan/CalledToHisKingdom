"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { signOut } from "@/app/actions/auth";

const links = [
  { href: "/prayer", label: "Prayer Wall" },
  { href: "/trainers", label: "Find a Trainer" },
  { href: "/profile", label: "My Profile" },
];

export default function MobileNav({
  signedIn,
  displayName,
}: {
  signedIn: boolean;
  displayName?: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full border-b border-line bg-ivory px-6 py-4 shadow-md">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-stone transition-colors hover:text-gold-deep"
              >
                {l.label}
              </Link>
            ))}
            {signedIn ? (
              <form action={signOut}>
                <button
                  type="submit"
                  className="text-left text-sm font-medium text-stone transition-colors hover:text-gold-deep"
                >
                  Sign out {displayName ? `(${displayName})` : ""}
                </button>
              </form>
            ) : (
              <Link href="/login" className="btn-gold-sm w-fit">
                Sign in
              </Link>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
