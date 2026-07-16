# Social sign-in: state and owner setup

Written 2026-07-16. Supabase project: the shared Nalee project
(nrxhewcnlqeosshwxbhj), all Mend tables namespaced `mend_*`.

## Apple: LIVE (this session)

Native Sign in with Apple, the flow Apple requires when any third-party
login is offered (Guideline 4.8), and the only one that needs no external
account setup.

What was wired:
- App ID `com.erickdronski.mend`: APPLE_ID_AUTH capability enabled via the
  ASC API (primary app consent). The provisioning profile must regenerate
  to include the entitlement; EAS does this during the next build's
  credential sync.
- app.json: `expo-apple-authentication` plugin + `ios.usesAppleSignIn`.
- Supabase Apple provider: client IDs now
  `app.nalee.nalee,com.erickdronski.mend` (comma list; Nalee first and
  untouched). Native flow validates the identity token audience against
  this list; no client secret needed for the native-only flow.
- `sign-in.tsx`: the HIG Apple button (Continue with Apple), shown only on
  iOS when available; `signInWithIdToken({ provider: "apple" })`.

Caveat: a user choosing "Hide My Email" signs in with a relay address.
Email-keyed founder grants in `mend_entitlements` will not match a relay.
When granting a person Plus, use the email they actually sign in with.

## Google: one owner task away

Nalee's Google OAuth client exists on this Supabase project, but its
consent screen is branded Nalee. Reusing it inside Mend would show users
another product's name mid-login, so the Google button stays off until a
Mend-branded client exists.

Owner setup (roughly 15 minutes, free):
1. console.cloud.google.com: create project "Mend", configure the OAuth
   consent screen (app name Mend, support email, logo).
2. Create OAuth client, type iOS, bundle id `com.erickdronski.mend`.
3. Supabase dashboard (or Management API): under the Google provider, add
   the new iOS client ID to the authorized client IDs list. Do NOT remove
   Nalee's existing client id/secret.
4. In the app: `npx expo install @react-native-google-signin/google-signin`,
   configure with the iOS client ID, exchange the returned idToken via
   `supabase.auth.signInWithIdToken({ provider: "google", token })`, and
   show the button beside Apple's in `sign-in.tsx`.

## Facebook: owner developer account required

1. developers.facebook.com: create a developer account and a Facebook app
   (type Consumer), add the Facebook Login product, add the iOS platform
   with the bundle id. Facebook requires app review before non-developers
   can log in.
2. Supabase: enable the Facebook provider with the app ID + secret.
3. App side: web-flow OAuth via `supabase.auth.signInWithOAuth` +
   `expo-web-browser` deep-link redirect (`mend://` must be added to the
   Supabase redirect allow list), or the native SDK.

## X (Twitter): check terms before investing

Supabase supports the Twitter/X provider, but X's developer program terms
and pricing have shifted repeatedly; verify the current cost of OAuth login
access before building. If it is viable: create the X developer app, enable
the provider in Supabase, then the same `signInWithOAuth` web flow.

## Design rule

No dead buttons. A provider's button appears in `sign-in.tsx` only once its
backend is fully configured and tested. Apple is the only one shown today.
