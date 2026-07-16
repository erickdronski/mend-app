# Mend: the path to revenue

Written 2026-07-16. State of the world: TestFlight beta, entitlement rails
live, purchases not yet enabled.

## The philosophy (also the moat)

Mend's product promise is "counseling-grade help, free, designed to be
deleted." Monetization must never contradict that sentence, because the
promise is the growth engine: it is why someone recommends Mend to a friend
whose marriage is struggling. So the line is drawn once, clearly:

**Free forever, no exceptions:** the five-stage Journey, guided sessions
(including the flooding break), the entire safety net (crisis lines, red
flags, get-help-now), the daily question, the shared space, love notes, the
plan, and pulse checks. Money never gates safety, and the spine that gets a
couple from crisis to graduation is complete without paying.

**Mend Plus (paid):** breadth and depth on top of the spine.
- Every card deck (free tier keeps First Steps and Repair, the crisis deck)
- The full game shelf (free keeps "Do you still know me?") and every 7-day
  challenge (free keeps the starter week AND the crisis week "The last
  line", deliberately)
- Complete healing-track programs beyond each track's first session
  (every track's red-flags and "when to see a professional" content stays
  free, always)
- Everything new, first

The quiz stays fully free: the Journey requires both partners to take it,
and the Journey is the free spine. Never gate it.

This split monetizes the couples who stay and go deep, while the couple in
acute crisis never hits a paywall on the way to stability. That is both the
ethical line and what App Review will respect.

## The model

Subscription via Apple In-App Purchase (digital content, so IAP is
mandatory per Guideline 3.1.1; no Stripe/web checkout inside the app).

Proposed products (a pricing decision to confirm, not market data):

| Product | Suggested ID | Proposal |
| --- | --- | --- |
| Plus monthly | `mend.plus.monthly` | low single-digit $/month |
| Plus yearly | `mend.plus.yearly` | priced at ~6x monthly so yearly is the obvious pick |
| Founder lifetime | `mend.founder.lifetime` | one-time, for the launch window only |

Positioning: a year of Mend Plus should cost a fraction of ONE couples
counseling session. Say that on the paywall; it is true and it lands.

The "designed to be deleted" tension is real: graduating couples cancel.
That is fine. Churn from success is marketing (reviews, referrals); the
yearly plan and founder lifetime capture value up front, and the honest
brand is what earns the next couple.

## What is already built (this session)

- `mend_entitlements` table on Supabase (email-keyed, RLS locked, no direct
  reads) + `mend_my_tier()` definer RPC, execute granted to authenticated
  only.
- `esdronski@gmail.com` holds a permanent `plus` founder grant.
- Client: `src/lib/premium.tsx` (PremiumProvider + usePremium hook, offline
  tier cache), `/plus` paywall screen, Settings entry with tier badge,
  Plus-gating on decks/games/challenges/track sessions.
- Beta switch: `PLUS_PREVIEW = true` in `src/lib/premium.tsx` unlocks
  everything for every TestFlight tester, and the paywall says so honestly.

## Owner checklist to turn revenue on (in order)

1. **Paid Applications agreement** in App Store Connect (Business section):
   accept, add banking and tax info. Nothing can be sold before this
   clears.
2. **Create the subscription group + products** in ASC (ids above), set
   prices, write the localized descriptions.
3. **Pick the purchase stack**: RevenueCat (fastest, has an Expo SDK,
   free tier exists, check current terms) or StoreKit 2 direct via
   `expo-iap`. Recommendation: RevenueCat, so receipts, restore, and
   family sharing edge cases are handled.
4. **Server truth**: on purchase, write the entitlement into
   `mend_entitlements` (RevenueCat webhook -> small Supabase edge function
   keyed by app_user_id = Supabase user id, storing the account email), so
   `mend_my_tier()` stays the single source of truth the app already reads.
5. Flip `PLUS_PREVIEW` to `false`, ship the build.
6. Update App Privacy + review notes for the purchase flow.

Note on Apple sign-in + email-keyed grants: a user who chooses Apple's
"Hide My Email" gets a relay address, which will not match an email-keyed
grant. Purchases wired through RevenueCat use the Supabase user id, which
sidesteps this. Founder grants for known people should be issued against
the email they actually sign in with.

## Explicitly rejected

- Ads. Never. A couple in crisis is not inventory.
- Selling or sharing relationship data in any form. The privacy stance is
  part of the product.
- Paywalling safety content, the DV gate, or crisis resources.
