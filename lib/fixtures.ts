import generated from "./fixtures.generated.json";

export type League = "CPL" | "MLS";
export type FixtureStatus = "scheduled" | "live" | "finished" | "postponed";

export type Fixture = {
  id: string;
  date: string;
  time: string;
  home: string;
  away: string;
  league: League;
  venue: string;
  status: FixtureStatus;
  homeScore?: number;
  awayScore?: number;
  sourceId?: number;
  updatedAt?: string;
  note?: string;
};

export type FixturesFile = {
  updatedAt: string;
  fixtures: Fixture[];
};

/** FIFA World Cup 2026 runs June 11 – July 19 across North America. */
export const WORLD_CUP_START = "2026-06-11";
export const WORLD_CUP_END = "2026-07-19";

/** MLS pauses May 25 – July 16 for the World Cup (mlssoccer.com). */
export const MLS_PAUSE_UNTIL = "2026-07-16";

/** CPL pauses June 11 – June 26, then resumes during the World Cup (cplsoccer.com). */
export const CPL_PAUSE_START = "2026-06-11";
export const CPL_PAUSE_END = "2026-06-26";

export const TORONTO_TIME_ZONE = "America/Toronto";

const generatedFile = generated as FixturesFile;

/**
 * Club fixtures sourced from the weekly API-Football update.
 * Editorial notes stay in the dictionaries, keyed by fixture id.
 */
export const FIXTURES: Fixture[] = generatedFile.fixtures;
export const FIXTURES_UPDATED_AT = generatedFile.updatedAt;

/** @deprecated Use FIXTURES. Kept so older imports keep working. */
export const UPCOMING_FIXTURES = FIXTURES;

export function todayInToronto(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TORONTO_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  return `${year}-${month}-${day}`;
}

export function addDays(isoDate: string, days: number): string {
  const date = new Date(`${isoDate}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function hasScore(fixture: Fixture): boolean {
  return (
    typeof fixture.homeScore === "number" &&
    typeof fixture.awayScore === "number"
  );
}

export function isUpcomingFixture(fixture: Fixture, today: string): boolean {
  if (fixture.status === "finished") return false;
  if (fixture.status === "live" || fixture.status === "postponed") return true;
  return fixture.date >= today;
}

export function isRecentResult(fixture: Fixture, today: string): boolean {
  if (fixture.status !== "finished") return false;
  return fixture.date <= today;
}

export function formatFixtureDate(isoDate: string): string {
  const date = new Date(`${isoDate}T12:00:00`);
  return date.toLocaleDateString("en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function isMlsPausedOn(date: string): boolean {
  return date < MLS_PAUSE_UNTIL;
}

export function isCplPausedOn(date: string): boolean {
  return date >= CPL_PAUSE_START && date <= CPL_PAUSE_END;
}

export function isDuringWorldCup(date: string): boolean {
  return date >= WORLD_CUP_START && date <= WORLD_CUP_END;
}
