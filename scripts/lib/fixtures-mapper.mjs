/**
 * Maps API-Football fixture payloads onto The Mosaic Pitch fixture shape.
 * Pure module — no I/O — so it can be snapshot-tested without a live API key.
 */

export const MLS_LEAGUE_ID = 253;
export const CPL_LEAGUE_ID = 479;
export const MLS_CANADIAN_CLUBS = [
  "CF Montréal",
  "Toronto FC",
  "Vancouver Whitecaps FC",
];

const CLUB_ALIASES = {
  "atletico ottawa": "Atlético Ottawa",
  "atlético ottawa": "Atlético Ottawa",
  "cavalry": "Cavalry FC",
  "cavalry fc": "Cavalry FC",
  "edmonton": "FC Edmonton",
  "fc edmonton": "FC Edmonton",
  "forge": "Forge FC",
  "forge fc": "Forge FC",
  "halifax wanderers": "Halifax Wanderers FC",
  "halifax wanderers fc": "Halifax Wanderers FC",
  "pacific": "Pacific FC",
  "pacific fc": "Pacific FC",
  "valour": "Valour FC",
  "valour fc": "Valour FC",
  "vancouver fc": "Vancouver FC",
  "york 9": "York United FC",
  "york united": "York United FC",
  "york united fc": "York United FC",
  "cf montreal": "CF Montréal",
  "cf montréal": "CF Montréal",
  "club de foot montreal": "CF Montréal",
  "club de foot montréal": "CF Montréal",
  "montreal impact": "CF Montréal",
  "toronto fc": "Toronto FC",
  "vancouver whitecaps": "Vancouver Whitecaps FC",
  "vancouver whitecaps fc": "Vancouver Whitecaps FC",
  "whitecaps": "Vancouver Whitecaps FC",
};

const PACIFIC_CLUBS = new Set([
  "Vancouver Whitecaps FC",
  "Pacific FC",
  "Vancouver FC",
]);

const PACIFIC_VENUE_RE =
  /vancouver|langley|langford|burnaby|victoria|surrey|abbotsford/i;

/** @param {string | undefined} name */
export function normalizeClubName(name) {
  if (!name) return "";
  const trimmed = name.replace(/\s+/g, " ").trim();
  const alias = CLUB_ALIASES[normalizeKey(trimmed)];
  return alias ?? trimmed;
}

/** @param {string} value */
function normalizeKey(value) {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[.]/g, "")
    .trim();
}

/**
 * @param {string} home
 * @param {string} away
 * @param {string} venue
 */
export function usesPacificTime(home, away, venue) {
  return (
    PACIFIC_CLUBS.has(home) ||
    PACIFIC_CLUBS.has(away) ||
    PACIFIC_VENUE_RE.test(venue)
  );
}

/** @param {string | undefined} shortStatus */
export function mapStatus(shortStatus) {
  switch (shortStatus) {
    case "FT":
    case "AET":
    case "PEN":
      return "finished";
    case "1H":
    case "HT":
    case "2H":
    case "ET":
    case "BT":
    case "P":
    case "LIVE":
    case "INT":
    case "SUSP":
      return "live";
    case "PST":
    case "CANC":
    case "ABD":
    case "AWD":
    case "WO":
      return "postponed";
    default:
      return "scheduled";
  }
}

/**
 * @param {{ id?: number, name?: string } | undefined} league
 * @returns {"CPL" | "MLS" | null}
 */
export function mapLeague(league) {
  if (!league) return null;
  if (league.id === MLS_LEAGUE_ID || /^mls$|major league soccer/i.test(league.name ?? "")) {
    return "MLS";
  }
  if (
    league.id === CPL_LEAGUE_ID ||
    /canadian premier/i.test(league.name ?? "")
  ) {
    return "CPL";
  }
  return null;
}

/**
 * @param {string} isoDate
 * @param {string} timeZone
 */
export function calendarDateInZone(isoDate, timeZone) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(isoDate));
}

/**
 * @param {string} isoDate
 * @param {string} timeZone
 * @param {"ET" | "PT"} abbrev
 */
export function formatKickoff(isoDate, timeZone, abbrev) {
  const formatted = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(isoDate));
  return `${formatted} ${abbrev}`;
}

/**
 * @param {string} home
 * @param {string} away
 */
function matchKey(date, home, away) {
  return `${date}|${normalizeKey(home)}|${normalizeKey(away)}`;
}

/**
 * @param {object} item
 * @param {string} updatedAt
 */
export function mapApiFixture(item, updatedAt) {
  const league = mapLeague(item.league);
  if (!league) return null;

  const home = normalizeClubName(item.teams?.home?.name);
  const away = normalizeClubName(item.teams?.away?.name);
  if (!home || !away) return null;

  if (league === "MLS" && !isCanadianMlsMatch(home, away)) {
    return null;
  }

  const venueName = item.fixture?.venue?.name ?? "";
  const venueCity = item.fixture?.venue?.city ?? "";
  const venue = [venueName, venueCity].filter(Boolean).join(", ") || "TBD";
  const pacific = usesPacificTime(home, away, `${venueName} ${venueCity}`);
  const timeZone = pacific ? "America/Vancouver" : "America/Toronto";
  const abbrev = pacific ? "PT" : "ET";
  const isoDate = item.fixture?.date;
  if (!isoDate) return null;

  const status = mapStatus(item.fixture?.status?.short);
  const sourceId = item.fixture?.id;
  const date = calendarDateInZone(isoDate, timeZone);

  const fixture = {
    id: sourceId ? `api-${item.league.id}-${sourceId}` : `api-${league}-${date}-${home}-${away}`,
    date,
    time: formatKickoff(isoDate, timeZone, abbrev),
    home,
    away,
    league,
    venue,
    status,
    updatedAt,
  };

  if (typeof sourceId === "number") {
    fixture.sourceId = sourceId;
  }

  const homeGoals = item.goals?.home;
  const awayGoals = item.goals?.away;
  if (
    (status === "finished" || status === "live") &&
    typeof homeGoals === "number" &&
    typeof awayGoals === "number"
  ) {
    fixture.homeScore = homeGoals;
    fixture.awayScore = awayGoals;
  }

  return fixture;
}

function isCanadianMlsMatch(home, away) {
  return MLS_CANADIAN_CLUBS.includes(home) || MLS_CANADIAN_CLUBS.includes(away);
}

/**
 * @param {object[]} apiItems
 * @param {string} updatedAt
 */
export function mapApiFixtures(apiItems, updatedAt) {
  const mapped = [];
  for (const item of apiItems) {
    const fixture = mapApiFixture(item, updatedAt);
    if (fixture) mapped.push(fixture);
  }
  return mapped;
}

/**
 * Keep editorial ids when date + teams still match, or when sourceId matches.
 * Keep existing upcoming fixtures the API window did not return.
 *
 * @param {object[]} incoming
 * @param {object[]} existing
 * @param {string} today
 */
export function mergeFixtures(incoming, existing, today) {
  const existingBySource = new Map();
  const existingByKey = new Map();
  for (const fixture of existing) {
    if (typeof fixture.sourceId === "number") {
      existingBySource.set(fixture.sourceId, fixture);
    }
    existingByKey.set(matchKey(fixture.date, fixture.home, fixture.away), fixture);
  }

  const merged = [];
  const seenKeys = new Set();
  const seenIds = new Set();

  for (const fixture of incoming) {
    const key = matchKey(fixture.date, fixture.home, fixture.away);
    const previous =
      (typeof fixture.sourceId === "number"
        ? existingBySource.get(fixture.sourceId)
        : undefined) ?? existingByKey.get(key);

    const next = previous
      ? {
          ...fixture,
          id: previous.id,
        }
      : fixture;

    merged.push(next);
    seenKeys.add(key);
    seenIds.add(next.id);
  }

  for (const fixture of existing) {
    const key = matchKey(fixture.date, fixture.home, fixture.away);
    if (seenKeys.has(key) || seenIds.has(fixture.id)) continue;
    if (fixture.status === "finished" || fixture.date < today) continue;
    merged.push(fixture);
  }

  merged.sort(
    (a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id),
  );
  return merged;
}

/**
 * @param {string} today
 * @param {number} pastDays
 * @param {number} futureDays
 */
export function windowRange(today, pastDays, futureDays) {
  return {
    from: shiftIsoDate(today, -pastDays),
    to: shiftIsoDate(today, futureDays),
  };
}

/** @param {string} isoDate @param {number} days */
export function shiftIsoDate(isoDate, days) {
  const date = new Date(`${isoDate}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/**
 * Drop finished matches older than the results window.
 * @param {object[]} fixtures
 * @param {string} today
 * @param {number} pastDays
 */
export function pruneOldResults(fixtures, today, pastDays) {
  const cutoff = shiftIsoDate(today, -pastDays);
  return fixtures.filter((fixture) => {
    if (fixture.status !== "finished") return true;
    return fixture.date >= cutoff;
  });
}
