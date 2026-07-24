import { useCallback, useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { useRouter, type Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/lib/auth";
import { questionForDate } from "@/lib/content/daily";
import { nudgeForDate } from "@/lib/content/nudges";
import {
  getChallengesDone,
  getDailyDays,
  getJourney,
  getLocalDaily,
  getPlan,
  getProfile,
  getPulses,
  getRecommendationHistory,
  getSessions,
  saveLocalDaily,
  countDailyAnswer,
  type JourneyState,
} from "@/lib/store";
import { getJourneyProgress, getStage, stepDone, type JourneyProgress, type StepContext } from "@/lib/journey";
import { getSituation } from "@/lib/situation";
import {
  getMySpace,
  getSpaceProgress,
  getTodayAnswers,
  submitAnswer,
  todayKey,
  type DailyAnswer,
  type Space,
} from "@/lib/space";
import Animated, { FadeIn } from "react-native-reanimated";
import { onHero } from "@/lib/theme";
import { Btn, Card, Chip, Eyebrow, Hero, IconChip, Input, Muted, Rise, Screen, usePalette, Wordmark } from "@/components/ui";
import { Text } from "@/components/text";
import { acknowledgeSuccess, Bounce, Press } from "@/components/motion";
import { ProgressRing } from "@/components/rings";
import { getRecommendations, type Recommendation } from "@/lib/recommendations";
import { RecommendationCard } from "@/components/recommendation-card";
import { MomentumCard, SuccessMoment } from "@/components/momentum";
import { getConnectionMomentum, type ConnectionMomentum } from "@/lib/momentum";
import { getClaimed, syncEarned, type Achievement } from "@/lib/achievements";

/** Warm, time-aware hello. */
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

export default function Home() {
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
  const [journeyProgress, setJourneyProgress] = useState<JourneyProgress | null>(null);
  const [momentum, setMomentum] = useState<ConnectionMomentum | null>(null);
  const [freshMilestone, setFreshMilestone] = useState<Achievement | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const question = questionForDate(new Date());
  const nudge = nudgeForDate(new Date());

  const computeNextStep = useCallback((ctx: StepContext, journey: JourneyState) => {
    setJourneyProgress(getJourneyProgress(ctx, journey));
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
      setNextStep({ title: "Chapter complete", body: "You've finished this chapter. Open your path to move on when you're both ready.", href: "/journey", label: "Open your path" });
    }
  }, []);

  const reload = useCallback(() => {
    (async () => {
      setMyId(session?.user.id ?? null);
      // Local reads first, then paint. The screen never waits on the network.
      const [profile, sessions, plan, challengesDone, pulses, journey, local, recommendationHistory, dailyDays, claimed] = await Promise.all([
        getProfile(),
        getSessions(),
        getPlan(),
        getChallengesDone(),
        getPulses(),
        getJourney(),
        getLocalDaily(todayKey()),
        getRecommendationHistory(),
        getDailyDays(),
        getClaimed(),
      ]);
      setName(profile?.a?.trim() || "");
      setHereForYou(getSituation(profile?.situation)?.hereForYou ?? "");
      setMomentum(getConnectionMomentum({
        dailyDays,
        sessionDates: sessions.map((item) => item.date),
        pulseDates: pulses.map((item) => item.date),
        completedCommitmentDates: plan.commitments.filter((item) => item.done).map((item) => item.date),
        journeySteps: journey.doneSteps.length,
        completedChallenges: challengesDone.length,
        rituals: plan.rituals.length,
      }));
      const context = { profile, sessions, plan, challengesDone, pulses };
      computeNextStep(context, journey);
      setRecommendations(getRecommendations(context, journey, recommendationHistory, new Date(), 2));
      const achievementContext = {
        ...context,
        journey,
        dailyAnswers: dailyDays.length,
        bothInSpace: false,
        daysBoth: 0,
        claimed,
      };
      const localMilestones = await syncEarned(achievementContext);
      if (localMilestones.fresh.length) {
        setFreshMilestone(localMilestones.fresh.at(-1) ?? null);
      }
      setLocalAnswer(local);
      setLoaded(true);

      // Shared space + today's answers load after first paint, in the background.
      if (session) {
        const s = await getMySpace();
        setSpace(s);
        if (s) {
          setAnswers(await getTodayAnswers(s));
          const sharedProgress = await getSpaceProgress(s);
          const sharedMilestones = await syncEarned({
            ...achievementContext,
            bothInSpace: s.members.length >= 2,
            daysBoth: sharedProgress?.days_both ?? 0,
          });
          if (sharedMilestones.fresh.length) {
            setFreshMilestone(sharedMilestones.fresh.at(-1) ?? null);
          }
        }
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
  const currentStage = journeyProgress ? getStage(journeyProgress.currentStage) : null;

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
      acknowledgeSuccess();
      reload();
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

      {/* The journey is the product's spine: establish progress and the next
          useful action before offering the rest of the day's tools. */}
      <Rise>
        <Hero
          hue="moss"
          eyebrow={journeyDone ? "Your relationship journey" : `Chapter ${journeyProgress?.currentStage ?? 1} of 5`}
          title={journeyDone ? "A stronger way of being together" : currentStage?.title ?? "Your path together"}
          sub={journeyDone ? "Keep practicing the skills and rituals that help you stay connected." : currentStage?.arc}
          right={
            <ProgressRing
              progress={journeyProgress?.fraction ?? 0}
              size={84}
              stroke={7}
              trackColor="rgba(244,244,238,0.17)"
              color={onHero.accent}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: onHero.text, fontSize: 20, fontWeight: "800", letterSpacing: -0.5 }}>
                  {journeyProgress?.percent ?? 0}%
                </Text>
                <Text style={{ color: onHero.dim, fontSize: 9.5, fontWeight: "600" }}>complete</Text>
              </View>
            </ProgressRing>
          }
          style={{ marginTop: 14 }}
        >
          <Press
            onPress={() => router.push((journeyDone ? "/journey" : nextStep?.href ?? "/journey") as Href)}
            haptic
            style={{ marginTop: 16 }}
          >
            <View style={{ borderRadius: 15, padding: 13, backgroundColor: "rgba(244,244,238,0.12)", borderWidth: 1, borderColor: "rgba(244,244,238,0.16)", flexDirection: "row", alignItems: "center", gap: 11 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: onHero.accent, fontSize: 11, fontWeight: "700", textTransform: "uppercase", letterSpacing: 1.1 }}>
                  {journeyDone ? "Keep growing" : "Next up"}
                </Text>
                <Text numberOfLines={2} style={{ color: onHero.text, fontSize: 15, lineHeight: 20, fontWeight: "700", marginTop: 3 }}>
                  {journeyDone ? "Revisit your path and choose what helps now" : nextStep?.title ?? "Open your relationship path"}
                </Text>
              </View>
              <Ionicons name="arrow-forward-circle" size={27} color={onHero.accent} />
            </View>
          </Press>
        </Hero>
      </Rise>

      {momentum ? (
        <Rise delay={70} style={{ marginTop: 12 }}>
          <MomentumCard momentum={momentum} onOpen={() => router.push("/achievements" as Href)} />
        </Rise>
      ) : null}

      {freshMilestone ? (
        <Press
          onPress={() => {
            setFreshMilestone(null);
            router.push("/achievements" as Href);
          }}
          style={{ marginTop: 10 }}
        >
          <SuccessMoment
            title={`Milestone earned: ${freshMilestone.title}`}
            body={freshMilestone.earned}
            hue={freshMilestone.hue}
            icon={freshMilestone.icon as keyof typeof Ionicons.glyphMap}
          />
        </Press>
      ) : null}

      {/* Daily connection stays close at hand without crowding out the larger journey. */}
      <Rise delay={110}>
        <Card tone="panel" style={{ marginTop: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 9 }}>
              <IconChip name="chatbubble-ellipses-outline" hue="moss" size={34} />
              <Text style={{ color: p.ink, fontSize: 16, fontWeight: "800" }}>Today’s connection</Text>
            </View>
            <Chip label={question.category} hue="moss" />
          </View>
          <Text style={{ color: p.ink, fontSize: 19, lineHeight: 25, fontWeight: "700", letterSpacing: -0.25, marginTop: 14 }}>
            {question.text}
          </Text>

          {!answered ? (
            <View style={{ marginTop: 12 }}>
              {space && theirs ? (
                <Muted style={{ marginBottom: 8, fontSize: 12.5 }}>{theirs.display_name} answered already. Yours unlocks it.</Muted>
              ) : null}
              <Input
                value={draft}
                onChangeText={setDraft}
                placeholder="A sentence or three, honestly"
                multiline
                maxLength={2000}
                style={{ minHeight: 70 }}
              />
              <Btn label={busy ? "Sending…" : "Share my answer"} onPress={send} kind="moss" disabled={busy || !draft.trim()} style={{ marginTop: 10 }} />
            </View>
          ) : (
            <View style={{ marginTop: 12, gap: 9 }}>
              {justSent ? (
                <SuccessMoment
                  title="You made room for honesty"
                  body="This answer is now one of the moments you chose connection."
                  hue="moss"
                  icon="checkmark"
                />
              ) : null}
              <Bounce trigger={justSent}>
                <View style={{ backgroundColor: p.raised, borderRadius: 13, padding: 12, borderWidth: 1, borderColor: p.line }}>
                  <Text style={{ color: p.mossDeep, fontWeight: "700", fontSize: 12 }}>You</Text>
                  <Text style={{ color: p.ink, marginTop: 4, lineHeight: 20 }}>{space ? mine?.answer : localAnswer}</Text>
                </View>
              </Bounce>
              {space ? (
                theirs ? (
                  <Animated.View entering={FadeIn.duration(420)} style={{ backgroundColor: p.raised, borderRadius: 13, padding: 12, borderWidth: 1, borderColor: p.line }}>
                    <Text style={{ color: p.mossDeep, fontWeight: "700", fontSize: 12 }}>{theirs.display_name}</Text>
                    <Text style={{ color: p.ink, marginTop: 4, lineHeight: 20 }}>{theirs.answer}</Text>
                  </Animated.View>
                ) : (
                  <Muted style={{ fontSize: 12.5 }}>{partner ? `Waiting on ${partner.display_name}. ` : ""}Yours is sealed until theirs arrives.</Muted>
                )
              ) : (
                <Pressable onPress={() => router.push(session ? "/space" : "/sign-in")}>
                  <Text style={{ color: p.ember, fontWeight: "700", fontSize: 13 }}>
                    {session ? "Set up your shared space" : "Make a free account to answer together"} →
                  </Text>
                </Pressable>
              )}
            </View>
          )}
        </Card>
      </Rise>

      {space ? (
        <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
          <Press onPress={() => router.push("/space")} style={{ flex: 1 }}>
            <Card style={{ paddingVertical: 11, paddingHorizontal: 13, flexDirection: "row", alignItems: "center", gap: 9 }}>
              <IconChip name="people-outline" hue="rose" size={28} />
              <Text style={{ color: p.ink, fontWeight: "600", fontSize: 13.5 }}>Our space</Text>
            </Card>
          </Press>
          <Press onPress={() => router.push("/notes")} style={{ flex: 1 }}>
            <Card style={{ paddingVertical: 11, paddingHorizontal: 13, flexDirection: "row", alignItems: "center", gap: 9 }}>
              <IconChip name="heart-outline" hue="rose" size={28} />
              <Text style={{ color: p.ink, fontWeight: "600", fontSize: 13.5 }}>Love notes</Text>
            </Card>
          </Press>
        </View>
      ) : null}

      {recommendations[0] ? (
        <Rise delay={150} style={{ marginTop: 18 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <Text style={{ color: p.ink, fontSize: 18, fontWeight: "800" }}>Picked for you</Text>
            <Press onPress={() => router.push("/explore")}>
              <Text style={{ color: p.ember, fontSize: 12.5, fontWeight: "700" }}>More ideas →</Text>
            </Press>
          </View>
          <RecommendationCard
            recommendation={recommendations[0]}
            featured
            onOpen={(id) => setRecommendations((items) => items.filter((item) => item.id !== id))}
          />
        </Rise>
      ) : null}

      {/* 3. One gentle extra */}
      <Rise delay={200}>
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
