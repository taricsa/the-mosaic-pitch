"use client";

import { useMemo } from "react";
import { useLanguage, type Language } from "@/context/LanguageContext";
import { getDictionary } from "@/lib/dictionaries";

const ENABLED = true;

const ACTIVE_CLASSES: Record<Language, string> = {
  en: "border-[#C5202C] text-[#C5202C] focus-visible:ring-[#C5202C]",
  fr: "border-[#C9A227] text-[#C9A227] focus-visible:ring-[#C9A227]",
};

export default function LanguageSwitcher() {
  if (!ENABLED) return null;

  const { currentLanguage, toggleLanguage } = useLanguage();
  const t = getDictionary(currentLanguage).languageSwitcher;

  const options = useMemo(
    () =>
      (
        [
          { code: "en" as const, label: t.enLabel },
          { code: "fr" as const, label: t.frLabel },
        ] as const
      ).map(({ code, label }) => ({
        code,
        label,
        activeClass: ACTIVE_CLASSES[code],
      })),
    [t.enLabel, t.frLabel],
  );

  function handleSelect(target: Language) {
    if (target !== currentLanguage) toggleLanguage();
  }

  return (
    <div
      className="fixed top-4 right-4 z-50 flex items-center gap-1 rounded-full border border-zinc-800 bg-zinc-950/80 p-1 shadow-lg shadow-black/40 backdrop-blur-md"
      role="group"
      aria-label={t.ariaLabel}
    >
      {options.map(({ code, label, activeClass }) => {
        const isActive = currentLanguage === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => handleSelect(code)}
            aria-pressed={isActive}
            className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border px-3 text-xs font-bold uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 ${
              isActive
                ? activeClass
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
