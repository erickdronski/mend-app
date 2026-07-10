import { useCallback, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
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
  readyToGraduate,
  stageComplete,
  stages,
  stepDone,
  type StepContext,
} from "@/lib/journey";
import { Btn, Card, H1, H2, Muted, P, Rise, Screen, usePalette } from "@/components/ui";
import { ProgressRing } from "@/components/rings";
import { Reveal } from "@/components/motion";

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

      {/* stage hero: deep forest with a progress ring */}
      <Rise>
        <LinearGradient
          colors={["#2e4a38", "#233c2c"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ marginTop: 16, borderRadius: 20, padding: 20 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
            <View style={{ flex: 1 }}>
              {names ? (
                <Text style={{ color: "#f4f4ee", opacity: 0.6, fontSize: 12.5 }}>{names}</Text>
              ) : null}
              <Text style={{ color: "#d9a057", fontWeight: "700", fontSize: 12, textTransform: "uppercase", letterSpacing: 1.5, marginTop: 4 }}>
                {t("journey.stage")} {stage.n} {t("common.of")} {stages.length}
              </Text>
              <Text style={{ color: "#f4f4ee", fontSize: 25, fontWeight: "800", letterSpacing: -0.4, marginTop: 4, lineHeight: 30 }}>
                {stage.title}
              </Text>
              <Text style={{ color: "#f4f4ee", opacity: 0.75, fontSize: 13.5, marginTop: 6, lineHeight: 19 }}>
                {stage.arc}
              </Text>
            </View>
            <ProgressRing
              progress={doneCount / stage.steps.length}
              size={84}
              stroke={7}
              trackColor="rgba(244,244,238,0.18)"
              color="#d9a057"
            >
              <Text style={{ color: "#f4f4ee", fontWeight: "800", fontSize: 18 }}>
                {doneCount}/{stage.steps.length}
              </Text>
            </ProgressRing>
          </View>
          <Text style={{ color: "#f4f4ee", opacity: 0.55, fontSize: 12, marginTop: 12 }}>{stage.weeksHint}</Text>
        </LinearGradient>
      </Rise>

      {/* the why */}
      <Rise delay={120}>
        <Card tone="panel" style={{ marginTop: 12 }}>
          <P style={{ fontSize: 14 }}>{stage.why}</P>
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
        {stage.steps.map((step, si) => {
          const done = stepDone(step, ctx, journey);
          const manual = !step.auto;
          return (
            <Reveal key={step.id} index={si}>
            <Card style={{ opacity: done ? 0.65 : 1 }}>
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
            </Reveal>
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
