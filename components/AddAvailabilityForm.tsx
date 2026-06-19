"use client";

import { useActionState } from "react";
import { Loader2, Plus } from "lucide-react";
import { addAvailability } from "@/app/actions/trainer";

export default function AddAvailabilityForm() {
  const [state, formAction, pending] = useActionState(addAvailability, undefined);

  return (
    <form action={formAction} className="grid gap-3 sm:grid-cols-[1fr,1fr,auto,auto]">
      <input type="datetime-local" name="startsAt" required className="input-field" aria-label="Start time" />
      <input type="datetime-local" name="endsAt" required className="input-field" aria-label="End time" />
      <select name="mode" defaultValue="online" className="input-field" aria-label="Mode">
        <option value="online">Online</option>
        <option value="in_person">In person</option>
      </select>
      <button type="submit" disabled={pending} className="btn-gold-sm disabled:opacity-70">
        {pending ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
        Add
      </button>
      {state?.error && (
        <p className="sm:col-span-4 text-sm font-medium text-red-600">{state.error}</p>
      )}
    </form>
  );
}
