import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";

// Use in Server Components / Server Functions to get the signed-in user's
// profile (or null if signed out). Centralizes the auth check so every
// gated page/action imports from the same place.
export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userData.user.id)
    .single();

  return profile ?? null;
}
