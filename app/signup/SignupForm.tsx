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
      <label className="flex items-start gap-2 text-sm text-stone">
        <input
          type="checkbox"
          name="agreeToTerms"
          required
          className="mt-1 h-4 w-4 rounded border-line text-gold focus:ring-gold-soft"
        />
        <span>
          I agree to the{" "}
          <a href="/terms" target="_blank" className="font-semibold text-gold-deep">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" target="_blank" className="font-semibold text-gold-deep">
            Privacy Policy
          </a>
          .
        </span>
      </label>
      {state?.error && (
        <p className="text-sm font-medium text-red-600">{state.error}</p>
      )}
      <button type="submit" disabled={pending} className="btn-gold w-full disabled:opacity-70">
        {pending ? <Loader2 className="animate-spin" size={20} /> : "Create account"}
      </button>
    </form>
  );
}
