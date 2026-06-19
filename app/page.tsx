import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScriptureCard from "@/components/ScriptureCard";
import SectionDivider from "@/components/SectionDivider";
import ScrollReveal from "@/components/ScrollReveal";
import { createClient } from "@/lib/supabase/server";

// Fallback shown when no `scriptures` row is seeded for today's date.
const fallbackScripture = {
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

export default async function Home() {
  const supabase = await createClient();
  const today = new Date().toISOString().slice(0, 10);
  const { data: scripture } = await supabase
    .from("scriptures")
    .select("reference, text, translation")
    .eq("feature_date", today)
    .maybeSingle();
  const dailyScripture = scripture ?? fallbackScripture;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-gold/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-gold-soft/30 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-6 pb-8 pt-20 text-center sm:pt-28">
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

      <SectionDivider />

      {/* Daily scripture — the signature */}
      <section className="px-6 py-14">
        <ScrollReveal>
          <ScriptureCard {...dailyScripture} />
        </ScrollReveal>
      </section>

      <SectionDivider />

      {/* Destinations */}
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-24">
        <div className="grid gap-6 sm:grid-cols-2">
          {destinations.map((d, i) => (
            <ScrollReveal key={d.href} style={{ transitionDelay: `${i * 100}ms` }}>
              <Link
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
                    <ArrowRight size={18} />
                  </span>
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
