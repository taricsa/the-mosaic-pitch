"use client";

import { useCallback, useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  getDictionary,
  type FandomQuizRecommendation,
} from "@/lib/dictionaries";

type Region = "west-coast" | "prairies" | "ontario" | "quebec" | "atlantic";
type Energy = "boisterous" | "tactical" | "family";
type Heartbreak = "bulletproof" | "rollercoaster";

type Answers = {
  region: Region | null;
  energy: Energy | null;
  heartbreak: Heartbreak | null;
};

type RecommendationKey = keyof ReturnType<
  typeof getDictionary
>["fandomQuiz"]["recommendations"];

function getRecommendationKey(answers: Answers): RecommendationKey | null {
  if (!answers.region || !answers.energy || !answers.heartbreak) return null;

  const { region, energy, heartbreak } = answers;

  if (region === "west-coast") return "vancouverWhitecaps";

  if (region === "prairies") {
    return energy === "tactical" ? "cavalry" : "fcEdmonton";
  }

  if (region === "quebec") {
    return heartbreak === "rollercoaster" ? "montrealUltras" : "montreal1642";
  }

  if (region === "atlantic") return "halifax";

  if (energy === "boisterous") return "torontoFC";
  if (energy === "family") return "forge";

  return "atleticoOttawa";
}

const INITIAL_ANSWERS: Answers = {
  region: null,
  energy: null,
  heartbreak: null,
};

export default function FandomQuiz() {
  const { currentLanguage } = useLanguage();
  const t = getDictionary(currentLanguage).fandomQuiz;

  const questions = useMemo(
    () =>
      [
        {
          id: "region" as const,
          prompt: t.questions.region.prompt,
          options: [
            {
              value: "west-coast" as const,
              label: t.questions.region.westCoast,
            },
            {
              value: "prairies" as const,
              label: t.questions.region.prairies,
            },
            { value: "ontario" as const, label: t.questions.region.ontario },
            { value: "quebec" as const, label: t.questions.region.quebec },
            {
              value: "atlantic" as const,
              label: t.questions.region.atlantic,
            },
          ],
        },
        {
          id: "energy" as const,
          prompt: t.questions.energy.prompt,
          options: [
            {
              value: "boisterous" as const,
              label: t.questions.energy.boisterous,
            },
            {
              value: "tactical" as const,
              label: t.questions.energy.tactical,
            },
            { value: "family" as const, label: t.questions.energy.family },
          ],
        },
        {
          id: "heartbreak" as const,
          prompt: t.questions.heartbreak.prompt,
          options: [
            {
              value: "bulletproof" as const,
              label: t.questions.heartbreak.bulletproof,
            },
            {
              value: "rollercoaster" as const,
              label: t.questions.heartbreak.rollercoaster,
            },
          ],
        },
      ] as const,
    [t],
  );

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);
  const [copied, setCopied] = useState(false);

  const isComplete = step >= questions.length;
  const currentQuestion = questions[step] ?? null;

  const recommendation: FandomQuizRecommendation | null = useMemo(() => {
    if (!isComplete) return null;
    const key = getRecommendationKey(answers);
    return key ? t.recommendations[key] : null;
  }, [answers, isComplete, t]);

  const shareText = useMemo(() => {
    if (!recommendation) return "";
    return `${recommendation.shareLine}\n\n${t.findYourClub} ${typeof window !== "undefined" ? window.location.origin : ""}#fandom-quiz-result`;
  }, [recommendation, t.findYourClub]);

  const selectOption = (
    questionId: keyof Answers,
    value: Region | Energy | Heartbreak,
  ) => {
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
            {t.badge}
          </p>
          <h2 className="text-balance bg-gradient-to-b from-white to-[#e9cf7a] bg-clip-text text-3xl font-black leading-tight tracking-tight text-transparent sm:text-4xl lg:text-5xl">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-base leading-relaxed text-emerald-100/80">
            {t.subtitle}
          </p>
        </header>

        {!isComplete && currentQuestion && (
          <div
            key={currentQuestion.id}
            className="mt-12 animate-fade-in rounded-3xl border border-[#d4af37]/40 bg-gradient-to-b from-[#123c2c] to-[#0c2b20] p-8 shadow-xl shadow-black/30 sm:p-10"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e9cf7a]/70">
                {t.questionLabel} {step + 1} {t.questionOf} {questions.length}
              </span>
              <div className="flex gap-1.5">
                {questions.map((_, i) => (
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
                {t.back}
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
                {t.resultLabel}
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
                  {copied ? t.copied : t.copyShare}
                </button>
                <button
                  type="button"
                  onClick={restart}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-emerald-100/80 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e9cf7a]"
                >
                  {t.retake}
                </button>
              </div>

              <p className="mt-4 text-xs text-emerald-100/50">{t.shareHint}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
