import Image from "next/image";

export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-center">
      <div
        aria-hidden
        className="relative mx-auto h-12 w-12 animate-pulse overflow-hidden rounded-full ring-2 ring-gold-soft"
      >
        <Image src="/Logo.png" alt="" fill sizes="48px" className="object-cover" />
      </div>
      <div className="mt-8 animate-pulse">
        <div className="mx-auto h-10 w-64 rounded-full bg-cream" />
        <div className="mx-auto mt-4 h-4 w-80 rounded-full bg-cream" />
        <div className="mt-10 h-48 rounded-2xl border border-line bg-paper" />
      </div>
    </div>
  );
}
