"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { signup } from "@/app/actions/auth";

export default function SignupForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction, pending] = useActionState(signup, undefined);

  return (
    <form action={formAction} className="mt-8 space-y-4 text-left">
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <input
        type="text"
        name="displayName"
        placeholder="Display name"
        required
        className="input-field"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="input-field"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        minLength={6}
        className="input-field"
      />
      {state?.error && (
        <p className="text-sm font-medium text-red-600">{state.error}</p>
      )}
      <button type="submit" disabled={pending} className="btn-gold w-full disabled:opacity-70">
        {pending ? <Loader2 className="animate-spin" size={20} /> : "Create account"}
      </button>
    </form>
  );
}
