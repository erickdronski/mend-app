import { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { saveProfile } from "@/lib/store";
import { whyGateMatters } from "@/lib/content/safety";
import { Btn, Card, H1, H2, Input, Label, Muted, P, Screen, usePalette } from "@/components/ui";

/**
 * Onboarding is the contract. A couple should leave it knowing exactly what
 * Mend asks of them, what it promises, and that it is honest about who it
 * is NOT for (relationships with violence, fear, or control).
 */
export default function Onboarding() {
  const router = useRouter();
  const p = usePalette();
  const [step, setStep] = useState<"deal" | "gate" | "names">("deal");
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  async function finish() {
    await saveProfile({
      a: a.trim(),
      b: b.trim(),
      safetyAck: true,
      createdAt: new Date().toISOString(),
    });
    router.replace("/");
  }

  if (step === "deal") {
    return (
      <Screen safeTop>
        <Muted style={{ textTransform: "uppercase", letterSpacing: 2, fontWeight: "700", color: p.ember }}>
          Before anything else
        </Muted>
        <H1 style={{ marginTop: 8 }}>Here's the deal</H1>
        <P style={{ marginTop: 12 }}>
          Mend is a staged journey, not a bag of tips. It starts embarrassingly easy and gets
          deeper as you get stronger, over months. Here's what it asks of you, and what it
          promises back.
        </P>

        <View style={{ marginTop: 20, gap: 12 }}>
          <Card>
            <H2>What it asks</H2>
            <P style={{ marginTop: 8 }}>
              Twenty honest minutes a week, together. Both of you, eventually (one of you can
              start alone). Honesty on the pulse checks: this only works at the speed of truth.
              And patience: real repair is measured in months, not moods.
            </P>
          </Card>
          <Card>
            <H2>What it promises</H2>
            <P style={{ marginTop: 8 }}>
              The structure and language of real counseling frameworks (the kind couples usually
              pay hundreds a session to learn), one stage at a time: protected speaking time,
              tools for how you fight, games that rebuild curiosity, and paths through the
              heaviest seasons. Free, private, on your phone.
            </P>
          </Card>
          <Card tone="fern">
            <H2>How it ends</H2>
            <P style={{ marginTop: 8 }}>
              With you deleting it. Mend is designed to get you off the app and back into a
              marriage that holds itself up. Graduation is the feature.
            </P>
          </Card>
        </View>

        <Btn label="We understand" onPress={() => setStep("gate")} style={{ marginTop: 24 }} />
      </Screen>
    );
  }

  if (step === "gate") {
    return (
      <Screen safeTop>
        <Muted style={{ textTransform: "uppercase", letterSpacing: 2, fontWeight: "700", color: p.ember }}>
          One honest question
        </Muted>
        <H1 style={{ marginTop: 8 }}>Is either of you afraid of the other?</H1>
        <P style={{ marginTop: 12 }}>
          Not "do we fight." Fights are why Mend exists. This is about violence, fear, or
          control, physical or otherwise.
        </P>
        <Muted style={{ marginTop: 12 }}>{whyGateMatters}</Muted>
        <View style={{ marginTop: 24, gap: 10 }}>
          <Btn label="We're safe with each other. Continue" onPress={() => setStep("names")} />
          <Btn
            label="I'm not sure, or I don't feel safe. Show me help"
            kind="ghost"
            onPress={() => router.push("/safety")}
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen safeTop>
      <H1>Who's mending?</H1>
      <P style={{ marginTop: 10 }}>
        First names only. They label the timer and the games; nothing leaves this phone without
        your say-so.
      </P>
      <View style={{ marginTop: 22, gap: 14 }}>
        <View>
          <Label>Partner A</Label>
          <Input value={a} onChangeText={setA} placeholder="First name" autoComplete="off" />
        </View>
        <View>
          <Label>Partner B</Label>
          <Input value={b} onChangeText={setB} placeholder="First name" autoComplete="off" />
        </View>
        <Muted>
          Starting alone? Put your partner's name in anyway. Stage one is built so one willing
          person can begin.
        </Muted>
        <Btn label="Begin stage one" onPress={finish} />
      </View>
    </Screen>
  );
}
