import { useCallback, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { nudgeForDate, rituals } from "@/lib/content/nudges";
import {
  getPlan,
  getSessions,
  toggleCommitment,
  toggleRitual,
  type Plan,
  type SessionRecord,
} from "@/lib/store";
import { Card, H1, H2, Muted, P, Screen, usePalette } from "@/components/ui";

export default function PlanScreen() {
  const p = usePalette();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [nudge, setNudge] = useState("");

  useFocusEffect(
    useCallback(() => {
      getPlan().then(setPlan);
      getSessions().then(setSessions);
      setNudge(nudgeForDate(new Date()));
    }, [])
  );

  if (!plan) return <Screen scroll={false} safeTop>{null}</Screen>;

  return (
    <Screen safeTop>
      <H1 style={{ marginTop: 12 }}>The game plan</H1>
      <P style={{ marginTop: 10 }}>
        Marriages aren&apos;t repaired in sessions. They&apos;re repaired between them: the rituals
        you keep, the commitments you honor, one small act of repair a day.
      </P>

      <Card tone="fern" style={{ marginTop: 18 }}>
        <Muted style={{ textTransform: "uppercase", letterSpacing: 1.5, fontWeight: "700", color: p.mossDeep }}>
          Today&apos;s nudge
        </Muted>
        <H2 style={{ marginTop: 8 }}>{nudge}</H2>
        <Muted style={{ marginTop: 8 }}>
          A new one every day. Doing it matters more than feeling like it; action usually arrives
          before the feeling does.
        </Muted>
      </Card>

      <H2 style={{ marginTop: 24 }}>Commitments from your sessions</H2>
      {plan.commitments.length === 0 ? (
        <Muted style={{ marginTop: 8 }}>
          Nothing here yet. Every guided session ends with one small commitment from each of you,
          and they collect here.
        </Muted>
      ) : (
        <View style={{ marginTop: 10, gap: 8 }}>
          {plan.commitments.map((c, i) => (
            <Pressable key={`${c.date}-${i}`} onPress={async () => setPlan({ ...(await toggleCommitment(i)) })}>
              <Card style={{ paddingVertical: 12, opacity: c.done ? 0.55 : 1 }}>
                <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                  <Ionicons
                    name={c.done ? "checkmark-circle" : "ellipse-outline"}
                    size={20}
                    color={c.done ? p.moss : p.muted}
                  />
                  <Text
                    style={{
                      flex: 1,
                      color: p.ink,
                      fontSize: 14.5,
                      textDecorationLine: c.done ? "line-through" : "none",
                    }}
                  >
                    <Text style={{ fontWeight: "700" }}>{c.who || "Someone"}: </Text>
                    {c.text}
                  </Text>
                </View>
              </Card>
            </Pressable>
          ))}
        </View>
      )}

      <H2 style={{ marginTop: 24 }}>Rituals of connection</H2>
      <Muted style={{ marginTop: 6 }}>
        Pick two or three: the ones you&apos;ll keep on a bad week, not the ones that sound nice.
        Tap to adopt.
      </Muted>
      <View style={{ marginTop: 10, gap: 8 }}>
        {rituals.map((r) => {
          const active = plan.rituals.includes(r.id);
          return (
            <Pressable key={r.id} onPress={async () => setPlan({ ...(await toggleRitual(r.id)) })}>
              <Card style={{ borderColor: active ? p.moss : p.line }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={{ fontWeight: "700", color: p.ink, fontSize: 15.5, flex: 1 }}>{r.title}</Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      color: active ? p.surface : p.muted,
                      backgroundColor: active ? p.moss : p.panel,
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                      borderRadius: 99,
                      overflow: "hidden",
                    }}
                  >
                    {active ? "Ours" : r.cadence}
                  </Text>
                </View>
                <Muted style={{ marginTop: 6 }}>{r.body}</Muted>
              </Card>
            </Pressable>
          );
        })}
      </View>

      <H2 style={{ marginTop: 24 }}>Sessions you&apos;ve held</H2>
      {sessions.length === 0 ? (
        <Muted style={{ marginTop: 8 }}>None yet. The table is set whenever you are.</Muted>
      ) : (
        <View style={{ marginTop: 10, gap: 8 }}>
          {sessions.map((s) => (
            <Card key={s.id} style={{ paddingVertical: 12 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontWeight: "600", color: p.ink, flex: 1, fontSize: 14.5 }}>{s.topicTitle}</Text>
                <Muted>
                  {new Date(s.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </Muted>
              </View>
            </Card>
          ))}
        </View>
      )}

      <Muted style={{ marginTop: 24 }}>
        Everything on this page lives on this phone, private by design.
      </Muted>
    </Screen>
  );
}
