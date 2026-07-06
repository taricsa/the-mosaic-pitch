"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getDictionary, getLocaleTag } from "@/lib/dictionaries";

const START_COUNT = 382_104;

export default function NeighborhoodCounter() {
  const { currentLanguage } = useLanguage();
  const t = getDictionary(currentLanguage).neighborhoodCounter;
  const [count, setCount] = useState(START_COUNT);

  useEffect(() => {
    const tick = () => {
      setCount((prev) => prev + Math.floor(Math.random() * 12) + 1);
    };

    const interval = window.setInterval(tick, 1800 + Math.random() * 2200);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto max-w-4xl animate-fade-in px-6 sm:px-10 lg:px-16">
      <div className="overflow-hidden rounded-2xl border border-[#d4af37]/40 bg-gradient-to-r from-[#123c2c]/90 to-[#0c2b20]/90 px-6 py-5 shadow-lg shadow-black/20 backdrop-blur-sm sm:px-8">
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="max-w-md text-sm leading-relaxed text-emerald-100/80 sm:text-base">
            {t.description}
          </p>
          <p
            className="shrink-0 font-mono text-3xl font-black tabular-nums tracking-tight text-[#e9cf7a] sm:text-4xl"
            aria-live="polite"
            aria-atomic="true"
          >
            {count.toLocaleString(getLocaleTag(currentLanguage))}
          </p>
        </div>
        <div className="mt-3 flex items-center justify-center gap-2 sm:justify-end">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c5202c] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c5202c]" />
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-emerald-100/50">
            {t.liveEstimate}
          </span>
        </div>
      </div>
    </div>
  );
}
