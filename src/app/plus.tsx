/**
 * Mend Plus: the paywall that keeps the promise. The free tier is stated
 * first and stays generous; Plus is breadth, not rescue.
 *
 * Every price comparison on this screen is verifiable and sourced (see
 * docs/PRICING.md). We compare cost to counseling, and we NEVER claim to
 * be as effective as therapy or make any clinical outcome claim.
 *
 * Purchase CTAs stay hidden until the App Store payment rail is settled.
 * This build presents Plus as included access, not as an external checkout.
 */
import { useState } from "react";
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PRICING, usePremium, type Plan } from "@/lib/premium";
import { useAuth } from "@/lib/auth";
import { useRouter } from "expo-router";
import { Btn, Card, Chip, Eyebrow, H2, Hero, IconChip, Muted, P, Screen, usePalette } from "@/components/ui";
import { Text } from "@/components/text";
import { Press, Reveal } from "@/components/motion";

const INCLUDED_START: { icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { icon: "trail-sign-outline", label: "The complete first chapter of your relationship journey" },
  { icon: "dice-outline", label: "Starter card decks, a couple game, and starter activities" },
  { icon: "medkit-outline", label: "The safety net: crisis lines, red flags, get-help-now" },
  { icon: "people-outline", label: "Your private two-person room and invite code" },
  { icon: "sunny-outline", label: "Daily questions, shared notes, and pulse checks" },
];

const PLUS_ADDS: { icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { icon: "map-outline", label: "Journey chapters two through five, with progress preserved" },
  { icon: "albums-outline", label: "Every card deck, game, guided activity, and 7-day challenge" },
  { icon: "heart-circle-outline", label: "Complete focused paths for repair, connection, trust, and life changes" },
  { icon: "newspaper-outline", label: "The complete Mend Notes research and practice archive" },
  { icon: "people-outline", label: "Full access for both partners with one subscription" },
];

export default function Plus() {
  const p = usePalette();
  const router = useRouter();
  const { session } = useAuth();
  const {
    tier,
    previewOnly,
    purchasesEnabled,
    startCheckout,
    manageBilling,
    busy,
    spaceId,
    partnerIncluded,
    canManage,
    source,
  } = usePremium();
  const [plan, setPlan] = useState<Plan>("annual");
  const [error, setError] = useState<string | null>(null);

  async function buy() {
    setError(null);
    const err = await startCheckout(plan);
    if (err) setError(err);
  }

  async function manage() {
    setError(null);
    const err = await manageBilling();
    if (err) setError(err);
  }

  return (
    <Screen>
      <Hero
        hue="ember"
        eyebrow={tier === "plus" ? "Your room has Mend Plus" : "Mend Plus for two"}
        title={tier === "plus" ? "Both of you are covered" : "One subscription. Two partners. One private room."}
        sub={
          tier === "plus"
            ? partnerIncluded
              ? "Full access follows this room on both phones."
              : "Your partner receives full access automatically when they join your room."
            : "Either partner subscribes once. The full journey and library unlock for both of you."
        }
        style={{ marginTop: 12 }}
      >
        <View style={{ marginTop: 14, flexDirection: "row", gap: 8 }}>
          {tier === "plus" ? (
            <Chip
              label={source === "founder_grant" ? "Founding access" : "Shared room plan"}
              hue="honey"
              icon="ribbon-outline"
            />
          ) : previewOnly ? (
            <Chip label="Full access included" hue="honey" icon="ribbon-outline" />
          ) : null}
        </View>
      </Hero>

      <Reveal index={0} style={{ marginTop: 20 }}>
        <Eyebrow hue="moss">Start exploring before Plus</Eyebrow>
        <Card style={{ marginTop: 8, gap: 12 }}>
          {INCLUDED_START.map((f) => (
            <View key={f.label} style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <IconChip name={f.icon} hue="moss" size={32} />
              <P style={{ flex: 1, fontSize: 14 }}>{f.label}</P>
            </View>
          ))}
        </Card>
        <Muted style={{ marginTop: 8, fontSize: 12.5 }}>
          Safety resources always stay open. Your room and completed progress are never deleted if you do not subscribe.
        </Muted>
      </Reveal>

      <Reveal index={1} style={{ marginTop: 22 }}>
        <Eyebrow hue="ember">What one shared plan adds</Eyebrow>
        <Card style={{ marginTop: 8, gap: 12, borderColor: p.hues.ember.accent }}>
          {PLUS_ADDS.map((f) => (
            <View key={f.label} style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <IconChip name={f.icon} hue="ember" size={32} />
              <P style={{ flex: 1, fontSize: 14 }}>{f.label}</P>
            </View>
          ))}
        </Card>
      </Reveal>

      {/* The cost comparison. Every figure here is verified and sourced in
          docs/PRICING.md. We compare COST ONLY. Mend is an educational tool,
          not therapy, and never claims otherwise. */}
      <Reveal index={2} style={{ marginTop: 22 }}>
        <Eyebrow hue="sky">What counseling costs</Eyebrow>
        <Card tone="panel" style={{ marginTop: 8 }}>
          {/* Copy is fixed by docs/PRICING.md section 3 (P3 and P4) and is
              sourced line by line. Do not edit a number here without updating
              that document: the previous "$100 to $250" matched no source. */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <IconChip name="cash-outline" hue="sky" size={32} />
            <P style={{ flex: 1, fontSize: 14 }}>
              Thriveworks lists couples counseling at $150 to $250 per session out of pocket and
              says couples commonly attend eight to twenty sessions. Mend Plus is $99 per room for
              a year, not per person.
            </P>
          </View>
          {/* P4. Ships exactly as written, never shortened. It is the reason
              we are allowed to discuss price at all. */}
          <Muted style={{ marginTop: 10, fontSize: 12.5 }}>
            Mend is not therapy and does not replace it. If you can see a counselor, see one.
          </Muted>
        </Card>
      </Reveal>

      {purchasesEnabled && (
        <Reveal index={3} style={{ marginTop: 22 }}>
          <Eyebrow hue="ember">Choose your plan</Eyebrow>
          <View style={{ flexDirection: "row", gap: 10, marginTop: 8 }}>
            {(["annual", "monthly"] as const).map((k) => {
              const selected = plan === k;
              const best = k === "annual";
              return (
                <Press key={k} onPress={() => setPlan(k)} style={{ flex: 1 }} haptic>
                  <Card
                    style={{
                      borderColor: selected ? p.hues.ember.accent : p.line,
                      borderWidth: selected ? 2 : 1,
                      backgroundColor: selected ? p.hues.ember.bg : undefined,
                      paddingVertical: 16,
                    }}
                  >
                    {best ? <Chip label="Best value" hue="honey" style={{ marginBottom: 8 }} /> : null}
                    <Text style={{ fontSize: 26, fontWeight: "800", color: p.ink }}>
                      {PRICING[k].amount}
                    </Text>
                    <Muted style={{ marginTop: 2 }}>{PRICING[k].cadence}</Muted>
                    {k === "annual" ? (
                      <Muted style={{ marginTop: 6, fontSize: 12 }}>{PRICING.annual.perMonth}</Muted>
                    ) : null}
                  </Card>
                </Press>
              );
            })}
          </View>
          <Muted style={{ marginTop: 10, fontSize: 12.5 }}>
            At Thriveworks&apos; published $150 to $250 range, a year of Mend Plus costs less than one
            session. This is a cost comparison only. Cancel anytime.
          </Muted>
        </Reveal>
      )}

      <Reveal index={4} style={{ marginTop: 20 }}>
        {tier === "plus" ? (
          <Card tone="fern">
            <P style={{ fontSize: 14 }}>
              {partnerIncluded
                ? "Your two-person room is fully unlocked. You and your partner use separate accounts and share one plan."
                : "Your room is fully unlocked. Send your invite code and your partner will be included automatically."}
            </P>
            {canManage && purchasesEnabled ? (
              <Btn label={busy ? "Opening billing..." : "Manage subscription"} kind="ghost" onPress={manage} disabled={busy} style={{ marginTop: 12 }} />
            ) : null}
          </Card>
        ) : previewOnly && !purchasesEnabled ? (
          <Card tone="fern">
            <P style={{ fontSize: 14 }}>
              Everything above is open in this build. The journey, safety resources, daily question,
              guided sessions, and shared space remain available in this preview.
            </P>
          </Card>
        ) : purchasesEnabled ? (
          <View>
            {!spaceId ? (
              <Card tone="panel" style={{ marginBottom: 12 }}>
                <P style={{ fontSize: 13.5 }}>Create or join your room first so one purchase can cover both partners.</P>
                <Btn label="Set up our room" kind="ghost" onPress={() => router.push("/space")} style={{ marginTop: 10 }} />
              </Card>
            ) : null}
            <Btn
              label={busy ? "Opening checkout..." : `Get Plus for ${PRICING[plan].amount} ${PRICING[plan].cadence}`}
              onPress={buy}
              disabled={busy || !spaceId}
            />
            {error ? (
              <Muted style={{ marginTop: 10, color: p.ember }}>{error}</Muted>
            ) : (
              <Muted style={{ marginTop: 10, fontSize: 12, textAlign: "center" }}>
                One secure payment covers both people in your room. Cancel anytime.
              </Muted>
            )}
            {previewOnly ? (
              <Card tone="panel" style={{ marginTop: 14 }}>
                <P style={{ fontSize: 13.5 }}>
                  Everything above is already unlocked for you at no cost.
                </P>
              </Card>
            ) : null}
            {!session ? (
              <Pressable onPress={() => router.push("/sign-in")}>
                <Muted style={{ marginTop: 12, textDecorationLine: "underline", textAlign: "center" }}>
                  Add an account so your access follows you to a new phone
                </Muted>
              </Pressable>
            ) : null}
          </View>
        ) : (
          <Card tone="panel">
            <H2>One shared plan, never two bills</H2>
            <P style={{ marginTop: 8, fontSize: 14 }}>
              Mend Plus purchasing is being enabled through the App Store. Your starting chapter and private room are ready now.
            </P>
            {!spaceId ? (
              <Btn label="Create our room" kind="ghost" onPress={() => router.push("/space")} style={{ marginTop: 12 }} />
            ) : null}
          </Card>
        )}
      </Reveal>
    </Screen>
  );
}
