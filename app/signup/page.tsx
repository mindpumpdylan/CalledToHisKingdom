import Image from "next/image";
import SignupForm from "./SignupForm";

export default async function Signup({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  const { redirectTo = "/" } = await searchParams;

  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-20 text-center">
      <div
        aria-hidden
        className="relative mx-auto h-20 w-20 overflow-hidden rounded-full ring-2 ring-gold-soft"
      >
        <Image src="/Logo.png" alt="" fill sizes="80px" className="object-cover" />
      </div>
      <h1 className="mt-6 font-display text-4xl font-semibold text-ink">Join the community</h1>
      <p className="mt-2 text-stone">Create an account to take part fully.</p>
      <SignupForm redirectTo={redirectTo} />
      <p className="mt-6 text-sm text-stone">
        Already a member? <a href="/login" className="font-semibold text-gold-deep">Sign in</a>
      </p>
    </div>
  );
}
