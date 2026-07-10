import { useCallback, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { challenges, getChallenge, microMoves } from "@/lib/content/challenges";
import {
  clearChallenge,
  completeChallengeDay,
  getChallengeState,
  startChallenge,
  type ChallengeState,
} from "@/lib/store";
import { Btn, Card, H1, H2, Muted, P, Screen, usePalette } from "@/components/ui";

export default function Challenges() {
  const p = usePalette();
  const [state, setState] = useState<ChallengeState | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [confirmSwitch, setConfirmSwitch] = useState(false);

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
        <Muted style={{ marginTop: 8 }}>Your week</Muted>
        <H1 style={{ marginTop: 2 }}>{active.title}</H1>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 12 }}>
          {active.days.map((_, i) => (
            <Ionicons
              key={i}
              name={done.includes(i) ? "checkmark-circle" : "ellipse-outline"}
              size={22}
              color={done.includes(i) ? p.moss : i === currentDay ? p.ember : p.line}
            />
          ))}
          <Muted style={{ marginLeft: 6 }}>{done.length} of 7</Muted>
        </View>

        {finished ? (
          <Card tone="fern" style={{ marginTop: 18 }}>
            <H2>Seven for seven</H2>
            <P style={{ marginTop: 8 }}>
              A week of showing up on purpose. Whatever it shifted, you built it one small day at
              a time, which is the only way anything in a marriage gets built. The journey has
              counted it.
            </P>
            <Btn
              label="Choose the next week"
              kind="moss"
              onPress={async () => {
                await clearChallenge();
                setState(null);
              }}
              style={{ marginTop: 14 }}
            />
          </Card>
        ) : (
          <Card style={{ marginTop: 18 }}>
            <Text style={{ color: p.ember, fontWeight: "700", fontSize: 14 }}>
              Day {currentDay + 1}: {active.days[currentDay].title}
            </Text>
            <P style={{ marginTop: 10, fontSize: 16.5, lineHeight: 25 }}>{active.days[currentDay].task}</P>
            <View style={{ borderLeftWidth: 2, borderLeftColor: p.line, paddingLeft: 12, marginTop: 12 }}>
              <Muted>{active.days[currentDay].why}</Muted>
            </View>
            <Btn
              label="Done for today"
              onPress={async () => setState(await completeChallengeDay(currentDay))}
              style={{ marginTop: 16 }}
            />
            <Muted style={{ marginTop: 8 }}>
              One day at a time is the design. Missed a day? Pick up here; guilt is not part of
              this challenge.
            </Muted>
          </Card>
        )}

        {!finished && (
          <View style={{ marginTop: 18 }}>
            <H2>The week at a glance</H2>
            <View style={{ marginTop: 8, gap: 4 }}>
              {active.days.map((d, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    paddingVertical: 8,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                    backgroundColor: i === currentDay ? p.panel : "transparent",
                  }}
                >
                  <Muted style={{ width: 44 }}>Day {i + 1}</Muted>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 13.5,
                      color: done.includes(i) ? p.muted : p.ink,
                      textDecorationLine: done.includes(i) ? "line-through" : "none",
                      fontWeight: i === currentDay ? "600" : "400",
                    }}
                  >
                    {d.title}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={{ marginTop: 24 }}>
          {confirmSwitch ? (
            <View style={{ flexDirection: "row", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
              <Muted>Drop this week and choose another?</Muted>
              <Pressable
                onPress={async () => {
                  await clearChallenge();
                  setState(null);
                  setConfirmSwitch(false);
                }}
              >
                <Text style={{ color: p.ember, fontWeight: "600" }}>Yes, switch</Text>
              </Pressable>
              <Pressable onPress={() => setConfirmSwitch(false)}>
                <Muted style={{ textDecorationLine: "underline" }}>Keep going</Muted>
              </Pressable>
            </View>
          ) : (
            <Pressable onPress={() => setConfirmSwitch(true)}>
              <Muted style={{ textDecorationLine: "underline" }}>Switch to a different challenge</Muted>
            </Pressable>
          )}
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <H1 style={{ marginTop: 8 }}>One small act a day, for seven days</H1>
      <P style={{ marginTop: 10 }}>
        Marriages turn on accumulations, not breakthroughs. Most days take under ten minutes, and
        none require your partner to have signed up for anything. Do it quietly and let them
        notice.
      </P>

      <View style={{ marginTop: 18, gap: 12 }}>
        {challenges.map((c) => {
          const heavy = c.id === "last-line";
          return (
            <Card key={c.id} tone={heavy ? "moss" : "raised"}>
              <H2 style={heavy ? { color: p.surface } : undefined}>{c.title}</H2>
              <Muted style={[{ marginTop: 4, fontStyle: "italic" }, heavy && { color: p.surface, opacity: 0.75 }]}>
                {c.tagline}
              </Muted>
              <Muted style={[{ marginTop: 8 }, heavy && { color: p.surface, opacity: 0.85 }]}>{c.forWhom}</Muted>
              <Btn
                label="Start this week"
                onPress={async () => setState(await startChallenge(c.id))}
                style={
                  heavy
                    ? { marginTop: 14, backgroundColor: p.surface, borderColor: p.surface }
                    : { marginTop: 14 }
                }
              />
            </Card>
          );
        })}
      </View>

      <H2 style={{ marginTop: 26 }}>Too tired for a challenge? Try a micro-move.</H2>
      <Muted style={{ marginTop: 6 }}>Single moves for specific moments. No streaks, no tracking. Just one.</Muted>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }} contentContainerStyle={{ gap: 10 }}>
        {microMoves.map((m, i) => (
          <Card key={i} style={{ width: 260 }}>
            <Muted style={{ textTransform: "uppercase", letterSpacing: 1, fontWeight: "700", color: p.ember, fontSize: 10.5 }}>
              {m.when}
            </Muted>
            <P style={{ marginTop: 8, fontSize: 14 }}>{m.tip}</P>
          </Card>
        ))}
      </ScrollView>
    </Screen>
  );
}
