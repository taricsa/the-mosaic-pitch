"use client";

import { useId, useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  getDictionary,
  type YouthClubFinderProvinceCode,
} from "@/lib/dictionaries";

const PROVINCE_DIRECTORY_URLS: Record<YouthClubFinderProvinceCode, string> = {
  BC: "https://bcsoccer.net/content/membership-directory",
  AB: "https://albertasoccer.com/districts/",
  SK: "https://www.sasksoccer.com/content/our-members",
  MB: "https://manitobasoccer.ca/content/clubs-amp-associations",
  ON: "https://www.ontariosoccer.net/want-to-play",
  QC: "https://soccerquebec.org/",
  NB: "https://soccernb.org/members/",
  NS: "https://soccerns.ca/find-your-club/",
  PE: "https://www.peisoccer.com/",
  NL: "https://nlsa.ca/",
  YT: "https://yukonsoccer.yk.ca/play/",
  NT: "https://www.nwtsoccer.ca/",
  NU: "https://www.nusportfederation.ca/copy-of-badminton-3",
};

const GRANT_PROGRAM_URLS = {
  kidsport: "https://kidsportcanada.ca/",
  jumpstart: "https://jumpstart.canadiantire.ca/",
} as const;

const PROVINCE_CODES: YouthClubFinderProvinceCode[] = [
  "BC",
  "AB",
  "SK",
  "MB",
  "ON",
  "QC",
  "NB",
  "NS",
  "PE",
  "NL",
  "YT",
  "NT",
  "NU",
];

function interpolate(template: string, values: Record<string, string>): string {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replace(`{{${key}}}`, value),
    template,
  );
}

export default function YouthClubFinder() {
  const selectId = useId();
  const { currentLanguage } = useLanguage();
  const t = getDictionary(currentLanguage).youthClubFinder;
  const [selectedCode, setSelectedCode] = useState<
    YouthClubFinderProvinceCode | ""
  >("");

  const provinces = useMemo(
    () =>
      PROVINCE_CODES.map((code) => ({
        code,
        directoryUrl: PROVINCE_DIRECTORY_URLS[code],
        ...t.provinces[code],
      })),
    [t],
  );

  const grantPrograms = useMemo(
    () =>
      (["kidsport", "jumpstart"] as const).map((key) => ({
        key,
        url: GRANT_PROGRAM_URLS[key],
        ...t.grantPrograms[key],
      })),
    [t],
  );

  const selected =
    provinces.find((province) => province.code === selectedCode) ?? null;

  return (
    <section
      id="youth-club-finder"
      className="relative w-full overflow-hidden border-y border-zinc-800 bg-zinc-900 px-6 py-20 text-zinc-50 sm:px-10 lg:px-16"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(201,162,39,0.14), transparent 45%), radial-gradient(circle at 85% 80%, rgba(197,32,44,0.12), transparent 50%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl">
        <header className="animate-fade-in text-center">
          <p className="mb-4 inline-block rounded-full border border-[#C9A227]/50 bg-[#C9A227]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A227]">
            {t.badge}
          </p>
          <h2 className="text-balance text-3xl font-black tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">
            {t.subtitle}
          </p>
        </header>

        <div className="mt-12 animate-fade-in rounded-3xl border border-[#C9A227]/40 bg-zinc-950/80 p-8 shadow-xl shadow-black/30 sm:p-10">
          <label
            htmlFor={selectId}
            className="block text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A227]"
          >
            {t.provinceLabel}
          </label>
          <div className="relative mt-4">
            <select
              id={selectId}
              value={selectedCode}
              onChange={(e) =>
                setSelectedCode(e.target.value as YouthClubFinderProvinceCode | "")
              }
              className="w-full appearance-none rounded-2xl border-2 border-[#C9A227]/50 bg-zinc-900 px-5 py-4 pr-12 text-base font-medium text-zinc-50 transition-colors hover:border-[#C9A227]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <option value="" disabled className="text-zinc-500">
                {t.selectPlaceholder}
              </option>
              {provinces.map((province) => (
                <option key={province.code} value={province.code}>
                  {province.name} ({province.code})
                </option>
              ))}
            </select>
            <span
              className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#C9A227]"
              aria-hidden
            >
              ▾
            </span>
          </div>

          {!selected && (
            <p className="mt-5 text-sm text-zinc-500">{t.selectHint}</p>
          )}

          {selected && (
            <div
              className="mt-8 animate-panel-in rounded-2xl border border-[#C9A227]/50 bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 sm:p-8"
              role="status"
              aria-live="polite"
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C9A227]/60 bg-[#C9A227]/15 text-lg"
                  aria-hidden
                >
                  🍁
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227]">
                    {t.onTrackLabel}
                  </p>
                  <h3 className="mt-2 text-xl font-black text-zinc-50 sm:text-2xl">
                    {interpolate(t.welcomeFamilies, { name: selected.name })}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                    {interpolate(t.governingBodyDescription, {
                      board: selected.board,
                      name: selected.name,
                    })}
                  </p>
                </div>
              </div>

              <a
                href={selected.directoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#C9A227] bg-[#C9A227]/15 px-6 py-3.5 text-sm font-bold text-[#C9A227] transition-all hover:-translate-y-0.5 hover:bg-[#C9A227]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 sm:w-auto"
              >
                {selected.directoryLabel}
                <span aria-hidden>↗</span>
              </a>
            </div>
          )}
        </div>

        <aside className="mt-10 animate-fade-in rounded-3xl border border-[#C9A227]/30 bg-zinc-950/60 p-8 sm:p-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5202C]">
              {t.grantsBadge}
            </p>
            <h3 className="mt-3 text-2xl font-black tracking-tight text-zinc-50 sm:text-3xl">
              {t.grantsTitle}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
              {t.grantsSubtitle}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {grantPrograms.map((program) => (
              <article
                key={program.key}
                className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-[#C9A227]/40"
              >
                <h4 className="text-lg font-bold text-zinc-50">
                  {program.name}
                </h4>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#C9A227]">
                  {program.tagline}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400">
                  {program.description}
                </p>
                <a
                  href={program.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#C9A227] transition-colors hover:text-[#e9cf7a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
                >
                  {program.cta}
                  <span aria-hidden>↗</span>
                </a>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
