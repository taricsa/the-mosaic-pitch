"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  CPL_SCHEDULE_URL,
  MLS_SCHEDULE_URL,
} from "@/lib/canadian-clubs";
import {
  getDictionary,
  getLocaleTag,
  type Locale,
  type MatchCalendarDictionary,
} from "@/lib/dictionaries";
import {
  CPL_PAUSE_END,
  CPL_PAUSE_START,
  isDuringWorldCup,
  isMlsPausedOn,
  MLS_PAUSE_UNTIL,
  UPCOMING_FIXTURES,
  WORLD_CUP_END,
  WORLD_CUP_START,
  type Fixture,
} from "@/lib/fixtures";

type LeagueFilter = "all" | "CPL" | "MLS";

const TODAY = "2026-07-04";

function interpolate(template: string, values: Record<string, string>): string {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replace(`{{${key}}}`, value),
    template,
  );
}

function formatFixtureDateLocalized(isoDate: string, locale: Locale): string {
  const date = new Date(`${isoDate}T12:00:00`);
  return date.toLocaleDateString(getLocaleTag(locale), {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function getFixtureNote(
  fixtureId: string,
  notes: MatchCalendarDictionary["fixtureNotes"],
): string | undefined {
  if (fixtureId in notes) {
    return notes[fixtureId as keyof typeof notes];
  }
  return undefined;
}

export default function MatchCalendar() {
  const { currentLanguage } = useLanguage();
  const t = getDictionary(currentLanguage).matchCalendar;
  const [filter, setFilter] = useState<LeagueFilter>("all");
  const inWorldCupWindow = isDuringWorldCup(TODAY);

  const fixtures = useMemo(() => {
    const sorted = [...UPCOMING_FIXTURES]
      .filter((f) => f.date >= TODAY)
      .sort((a, b) => a.date.localeCompare(b.date));

    if (filter === "all") return sorted;
    return sorted.filter((f) => f.league === filter);
  }, [filter]);

  const grouped = useMemo(() => {
    const map = new Map<string, Fixture[]>();
    for (const fixture of fixtures) {
      const key = fixture.date;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(fixture);
    }
    return Array.from(map.entries());
  }, [fixtures]);

  return (
    <section
      id="match-calendar"
      aria-labelledby="match-calendar-heading"
      className="border-t border-zinc-800 bg-zinc-950 px-6 py-20 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-4xl">
        <header className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C5202C]">
            {t.badge}
          </p>
          <h2
            id="match-calendar-heading"
            className="mt-3 text-3xl font-black tracking-tight text-zinc-50 sm:text-4xl"
          >
            {t.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            {t.subtitle}
          </p>
        </header>

        {inWorldCupWindow && (
          <div
            className="mt-8 rounded-2xl border border-[#C9A227]/30 bg-zinc-900/80 p-6 text-left"
            role="status"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
              {interpolate(t.worldCupBannerTitle, {
                start: WORLD_CUP_START,
                end: WORLD_CUP_END,
              })}
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
              <li>
                <span className="font-bold text-[#C9A227]">MLS</span> —{" "}
                {interpolate(t.worldCupMlsBody, {
                  date: formatFixtureDateLocalized(
                    MLS_PAUSE_UNTIL,
                    currentLanguage,
                  ),
                })}
              </li>
              <li>
                <span className="font-bold text-[#C5202C]">CPL</span> —{" "}
                {interpolate(t.worldCupCplBody, {
                  pauseStart: formatFixtureDateLocalized(
                    CPL_PAUSE_START,
                    currentLanguage,
                  ),
                  pauseEnd: formatFixtureDateLocalized(
                    CPL_PAUSE_END,
                    currentLanguage,
                  ),
                })}
              </li>
            </ul>
          </div>
        )}

        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
          role="tablist"
          aria-label={t.filterAriaLabel}
        >
          {(["all", "CPL", "MLS"] as const).map((league) => (
            <button
              key={league}
              type="button"
              role="tab"
              aria-selected={filter === league}
              onClick={() => setFilter(league)}
              className={`rounded-full px-5 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] ${
                filter === league
                  ? "bg-[#C5202C] text-white"
                  : "border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
              }`}
            >
              {league === "all" ? t.filterAll : league}
            </button>
          ))}
        </div>

        {filter !== "all" && isMlsPausedOn(TODAY) && filter === "MLS" && (
          <p className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-5 py-4 text-center text-sm text-zinc-400">
            {interpolate(t.mlsPausedUntil, {
              date: formatFixtureDateLocalized(MLS_PAUSE_UNTIL, currentLanguage),
            })}
          </p>
        )}

        <div className="mt-10 space-y-8">
          {grouped.length === 0 ? (
            <p className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-5 py-8 text-center text-sm text-zinc-400">
              {t.emptyState}
            </p>
          ) : (
            grouped.map(([date, dayFixtures]) => (
              <div key={date}>
                <h3 className="mb-4 flex flex-wrap items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#C9A227]">
                  {formatFixtureDateLocalized(date, currentLanguage)}
                  {date === TODAY && (
                    <span className="rounded-full bg-[#C5202C]/20 px-2 py-0.5 text-[10px] normal-case tracking-normal text-[#C5202C]">
                      {t.todayBadge}
                    </span>
                  )}
                  {isMlsPausedOn(date) && (
                    <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-medium normal-case tracking-normal text-zinc-500">
                      {t.mlsOnBreak}
                    </span>
                  )}
                </h3>
                <ul className="space-y-3">
                  {dayFixtures.map((fixture) => {
                    const note = getFixtureNote(fixture.id, t.fixtureNotes);
                    return (
                      <li
                        key={fixture.id}
                        className="flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-3">
                            <span
                              className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                fixture.league === "CPL"
                                  ? "bg-[#C5202C]/20 text-[#C5202C]"
                                  : "bg-[#C9A227]/20 text-[#C9A227]"
                              }`}
                            >
                              {fixture.league}
                            </span>
                            <p className="font-bold text-zinc-100">
                              {fixture.home}{" "}
                              <span className="font-normal text-zinc-500">
                                {t.versus}
                              </span>{" "}
                              {fixture.away}
                            </p>
                          </div>
                          {note && (
                            <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                              {note}
                            </p>
                          )}
                        </div>
                        <div className="flex shrink-0 flex-col gap-0.5 text-sm text-zinc-500 sm:text-right">
                          <span className="font-mono font-semibold text-zinc-300">
                            {fixture.time}
                          </span>
                          <span className="text-xs">{fixture.venue}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={CPL_SCHEDULE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[#C5202C]/60 px-6 py-2.5 text-sm font-bold text-[#C5202C] transition-colors hover:bg-[#C5202C]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5202C]"
          >
            {t.cplScheduleLink}
          </a>
          <a
            href={MLS_SCHEDULE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[#C9A227]/60 px-6 py-2.5 text-sm font-bold text-[#C9A227] transition-colors hover:bg-[#C9A227]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
          >
            {t.mlsScheduleLink}
          </a>
        </div>
      </div>
    </section>
  );
}
