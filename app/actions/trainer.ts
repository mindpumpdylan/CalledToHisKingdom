"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { BookingStatus } from "@/lib/types";

export type AvailabilityActionState = { error: string } | undefined;

export async function addAvailability(
  _prevState: AvailabilityActionState,
  formData: FormData
): Promise<AvailabilityActionState> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect("/login?redirectTo=/profile");
  const trainerId = userData.user.id;

  const startsAt = String(formData.get("startsAt") ?? "");
  const endsAt = String(formData.get("endsAt") ?? "");
  const mode = String(formData.get("mode") ?? "online");

  if (!startsAt || !endsAt) {
    return { error: "Please set both a start and end time." };
  }
  if (new Date(endsAt) <= new Date(startsAt)) {
    return { error: "The end time must be after the start time." };
  }

  const { error } = await supabase.from("trainer_availability").insert({
    trainer_id: trainerId,
    starts_at: new Date(startsAt).toISOString(),
    ends_at: new Date(endsAt).toISOString(),
    mode,
  });
  if (error) return { error: error.message };

  revalidatePath("/profile");
  return undefined;
}

export async function removeAvailability(formData: FormData) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;

  const slotId = String(formData.get("slotId") ?? "");
  await supabase
    .from("trainer_availability")
    .delete()
    .eq("id", slotId)
    .eq("trainer_id", userData.user.id);

  revalidatePath("/profile");
}

export type BookingActionState = { error: string } | { success: true } | undefined;

export async function requestBooking(
  _prevState: BookingActionState,
  formData: FormData
): Promise<BookingActionState> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect("/login");
  const clientId = userData.user.id;

  const trainerId = String(formData.get("trainerId") ?? "");
  const availabilityId = String(formData.get("availabilityId") ?? "");
  const mode = String(formData.get("mode") ?? "online");
  const scheduledAt = String(formData.get("scheduledAt") ?? "");
  const notes = String(formData.get("notes") ?? "").trim() || null;

  if (!trainerId || !availabilityId) {
    return { error: "This time slot is no longer available." };
  }
  if (trainerId === clientId) {
    return { error: "You can't book a session with yourself." };
  }

  const { error } = await supabase.from("bookings").insert({
    trainer_id: trainerId,
    client_id: clientId,
    availability_id: availabilityId,
    mode,
    scheduled_at: scheduledAt || null,
    notes,
  });
  if (error) return { error: error.message };

  revalidatePath(`/trainers/${trainerId}`);
  revalidatePath("/profile");
  return { success: true };
}

async function setBookingStatus(formData: FormData, status: BookingStatus) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;

  const bookingId = String(formData.get("bookingId") ?? "");
  await supabase
    .from("bookings")
    .update({ status })
    .eq("id", bookingId)
    .or(`client_id.eq.${userData.user.id},trainer_id.eq.${userData.user.id}`);

  revalidatePath("/profile");
}

export async function confirmBooking(formData: FormData) {
  await setBookingStatus(formData, "confirmed");
}

export async function completeBooking(formData: FormData) {
  await setBookingStatus(formData, "completed");
}

export async function cancelBooking(formData: FormData) {
  await setBookingStatus(formData, "cancelled");
}
