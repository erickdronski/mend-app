import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { addPulse, getJourney, getProfile, getPulses } from "@/lib/store";
import { PULSE_QUESTIONS, pulseAvg } from "@/lib/journey";
import { Btn, Card, H1, H2, Muted, P, Screen, usePalette } from "@/components/ui";

type Step = "who" | "rate" | "handoff" | "done" | "support";

/**
 * The pulse check: five statements, rated 1-5, separately by each partner.
 * The honest "before/after photo" that gates each stage.
 */
export default function Pulse() {
  const p = usePalette();
  const router = useRouter();
  const [names, setNames] = useState<[string, string]>(["Partner A", "Partner B"]);
  const [stage, setStage] = useState(1);
  const [who, setWho] = useState<0 | 1>(0);
  const [step, setStep] = useState<Step>("who");
  const [qIndex, setQIndex] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [tookBoth, setTookBoth] = useState(false);
  const [afterSupport, setAfterSupport] = useState<Step>("handoff");
  const [prevAvg, setPrevAvg] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const [profile, j] = await Promise.all([getProfile(), getJourney()]);
      if (profile) setNames([profile.a || "Partner A", profile.b || "Partner B"]);
      setStage(Math.min(j.stage, 5));
    })();
  }, []);

  async function rate(score: number) {
    Haptics.selectionAsync().catch(() => {});
    const next = [...scores, score];
    if (qIndex + 1 < PULSE_QUESTIONS.length) {
      setScores(next);
      setQIndex(qIndex + 1);
      return;
    }
    // one partner finished
    await addPulse({ stage, who, scores: next, date: new Date().toISOString() });
    const pulses = await getPulses();
    const otherDone = pulses.some((e) => e.stage === stage && e.who === (who === 0 ? 1 : 0));
    if (stage > 1) setPrevAvg(pulseAvg(pulses, stage - 1, who));
    setScores([]);
    setQIndex(0);
    const dest = otherDone ? "done" : "handoff";
    if (otherDone) setTookBoth(true);
    // If THIS person's own answers were low, offer real support privately, on
    // their turn, before the phone is handed on. It never surfaces on a shared
    // screen, so it can't out who scored low.
    const selfAvg = next.reduce((a, b) => a + b, 0) / next.length;
    if (selfAvg <= 2) {
      setAfterSupport(dest);
      setStep("support");
    } else {
      setStep(dest);
    }
  }

  if (step === "who") {
    return (
      <Screen>
        <H1>Who's answering first?</H1>
        <P style={{ marginTop: 10 }}>
          Five statements about the last stretch, rated honestly and separately. Don&apos;t
          negotiate your answers; the gap between your two truths is useful information, not a
          problem.
        </P>
        <View style={{ marginTop: 22, gap: 10 }}>
          {([0, 1] as const).map((i) => (
            <Btn
              key={i}
              label={names[i]}
              onPress={() => {
                setWho(i);
                setStep("rate");
              }}
            />
          ))}
        </View>
        <Muted style={{ marginTop: 16 }}>
          Partner not on board yet? Answer for yourself and leave theirs for later; the journey
          will wait.
        </Muted>
      </Screen>
    );
  }

  if (step === "rate") {
    return (
      <Screen>
        <Muted>
          {names[who]} · {qIndex + 1} of {PULSE_QUESTIONS.length}
        </Muted>
        <H1 style={{ marginTop: 10 }}>{PULSE_QUESTIONS[qIndex]}</H1>
        <Muted style={{ marginTop: 10 }}>1 = not at all · 5 = completely true</Muted>
        <View style={{ flexDirection: "row", gap: 8, marginTop: 24 }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Pressable
              key={n}
              onPress={() => rate(n)}
              style={({ pressed }) => ({
                flex: 1,
                aspectRatio: 0.9,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: p.line,
                backgroundColor: pressed ? p.fern : p.raised,
                alignItems: "center",
                justifyContent: "center",
              })}
            >
              <Text style={{ fontSize: 22, fontWeight: "700", color: p.ink }}>{n}</Text>
            </Pressable>
          ))}
        </View>
        <Muted style={{ marginTop: 20 }}>
          Answer for the season, not for today's mood. And answer for yourself; your partner
          can't see this screen.
        </Muted>
      </Screen>
    );
  }

  if (step === "support") {
    return (
      <Screen>
        <Muted style={{ textTransform: "uppercase", letterSpacing: 2, fontWeight: "700", color: p.ember }}>
          Just for you, {names[who]}
        </Muted>
        <H1 style={{ marginTop: 8 }}>This season is landing hard</H1>
        <P style={{ marginTop: 10 }}>
          Your answers were honest, and they were low. That is worth more than an app can hold.
          Keep going here if it helps, and please also look at real support. This is on your
          screen only; your partner will not see it.
        </P>
        <Btn label="Show me help" onPress={() => router.push("/safety")} style={{ marginTop: 20 }} />
        <Btn
          label="Continue"
          kind="ghost"
          onPress={() => setStep(afterSupport)}
          style={{ marginTop: 10 }}
        />
      </Screen>
    );
  }

  if (step === "handoff") {
    const other = who === 0 ? 1 : 0;
    return (
      <Screen>
        <H1>Thanks, {names[who]}</H1>
        {prevAvg !== null && (
          <Muted style={{ marginTop: 8 }}>Saved. Your last stage's average was {prevAvg.toFixed(1)}.</Muted>
        )}
        <Card tone="fern" style={{ marginTop: 20 }}>
          <H2>Pass the phone</H2>
          <P style={{ marginTop: 8 }}>
            {names[other]}, same five statements, your own honest numbers. {names[who]}, no
            peeking and no lobbying.
          </P>
          <Btn
            label={`I'm ${names[other]}, start`}
            kind="moss"
            onPress={() => {
              setWho(other as 0 | 1);
              setStep("rate");
            }}
            style={{ marginTop: 14 }}
          />
        </Card>
        <Btn
          label="They'll do theirs later"
          kind="ghost"
          onPress={() => router.back()}
          style={{ marginTop: 12 }}
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <H1>Pulse recorded</H1>
      <P style={{ marginTop: 10 }}>
        {tookBoth
          ? "Both of you are on the record for this stage. The journey uses these numbers to keep the pace honest, and to celebrate real distance when you look back."
          : "Saved."}
      </P>
      <Btn label="Back to the journey" onPress={() => router.back()} style={{ marginTop: 20 }} />
    </Screen>
  );
}
