import Link from "next/link";
import { redirect } from "next/navigation";
import { Dumbbell, HandHeart, UserPlus } from "lucide-react";
import { getCurrentProfile } from "@/lib/supabase/auth-helpers";

const steps = [
  {
    icon: UserPlus,
    title: "Create an account",
    body: "Sign up, then enable trainer features from your profile.",
  },
  {
    icon: Dumbbell,
    title: "Set your hours",
    body: "List your specialties, the modes you offer, and the open times you're giving.",
  },
  {
    icon: HandHeart,
    title: "Train someone in need",
    body: "Members request your open times directly — confirm and you're set.",
  },
];

export default async function Volunteer() {
  const profile = await getCurrentProfile();
  if (profile) redirect("/profile");

  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="font-display text-4xl font-semibold text-ink">Volunteer your time</h1>
      <p className="mx-auto mt-3 max-w-md text-stone">
        Offer your training skills to those who can&apos;t afford them. Set the hours
        you&apos;re willing to give, online or in person, and let the community find you.
      </p>
      <Link href="/signup?redirectTo=/profile" className="btn-gold mt-8">Get started</Link>

      <div className="mt-16 grid gap-6 text-left sm:grid-cols-3">
        {steps.map((s) => (
          <div key={s.title} className="card">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-gold-deep">
              <s.icon size={20} />
            </span>
            <h2 className="mt-4 font-display text-lg font-semibold text-ink">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-stone">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
