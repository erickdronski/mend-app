import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useRouter, type Href } from "expo-router";
import { memoryLane, partnerQuiz, wouldYouRather } from "@/lib/content/games";
import { getProfile } from "@/lib/store";
import { usePremium } from "@/lib/premium";
import {
  Btn,
  Card,
  Chip,
  CollapsibleP,
  Eyebrow,
  H1,
  H2,
  Hero,
  IconChip,
  Muted,
  P,
  Screen,
  usePalette,
} from "@/components/ui";
import { Bloom, Bounce, GlideBar, Press, Reveal } from "@/components/motion";

type Mode = "menu" | "quiz-setup" | "quiz-play" | "quiz-done" | "wyr" | "memory";
const QUESTIONS_PER_GUESSER = 7;

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function Games() {
  const p = usePalette();
  const honey = p.hues.honey;
  const router = useRouter();
  const { plus } = usePremium();
  const [mode, setMode] = useState<Mode>("menu");
  const [names, setNames] = useState<[string, string]>(["Partner A", "Partner B"]);
  const [guesser, setGuesser] = useState<0 | 1>(0);
  const [questions, setQuestions] = useState<typeof partnerQuiz>([]);
  const [qIndex, setQIndex] = useState(0);
  const [scores, setScores] = useState<[number, number]>([0, 0]);
  const [revealed, setRevealed] = useState(false);
  const [wyrList, setWyrList] = useState<typeof wouldYouRather>([]);
  const [wyrIndex, setWyrIndex] = useState(0);
  const [memIndex, setMemIndex] = useState(0);

  useEffect(() => {
    getProfile().then((prof) => {
      if (prof && (prof.a || prof.b)) setNames([prof.a || "Partner A", prof.b || "Partner B"]);
    });
  }, []);

  const other: 0 | 1 = guesser === 0 ? 1 : 0;

  function startQuiz(first: 0 | 1) {
    setQuestions(shuffle(partnerQuiz).slice(0, QUESTIONS_PER_GUESSER * 2));
    setGuesser(first);
    setQIndex(0);
    setScores([0, 0]);
    setRevealed(false);
    setMode("quiz-play");
  }

  function judge(points: number) {
    const next: [number, number] = [...scores];
    next[guesser] += points;
    setScores(next);
    setRevealed(false);
    if (qIndex + 1 >= questions.length) setMode("quiz-done");
    else {
      if (qIndex + 1 === QUESTIONS_PER_GUESSER) setGuesser(other);
      setQIndex(qIndex + 1);
    }
  }

  if (mode === "menu") {
    // The first game is the free-tier sampler; the rest open with Plus.
    const items = [
      {
        key: "know",
        icon: "help-circle" as const,
        title: "Do you still know me?",
        desc: "One of you guesses what the other would say. Score is kept, but every miss is really an invitation: something to ask about at dinner.",
        free: true,
        go: () => setMode("quiz-setup"),
      },
      {
        key: "wyr",
        icon: "swap-horizontal" as const,
        title: "Would you rather",
        desc: "Harmless dilemmas, answered out loud at the same time. Half the fun is finding out your person has terrible opinions.",
        free: false,
        go: () => {
          setWyrList(shuffle(wouldYouRather));
          setWyrIndex(0);
          setMode("wyr");
        },
      },
      {
        key: "memory",
        icon: "book" as const,
        title: "Memory lane",
        desc: "One of you retells a story you both already own, in detail. The other gets to hear how it looked from your side.",
        free: false,
        go: () => {
          setMemIndex(0);
          setMode("memory");
        },
      },
    ];
    return (
      <Screen>
        <Hero
          hue="honey"
          eyebrow="Games"
          title="Play your way back to each other"
          sub="Curiosity, laughter, and the old stories retold. None of these need a good mood to start."
          style={{ marginTop: 8 }}
        />
        <View style={{ marginTop: 16, gap: 12 }}>
          {items.map((g, i) => {
            const locked = !plus && !g.free;
            return (
              <Reveal key={g.key} index={i}>
                <Press onPress={locked ? () => router.push("/plus" as Href) : g.go} haptic>
                  <Card style={locked ? { opacity: 0.82 } : undefined}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                      <IconChip name={g.icon} hue="honey" size={40} />
                      <H2 style={{ flex: 1 }}>{g.title}</H2>
                      {locked ? <Chip label="Plus" hue="ember" icon="lock-closed" /> : null}
                    </View>
                    <Muted style={{ marginTop: 8 }} numberOfLines={2}>
                      {g.desc}
                    </Muted>
                  </Card>
                </Press>
              </Reveal>
            );
          })}
        </View>
      </Screen>
    );
  }

  if (mode === "quiz-setup") {
    return (
      <Screen>
        <Press onPress={() => setMode("menu")}>
          <Muted style={{ marginTop: 8 }}>← All games</Muted>
        </Press>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginTop: 14 }}>
          <IconChip name="help-circle" hue="honey" size={44} />
          <H1 style={{ flex: 1, fontSize: 26, lineHeight: 32 }}>Do you still know me?</H1>
        </View>
        <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
          <Chip label={`${QUESTIONS_PER_GUESSER} questions each`} hue="honey" icon="list" />
        </View>
        <CollapsibleP style={{ marginTop: 12 }}>
          The guesser answers out loud, the other says how close they got. Be generous with
          &ldquo;close&rdquo; and curious about the misses; the misses are the game&apos;s real
          gift.
        </CollapsibleP>
        <Eyebrow hue="honey" style={{ marginTop: 18 }}>
          Who guesses first?
        </Eyebrow>
        <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
          {([0, 1] as const).map((i) => (
            <Btn key={i} label={names[i]} onPress={() => startQuiz(i)} style={{ flex: 1 }} />
          ))}
        </View>
      </Screen>
    );
  }

  if (mode === "quiz-play") {
    const q = questions[qIndex];
    const text = q.q.replace(/your partner/g, names[other]);
    return (
      <Screen>
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}
        >
          <Chip label={`${names[guesser]} guesses`} hue="honey" icon="person" />
          <Chip label={`${qIndex + 1} of ${questions.length}`} hue="honey" />
        </View>
        <View style={{ marginTop: 10 }}>
          <GlideBar progress={(qIndex + 1) / questions.length} color={honey.accent} track={p.panel} height={5} />
        </View>
        <Card style={{ marginTop: 16, padding: 24 }}>
          <Eyebrow hue="honey">{q.category}</Eyebrow>
          <Text style={{ marginTop: 10, fontSize: 20, lineHeight: 28, fontWeight: "700", color: p.ink }}>
            {text}
          </Text>
        </Card>
        {!revealed ? (
          <View style={{ marginTop: 16, alignItems: "center" }}>
            <Muted>{names[guesser]}, say your answer out loud. No hedging.</Muted>
            <Btn
              label={`${names[other]}, reveal the truth`}
              onPress={() => setRevealed(true)}
              style={{ marginTop: 12, alignSelf: "stretch" }}
            />
          </View>
        ) : (
          <View style={{ marginTop: 16 }}>
            <Muted style={{ textAlign: "center" }}>
              {names[other]}, give the real answer. Then judge, kindly.
            </Muted>
            <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
              <Btn label="Not quite" kind="ghost" onPress={() => judge(0)} style={{ flex: 1 }} />
              <Btn label="Close" kind="ghost" onPress={() => judge(1)} style={{ flex: 1 }} />
              <Btn label="Nailed it" kind="moss" onPress={() => judge(2)} style={{ flex: 1 }} />
            </View>
          </View>
        )}
        <Bounce trigger={scores[0] + scores[1]}>
          <Muted style={{ textAlign: "center", marginTop: 20 }}>
            Score: {names[0]} {scores[0]} · {names[1]} {scores[1]}
          </Muted>
        </Bounce>
      </Screen>
    );
  }

  if (mode === "quiz-done") {
    const [a, b] = scores;
    const max = QUESTIONS_PER_GUESSER * 2;
    return (
      <Screen>
        <View style={{ alignItems: "center", marginTop: 24 }}>
          <Bloom trigger color={honey.accent} size={104}>
            <IconChip name="sparkles" hue="honey" size={64} />
          </Bloom>
        </View>
        <H1 style={{ marginTop: 18, textAlign: "center" }}>
          {a === b ? "A perfect tie" : `${names[a > b ? 0 : 1]} knows best, apparently`}
        </H1>
        <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
          {([0, 1] as const).map((i) => (
            <Reveal key={i} index={i} style={{ flex: 1 }}>
              <Card style={{ alignItems: "center" }}>
                <Muted>{names[i]}</Muted>
                <Text style={{ fontSize: 34, fontWeight: "800", color: p.ink, marginTop: 4 }}>
                  {scores[i]}
                  <Text style={{ fontSize: 15, color: p.muted, fontWeight: "400" }}> / {max}</Text>
                </Text>
              </Card>
            </Reveal>
          ))}
        </View>
        <P style={{ marginTop: 16, textAlign: "center" }}>
          The number doesn&apos;t matter. The misses do: each one is a corner of your
          partner&apos;s world you get to visit again. Pick one miss each and ask about it
          properly tonight.
        </P>
        <View style={{ marginTop: 20, gap: 10 }}>
          <Btn label="New round, new questions" onPress={() => startQuiz(guesser)} />
          <Btn label="All games" kind="ghost" onPress={() => setMode("menu")} />
        </View>
      </Screen>
    );
  }

  if (mode === "wyr") {
    if (wyrIndex >= wyrList.length) {
      return (
        <Screen>
          <View style={{ alignItems: "center", marginTop: 24 }}>
            <IconChip name="happy" hue="honey" size={64} />
          </View>
          <H1 style={{ marginTop: 16, textAlign: "center" }}>Out of dilemmas</H1>
          <Muted style={{ marginTop: 8, textAlign: "center" }}>
            You now know each other slightly too well.
          </Muted>
          <Btn label="All games" onPress={() => setMode("menu")} style={{ marginTop: 20 }} />
        </Screen>
      );
    }
    const w = wyrList[wyrIndex];
    return (
      <Screen scroll={false}>
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}
        >
          <Press onPress={() => setMode("menu")}>
            <Muted>← All games</Muted>
          </Press>
          <Chip label={`${wyrIndex + 1} of ${wyrList.length}`} hue="honey" />
        </View>
        <View style={{ marginTop: 10 }}>
          <GlideBar progress={(wyrIndex + 1) / wyrList.length} color={honey.accent} track={p.panel} height={5} />
        </View>
        <View style={{ flex: 1, justifyContent: "center", gap: 10 }}>
          <H2 style={{ textAlign: "center" }}>Would you rather…</H2>
          <Reveal key={`a-${wyrIndex}`} index={0}>
            <Card style={{ padding: 22 }}>
              <P style={{ textAlign: "center", fontSize: 16 }}>{w.a}</P>
            </Card>
          </Reveal>
          <Chip label="or" hue="honey" style={{ alignSelf: "center" }} />
          <Reveal key={`b-${wyrIndex}`} index={1}>
            <Card style={{ padding: 22 }}>
              <P style={{ textAlign: "center", fontSize: 16 }}>{w.b}</P>
            </Card>
          </Reveal>
          <Muted style={{ textAlign: "center", marginTop: 6 }}>
            Count of three, answer at the same time. Defend yourselves.
          </Muted>
        </View>
        <Btn label="Next dilemma" onPress={() => setWyrIndex(wyrIndex + 1)} style={{ marginBottom: 20 }} />
      </Screen>
    );
  }

  // memory lane
  if (memIndex >= memoryLane.length) {
    return (
      <Screen>
        <View style={{ alignItems: "center", marginTop: 24 }}>
          <IconChip name="book" hue="honey" size={64} />
        </View>
        <H1 style={{ marginTop: 16, textAlign: "center" }}>All the stories, told</H1>
        <Muted style={{ marginTop: 8, textAlign: "center" }}>
          That history is yours. Nobody else has it, and nobody can take it.
        </Muted>
        <Btn label="All games" onPress={() => setMode("menu")} style={{ marginTop: 20 }} />
      </Screen>
    );
  }
  return (
    <Screen scroll={false}>
      <View
        style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}
      >
        <Press onPress={() => setMode("menu")}>
          <Muted>← All games</Muted>
        </Press>
        <Chip label={`${memIndex + 1} of ${memoryLane.length}`} hue="honey" />
      </View>
      <View style={{ marginTop: 10 }}>
        <GlideBar progress={(memIndex + 1) / memoryLane.length} color={honey.accent} track={p.panel} height={5} />
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Reveal key={memIndex} index={0}>
          <Card style={{ padding: 26 }}>
            <Eyebrow hue="honey">Memory lane</Eyebrow>
            <Text style={{ marginTop: 10, fontSize: 21, lineHeight: 29, fontWeight: "700", color: p.ink }}>
              {memoryLane[memIndex].prompt}
            </Text>
          </Card>
        </Reveal>
        <Muted style={{ textAlign: "center", marginTop: 12 }}>
          Take turns: one of you tells this one, the other tells the next. Details are the point.
        </Muted>
      </View>
      <Btn label="Next story" onPress={() => setMemIndex(memIndex + 1)} style={{ marginBottom: 20 }} />
    </Screen>
  );
}
