import { useCallback, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter, type Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
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
  countDailyAnswer,
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
import { onHero } from "@/lib/theme";
import { Card, Eyebrow, Hero, IconChip, Input, Muted, Rise, Screen, usePalette, Wordmark } from "@/components/ui";
import { Bounce, Press } from "@/components/motion";

/** Warm, time-aware hello. No stats, no streaks, just a greeting. */
function greetingForNow(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

/** The four rooms of Explore, as tiny tinted dots on the browse row. */
const EXPLORE_DOTS = [
  { hue: "moss", icon: "chatbubbles-outline" },
  { hue: "honey", icon: "dice-outline" },
  { hue: "sky", icon: "book-outline" },
  { hue: "plum", icon: "map-outline" },
] as const;

/**
 * Today: the calm home. Three things and nothing else, the daily question,
 * one next step, one gentle nudge, with everything else one tap away in
 * Explore. First paint stays under ~120 words and a handful of tap targets.
 */
export default function Today() {
  const p = usePalette();
  const router = useRouter();
  const { session } = useAuth();
  const [space, setSpace] = useState<Space | null>(null);
  const [answers, setAnswers] = useState<DailyAnswer[]>([]);
  const [localAnswer, setLocalAnswer] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [justSent, setJustSent] = useState(false);
  const [myId, setMyId] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [hereForYou, setHereForYou] = useState<string>("");
  const [nextStep, setNextStep] = useState<{ title: string; body: string; href: string; label: string } | null>(null);
  const [journeyDone, setJourneyDone] = useState(false);

  const question = questionForDate(new Date());
  const nudge = nudgeForDate(new Date());

  const computeNextStep = useCallback((ctx: StepContext, journey: JourneyState) => {
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
  }, []);

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
  }, [computeNextStep, session]);

  // Load on mount too: useFocusEffect does not re-fire for the initial tab
  // after SSR hydration on web, so the focus effect alone leaves Today blank.
  useEffect(() => {
    reload();
  }, [reload]);

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
        // Milestones count days answered, whether the answer went to a shared
        // space or stayed on this phone, so joining a space later never resets
        // the record of showing up.
        await countDailyAnswer(todayKey());
      } else {
        await saveLocalDaily(todayKey(), draft.trim());
        setLocalAnswer(draft.trim());
      }
      setDraft("");
      setJustSent(true);
    } finally {
      setBusy(false);
    }
  }

  if (!loaded) return <Screen scroll={false} safeTop>{null}</Screen>;

  return (
    <Screen safeTop>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
        <Wordmark />
        <Pressable onPress={() => router.push("/settings")} hitSlop={10}>
          <Ionicons name="settings-outline" size={22} color={p.muted} />
        </Pressable>
      </View>

      {name ? (
        <Text style={{ marginTop: 10, fontSize: 17, fontWeight: "700", letterSpacing: -0.2, color: p.ink }}>
          {greetingForNow()}, {name}
        </Text>
      ) : null}
      {hereForYou ? <Muted style={{ marginTop: name ? 3 : 10 }}>{hereForYou}</Muted> : null}

      {/* 1. Today's question */}
      <Rise>
        <Hero
          hue="moss"
          eyebrow="Today's question"
          title={question.text}
          right={
            <View style={{ alignSelf: "flex-start", backgroundColor: "rgba(244,244,238,0.14)", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 99 }}>
              <Text style={{ fontSize: 11, textTransform: "capitalize", color: onHero.text, opacity: 0.8 }}>
                {question.category}
              </Text>
            </View>
          }
          style={{ marginTop: 14 }}
        >
          {!answered ? (
            <View style={{ marginTop: 12 }}>
              {space && theirs && (
                <Text style={{ color: onHero.text, opacity: 0.85, marginBottom: 8, fontSize: 13 }}>
                  {theirs.display_name} answered already. Yours unlocks it.
                </Text>
              )}
              <Input
                value={draft}
                onChangeText={setDraft}
                placeholder="A sentence or three, honestly"
                placeholderTextColor="rgba(244,244,238,0.5)"
                multiline
                maxLength={2000}
                style={{ minHeight: 64, backgroundColor: "rgba(244,244,238,0.1)", borderColor: "rgba(244,244,238,0.25)", color: onHero.text }}
              />
              <Pressable onPress={send} disabled={busy || !draft.trim()} style={({ pressed }) => ({ marginTop: 10, backgroundColor: onHero.text, borderRadius: 12, paddingVertical: 12, alignItems: "center", opacity: !draft.trim() ? 0.5 : pressed ? 0.85 : 1 })}>
                <Text style={{ color: "#233c2c", fontWeight: "700" }}>Send mine in</Text>
              </Pressable>
            </View>
          ) : (
            <View style={{ marginTop: 12, gap: 10 }}>
              <Bounce trigger={justSent}>
                <View style={{ backgroundColor: "rgba(244,244,238,0.12)", borderRadius: 12, padding: 12 }}>
                  <Text style={{ color: onHero.accent, fontWeight: "700", fontSize: 12 }}>You</Text>
                  <Text style={{ color: onHero.text, marginTop: 4 }}>{space ? mine?.answer : localAnswer}</Text>
                </View>
              </Bounce>
              {space ? (
                theirs ? (
                  <Animated.View
                    entering={FadeIn.duration(420)}
                    style={{ backgroundColor: "rgba(244,244,238,0.12)", borderRadius: 12, padding: 12 }}
                  >
                    <Text style={{ color: onHero.accent, fontWeight: "700", fontSize: 12 }}>{theirs.display_name}</Text>
                    <Text style={{ color: onHero.text, marginTop: 4 }}>{theirs.answer}</Text>
                  </Animated.View>
                ) : (
                  <Text style={{ color: onHero.text, opacity: 0.75, fontSize: 13 }}>
                    {partner ? `Waiting on ${partner.display_name}. ` : ""}Yours is in, sealed until theirs arrives.
                  </Text>
                )
              ) : (
                <Pressable onPress={() => router.push(session ? "/space" : "/sign-in")}>
                  <Text style={{ color: onHero.accent, fontWeight: "600", fontSize: 13 }}>
                    {session ? "Answer these together: set up your space" : "Answer these together: make a free account"} →
                  </Text>
                </Pressable>
              )}
            </View>
          )}
        </Hero>
      </Rise>

      {/* Space + notes access, when a space exists (keeps the invite code and
          the notes board reachable, which the tour and copy promise). */}
      {space && (
        <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
          <Press onPress={() => router.push("/space")} style={{ flex: 1 }}>
            <Card style={{ paddingVertical: 12, paddingHorizontal: 14, flexDirection: "row", alignItems: "center", gap: 10 }}>
              <IconChip name="people-outline" hue="rose" size={30} />
              <Text style={{ color: p.ink, fontWeight: "600", fontSize: 14 }}>Our space</Text>
            </Card>
          </Press>
          <Press onPress={() => router.push("/notes")} style={{ flex: 1 }}>
            <Card style={{ paddingVertical: 12, paddingHorizontal: 14, flexDirection: "row", alignItems: "center", gap: 10 }}>
              <IconChip name="heart-outline" hue="rose" size={30} />
              <Text style={{ color: p.ink, fontWeight: "600", fontSize: 14 }}>Love notes</Text>
            </Card>
          </Press>
        </View>
      )}

      {/* 2. One next step */}
      {journeyDone ? (
        <Rise delay={80}>
          <Card tone="fern" style={{ marginTop: 12 }}>
            <Text style={{ fontWeight: "700", color: p.ink, fontSize: 16 }}>Journey complete</Text>
            <Muted style={{ marginTop: 6 }}>The skills and rituals are yours now. Keep using what helps you feel connected and aligned.</Muted>
          </Card>
        </Rise>
      ) : nextStep ? (
        <Rise delay={80}>
          <Press onPress={() => router.push(nextStep.href as Href)}>
            <Card style={{ marginTop: 12 }}>
              <View style={{ flexDirection: "row", gap: 12, alignItems: "flex-start" }}>
                <IconChip name="footsteps-outline" hue="ember" size={40} />
                <View style={{ flex: 1 }}>
                  <Eyebrow hue="ember">Your next step</Eyebrow>
                  <Text style={{ marginTop: 5, fontSize: 16.5, fontWeight: "700", color: p.ink }}>{nextStep.title}</Text>
                  <Muted style={{ marginTop: 5 }}>{nextStep.body}</Muted>
                  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                    <Text style={{ color: p.ember, fontWeight: "600", fontSize: 14 }}>{nextStep.label}</Text>
                    <Ionicons name="arrow-forward" size={15} color={p.ember} style={{ marginLeft: 4 }} />
                  </View>
                </View>
              </View>
            </Card>
          </Press>
        </Rise>
      ) : null}

      {/* 3. One gentle extra */}
      <Rise delay={140}>
        <Card tone="panel" style={{ marginTop: 12 }}>
          <View style={{ flexDirection: "row", gap: 12, alignItems: "flex-start" }}>
            <IconChip name="sparkles-outline" hue="honey" size={40} />
            <View style={{ flex: 1 }}>
              <Eyebrow hue="honey">A small move for today</Eyebrow>
              <Text style={{ marginTop: 4, fontSize: 15, lineHeight: 21, color: p.ink }}>{nudge}</Text>
            </View>
          </View>
        </Card>
      </Rise>

      {/* Milestones: the quiet proof that the work is adding up */}
      <Press onPress={() => router.push("/achievements" as Href)}>
        <Card style={{ marginTop: 12, flexDirection: "row", alignItems: "center", gap: 12 }}>
          <IconChip name="ribbon-outline" hue="honey" size={38} />
          <View style={{ flex: 1 }}>
            <Eyebrow hue="honey">Your milestones</Eyebrow>
            <Muted style={{ marginTop: 2, fontSize: 12.5 }}>
              What the two of you have practiced so far.
            </Muted>
          </View>
          <Ionicons name="chevron-forward" size={16} color={p.muted} />
        </Card>
      </Press>

      {/* Browse everything: one calm tap target, four little rooms hinted */}
      <Press onPress={() => router.push("/explore")}>
        <View style={{ marginTop: 18, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, paddingVertical: 14, borderRadius: 14, borderWidth: 1, borderColor: p.line }}>
          <View style={{ flexDirection: "row", gap: 5 }}>
            {EXPLORE_DOTS.map((d) => (
              <View
                key={d.hue}
                style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: p.hues[d.hue].bg, alignItems: "center", justifyContent: "center" }}
              >
                <Ionicons name={d.icon} size={12} color={p.hues[d.hue].fg} />
              </View>
            ))}
          </View>
          <Text style={{ color: p.ink, fontWeight: "600", fontSize: 15 }}>Browse everything Mend offers</Text>
        </View>
      </Press>

      <Muted style={{ marginTop: 18, textAlign: "center", fontSize: 12 }}>
        Small moments, practiced often, help two people stay connected.
      </Muted>
    </Screen>
  );
}
