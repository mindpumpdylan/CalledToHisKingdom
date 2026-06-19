import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-24 text-center">
      <figure className="gold-frame mx-auto rounded-sm bg-paper px-8 py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">404</p>
        <blockquote className="mt-4 font-display text-2xl font-medium leading-snug text-ink">
          “He will not let your foot slip.”
        </blockquote>
        <p className="mt-3 text-sm font-semibold tracking-wide text-stone">Psalm 121:3</p>
      </figure>
      <p className="mt-8 text-stone">
        This page wandered off. Let&apos;s get you back on solid ground.
      </p>
      <Link href="/" className="btn-gold mt-6 self-center">
        Back home
      </Link>
    </div>
  );
}
