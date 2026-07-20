# Contract review: relationship-expansion content + achievements engine

Reviewed 2026-07-20 by reading only. No build, tsc, npm, dev server, git, or eas was run.

## Scope

New files reviewed:

- `src/lib/content/tracks-early.ts`
- `src/lib/content/tracks-queer.ts`
- `src/lib/content/tracks-repair.ts`
- `src/lib/content/tracks-difference.ts`
- `src/lib/content/tracks-season.ts`
- `src/lib/content/cards-rel.ts`
- `src/lib/content/challenges-rel.ts`
- `src/lib/content/stories-rel.ts`
- `src/lib/content/daily-rel.ts`
- `src/lib/content/achievements.ts`
- `src/lib/content/relationships.ts`

Checked against: `tracks.ts` (Track, TrackSession), `cards.ts` (Deck, PromptCard),
`challenges.ts` (Challenge, ChallengeDay), `stories.ts` (Story),
`daily.ts` (DailyQuestion, DailyCategory), plus the engine in `src/lib/achievements.ts`
and the consumer screen `src/app/achievements.tsx`, against `src/lib/store.ts`.

## Fixes applied: 14

### Engine wiring, 2 fixes (`src/lib/achievements.ts`)

1. **`track-session` could never fire.** The rule matched
   `topicTitle.toLowerCase().includes("track")` or a journey step id starting with
   `"track-"`. Neither exists. `src/app/(tabs)/talk.tsx:285` records
   `topicTitle: source?.title`, and for a track that source title is built at
   `talk.tsx:163` as `` `${track.title}: ${s.title}` ``. No track title in
   `tracks.ts`, `tracks-extra.ts`, or any of the five new track files contains the
   word "track", and `journey.ts` only ever issues step ids `s1-*` through `s5-*`
   (`markStep` is called exclusively with `step.id` from `journey.tsx:194` and
   `:203`). The rule was rewritten to match the real recorded title shape against
   the live `tracks` array, which now also covers all fourteen new tracks:

   ```ts
   "track-session": (c) =>
     c.sessions.some((s) => tracks.some((t) => (s.topicTitle || "").startsWith(`${t.title}: `))),
   ```

   This adds `import { tracks } from "./content/tracks";`. No import cycle:
   `content/tracks.ts` pulls the five new files in with value imports, and each of
   those imports `Track` back with `import type`, which is erased.

2. **`called-break` could never fire, and the dead rule also blocked the manual
   claim.** The rule read `c.journey.doneSteps.includes("called-break")`, but
   `callBreak()` in `talk.tsx:274` only sets local component state and writes
   nothing to storage. Worse, because `isAutoDetected()` returns true for any id
   present in `RULES`, the achievements screen hid the "We did this" button for it
   (`achievements.tsx:136`), making the achievement permanently unreachable by
   either path. The dead rule was removed so it falls back to the honor-system
   claim the file already documents, with a comment explaining why it must stay out.

### Achievement copy that claimed more than the engine observes, 12 fixes (`src/lib/content/achievements.ts`)

Rule 8 in that file's own header is binding: "Copy says 'you logged,' 'you wrote,'
'you marked.' It never claims to have observed real life." Twelve `earned` lines
described actions the rule does not test. Each was rewritten to state exactly what
the rule observes. Every `title`, `tier`, `icon`, `solo`, and `hue` was left alone,
so nothing downstream changes shape.

| id | was claimed | what the rule actually tests |
| --- | --- | --- |
| `told-truth-pulse` | "logged a pulse check that read worse than your last one" | `pulses.length >= 2`. Comparing readings would mean reading a pulse SCORE, which rule 1 forbids, so the copy was fixed rather than the rule. |
| `both-directions` | "a repair has been offered and accepted, both ways" | `daysBoth >= 5`, five days both partners answered the daily question. `earned` and `why` both rewritten. |
| `sixty-six-days` | "practiced one small move on sixty six days" | `daysSince(profile.createdAt) >= 66`, elapsed days since setup, not days practiced. |
| `four-weeks-in` | "done something in here in four different weeks" | `daysSince(profile.createdAt) >= 28`. |
| `four-weeks-ritual` | "kept your weekly check-in going across four weeks" | `plan.rituals.length >= 1 && daysSince >= 28`, a ritual saved and four weeks elapsed. |
| `stayed-in-room` | "both chose to finish a conversation you each marked as hard" | `sessions.length >= 5`. Nothing marks a session as hard. |
| `ten-yeses` | "turned toward ten small moments where they were reaching" | `dailyAnswers >= 10`. Bids are not observable. `why` extended, not replaced. |
| `came-back-to-it` | "reopened the conversation you had paused" | `sessions.length >= 2`. `earned` and `why` rewritten. |
| `fight-autopsy` | "both walked through an old fight without starting it again" | `challengesDone` includes `clean-fight` or `soft-repair`, i.e. a finished 7 day challenge. |
| `first-week` | "came back and did something else in your first week" | `daysSince(profile.createdAt) >= 7`. |
| `first-step` | "opened your first thing in here" | `Boolean(profile)`, onboarding finished. |
| `both-quiz` | "read each other's results" | both lens ids stored. Reading is not observable. |

Twelve entries, counted as one fix each. Five of them
(`told-truth-pulse`, `both-directions`, `came-back-to-it`, `ten-yeses`,
`sixty-six-days`) also needed their `why` line adjusted, since the rationale had
been written for the claim rather than for the rule.

Safety-adjacent entries were not touched. `asked-for-help` still fires only on the
professional-help card, and nothing in this file counts, gates, or gamifies the
safety screen, the domestic-violence gate, the crisis resources, or any track's
red flags.

## Verified clean, no change needed

**Ethics invariants in the engine.** No rule reads a pulse score. The only two
references to pulses are `c.pulses.length >= 1` and `c.pulses.length >= 2`. There is
no `.scores` access, no comparison between partners, no streak, and `syncEarned`
remains additive only, so nothing can be revoked.

**RULES to content.** All 18 remaining rule ids exist in `content/achievements.ts`.
The 22 unrule'd entries are honor-system and now correctly show the claim button.
Both challenge ids referenced by `fight-autopsy` resolve: `soft-repair` in
`challenges.ts`, `clean-fight` in `challenges-rel.ts`.

**Required fields, every object, every file.** Parsed each exported array and
compared top-level keys against the contract type. No missing field, no extra field,
no duplicate key, on any object:

- Track x 14 across the five new files, all nine fields; 91 TrackSession objects, all
  three fields; 42 `feelings` entries, all `{ label, body }`; every `principles`,
  `planSeeds`, and `seekHelp` a non-empty string array (6 principles each, 4 to 5
  plan seeds, 6 to 7 seekHelp entries each).
- Deck x 3, all seven fields; 63 PromptCard objects, `text` always present,
  `followUp` the only optional.
- Challenge x 4, all five fields; 28 ChallengeDay objects, all three fields.
- Story x 8, all ten fields; 27 `whatHelped` entries, all `{ practice, how }`.
- DailyQuestion x 60, exactly `{ text, category }`.
- Achievement x 40, all eight fields.
- RelationshipDef x 9, all six fields, one per `RelationshipType` member, no gaps.

**String unions.** `DailyCategory`: all 60 categories in `daily-rel.ts` are members
of the eight-value union. Deck `vibe`: `gentle`, `deep`, `repair`, all valid.
Achievement `hue`: only `moss`, `honey`, `sky`, `plum`, `rose`, `ember`, which
matches `Hue` in `src/lib/theme.ts` exactly, so `p.hues[a.hue]` in
`achievements.tsx` is safe. Achievement `tier`: only `first`, `building`, `deep`,
which matches `TIER_LABEL` in the screen.

**Duplicate ids and slugs.** Every id and slug was extracted and cross-checked
against the pre-existing files it merges into. Zero collisions.

- Track slugs, 25 total: `affair`, `pregnancy-loss`, `grief`, `illness`,
  `money-crisis`, `new-baby` (tracks.ts); `desire-gap`, `blended`, `faith-gap`,
  `caregiving`, `scarcity` (tracks-extra.ts); `deciding-together`, `long-distance`,
  `moving-in` (early); `outness-gap`, `chosen-family` (queer); `reconciling`,
  `coparenting-repair`, `digital-trust` (repair); `wired-differently`,
  `two-cultures`, `jealousy` (difference); `recovery-trust`, `reintegration`,
  `empty-nest` (season). 6 + 5 + 3 + 2 + 3 + 3 + 3 = 25, all distinct.
- Deck ids, 9: `first-steps`, `go-deeper`, `lighter`, `repair`, `desire`, `dreams`,
  `early-days`, `the-distance`, `back-from-the-brink`.
- Challenge ids, 8: `turning-toward`, `appreciation`, `soft-repair`, `last-line`,
  `seven-calls`, `new-pattern`, `low-spoons`, `clean-fight`.
- Story ids, 23: the ten in `stories.ts`, the five in `stories-extra.ts`, plus
  `moving-in`, `long-distance`, `outness-gap`, `coparent-alliance`, `second-try`,
  `wiring-gap`, `intercultural-pressure`, `recovery-trust`.
- Achievement ids, 40, all distinct.
- Daily questions: 60 new question texts, none duplicated within `daily-rel.ts` and
  none matching any of the 56 in `daily.ts`. This matters because `daily.ts` dedupes
  on `text`, not on an id.

Four story ids intentionally match a track slug (`moving-in`, `long-distance`,
`outness-gap`, `recovery-trust`). Different namespaces, different lookup functions,
no collision. Left as is.

**Ionicons glyph names.** All 40 achievement icons and all 9 `relationships.ts`
icons were checked against
`node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/Ionicons.json`.
Every name resolves. No invented glyphs.

**Truncation, placeholders, syntax.** No `TODO`, `TBD`, `FIXME`, `placeholder`, or
`XXX` in any of the eleven files. Brace, bracket, and paren balance is zero in all
eleven with string and comment contents skipped, and no unterminated string literal.
Every file ends with a complete exported array.

**Merge points.** Each new module is picked up by the file that owns its type:
`tracks.ts` spreads all five track arrays into the idempotent slug-guarded loop,
`cards.ts` takes `extraDecks`, `challenges.ts` takes `extraChallenges`,
`stories.ts` takes `relStories`, `daily.ts` takes `extraDailyQuestions`. Every new
track therefore renders on `/tracks` and resolves through `getTrack`.

**Type-only back-imports.** All ten content files import their contract type with
`import type`, so the apparent cycle with the parent module is erased at compile and
there is no runtime cycle to order-fault.

**`relationships.ts` against `store.ts`.** `Profile` imports `RelationshipType`,
`Together`, `LivingSituation` as types; all three unions exist and all three profile
fields are optional, so profiles written before the expansion still parse.
`togetherLabels` and `livingLabels` are exhaustive `Record`s over their unions.
`frameFor` returns on every branch. `SAFETY_FRAME` is a separate constant that
`frameFor` cannot reach, which keeps safety copy from being personalized by
relationship type.

**Unused but harmless exports.** `getExtraDeck`, `getExtraChallenge`, and
`relStoriesNote` have no consumers yet. `tsconfig.json` sets `strict: true` but not
`noUnusedLocals`, so these do not error. Left in place for the pending onboarding
work.

## Not fixed, flagged for the owner

`called-break` is now honor-system. If you would rather have it detected, the
session wizard needs to persist the fact that a break was called, for example a new
`mend.calledBreak` key written from `callBreak()` in `src/app/(tabs)/talk.tsx` and a
matching getter in `store.ts`, then a rule reading it. That is a UI and store
change, outside the scope of this review, so it was not made.
