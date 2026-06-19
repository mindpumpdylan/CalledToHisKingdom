"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { createPrayer } from "@/app/actions/prayer";
import type { PrayerCategory } from "@/lib/types";

const categories: PrayerCategory[] = [
  "Healing",
  "Guidance",
  "Gratitude",
  "Family",
  "Provision",
  "Other",
];

export default function NewPrayerForm() {
  const [state, formAction, pending] = useActionState(createPrayer, undefined);

  return (
    <form action={formAction} className="mt-8 space-y-4">
      <input type="text" name="title" placeholder="Title" required className="input-field" />
      <textarea
        name="body"
        placeholder="What would you like prayer for?"
        rows={6}
        required
        className="input-field"
      />
      <select name="category" defaultValue="Other" className="input-field">
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <label className="flex items-center gap-2 text-sm text-stone">
        <input type="checkbox" name="isAnonymous" /> Post anonymously
      </label>
      {state?.error && <p className="text-sm font-medium text-red-600">{state.error}</p>}
      <button type="submit" disabled={pending} className="btn-gold w-full disabled:opacity-70">
        {pending ? <Loader2 className="animate-spin" size={20} /> : "Share with the community"}
      </button>
    </form>
  );
}
