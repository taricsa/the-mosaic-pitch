import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HistorySquadPageContent from "@/components/HistorySquadPageContent";
import { getDictionary } from "@/lib/dictionaries";

type Squad = "men" | "women";

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

  const copy = getDictionary("en").historySquadPage.squads[squad];
  return {
    title: copy.title,
    description: copy.subtitle,
  };
}

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ squad: string }>;
}) {
  const { squad } = await params;
  if (!isSquad(squad)) notFound();

  return <HistorySquadPageContent squad={squad} />;
}
