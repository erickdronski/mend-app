# Mend: the path to revenue

Updated 2026-07-24. State of the world: shared-room entitlement rails and
Stripe backend live; native App Store purchasing still requires StoreKit
products and receipt wiring before the free/Plus build can ship.

## The philosophy (also the moat)

Mend is a private relationship education and practice tool, not therapy.
Monetization should fund a deep, continuously improving journey without
putting safety or a useful first experience behind a payment screen.

**Free:** the complete first journey chapter, starter decks and activities,
one couple game, the private two-person room, invite code, daily question,
shared notes, pulse checks, and every safety resource. Completed work and room
data are never deleted because a couple does not subscribe.

**Mend Plus:** journey chapters two through five, every card deck, game,
challenge, focused-support program, and the complete Mend Notes archive.
Every track's red flags and professional-help guidance remain free.

**One subscription covers one room.** Either partner can pay. Both current
room members receive Plus on their own accounts and phones. The payer owns
the billing relationship and is the only person who can manage it. A payer can
always leave a room; access detaches from that room and can follow the payer to
a future room, so billing can never trap someone in a relationship space.

## The model

The entitlement database is provider-neutral:

- **iOS App Store:** StoreKit auto-renewable subscriptions. Required for the
  native iOS purchase surface under App Review Guideline 3.1.1.
- **Web/direct:** Stripe Billing + hosted Checkout + Customer Portal. The iOS
  app does not expose this checkout.
- **Founder/manual:** permanent grants use the same room-sharing behavior.

Prices are fixed:

| Product | Product ID | Price |
| --- | --- | --- |
| Plus monthly | `mend.plus.monthly` | $9.99/month per room |
| Plus yearly | `mend.plus.yearly` | $99/year per room |

Cost comparisons must retain their source and disclaimer. At Thriveworks'
published $150 to $250 couples-counseling range, a $99 Mend year costs less
than one session. This is a cost comparison only; Mend is not therapy and does
not replace professional care.

The "designed to be deleted" tension is real: graduating couples cancel.
That is fine. Churn from success is marketing (reviews, referrals); the
yearly plan and founder lifetime capture value up front, and the honest
brand is what earns the next couple.

## What is built

- Room-linked `mend_entitlements`, provider fields, payer ownership, one-row-
  per-room enforcement, and idempotent `mend_billing_events`.
- `mend_my_access()` returns the minimum room access state; entitlement and
  billing-event tables have no client read/write grants.
- Stripe Checkout requires an authenticated user and existing room, blocks a
  duplicate room subscription, and stores payer + room metadata.
- The signed Stripe webhook retrieves current subscription state before each
  update, tolerates out-of-order events, and is the only paid-access writer.
- Stripe Customer Portal access is restricted to the payer.
- Client access caches are scoped by user id, preventing access leakage on a
  shared device.
- Free/Plus gates cover the journey, decks, games, challenges, focused tracks,
  and research archive. Safety remains open.

## Owner checklist to turn revenue on (in order)

1. Confirm the Paid Applications agreement, banking, and tax setup in App
   Store Connect.
2. Create the Mend Plus subscription group and the monthly/yearly products.
3. Add StoreKit purchase, restore, App Store Server Notifications, and server
   receipt validation that writes `provider = 'app_store'` entitlements.
4. Use a Mend-owned Stripe account. The currently connected Stripe workspace
   is labeled `Nalee App`; do not create Mend live products there without an
   explicit owner decision.
5. Set Stripe restricted keys, monthly/yearly price IDs, webhook signing
   secret, site URL, and portal configuration in Supabase secrets. Do not
   enable Stripe Tax until registrations are active.
6. Run sandbox purchases for both providers, renewal, failed payment,
   cancellation, restore, partner join, payer leave, and duplicate-purchase
   prevention.
7. Update App Privacy, subscription metadata, screenshots, terms, and App
   Review notes. The first App Store subscription must ship with an app version.

## Explicitly rejected

- Ads. Never. A couple in crisis is not inventory.
- Selling or sharing relationship data in any form. The privacy stance is
  part of the product.
- Paywalling safety content, the DV gate, or crisis resources.
