import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { Bounce, Press, Reveal } from "@/components/motion";
import { nudgeForDate, rituals } from "@/lib/content/nudges";
import {
  getPlan,
  getSessions,
  toggleCommitment,
  toggleRitual,
  type Plan,
  type SessionRecord,
} from "@/lib/store";
import {
  Card,
  Chip,
  CollapsibleP,
  Eyebrow,
  H2,
  Hero,
  IconChip,
  Muted,
  Screen,
  usePalette,
} from "@/components/ui";

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

  if (!plan) return <Screen scroll={false}>{null}</Screen>;

  const rose = p.hues.rose;
  const kept = plan.commitments.filter((c) => c.done).length;

  return (
    <Screen>
      <Hero
        hue="rose"
        eyebrow="Between sessions"
        title="The game plan"
        sub="Connection grows in the moments you repeat: attention, appreciation, honesty, and follow-through."
        style={{ marginTop: 12 }}
      />

      <Card style={{ marginTop: 14, backgroundColor: rose.bg, borderColor: "transparent" }}>
        <Eyebrow hue="rose">Today&apos;s nudge</Eyebrow>
        <H2 style={{ marginTop: 8, color: rose.fg }}>{nudge}</H2>
        <Muted style={{ marginTop: 8, color: rose.fg, opacity: 0.75 }}>
          A new one every day. Doing it matters more than feeling like it.
        </Muted>
      </Card>

      <View style={{ marginTop: 24, flexDirection: "row", alignItems: "center", gap: 8 }}>
        <H2 style={{ flex: 1 }}>Commitments</H2>
        {plan.commitments.length > 0 ? (
          <Chip hue="rose" icon="checkmark" label={`${kept} of ${plan.commitments.length} kept`} />
        ) : null}
      </View>
      {plan.commitments.length === 0 ? (
        <Muted style={{ marginTop: 8 }}>
          Nothing here yet. Every guided session ends with one small commitment from each of you,
          and they collect here.
        </Muted>
      ) : (
        <View style={{ marginTop: 10, gap: 8 }}>
          {plan.commitments.map((c, i) => (
            <Reveal key={`${c.date}-${i}`} index={i}>
              <Press onPress={async () => setPlan({ ...(await toggleCommitment(i)) })}>
                <Card style={{ paddingVertical: 12, opacity: c.done ? 0.6 : 1 }}>
                  <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
                    <Bounce trigger={c.done}>
                      <IconChip name={c.done ? "checkmark" : "ellipse-outline"} hue="rose" size={34} />
                    </Bounce>
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
              </Press>
            </Reveal>
          ))}
        </View>
      )}

      <H2 style={{ marginTop: 24 }}>Rituals of connection</H2>
      <Muted style={{ marginTop: 6 }}>
        Pick two or three: the ones you&apos;ll keep on a bad week. Tap to adopt.
      </Muted>
      <View style={{ marginTop: 10, gap: 8 }}>
        {rituals.map((r, i) => {
          const active = plan.rituals.includes(r.id);
          return (
            <Reveal key={r.id} index={i}>
              <Press onPress={async () => setPlan({ ...(await toggleRitual(r.id)) })}>
                <Card style={{ borderColor: active ? rose.accent : p.line }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                    <Bounce trigger={active}>
                      <IconChip name={active ? "heart" : "heart-outline"} hue="rose" size={36} />
                    </Bounce>
                    <Text style={{ fontWeight: "700", color: p.ink, fontSize: 15.5, flex: 1 }} numberOfLines={2}>
                      {r.title}
                    </Text>
                    <Chip hue="rose" label={active ? "Ours" : r.cadence} />
                  </View>
                  <CollapsibleP lines={2} style={{ marginTop: 8, fontSize: 13.5 }}>
                    {r.body}
                  </CollapsibleP>
                </Card>
              </Press>
            </Reveal>
          );
        })}
      </View>

      <H2 style={{ marginTop: 24 }}>Sessions you&apos;ve held</H2>
      {sessions.length === 0 ? (
        <Muted style={{ marginTop: 8 }}>None yet. The table is set whenever you are.</Muted>
      ) : (
        <View style={{ marginTop: 10, gap: 8 }}>
          {sessions.map((s, i) => (
            <Reveal key={s.id} index={i}>
              <Card style={{ paddingVertical: 12 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <IconChip name="chatbubbles-outline" hue="rose" size={30} />
                  <Text style={{ fontWeight: "600", color: p.ink, flex: 1, fontSize: 14.5 }} numberOfLines={1}>
                    {s.topicTitle}
                  </Text>
                  <Muted>
                    {new Date(s.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                  </Muted>
                </View>
              </Card>
            </Reveal>
          ))}
        </View>
      )}

      <Muted style={{ marginTop: 24 }}>Private to the two of you.</Muted>
    </Screen>
  );
}
