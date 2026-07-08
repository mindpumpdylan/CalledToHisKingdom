import Image from "next/image";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPassword() {
  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-20 text-center">
      <div
        aria-hidden
        className="relative mx-auto h-20 w-20 overflow-hidden rounded-full ring-2 ring-gold-soft"
      >
        <Image src="/Logo.png" alt="" fill sizes="80px" className="object-cover" />
      </div>
      <h1 className="mt-6 font-display text-4xl font-semibold text-ink">Set a new password</h1>
      <p className="mt-2 text-stone">Choose a new password for your account.</p>
      <ResetPasswordForm />
    </div>
  );
}
