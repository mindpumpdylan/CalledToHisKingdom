import SignupForm from "./SignupForm";

export default async function Signup({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  const { redirectTo = "/" } = await searchParams;

  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-24 text-center">
      <h1 className="font-display text-4xl font-semibold text-ink">Join the community</h1>
      <p className="mt-2 text-stone">Create an account to take part fully.</p>
      <SignupForm redirectTo={redirectTo} />
    </div>
  );
}
