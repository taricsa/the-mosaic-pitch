"use client";

import { useMemo, useState } from "react";
import {
  CPL_SCHEDULE_URL,
  MLS_SCHEDULE_URL,
} from "@/lib/canadian-clubs";
import {
  CPL_PAUSE_END,
  CPL_PAUSE_START,
  formatFixtureDate,
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

export default function MatchCalendar() {
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
            Canadian Club Football
          </p>
          <h2
            id="match-calendar-heading"
            className="mt-3 text-3xl font-black tracking-tight text-zinc-50 sm:text-4xl"
          >
            Match Calendar
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Verified upcoming fixtures for Canadian CPL and MLS clubs — adjusted
            for the 2026 World Cup schedule breaks.
          </p>
        </header>

        {inWorldCupWindow && (
          <div
            className="mt-8 rounded-2xl border border-[#C9A227]/30 bg-zinc-900/80 p-6 text-left"
            role="status"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
              🏆 World Cup in progress · {WORLD_CUP_START} – {WORLD_CUP_END}
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
              <li>
                <span className="font-bold text-[#C9A227]">MLS</span> — League
                play is paused until{" "}
                <span className="font-semibold text-zinc-50">
                  {formatFixtureDate(MLS_PAUSE_UNTIL)}
                </span>
                . Canadian clubs return July 16 (Montréal vs Toronto, Whitecaps
                at Chicago).
              </li>
              <li>
                <span className="font-bold text-[#C5202C]">CPL</span> — Paused{" "}
                {formatFixtureDate(CPL_PAUSE_START)} –{" "}
                {formatFixtureDate(CPL_PAUSE_END)}, then resumed. One confirmed
                match today: Atlético Ottawa vs Cavalry FC.
              </li>
            </ul>
          </div>
        )}

        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
          role="tablist"
          aria-label="Filter by league"
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
              {league === "all" ? "All Leagues" : league}
            </button>
          ))}
        </div>

        {filter !== "all" && isMlsPausedOn(TODAY) && filter === "MLS" && (
          <p className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-5 py-4 text-center text-sm text-zinc-400">
            No MLS matches until{" "}
            <span className="font-semibold text-zinc-200">
              {formatFixtureDate(MLS_PAUSE_UNTIL)}
            </span>{" "}
            — the league is on World Cup break.
          </p>
        )}

        <div className="mt-10 space-y-8">
          {grouped.length === 0 ? (
            <p className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-5 py-8 text-center text-sm text-zinc-400">
              No verified fixtures in this filter right now. Check the official
              league schedules below for the full calendar.
            </p>
          ) : (
            grouped.map(([date, dayFixtures]) => (
              <div key={date}>
                <h3 className="mb-4 flex flex-wrap items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#C9A227]">
                  {formatFixtureDate(date)}
                  {date === TODAY && (
                    <span className="rounded-full bg-[#C5202C]/20 px-2 py-0.5 text-[10px] normal-case tracking-normal text-[#C5202C]">
                      Today
                    </span>
                  )}
                  {isMlsPausedOn(date) && (
                    <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-medium normal-case tracking-normal text-zinc-500">
                      MLS on break
                    </span>
                  )}
                </h3>
                <ul className="space-y-3">
                  {dayFixtures.map((fixture) => (
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
                              vs
                            </span>{" "}
                            {fixture.away}
                          </p>
                        </div>
                        {fixture.note && (
                          <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                            {fixture.note}
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
                  ))}
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
            Full CPL Schedule →
          </a>
          <a
            href={MLS_SCHEDULE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[#C9A227]/60 px-6 py-2.5 text-sm font-bold text-[#C9A227] transition-colors hover:bg-[#C9A227]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
          >
            Full MLS Schedule →
          </a>
        </div>
      </div>
    </section>
  );
}
