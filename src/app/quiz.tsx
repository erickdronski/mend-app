import { useState } from "react";
import { View } from "react-native";
import {
  conflictQuestions,
  getConflictResult,
  getLensResult,
  lensQuestions,
  quizDisclaimer,
  type ConflictRole,
  type LensId,
} from "@/lib/content/quiz";
import { getProfile, saveProfile } from "@/lib/store";
import {
  Btn,
  Card,
  Chip,
  CollapsibleP,
  H1,
  H2,
  Hero,
  IconChip,
  Muted,
  P,
  Screen,
  usePalette,
} from "@/components/ui";
import { GlideBar, Press, Reveal } from "@/components/motion";

type Stage = "intro" | "who" | "lens" | "conflict" | "result";

/** A springy answer target that tints sky while held. */
function OptionCard({ text, index, onPress }: { text: string; index: number; onPress: () => void }) {
  const p = usePalette();
  const sky = p.hues.sky;
  const [held, setHeld] = useState(false);
  return (
    <Reveal index={index}>
      <Press
        onPress={onPress}
        haptic
        onTouchStart={() => setHeld(true)}
        onTouchEnd={() => setHeld(false)}
        onTouchCancel={() => setHeld(false)}
      >
        <View
          style={{
            borderRadius: 18,
            borderWidth: 1,
            paddingHorizontal: 18,
            paddingVertical: 14,
            backgroundColor: held ? sky.bg : p.raised,
            borderColor: held ? sky.accent : p.line,
          }}
        >
          <P style={{ fontSize: 14.5 }}>{text}</P>
        </View>
      </Press>
    </Reveal>
  );
}

export default function Quiz() {
  const p = usePalette();
  const sky = p.hues.sky;
  const [stage, setStage] = useState<Stage>("intro");
  const [who, setWho] = useState<0 | 1 | null>(null);
  const [names, setNames] = useState<[string, string]>(["Partner A", "Partner B"]);
  const [qIndex, setQIndex] = useState(0);
  const [lensTally, setLensTally] = useState<Record<LensId, number>>({ secure: 0, anxious: 0, avoidant: 0 });
  const [roleTally, setRoleTally] = useState<Record<ConflictRole, number>>({ pursuer: 0, withdrawer: 0 });

  function pickLens(lens: LensId) {
    setLensTally((t) => ({ ...t, [lens]: t[lens] + 1 }));
    if (qIndex + 1 >= lensQuestions.length) {
      setQIndex(0);
      setStage("conflict");
    } else setQIndex(qIndex + 1);
  }

  async function pickRole(role: ConflictRole) {
    const tally = { ...roleTally, [role]: roleTally[role] + 1 };
    setRoleTally(tally);
    if (qIndex + 1 >= conflictQuestions.length) {
      // persist lens + role for this partner (feeds the journey)
      const ranked = (Object.entries(lensTally) as [LensId, number][]).sort((a, b) => b[1] - a[1]);
      const topLens = ranked[0][0];
      const topRole: ConflictRole = tally.pursuer >= tally.withdrawer ? "pursuer" : "withdrawer";
      const prof = await getProfile();
      if (prof && who !== null) {
        const key = who === 0 ? "a" : "b";
        prof.lenses = { ...prof.lenses, [key]: topLens };
        prof.roles = { ...prof.roles, [key]: topRole };
        await saveProfile(prof);
      }
      setStage("result");
    } else setQIndex(qIndex + 1);
  }

  function reset() {
    setStage("who");
    setWho(null);
    setQIndex(0);
    setLensTally({ secure: 0, anxious: 0, avoidant: 0 });
    setRoleTally({ pursuer: 0, withdrawer: 0 });
  }

  if (stage === "intro") {
    return (
      <Screen>
        <Hero
          hue="sky"
          eyebrow="Quiz"
          title="How you love & fight"
          sub="Find your attachment lens and your role in the fight cycle."
          style={{ marginTop: 8 }}
        />
        <CollapsibleP style={{ marginTop: 14 }}>
          Eighteen quick scenario questions. The first twelve find your attachment lens: the
          reflex your nervous system reaches for when closeness feels uncertain. The last six
          find your role in the fight cycle. Take it separately, then trade phones and read each
          other&apos;s results. That trade is the whole point.
        </CollapsibleP>
        <Card tone="panel" style={{ marginTop: 14 }}>
          <Muted>{quizDisclaimer}</Muted>
        </Card>
        <Btn
          label="Start the quiz"
          onPress={async () => {
            const prof = await getProfile();
            if (prof && (prof.a || prof.b)) setNames([prof.a || "Partner A", prof.b || "Partner B"]);
            setStage("who");
          }}
          style={{ marginTop: 18 }}
        />
      </Screen>
    );
  }

  if (stage === "who") {
    return (
      <Screen>
        <H1 style={{ marginTop: 8 }}>Who&apos;s taking it right now?</H1>
        <P style={{ marginTop: 10 }}>
          Your result is saved to your name, and the journey checks that you&apos;ve both taken
          it. No peeking while the other answers.
        </P>
        <View style={{ marginTop: 18, gap: 10 }}>
          {([0, 1] as const).map((i) => (
            <Btn
              key={i}
              label={names[i]}
              onPress={() => {
                setWho(i);
                setStage("lens");
              }}
            />
          ))}
        </View>
      </Screen>
    );
  }

  if (stage === "lens" || stage === "conflict") {
    const isLens = stage === "lens";
    const number = isLens ? qIndex + 1 : lensQuestions.length + qIndex + 1;
    const total = lensQuestions.length + conflictQuestions.length;
    const prompt = isLens ? lensQuestions[qIndex].prompt : conflictQuestions[qIndex].prompt;
    return (
      <Screen>
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}
        >
          <Chip label={isLens ? "Part one: how you love" : "Part two: how you fight"} hue="sky" />
          <Chip label={`${number} of ${total}`} hue="sky" />
        </View>
        <View style={{ marginTop: 12 }}>
          <GlideBar progress={number / total} color={sky.accent} track={p.panel} height={5} />
        </View>
        <H2 style={{ marginTop: 20, fontSize: 19, lineHeight: 26 }}>{prompt}</H2>
        <View style={{ marginTop: 16, gap: 10 }}>
          {isLens
            ? lensQuestions[qIndex].options.map((o, i) => (
                <OptionCard
                  key={`lens-${qIndex}-${i}`}
                  index={i}
                  text={o.text}
                  onPress={() => pickLens(o.lens)}
                />
              ))
            : conflictQuestions[qIndex].options.map((o, i) => (
                <OptionCard
                  key={`conflict-${qIndex}-${i}`}
                  index={i}
                  text={o.text}
                  onPress={() => pickRole(o.role)}
                />
              ))}
        </View>
        <Muted style={{ marginTop: 12 }}>
          Answer for who you actually are on a hard day, not who you&apos;d like to be.
        </Muted>
      </Screen>
    );
  }

  // result
  const ranked = (Object.entries(lensTally) as [LensId, number][]).sort((a, b) => b[1] - a[1]);
  const lens = getLensResult(ranked[0][0])!;
  const blended = ranked[1][1] >= ranked[0][1] - 1 && ranked[1][1] > 0;
  const second = blended ? getLensResult(ranked[1][0])! : null;
  const role = getConflictResult(roleTally.pursuer >= roleTally.withdrawer ? "pursuer" : "withdrawer")!;

  return (
    <Screen>
      <Muted style={{ marginTop: 8 }}>
        {who !== null ? `${names[who]}'s attachment lens` : "Your attachment lens"}
      </Muted>
      <H1 style={{ marginTop: 4, fontSize: 32, lineHeight: 38 }}>{lens.title}</H1>
      {second && (
        <Muted style={{ marginTop: 6 }}>
          With a strong second read: {second.title.toLowerCase()}. Most people are a blend; read
          both and keep what rings true.
        </Muted>
      )}
      <P style={{ marginTop: 12 }}>{lens.summary}</P>

      <Card tone="fern" style={{ marginTop: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <IconChip name="heart" hue="sky" />
          <H2 style={{ flex: 1 }}>What this gives your relationship</H2>
        </View>
        {lens.strengths.map((s) => (
          <P key={s} style={{ marginTop: 8, fontSize: 14 }}>
            · {s}
          </P>
        ))}
      </Card>
      <Card style={{ marginTop: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <IconChip name="eye" hue="rose" />
          <H2 style={{ flex: 1 }}>Worth watching for</H2>
        </View>
        {lens.watchFor.map((s) => (
          <P key={s} style={{ marginTop: 8, fontSize: 14 }}>
            · {s}
          </P>
        ))}
      </Card>
      <Card style={{ marginTop: 10, borderColor: p.hues.rose.accent, borderWidth: 1.5 }}>
        <Chip label="For your partner" hue="rose" icon="heart" />
        <H2 style={{ marginTop: 8 }}>Hand the phone over</H2>
        <Muted style={{ marginTop: 2 }}>This part is written to your partner, not to you.</Muted>
        <P style={{ marginTop: 10 }}>{lens.forYourPartner}</P>
      </Card>

      <Muted style={{ marginTop: 20 }}>In the fight cycle, you tend to be</Muted>
      <H2 style={{ marginTop: 4 }}>{role.title}</H2>
      <P style={{ marginTop: 8 }}>{role.summary}</P>
      <Card tone="panel" style={{ marginTop: 12 }}>
        <H2>Softening moves for your role</H2>
        {role.softening.map((s) => (
          <P key={s} style={{ marginTop: 8, fontSize: 14 }}>
            · {s}
          </P>
        ))}
      </Card>

      <Card style={{ marginTop: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <IconChip name="compass" hue="ember" />
          <H2 style={{ flex: 1 }}>Use it inside Mend</H2>
        </View>
        {lens.inMend.map((s) => (
          <P key={s} style={{ marginTop: 8, fontSize: 14 }}>
            · {s}
          </P>
        ))}
        <Muted style={{ marginTop: 10 }}>{quizDisclaimer}</Muted>
      </Card>

      <View style={{ marginTop: 18, gap: 10, marginBottom: 10 }}>
        <Btn label="Now your partner's turn" onPress={reset} />
      </View>
    </Screen>
  );
}
