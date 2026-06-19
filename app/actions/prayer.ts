"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { PrayerCategory } from "@/lib/types";

export async function togglePraying(prayerId: string) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;
  const userId = userData.user.id;

  const { data: existing } = await supabase
    .from("prayer_interactions")
    .select("id")
    .eq("prayer_request_id", prayerId)
    .eq("user_id", userId)
    .eq("type", "praying")
    .maybeSingle();

  if (existing) {
    await supabase.from("prayer_interactions").delete().eq("id", existing.id);
  } else {
    await supabase
      .from("prayer_interactions")
      .insert({ prayer_request_id: prayerId, user_id: userId, type: "praying" });
  }
  revalidatePath("/prayer");
}

export type CreatePrayerState = { error: string } | undefined;

export async function createPrayer(
  _prevState: CreatePrayerState,
  formData: FormData
): Promise<CreatePrayerState> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect("/login?redirectTo=/prayer/new");

  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const category = String(formData.get("category") ?? "Other") as PrayerCategory;
  const isAnonymous = formData.get("isAnonymous") === "on";

  if (!title || !body) {
    return { error: "Please fill in both a title and your request." };
  }

  const { error } = await supabase.from("prayer_requests").insert({
    author_id: userData.user.id,
    title,
    body,
    category,
    is_anonymous: isAnonymous,
  });
  if (error) return { error: error.message };

  revalidatePath("/prayer");
  redirect("/prayer");
}
