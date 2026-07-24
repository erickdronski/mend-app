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
import { Btn, Card, Chip, Eyebrow, Hero, IconChip, Muted, P, Screen, usePalette } from "@/components/ui";
import { Text } from "@/components/text";
import { Press, Reveal } from "@/components/motion";

const FREE_FOREVER: { icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { icon: "trail-sign-outline", label: "The complete five-stage relationship journey" },
  { icon: "chatbubbles-outline", label: "Guided sessions with the timed floor" },
  { icon: "medkit-outline", label: "The safety net: crisis lines, red flags, get-help-now" },
  { icon: "sunny-outline", label: "The daily question and your shared space" },
  { icon: "heart-outline", label: "Love notes, your plan, and pulse checks" },
];

const PLUS_ADDS: { icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { icon: "albums-outline", label: "Every card deck. First Steps and Repair stay free" },
  { icon: "dice-outline", label: "The full game shelf and every 7-day challenge" },
  { icon: "map-outline", label: "Complete focused-support programs. First sessions and red flags stay free" },
  { icon: "newspaper-outline", label: "The complete Mend Notes research and practice archive" },
  { icon: "leaf-outline", label: "Everything new we build, first" },
];

export default function Plus() {
  const p = usePalette();
  const router = useRouter();
  const { session } = useAuth();
  const { tier, previewOnly, purchasesEnabled, startCheckout, busy } = usePremium();
  const [plan, setPlan] = useState<Plan>("annual");
  const [error, setError] = useState<string | null>(null);

  async function buy() {
    setError(null);
    const err = await startCheckout(plan);
    if (err) setError(err);
  }

  return (
    <Screen>
      <Hero
        hue="ember"
        eyebrow="Mend Plus"
        title={purchasesEnabled ? "A year of Plus costs less than one counseling session" : "The full library is unlocked"}
        sub={
          purchasesEnabled
            ? "The heart of Mend is free forever. Plus opens the full breadth."
            : "Every deck, game, challenge, and focused-support track is included in this build."
        }
        style={{ marginTop: 12 }}
      >
        <View style={{ marginTop: 14, flexDirection: "row", gap: 8 }}>
          {tier === "plus" ? (
            <Chip label="Founding member, Plus is yours" hue="honey" icon="ribbon-outline" />
          ) : previewOnly ? (
            <Chip label="Full access included" hue="honey" icon="ribbon-outline" />
          ) : null}
        </View>
      </Hero>

      <Reveal index={0} style={{ marginTop: 20 }}>
        <Eyebrow hue="moss">Free forever, no exceptions</Eyebrow>
        <Card style={{ marginTop: 8, gap: 12 }}>
          {FREE_FOREVER.map((f) => (
            <View key={f.label} style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <IconChip name={f.icon} hue="moss" size={32} />
              <P style={{ flex: 1, fontSize: 14 }}>{f.label}</P>
            </View>
          ))}
        </Card>
        <Muted style={{ marginTop: 8, fontSize: 12.5 }}>
          Money never gates safety or the core tools for talking, listening, and staying connected.
        </Muted>
      </Reveal>

      <Reveal index={1} style={{ marginTop: 22 }}>
        <Eyebrow hue="ember">What Plus adds</Eyebrow>
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
              A national therapy provider puts couples counseling at $150 to $250 a session out of
              pocket, and a typical course at eight to twenty sessions. Insurance often will not
              cover it on its own, because plans pay to treat a diagnosed condition in one person,
              and relationship trouble is not a diagnosis.
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
            A year of Mend Plus costs less than one typical counseling session. Cancel anytime.
          </Muted>
        </Reveal>
      )}

      <Reveal index={4} style={{ marginTop: 20 }}>
        {tier === "plus" ? (
          <Card tone="fern">
            <P style={{ fontSize: 14 }}>
              You hold a founding entitlement on this account. Everything above is unlocked for you, permanently.
            </P>
          </Card>
        ) : previewOnly && !purchasesEnabled ? (
          <Card tone="fern">
            <P style={{ fontSize: 14 }}>
              Everything above is open in this build. The journey, safety resources, daily question,
              guided sessions, and shared space remain free either way.
            </P>
          </Card>
        ) : (
          <View>
            <Btn
              label={busy ? "Opening checkout..." : `Get Plus for ${PRICING[plan].amount} ${PRICING[plan].cadence}`}
              onPress={buy}
              disabled={busy}
            />
            {error ? (
              <Muted style={{ marginTop: 10, color: p.ember }}>{error}</Muted>
            ) : (
              <Muted style={{ marginTop: 10, fontSize: 12, textAlign: "center" }}>
                Secure checkout opens in your browser. Cancel anytime, no questions asked.
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
        )}
      </Reveal>
    </Screen>
  );
}
