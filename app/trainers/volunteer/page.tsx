import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/supabase/auth-helpers";

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
    </div>
  );
}
