# Mend (iOS) — the journey app

The native flagship. The web repo (`../mend`) is the companion; content modules
(`src/lib/content/*`) are copied from it and stay in sync by hand for now.

## Product thesis (updated 2026-07-24)

Mend helps any two people improve their relationship: becoming more connected,
more aligned, and more in sync in everyday life, while also having trustworthy
support when something needs repair. Partners walk a **staged journey** from
small moments of attention to communication, trust, and shared direction.
Attributed relationship frameworks (Gottman, EFT, PREP, and NVC), tests, games,
guided conversations, and focused-support tracks turn insight into repeatable
habits. Mend is free, private, inclusive, and designed to strengthen the
relationship rather than maximize time in the app.

## The Journey (`src/lib/journey.ts`)

Five stages, each with 4-6 steps that deep-link into real features:

1. **Make room for each other** (1-2 wks): baseline pulse, First Steps deck,
   first session, and small daily moments of attention.
2. **Stay curious about each other** (3-4 wks): both take the lens quiz, toolkit
   basics read aloud, love-maps session, Turning Toward week, guessing game.
3. **Communicate through differences** (4-6 wks): rules-of-engagement session,
   Repair week, the unfinished-fight autopsy, Repair deck, and check-in ritual.
4. **Deepen trust and closeness** (4-8 wks): optional focused-support track,
   affection & desire session, money-history session, Appreciation week,
   five love notes.
5. **Build what comes next together** (4 wks): gridlock-dream session, Dreams
   deck, stories, rituals held four straight weeks, and a final pulse.

Mechanics: step completion is **auto-detected from stored evidence** where
possible (sessions by topic, finished challenges, both quiz results, adopted
rituals) and honor-system otherwise. Each stage gates on a **two-partner pulse
check** (5 statements, 1-5, pass-the-phone). Pulse ≤2 → professional-help
card. Completing stage 5 recognizes the partners' practiced progress and helps
them choose what to keep doing. Lower final pulse scores lead to honest guidance
to repeat what helped or involve a qualified professional, without presenting
the app as a substitute for care.

## Stack

Expo SDK 57 / Expo Router (src/app), TypeScript, StyleSheet UI kit
(`src/components/ui.tsx`), Forest palette light+dark (`src/lib/theme.ts`),
AsyncStorage local-first store (`src/lib/store.ts`), Supabase auth
(email/password + guest) on the Nalee project with namespaced `mend_profiles`
/ `mend_state` (RLS per-user; dedicated project = paid decision),
fire-and-forget state backup (`src/lib/sync.ts`), i18next chrome localization
en/es/fr/de/pt with a Settings switcher (deep content English for now, said
plainly in-app).

Safety: onboarding = deal contract → DV gate → names; safety screen with
crisis lines; per-track red flags; "not therapy" everywhere. Non-negotiable.

## Ship pipeline

- EAS project `@dr0nski/mend` (df75fb63-b64a-41f0-8e1f-cb95d922de8f), owner dr0nski
- Bundle `com.erickdronski.mend` registered; provisioning profile + team
  distribution cert validated and stored on EAS
- ASC API key **Mend CI / 3Q7BV86NXY** in `credentials/` (gitignored),
  issuer c798b8c2-6181-42a4-ae66-34e30d3c1c5e, team J9DMDH4S58
- ASC app record: **"Mend: Relationship Growth"**, subtitle
  **"Connect, grow, stay in sync"**, appId **6789373997**, SKU mend-ios
- **Local pipeline (2026-07-16, the ship path):** Xcode 26.6 + Homebrew
  CocoaPods/fastlane are installed, so `eas build --local` runs on this Mac
  at $0. Recipe: rsync the repo (exclude node_modules/ios/android) to a
  path WITHOUT spaces (RN breaks on "Personal Projects"), `npm ci`, then
  `CI=1 npx eas-cli build -p ios --profile production --local
  --non-interactive --output mend.ipa` and `npx eas-cli submit -p ios
  --profile production --path mend.ipa --non-interactive` (~15 min total).
  GitHub Actions workflow remains as backup (billing-gated).
- Version note: `appVersionSource: remote` + autoIncrement means EAS owns
  the build number; the 2026-07-16 upload landed as TestFlight build 12
  (11 was skipped). Trust TestFlight numbering, not commit messages.

## Shared Space (shipped 2026-07-09)

A shared two-person space, joined by a six-letter invite code (unambiguous
alphabet, collision-safe). The **Space tab is the app's home**: question of
the day both partners answer from their own phones (**answer-to-reveal**: a
partner's answer stays sealed until you send yours, no anchoring), a shared
"Little notes" pinboard, invite-code sharing while solo, and the full
directory of every capability organized in sections (Talk and listen / Play
together / Learn the craft / Grow together / Focused support). Tabs are now
Space · Journey · Talk · Play · Plan.

Backend: `mend_spaces`, `mend_space_members` (max 2, one space per user v1),
`mend_daily_answers` (unique per user per day), `mend_notes`. Membership
checks via a security-definer `mend_is_member()` (no RLS recursion); joins
and creation via definer RPCs `mend_create_space` / `mend_join_space` /
`mend_leave_space`, execute granted to authenticated only. Question bank:
`src/lib/content/daily.ts` (56 questions, 8 categories interleaved,
deterministic by day-of-year). Client: `src/lib/space.ts`. Verified
end-to-end with two real accounts: create → code join → locked answer →
reveal → shared notes. Note: the Nalee project's password policy requires
upper+lower+digit; the sign-up screen shows a generic error (improve to
surface the real message).

## Later

- Daily-question push reminder (expo-notifications, needs a build)
- Realtime updates in the space (supabase realtime; focus-refetch for now)
- Shared journey state across both phones (mend_state merge)
- Content localization beyond chrome
- Android (package name already set)
