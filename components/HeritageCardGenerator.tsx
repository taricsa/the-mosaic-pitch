"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { getHeritageFlag } from "@/lib/heritage-flags";

const SHARE_URL = "https://themosaicpitch.vercel.app";
const CARD_WIDTH = 360;
const CARD_HEIGHT = 450;
const EXPORT_SCALE = 3; // 360×3 = 1080px wide, 450×3 = 1350px tall (4:5)

const POSITIONS = [
  "Striker",
  "Midfielder",
  "Defender",
  "Goalkeeper",
] as const;

type Position = (typeof POSITIONS)[number];

function formatSurname(value: string) {
  return value.trim().toUpperCase();
}

function formatHeritage(value: string) {
  return value.trim();
}

export default function HeritageCardGenerator() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [surname, setSurname] = useState("");
  const [heritage, setHeritage] = useState("");
  const [position, setPosition] = useState<Position | "">("");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const displaySurname = formatSurname(surname);
  const displayHeritage = formatHeritage(heritage);
  const canGenerate = displaySurname.length > 0 && displayHeritage.length > 0;
  const heritageFlag = useMemo(
    () => getHeritageFlag(displayHeritage),
    [displayHeritage],
  );

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

  const downloadCard = useCallback(async () => {
    if (!cardRef.current || !canGenerate) return;
    setDownloading(true);
    const node = cardRef.current;
    node.classList.add("exporting-tile");
    try {
      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: EXPORT_SCALE,
        backgroundColor: "#1A1A1A",
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
      });
      const link = document.createElement("a");
      link.download = `${displaySurname.toLowerCase()}-true-north-rookie.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      /* download failed silently */
    } finally {
      node.classList.remove("exporting-tile");
      setDownloading(false);
    }
  }, [canGenerate, displaySurname]);

  return (
    <section
      id="heritage-card-generator"
      className="relative w-full overflow-hidden border-y border-zinc-800/80 bg-zinc-900 px-6 py-20 text-zinc-50 sm:px-10 lg:px-16"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(197,32,44,0.15), transparent 45%), radial-gradient(circle at 85% 80%, rgba(201,162,39,0.08), transparent 50%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-lg">
        <header className="animate-fade-in text-center">
          <p className="mb-4 inline-block rounded-full border border-[#C9A227]/50 bg-[#1A1A1A]/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#C5202C]">
            Share the Mosaic
          </p>
          <h2 className="text-balance text-3xl font-black leading-tight tracking-tight text-zinc-50 sm:text-4xl">
            Mint Your True North Rookie Card
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-base leading-relaxed text-zinc-400">
            Claim your family&apos;s place in the story. Generate a premium
            rookie tile and invite others to stand behind the Maple Leaf.
          </p>
        </header>

        <form
          className="mt-12 animate-fade-in space-y-5 rounded-3xl border border-zinc-800 bg-zinc-950/60 p-8 shadow-xl shadow-black/20 sm:p-10"
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerate();
          }}
        >
          <div>
            <label
              htmlFor="heritage-surname"
              className="block text-sm font-semibold text-zinc-300"
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
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-600 transition-colors focus:border-[#C5202C] focus:outline-none focus:ring-2 focus:ring-[#C5202C]/20"
            />
          </div>

          <div>
            <label
              htmlFor="heritage-origins"
              className="block text-sm font-semibold text-zinc-300"
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
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-white placeholder:text-zinc-600 transition-colors focus:border-[#C5202C] focus:outline-none focus:ring-2 focus:ring-[#C5202C]/20"
            />
          </div>

          <fieldset>
            <legend className="block text-sm font-semibold text-zinc-300">
              Your Primary Position{" "}
              <span className="font-normal text-zinc-500">(optional)</span>
            </legend>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {POSITIONS.map((option) => {
                const isSelected = position === option;
                return (
                  <label
                    key={option}
                    className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-2.5 text-center text-xs font-semibold uppercase tracking-wide transition-all sm:text-sm ${
                      isSelected
                        ? "border-[#C9A227] bg-[#C9A227]/15 text-[#C9A227]"
                        : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="primary-position"
                      value={option}
                      checked={isSelected}
                      onChange={() => {
                        setPosition(option);
                        setGenerated(false);
                      }}
                      className="sr-only"
                    />
                    {option}
                  </label>
                );
              })}
            </div>
            {position && (
              <button
                type="button"
                onClick={() => {
                  setPosition("");
                  setGenerated(false);
                }}
                className="mt-2 text-xs text-zinc-500 transition-colors hover:text-zinc-300"
              >
                Clear position
              </button>
            )}
          </fieldset>

          <button
            type="submit"
            disabled={!canGenerate}
            className="w-full rounded-full border-2 border-[#C5202C] bg-[#C5202C] px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-[#FAFAFA] transition-all hover:-translate-y-0.5 hover:bg-[#a01828] hover:shadow-lg hover:shadow-[#C5202C]/25 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
          >
            Generate My Rookie Card
          </button>
        </form>

        {generated && canGenerate && (
          <div className="mt-10 animate-panel-in space-y-6">
            <div className="flex justify-center">
              <div
                ref={cardRef}
                className="relative box-border overflow-hidden rounded-[18px] border-[5px] border-[#C5202C] bg-[#1A1A1A] shadow-2xl shadow-[#C5202C]/25"
                style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
              >
                {/* Trading-card base texture */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgba(201,162,39,0.08) 0%, transparent 40%, rgba(197,32,44,0.1) 100%), repeating-linear-gradient(-45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 8px)",
                  }}
                  aria-hidden
                />

                {/* Top foil band */}
                <div
                  className="relative z-10 h-[52px] border-b-2 border-[#C9A227]/60 bg-gradient-to-r from-[#C5202C] via-[#8B1520] to-[#C5202C]"
                  aria-hidden
                >
                  <div className="flex h-full items-center justify-between px-4">
                    <span className="text-[9px] font-black uppercase tracking-[0.22em] text-[#FAFAFA]/90">
                      True North
                    </span>
                    <span className="rounded border border-[#C9A227]/70 bg-[#1A1A1A]/40 px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.15em] text-[#C9A227]">
                      Rookie
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-[0.22em] text-[#FAFAFA]/90">
                      Edition
                    </span>
                  </div>
                </div>

                {/* Corner medallions */}
                <div
                  className="pointer-events-none absolute left-3 top-[58px] z-20 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#C9A227] bg-[#141414] text-lg shadow-md"
                  aria-hidden
                >
                  {heritageFlag}
                </div>
                <div
                  className="pointer-events-none absolute right-3 top-[58px] z-20 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#C9A227] bg-[#141414] text-base shadow-md"
                  aria-hidden
                >
                  🍁
                </div>

                {/* Inner gold frame */}
                <div className="absolute inset-x-3 bottom-3 top-[60px] flex flex-col rounded-xl border-2 border-[#C9A227] bg-gradient-to-b from-[#141414] via-[#1A1A1A] to-[#0F0F0F] p-4 pb-2">
                  {/* Top label */}
                  <div className="border-b border-[#C9A227]/30 pb-3 text-center">
                    <p className="text-[7.5px] font-bold uppercase leading-tight tracking-[0.2em] text-[#C9A227]">
                      THE MOSAIC PITCH · OFFICIAL ROOKIE TILE
                    </p>
                  </div>

                  {/* Center identity block */}
                  <div className="flex flex-1 flex-col items-center justify-center px-1 py-3 text-center">
                    <p
                      className="max-w-full truncate text-[32px] font-black leading-none tracking-tight text-[#FAFAFA]"
                      style={{ letterSpacing: "0.04em" }}
                    >
                      {displaySurname}
                    </p>
                    {position && (
                      <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#C5202C]">
                        Position: {position.toUpperCase()}
                      </p>
                    )}
                    <div
                      className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent"
                      aria-hidden
                    />
                  </div>

                  {/* Bottom heritage statement */}
                  <div className="border-t border-[#C9A227]/30 pt-3 text-center">
                    <p className="text-[9.5px] font-semibold leading-[1.55] text-[#FAFAFA]/90">
                      Rooted in{" "}
                      <span className="inline-flex items-center gap-1 text-[#C5202C]">
                        {heritageFlag} {displayHeritage}
                      </span>
                      . Grown under the True North. United by the Beautiful
                      Game.
                    </p>
                    <div
                      className="mt-2 flex items-center justify-center gap-2"
                      aria-hidden
                    >
                      <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#C9A227]/60" />
                      <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#C9A227] bg-[#C9A227]/10">
                        <span className="text-[7px] font-black text-[#C9A227]">
                          CA
                        </span>
                      </div>
                      <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#C9A227]/60" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={downloadCard}
                disabled={downloading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#C5202C] bg-[#C5202C] px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#a01828] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5202C] disabled:opacity-60 sm:w-auto"
              >
                {downloading ? "Preparing download…" : "Download Tile Image"}
              </button>
              <button
                type="button"
                onClick={copyShareLink}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#C9A227] bg-[#1A1A1A] px-6 py-3.5 text-sm font-bold text-[#C9A227] transition-all hover:-translate-y-0.5 hover:bg-[#C5202C] hover:border-[#C5202C] hover:text-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5202C] sm:w-auto"
                aria-live="polite"
              >
                {copied ? "Copied to clipboard!" : "Copy Share Link"}
              </button>
              <p className="max-w-sm text-center text-xs leading-relaxed text-zinc-500">
                Download the 4:5 rookie card for Instagram, or copy the link to
                invite friends and family.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
