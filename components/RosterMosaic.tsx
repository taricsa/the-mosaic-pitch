"use client";

import { useCallback, useEffect, useState } from "react";

type Player = {
  id: string;
  name: string;
  number: number;
  position: string;
  bornIn: string;
  heritage: string;
  nowRepresents: string;
  tagline: string;
  story: string;
  initials: string;
};

const PLAYERS: Player[] = [
  {
    id: "alphonso-davies",
    name: "Alphonso Davies",
    number: 19,
    position: "Left Back / Winger",
    bornIn: "Buduburam, Liberia — a refugee camp",
    heritage: "Liberian",
    nowRepresents: "Edmonton, Alberta",
    tagline: "The heartbeat of our speed.",
    story:
      "Born in a refugee camp in Ghana to parents who fled the Liberian civil war, Alphonso arrived in Edmonton as a child. From the fields of Alberta to the biggest stages in world football, his blistering pace and joyful spirit became the pulse of a nation learning to believe. His journey is the clearest proof that Canada's future is written by those the world once overlooked.",
    initials: "AD",
  },
  {
    id: "jonathan-david",
    name: "Jonathan David",
    number: 20,
    position: "Striker",
    bornIn: "Brooklyn, New York",
    heritage: "Haitian",
    nowRepresents: "Ottawa, Ontario",
    tagline: "The clinical finisher of the capital.",
    story:
      "Born in Brooklyn to Haitian parents and raised in Ottawa, Jonathan carries the resilience of the Haitian diaspora in every composed finish. Cool, humble, and ruthless in front of goal, he turned a capital-city upbringing into a European scoring reputation — and gave Canada a number nine the whole world respects.",
    initials: "JD",
  },
  {
    id: "ismael-kone",
    name: "Ismaël Koné",
    number: 8,
    position: "Central Midfielder",
    bornIn: "Abidjan, Ivory Coast",
    heritage: "Ivorian",
    nowRepresents: "Montréal, Québec",
    tagline: "The midfield elegance of Quebec.",
    story:
      "Born in Abidjan and raised in Montréal, Ismaël learned the game on Québec's concrete and cold before gliding through professional midfields with unmistakable grace. His path — Ivorian roots, Montréal grit, francophone flair — embodies the bilingual, multicultural heart of the Canadian project.",
    initials: "IK",
  },
  {
    id: "cyle-larin",
    name: "Cyle Larin",
    number: 17,
    position: "Striker",
    bornIn: "Brampton, Ontario",
    heritage: "Jamaican",
    nowRepresents: "Brampton, Ontario",
    tagline: "The true north's leading talisman.",
    story:
      "Brampton-born with proud Jamaican heritage, Cyle rose through Ontario's youth ranks to become one of the most prolific scorers in Canadian history. He represents the second-generation dream: a child of the Caribbean diaspora who never left home to make the True North proud, standing tall as a record-setting talisman.",
    initials: "CL",
  },
];

export default function RosterMosaic() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activePlayer = PLAYERS.find((p) => p.id === activeId) ?? null;

  const close = useCallback(() => setActiveId(null), []);

  useEffect(() => {
    if (!activePlayer) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [activePlayer, close]);

  return (
    <section className="relative w-full overflow-hidden bg-[#0b2a1f] px-6 py-20 text-white sm:px-10 lg:px-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(212,175,55,0.18), transparent 45%), radial-gradient(circle at 85% 75%, rgba(197,32,44,0.22), transparent 50%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <header className="mx-auto max-w-3xl animate-fade-in text-center">
          <p className="mb-4 inline-block rounded-full border border-[#d4af37]/50 bg-[#d4af37]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#e9cf7a]">
            Canada · Les Rouges
          </p>
          <h2 className="text-balance bg-gradient-to-b from-white to-[#e9cf7a] bg-clip-text text-4xl font-black leading-tight tracking-tight text-transparent sm:text-5xl lg:text-6xl">
            30 Journeys. Multiple Heritages. One Maple Leaf.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-emerald-100/80 sm:text-lg">
            A tribute to the immigrant roots and diverse origins that forged
            Canada&apos;s golden generation. Every tile is a homecoming.
          </p>
        </header>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PLAYERS.map((player, index) => (
            <button
              key={player.id}
              type="button"
              onClick={() => setActiveId(player.id)}
              style={{ animationDelay: `${index * 90}ms` }}
              className="group relative flex animate-fade-in flex-col overflow-hidden rounded-2xl border border-[#d4af37]/40 bg-gradient-to-b from-[#123c2c] to-[#0c2b20] p-6 text-left opacity-0 shadow-lg shadow-black/30 outline-none transition-all duration-300 hover:-translate-y-1.5 hover:border-[#d4af37] hover:shadow-2xl hover:shadow-[#d4af37]/20 focus-visible:ring-2 focus-visible:ring-[#e9cf7a]"
              aria-label={`Read the story of ${player.name}`}
            >
              <span className="pointer-events-none absolute -right-8 -top-8 text-[7rem] font-black leading-none text-white/5 transition-colors duration-300 group-hover:text-[#c5202c]/20">
                {player.number}
              </span>

              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-[#d4af37]/60 bg-[#0b2a1f] text-xl font-bold text-[#e9cf7a] shadow-inner">
                {player.initials}
              </div>

              <h3 className="relative mt-5 text-lg font-bold text-white">
                {player.name}
              </h3>
              <p className="relative mt-1 text-xs font-medium uppercase tracking-wide text-[#e9cf7a]/80">
                #{player.number} · {player.position}
              </p>

              <div className="relative mt-4 flex items-center gap-2 text-sm text-emerald-100/70">
                <span>{player.heritage}</span>
                <span className="text-[#c5202c]">➡️</span>
                <span>{player.nowRepresents}</span>
              </div>

              <p className="relative mt-4 border-t border-white/10 pt-4 text-sm italic leading-relaxed text-emerald-50/90">
                &ldquo;{player.tagline}&rdquo;
              </p>

              <span className="relative mt-5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-[#e9cf7a] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Read the journey
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {activePlayer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="roster-modal-title"
        >
          <div
            className="absolute inset-0 animate-backdrop-in bg-black/70 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />

          <div className="relative w-full max-w-lg animate-panel-in overflow-hidden rounded-3xl border border-[#d4af37]/60 bg-gradient-to-b from-[#123c2c] to-[#081d15] shadow-2xl shadow-black/60">
            <div className="h-1.5 w-full bg-gradient-to-r from-[#c5202c] via-[#d4af37] to-[#c5202c]" />

            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white/80 transition-colors hover:border-[#d4af37] hover:text-[#e9cf7a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9cf7a]"
              aria-label="Close"
            >
              <span aria-hidden className="text-lg leading-none">×</span>
            </button>

            <div className="p-8 sm:p-10">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/70 bg-[#0b2a1f] text-2xl font-black text-[#e9cf7a] shadow-inner">
                  {activePlayer.initials}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e9cf7a]/80">
                    #{activePlayer.number} · {activePlayer.position}
                  </p>
                  <h3
                    id="roster-modal-title"
                    className="mt-1 text-2xl font-black text-white sm:text-3xl"
                  >
                    {activePlayer.name}
                  </h3>
                </div>
              </div>

              <dl className="mt-6 grid grid-cols-1 gap-3 rounded-2xl border border-white/10 bg-black/20 p-5 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-[#e9cf7a]/70">
                    Born
                  </dt>
                  <dd className="mt-1 text-emerald-50">{activePlayer.bornIn}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-[#e9cf7a]/70">
                    Heritage
                  </dt>
                  <dd className="mt-1 text-emerald-50">{activePlayer.heritage}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-[#e9cf7a]/70">
                    Represents
                  </dt>
                  <dd className="mt-1 flex items-center gap-2 text-emerald-50">
                    {activePlayer.nowRepresents}
                    <span className="text-[#c5202c]">🍁</span>
                  </dd>
                </div>
              </dl>

              <p className="mt-6 text-base font-semibold italic text-[#e9cf7a]">
                &ldquo;{activePlayer.tagline}&rdquo;
              </p>

              <p className="mt-4 text-[15px] leading-relaxed text-emerald-50/90">
                {activePlayer.story}
              </p>

              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                <span className="text-xs uppercase tracking-[0.25em] text-emerald-100/50">
                  One Maple Leaf
                </span>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full border border-[#d4af37]/60 bg-[#d4af37]/10 px-5 py-2 text-sm font-semibold text-[#e9cf7a] transition-colors hover:bg-[#d4af37]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9cf7a]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
