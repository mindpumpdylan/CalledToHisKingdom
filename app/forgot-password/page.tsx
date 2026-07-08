import Image from "next/image";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-20 text-center">
      <div
        aria-hidden
        className="relative mx-auto h-20 w-20 overflow-hidden rounded-full ring-2 ring-gold-soft"
      >
        <Image src="/Logo.png" alt="" fill sizes="80px" className="object-cover" />
      </div>
      <h1 className="mt-6 font-display text-4xl font-semibold text-ink">Reset your password</h1>
      <p className="mt-2 text-stone">
        Enter your email and we&rsquo;ll send you a link to set a new password.
      </p>
      <ForgotPasswordForm />
      <p className="mt-6 text-sm text-stone">
        Remembered it? <a href="/login" className="font-semibold text-gold-deep">Sign in</a>
      </p>
    </div>
  );
}
