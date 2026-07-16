import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Bloom, Bounce, GlideBar, Press } from "@/components/motion";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { addPulse, getJourney, getProfile, getPulses } from "@/lib/store";
import { PULSE_QUESTIONS, pulseAvg } from "@/lib/journey";
import { Btn, Card, Eyebrow, H1, H2, Hero, IconChip, Muted, P, Screen, usePalette } from "@/components/ui";

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
  const [selected, setSelected] = useState<number | null>(null);
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

  /** Let the chosen circle fill and pop before the question advances. */
  function choose(n: number) {
    if (selected !== null) return;
    setSelected(n);
    setTimeout(() => {
      setSelected(null);
      rate(n);
    }, 320);
  }

  if (step === "who") {
    return (
      <Screen>
        <Hero
          hue="ember"
          eyebrow="Pulse check"
          title="Who's answering first?"
          sub="Five statements about the last stretch, rated honestly and separately."
        />
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
          Don&apos;t negotiate your answers; the gap between your two truths is useful
          information, not a problem.
        </Muted>
        <Muted style={{ marginTop: 8 }}>
          Partner not on board yet? Answer for yourself and leave theirs for later; the journey
          will wait.
        </Muted>
      </Screen>
    );
  }

  if (step === "rate") {
    const hue = p.hues.ember;
    return (
      <Screen>
        <Muted>
          {names[who]} · {qIndex + 1} of {PULSE_QUESTIONS.length}
        </Muted>
        <View style={{ marginTop: 10 }}>
          <GlideBar
            progress={(qIndex + (selected !== null ? 1 : 0)) / PULSE_QUESTIONS.length}
            color={hue.accent}
            track={hue.bg}
            height={6}
          />
        </View>
        <H1 style={{ marginTop: 18 }}>{PULSE_QUESTIONS[qIndex]}</H1>
        <Muted style={{ marginTop: 10 }}>1 = not at all · 5 = completely true</Muted>
        <View style={{ flexDirection: "row", gap: 10, marginTop: 26 }}>
          {[1, 2, 3, 4, 5].map((n) => {
            const chosen = selected === n;
            return (
              <Press key={n} onPress={() => choose(n)} scaleTo={0.88} style={{ flex: 1 }}>
                <Bounce trigger={chosen}>
                  <View
                    style={{
                      aspectRatio: 1,
                      minHeight: 48,
                      borderRadius: 999,
                      borderWidth: 1,
                      borderColor: chosen ? hue.accent : p.line,
                      backgroundColor: chosen ? hue.accent : p.raised,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 22, fontWeight: "700", color: chosen ? p.surface : p.ink }}>
                      {n}
                    </Text>
                  </View>
                </Bounce>
              </Press>
            );
          })}
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
        <Eyebrow hue="ember">Just for you, {names[who]}</Eyebrow>
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
        <Card style={{ marginTop: 20, backgroundColor: p.hues.ember.bg, borderColor: "transparent" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <IconChip name="swap-horizontal" hue="ember" size={38} />
            <H2 style={{ color: p.hues.ember.fg }}>Pass the phone</H2>
          </View>
          <P style={{ marginTop: 10, color: p.hues.ember.fg }}>
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
      <View style={{ alignItems: "center", marginTop: 16 }}>
        <Bloom trigger={step === "done"} color={p.hues.ember.accent} size={112}>
          <IconChip name="pulse" hue="ember" size={72} />
        </Bloom>
      </View>
      <H1 style={{ marginTop: 18, textAlign: "center" }}>Pulse recorded</H1>
      <P style={{ marginTop: 10, textAlign: "center" }}>
        {tookBoth
          ? "Both of you are on the record for this stage. The journey uses these numbers to keep the pace honest, and to celebrate real distance when you look back."
          : "Saved."}
      </P>
      <Btn label="Back to the journey" onPress={() => router.back()} style={{ marginTop: 20 }} />
    </Screen>
  );
}
