"use client";

import { useState, useTransition } from "react";
import { HandHeart } from "lucide-react";
import { togglePraying } from "@/app/actions/prayer";

export default function PrayingButton({
  prayerId,
  initialCount,
  initialIsPraying,
}: {
  prayerId: string;
  initialCount: number;
  initialIsPraying: boolean;
}) {
  const [isPraying, setIsPraying] = useState(initialIsPraying);
  const [count, setCount] = useState(initialCount);
  const [, startTransition] = useTransition();

  function toggle() {
    setIsPraying((prev) => !prev);
    setCount((c) => (isPraying ? c - 1 : c + 1));
    startTransition(() => {
      togglePraying(prayerId);
    });
  }

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-2 rounded-full border-2 border-gold px-4 py-2 text-sm font-semibold transition-colors ${
        isPraying ? "bg-gold text-white" : "text-gold-deep hover:bg-cream"
      }`}
    >
      <HandHeart size={16} /> I&apos;m praying · {count}
    </button>
  );
}
