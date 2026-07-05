import FandomQuiz from "@/components/FandomQuiz";
import HeritageCardGenerator from "@/components/HeritageCardGenerator";
import NeighborhoodCounter from "@/components/NeighborhoodCounter";
import RosterMosaic from "@/components/RosterMosaic";

const ACHIEVEMENTS = [
  {
    emblem: "🥇",
    title: "Tokyo 2021 · Olympic Gold",
    headline: "Champions of the world stage.",
    detail:
      "Canada's women stood atop the Olympic podium in Tokyo — a gold-medal triumph sealed on penalties that announced this country as a true footballing power.",
  },
  {
    emblem: "🏟️",
    title: "World Cup 2026 · Home Soil",
    headline: "A historic run in front of our own.",
    detail:
      "Les Rouges carried a golden generation deep into a home-soil World Cup, turning stadiums from Vancouver to Toronto into a sea of red and igniting a nation of new believers.",
  },
] as const;

export default function Home() {
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
            Les Rouges · World Cup 2026
          </p>

          <h1 className="animate-fade-in max-w-4xl text-balance bg-gradient-to-b from-zinc-50 via-zinc-50 to-[#C9A227]/90 bg-clip-text text-4xl font-black leading-[1.1] tracking-tight text-transparent sm:text-5xl lg:text-7xl">
            Canada showed the world what we&apos;re made of.
          </h1>

          <p
            className="animate-fade-in mt-6 max-w-2xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg lg:text-xl"
            style={{ animationDelay: "120ms" }}
          >
            From coast to coast, a golden generation turned a nation of hockey
            towns into football believers. This is your hub to meet the players,
            honour their journeys, and find your club home for life.
          </p>

          <div
            className="animate-fade-in mt-10 flex flex-wrap items-center justify-center gap-4"
            style={{ animationDelay: "200ms" }}
          >
            <a
              href="#roster-mosaic"
              className="inline-flex items-center justify-center rounded-full border border-[#C9A227]/60 bg-[#C9A227]/15 px-7 py-3 text-sm font-bold text-[#C9A227] transition-all hover:-translate-y-0.5 hover:bg-[#C9A227]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
            >
              Meet the mosaic
            </a>
            <a
              href="#fandom-quiz"
              className="inline-flex items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 px-7 py-3 text-sm font-bold text-zinc-200 transition-all hover:-translate-y-0.5 hover:border-zinc-500 hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
            >
              Find your club
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
              The Golden Résumé
            </p>
            <h2
              id="achievements-heading"
              className="mt-3 text-balance text-3xl font-black tracking-tight text-zinc-50 sm:text-4xl"
            >
              Two triumphs. One footballing nation.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {ACHIEVEMENTS.map(({ emblem, title, headline, detail }, index) => (
              <article
                key={title}
                style={{ animationDelay: `${index * 120}ms` }}
                className="animate-fade-in rounded-3xl border border-[#C9A227]/30 bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 opacity-0 shadow-xl shadow-black/30 transition-colors hover:border-[#C9A227]/60 sm:p-10"
              >
                <div className="flex items-center gap-4">
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#C9A227]/50 bg-[#C9A227]/10 text-3xl"
                    aria-hidden
                  >
                    {emblem}
                  </span>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
                    {title}
                  </p>
                </div>
                <h3 className="mt-6 text-2xl font-black tracking-tight text-zinc-50">
                  {headline}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                  {detail}
                </p>
              </article>
            ))}
          </div>

          <dl className="mx-auto mt-12 grid w-full max-w-3xl grid-cols-3 gap-4 sm:gap-8">
            {[
              { stat: "36 yrs", label: "First World Cup since '86" },
              { stat: "30+", label: "Nations represented in our squad" },
              { stat: "1 🍁", label: "Country, infinite stories" },
            ].map(({ stat, label }) => (
              <div
                key={label}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-3 py-4 text-center sm:px-5 sm:py-5"
              >
                <dt className="text-lg font-black tracking-tight text-[#C9A227] sm:text-2xl">
                  {stat}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-zinc-500 sm:text-sm">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mt-12">
          <NeighborhoodCounter />
        </div>
      </section>

      {/* Main experience */}
      <main className="flex flex-col">
        <div id="roster-mosaic">
          <RosterMosaic />
        </div>
        <FandomQuiz />
        <HeritageCardGenerator />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 px-6 py-12 text-center sm:px-10 lg:px-16">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#C9A227]/80">
          The Mosaic Pitch
        </p>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-zinc-500">
          An inclusive community hub for every Canadian who discovered football
          during the World Cup — and decided to stay.
        </p>
        <p className="mt-6 text-xs text-zinc-600">
          For the love of the game. For the love of this country.
        </p>
      </footer>
    </div>
  );
}
