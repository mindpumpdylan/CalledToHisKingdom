"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { requestPasswordReset } from "@/app/actions/auth";

export default function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(requestPasswordReset, undefined);

  if (state && "success" in state) {
    return (
      <p className="mt-8 text-stone">
        Check your email for a link to reset your password.
      </p>
    );
  }

  return (
    <form action={formAction} className="mt-8 space-y-4 text-left">
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="input-field"
      />
      {state?.error && (
        <p className="text-sm font-medium text-red-600">{state.error}</p>
      )}
      <button type="submit" disabled={pending} className="btn-gold w-full disabled:opacity-70">
        {pending ? <Loader2 className="animate-spin" size={20} /> : "Send reset link"}
      </button>
    </form>
  );
}
