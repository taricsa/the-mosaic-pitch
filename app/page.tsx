"use client";

import FandomQuiz from "@/components/FandomQuiz";
import HeritageCardGenerator from "@/components/HeritageCardGenerator";
import MatchCalendar from "@/components/MatchCalendar";
import NeighborhoodCounter from "@/components/NeighborhoodCounter";
import RosterMosaic from "@/components/RosterMosaic";
import SiteFooter from "@/components/SiteFooter";
import WomensWorldCupCountdown from "@/components/WomensWorldCupCountdown";
import YouthClubFinder from "@/components/YouthClubFinder";
import { useLanguage } from "@/context/LanguageContext";
import { getDictionary } from "@/lib/dictionaries";

const ACHIEVEMENT_KEYS = ["tokyo2021", "worldCup2026"] as const;

const ACHIEVEMENT_EMBLEMS: Record<(typeof ACHIEVEMENT_KEYS)[number], string> = {
  tokyo2021: "🥇",
  worldCup2026: "🏟️",
};

const STAT_KEYS = ["firstWorldCup", "nations", "oneCountry"] as const;

export default function Home() {
  const { currentLanguage } = useLanguage();
  const t = getDictionary(currentLanguage).homePage;

  return (
    <div className="flex min-h-full flex-col bg-zinc-950 text-zinc-50">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(197,32,44,0.3), transparent), radial-gradient(ellipse 60% 50% at 90% 60%, rgba(201,162,39,0.12), transparent)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pb-16 pt-20 text-center sm:px-10 sm:pb-20 sm:pt-28 lg:px-16 lg:pt-32">
          <p className="animate-fade-in mb-5 inline-flex items-center gap-2 rounded-full border border-[#C9A227]/50 bg-[#C9A227]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#C9A227]">
            <span aria-hidden>🍁</span>
            {t.badge}
          </p>

          <h1 className="animate-fade-in max-w-4xl text-balance bg-gradient-to-b from-zinc-50 via-zinc-50 to-[#C9A227]/90 bg-clip-text text-4xl font-black leading-[1.1] tracking-tight text-transparent sm:text-5xl lg:text-7xl">
            {t.headline}
          </h1>

          <p
            className="animate-fade-in mt-6 max-w-2xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg lg:text-xl"
            style={{ animationDelay: "120ms" }}
          >
            {t.subtitle}
          </p>

          <div
            className="animate-fade-in mt-10 flex flex-wrap items-center justify-center gap-4"
            style={{ animationDelay: "200ms" }}
          >
            <a
              href="#roster-mosaic"
              className="inline-flex items-center justify-center rounded-full border border-[#C9A227]/60 bg-[#C9A227]/15 px-7 py-3 text-sm font-bold text-[#C9A227] transition-all hover:-translate-y-0.5 hover:bg-[#C9A227]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
            >
              {t.ctaMeetMosaic}
            </a>
            <a
              href="#fandom-quiz"
              className="inline-flex items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 px-7 py-3 text-sm font-bold text-zinc-200 transition-all hover:-translate-y-0.5 hover:border-zinc-500 hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
            >
              {t.ctaFindClub}
            </a>
            <a
              href="#heritage-card-generator"
              className="inline-flex items-center justify-center rounded-full border border-[#C5202C]/60 bg-[#C5202C]/15 px-7 py-3 text-sm font-bold text-[#C5202C] transition-all hover:-translate-y-0.5 hover:bg-[#C5202C]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5202C]"
            >
              {t.ctaShareTile}
            </a>
          </div>
        </div>
      </header>

      {/* Achievements */}
      <section
        aria-labelledby="achievements-heading"
        className="relative border-y border-zinc-800/80 bg-zinc-900/40 px-6 py-16 sm:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C5202C]">
              {t.achievementsBadge}
            </p>
            <h2
              id="achievements-heading"
              className="mt-3 text-balance text-3xl font-black tracking-tight text-zinc-50 sm:text-4xl"
            >
              {t.achievementsTitle}
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {ACHIEVEMENT_KEYS.map((key, index) => {
              const achievement = t.achievements[key];
              return (
                <article
                  key={key}
                  style={{ animationDelay: `${index * 120}ms` }}
                  className="animate-fade-in rounded-3xl border border-[#C9A227]/30 bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 opacity-0 shadow-xl shadow-black/30 transition-colors hover:border-[#C9A227]/60 sm:p-10"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#C9A227]/50 bg-[#C9A227]/10 text-3xl"
                      aria-hidden
                    >
                      {ACHIEVEMENT_EMBLEMS[key]}
                    </span>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
                      {achievement.title}
                    </p>
                  </div>
                  <h3 className="mt-6 text-2xl font-black tracking-tight text-zinc-50">
                    {achievement.headline}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                    {achievement.detail}
                  </p>
                </article>
              );
            })}
          </div>

          <dl className="mx-auto mt-12 grid w-full max-w-3xl grid-cols-3 gap-4 sm:gap-8">
            {STAT_KEYS.map((key) => {
              const stat = t.stats[key];
              return (
                <div
                  key={key}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-3 py-4 text-center sm:px-5 sm:py-5"
                >
                  <dt className="text-lg font-black tracking-tight text-[#C9A227] sm:text-2xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-zinc-500 sm:text-sm">
                    {stat.label}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>

        <div className="relative mt-12">
          <NeighborhoodCounter />
        </div>
      </section>

      <WomensWorldCupCountdown />

      {/* Main experience */}
      <main className="flex flex-col">
        <div id="roster-mosaic">
          <RosterMosaic />
        </div>
        <FandomQuiz />
        <YouthClubFinder />
        <HeritageCardGenerator />
        <MatchCalendar />
      </main>

      <SiteFooter />
    </div>
  );
}
