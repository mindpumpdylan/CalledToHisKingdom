"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FaqItem = { question: string; answer: string };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-paper">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-display text-lg font-semibold text-ink">
                {item.question}
              </span>
              <ChevronDown
                aria-hidden
                size={18}
                className={`shrink-0 text-gold-deep transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>
            {open && (
              <p className="px-6 pb-5 leading-relaxed text-stone">{item.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
