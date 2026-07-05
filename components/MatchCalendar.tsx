"use client";

import { useMemo, useState } from "react";
import {
  CPL_SCHEDULE_URL,
  MLS_SCHEDULE_URL,
} from "@/lib/canadian-clubs";
import {
  formatFixtureDate,
  UPCOMING_FIXTURES,
  type Fixture,
} from "@/lib/fixtures";

type LeagueFilter = "all" | "CPL" | "MLS";

export default function MatchCalendar() {
  const [filter, setFilter] = useState<LeagueFilter>("all");

  const fixtures = useMemo(() => {
    const sorted = [...UPCOMING_FIXTURES].sort((a, b) =>
      a.date.localeCompare(b.date),
    );
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
            Every upcoming CPL and MLS fixture involving a Canadian club. Plan
            your matchday and keep the domestic game growing.
          </p>
        </header>

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

        <div className="mt-10 space-y-8">
          {grouped.map(([date, dayFixtures]) => (
            <div key={date}>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-[#C9A227]">
                {formatFixtureDate(date)}
              </h3>
              <ul className="space-y-3">
                {dayFixtures.map((fixture) => (
                  <li
                    key={fixture.id}
                    className="flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
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
                        <span className="font-normal text-zinc-500">vs</span>{" "}
                        {fixture.away}
                      </p>
                    </div>
                    <div className="flex flex-col gap-0.5 text-sm text-zinc-500 sm:text-right">
                      <span className="font-mono font-semibold text-zinc-300">
                        {fixture.time}
                      </span>
                      <span className="text-xs">{fixture.venue}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
