import { useCallback, useState } from "react";
import { Pressable, Text, View } from "react-native";
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
  pulseAvg,
  pulseConcern,
  readyToGraduate,
  stageComplete,
  stages,
  stepDone,
  type StepContext,
} from "@/lib/journey";
import { Btn, Card, H1, H2, Muted, P, Screen, usePalette } from "@/components/ui";

/**
 * The Journey tab: the app's home. One current stage, its steps, the next
 * action, and the honest exit at the end.
 */
export default function JourneyScreen() {
  const p = usePalette();
  const router = useRouter();
  const { t } = useTranslation();
  const [ctx, setCtx] = useState<StepContext | null>(null);
  const [journey, setJourney] = useState<JourneyState | null>(null);

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

  // ——— graduated ———
  if (journey.graduatedAt) {
    const base = pulseAvg(ctx.pulses, 1, 0);
    const final = pulseAvg(ctx.pulses, 5, 0);
    return (
      <Screen safeTop>
        <H1 style={{ marginTop: 24 }}>{t("journey.graduated")}</H1>
        <P style={{ marginTop: 12 }}>
          You did the unglamorous thing: showed up, week after week, for months. The rituals are
          yours now, not the app&apos;s. Keep the weekly meeting, keep the six-second kiss, and
          come back only if a hard season needs a referee again.
        </P>
        {base !== null && final !== null && (
          <Card tone="fern" style={{ marginTop: 20 }}>
            <H2>The distance you covered</H2>
            <P style={{ marginTop: 8 }}>
              Baseline pulse {base.toFixed(1)} → final pulse {final.toFixed(1)}. That movement is
              yours, and nobody can take it back.
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
  const concern = pulseConcern(ctx, stage.n);
  const graduating = journey.stage >= 5 && complete;
  const canGraduate = readyToGraduate(ctx, journey);
  const names = ctx.profile ? [ctx.profile.a, ctx.profile.b].filter(Boolean).join(" & ") : "";

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

      {names ? <Muted style={{ marginTop: 14 }}>{names}</Muted> : null}
      <H1 style={{ marginTop: 4 }}>
        {t("journey.stage")} {stage.n}: {stage.title}
      </H1>
      <Muted style={{ marginTop: 6 }}>{stage.arc}</Muted>

      {/* stage progress rail */}
      <View style={{ flexDirection: "row", gap: 6, marginTop: 16 }}>
        {stages.map((s) => (
          <View
            key={s.n}
            style={{
              flex: 1,
              height: 5,
              borderRadius: 3,
              backgroundColor: s.n < stage.n ? p.moss : s.n === stage.n ? p.ember : p.line,
            }}
          />
        ))}
      </View>
      <Muted style={{ marginTop: 8 }}>
        {doneCount} {t("common.of")} {stage.steps.length} · {stage.weeksHint}
      </Muted>

      {/* the why */}
      <Card tone="panel" style={{ marginTop: 16 }}>
        <P>{stage.why}</P>
      </Card>

      {/* low pulse: point at humans, gently */}
      {concern && (
        <Card style={{ marginTop: 12, borderColor: p.ember }}>
          <H2>A pulse this low deserves more than an app</H2>
          <P style={{ marginTop: 8 }}>
            One of you rated this season very low. Keep going here if it helps, and please also
            look at real support: the resources page lists free and low-cost ways to reach
            licensed counselors.
          </P>
          <Btn label={t("common.getHelp")} kind="ghost" onPress={() => router.push("/safety")} style={{ marginTop: 12 }} />
        </Card>
      )}

      {/* next step, big */}
      {nextStep && !complete && (
        <Card tone="fern" style={{ marginTop: 16 }}>
          <Muted style={{ textTransform: "uppercase", letterSpacing: 1.5, fontWeight: "700", color: p.mossDeep }}>
            {t("journey.nextStep")}
          </Muted>
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

      {/* all steps */}
      <View style={{ marginTop: 18, gap: 10 }}>
        {stage.steps.map((step) => {
          const done = stepDone(step, ctx, journey);
          const manual = !step.auto;
          return (
            <Card key={step.id} style={{ opacity: done ? 0.65 : 1 }}>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <Ionicons
                  name={done ? "checkmark-circle" : "ellipse-outline"}
                  size={22}
                  color={done ? p.moss : p.muted}
                  style={{ marginTop: 1 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15.5, fontWeight: "600", color: p.ink, textDecorationLine: done ? "line-through" : "none" }}>
                    {step.title}
                  </Text>
                  {!done && <Muted style={{ marginTop: 5 }}>{step.body}</Muted>}
                  {!done && (
                    <View style={{ flexDirection: "row", gap: 14, marginTop: 10 }}>
                      <Link href={step.href as Href} style={{ color: p.ember, fontWeight: "600", fontSize: 14 }}>
                        {step.hrefLabel} →
                      </Link>
                      {manual && (
                        <Pressable onPress={async () => setJourney(await markStep(step.id, true))}>
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
          );
        })}
      </View>

      {/* stage gate */}
      {complete && !graduating && (
        <Card tone="moss" style={{ marginTop: 18 }}>
          <H2 style={{ color: p.surface }}>{t("journey.stageComplete")}</H2>
          <P style={{ marginTop: 8, color: p.surface, opacity: 0.9 }}>
            Every step of stage {stage.n} is done. Move when you're both ready; the stages ahead
            assume the ground this one built.
          </P>
          <Btn
            label={t("journey.advance")}
            onPress={async () => setJourney(await advanceStage())}
            style={{ marginTop: 14, backgroundColor: p.surface, borderColor: p.surface }}
          />
        </Card>
      )}

      {graduating && (
        <Card tone="moss" style={{ marginTop: 18 }}>
          <H2 style={{ color: p.surface }}>
            {canGraduate ? "You're ready to graduate" : "The work is done. The numbers aren't, yet"}
          </H2>
          <P style={{ marginTop: 8, color: p.surface, opacity: 0.9 }}>
            {canGraduate
              ? "Stage five is complete and both of your pulses are strong. There's one feature left: leaving."
              : "Every stage-five step is complete, but at least one of your pulses is still under 4. That's not failure; it's information. Repeat what worked (sessions, the rituals), or consider bringing a professional in for the last stretch. Graduate when the numbers are honest."}
          </P>
          {canGraduate && (
            <Btn
              label={t("journey.graduated")}
              onPress={async () => {
                const j = await getJourney();
                j.graduatedAt = new Date().toISOString();
                const { saveJourney } = await import("@/lib/store");
                await saveJourney(j);
                setJourney({ ...j });
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
