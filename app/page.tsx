import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  UserPlus,
  HandHeart,
  Dumbbell,
  ShieldCheck,
  BookOpen,
  Users,
  Heart,
} from "lucide-react";
import ScriptureCard from "@/components/ScriptureCard";
import SectionDivider from "@/components/SectionDivider";
import ScrollReveal from "@/components/ScrollReveal";
import FaqAccordion from "@/components/FaqAccordion";
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
  {
    href: "/trainers/volunteer",
    title: "Volunteer Your Time",
    body: "A certified trainer? Give an hour a week to someone who couldn't otherwise afford it.",
    cta: "Offer your time",
  },
];

const steps = [
  {
    icon: UserPlus,
    title: "Join the community",
    body: "Create a free account in a minute. Browse everything first — sign in only when you're ready to take part.",
  },
  {
    icon: HandHeart,
    title: "Pray and be prayed for",
    body: "Post what's on your heart to the Prayer Wall, or stand with someone else by praying over theirs.",
  },
  {
    icon: Dumbbell,
    title: "Train, freely given",
    body: "Match with a volunteer trainer — online or in person — and start moving toward a stronger, healthier body.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Free, always",
    body: "Training offered here is a gift, never a transaction. Cost should never stand between you and your health.",
  },
  {
    icon: BookOpen,
    title: "Prayer first",
    body: "Every session, every page, is rooted in the belief that the body and the spirit are cared for together.",
  },
  {
    icon: Users,
    title: "Community led",
    body: "Trainers are members of this community giving their own time — not a service, a fellowship.",
  },
  {
    icon: ShieldCheck,
    title: "Christ centered",
    body: "Scripture isn't decoration here. It's the reason we built this in the first place.",
  },
];

const faqs = [
  {
    question: "Is this actually free?",
    answer:
      "Yes. Every trainer on this site volunteers their time. There is no fee, subscription, or hidden cost to train or to pray here.",
  },
  {
    question: "Do I need experience to start training?",
    answer:
      "No. Trainers list their specialties and modes so you can find someone suited to wherever you're starting from — beginner or experienced.",
  },
  {
    question: "Can I post a prayer request anonymously?",
    answer:
      "Yes. When you share a request, you can choose to post under your name or anonymously — either way, the community can still pray for you.",
  },
  {
    question: "How do I become a volunteer trainer?",
    answer:
      "Create an account, then enable trainer features from your profile. You'll set the specialties, modes, and hours you're willing to give.",
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
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 opacity-[0.06]"
        >
          <Image src="/Logo.png" alt="" fill className="object-contain" />
        </div>
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

      {/* Mission / story */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <ScrollReveal>
          <div className="grid items-center gap-10 sm:grid-cols-[auto,1fr]">
            <div
              aria-hidden
              className="relative mx-auto h-32 w-32 shrink-0 overflow-hidden rounded-full ring-2 ring-gold-soft sm:mx-0"
            >
              <Image src="/Logo.png" alt="" fill sizes="128px" className="object-cover" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
                Our Calling
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
                Faith and fitness were never meant to be separate.
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-stone">
                We built Called To His Kingdom around a simple conviction: the
                body is worth caring for, and no one should be priced out of
                that care. Here, certified trainers give their time freely,
                the community carries each other&apos;s burdens in prayer, and
                scripture sets the tone for everything in between.
              </p>
              <p className="mt-3 max-w-2xl font-display text-lg italic text-gold-deep">
                &ldquo;Whatever you did for one of the least of these brothers and
                sisters of mine, you did for me.&rdquo; — Matthew 25:40
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <SectionDivider />

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <ScrollReveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
            How It Works
          </p>
          <h2 className="mx-auto mt-3 max-w-xl font-display text-3xl font-semibold text-ink sm:text-4xl">
            Three steps from here to a stronger body and a fuller heart.
          </h2>
        </ScrollReveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <ScrollReveal key={s.title} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="card h-full text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cream text-gold-deep">
                  <s.icon size={24} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 leading-relaxed text-stone">{s.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* Destinations */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <ScrollReveal key={d.href} style={{ transitionDelay: `${i * 100}ms` }}>
              <Link
                href={d.href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-8 transition-all hover:-translate-y-1 hover:border-gold-soft hover:shadow-lg"
              >
                <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
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

      <SectionDivider />

      {/* Values */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <ScrollReveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
            What We Stand On
          </p>
        </ScrollReveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <ScrollReveal key={v.title} style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="h-full rounded-2xl border border-line bg-paper p-6 text-center transition-all hover:-translate-y-1 hover:border-gold-soft hover:shadow-md">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cream text-gold-deep">
                  <v.icon size={20} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">{v.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <ScrollReveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
            Questions
          </p>
          <h2 className="mx-auto mt-3 max-w-xl font-display text-3xl font-semibold text-ink">
            Good to know before you join
          </h2>
        </ScrollReveal>
        <ScrollReveal className="mt-10">
          <FaqAccordion items={faqs} />
        </ScrollReveal>
      </section>

      {/* Closing CTA band */}
      <section className="relative overflow-hidden bg-gold px-6 py-16 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        />
        <ScrollReveal>
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            Ready to be part of it?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/90">
            Join the community today — pray, be prayed for, and move toward a
            stronger body in good company.
          </p>
          <Link
            href="/signup"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold tracking-wide text-gold-deep shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            Join the community
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
