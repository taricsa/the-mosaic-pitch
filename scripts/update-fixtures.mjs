#!/usr/bin/env node
/**
 * Pull CPL + MLS Canadian-club fixtures from API-Football and write
 * lib/fixtures.generated.json. Aborts without writing on API or empty-payload errors.
 *
 * Usage:
 *   API_FOOTBALL_KEY=... node scripts/update-fixtures.mjs
 *   node scripts/update-fixtures.mjs --from-snapshot scripts/fixtures/api-football-sample.json
 *   node scripts/update-fixtures.mjs --dry-run --from-snapshot scripts/fixtures/api-football-sample.json
 */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ids from "./api-football-ids.json" with { type: "json" };
import {
  calendarDateInZone,
  CPL_LEAGUE_ID,
  mapApiFixtures,
  mergeFixtures,
  MLS_LEAGUE_ID,
  pruneOldResults,
  windowRange,
} from "./lib/fixtures-mapper.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_PATH = path.join(ROOT, "lib/fixtures.generated.json");
const API_BASE = "https://v3.football.api-sports.io";
const PAST_DAYS = 21;
const FUTURE_DAYS = 60;

function parseArgs(argv) {
  const args = { dryRun: false, snapshot: null };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--from-snapshot") {
      args.snapshot = argv[i + 1];
      i += 1;
    }
  }
  return args;
}

function fail(message) {
  console.error(`update-fixtures: ${message}`);
  process.exit(1);
}

function todayInToronto(now = new Date()) {
  return calendarDateInZone(now.toISOString(), "America/Toronto");
}

async function loadExisting() {
  try {
    const raw = await readFile(OUTPUT_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return parsed && Array.isArray(parsed.fixtures)
      ? parsed
      : { updatedAt: "", fixtures: [] };
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return { updatedAt: "", fixtures: [] };
    }
    throw error;
  }
}

async function loadSnapshot(snapshotPath) {
  const resolved = path.resolve(ROOT, snapshotPath);
  const parsed = JSON.parse(await readFile(resolved, "utf8"));
  const mls = parsed?.mls ?? parsed?.MLS ?? [];
  const cpl = parsed?.cpl ?? parsed?.CPL ?? [];
  if (!Array.isArray(mls) || !Array.isArray(cpl)) {
    fail("snapshot must contain mls and cpl arrays");
  }
  return { mls, cpl };
}

async function apiGet(apiKey, pathname, searchParams) {
  const url = new URL(pathname, API_BASE);
  for (const [key, value] of Object.entries(searchParams)) {
    url.searchParams.set(key, String(value));
  }

  const response = await fetch(url, {
    headers: {
      "x-apisports-key": apiKey,
    },
  });

  if (!response.ok) {
    fail(`API-Football HTTP ${response.status} for ${url.pathname}`);
  }

  const body = await response.json();
  if (body?.errors && Object.keys(body.errors).length > 0) {
    fail(`API-Football error: ${JSON.stringify(body.errors)}`);
  }
  if (!Array.isArray(body?.response)) {
    fail(`API-Football returned no response array for ${url.pathname}`);
  }
  return body.response;
}

async function fetchFromApi(apiKey, from, to, season) {
  const mls = await apiGet(apiKey, "/fixtures", {
    league: MLS_LEAGUE_ID,
    season,
    from,
    to,
  });
  const cpl = await apiGet(apiKey, "/fixtures", {
    league: CPL_LEAGUE_ID,
    season,
    from,
    to,
  });
  return { mls, cpl };
}

function buildOutput(existing, mlsItems, cplItems, today) {
  const updatedAt = new Date().toISOString();
  const incoming = [
    ...mapApiFixtures(mlsItems, updatedAt),
    ...mapApiFixtures(cplItems, updatedAt),
  ];

  if (incoming.length === 0) {
    return null;
  }

  const merged = pruneOldResults(
    mergeFixtures(incoming, existing.fixtures, today),
    today,
    PAST_DAYS,
  );

  if (merged.length === 0) {
    fail("merge produced 0 fixtures — refusing to overwrite");
  }

  return {
    updatedAt,
    fixtures: merged,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const today = todayInToronto();
  const { from, to } = windowRange(today, PAST_DAYS, FUTURE_DAYS);
  const existing = await loadExisting();

  let mlsItems;
  let cplItems;

  if (args.snapshot) {
    const snapshot = await loadSnapshot(args.snapshot);
    mlsItems = snapshot.mls;
    cplItems = snapshot.cpl;
  } else {
    const apiKey = process.env.API_FOOTBALL_KEY;
    if (!apiKey) {
      fail(
        "API_FOOTBALL_KEY is not set. Add it as a GitHub Actions secret, or pass --from-snapshot for a local run.",
      );
    }
    const fetched = await fetchFromApi(apiKey, from, to, ids.season);
    mlsItems = fetched.mls;
    cplItems = fetched.cpl;
  }

  const output = buildOutput(existing, mlsItems, cplItems, today);
  if (!output) {
    console.log(
      "update-fixtures: mapped 0 fixtures in this window (off-season?). Skipping update to preserve existing data.",
    );
    return;
  }

  const serialized = `${JSON.stringify(output, null, 2)}\n`;

  if (args.dryRun) {
    process.stdout.write(serialized);
    console.error(
      `update-fixtures: dry-run mapped ${output.fixtures.length} fixtures (window ${from} → ${to})`,
    );
    return;
  }

  await writeFile(OUTPUT_PATH, serialized, "utf8");
  console.log(
    `update-fixtures: wrote ${output.fixtures.length} fixtures to lib/fixtures.generated.json (window ${from} → ${to})`,
  );
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});
