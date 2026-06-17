import Link from "next/link";
import ScriptureCard from "@/components/ScriptureCard";

// TODO: replace with a Supabase query (table: scriptures, today's date).
const dailyScripture = {
  reference: "Isaiah 40:31",
  text:
    "But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary.",
  translation: "ESV",
};

const destinations = [
  {
    href: "/prayer",
    title: "Prayer Wall",
    body: "Share what's on your heart and lift up others. Read freely; sign in to pray, comment, and post.",
    cta: "Enter the Prayer Wall",
  },
  {
    href: "/trainers",
    title: "Find a Trainer",
    body: "Connect with volunteer personal trainers offering their time — online or in your area — at no cost.",
    cta: "Browse trainers",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pb-8 pt-20 text-center sm:pt-28">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
            A Christian Workout Community
          </p>
          <h1 className="mx-auto max-w-3xl font-display text-5xl font-semibold leading-[1.05] text-ink sm:text-6xl">
            Strengthen the body.{" "}
            <span className="text-gold-deep">Lift the spirit.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-stone">
            Called To His Kingdom is a place to pray together, grow in the Word,
            and receive personal training freely given in love.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/signup" className="btn-gold w-full sm:w-auto">
              Join the community
            </Link>
            <Link href="/prayer" className="btn-outline w-full sm:w-auto">
              Visit the Prayer Wall
            </Link>
          </div>
        </div>
      </section>

      {/* Daily scripture — the signature */}
      <section className="px-6 py-14">
        <ScriptureCard {...dailyScripture} />
      </section>

      {/* Destinations */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2">
          {destinations.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="group flex flex-col rounded-2xl border border-line bg-paper p-8 transition-all hover:-translate-y-1 hover:border-gold-soft hover:shadow-lg"
            >
              <h2 className="font-display text-3xl font-semibold text-ink">
                {d.title}
              </h2>
              <p className="mt-3 flex-1 leading-relaxed text-stone">{d.body}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-gold-deep">
                {d.cta}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
