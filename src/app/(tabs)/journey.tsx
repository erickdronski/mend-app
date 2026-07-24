import { useCallback, useState } from "react";
import { Pressable, View } from "react-native";
import { Link, useFocusEffect, useRouter, type Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import {
  getChallengesDone,
  getJourney,
  getPlan,
  getProfile,
  getPulses,
  getSessions,
  markStep,
  advanceStage,
  type JourneyState,
} from "@/lib/store";
import {
  getStage,
  getJourneyProgress,
  readyToComplete,
  stageComplete,
  stages,
  stepDone,
  type StepContext,
} from "@/lib/journey";
import { onHero } from "@/lib/theme";
import { Btn, Card, Chip, CollapsibleP, Eyebrow, H1, H2, Hero, Muted, P, Rise, Screen, usePalette, Wordmark } from "@/components/ui";
import { Text } from "@/components/text";
import { ProgressRing } from "@/components/rings";
import { acknowledgeSuccess, Bloom, Bounce, GlideBar, Press, Reveal } from "@/components/motion";
import { SuccessMoment } from "@/components/momentum";

/**
 * The Journey tab: the app's home. One current stage, its steps, the next
 * action, and an honest progress reflection at the end.
 */
export default function JourneyScreen() {
  const p = usePalette();
  const router = useRouter();
  const { t } = useTranslation();
  const [ctx, setCtx] = useState<StepContext | null>(null);
  const [journey, setJourney] = useState<JourneyState | null>(null);
  const [completedStep, setCompletedStep] = useState<{ id: string; title: string } | null>(null);

  const reload = useCallback(() => {
    (async () => {
      const [profile, sessions, plan, challengesDone, pulses, j] = await Promise.all([
        getProfile(),
        getSessions(),
        getPlan(),
        getChallengesDone(),
        getPulses(),
        getJourney(),
      ]);
      setCtx({ profile, sessions, plan, challengesDone, pulses });
      setJourney(j);
      const { backupIfSignedIn } = await import("@/lib/sync");
      backupIfSignedIn();
    })();
  }, []);

  useFocusEffect(reload);

  if (!ctx || !journey) return <Screen scroll={false} safeTop>{null}</Screen>;

  const progress = getJourneyProgress(ctx, journey);

  // Keep the persisted field name for backward compatibility with existing journeys.
  if (journey.graduatedAt) {
    return (
      <Screen safeTop>
        <H1 style={{ marginTop: 24 }}>{t("journey.graduated")}</H1>
        <P style={{ marginTop: 12 }}>
          You showed up for each other, week after week. The rituals are yours now. Keep the
          weekly meeting, keep the small moments of affection, and return whenever you want a
          fresh conversation, shared activity, or a little extra support.
        </P>
        <Card tone="panel" style={{ marginTop: 20 }}>
          <Eyebrow hue="ember">Your journey in practice</Eyebrow>
          <View style={{ flexDirection: "row", gap: 10, marginTop: 12 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: p.ink, fontSize: 22, fontWeight: "800" }}>{progress.totalSteps}</Text>
              <Muted style={{ fontSize: 12 }}>shared steps</Muted>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: p.ink, fontSize: 22, fontWeight: "800" }}>{progress.completedStages}</Text>
              <Muted style={{ fontSize: 12 }}>chapters</Muted>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: p.ink, fontSize: 22, fontWeight: "800" }}>100%</Text>
              <Muted style={{ fontSize: 12 }}>complete</Muted>
            </View>
          </View>
        </Card>
        {progress.baselinePulse !== null && progress.latestPulse !== null && (
          <Card tone="fern" style={{ marginTop: 20 }}>
            <H2>Your shared pulse</H2>
            <P style={{ marginTop: 8 }}>
              Together, you moved from {progress.baselinePulse.toFixed(1)} at your baseline to{" "}
              {progress.latestPulse.toFixed(1)} in chapter {progress.latestPulseStage}. That is
              shared movement, not a score for either person.
            </P>
          </Card>
        )}
        <Muted style={{ marginTop: 20 }}>{t("journey.designedToEnd")}</Muted>
      </Screen>
    );
  }

  const stage = getStage(Math.min(journey.stage, 5))!;
  const complete = stageComplete(stage, ctx, journey);
  const doneCount = stage.steps.filter((s) => stepDone(s, ctx, journey)).length;
  const nextStep = stage.steps.find((s) => !stepDone(s, ctx, journey));
  const finishing = journey.stage >= 5 && complete;
  const canComplete = readyToComplete(ctx, journey);
  const names = ctx.profile ? [ctx.profile.a, ctx.profile.b].filter(Boolean).join(" & ") : "";

  return (
    <Screen safeTop>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
        <Wordmark />
        <Pressable onPress={() => router.push("/settings")} hitSlop={10}>
          <Ionicons name="settings-outline" size={22} color={p.muted} />
        </Pressable>
      </View>

      {/* stage hero: the shared gradient band with the progress ring */}
      <Rise>
        <Hero
          hue="moss"
          eyebrow={`Chapter ${stage.n} ${t("common.of")} ${stages.length}`}
          title={stage.title}
          sub={stage.arc}
          right={
            <ProgressRing
              progress={progress.fraction}
              size={84}
              stroke={7}
              trackColor="rgba(244,244,238,0.18)"
              color="#d9a057"
            >
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "#f4f4ee", fontWeight: "800", fontSize: 18 }}>
                  {progress.percent}%
                </Text>
                <Text style={{ color: onHero.dim, fontSize: 9.5 }}>overall</Text>
              </View>
            </ProgressRing>
          }
          style={{ marginTop: 16 }}
        >
          {names ? (
            <Text style={{ color: onHero.dim, fontSize: 12.5, marginTop: 12 }}>{names}</Text>
          ) : null}
          <Text style={{ color: onHero.text, opacity: 0.55, fontSize: 12, marginTop: names ? 3 : 12 }}>
            {stage.weeksHint}
          </Text>
        </Hero>
      </Rise>

      <Rise delay={80}>
        <Card style={{ marginTop: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <View style={{ flex: 1 }}>
              <Eyebrow hue="ember">Your five-chapter path</Eyebrow>
              <Text style={{ color: p.ink, fontWeight: "700", fontSize: 16, marginTop: 4 }}>
                {progress.completedSteps} of {progress.totalSteps} shared steps practiced
              </Text>
            </View>
            <Chip
              label={`${progress.completedStages} ${progress.completedStages === 1 ? "chapter" : "chapters"} complete`}
              hue="moss"
            />
          </View>

          <View style={{ marginTop: 14 }}>
            <GlideBar progress={progress.fraction} color={p.ember} track={p.panel} height={7} />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 18 }}>
            {progress.stages.map((item, index) => {
              const completeStage = item.status === "complete";
              const currentStage = item.status === "current";
              return (
                <View
                  key={item.n}
                  style={{ flex: index < progress.stages.length - 1 ? 1 : 0, flexDirection: "row", alignItems: "center" }}
                >
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: completeStage ? p.moss : currentStage ? p.ember : p.panel,
                      borderWidth: currentStage ? 3 : 1,
                      borderColor: currentStage ? p.hues.ember.bg : completeStage ? p.moss : p.line,
                    }}
                  >
                    {completeStage ? (
                      <Ionicons name="checkmark" size={17} color={p.surface} />
                    ) : (
                      <Text style={{ color: currentStage ? p.surface : p.muted, fontWeight: "800", fontSize: 12 }}>
                        {item.n}
                      </Text>
                    )}
                  </View>
                  {index < progress.stages.length - 1 ? (
                    <View style={{ flex: 1, height: 2, backgroundColor: completeStage ? p.moss : p.line }} />
                  ) : null}
                </View>
              );
            })}
          </View>

          <View style={{ flexDirection: "row", gap: 8, marginTop: 18 }}>
            <View style={{ flex: 1, backgroundColor: p.panel, borderRadius: 14, padding: 12 }}>
              <Text style={{ color: p.ink, fontSize: 19, fontWeight: "800" }}>{doneCount}/{stage.steps.length}</Text>
              <Muted style={{ fontSize: 11.5, marginTop: 2 }}>this chapter</Muted>
            </View>
            <View style={{ flex: 1, backgroundColor: p.panel, borderRadius: 14, padding: 12 }}>
              <Text style={{ color: p.ink, fontSize: 19, fontWeight: "800" }}>
                {progress.pulseDelta === null
                  ? progress.baselinePulse === null ? "Not yet" : "Baseline"
                  : `${progress.pulseDelta >= 0 ? "+" : ""}${progress.pulseDelta.toFixed(1)}`}
              </Text>
              <Muted style={{ fontSize: 11.5, marginTop: 2 }}>pulse since baseline</Muted>
            </View>
          </View>

          <Press onPress={() => router.push("/achievements" as Href)}>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 14, paddingTop: 14, borderTopWidth: 1, borderTopColor: p.line }}>
              <Ionicons name="ribbon-outline" size={18} color={p.hues.honey.fg} />
              <Text style={{ color: p.ink, fontWeight: "600", fontSize: 13.5, marginLeft: 8, flex: 1 }}>
                See the milestones you have earned together
              </Text>
              <Ionicons name="chevron-forward" size={16} color={p.muted} />
            </View>
          </Press>
        </Card>
      </Rise>

      {/* the why, folded to two lines so the screen stays light */}
      <Rise delay={140}>
        <Card tone="panel" style={{ marginTop: 12 }}>
          <CollapsibleP style={{ fontSize: 14 }}>{stage.why}</CollapsibleP>
        </Card>
      </Rise>

      {/* The low-pulse support offer is intentionally NOT shown here. Surfacing
          "one of you rated this low" on the shared Journey screen would out
          whichever partner scored low, breaking the pulse's privacy promise.
          The offer now appears privately inside the pulse flow, only to the
          person who just answered low, on their own turn. */}

      {/* next step, big */}
      {nextStep && !complete && (
        <Card tone="fern" style={{ marginTop: 16 }}>
          <Eyebrow>{t("journey.nextStep")}</Eyebrow>
          <H2 style={{ marginTop: 6 }}>{nextStep.title}</H2>
          <P style={{ marginTop: 8 }}>{nextStep.body}</P>
          <Btn
            label={nextStep.hrefLabel}
            kind="moss"
            onPress={() => router.push(nextStep.href as Href)}
            style={{ marginTop: 14 }}
          />
        </Card>
      )}

      {completedStep ? (
        <View style={{ marginTop: 14 }}>
          <SuccessMoment
            title="That practice is part of your path now"
            body={`${completedStep.title} is complete. The next step can wait until it is useful.`}
            hue="ember"
            icon="checkmark"
          />
        </View>
      ) : null}

      {/* all steps */}
      <View style={{ marginTop: 18, gap: 10 }}>
        {stage.steps.map((step, si) => {
          const done = stepDone(step, ctx, journey);
          const manual = !step.auto;
          return (
            <Reveal key={step.id} index={si}>
            <Card style={{ opacity: done ? 0.65 : 1 }}>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <View style={{ marginTop: 1 }}>
                  <Bloom trigger={completedStep?.id === step.id} color={p.hues.ember.accent} size={40}>
                    <Ionicons
                      name={done ? "checkmark-circle" : "ellipse-outline"}
                      size={22}
                      color={done ? p.moss : p.muted}
                    />
                  </Bloom>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15.5, fontWeight: "600", color: p.ink, textDecorationLine: done ? "line-through" : "none" }}>
                    {step.title}
                  </Text>
                  {!done && <Muted style={{ marginTop: 5 }} numberOfLines={2}>{step.body}</Muted>}
                  {!done && (
                    <View style={{ flexDirection: "row", gap: 14, marginTop: 10 }}>
                      <Link href={step.href as Href} style={{ color: p.ember, fontWeight: "600", fontSize: 14 }}>
                        {step.hrefLabel} →
                      </Link>
                      {manual && (
                        <Pressable
                          onPress={async () => {
                            setJourney(await markStep(step.id, true));
                            setCompletedStep({ id: step.id, title: step.title });
                            acknowledgeSuccess();
                          }}
                        >
                          <Text style={{ color: p.muted, fontSize: 14, textDecorationLine: "underline" }}>
                            {t("common.markComplete")}
                          </Text>
                        </Pressable>
                      )}
                    </View>
                  )}
                  {done && manual && journey.doneSteps.includes(step.id) && (
                    <Pressable onPress={async () => setJourney(await markStep(step.id, false))}>
                      <Muted style={{ marginTop: 4, textDecorationLine: "underline" }}>Undo</Muted>
                    </Pressable>
                  )}
                </View>
              </View>
            </Card>
            </Reveal>
          );
        })}
      </View>

      {/* stage gate */}
      {complete && !finishing && (
        <Bounce trigger={complete}>
          <Card tone="moss" style={{ marginTop: 18 }}>
            <Chip label={`Chapter ${stage.n} complete`} hue="ember" />
            <H2 style={{ color: p.surface, marginTop: 10 }}>Chapter complete</H2>
            <P style={{ marginTop: 8, color: p.surface, opacity: 0.9 }}>
              Every step of chapter {stage.n} is done. Move when you&apos;re both ready; the chapters ahead
              build on the ground this one created.
            </P>
            <Btn
              label={t("journey.advance")}
              onPress={async () => {
                setJourney(await advanceStage());
                setCompletedStep(null);
                acknowledgeSuccess();
              }}
              style={{ marginTop: 14, backgroundColor: p.surface, borderColor: p.surface }}
            />
          </Card>
        </Bounce>
      )}

      {finishing && (
        <Card tone="moss" style={{ marginTop: 18 }}>
          <Chip label="Chapter 5 complete" hue="ember" />
          <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 10, marginTop: 10 }}>
            <Ionicons name="ribbon-outline" size={22} color={p.surface} style={{ marginTop: 2 }} />
            <H2 style={{ color: p.surface, flex: 1 }}>
              {canComplete ? "Your journey is ready to complete" : "The stages are done. Check in before you close this chapter"}
            </H2>
          </View>
          <P style={{ marginTop: 8, color: p.surface, opacity: 0.9 }}>
            {canComplete
              ? "Stage five is complete and both of your pulses are strong. Mark this journey complete, then keep using whatever helps you stay connected."
              : "Every stage-five step is complete, but at least one pulse is still under 4. That's not failure; it's useful information. Repeat what helped, talk honestly about what still feels hard, or consider bringing in a qualified professional."}
          </P>
          {canComplete && (
            <Btn
              label="Mark journey complete"
              onPress={async () => {
                const j = await getJourney();
                j.graduatedAt = new Date().toISOString();
                const { saveJourney } = await import("@/lib/store");
                await saveJourney(j);
                setJourney({ ...j });
                acknowledgeSuccess();
              }}
              style={{ marginTop: 14, backgroundColor: p.surface, borderColor: p.surface }}
            />
          )}
        </Card>
      )}

      <Muted style={{ marginTop: 24, textAlign: "center" }}>{t("journey.designedToEnd")}</Muted>
    </Screen>
  );
}
