"use client";

import { useCallback, useMemo, useState } from "react";

type Region = "west-coast" | "prairies" | "ontario" | "quebec" | "atlantic";
type Energy = "boisterous" | "tactical" | "family";
type Heartbreak = "bulletproof" | "rollercoaster";

type Answers = {
  region: Region | null;
  energy: Energy | null;
  heartbreak: Heartbreak | null;
};

type ClubRecommendation = {
  club: string;
  league: "CPL" | "MLS";
  fanGroup: string;
  tagline: string;
  description: string;
  shareLine: string;
};

const QUESTIONS = [
  {
    id: "region" as const,
    prompt: "What is your geological hub?",
    options: [
      { value: "west-coast" as const, label: "West Coast" },
      { value: "prairies" as const, label: "Prairies" },
      { value: "ontario" as const, label: "Ontario" },
      { value: "quebec" as const, label: "Quebec" },
      { value: "atlantic" as const, label: "Atlantic" },
    ],
  },
  {
    id: "energy" as const,
    prompt: "Choose your matchday energy level.",
    options: [
      {
        value: "boisterous" as const,
        label: "Boisterous singing and flags",
      },
      { value: "tactical" as const, label: "Tactical analysis and coffee" },
      {
        value: "family" as const,
        label: "Family afternoon at the pitch",
      },
    ],
  },
  {
    id: "heartbreak" as const,
    prompt: "How do you handle sports heartbreak?",
    options: [
      {
        value: "bulletproof" as const,
        label: "I'm a hockey fan, I am bulletproof",
      },
      {
        value: "rollercoaster" as const,
        label: "I embrace the emotional rollercoaster",
      },
    ],
  },
] as const;

function getRecommendation(answers: Answers): ClubRecommendation | null {
  if (!answers.region || !answers.energy || !answers.heartbreak) return null;

  const { region, energy, heartbreak } = answers;

  if (region === "west-coast") {
    return {
      club: "Vancouver Whitecaps FC",
      league: "MLS",
      fanGroup: "The Southsiders",
      tagline: "Rain-soaked passion on the Pacific.",
      description:
        "From the terraces of BC Place, the Southsiders turn every Whitecaps match into a coastal anthem. Flags, drums, and full-throated singing define a supporter culture built for those who want the World Cup roar to continue every weekend — whether you're riding the rollercoaster or shrugging off heartbreak like a seasoned Canucks fan.",
      shareLine:
        "My World Cup fandom match: Vancouver Whitecaps FC & The Southsiders — rain-soaked Pacific passion, every weekend.",
    };
  }

  if (region === "prairies") {
    if (energy === "tactical") {
      return {
        club: "Cavalry FC",
        league: "CPL",
        fanGroup: "The Cavalry faithful",
        tagline: "High-altitude football, high standards.",
        description:
          "At ATCO Field, Cavalry supporters treat every match like a tactical briefing with a soundtrack. Smart, loyal, and fiercely proud of Alberta's football identity, this is the club for viewers who loved Canada's organized press and want a domestic side that rewards the thinking fan.",
        shareLine:
          "My World Cup fandom match: Cavalry FC — high-altitude football for the tactical mind.",
      };
    }
    return {
      club: "FC Edmonton",
      league: "CPL",
      fanGroup: "The Brickmen",
      tagline: "Northern grit, unbreakable loyalty.",
      description:
        "The Brickmen carry Edmonton's working-class football soul into every stand. Built for fans who've survived playoff heartbreak in other sports and still show up — because prairie loyalty doesn't flinch when the scoreboard turns cruel.",
      shareLine:
        "My World Cup fandom match: FC Edmonton & The Brickmen — northern grit, unbreakable loyalty.",
    };
  }

  if (region === "quebec") {
    return {
      club: "CF Montréal",
      league: "MLS",
      fanGroup: heartbreak === "rollercoaster" ? "Ultras Montréal" : "1642 MTL",
      tagline: "Passion bilingue, stade en feu.",
      description:
        heartbreak === "rollercoaster"
          ? "Ultras Montréal bring European-style intensity to Stade Saputo — tifos, chants en français, and an emotional commitment that mirrors the highs and lows of Les Rouges on the world stage. If the World Cup made you feel alive, this is your weekly fix."
          : "1642 MTL channels Montréal's creative, community-driven supporter energy into every matchday. Steady, proud, and deeply connected to the city's football story — perfect for fans who want passion with staying power.",
      shareLine:
        heartbreak === "rollercoaster"
          ? "My World Cup fandom match: CF Montréal & Ultras Montréal — passion bilingue, stade en feu."
          : "My World Cup fandom match: CF Montréal & 1642 MTL — community-driven Montréal football pride.",
    };
  }

  if (region === "atlantic") {
    return {
      club: "Halifax Wanderers FC",
      league: "CPL",
      fanGroup: "The Town",
      tagline: "A whole province, one terrace.",
      description:
        "The Town is Halifax Wanderers' heartbeat — a tight-knit Atlantic community that treats every home match like a neighbourhood reunion. Flags, sea air, and an emotional honesty that welcomes casual World Cup converts into lifelong Wanderers faithful.",
      shareLine:
        "My World Cup fandom match: Halifax Wanderers FC & The Town — a whole province, one terrace.",
    };
  }

  // Ontario — branch on energy
  if (energy === "boisterous") {
    return {
      club: "Toronto FC",
      league: "MLS",
      fanGroup: "The Red Patch Boys",
      tagline: "The loudest room in Canadian club football.",
      description:
        "The Red Patch Boys have turned BMO Field into a cauldron for over a decade — scarves, songs, and an unapologetic volume that mirrors the World Cup atmospheres you fell in love with. Ontario's biggest stage for fans who want every Saturday to feel like a knockout round.",
      shareLine:
        "My World Cup fandom match: Toronto FC & The Red Patch Boys — the loudest room in Canadian club football.",
    };
  }

  if (energy === "family") {
    return {
      club: "Forge FC",
      league: "CPL",
      fanGroup: "The Forge Army",
      tagline: "Hamilton heart, championship habits.",
      description:
        "The Forge Army welcomes families and die-hards alike at Hamilton's Tim Hortons Field. It's community-first football with a winning edge — the perfect landing spot for World Cup viewers who want matchday to feel like a local tradition, not just a spectacle.",
      shareLine:
        "My World Cup fandom match: Forge FC & The Forge Army — Hamilton heart, championship habits.",
    };
  }

  return {
    club: "Atlético Ottawa",
    league: "CPL",
    fanGroup: "The Bytown Boys",
    tagline: "Capital composure, growing conviction.",
    description:
      "The Bytown Boys bring thoughtful, coffee-fueled devotion to TD Place — analyzing every pass while building one of the CPL's most authentic supporter cultures. For Ontario fans who loved Canada's tactical evolution at the World Cup, Atlético Ottawa is your weekly deep dive.",
    shareLine:
      "My World Cup fandom match: Atlético Ottawa & The Bytown Boys — capital composure, growing conviction.",
  };
}

const INITIAL_ANSWERS: Answers = {
  region: null,
  energy: null,
  heartbreak: null,
};

export default function FandomQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);
  const [copied, setCopied] = useState(false);

  const isComplete = step >= QUESTIONS.length;
  const currentQuestion = QUESTIONS[step] ?? null;
  const recommendation = useMemo(
    () => (isComplete ? getRecommendation(answers) : null),
    [answers, isComplete],
  );

  const shareText = useMemo(() => {
    if (!recommendation) return "";
    return `${recommendation.shareLine}\n\nFind your club: ${typeof window !== "undefined" ? window.location.origin : ""}#fandom-quiz-result`;
  }, [recommendation]);

  const selectOption = (questionId: keyof Answers, value: Region | Energy | Heartbreak) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setStep((prev) => prev + 1);
  };

  const restart = () => {
    setAnswers(INITIAL_ANSWERS);
    setStep(0);
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
      id="fandom-quiz"
      className="relative w-full overflow-hidden bg-[#0b2a1f] px-6 py-20 text-white sm:px-10 lg:px-16"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 15%, rgba(197,32,44,0.2), transparent 45%), radial-gradient(circle at 10% 80%, rgba(212,175,55,0.15), transparent 50%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-2xl">
        <header className="animate-fade-in text-center">
          <p className="mb-4 inline-block rounded-full border border-[#d4af37]/50 bg-[#d4af37]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#e9cf7a]">
            World Cup → Club Fandom
          </p>
          <h2 className="text-balance bg-gradient-to-b from-white to-[#e9cf7a] bg-clip-text text-3xl font-black leading-tight tracking-tight text-transparent sm:text-4xl lg:text-5xl">
            Find Your Canadian Club Home
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-base leading-relaxed text-emerald-100/80">
            Three quick questions to turn your World Cup buzz into a lifelong
            domestic supporter identity.
          </p>
        </header>

        {!isComplete && currentQuestion && (
          <div
            key={currentQuestion.id}
            className="mt-12 animate-fade-in rounded-3xl border border-[#d4af37]/40 bg-gradient-to-b from-[#123c2c] to-[#0c2b20] p-8 shadow-xl shadow-black/30 sm:p-10"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e9cf7a]/70">
                Question {step + 1} of {QUESTIONS.length}
              </span>
              <div className="flex gap-1.5">
                {QUESTIONS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-8 rounded-full transition-colors ${
                      i <= step ? "bg-[#d4af37]" : "bg-white/15"
                    }`}
                  />
                ))}
              </div>
            </div>

            <h3 className="text-xl font-bold text-white sm:text-2xl">
              {currentQuestion.prompt}
            </h3>

            <ul className="mt-8 flex flex-col gap-3">
              {currentQuestion.options.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => selectOption(currentQuestion.id, option.value)}
                    className="group w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-left text-sm font-medium text-emerald-50 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d4af37]/60 hover:bg-[#d4af37]/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9cf7a] sm:text-base"
                  >
                    <span className="flex items-center justify-between gap-3">
                      {option.label}
                      <span
                        aria-hidden
                        className="text-[#e9cf7a] opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        →
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((prev) => prev - 1)}
                className="mt-6 text-sm font-medium text-emerald-100/60 transition-colors hover:text-[#e9cf7a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9cf7a]"
              >
                ← Back
              </button>
            )}
          </div>
        )}

        {isComplete && recommendation && (
          <div
            id="fandom-quiz-result"
            className="mt-12 animate-panel-in scroll-mt-24 rounded-3xl border border-[#d4af37]/60 bg-gradient-to-b from-[#123c2c] to-[#081d15] shadow-2xl shadow-black/40"
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-[#c5202c] via-[#d4af37] to-[#c5202c]" />

            <div className="p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e9cf7a]/80">
                Your matchday home
              </p>
              <h3 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                {recommendation.club}
              </h3>
              <p className="mt-1 text-sm font-semibold text-[#c5202c]">
                {recommendation.league} · {recommendation.fanGroup}
              </p>
              <p className="mt-4 text-lg font-semibold italic text-[#e9cf7a]">
                &ldquo;{recommendation.tagline}&rdquo;
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-emerald-50/90">
                {recommendation.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={copyShareLink}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d4af37]/60 bg-[#d4af37]/15 px-6 py-3 text-sm font-semibold text-[#e9cf7a] transition-colors hover:bg-[#d4af37]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9cf7a]"
                  aria-live="polite"
                >
                  {copied ? "Copied to clipboard!" : "Copy & share your club match"}
                </button>
                <button
                  type="button"
                  onClick={restart}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-emerald-100/80 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9cf7a]"
                >
                  Retake quiz
                </button>
              </div>

              <p className="mt-4 text-xs text-emerald-100/50">
                Paste your result on X, Instagram, or group chat — the link
                brings friends straight back to find their club.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
