"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export function FAQList({
  items,
  dark = false,
}: {
  items: { question: string; answer: string }[];
  dark?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span className={cn("font-medium", dark ? "text-midnight" : "text-midnight")}>
                {item.question}
              </span>
              <ChevronDown
                className={cn("h-5 w-5 shrink-0 text-brand-blue transition", isOpen && "rotate-180")}
                aria-hidden
              />
            </button>
            {isOpen ? (
              <div className="px-5 pb-4 text-sm leading-relaxed text-body">{item.answer}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
