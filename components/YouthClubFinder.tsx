"use client";

import { useId, useState } from "react";

type ProvinceCode =
  | "BC"
  | "AB"
  | "SK"
  | "MB"
  | "ON"
  | "QC"
  | "NB"
  | "NS"
  | "PE"
  | "NL"
  | "YT"
  | "NT"
  | "NU";

type ProvinceInfo = {
  code: ProvinceCode;
  name: string;
  board: string;
  directoryUrl: string;
  directoryLabel: string;
};

const PROVINCES: ProvinceInfo[] = [
  {
    code: "BC",
    name: "British Columbia",
    board: "BC Soccer",
    directoryUrl: "https://bcsoccer.net/content/membership-directory",
    directoryLabel: "Browse BC Soccer membership directory",
  },
  {
    code: "AB",
    name: "Alberta",
    board: "Alberta Soccer",
    directoryUrl: "https://albertasoccer.com/districts/",
    directoryLabel: "Find clubs through Alberta Soccer districts",
  },
  {
    code: "SK",
    name: "Saskatchewan",
    board: "Saskatchewan Soccer",
    directoryUrl: "https://www.sasksoccer.com/content/our-members",
    directoryLabel: "View Saskatchewan member clubs",
  },
  {
    code: "MB",
    name: "Manitoba",
    board: "Manitoba Soccer",
    directoryUrl: "https://manitobasoccer.ca/content/clubs-amp-associations",
    directoryLabel: "Browse Manitoba clubs & associations",
  },
  {
    code: "ON",
    name: "Ontario",
    board: "Ontario Soccer",
    directoryUrl: "https://www.ontariosoccer.net/want-to-play",
    directoryLabel: "Open Ontario Soccer registration hub",
  },
  {
    code: "QC",
    name: "Quebec",
    board: "Soccer Québec",
    directoryUrl: "https://soccerquebec.org/",
    directoryLabel: "Search clubs with Soccer Québec",
  },
  {
    code: "NB",
    name: "New Brunswick",
    board: "Soccer New Brunswick",
    directoryUrl: "https://soccernb.org/members/",
    directoryLabel: "View Soccer NB member clubs",
  },
  {
    code: "NS",
    name: "Nova Scotia",
    board: "Soccer Nova Scotia",
    directoryUrl: "https://soccerns.ca/find-your-club/",
    directoryLabel: "Find your local Nova Scotia club",
  },
  {
    code: "PE",
    name: "Prince Edward Island",
    board: "PEI Soccer",
    directoryUrl: "https://www.peisoccer.com/",
    directoryLabel: "Visit PEI Soccer Association",
  },
  {
    code: "NL",
    name: "Newfoundland & Labrador",
    board: "NLSA",
    directoryUrl: "https://nlsa.ca/",
    directoryLabel: "Connect with Newfoundland & Labrador Soccer",
  },
  {
    code: "YT",
    name: "Yukon",
    board: "Yukon Soccer Association",
    directoryUrl: "https://yukonsoccer.yk.ca/play/",
    directoryLabel: "Explore Yukon Soccer programs",
  },
  {
    code: "NT",
    name: "Northwest Territories",
    board: "NWT Soccer",
    directoryUrl: "https://www.nwtsoccer.ca/",
    directoryLabel: "Visit Northwest Territories Soccer",
  },
  {
    code: "NU",
    name: "Nunavut",
    board: "Nunavut Soccer Association",
    directoryUrl: "https://www.nusportfederation.ca/copy-of-badminton-3",
    directoryLabel: "Contact Nunavut Soccer via Sport Federation",
  },
];

const GRANT_PROGRAMS = [
  {
    name: "KidSport Canada",
    tagline: "So every kid can play",
    description:
      "KidSport provides grants of up to $500 per year to help cover registration fees for children aged 18 and under. Chapters exist in communities across every province and territory — making it one of the most accessible entry points for newcomer and low-income families.",
    url: "https://kidsportcanada.ca/",
    cta: "Apply for KidSport funding",
  },
  {
    name: "Canadian Tire Jumpstart",
    tagline: "Removing financial barriers to sport",
    description:
      "Jumpstart helps families with registration, equipment, and transportation costs so children can join organized sport. Individual child grants and community partnerships mean support reaches kids in rural, urban, and immigrant communities alike.",
    url: "https://jumpstart.canadiantire.ca/",
    cta: "Explore Jumpstart grants",
  },
] as const;

export default function YouthClubFinder() {
  const selectId = useId();
  const [selectedCode, setSelectedCode] = useState<ProvinceCode | "">("");

  const selected =
    PROVINCES.find((province) => province.code === selectedCode) ?? null;

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
            Grassroots · Youth Soccer
          </p>
          <h2 className="text-balance text-3xl font-black tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl">
            Find a Local Club for Your Child
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">
            Every national team player started on a community pitch. Select your
            province or territory to connect with the official governing body and
            register with a club near you.
          </p>
        </header>

        <div className="mt-12 animate-fade-in rounded-3xl border border-[#C9A227]/40 bg-zinc-950/80 p-8 shadow-xl shadow-black/30 sm:p-10">
          <label
            htmlFor={selectId}
            className="block text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A227]"
          >
            Your province or territory
          </label>
          <div className="relative mt-4">
            <select
              id={selectId}
              value={selectedCode}
              onChange={(e) =>
                setSelectedCode(e.target.value as ProvinceCode | "")
              }
              className="w-full appearance-none rounded-2xl border-2 border-[#C9A227]/50 bg-zinc-900 px-5 py-4 pr-12 text-base font-medium text-zinc-50 transition-colors hover:border-[#C9A227]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <option value="" disabled className="text-zinc-500">
                Choose BC, AB, SK, MB, ON, QC, NB, NS, PE, NL, YT, NT, or NU…
              </option>
              {PROVINCES.map((province) => (
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
            <p className="mt-5 text-sm text-zinc-500">
              Select your home province or territory to see where to register
              for youth soccer programs.
            </p>
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
                    You&apos;re on the right track
                  </p>
                  <h3 className="mt-2 text-xl font-black text-zinc-50 sm:text-2xl">
                    Welcome, {selected.name} families!
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                    {selected.board} is the official governing body for
                    sanctioned youth soccer in {selected.name}. Their club
                    directory and registration resources will connect you with
                    programs in your community — from first-time U4 kickabouts to
                    competitive pathways.
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
              Financial support
            </p>
            <h3 className="mt-3 text-2xl font-black tracking-tight text-zinc-50 sm:text-3xl">
              Cost should never bench a child
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
              Registration fees and equipment can add up — especially for
              newcomer and low-income families. These national programs help
              cover the costs so every child can step onto the pitch with pride.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {GRANT_PROGRAMS.map((program) => (
              <article
                key={program.name}
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
