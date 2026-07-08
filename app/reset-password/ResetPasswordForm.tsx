"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { updatePassword } from "@/app/actions/auth";

export default function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState(updatePassword, undefined);

  return (
    <form action={formAction} className="mt-8 space-y-4 text-left">
      <input
        type="password"
        name="password"
        placeholder="New password"
        required
        minLength={6}
        className="input-field"
      />
      {state?.error && (
        <p className="text-sm font-medium text-red-600">{state.error}</p>
      )}
      <button type="submit" disabled={pending} className="btn-gold w-full disabled:opacity-70">
        {pending ? <Loader2 className="animate-spin" size={20} /> : "Set new password"}
      </button>
    </form>
  );
}
