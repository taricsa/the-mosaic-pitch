# Updating match data

The Mosaic Pitch stores club fixtures as static JSON. A weekly GitHub Action pulls Canadian CPL and MLS matches from [API-Football](https://www.api-football.com/) and opens a pull request. Merging that PR rebuilds the Vercel site.

## What gets updated

| Field | Source |
| --- | --- |
| Date, kickoff time, venue | API-Football `/fixtures` |
| Score | Final or in-progress goals |
| Status | scheduled, live, finished, postponed |
| Clubs | CPL (all clubs) and MLS matches involving CF Montréal, Toronto FC, or Vancouver Whitecaps |

Editorial notes in `lib/dictionaries/index.ts` are **not** overwritten. They stay attached when a generated match still uses an existing fixture id (`cpl-july-4`, `mls-oct-10-tor`, …).

Window each run:

- Finished matches from the last **21 days**
- Upcoming matches for the next **60 days**
- Existing upcoming fixtures already in the file are kept even if the API window missed them

## One-time setup

1. Create a free key at [dashboard.api-football.com](https://dashboard.api-football.com/).
2. In the GitHub repo, add an Actions secret named **`API_FOOTBALL_KEY`**.
3. Run **Actions → Update fixtures → Run workflow** once to backfill recent scores.

Until the secret is set, the Monday job fails and leaves `lib/fixtures.generated.json` unchanged. The key is only needed in GitHub Actions — not as a Vercel env var — because the live site reads the committed JSON.

## Local run

```bash
# Mapper tests (no API key)
npm test

# Replay the checked-in sample payload
npm run update-fixtures -- --dry-run --from-snapshot scripts/fixtures/api-football-sample.json

# Live fetch (writes lib/fixtures.generated.json)
API_FOOTBALL_KEY=your_key npm run update-fixtures
```

`--dry-run` prints JSON to stdout and does not write the file.

If the API errors, the script exits without overwriting the last good file. If a weekly run maps **zero** Canadian-club fixtures (typical in the off-season), it logs a skip message and exits 0 so GitHub Actions stays green and existing data is left in place.

## Weekly PR

The workflow `.github/workflows/update-fixtures.yml` runs every Monday at 14:00 UTC (and on demand). It commits `lib/fixtures.generated.json` on `chore/weekly-fixtures` and opens a PR. Review dates and scores, then merge so Vercel can deploy.

League ids used by the job are listed in `scripts/api-football-ids.json` (MLS `253`, Canadian Premier League `479`).
