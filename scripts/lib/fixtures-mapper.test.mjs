import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import {
  mapApiFixtures,
  mapLeague,
  mapStatus,
  mergeFixtures,
  normalizeClubName,
  pruneOldResults,
  shiftIsoDate,
  windowRange,
} from "./fixtures-mapper.mjs";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const SAMPLE_PATH = path.join(DIR, "../fixtures/api-football-sample.json");
const EXPECTED_PATH = path.join(DIR, "../fixtures/mapped-sample.json");

const UPDATED_AT = "2026-09-17T12:00:00.000Z";

describe("fixtures mapper", () => {
  it("normalizes Canadian club aliases including accents", () => {
    assert.equal(normalizeClubName("CF Montreal"), "CF Montréal");
    assert.equal(normalizeClubName("Atletico Ottawa"), "Atlético Ottawa");
    assert.equal(normalizeClubName("Vancouver Whitecaps"), "Vancouver Whitecaps FC");
    assert.equal(normalizeClubName("Chicago Fire FC"), "Chicago Fire FC");
  });

  it("maps API status codes", () => {
    assert.equal(mapStatus("NS"), "scheduled");
    assert.equal(mapStatus("FT"), "finished");
    assert.equal(mapStatus("2H"), "live");
    assert.equal(mapStatus("PST"), "postponed");
  });

  it("maps league ids and names", () => {
    assert.equal(mapLeague({ id: 253, name: "Major League Soccer" }), "MLS");
    assert.equal(mapLeague({ id: 479, name: "Canadian Premier League" }), "CPL");
    assert.equal(mapLeague({ id: 39, name: "Premier League" }), null);
  });

  it("maps a snapshot payload onto site fixtures", async () => {
    const sample = JSON.parse(await readFile(SAMPLE_PATH, "utf8"));
    const mapped = [
      ...mapApiFixtures(sample.mls, UPDATED_AT),
      ...mapApiFixtures(sample.cpl, UPDATED_AT),
    ].sort((a, b) => a.id.localeCompare(b.id));

    const expected = JSON.parse(await readFile(EXPECTED_PATH, "utf8"));
    assert.deepEqual(mapped, expected);
  });

  it("drops MLS matches that do not involve a Canadian club", async () => {
    const sample = JSON.parse(await readFile(SAMPLE_PATH, "utf8"));
    const mapped = mapApiFixtures(sample.mls, UPDATED_AT);
    assert.equal(
      mapped.some(
        (fixture) =>
          fixture.home === "Chicago Fire FC" &&
          fixture.away === "New York City FC",
      ),
      false,
    );
    assert.equal(mapped.length, 3);
  });

  it("preserves editorial ids when date and teams still match", () => {
    const incoming = [
      {
        id: "api-479-880001",
        date: "2026-07-04",
        time: "19:00 ET",
        home: "Atlético Ottawa",
        away: "Cavalry FC",
        league: "CPL",
        venue: "TD Place, Ottawa",
        status: "finished",
        homeScore: 3,
        awayScore: 1,
        sourceId: 880001,
        updatedAt: UPDATED_AT,
      },
    ];
    const existing = [
      {
        id: "cpl-july-4",
        date: "2026-07-04",
        time: "19:00 ET",
        home: "Atlético Ottawa",
        away: "Cavalry FC",
        league: "CPL",
        venue: "TD Place, Ottawa",
        status: "finished",
      },
      {
        id: "mls-nov-7-van",
        date: "2026-11-07",
        time: "13:00 ET",
        home: "CF Montréal",
        away: "Vancouver Whitecaps FC",
        league: "MLS",
        venue: "Stade Saputo, Montréal",
        status: "scheduled",
      },
    ];

    const merged = mergeFixtures(incoming, existing, "2026-09-17");
    assert.equal(merged.find((fixture) => fixture.sourceId === 880001)?.id, "cpl-july-4");
    assert.ok(merged.some((fixture) => fixture.id === "mls-nov-7-van"));
  });

  it("prunes finished matches older than the results window", () => {
    const fixtures = [
      {
        id: "old",
        date: "2026-07-04",
        status: "finished",
      },
      {
        id: "recent",
        date: "2026-09-10",
        status: "finished",
      },
      {
        id: "future",
        date: "2026-10-10",
        status: "scheduled",
      },
    ];
    const pruned = pruneOldResults(fixtures, "2026-09-17", 21);
    assert.deepEqual(
      pruned.map((fixture) => fixture.id),
      ["recent", "future"],
    );
  });

  it("computes a 21-day lookback and 60-day lookahead window", () => {
    assert.deepEqual(windowRange("2026-09-17", 21, 60), {
      from: "2026-08-27",
      to: "2026-11-16",
    });
    assert.equal(shiftIsoDate("2026-09-17", -21), "2026-08-27");
  });
});
