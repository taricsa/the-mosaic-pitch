import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";
import {
  MENS_WC_HISTORY,
  WOMENS_WC_HISTORY,
  type WorldCupCampaign,
} from "@/lib/history-data";

type Squad = "men" | "women";

const SQUAD_CONFIG = {
  men: {
    label: "Les Rouges",
    title: "Men's World Cup History",
    subtitle: "From Mexico 1986 to a home-soil knockout run — every Maple Leaf campaign.",
    emblem: "🇨🇦",
    accent: "#C5202C",
    accentMuted: "rgba(197,32,44,0.15)",
    accentBorder: "rgba(197,32,44,0.4)",
    gradient:
      "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(197,32,44,0.35), transparent)",
    campaigns: MENS_WC_HISTORY,
  },
  women: {
    label: "Canada WNT",
    title: "Women's World Cup History",
    subtitle: "Eight tournaments. Olympic gold legacies. One unstoppable golden generation.",
    emblem: "🥇",
    accent: "#C9A227",
    accentMuted: "rgba(201,162,39,0.12)",
    accentBorder: "rgba(201,162,39,0.45)",
    gradient:
      "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(201,162,39,0.25), transparent)",
    campaigns: WOMENS_WC_HISTORY,
  },
} as const;

function isSquad(value: string): value is Squad {
  return value === "men" || value === "women";
}

export function generateStaticParams() {
  return [{ squad: "men" }, { squad: "women" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ squad: string }>;
}): Promise<Metadata> {
  const { squad } = await params;
  if (!isSquad(squad)) return {};

  const config = SQUAD_CONFIG[squad];
  return {
    title: config.title,
    description: config.subtitle,
  };
}

function CampaignCard({
  campaign,
  accent,
  accentBorder,
  accentMuted,
  index,
}: {
  campaign: WorldCupCampaign;
  accent: string;
  accentBorder: string;
  accentMuted: string;
  index: number;
}) {
  return (
    <article
      className="animate-fade-in relative rounded-3xl border bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 opacity-0 shadow-xl shadow-black/30 sm:p-10"
      style={{
        animationDelay: `${index * 80}ms`,
        borderColor: accentBorder,
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p
            className="text-xs font-bold uppercase tracking-[0.25em]"
            style={{ color: accent }}
          >
            FIFA World Cup · {campaign.year}
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-zinc-50 sm:text-3xl">
            {campaign.hostCountry}
          </h2>
        </div>
        <span
          className="rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-zinc-200"
          style={{ borderColor: accentBorder, backgroundColor: accentMuted }}
        >
          {campaign.result}
        </span>
      </div>

      <p className="mt-4 text-sm font-semibold text-zinc-300">
        Head Coach:{" "}
        <span className="font-bold text-zinc-50">{campaign.headCoach}</span>
      </p>

      <p className="mt-5 text-sm leading-relaxed text-zinc-400 sm:text-base">
        {campaign.story}
      </p>

      <p
        className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider"
        style={{ borderColor: accentBorder, color: accent }}
      >
        <span aria-hidden>🍁</span>
        {campaign.milestone}
      </p>

      <section aria-labelledby={`bench-${campaign.id}`} className="mt-8">
        <h3
          id={`bench-${campaign.id}`}
          className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500"
        >
          Behind the Bench
        </h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {campaign.auxiliares.map((staff) => (
            <li key={`${campaign.id}-${staff.name}`}>
              <span
                className="inline-flex rounded-full border px-3 py-1.5 text-xs font-medium text-zinc-300"
                style={{ borderColor: accentBorder, backgroundColor: accentMuted }}
              >
                <span className="font-bold text-zinc-100">{staff.role}</span>
                <span className="mx-1.5 text-zinc-600">—</span>
                {staff.name}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ squad: string }>;
}) {
  const { squad } = await params;
  if (!isSquad(squad)) notFound();

  const config = SQUAD_CONFIG[squad];
  const campaigns = [...config.campaigns].sort((a, b) => a.year - b.year);

  return (
    <div className="flex min-h-full flex-col bg-zinc-950 text-zinc-50">
      <header className="relative overflow-hidden border-b border-zinc-800/80">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: config.gradient }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 transition-colors hover:text-zinc-200"
          >
            ← Back to The Mosaic Pitch
          </Link>

          <p
            className="animate-fade-in mt-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em]"
            style={{
              borderColor: config.accentBorder,
              backgroundColor: config.accentMuted,
              color: config.accent,
            }}
          >
            <span aria-hidden>{config.emblem}</span>
            {config.label}
          </p>

          <h1 className="animate-fade-in mt-5 max-w-3xl text-4xl font-black tracking-tight text-zinc-50 sm:text-5xl">
            {config.title}
          </h1>
          <p
            className="animate-fade-in mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
            style={{ animationDelay: "120ms" }}
          >
            {config.subtitle}
          </p>

          <nav
            className="animate-fade-in mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: "200ms" }}
            aria-label="Squad history navigation"
          >
            {(["men", "women"] as const).map((key) => (
              <Link
                key={key}
                href={`/history/${key}`}
                className="rounded-full border px-5 py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5"
                style={
                  key === squad
                    ? {
                        borderColor: config.accentBorder,
                        backgroundColor: config.accentMuted,
                        color: config.accent,
                      }
                    : {
                        borderColor: "rgb(63 63 70)",
                        color: "rgb(212 212 216)",
                      }
                }
              >
                {key === "men" ? "Men's History" : "Women's History"}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16 sm:px-10 lg:px-16">
        <ol className="relative space-y-8 before:absolute before:bottom-0 before:left-[1.125rem] before:top-0 before:w-px before:bg-zinc-800 sm:before:left-6">
          {campaigns.map((campaign, index) => (
            <li key={campaign.id} className="relative pl-12 sm:pl-16">
              <span
                className="absolute left-0 top-10 flex h-9 w-9 items-center justify-center rounded-full border text-xs font-black sm:left-3"
                style={{
                  borderColor: config.accentBorder,
                  backgroundColor: config.accentMuted,
                  color: config.accent,
                }}
                aria-hidden
              >
                {campaign.year.toString().slice(-2)}
              </span>
              <CampaignCard
                campaign={campaign}
                accent={config.accent}
                accentBorder={config.accentBorder}
                accentMuted={config.accentMuted}
                index={index}
              />
            </li>
          ))}
        </ol>
      </main>

      <SiteFooter />
    </div>
  );
}
