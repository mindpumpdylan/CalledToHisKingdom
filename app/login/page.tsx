import Image from "next/image";
import LoginForm from "./LoginForm";

export default async function Login({
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
      <h1 className="mt-6 font-display text-4xl font-semibold text-ink">Welcome back</h1>
      <p className="mt-2 text-stone">Sign in to pray, post, and book sessions.</p>
      <LoginForm redirectTo={redirectTo} />
      <p className="mt-6 text-sm text-stone">
        New here? <a href="/signup" className="font-semibold text-gold-deep">Create an account</a>
      </p>
    </div>
  );
}
