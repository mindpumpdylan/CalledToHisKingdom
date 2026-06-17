// Shared types mirroring the Supabase schema (see supabase/schema.sql).
export type UserRole = "member" | "trainer" | "admin";
export type TrainingMode = "online" | "in_person" | "both";
export type PrayerCategory =
  | "Healing" | "Guidance" | "Gratitude" | "Family" | "Provision" | "Other";
export type InteractionType = "praying" | "amen" | "comment";
export type BookingStatus =
  | "requested" | "confirmed" | "completed" | "cancelled";

export interface Profile {
  id: string;
  display_name: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  role: UserRole;
  is_trainer: boolean;
  location_city: string | null;
  location_state: string | null;
  location_country: string | null;
  training_preference: TrainingMode | null;
  created_at: string;
  updated_at: string;
}

export interface TrainerProfile {
  id: string;
  profile_id: string;
  specialties: string[];
  certifications: string | null;
  years_experience: number | null;
  modes: TrainingMode;
  long_bio: string | null;
  accepting_clients: boolean;
}

export interface PrayerRequest {
  id: string;
  author_id: string;
  title: string;
  body: string;
  category: PrayerCategory;
  is_anonymous: boolean;
  is_answered: boolean;
  created_at: string;
}

export interface PrayerInteraction {
  id: string;
  prayer_request_id: string;
  user_id: string;
  type: InteractionType;
  comment_body: string | null;
  created_at: string;
}

export interface Scripture {
  id: string;
  reference: string;
  text: string;
  translation: string;
  feature_date: string; // YYYY-MM-DD
}

export interface TrainerAvailability {
  id: string;
  trainer_id: string;
  starts_at: string;
  ends_at: string;
  mode: "online" | "in_person";
  is_booked: boolean;
}

export interface Booking {
  id: string;
  trainer_id: string;
  client_id: string;
  availability_id: string | null;
  status: BookingStatus;
  mode: "online" | "in_person";
  notes: string | null;
  scheduled_at: string | null;
  created_at: string;
}
