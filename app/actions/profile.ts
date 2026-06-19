"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function becomeTrainer() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect("/login?redirectTo=/profile");
  const userId = userData.user.id;

  const { data: existing } = await supabase
    .from("trainer_profiles")
    .select("id")
    .eq("profile_id", userId)
    .maybeSingle();

  if (!existing) {
    await supabase.from("trainer_profiles").insert({ profile_id: userId });
  }
  await supabase.from("profiles").update({ is_trainer: true }).eq("id", userId);

  revalidatePath("/profile");
  revalidatePath("/trainers");
}
