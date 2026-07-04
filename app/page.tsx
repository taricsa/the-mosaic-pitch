import FandomQuiz from "@/components/FandomQuiz";
import NeighborhoodCounter from "@/components/NeighborhoodCounter";
import RosterMosaic from "@/components/RosterMosaic";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-[#071912] font-sans text-white">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(197,32,44,0.35), transparent), radial-gradient(ellipse 60% 50% at 90% 60%, rgba(212,175,55,0.12), transparent), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(18,60,44,0.8), transparent)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pb-16 pt-20 text-center sm:px-10 sm:pb-20 sm:pt-28 lg:px-16 lg:pt-32">
          <p className="animate-fade-in mb-5 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/50 bg-[#d4af37]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#e9cf7a]">
            <span aria-hidden>🍁</span>
            Les Rouges · World Cup 2026
          </p>

          <h1 className="animate-fade-in max-w-4xl text-balance bg-gradient-to-b from-white via-white to-[#e9cf7a]/90 bg-clip-text text-4xl font-black leading-[1.1] tracking-tight text-transparent sm:text-5xl lg:text-7xl">
            Canada showed the world what we&apos;re made of.
          </h1>

          <p
            className="animate-fade-in mt-6 max-w-2xl text-pretty text-base leading-relaxed text-emerald-100/85 sm:text-lg lg:text-xl"
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
              className="inline-flex items-center justify-center rounded-full border border-[#d4af37]/60 bg-[#d4af37]/15 px-7 py-3 text-sm font-semibold text-[#e9cf7a] transition-all hover:-translate-y-0.5 hover:bg-[#d4af37]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9cf7a]"
            >
              Meet the mosaic
            </a>
            <a
              href="#fandom-quiz"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-emerald-50 transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9cf7a]"
            >
              Find your club
            </a>
          </div>

          <dl
            className="animate-fade-in mt-16 grid w-full max-w-3xl grid-cols-3 gap-4 sm:gap-8"
            style={{ animationDelay: "280ms" }}
          >
            {[
              { stat: "36 yrs", label: "First World Cup since '86" },
              { stat: "30+", label: "Nations represented in our squad" },
              { stat: "1 🍁", label: "Country, infinite stories" },
            ].map(({ stat, label }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-black/20 px-3 py-4 sm:px-5 sm:py-5"
              >
                <dt className="text-lg font-black text-[#e9cf7a] sm:text-2xl">
                  {stat}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-emerald-100/60 sm:text-sm">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative -mb-8 pb-4">
          <NeighborhoodCounter />
        </div>
      </header>

      {/* Main experience */}
      <main className="flex flex-col">
        <div id="roster-mosaic">
          <RosterMosaic />
        </div>
        <FandomQuiz />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#051008] px-6 py-12 text-center sm:px-10 lg:px-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e9cf7a]/70">
          The Mosaic Pitch
        </p>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-emerald-100/50">
          An inclusive community hub for every Canadian who discovered football
          during the World Cup — and decided to stay.
        </p>
        <p className="mt-6 text-xs text-emerald-100/30">
          For the love of the game. For the love of this country.
        </p>
      </footer>
    </div>
  );
}
