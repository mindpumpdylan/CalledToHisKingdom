"use client";

import { useActionState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { requestBooking } from "@/app/actions/trainer";

export default function BookSlotForm({
  trainerId,
  availabilityId,
  mode,
  scheduledAt,
}: {
  trainerId: string;
  availabilityId: string;
  mode: string;
  scheduledAt: string;
}) {
  const [state, formAction, pending] = useActionState(requestBooking, undefined);

  if (state && "success" in state) {
    return (
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold-deep">
        <CheckCircle2 size={16} /> Requested
      </span>
    );
  }

  return (
    <form action={formAction} className="flex items-center gap-3">
      <input type="hidden" name="trainerId" value={trainerId} />
      <input type="hidden" name="availabilityId" value={availabilityId} />
      <input type="hidden" name="mode" value={mode} />
      <input type="hidden" name="scheduledAt" value={scheduledAt} />
      {state?.error && <span className="text-sm font-medium text-red-600">{state.error}</span>}
      <button type="submit" disabled={pending} className="btn-gold-sm disabled:opacity-70">
        {pending ? (
          <Loader2 className="animate-spin" size={16} />
        ) : (
          <>
            <CheckCircle2 size={16} /> Request this time
          </>
        )}
      </button>
    </form>
  );
}
