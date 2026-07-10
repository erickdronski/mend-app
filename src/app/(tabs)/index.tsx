import { useCallback, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useFocusEffect, useRouter, type Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@/lib/auth";
import { questionForDate } from "@/lib/content/daily";
import { nudgeForDate } from "@/lib/content/nudges";
import {
  getChallengesDone,
  getJourney,
  getLocalDaily,
  getPlan,
  getProfile,
  getPulses,
  getSessions,
  saveLocalDaily,
  type JourneyState,
} from "@/lib/store";
import { getStage, stepDone, type StepContext } from "@/lib/journey";
import { getSituation } from "@/lib/situation";
import {
  getMySpace,
  getTodayAnswers,
  submitAnswer,
  todayKey,
  type DailyAnswer,
  type Space,
} from "@/lib/space";
import Animated, { FadeIn } from "react-native-reanimated";
import { Btn, Card, IconChip, Input, Muted, P, Rise, Screen, usePalette } from "@/components/ui";
import { Press } from "@/components/motion";

// The daily-question hero: deep forest, readable in both schemes
const HERO = ["#2e4a38", "#233c2c"] as const;
const BONE = "#f4f4ee";
const EMBER = "#d9a057";

/**
 * Today: the calm home. Three things and nothing else — the daily question,
 * one next step, one gentle nudge — with everything else one tap away in
 * Explore. First paint stays under ~120 words and a handful of tap targets.
 */
export default function Today() {
  const p = usePalette();
  const router = useRouter();
  const { session, guest } = useAuth();
  const [space, setSpace] = useState<Space | null>(null);
  const [answers, setAnswers] = useState<DailyAnswer[]>([]);
  const [localAnswer, setLocalAnswer] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [myId, setMyId] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [hereForYou, setHereForYou] = useState<string>("");
  const [nextStep, setNextStep] = useState<{ title: string; body: string; href: string; label: string } | null>(null);
  const [journeyDone, setJourneyDone] = useState(false);

  const question = questionForDate(new Date());
  const nudge = nudgeForDate(new Date());

  const reload = useCallback(() => {
    (async () => {
      setMyId(session?.user.id ?? null);
      // Local reads first, then paint. The screen never waits on the network.
      const [profile, sessions, plan, challengesDone, pulses, journey, local] = await Promise.all([
        getProfile(),
        getSessions(),
        getPlan(),
        getChallengesDone(),
        getPulses(),
        getJourney(),
        getLocalDaily(todayKey()),
      ]);
      setName(profile?.a?.trim() || "");
      setHereForYou(getSituation(profile?.situation)?.hereForYou ?? "");
      computeNextStep({ profile, sessions, plan, challengesDone, pulses }, journey);
      setLocalAnswer(local);
      setLoaded(true);

      // Shared space + today's answers load after first paint, in the background.
      if (session) {
        const s = await getMySpace();
        setSpace(s);
        if (s) setAnswers(await getTodayAnswers(s));
        const { backupIfSignedIn } = await import("@/lib/sync");
        backupIfSignedIn();
      } else {
        setSpace(null);
      }
    })().catch(() => setLoaded(true));
  }, [session]);

  // Load on mount too: useFocusEffect does not re-fire for the initial tab
  // after SSR hydration on web, so the focus effect alone leaves Today blank.
  useEffect(() => {
    reload();
  }, [reload]);

  function computeNextStep(ctx: StepContext, journey: JourneyState) {
    if (journey.graduatedAt) {
      setJourneyDone(true);
      setNextStep(null);
      return;
    }
    const stage = getStage(Math.min(journey.stage, 5));
    const step = stage?.steps.find((s) => !stepDone(s, ctx, journey));
    if (step) {
      setJourneyDone(false);
      setNextStep({ title: step.title, body: step.body, href: step.href, label: step.hrefLabel });
    } else {
      setJourneyDone(false);
      setNextStep({ title: "Stage complete", body: "You've finished this stage. Open your path to move on when you're both ready.", href: "/journey", label: "Open your path" });
    }
  }

  const mine = answers.find((a) => a.user_id === myId);
  const theirs = answers.find((a) => a.user_id !== myId);
  const partner = space?.members.find((m) => m.user_id !== myId);
  const answered = space ? Boolean(mine) : Boolean(localAnswer);

  async function send() {
    if (!draft.trim()) return;
    setBusy(true);
    try {
      if (space) {
        await submitAnswer(space, question.text, draft);
        setAnswers(await getTodayAnswers(space));
      } else {
        await saveLocalDaily(todayKey(), draft.trim());
        setLocalAnswer(draft.trim());
      }
      setDraft("");
    } finally {
      setBusy(false);
    }
  }

  if (!loaded) return <Screen scroll={false} safeTop>{null}</Screen>;

  return (
    <Screen safeTop>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
        <Text style={{ fontSize: 24, fontWeight: "800", color: p.ink }}>
          Mend<Text style={{ color: p.ember }}>.</Text>
        </Text>
        <Pressable onPress={() => router.push("/settings")} hitSlop={10}>
          <Ionicons name="settings-outline" size={22} color={p.muted} />
        </Pressable>
      </View>

      {hereForYou ? <Muted style={{ marginTop: 10 }}>{hereForYou}</Muted> : null}

      {/* 1. Today's question */}
      <Rise>
        <LinearGradient colors={HERO} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ marginTop: 14, borderRadius: 20, padding: 20 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ textTransform: "uppercase", letterSpacing: 1.5, fontWeight: "700", color: EMBER, fontSize: 12 }}>
              Today&apos;s question
            </Text>
            <Text style={{ fontSize: 11, textTransform: "capitalize", color: BONE, opacity: 0.6 }}>{question.category}</Text>
          </View>
          <Text style={{ marginTop: 10, fontSize: 21, lineHeight: 28, fontWeight: "800", color: BONE }}>
            {question.text}
          </Text>

          {!answered ? (
            <View style={{ marginTop: 12 }}>
              {space && theirs && (
                <Text style={{ color: BONE, opacity: 0.85, marginBottom: 8, fontSize: 13 }}>
                  {theirs.display_name} answered already. Yours unlocks it.
                </Text>
              )}
              <Input
                value={draft}
                onChangeText={setDraft}
                placeholder="A sentence or three, honestly"
                placeholderTextColor="rgba(244,244,238,0.5)"
                multiline
                style={{ minHeight: 64, backgroundColor: "rgba(244,244,238,0.1)", borderColor: "rgba(244,244,238,0.25)", color: BONE }}
              />
              <Pressable onPress={send} disabled={busy || !draft.trim()} style={({ pressed }) => ({ marginTop: 10, backgroundColor: BONE, borderRadius: 12, paddingVertical: 12, alignItems: "center", opacity: !draft.trim() ? 0.5 : pressed ? 0.85 : 1 })}>
                <Text style={{ color: "#233c2c", fontWeight: "700" }}>Send mine in</Text>
              </Pressable>
            </View>
          ) : (
            <View style={{ marginTop: 12, gap: 10 }}>
              <View style={{ backgroundColor: "rgba(244,244,238,0.12)", borderRadius: 12, padding: 12 }}>
                <Text style={{ color: EMBER, fontWeight: "700", fontSize: 12 }}>You</Text>
                <Text style={{ color: BONE, marginTop: 4 }}>{space ? mine?.answer : localAnswer}</Text>
              </View>
              {space ? (
                theirs ? (
                  <Animated.View
                    entering={FadeIn.duration(420)}
                    style={{ backgroundColor: "rgba(244,244,238,0.12)", borderRadius: 12, padding: 12 }}
                  >
                    <Text style={{ color: EMBER, fontWeight: "700", fontSize: 12 }}>{theirs.display_name}</Text>
                    <Text style={{ color: BONE, marginTop: 4 }}>{theirs.answer}</Text>
                  </Animated.View>
                ) : (
                  <Text style={{ color: BONE, opacity: 0.75, fontSize: 13 }}>
                    {partner ? `Waiting on ${partner.display_name}. ` : ""}Yours is in, sealed until theirs arrives.
                  </Text>
                )
              ) : (
                <Pressable onPress={() => router.push(session ? "/space" : "/sign-in")}>
                  <Text style={{ color: EMBER, fontWeight: "600", fontSize: 13 }}>
                    {session ? "Answer these together: set up your space" : "Answer these together: make a free account"} →
                  </Text>
                </Pressable>
              )}
            </View>
          )}
        </LinearGradient>
      </Rise>

      {/* Space + notes access, when a space exists (keeps the invite code and
          the notes board reachable, which the tour and copy promise). */}
      {space && (
        <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
          <Press onPress={() => router.push("/space")} style={{ flex: 1 }}>
            <Card style={{ paddingVertical: 12, flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Ionicons name="people-outline" size={18} color={p.moss} />
              <Text style={{ color: p.ink, fontWeight: "600", fontSize: 14 }}>Our space</Text>
            </Card>
          </Press>
          <Press onPress={() => router.push("/notes")} style={{ flex: 1 }}>
            <Card style={{ paddingVertical: 12, flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Ionicons name="create-outline" size={18} color={p.moss} />
              <Text style={{ color: p.ink, fontWeight: "600", fontSize: 14 }}>Notes</Text>
            </Card>
          </Press>
        </View>
      )}

      {/* 2. One next step */}
      {journeyDone ? (
        <Rise delay={80}>
          <Card tone="fern" style={{ marginTop: 12 }}>
            <Text style={{ fontWeight: "700", color: p.ink, fontSize: 16 }}>You graduated</Text>
            <Muted style={{ marginTop: 6 }}>The rituals are yours now. Come back only if a hard season needs a referee again.</Muted>
          </Card>
        </Rise>
      ) : nextStep ? (
        <Rise delay={80}>
          <Press onPress={() => router.push(nextStep.href as Href)}>
            <Card style={{ marginTop: 12 }}>
              <Muted style={{ textTransform: "uppercase", letterSpacing: 1.2, fontWeight: "700", color: p.mossDeep, fontSize: 11 }}>
                Your next step
              </Muted>
              <Text style={{ marginTop: 6, fontSize: 16.5, fontWeight: "700", color: p.ink }}>{nextStep.title}</Text>
              <Muted style={{ marginTop: 6 }}>{nextStep.body}</Muted>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                <Text style={{ color: p.ember, fontWeight: "600", fontSize: 14 }}>{nextStep.label}</Text>
                <Ionicons name="arrow-forward" size={15} color={p.ember} style={{ marginLeft: 4 }} />
              </View>
            </Card>
          </Press>
        </Rise>
      ) : null}

      {/* 3. One gentle extra */}
      <Rise delay={140}>
        <Card tone="panel" style={{ marginTop: 12 }}>
          <View style={{ flexDirection: "row", gap: 12, alignItems: "flex-start" }}>
            <IconChip name="sparkles-outline" tone="ember" size={40} />
            <View style={{ flex: 1 }}>
              <Muted style={{ textTransform: "uppercase", letterSpacing: 1.2, fontWeight: "700", fontSize: 11 }}>
                A small move for today
              </Muted>
              <Text style={{ marginTop: 4, fontSize: 15, lineHeight: 21, color: p.ink }}>{nudge}</Text>
            </View>
          </View>
        </Card>
      </Rise>

      {/* Browse everything */}
      <Press onPress={() => router.push("/explore")}>
        <View style={{ marginTop: 18, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 14, borderRadius: 14, borderWidth: 1, borderColor: p.line }}>
          <Ionicons name="compass-outline" size={18} color={p.muted} />
          <Text style={{ color: p.ink, fontWeight: "600", fontSize: 15 }}>Browse everything Mend offers</Text>
        </View>
      </Press>

      <Muted style={{ marginTop: 18, textAlign: "center", fontSize: 12 }}>
        Mend is designed to be deleted. The goal is a marriage that doesn&apos;t need it.
      </Muted>
    </Screen>
  );
}
