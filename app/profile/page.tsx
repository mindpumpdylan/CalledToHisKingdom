import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/auth-helpers";
import { becomeTrainer } from "@/app/actions/profile";
import type { TrainerProfile } from "@/lib/types";

export default async function Profile() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login?redirectTo=/profile");

  const supabase = await createClient();
  let trainerProfile: TrainerProfile | null = null;
  if (profile.is_trainer) {
    const { data } = await supabase
      .from("trainer_profiles")
      .select("*")
      .eq("profile_id", profile.id)
      .maybeSingle();
    trainerProfile = data ?? null;
  }

  const location = [profile.location_city, profile.location_state, profile.location_country]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10 flex items-center gap-5">
        <div
          aria-hidden
          className="flex h-20 w-20 items-center justify-center rounded-full bg-cream font-display text-3xl font-semibold text-gold-deep"
        >
          {profile.display_name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="font-display text-4xl font-semibold text-ink">{profile.display_name}</h1>
          <p className="text-stone">Manage how you show up in the community.</p>
        </div>
      </header>

      <section className="space-y-6">
        <div className="card">
          <h2 className="font-display text-2xl font-semibold text-ink">Member details</h2>
          <p className="mt-1 text-sm text-stone">
            Display name, photo, bio, location, and prayer preferences.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-stone">
            <li>• Public display name: {profile.display_name}</li>
            <li>• Location: {location || "Not set"}</li>
            <li>• Training preference: {profile.training_preference ?? "Not set"}</li>
          </ul>
        </div>

        {profile.is_trainer ? (
          <div className="rounded-2xl border-2 border-gold-soft bg-cream/40 p-6">
            <h2 className="font-display text-2xl font-semibold text-ink">Your trainer profile</h2>
            <p className="mt-1 text-sm text-stone">
              {trainerProfile?.accepting_clients
                ? "You're listed and currently accepting clients on the Find a Trainer page."
                : "Not currently accepting clients."}
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-gold-soft bg-cream/40 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold text-ink">
                Become a volunteer trainer
              </h2>
              <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-white">
                Optional
              </span>
            </div>
            <p className="mt-1 text-sm text-stone">
              Unlock a trainer profile: specialties, certifications, the modes you
              offer, and a calendar of hours you&apos;re giving to the community.
            </p>
            <form action={becomeTrainer}>
              <button type="submit" className="btn-gold-sm mt-5">
                Enable trainer features
              </button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}
