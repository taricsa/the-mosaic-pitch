export type Fixture = {
  id: string;
  date: string;
  time: string;
  home: string;
  away: string;
  league: "CPL" | "MLS";
  venue: string;
  note?: string;
};

/** FIFA World Cup 2026 runs June 11 – July 19 across North America. */
export const WORLD_CUP_START = "2026-06-11";
export const WORLD_CUP_END = "2026-07-19";

/** MLS pauses May 25 – July 16 for the World Cup (mlssoccer.com). */
export const MLS_PAUSE_UNTIL = "2026-07-16";

/** CPL pauses June 11 – June 26, then resumes during the World Cup (cplsoccer.com). */
export const CPL_PAUSE_START = "2026-06-11";
export const CPL_PAUSE_END = "2026-06-26";

/**
 * Verified fixtures only — sourced from CPL/MLS 2026 schedule announcements.
 * Do not add placeholder matches during league pauses.
 */
export const UPCOMING_FIXTURES: Fixture[] = [
  {
    id: "cpl-july-4",
    date: "2026-07-04",
    time: "19:00 ET",
    home: "Atlético Ottawa",
    away: "Cavalry FC",
    league: "CPL",
    venue: "TD Place, Ottawa",
    note: "2025 CPL Final rematch — Nathan Ingham returns to Ottawa.",
  },
  {
    id: "mls-july-16-mtl",
    date: "2026-07-16",
    time: "19:30 ET",
    home: "CF Montréal",
    away: "Toronto FC",
    league: "MLS",
    venue: "Stade Saputo, Montréal",
    note: "MLS returns from World Cup break — 100% Canadian clash.",
  },
  {
    id: "mls-july-16-van",
    date: "2026-07-16",
    time: "17:30 PT",
    home: "Chicago Fire FC",
    away: "Vancouver Whitecaps FC",
    league: "MLS",
    venue: "Soldier Field, Chicago",
    note: "Whitecaps return from World Cup break on the road.",
  },
  {
    id: "mls-july-25-mtl",
    date: "2026-07-25",
    time: "19:30 ET",
    home: "CF Montréal",
    away: "Inter Miami CF",
    league: "MLS",
    venue: "Stade Saputo, Montréal",
  },
  {
    id: "mls-july-25-van",
    date: "2026-07-25",
    time: "17:30 PT",
    home: "Minnesota United FC",
    away: "Vancouver Whitecaps FC",
    league: "MLS",
    venue: "Allianz Field, Saint Paul",
  },
  {
    id: "mls-oct-10-tor",
    date: "2026-10-10",
    time: "19:30 ET",
    home: "Toronto FC",
    away: "CF Montréal",
    league: "MLS",
    venue: "BMO Field, Toronto",
    note: "Canadian Classique — second meeting of the season.",
  },
  {
    id: "mls-nov-7-van",
    date: "2026-11-07",
    time: "13:00 ET",
    home: "CF Montréal",
    away: "Vancouver Whitecaps FC",
    league: "MLS",
    venue: "Stade Saputo, Montréal",
    note: "Decision Day — final matchday of the 2026 MLS regular season.",
  },
];

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
