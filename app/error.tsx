"use client";

import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-semibold text-ink">Something went wrong</h1>
      <p className="mt-3 text-stone">
        We hit a snag loading this page. Please try again in a moment.
      </p>
      <button onClick={() => unstable_retry()} className="btn-gold mt-7 self-center">
        Try again
      </button>
    </div>
  );
}
