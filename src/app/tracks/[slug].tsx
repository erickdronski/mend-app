import { Text, View } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { getTrack } from "@/lib/content/tracks";
import { Btn, Card, H1, H2, Muted, P, Screen, usePalette } from "@/components/ui";

export default function TrackDetail() {
  const p = usePalette();
  const router = useRouter();
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
      <H1 style={{ marginTop: 8 }}>{track.title}</H1>
      <Muted style={{ marginTop: 4, color: p.mossDeep, fontWeight: "600" }}>{track.subtitle}</Muted>
      <P style={{ marginTop: 12 }}>{track.overview}</P>

      <H2 style={{ marginTop: 24 }}>What this can feel like, from each side</H2>
      <View style={{ marginTop: 10, gap: 10 }}>
        {track.feelings.map((f) => (
          <Card key={f.label}>
            <Text style={{ fontWeight: "700", color: p.emberDeep, fontSize: 14 }}>{f.label}</Text>
            <P style={{ marginTop: 6, fontSize: 14 }}>{f.body}</P>
          </Card>
        ))}
      </View>

      <H2 style={{ marginTop: 24 }}>The principles</H2>
      <View style={{ marginTop: 8, gap: 8 }}>
        {track.principles.map((pr, i) => (
          <P key={i} style={{ fontSize: 14 }}>
            · {pr}
          </P>
        ))}
      </View>

      <H2 style={{ marginTop: 24 }}>The conversations, in order</H2>
      <Muted style={{ marginTop: 6 }}>
        Take them one at a time, days or weeks apart. Each opens as a guided session with the
        timer and listening structure.
      </Muted>
      <View style={{ marginTop: 10, gap: 12 }}>
        {track.sessions.map((s, i) => (
          <Card key={s.title}>
            <H2>
              {i + 1}. {s.title}
            </H2>
            <Muted style={{ marginTop: 6 }}>{s.focus}</Muted>
            {s.prompts.map((prompt) => (
              <Muted key={prompt} style={{ marginTop: 6, fontStyle: "italic" }}>
                · {prompt}
              </Muted>
            ))}
            <Btn
              label="Open this conversation"
              onPress={() => router.push(`/talk?track=${track.slug}&s=${i}`)}
              style={{ marginTop: 14 }}
            />
          </Card>
        ))}
      </View>

      <Card tone="panel" style={{ marginTop: 24 }}>
        <H2>For your weekly plan</H2>
        {track.planSeeds.map((seed) => (
          <P key={seed} style={{ marginTop: 8, fontSize: 14 }}>
            · {seed}
          </P>
        ))}
      </Card>

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
