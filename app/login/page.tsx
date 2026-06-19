import LoginForm from "./LoginForm";

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  const { redirectTo = "/" } = await searchParams;

  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-24 text-center">
      <h1 className="font-display text-4xl font-semibold text-ink">Welcome back</h1>
      <p className="mt-2 text-stone">Sign in to pray, post, and book sessions.</p>
      <LoginForm redirectTo={redirectTo} />
      <p className="mt-6 text-sm text-stone">
        New here? <a href="/signup" className="font-semibold text-gold-deep">Create an account</a>
      </p>
    </div>
  );
}
