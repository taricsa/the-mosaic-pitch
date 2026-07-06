"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  getDictionary,
  type RosterMosaicDictionary,
} from "@/lib/dictionaries";
import {
  MENS_SQUAD,
  WOMENS_SQUAD,
  isHomegrownPlayer,
  type Player,
} from "@/lib/roster-data";

type Squad = "men" | "women";

const AVATAR_SIZES = {
  sm: "h-14 w-14 text-lg font-bold",
  lg: "h-20 w-20 text-2xl font-black",
} as const;

function interpolate(template: string, values: Record<string, string>): string {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replace(`{{${key}}}`, value),
    template,
  );
}

function PlayerAvatar({
  player,
  size = "sm",
}: {
  player: Player;
  size?: keyof typeof AVATAR_SIZES;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(player.imageUrl) && !imageFailed;

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#C9A227] bg-[#1A1A1A] text-[#C9A227] shadow-inner ${AVATAR_SIZES[size]}`}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={player.imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setImageFailed(true)}
        />
      ) : (
        player.initials
      )}
    </div>
  );
}

function JourneyMap({
  player,
  t,
}: {
  player: Player;
  t: RosterMosaicDictionary;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-[#C9A227]/30 bg-[#141414] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227]/80">
        {t.journeyMap}
      </p>
      <div className="mt-4 flex flex-col gap-0 sm:flex-row sm:items-stretch">
        <div className="flex-1 rounded-xl border border-white/10 bg-[#1A1A1A] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
            {t.roots}
          </p>
          <p className="mt-2 text-sm font-medium text-white">{player.bornIn}</p>
          <p className="mt-1 text-xs text-white/50">
            {interpolate(t.heritageSuffix, { heritage: player.heritage })}
          </p>
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
            {t.represents}
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {player.nowRepresents}
          </p>
          <p className="mt-1 text-xs text-white/50">{t.canadianNationalTeam}</p>
        </div>
      </div>
    </div>
  );
}

export default function RosterMosaic() {
  const { currentLanguage } = useLanguage();
  const t = getDictionary(currentLanguage).rosterMosaic;

  const squads = useMemo(
    () =>
      ({
        men: {
          label: t.squads.men.label,
          subtitle: t.squads.men.subtitle,
          players: MENS_SQUAD,
        },
        women: {
          label: t.squads.women.label,
          subtitle: t.squads.women.subtitle,
          players: WOMENS_SQUAD,
        },
      }) as const,
    [t],
  );

  const [activeSquad, setActiveSquad] = useState<Squad>("men");
  const [activeId, setActiveId] = useState<string | null>(null);

  const squad = squads[activeSquad];
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
            {t.badge}
          </p>
          <h2 className="text-balance bg-gradient-to-b from-[#FAFAFA] to-[#C9A227] bg-clip-text text-4xl font-black leading-tight tracking-tight text-transparent sm:text-5xl lg:text-6xl">
            {t.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/60 sm:text-lg">
            {t.subtitle}
          </p>
        </header>

        <div
          className="mx-auto mt-10 flex max-w-2xl flex-col gap-2 rounded-2xl border border-[#C9A227]/30 bg-[#141414] p-1.5 sm:flex-row"
          role="tablist"
          aria-label={t.selectSquadAria}
        >
          {(Object.keys(squads) as Squad[]).map((key) => {
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
                {squads[key].label}
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-center text-sm font-medium text-[#C5202C]">
          {squad.subtitle}
          <span className="mt-1 block text-xs text-white/40">
            {interpolate(t.playersCount, {
              count: String(squad.players.length),
            })}
          </span>
        </p>

        <div
          key={activeSquad}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          role="tabpanel"
        >
          {squad.players.map((player, index) => (
            <button
              key={player.id}
              type="button"
              onClick={() => setActiveId(player.id)}
              style={{ animationDelay: `${Math.min(index, 12) * 60}ms` }}
              className="group relative flex animate-fade-in flex-col overflow-hidden rounded-2xl border border-[#C9A227]/40 bg-gradient-to-b from-[#FAFAFA] to-[#E8E8E8] p-5 text-left text-[#1A1A1A] opacity-0 shadow-lg shadow-black/20 outline-none transition-all duration-300 hover:-translate-y-1 hover:border-[#C5202C] hover:shadow-xl hover:shadow-[#C5202C]/10 focus-visible:ring-2 focus-visible:ring-[#C9A227] sm:p-6"
              aria-label={interpolate(t.readMoreAbout, { name: player.name })}
            >
              <span className="pointer-events-none absolute -right-4 -top-4 text-[5rem] font-black leading-none text-[#1A1A1A]/5 transition-colors duration-300 group-hover:text-[#C5202C]/15">
                {player.number}
              </span>

              <PlayerAvatar key={player.id} player={player} />

              <h3 className="relative mt-4 text-base font-bold text-[#1A1A1A] sm:text-lg">
                {player.name}
              </h3>
              <p className="relative mt-1 text-xs font-semibold uppercase tracking-wide text-[#C5202C]">
                #{player.number} · {player.position}
              </p>

              <div className="relative mt-3 flex flex-wrap items-center gap-1.5 text-xs text-[#1A1A1A]/70 sm:text-sm">
                {isHomegrownPlayer(player) ? (
                  <span className="font-medium">
                    {interpolate(t.homegrown, { heritage: player.heritage })}
                  </span>
                ) : (
                  <>
                    <span>{player.heritage}</span>
                    <span className="text-[#C5202C]">➡️</span>
                    <span>{player.nowRepresents}</span>
                  </>
                )}
              </div>

              <p className="relative mt-3 line-clamp-2 border-t border-[#1A1A1A]/10 pt-3 text-xs italic leading-relaxed text-[#1A1A1A]/80 sm:text-sm">
                &ldquo;{player.tagline}&rdquo;
              </p>

              <span className="relative mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-[#C5202C] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {t.readMore}
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
              aria-label={t.closeAria}
            >
              <span aria-hidden className="text-lg leading-none">
                ×
              </span>
            </button>

            <div className="p-8 sm:p-10">
              <div className="flex items-center gap-4">
                <PlayerAvatar key={activePlayer.id} player={activePlayer} size="lg" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5202C]">
                    #{activePlayer.number} · {activePlayer.position}
                  </p>
                  <h3
                    id="roster-modal-title"
                    className="mt-1 text-2xl font-black tracking-tight text-[#1A1A1A] sm:text-3xl"
                  >
                    {activePlayer.name}
                  </h3>
                </div>
              </div>

              <JourneyMap player={activePlayer} t={t} />

              <blockquote className="mt-6 rounded-2xl border-l-4 border-[#C5202C] bg-[#1A1A1A] px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227]">
                  {t.representingMosaic}
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
                  {t.oneMapleLeaf}
                </span>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full border-2 border-[#C9A227] bg-[#1A1A1A] px-5 py-2 text-sm font-semibold text-[#C9A227] transition-colors hover:border-[#C5202C] hover:bg-[#C5202C] hover:text-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
                >
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
