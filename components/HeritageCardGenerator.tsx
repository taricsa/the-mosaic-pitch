"use client";

import { useCallback, useMemo, useState } from "react";

const SHARE_URL = "https://themosaicpitch.vercel.app";

function formatSurname(value: string) {
  return value.trim().toUpperCase();
}

function formatHeritage(value: string) {
  return value.trim();
}

export default function HeritageCardGenerator() {
  const [surname, setSurname] = useState("");
  const [heritage, setHeritage] = useState("");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const displaySurname = formatSurname(surname);
  const displayHeritage = formatHeritage(heritage);
  const canGenerate = displaySurname.length > 0 && displayHeritage.length > 0;

  const cardText = useMemo(() => {
    if (!canGenerate) return "";
    return `${displaySurname} FAMILY. Rooted in ${displayHeritage}. Grown under the True North. United by the Beautiful Game. 🇨🇦⚽`;
  }, [canGenerate, displaySurname, displayHeritage]);

  const shareText = useMemo(() => {
    if (!canGenerate) return "";
    return `Our family tree started in ${displayHeritage}, but we stand behind the Maple Leaf on the pitch. Generate your family's football passport on The Mosaic Pitch: ${SHARE_URL}`;
  }, [canGenerate, displayHeritage]);

  const handleGenerate = () => {
    if (!canGenerate) return;
    setGenerated(true);
    setCopied(false);
  };

  const copyShareLink = useCallback(async () => {
    if (!shareText) return;
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }, [shareText]);

  return (
    <section
      id="heritage-card-generator"
      className="relative w-full overflow-hidden bg-[#FAFAFA] px-6 py-20 text-[#1A1A1A] sm:px-10 lg:px-16"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(197,32,44,0.08), transparent 45%), radial-gradient(circle at 85% 80%, rgba(201,162,39,0.1), transparent 50%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-2xl">
        <header className="animate-fade-in text-center">
          <p className="mb-4 inline-block rounded-full border border-[#C9A227]/50 bg-[#1A1A1A]/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#C5202C]">
            Share the Mosaic
          </p>
          <h2 className="text-balance text-3xl font-black leading-tight tracking-tight text-[#1A1A1A] sm:text-4xl lg:text-5xl">
            Affix Your Tile to the Canadian Mosaic
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-base leading-relaxed text-[#1A1A1A]/60">
            Claim your family&apos;s place in the story. Generate a shareable
            tile and invite others to stand behind the Maple Leaf.
          </p>
        </header>

        <form
          className="mt-12 animate-fade-in space-y-5 rounded-3xl border-2 border-[#C9A227]/40 bg-white p-8 shadow-xl shadow-black/5 sm:p-10"
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerate();
          }}
        >
          <div>
            <label
              htmlFor="heritage-surname"
              className="block text-sm font-semibold text-[#1A1A1A]"
            >
              Your Name or Family Surname
            </label>
            <input
              id="heritage-surname"
              type="text"
              value={surname}
              onChange={(e) => {
                setSurname(e.target.value);
                setGenerated(false);
              }}
              placeholder="e.g., Nguyen, O'Brien, Singh"
              className="mt-2 w-full rounded-xl border-2 border-[#1A1A1A]/10 bg-[#FAFAFA] px-4 py-3 text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 transition-colors focus:border-[#C5202C] focus:outline-none focus:ring-2 focus:ring-[#C5202C]/20"
            />
          </div>

          <div>
            <label
              htmlFor="heritage-origins"
              className="block text-sm font-semibold text-[#1A1A1A]"
            >
              Sovereign Heritage / Ancestral Origins
            </label>
            <input
              id="heritage-origins"
              type="text"
              value={heritage}
              onChange={(e) => {
                setHeritage(e.target.value);
                setGenerated(false);
              }}
              placeholder="e.g., Italy, Nigeria, Philippines, Punjab"
              className="mt-2 w-full rounded-xl border-2 border-[#1A1A1A]/10 bg-[#FAFAFA] px-4 py-3 text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 transition-colors focus:border-[#C5202C] focus:outline-none focus:ring-2 focus:ring-[#C5202C]/20"
            />
          </div>

          <button
            type="submit"
            disabled={!canGenerate}
            className="w-full rounded-full border-2 border-[#C5202C] bg-[#C5202C] px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-[#FAFAFA] transition-all hover:-translate-y-0.5 hover:bg-[#a01828] hover:shadow-lg hover:shadow-[#C5202C]/25 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
          >
            Generate My Tile
          </button>
        </form>

        {generated && canGenerate && (
          <div className="mt-10 animate-panel-in space-y-6">
            <div className="relative overflow-hidden rounded-3xl border-4 border-[#C5202C] bg-gradient-to-br from-[#1A1A1A] via-[#141414] to-[#1A1A1A] p-8 shadow-2xl shadow-[#C5202C]/20 sm:p-10">
              {/* Gold corner seals */}
              <div
                className="pointer-events-none absolute left-4 top-4 h-10 w-10 rounded-full border-2 border-[#C9A227] bg-[#C9A227]/10"
                aria-hidden
              >
                <div className="flex h-full w-full items-center justify-center text-[10px] font-black text-[#C9A227]">
                  🍁
                </div>
              </div>
              <div
                className="pointer-events-none absolute bottom-4 right-4 h-10 w-10 rounded-full border-2 border-[#C9A227] bg-[#C9A227]/10"
                aria-hidden
              >
                <div className="flex h-full w-full items-center justify-center text-[10px] font-black text-[#C9A227]">
                  ⚽
                </div>
              </div>

              {/* Inner gold frame */}
              <div className="rounded-2xl border border-[#C9A227]/50 p-6 sm:p-8">
                <div className="flex flex-col items-center text-center">
                  <span
                    className="animate-maple-float text-5xl"
                    role="img"
                    aria-label="Maple leaf"
                  >
                    🍁
                  </span>

                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#C9A227]">
                    The Mosaic Pitch · Official Tile
                  </p>

                  <p className="mt-6 max-w-sm text-balance text-lg font-black leading-snug tracking-wide text-[#FAFAFA] sm:text-xl">
                    <span className="text-[#C9A227]">{displaySurname}</span>{" "}
                    FAMILY.
                    <br />
                    <span className="mt-3 block text-base font-bold leading-relaxed text-white/90 sm:text-lg">
                      Rooted in{" "}
                      <span className="text-[#C5202C]">{displayHeritage}</span>.
                      <br />
                      Grown under the True North.
                      <br />
                      United by the Beautiful Game.
                    </span>
                    <span className="mt-4 block text-2xl">🇨🇦⚽</span>
                  </p>

                  <div className="mt-8 flex items-center gap-3">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C9A227]" />
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#C9A227] bg-[#C9A227]/15 shadow-inner">
                      <span className="text-xs font-black uppercase tracking-wider text-[#C9A227]">
                        CA
                      </span>
                    </div>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C9A227]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={copyShareLink}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#C9A227] bg-[#1A1A1A] px-6 py-3.5 text-sm font-bold text-[#C9A227] transition-all hover:-translate-y-0.5 hover:bg-[#C5202C] hover:border-[#C5202C] hover:text-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5202C] sm:w-auto"
                aria-live="polite"
              >
                {copied ? "Copied to clipboard!" : "Copy Share Link"}
              </button>
              <p className="max-w-md text-center text-xs leading-relaxed text-[#1A1A1A]/50">
                Paste on Instagram, X, or group chat to invite your family and
                friends to affix their tile.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
