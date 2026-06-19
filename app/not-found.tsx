import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-24 text-center">
      <div
        aria-hidden
        className="relative mx-auto h-16 w-16 overflow-hidden rounded-full ring-2 ring-gold-soft"
      >
        <Image src="/Logo.png" alt="" fill sizes="64px" className="object-cover" />
      </div>
      <figure className="gold-frame mx-auto mt-6 rounded-sm bg-paper px-8 py-10">
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
