import { View } from "react-native";
import { Stack, useLocalSearchParams, useRouter, type Href } from "expo-router";
import { getTrack } from "@/lib/content/tracks";
import { usePremium } from "@/lib/premium";
import { Btn, Card, Chip, CollapsibleP, Eyebrow, H2, Hero, IconChip, Muted, P, Screen, usePalette } from "@/components/ui";
import { Text } from "@/components/text";
import { Reveal } from "@/components/motion";

export default function TrackDetail() {
  const p = usePalette();
  const router = useRouter();
  const { plus, purchasesEnabled } = usePremium();
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const track = getTrack(String(slug));

  if (!track) {
    return (
      <Screen>
        <P style={{ marginTop: 20 }}>This track doesn&apos;t exist.</P>
      </Screen>
    );
  }

  return (
    <Screen>
      <Stack.Screen options={{ title: track.title }} />
      <Hero hue="plum" eyebrow={track.subtitle} title={track.title} style={{ marginTop: 8 }} />
      <CollapsibleP style={{ marginTop: 12 }}>{track.overview}</CollapsibleP>

      <Eyebrow hue="plum" style={{ marginTop: 24 }}>What this can feel like, from each side</Eyebrow>
      <View style={{ marginTop: 10, gap: 10 }}>
        {track.feelings.map((f, i) => (
          <Reveal key={f.label} index={i}>
            <Card>
              <Text style={{ fontWeight: "700", color: p.hues.plum.fg, fontSize: 14 }}>{f.label}</Text>
              <P style={{ marginTop: 6, fontSize: 14 }}>{f.body}</P>
            </Card>
          </Reveal>
        ))}
      </View>

      <Eyebrow hue="plum" style={{ marginTop: 24 }}>The principles</Eyebrow>
      <Card tone="panel" style={{ marginTop: 8, gap: 8 }}>
        {track.principles.map((pr, i) => (
          <P key={i} style={{ fontSize: 14 }}>
            · {pr}
          </P>
        ))}
      </Card>

      <Eyebrow hue="plum" style={{ marginTop: 24 }}>The conversations, in order</Eyebrow>
      <Muted style={{ marginTop: 6 }}>
        One at a time, days or weeks apart. Each opens as a guided session.
        {plus || !purchasesEnabled
          ? " All conversations are included in this build."
          : " The first is free; Plus opens the full program."}
      </Muted>
      <View style={{ marginTop: 10, gap: 12 }}>
        {track.sessions.map((s, i) => {
          // The first conversation of every track stays free: the on-ramp for
          // a heavy season is never paywalled (docs/MONETIZATION.md).
          const locked = !plus && i > 0;
          return (
            <Reveal key={s.title} index={i}>
              <Card style={locked ? { opacity: 0.82 } : undefined}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <IconChip name={locked ? "lock-closed" : "chatbubbles"} hue="plum" size={32} />
                  <H2 style={{ flex: 1, fontSize: 18 }}>
                    {i + 1}. {s.title}
                  </H2>
                  {locked ? <Chip label="Plus" hue="ember" icon="lock-closed" /> : null}
                </View>
                <Muted style={{ marginTop: 8 }}>{s.focus}</Muted>
                {!locked &&
                  s.prompts.map((prompt) => (
                    <Muted key={prompt} style={{ marginTop: 6, fontStyle: "italic" }}>
                      · {prompt}
                    </Muted>
                  ))}
                <Btn
                  label={locked ? "See Mend Plus" : "Open this conversation"}
                  kind={locked ? "ghost" : "primary"}
                  onPress={() =>
                    locked
                      ? router.push("/plus" as Href)
                      : router.push(`/talk?track=${track.slug}&s=${i}` as Href)
                  }
                  style={{ marginTop: 14 }}
                />
              </Card>
            </Reveal>
          );
        })}
      </View>

      <Card tone="panel" style={{ marginTop: 24 }}>
        <H2>For your weekly plan</H2>
        {track.planSeeds.map((seed) => (
          <P key={seed} style={{ marginTop: 8, fontSize: 14 }}>
            · {seed}
          </P>
        ))}
      </Card>

      {/* Always free, always visible: the honest line where an app stops
          being enough. Never gate or trim this card. */}
      <Card style={{ marginTop: 12, borderColor: p.ember }}>
        <H2>When this needs more than an app</H2>
        <Muted style={{ marginTop: 6 }}>
          Honestly: some of this terrain belongs with professionals. Reach for real help if any of
          these are true.
        </Muted>
        {track.seekHelp.map((s, i) => (
          <P key={i} style={{ marginTop: 8, fontSize: 14 }}>
            · {s}
          </P>
        ))}
        <Btn label="Free & low-cost help" kind="ghost" onPress={() => router.push("/safety")} style={{ marginTop: 14 }} />
      </Card>
    </Screen>
  );
}
