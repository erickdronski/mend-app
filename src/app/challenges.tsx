import { useCallback, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useFocusEffect, useRouter, type Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { challenges, getChallenge, microMoves } from "@/lib/content/challenges";
import { usePremium } from "@/lib/premium";
import {
  clearChallenge,
  completeChallengeDay,
  getChallengeState,
  startChallenge,
  type ChallengeState,
} from "@/lib/store";
import {
  Btn,
  Card,
  Chip,
  CollapsibleP,
  Eyebrow,
  H1,
  H2,
  IconChip,
  Muted,
  P,
  Screen,
  usePalette,
} from "@/components/ui";
import { Bloom, Bounce, Press, Reveal } from "@/components/motion";

const challengeIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  "turning-toward": "people",
  appreciation: "heart",
  "soft-repair": "bandage",
  "last-line": "flag",
};

/** Free tier keeps the starter week and, deliberately, the crisis week:
 *  money never gates the heavy seasons (see docs/MONETIZATION.md). */
const FREE_CHALLENGES = new Set(["turning-toward", "last-line"]);

export default function Challenges() {
  const p = usePalette();
  const honey = p.hues.honey;
  const router = useRouter();
  const { plus } = usePremium();
  const [state, setState] = useState<ChallengeState | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [confirmSwitch, setConfirmSwitch] = useState(false);
  const [justDone, setJustDone] = useState<number | null>(null);

  useFocusEffect(
    useCallback(() => {
      getChallengeState().then((s) => {
        setState(s);
        setLoaded(true);
      });
    }, [])
  );

  if (!loaded) return <Screen scroll={false}>{null}</Screen>;

  const active = state ? getChallenge(state.id) : null;
  const done = state?.doneDays ?? [];
  const currentDay = active ? active.days.findIndex((_, i) => !done.includes(i)) : -1;
  const finished = Boolean(active) && currentDay === -1;

  if (active && state) {
    return (
      <Screen>
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}
        >
          <Eyebrow hue="honey">Your week</Eyebrow>
          <Chip label={`${done.length} of ${active.days.length} done`} hue="honey" />
        </View>
        <H1 style={{ marginTop: 6 }}>{active.title}</H1>

        {/* Seven day dots: done = filled, today = ringed, future = muted. */}
        <View style={{ flexDirection: "row", gap: 8, marginTop: 16 }}>
          {active.days.map((_, i) => {
            const isDone = done.includes(i);
            const isToday = i === currentDay;
            return (
              <Bloom key={i} trigger={justDone === i} color={honey.accent} size={52}>
                <Bounce trigger={justDone === i}>
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      backgroundColor: isDone ? honey.accent : "transparent",
                      borderWidth: 2,
                      borderColor: isDone || isToday ? honey.accent : p.line,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {isDone ? (
                      <Ionicons name="checkmark" size={17} color={p.surface} />
                    ) : (
                      <Text
                        style={{ fontWeight: "700", fontSize: 12.5, color: isToday ? honey.fg : p.muted }}
                      >
                        {i + 1}
                      </Text>
                    )}
                  </View>
                </Bounce>
              </Bloom>
            );
          })}
        </View>

        {finished ? (
          <>
            <View style={{ alignItems: "center", marginTop: 26 }}>
              <Bloom trigger color={honey.accent} size={112}>
                <IconChip name="checkmark" hue="honey" size={72} />
              </Bloom>
            </View>
            <Card tone="fern" style={{ marginTop: 20 }}>
              <H2>Seven for seven</H2>
              <P style={{ marginTop: 8 }}>
                A week of showing up on purpose. Whatever it shifted, you built it one small day at
                a time, which is the only way anything in a relationship gets built. The journey has
                counted it.
              </P>
              <Btn
                label="Choose the next week"
                kind="moss"
                onPress={async () => {
                  await clearChallenge();
                  setState(null);
                  setJustDone(null);
                }}
                style={{ marginTop: 14 }}
              />
            </Card>
          </>
        ) : (
          <Card style={{ marginTop: 18 }}>
            <Chip label={`Day ${currentDay + 1} of ${active.days.length}`} hue="honey" icon="calendar" />
            <H2 style={{ marginTop: 10 }}>{active.days[currentDay].title}</H2>
            <P style={{ marginTop: 8, fontSize: 16.5, lineHeight: 25 }}>
              {active.days[currentDay].task}
            </P>
            <View style={{ borderLeftWidth: 2, borderLeftColor: honey.accent, paddingLeft: 12, marginTop: 12 }}>
              <CollapsibleP lines={2} style={{ fontSize: 13.5, lineHeight: 20 }}>
                {active.days[currentDay].why}
              </CollapsibleP>
            </View>
            <Btn
              label="Done for today"
              onPress={async () => {
                const day = currentDay;
                const s = await completeChallengeDay(day);
                setState(s);
                setJustDone(day);
              }}
              style={{ marginTop: 16 }}
            />
            <Muted style={{ marginTop: 8 }}>
              One day at a time is the design. Missed a day? Pick up here; guilt is not part of
              this challenge.
            </Muted>
          </Card>
        )}

        <View style={{ marginTop: 24 }}>
          {confirmSwitch ? (
            <View style={{ flexDirection: "row", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
              <Muted>Drop this week and choose another?</Muted>
              <Press
                onPress={async () => {
                  await clearChallenge();
                  setState(null);
                  setConfirmSwitch(false);
                  setJustDone(null);
                }}
              >
                <Text style={{ color: p.ember, fontWeight: "600" }}>Yes, switch</Text>
              </Press>
              <Press onPress={() => setConfirmSwitch(false)}>
                <Muted style={{ textDecorationLine: "underline" }}>Keep going</Muted>
              </Press>
            </View>
          ) : (
            <Press onPress={() => setConfirmSwitch(true)}>
              <Muted style={{ textDecorationLine: "underline" }}>Switch to a different challenge</Muted>
            </Press>
          )}
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <H1 style={{ marginTop: 8 }}>One small act a day, for seven days</H1>
      <P style={{ marginTop: 10 }}>
        Relationships turn on accumulations, not breakthroughs. Most days take under ten minutes,
        and none require your partner to have signed up for anything. Do it quietly and let them
        notice.
      </P>

      <View style={{ marginTop: 18, gap: 12 }}>
        {challenges.map((c, idx) => {
          const heavy = c.id === "last-line";
          const locked = !plus && !FREE_CHALLENGES.has(c.id);
          return (
            <Reveal key={c.id} index={idx}>
              <Card tone={heavy ? "moss" : "raised"} style={locked ? { opacity: 0.82 } : undefined}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <IconChip name={challengeIcons[c.id] ?? "calendar"} hue="honey" size={40} />
                  <View style={{ flex: 1 }}>
                    <H2 style={heavy ? { color: p.surface } : undefined}>{c.title}</H2>
                    <Muted
                      style={[{ fontStyle: "italic" }, heavy && { color: p.surface, opacity: 0.75 }]}
                      numberOfLines={1}
                    >
                      {c.tagline}
                    </Muted>
                  </View>
                </View>
                {/* Never clamp this. Several challenges carry their "if there is
                    fear, control, or violence, this is the wrong tool" line at the
                    end of forWhom, and a numberOfLines cap cut it off. */}
                <Muted style={[{ marginTop: 10 }, heavy && { color: p.surface, opacity: 0.85 }]}>
                  {c.forWhom}
                </Muted>
                <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
                  <Chip label={`${c.days.length} days`} hue="honey" icon="calendar" />
                  {locked ? <Chip label="Plus" hue="ember" icon="lock-closed" /> : null}
                </View>
                <Btn
                  label={locked ? "See Mend Plus" : "Start this week"}
                  kind={heavy ? "ghost" : locked ? "ghost" : "primary"}
                  onPress={
                    locked
                      ? () => router.push("/plus" as Href)
                      : async () => setState(await startChallenge(c.id))
                  }
                  style={
                    heavy
                      ? { marginTop: 14, backgroundColor: p.surface, borderColor: p.surface }
                      : { marginTop: 14 }
                  }
                />
              </Card>
            </Reveal>
          );
        })}
      </View>

      <H2 style={{ marginTop: 26 }}>Too tired for a challenge? Try a micro-move.</H2>
      <Muted style={{ marginTop: 6 }}>
        Single moves for specific moments. No streaks, no tracking. Just one.
      </Muted>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 12 }}
        contentContainerStyle={{ gap: 10 }}
      >
        {microMoves.map((m, i) => (
          <Card key={i} style={{ width: 260 }}>
            <Chip label={m.when} hue="honey" />
            <P style={{ marginTop: 8, fontSize: 14 }}>{m.tip}</P>
          </Card>
        ))}
      </ScrollView>
    </Screen>
  );
}
