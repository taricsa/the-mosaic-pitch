import Link from "next/link";
import {
  CANADIAN_CLUBS,
  CPL_SCHEDULE_URL,
  MLS_SCHEDULE_URL,
} from "@/lib/canadian-clubs";

export default function SiteFooter() {
  const cplClubs = CANADIAN_CLUBS.filter((c) => c.league === "CPL");
  const mlsClubs = CANADIAN_CLUBS.filter((c) => c.league === "MLS");

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#C9A227]/80">
            The Mosaic Pitch
          </p>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-zinc-500">
            An inclusive community hub for every Canadian who discovered
            football during the World Cup — and decided to stay.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5202C]">
              Canadian Premier League
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {cplClubs.map((club) => (
                <li key={club.name}>
                  <a
                    href={club.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-zinc-300 transition-colors hover:text-[#C9A227] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
                  >
                    {club.name}
                    <span className="block text-xs font-normal text-zinc-600">
                      {club.city}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={CPL_SCHEDULE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-[#C5202C] hover:underline"
            >
              CPL Official Site →
            </a>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
              MLS · Canadian Clubs
            </h3>
            <ul className="mt-4 space-y-3">
              {mlsClubs.map((club) => (
                <li key={club.name}>
                  <a
                    href={club.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-zinc-300 transition-colors hover:text-[#C9A227] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
                  >
                    {club.name}
                    <span className="block text-xs font-normal text-zinc-600">
                      {club.city}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={MLS_SCHEDULE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-[#C9A227] hover:underline"
            >
              MLS Official Site →
            </a>
          </div>
        </div>

        <nav
          aria-label="National team history archives"
          className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-8"
        >
          <Link
            href="/history/men"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-zinc-500 transition-colors hover:text-[#C5202C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5202C]"
          >
            Men&apos;s Historical Archive
          </Link>
          <Link
            href="/history/women"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-zinc-500 transition-colors hover:text-[#C9A227] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
          >
            Women&apos;s Historical Archive
          </Link>
        </nav>

        <p className="mt-8 text-center text-xs text-zinc-600">
          For the love of the game. For the love of this country.
        </p>

        <p className="mt-4 text-center text-xs font-medium text-zinc-500">
          Built with <span className="text-[#C5202C]">🍁</span> in Canada
        </p>
      </div>
    </footer>
  );
}
