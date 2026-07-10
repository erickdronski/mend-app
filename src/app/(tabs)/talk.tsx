import { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { BreathingCircle, ProgressRing } from "@/components/rings";
import { getTopic, topics } from "@/lib/content/topics";
import { getTrack } from "@/lib/content/tracks";
import {
  addCommitments,
  addSession,
  getProfile,
  saveProfile,
  type Profile,
} from "@/lib/store";
import { Btn, Card, H1, H2, Input, Label, Muted, P, Screen, usePalette } from "@/components/ui";

type Phase =
  | "setup"
  | "rules"
  | "checkin"
  | "floor"
  | "reflect"
  | "appreciate"
  | "commit"
  | "done"
  | "break"
  | "ended";

type Source = { title: string; context: string; opener?: string; prompts: string[] };

const BREAK_SECONDS = 20 * 60;

const groundRules = [
  {
    title: "The floor is sacred",
    body: "While the timer runs, one of you speaks and one of you only listens. No interruptions, no corrections, no facial rebuttals. Your turn is coming.",
  },
  {
    title: "Speak for yourself",
    body: "“I felt…”, “I need…”, not “you always” or mind-reading what your partner meant. Your reality, from the inside.",
  },
  {
    title: "Listening isn't agreeing",
    body: "You'll be asked to reflect back what you heard. That proves you heard it. It doesn't mean you concede it. Both of your realities get to be true tonight.",
  },
  {
    title: "Either of you can pause",
    body: "If you feel flooded (heat, racing heart, the urge to flee or detonate), press pause. A break with a promised return is a skill, not a defeat.",
  },
  {
    title: "This stays here",
    body: "What's shared on the floor doesn't get used as ammunition later. That's the deal that makes honesty possible.",
  },
];

const reflectSteps = [
  {
    name: "Mirror",
    script: "“What I heard you say is… Did I get that right? Is there more?”",
    note: "Reflect their words back until they say you have it. Don't summarize it into something easier to hear.",
  },
  {
    name: "Validate",
    script: "“That makes sense to me, because…”",
    note: "Find the internal logic of their feeling. This is not agreeing. It's understanding out loud.",
  },
  {
    name: "Empathize",
    script: "“I imagine you might be feeling…”",
    note: "One guess at the emotion underneath. If you're wrong, let them correct you. That's connection too.",
  },
];

const fmt = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

export default function Talk() {
  const p = usePalette();
  const router = useRouter();
  const params = useLocalSearchParams<{ topic?: string; track?: string; s?: string }>();

  const urlSource = useMemo<Source | null>(() => {
    if (params.topic) {
      const t = getTopic(String(params.topic));
      if (t) return { title: t.title, context: t.why, opener: t.opener, prompts: t.prompts };
    }
    if (params.track) {
      const track = getTrack(String(params.track));
      const s = track?.sessions[Number(params.s ?? "0")];
      if (track && s) return { title: `${track.title}: ${s.title}`, context: s.focus, prompts: s.prompts };
    }
    return null;
  }, [params.topic, params.track, params.s]);

  const [phase, setPhase] = useState<Phase>("setup");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [names, setNames] = useState<[string, string]>(["", ""]);
  const [source, setSource] = useState<Source | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState("");
  const [turnMinutes, setTurnMinutes] = useState(3);
  const [rounds, setRounds] = useState(2);

  const [round, setRound] = useState(1);
  const [speaker, setSpeaker] = useState<0 | 1>(0);
  const [feelings, setFeelings] = useState<[string, string]>(["", ""]);
  const [appreciations, setAppreciations] = useState<[string, string]>(["", ""]);
  const [commitments, setCommitments] = useState<[string, string]>(["", ""]);

  const [secondsLeft, setSecondsLeft] = useState(turnMinutes * 60);
  const [running, setRunning] = useState(false);
  const [breakLeft, setBreakLeft] = useState(BREAK_SECONDS);
  const breakFrom = useRef<Phase>("floor");

  useEffect(() => {
    getProfile().then((prof) => {
      setProfile(prof);
      if (prof) setNames([prof.a, prof.b]);
    });
  }, []);

  // deep links restart the wizard with the requested source
  useEffect(() => {
    if (urlSource) {
      setSource(urlSource);
      setPhase("setup");
    }
  }, [urlSource]);

  useEffect(() => {
    if (phase !== "floor" || !running) return;
    const t = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(t);
          setRunning(false);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
          setPhase("reflect");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase, running]);

  useEffect(() => {
    if (phase !== "break") return;
    const t = setInterval(() => setBreakLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [phase]);

  const nameOf = (i: 0 | 1) => names[i].trim() || (i === 0 ? "Partner A" : "Partner B");
  const listener: 0 | 1 = speaker === 0 ? 1 : 0;

  function begin() {
    let s = source;
    if (!s) {
      s = {
        title: customTitle.trim() || "Our own topic",
        context:
          "A conversation the two of you chose. Same rules: one voice at a time, and the goal is understanding, not winning.",
        prompts: [
          "What's the heart of this for you, the feeling under the topic?",
          "What do you need your partner to understand most?",
          "What would 'better' concretely look like here?",
        ],
      };
    }
    // Spread the loaded profile so nothing (situation, lenses, roles) is
    // dropped; only names change here. Reconstructing the object literal
    // previously erased the onboarding situation on the first session.
    const prof: Profile = {
      ...(profile ?? { safetyAck: true, createdAt: new Date().toISOString() }),
      a: names[0].trim(),
      b: names[1].trim(),
      safetyAck: true,
    };
    saveProfile(prof);
    setProfile(prof);
    setSource(s);
    setSecondsLeft(turnMinutes * 60);
    setPhase("rules");
  }

  function startFloor(nextSpeaker: 0 | 1, nextRound: number) {
    setSpeaker(nextSpeaker);
    setRound(nextRound);
    setSecondsLeft(turnMinutes * 60);
    setRunning(false);
    setPhase("floor");
  }

  function afterReflect() {
    if (speaker === 0) startFloor(1, round);
    else if (round < rounds) startFloor(0, round + 1);
    else setPhase("appreciate");
  }

  function callBreak() {
    breakFrom.current = phase;
    setRunning(false);
    setBreakLeft(BREAK_SECONDS);
    setPhase("break");
  }

  async function finishSession() {
    const record = {
      id: `s_${Date.now()}`,
      date: new Date().toISOString(),
      topicTitle: source?.title ?? "Session",
      feelings,
      appreciations,
      commitments,
    };
    await addSession(record);
    await addCommitments([
      { text: commitments[0], who: nameOf(0), date: record.date, done: false },
      { text: commitments[1], who: nameOf(1), date: record.date, done: false },
    ]);
    setPhase("done");
  }

  function resetAll() {
    setSource(null);
    setCustomTitle("");
    setFeelings(["", ""]);
    setAppreciations(["", ""]);
    setCommitments(["", ""]);
    setPhase("setup");
  }

  // ————— setup —————
  if (phase === "setup") {
    return (
      <Screen safeTop>
        <Muted style={{ marginTop: 8, textTransform: "uppercase", letterSpacing: 2, fontWeight: "700", color: p.mossDeep }}>
          New session
        </Muted>
        <H1 style={{ marginTop: 6 }}>Set the table</H1>
        <P style={{ marginTop: 10 }}>
          Sit somewhere you can face each other. One phone between you is enough; Mend holds the
          structure so neither of you has to referee.
        </P>

        <View style={{ marginTop: 20, gap: 14 }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {([0, 1] as const).map((i) => (
              <View key={i} style={{ flex: 1 }}>
                <Label>Partner {i === 0 ? "A" : "B"}</Label>
                <Input
                  value={names[i]}
                  onChangeText={(v) => {
                    const next: [string, string] = [...names];
                    next[i] = v;
                    setNames(next);
                  }}
                  placeholder="First name"
                />
              </View>
            ))}
          </View>

          {source ? (
            <Card>
              <Muted>Tonight&apos;s conversation</Muted>
              <H2 style={{ marginTop: 4 }}>{source.title}</H2>
              <Muted style={{ marginTop: 8 }}>{source.context}</Muted>
              <Pressable onPress={() => setSource(null)}>
                <Text style={{ color: p.ember, fontWeight: "600", marginTop: 10, fontSize: 14 }}>
                  Choose a different topic
                </Text>
              </Pressable>
            </Card>
          ) : (
            <View>
              <Label>What are we talking about?</Label>
              <Pressable
                onPress={() => setPickerOpen(!pickerOpen)}
                style={{ borderWidth: 1, borderColor: p.line, backgroundColor: p.raised, borderRadius: 12, padding: 14 }}
              >
                <Text style={{ color: p.ink, fontSize: 15 }}>
                  {pickerOpen ? "Hide topics" : "Browse the topic library"}
                </Text>
              </Pressable>
              {pickerOpen && (
                <View style={{ marginTop: 8, gap: 6 }}>
                  {topics.map((t) => (
                    <Pressable
                      key={t.id}
                      onPress={() => {
                        setSource({ title: t.title, context: t.why, opener: t.opener, prompts: t.prompts });
                        setPickerOpen(false);
                      }}
                      style={{ backgroundColor: p.raised, borderWidth: 1, borderColor: p.line, borderRadius: 10, padding: 12 }}
                    >
                      <Text style={{ color: p.ink, fontWeight: "600", fontSize: 14 }}>{t.title}</Text>
                      <Muted style={{ marginTop: 2, fontSize: 12 }}>{t.category}</Muted>
                    </Pressable>
                  ))}
                </View>
              )}
              {!pickerOpen && (
                <Input
                  value={customTitle}
                  onChangeText={setCustomTitle}
                  placeholder="Or name your own topic (optional)"
                  style={{ marginTop: 8 }}
                />
              )}
            </View>
          )}

          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={{ flex: 1 }}>
              <Label>Speaking time each</Label>
              <View style={{ flexDirection: "row", gap: 6 }}>
                {[2, 3, 4, 5].map((m) => (
                  <Pressable
                    key={m}
                    onPress={() => setTurnMinutes(m)}
                    style={{
                      flex: 1,
                      paddingVertical: 10,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: turnMinutes === m ? p.moss : p.line,
                      backgroundColor: turnMinutes === m ? p.fern : p.raised,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: p.ink, fontWeight: "600" }}>{m}m</Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Label>Rounds</Label>
              <View style={{ flexDirection: "row", gap: 6 }}>
                {[1, 2, 3].map((r) => (
                  <Pressable
                    key={r}
                    onPress={() => setRounds(r)}
                    style={{
                      flex: 1,
                      paddingVertical: 10,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: rounds === r ? p.moss : p.line,
                      backgroundColor: rounds === r ? p.fern : p.raised,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: p.ink, fontWeight: "600" }}>{r}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>

          <Btn label="Continue to ground rules" onPress={begin} />
        </View>
      </Screen>
    );
  }

  // ————— rules —————
  if (phase === "rules") {
    return (
      <Screen safeTop>
        <H1 style={{ marginTop: 8 }}>Five ground rules</H1>
        <Muted style={{ marginTop: 8 }}>
          Read them out loud: one of you reads the odd ones, the other the even. Yes, really.
        </Muted>
        <View style={{ marginTop: 16, gap: 10 }}>
          {groundRules.map((r, i) => (
            <Card key={r.title}>
              <Text style={{ fontWeight: "700", color: p.ink, fontSize: 15.5 }}>
                {i + 1}. {r.title}
              </Text>
              <Muted style={{ marginTop: 6 }}>{r.body}</Muted>
            </Card>
          ))}
        </View>
        <Btn label="We agree" onPress={() => setPhase("checkin")} style={{ marginTop: 18 }} />
      </Screen>
    );
  }

  // ————— checkin —————
  if (phase === "checkin") {
    return (
      <Screen safeTop>
        <H1 style={{ marginTop: 8 }}>One word each</H1>
        <P style={{ marginTop: 10 }}>
          How are you arriving at this conversation? Tired, hopeful, nervous, guarded, ready. One
          honest word; it tells your partner what to be gentle with.
        </P>
        <View style={{ marginTop: 20, gap: 14 }}>
          {([0, 1] as const).map((i) => (
            <View key={i}>
              <Label>{nameOf(i)} is arriving…</Label>
              <Input
                value={feelings[i]}
                onChangeText={(v) => {
                  const next: [string, string] = [...feelings];
                  next[i] = v;
                  setFeelings(next);
                }}
                placeholder="one word"
              />
            </View>
          ))}
          <Btn label="Open the floor" onPress={() => startFloor(0, 1)} />
        </View>
      </Screen>
    );
  }

  // ————— floor —————
  if (phase === "floor") {
    const total = turnMinutes * 60;
    return (
      <Screen safeTop>
        <Muted style={{ marginTop: 8, textAlign: "center" }}>
          Round {round} of {rounds} · {source?.title}
        </Muted>
        <H1 style={{ marginTop: 6, textAlign: "center" }}>{nameOf(speaker)} has the floor</H1>
        <Muted style={{ marginTop: 6, textAlign: "center" }}>
          {nameOf(listener)}, your only job is to listen. Your turn is coming.
        </Muted>

        <View style={{ alignItems: "center", marginTop: 20 }}>
          <ProgressRing
            progress={secondsLeft / total}
            size={200}
            trackColor={p.line}
            color={running ? p.moss : p.ember}
            durationMs={running ? 1000 : 260}
            breathing={running}
          >
            <Text style={{ fontSize: 44, fontWeight: "800", color: p.ink, fontVariant: ["tabular-nums"] }}>
              {fmt(secondsLeft)}
            </Text>
            <Muted>{running ? "speaking" : "paused"}</Muted>
          </ProgressRing>
        </View>

        <View style={{ flexDirection: "row", gap: 10, marginTop: 18 }}>
          <Btn
            label={running ? "Pause timer" : secondsLeft === total ? "Start speaking" : "Resume"}
            onPress={() => setRunning(!running)}
            style={{ flex: 1 }}
          />
          <Btn
            label="I've said what I needed"
            kind="ghost"
            onPress={() => {
              setRunning(false);
              setPhase("reflect");
            }}
            style={{ flex: 1 }}
          />
        </View>

        {source?.opener && speaker === 0 && round === 1 && (
          <Card tone="fern" style={{ marginTop: 16 }}>
            <Muted style={{ fontStyle: "italic", color: p.mossDeep }}>A soft way in: {source.opener}</Muted>
          </Card>
        )}

        <Muted style={{ marginTop: 18, textTransform: "uppercase", letterSpacing: 1.5, fontWeight: "700" }}>
          If you lose the thread, lean on these
        </Muted>
        <View style={{ marginTop: 8, gap: 8 }}>
          {source?.prompts.map((prompt) => (
            <Card key={prompt} style={{ paddingVertical: 12 }}>
              <P style={{ fontSize: 14 }}>{prompt}</P>
            </Card>
          ))}
        </View>

        <Pressable onPress={callBreak} style={{ marginTop: 20, alignItems: "center" }}>
          <Text style={{ color: p.ember, fontWeight: "600", textDecorationLine: "underline" }}>
            Pause, I&apos;m feeling overwhelmed
          </Text>
        </Pressable>
      </Screen>
    );
  }

  // ————— reflect —————
  if (phase === "reflect") {
    return (
      <Screen safeTop>
        <Muted style={{ marginTop: 8, textTransform: "uppercase", letterSpacing: 2, fontWeight: "700", color: p.mossDeep }}>
          The floor passes back
        </Muted>
        <H1 style={{ marginTop: 6 }}>{nameOf(listener)}, show them they were heard</H1>
        <P style={{ marginTop: 8 }}>
          Before any reply, three small steps. Take them slowly. This is the part that changes
          things.
        </P>
        <View style={{ marginTop: 16, gap: 10 }}>
          {reflectSteps.map((s, i) => (
            <Card key={s.name}>
              <Text style={{ fontWeight: "700", color: p.ink }}>
                {i + 1}. {s.name}
              </Text>
              <P style={{ marginTop: 6, fontStyle: "italic" }}>{s.script}</P>
              <Muted style={{ marginTop: 4 }}>{s.note}</Muted>
            </Card>
          ))}
        </View>
        <Btn
          label={
            speaker === 0
              ? `Done. ${nameOf(1)} takes the floor`
              : round < rounds
                ? `Done. Round ${round + 1}`
                : "Done. Close the session"
          }
          onPress={afterReflect}
          style={{ marginTop: 18 }}
        />
        <Pressable onPress={callBreak} style={{ marginTop: 14, alignItems: "center" }}>
          <Text style={{ color: p.ember, fontWeight: "600", textDecorationLine: "underline" }}>
            Pause, I&apos;m feeling overwhelmed
          </Text>
        </Pressable>
      </Screen>
    );
  }

  // ————— break —————
  if (phase === "break") {
    return (
      <Screen safeTop>
        <Muted style={{ marginTop: 8, textAlign: "center", textTransform: "uppercase", letterSpacing: 2, fontWeight: "700", color: p.ember }}>
          A pause, not an exit
        </Muted>
        <H1 style={{ marginTop: 6, textAlign: "center" }}>Twenty minutes apart</H1>
        <P style={{ marginTop: 10, textAlign: "center" }}>
          Flooded nervous systems can&apos;t hear. This break is you both promising to come back:
          separate rooms, and please don&apos;t spend it rehearsing your comeback. Walk, breathe,
          water, music.
        </P>
        <View style={{ alignItems: "center", marginTop: 24 }}>
          <BreathingCircle size={150} color={p.fern} labelColor={p.mossDeep} />
          <Text style={{ fontSize: 28, fontWeight: "800", color: p.mossDeep, fontVariant: ["tabular-nums"], marginTop: 10 }}>
            {fmt(breakLeft)}
          </Text>
          <Muted style={{ marginTop: 2 }}>Follow the circle. In as it grows, out as it settles.</Muted>
        </View>
        <View style={{ marginTop: 28, gap: 10 }}>
          <Btn label="We're both ready. Continue" onPress={() => setPhase(breakFrom.current)} />
          <Btn label="End the session for today" kind="ghost" onPress={() => setPhase("ended")} />
        </View>
      </Screen>
    );
  }

  // ————— ended kindly —————
  if (phase === "ended") {
    return (
      <Screen safeTop>
        <H1 style={{ marginTop: 24, textAlign: "center" }}>Stopping was the right call</H1>
        <P style={{ marginTop: 12, textAlign: "center" }}>
          A conversation that ends kindly before it ends badly is a win, not a failure. Pick a
          time to come back to it (within a day or two, while it still matters) and let tonight
          end gently.
        </P>
        <Btn label="Back to the journey" onPress={() => { resetAll(); router.push("/journey"); }} style={{ marginTop: 24 }} />
      </Screen>
    );
  }

  // ————— appreciate —————
  if (phase === "appreciate") {
    return (
      <Screen safeTop>
        <H1 style={{ marginTop: 8 }}>One appreciation each</H1>
        <P style={{ marginTop: 10 }}>
          Something your partner did in this conversation (or this week) that you&apos;re grateful
          for. Say it out loud to each other, then write it down so it&apos;s kept.
        </P>
        <View style={{ marginTop: 20, gap: 14 }}>
          {([0, 1] as const).map((i) => (
            <View key={i}>
              <Label>{nameOf(i)} appreciates…</Label>
              <Input
                value={appreciations[i]}
                onChangeText={(v) => {
                  const next: [string, string] = [...appreciations];
                  next[i] = v;
                  setAppreciations(next);
                }}
                multiline
              />
            </View>
          ))}
          <Btn label="One last step" onPress={() => setPhase("commit")} />
        </View>
      </Screen>
    );
  }

  // ————— commit —————
  if (phase === "commit") {
    return (
      <Screen safeTop>
        <H1 style={{ marginTop: 8 }}>One small commitment each</H1>
        <P style={{ marginTop: 10 }}>
          Small and concrete beats grand and vague: &ldquo;I&apos;ll handle bedtime Tuesday&rdquo;
          keeps a marriage better than &ldquo;I&apos;ll be more present.&rdquo; These go on your
          shared plan.
        </P>
        <View style={{ marginTop: 20, gap: 14 }}>
          {([0, 1] as const).map((i) => (
            <View key={i}>
              <Label>{nameOf(i)} will…</Label>
              <Input
                value={commitments[i]}
                onChangeText={(v) => {
                  const next: [string, string] = [...commitments];
                  next[i] = v;
                  setCommitments(next);
                }}
                placeholder="one small, doable thing"
              />
            </View>
          ))}
          <Btn label="Close the session" onPress={finishSession} />
        </View>
      </Screen>
    );
  }

  // ————— done —————
  return (
    <Screen safeTop>
      <Muted style={{ marginTop: 20, textAlign: "center", textTransform: "uppercase", letterSpacing: 2, fontWeight: "700", color: p.mossDeep }}>
        Session complete
      </Muted>
      <H1 style={{ marginTop: 6, textAlign: "center" }}>You both showed up</H1>
      <P style={{ marginTop: 10, textAlign: "center" }}>
        That&apos;s the whole secret, repeated. Your appreciations and commitments are saved to
        your plan. The journey counts this session automatically.
      </P>
      <Card style={{ marginTop: 20 }}>
        <H2>{source?.title}</H2>
        {commitments[0].trim() ? <P style={{ marginTop: 8 }}>→ {nameOf(0)}: {commitments[0]}</P> : null}
        {commitments[1].trim() ? <P style={{ marginTop: 4 }}>→ {nameOf(1)}: {commitments[1]}</P> : null}
      </Card>
      <View style={{ marginTop: 18, gap: 10 }}>
        <Btn label="Back to the journey" onPress={() => { resetAll(); router.push("/journey"); }} />
        <Btn label="Start another session" kind="ghost" onPress={resetAll} />
      </View>
    </Screen>
  );
}
