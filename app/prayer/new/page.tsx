import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/supabase/auth-helpers";
import NewPrayerForm from "./NewPrayerForm";

export default async function NewPrayer() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login?redirectTo=/prayer/new");

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="font-display text-4xl font-semibold text-ink">Share a prayer request</h1>
      <p className="mt-2 text-stone">Your words may be exactly what someone needs to read today.</p>
      <NewPrayerForm />
    </div>
  );
}
