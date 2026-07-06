"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const WWC_2027_KICKOFF = new Date("2027-06-24T17:00:00-03:00");

const COPY = {
  en: {
    headline: "Countdown to Canada's next global stage",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
  },
  fr: {
    headline: "Compte à rebours avant la prochaine étape mondiale du Canada",
    days: "Jours",
    hours: "Heures",
    minutes: "Minutes",
    seconds: "Secondes",
  },
} as const;

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calcTimeLeft(): TimeLeft | null {
  const diff = WWC_2027_KICKOFF.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function WomensWorldCupCountdown() {
  const { currentLanguage } = useLanguage();
  const copy = COPY[currentLanguage];
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(calcTimeLeft());
    const interval = window.setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const units = timeLeft
    ? [
        { key: "days", label: copy.days, value: timeLeft.days },
        { key: "hours", label: copy.hours, value: timeLeft.hours },
        { key: "minutes", label: copy.minutes, value: timeLeft.minutes },
        { key: "seconds", label: copy.seconds, value: timeLeft.seconds },
      ]
    : [];

  return (
    <section
      aria-labelledby="wwc-countdown-heading"
      className="border-b border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 px-6 py-14 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C5202C]">
          FIFA Women&apos;s World Cup 2027 · Brazil
        </p>
        <h2
          id="wwc-countdown-heading"
          className="mt-3 text-3xl font-black tracking-tight text-zinc-50 sm:text-4xl"
        >
          {copy.headline}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          Olympic champions, world-class talent — Les Rouges return to the
          biggest stage. The clock is ticking until kickoff in Brazil.
        </p>

        {timeLeft ? (
          <div
            className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
            aria-live="polite"
          >
            {units.map(({ key, label, value }) => (
              <div
                key={key}
                className="rounded-2xl border border-[#C9A227]/30 bg-zinc-900/80 px-4 py-5"
              >
                <p className="font-mono text-3xl font-black tabular-nums tracking-tight text-[#C9A227] sm:text-4xl">
                  {String(value).padStart(2, "0")}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-zinc-500">
                  {label}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-lg font-bold text-[#C9A227]">
            The tournament has begun — go Canada! 🍁
          </p>
        )}

        <p className="mt-6 text-xs text-zinc-600">
          Opening match · June 24, 2027 · Brazil
        </p>
      </div>
    </section>
  );
}
