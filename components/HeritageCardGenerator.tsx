"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { getHeritageFlag } from "@/lib/heritage-flags";

const SHARE_URL = "https://themosaicpitch.vercel.app";

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
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#1A1A1A",
      });
      const link = document.createElement("a");
      link.download = `${displaySurname.toLowerCase()}-mosaic-tile.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      /* download failed silently */
    } finally {
      setDownloading(false);
    }
  }, [canGenerate, displaySurname]);

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

      <div className="relative mx-auto max-w-md">
        <header className="animate-fade-in text-center">
          <p className="mb-4 inline-block rounded-full border border-[#C9A227]/50 bg-[#1A1A1A]/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#C5202C]">
            Share the Mosaic
          </p>
          <h2 className="text-balance text-3xl font-black leading-tight tracking-tight text-[#1A1A1A] sm:text-4xl">
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
            {/* 4:5 aspect ratio card for social sharing */}
            <div
              ref={cardRef}
              className="relative mx-auto aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-3xl border-4 border-[#C5202C] bg-gradient-to-br from-[#1A1A1A] via-[#141414] to-[#1A1A1A] shadow-2xl shadow-[#C5202C]/20"
            >
              <div
                className="pointer-events-none absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#C9A227] bg-[#C9A227]/10 text-xl"
                aria-hidden
              >
                {heritageFlag}
              </div>
              <div
                className="pointer-events-none absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#C9A227] bg-[#C9A227]/10 text-lg"
                aria-hidden
              >
                🍁
              </div>

              <div className="flex h-full flex-col justify-between p-6 sm:p-8">
                <div className="rounded-2xl border border-[#C9A227]/50 p-5 text-center">
                  <span
                    className="animate-maple-float inline-block text-4xl"
                    role="img"
                    aria-label="Maple leaf"
                  >
                    🍁
                  </span>
                  <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                    The Mosaic Pitch · Official Tile
                  </p>
                </div>

                <div className="flex flex-1 flex-col items-center justify-center px-2 text-center">
                  <p className="text-xl font-black leading-snug tracking-wide text-[#FAFAFA] sm:text-2xl">
                    <span className="text-[#C9A227]">{displaySurname}</span>{" "}
                    FAMILY.
                  </p>
                  <p className="mt-4 text-sm font-bold leading-relaxed text-white/90 sm:text-base">
                    Rooted in{" "}
                    <span className="inline-flex items-center gap-1.5 text-[#C5202C]">
                      {heritageFlag} {displayHeritage}
                    </span>
                    .
                    <br />
                    Grown under the True North.
                    <br />
                    United by the Beautiful Game.
                  </p>
                  <p className="mt-5 text-2xl">🇨🇦⚽</p>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C9A227]" />
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#C9A227] bg-[#C9A227]/15 shadow-inner">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#C9A227]">
                      CA
                    </span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C9A227]" />
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
              <p className="max-w-sm text-center text-xs leading-relaxed text-[#1A1A1A]/50">
                Download the 4:5 tile for Instagram, or copy the link to invite
                friends and family.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
