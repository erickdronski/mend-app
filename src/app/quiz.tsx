import { useState } from "react";
import { Pressable, Text, View } from "react-native";
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
import { Btn, Card, H1, H2, Muted, P, Screen, usePalette } from "@/components/ui";

type Stage = "intro" | "who" | "lens" | "conflict" | "result";

export default function Quiz() {
  const p = usePalette();
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
        <H1 style={{ marginTop: 8 }}>How you love & fight</H1>
        <P style={{ marginTop: 10 }}>
          Eighteen quick scenario questions. The first twelve find your attachment lens: the
          reflex your nervous system reaches for when closeness feels uncertain. The last six
          find your role in the fight cycle. Take it separately, then trade phones and read each
          other&apos;s results. That trade is the whole point.
        </P>
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
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
          <Muted>{isLens ? "Part one: how you love" : "Part two: how you fight"}</Muted>
          <Muted>
            {number} of {total}
          </Muted>
        </View>
        <View style={{ height: 4, backgroundColor: p.panel, borderRadius: 2, marginTop: 8, overflow: "hidden" }}>
          <View style={{ height: "100%", width: `${(number / total) * 100}%`, backgroundColor: p.moss, borderRadius: 2 }} />
        </View>
        <H2 style={{ marginTop: 20, fontSize: 19, lineHeight: 26 }}>{prompt}</H2>
        <View style={{ marginTop: 16, gap: 10 }}>
          {isLens
            ? lensQuestions[qIndex].options.map((o, i) => (
                <Pressable key={i} onPress={() => pickLens(o.lens)}>
                  <Card style={{ paddingVertical: 14 }}>
                    <P style={{ fontSize: 14.5 }}>{o.text}</P>
                  </Card>
                </Pressable>
              ))
            : conflictQuestions[qIndex].options.map((o, i) => (
                <Pressable key={i} onPress={() => pickRole(o.role)}>
                  <Card style={{ paddingVertical: 14 }}>
                    <P style={{ fontSize: 14.5 }}>{o.text}</P>
                  </Card>
                </Pressable>
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
      <H1 style={{ marginTop: 4 }}>{lens.title}</H1>
      {second && (
        <Muted style={{ marginTop: 6 }}>
          With a strong second read: {second.title.toLowerCase()}. Most people are a blend; read
          both and keep what rings true.
        </Muted>
      )}
      <P style={{ marginTop: 12 }}>{lens.summary}</P>

      <Card tone="fern" style={{ marginTop: 16 }}>
        <H2>What this gives your marriage</H2>
        {lens.strengths.map((s) => (
          <P key={s} style={{ marginTop: 8, fontSize: 14 }}>
            · {s}
          </P>
        ))}
      </Card>
      <Card style={{ marginTop: 10 }}>
        <H2>Worth watching for</H2>
        {lens.watchFor.map((s) => (
          <P key={s} style={{ marginTop: 8, fontSize: 14 }}>
            · {s}
          </P>
        ))}
      </Card>
      <Card style={{ marginTop: 10, borderColor: p.moss }}>
        <H2>Hand the phone over</H2>
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
        <H2>Use it inside Mend</H2>
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
