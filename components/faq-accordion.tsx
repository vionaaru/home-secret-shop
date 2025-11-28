"use client";

import type { FaqItem } from "@/data/faqs";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Props = {
  items: FaqItem[];
  limit?: number;
};

export const FaqAccordion = ({ items, limit }: Props) => {
  const [open, setOpen] = useState<string | null>(items[0]?.question ?? null);
  const list = limit ? items.slice(0, limit) : items;

  return (
    <div className="space-y-3">
      {list.map((item) => (
        <details
          key={item.question}
          open={open === item.question}
          className="group rounded-2xl border border-black/5 bg-white/90 p-4 shadow-soft transition hover:border-[var(--accent)]/40"
          onClick={(event) => {
            event.preventDefault();
            setOpen((prev) => (prev === item.question ? null : item.question));
          }}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-base font-semibold text-[var(--ink)]">
            <span>{item.question}</span>
            <ChevronDown
              className="h-4 w-4 transition duration-200 group-open:-rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{item.answer}</p>
        </details>
      ))}
    </div>
  );
};
