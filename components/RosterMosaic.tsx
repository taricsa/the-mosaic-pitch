"use client";

import { useCallback, useEffect, useState } from "react";

type Squad = "men" | "women";

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
  quote: string;
  initials: string;
};

const MENS_SQUAD: Player[] = [
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
      "Born in a refugee camp in Ghana to parents who fled the Liberian civil war, Alphonso arrived in Edmonton as a child. From the fields of Alberta to the biggest stages in world football, his blistering pace and joyful spirit became the pulse of a nation learning to believe.",
    quote:
      "Every sprint down the flank is proof that the Canadian mosaic runs faster than anyone expected.",
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
      "Born in Brooklyn to Haitian parents and raised in Ottawa, Jonathan carries the resilience of the Haitian diaspora in every composed finish. Cool, humble, and ruthless in front of goal, he turned a capital-city upbringing into a European scoring reputation.",
    quote:
      "When I score for Canada, I carry Brooklyn, Port-au-Prince, and Ottawa in every celebration.",
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
      "Born in Abidjan and raised in Montréal, Ismaël learned the game on Québec's concrete and cold before gliding through professional midfields with unmistakable grace. His path embodies the bilingual, multicultural heart of the Canadian project.",
    quote:
      "Montréal taught me flair; Canada gave me a stage to share it with the world.",
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
      "Brampton-born with proud Jamaican heritage, Cyle rose through Ontario's youth ranks to become one of the most prolific scorers in Canadian history. He represents the second-generation dream of staying home and making the True North proud.",
    quote:
      "I never had to leave Canada to prove Canada belongs on the world stage.",
    initials: "CL",
  },
];

const WOMENS_SQUAD: Player[] = [
  {
    id: "christine-sinclair",
    name: "Christine Sinclair",
    number: 12,
    position: "Forward",
    bornIn: "Burnaby, British Columbia",
    heritage: "Canadian",
    nowRepresents: "Burnaby, British Columbia",
    tagline:
      "The GOAT. 190 International Goals. The ultimate blueprint of Canadian sports history.",
    story:
      "From Burnaby pitches to Olympic gold and a record that rewrote world football history, Christine Sinclair didn't just play for Canada — she built the standard every generation after her chases. Her longevity, humility, and ruthlessness in front of goal made her the most important athlete this country has ever produced.",
    quote:
      "I wore the maple leaf for decades so every girl in Canada would know her dreams have no ceiling.",
    initials: "CS",
  },
  {
    id: "kadeisha-buchanan",
    name: "Kadeisha Buchanan",
    number: 3,
    position: "Centre Back",
    bornIn: "Brampton, Ontario",
    heritage: "Jamaican",
    nowRepresents: "Brampton, Ontario",
    tagline: "The defensive wall. Multi-time UEFA Champions League winner.",
    story:
      "Raised in Brampton with Jamaican roots, Kadeisha Buchanan became the backbone of Canada's golden era and a serial winner at the highest club level in Europe. Calm under pressure and ferocious in the tackle, she turned Canadian defending into a global export.",
    quote:
      "My heritage gave me fire; Canada gave me the platform to become a champion on every continent.",
    initials: "KB",
  },
  {
    id: "ashley-lawrence",
    name: "Ashley Lawrence",
    number: 10,
    position: "Full Back / Midfielder",
    bornIn: "Toronto, Ontario",
    heritage: "Jamaican",
    nowRepresents: "Toronto, Ontario",
    tagline: "World-class versatility. The engine of the Canadian flanks.",
    story:
      "Toronto-born with Jamaican heritage, Ashley Lawrence redefined what a modern Canadian player could be — elite in defence, devastating in attack, and tireless for ninety minutes. Her Olympic gold medal run showcased a player who could dominate any position on the pitch.",
    quote:
      "Versatility is my heritage story — many roots, one jersey, infinite possibility.",
    initials: "AL",
  },
  {
    id: "vanessa-gilles",
    name: "Vanessa Gilles",
    number: 14,
    position: "Centre Back",
    bornIn: "Montréal, Québec",
    heritage: "French",
    nowRepresents: "Montréal, Québec",
    tagline: "The aerial fortress. Unmatched heart in the penalty box.",
    story:
      "Born in Montréal with French heritage, Vanessa Gilles brought uncompromising aerial dominance and emotional leadership to Canada's back line. Her rise from domestic leagues to Olympic glory embodies the depth of talent across every province and every community.",
    quote:
      "Montréal raised me with pride; the maple leaf taught me to stand tall for everyone behind me.",
    initials: "VG",
  },
];

const SQUADS: Record<Squad, { label: string; players: Player[]; subtitle: string }> = {
  men: {
    label: "🍁 Men's National Squad",
    players: MENS_SQUAD,
    subtitle: "Les Rouges — the golden generation that changed everything.",
  },
  women: {
    label: "🌟 Women's Championship Squad",
    players: WOMENS_SQUAD,
    subtitle: "Olympic champions. World beaters. The standard-bearers of Canadian sport.",
  },
};

function JourneyMap({ player }: { player: Player }) {
  return (
    <div className="mt-6 rounded-2xl border border-[#C9A227]/30 bg-[#141414] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227]/80">
        Journey Map
      </p>
      <div className="mt-4 flex flex-col gap-0 sm:flex-row sm:items-stretch">
        <div className="flex-1 rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
            Roots
          </p>
          <p className="mt-2 text-sm font-medium text-white">{player.bornIn}</p>
          <p className="mt-1 text-xs text-white/50">{player.heritage} heritage</p>
        </div>

        <div className="flex items-center justify-center py-3 sm:flex-col sm:px-4 sm:py-0">
          <div className="hidden h-px w-full bg-gradient-to-r from-transparent via-[#C5202C] to-transparent sm:block" />
          <div className="flex flex-col items-center gap-1 sm:gap-0">
            <span className="text-lg text-[#C5202C]" aria-hidden>
              ➡️
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C9A227]">
              🍁
            </span>
          </div>
          <div className="hidden h-px w-full bg-gradient-to-r from-transparent via-[#C5202C] to-transparent sm:block" />
        </div>

        <div className="flex-1 rounded-xl border border-[#C9A227]/40 bg-gradient-to-br from-[#1A1A1A] to-[#141414] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#C9A227]/70">
            Represents
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {player.nowRepresents}
          </p>
          <p className="mt-1 text-xs text-white/50">Canadian National Team</p>
        </div>
      </div>
    </div>
  );
}

export default function RosterMosaic() {
  const [activeSquad, setActiveSquad] = useState<Squad>("men");
  const [activeId, setActiveId] = useState<string | null>(null);

  const squad = SQUADS[activeSquad];
  const activePlayer =
    squad.players.find((p) => p.id === activeId) ??
    MENS_SQUAD.find((p) => p.id === activeId) ??
    WOMENS_SQUAD.find((p) => p.id === activeId) ??
    null;

  const close = useCallback(() => setActiveId(null), []);

  const switchSquad = (squadKey: Squad) => {
    setActiveSquad(squadKey);
    setActiveId(null);
  };

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
    <section className="relative w-full overflow-hidden bg-[#1A1A1A] px-6 py-20 text-white sm:px-10 lg:px-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgba(201,162,39,0.12), transparent 40%), radial-gradient(circle at 80% 90%, rgba(197,32,44,0.15), transparent 45%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <header className="mx-auto max-w-3xl animate-fade-in text-center">
          <p className="mb-4 inline-block rounded-full border border-[#C9A227]/50 bg-[#FAFAFA]/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A227]">
            Canada · National Teams
          </p>
          <h2 className="text-balance bg-gradient-to-b from-[#FAFAFA] to-[#C9A227] bg-clip-text text-4xl font-black leading-tight tracking-tight text-transparent sm:text-5xl lg:text-6xl">
            30 Journeys. Multiple Heritages. One Maple Leaf.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/60 sm:text-lg">
            A tribute to the immigrant roots and diverse origins that forged
            Canada&apos;s greatest teams. Every tile is a homecoming.
          </p>
        </header>

        <div
          className="mx-auto mt-10 flex max-w-xl flex-col gap-2 rounded-2xl border border-[#C9A227]/30 bg-[#141414] p-1.5 sm:flex-row"
          role="tablist"
          aria-label="Select national squad"
        >
          {(Object.keys(SQUADS) as Squad[]).map((key) => {
            const isActive = activeSquad === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => switchSquad(key)}
                className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] ${
                  isActive
                    ? "border border-[#C9A227]/60 bg-gradient-to-b from-[#FAFAFA] to-[#E8E8E8] text-[#1A1A1A] shadow-lg shadow-[#C9A227]/10"
                    : "border border-transparent text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                {SQUADS[key].label}
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-center text-sm font-medium text-[#C5202C]">
          {squad.subtitle}
        </p>

        <div
          key={activeSquad}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          role="tabpanel"
        >
          {squad.players.map((player, index) => (
            <button
              key={player.id}
              type="button"
              onClick={() => setActiveId(player.id)}
              style={{ animationDelay: `${index * 90}ms` }}
              className="group relative flex animate-fade-in flex-col overflow-hidden rounded-2xl border border-[#C9A227]/40 bg-gradient-to-b from-[#FAFAFA] to-[#E8E8E8] p-6 text-left text-[#1A1A1A] opacity-0 shadow-lg shadow-black/20 outline-none transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C5202C] hover:shadow-2xl hover:shadow-[#C5202C]/10 focus-visible:ring-2 focus-visible:ring-[#C9A227]"
              aria-label={`Read the story of ${player.name}`}
            >
              <span className="pointer-events-none absolute -right-6 -top-6 text-[6rem] font-black leading-none text-[#1A1A1A]/5 transition-colors duration-300 group-hover:text-[#C5202C]/15">
                {player.number}
              </span>

              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#C9A227] bg-[#1A1A1A] text-xl font-bold text-[#C9A227] shadow-inner">
                {player.initials}
              </div>

              <h3 className="relative mt-5 text-lg font-bold text-[#1A1A1A]">
                {player.name}
              </h3>
              <p className="relative mt-1 text-xs font-semibold uppercase tracking-wide text-[#C5202C]">
                #{player.number} · {player.position}
              </p>

              <div className="relative mt-4 flex flex-wrap items-center gap-2 text-sm text-[#1A1A1A]/70">
                <span>{player.heritage}</span>
                <span className="text-[#C5202C]">➡️</span>
                <span>{player.nowRepresents}</span>
              </div>

              <p className="relative mt-4 border-t border-[#1A1A1A]/10 pt-4 text-sm italic leading-relaxed text-[#1A1A1A]/80">
                &ldquo;{player.tagline}&rdquo;
              </p>

              <span className="relative mt-5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-[#C5202C] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Read the journey
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
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
            className="absolute inset-0 animate-backdrop-in bg-[#1A1A1A]/85 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />

          <div className="relative max-h-[90vh] w-full max-w-lg animate-panel-in overflow-y-auto rounded-3xl border-2 border-[#C9A227]/60 bg-gradient-to-b from-[#FAFAFA] to-[#E8E8E8] text-[#1A1A1A] shadow-2xl shadow-black/40">
            <div className="h-1.5 w-full bg-gradient-to-r from-[#C5202C] via-[#C9A227] to-[#C5202C]" />

            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#1A1A1A]/20 bg-[#1A1A1A]/5 text-[#1A1A1A]/70 transition-colors hover:border-[#C5202C] hover:text-[#C5202C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
              aria-label="Close"
            >
              <span aria-hidden className="text-lg leading-none">
                ×
              </span>
            </button>

            <div className="p-8 sm:p-10">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-[#C9A227] bg-[#1A1A1A] text-2xl font-black text-[#C9A227] shadow-inner">
                  {activePlayer.initials}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5202C]">
                    #{activePlayer.number} · {activePlayer.position}
                  </p>
                  <h3
                    id="roster-modal-title"
                    className="mt-1 text-2xl font-black text-[#1A1A1A] sm:text-3xl"
                  >
                    {activePlayer.name}
                  </h3>
                </div>
              </div>

              <JourneyMap player={activePlayer} />

              <blockquote className="mt-6 rounded-2xl border-l-4 border-[#C5202C] bg-[#1A1A1A] px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227]">
                  On representing the mosaic
                </p>
                <p className="mt-2 text-base font-semibold italic leading-relaxed text-[#FAFAFA]">
                  &ldquo;{activePlayer.quote}&rdquo;
                </p>
              </blockquote>

              <p className="mt-4 text-sm font-semibold italic text-[#C5202C]">
                &ldquo;{activePlayer.tagline}&rdquo;
              </p>

              <p className="mt-4 text-[15px] leading-relaxed text-[#1A1A1A]/80">
                {activePlayer.story}
              </p>

              <div className="mt-8 flex items-center justify-between border-t border-[#1A1A1A]/10 pt-6">
                <span className="text-xs uppercase tracking-[0.25em] text-[#1A1A1A]/40">
                  One Maple Leaf
                </span>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full border-2 border-[#C9A227] bg-[#1A1A1A] px-5 py-2 text-sm font-semibold text-[#C9A227] transition-colors hover:bg-[#C5202C] hover:border-[#C5202C] hover:text-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
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
