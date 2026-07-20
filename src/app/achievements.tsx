/**
 * Achievements: proof that the work is adding up.
 *
 * What this screen deliberately does NOT do (see docs/research/gamification.md):
 * no scores, no percentages of "relationship health", no comparison between
 * partners, no streak that can break, no shaming of what is not earned yet.
 * Locked achievements are shown as a quiet invitation, never as a deficit.
 */
import { useCallback, useState } from "react";
import { View } from "react-native";
import { useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  achievements,
  claim,
  getClaimed,
  isAutoDetected,
  syncEarned,
  type Achievement,
  type EarnedMap,
} from "@/lib/achievements";
import {
  getChallengesDone,
  getDailyAnswerCount,
  getJourney,
  getPlan,
  getProfile,
  getPulses,
  getSessions,
} from "@/lib/store";
import { getMySpace, getSpaceProgress } from "@/lib/space";
import {
  Card,
  Chip,
  Eyebrow,
  Hero,
  IconChip,
  Muted,
  P,
  Screen,
  usePalette,
} from "@/components/ui";
import { Bloom, Press, Reveal } from "@/components/motion";

const TIER_LABEL: Record<Achievement["tier"], string> = {
  first: "Getting started",
  building: "Building the habit",
  deep: "The deeper work",
};

export default function Achievements() {
  const p = usePalette();
  const [earned, setEarned] = useState<EarnedMap>({});
  const [fresh, setFresh] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  const reload = useCallback(() => {
    (async () => {
      const [profile, sessions, plan, challengesDone, pulses, journey, dailyAnswers, claimed] =
        await Promise.all([
          getProfile(),
          getSessions(),
          getPlan(),
          getChallengesDone(),
          getPulses(),
          getJourney(),
          getDailyAnswerCount(),
          getClaimed(),
        ]);

      // Shared-space facts are a bonus: if the network is slow or the couple
      // has no space yet, the screen still works from local evidence alone.
      let bothInSpace = false;
      let daysBoth = 0;
      try {
        const space = await getMySpace();
        if (space) {
          bothInSpace = space.members.length >= 2;
          const prog = await getSpaceProgress(space);
          daysBoth = prog?.days_both ?? 0;
        }
      } catch {
        // stay local
      }

      const { earned: map, fresh: newly } = await syncEarned({
        profile,
        sessions,
        plan,
        challengesDone,
        pulses,
        journey,
        dailyAnswers,
        bothInSpace,
        daysBoth,
        claimed,
      });
      setEarned(map);
      setFresh(newly.map((a) => a.id));
      setLoaded(true);
    })();
  }, []);

  useFocusEffect(reload);

  const earnedCount = Object.keys(earned).length;
  const tiers: Achievement["tier"][] = ["first", "building", "deep"];

  return (
    <Screen>
      <Hero
        hue="honey"
        eyebrow="Your milestones"
        title={
          earnedCount === 0
            ? "Everything here is earned by showing up"
            : `${earnedCount} of ${achievements.length} earned`
        }
        sub="These mark what you practiced, never how good your relationship is. Nothing here can be lost."
        style={{ marginTop: 12 }}
      />

      {!loaded ? null : (
        <>
          {tiers.map((tier, ti) => {
            const list = achievements.filter((a) => a.tier === tier);
            const got = list.filter((a) => earned[a.id]).length;
            return (
              <Reveal key={tier} index={ti} style={{ marginTop: 22 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <Eyebrow hue="honey">{TIER_LABEL[tier]}</Eyebrow>
                  <Chip label={`${got} of ${list.length}`} hue="honey" />
                </View>
                <View style={{ marginTop: 8, gap: 10 }}>
                  {list.map((a) => {
                    const isEarned = Boolean(earned[a.id]);
                    const isFresh = fresh.includes(a.id);
                    const claimable = !isEarned && !isAutoDetected(a.id);
                    return (
                      <Card
                        key={a.id}
                        style={{
                          borderColor: isEarned ? p.hues[a.hue].accent : p.line,
                          opacity: isEarned ? 1 : 0.72,
                        }}
                      >
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                          {isEarned ? (
                            <Bloom trigger={isFresh} color={p.hues[a.hue].accent} size={54}>
                              <IconChip
                                name={a.icon as keyof typeof Ionicons.glyphMap}
                                hue={a.hue}
                                size={40}
                              />
                            </Bloom>
                          ) : (
                            <View
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 12,
                                backgroundColor: p.panel,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Ionicons name="ellipse-outline" size={20} color={p.muted} />
                            </View>
                          )}
                          <View style={{ flex: 1 }}>
                            <P style={{ fontWeight: "700", fontSize: 15 }}>{a.title}</P>
                            <Muted style={{ marginTop: 2, fontSize: 12.5 }}>
                              {isEarned ? a.earned : a.why}
                            </Muted>
                          </View>
                          {a.solo ? null : <Chip label="Together" hue="rose" />}
                        </View>

                        {isEarned ? (
                          <Muted style={{ marginTop: 10, fontSize: 12 }}>{a.why}</Muted>
                        ) : claimable ? (
                          // Honor system: some real repair cannot be detected by
                          // an app, so the person tells us. No proof demanded.
                          <Press
                            onPress={async () => {
                              await claim(a.id);
                              reload();
                            }}
                            haptic
                          >
                            <View
                              style={{
                                marginTop: 10,
                                paddingVertical: 9,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: p.line,
                                alignItems: "center",
                              }}
                            >
                              <P style={{ fontSize: 13, fontWeight: "600", color: p.hues[a.hue].fg }}>
                                We did this
                              </P>
                            </View>
                          </Press>
                        ) : null}
                      </Card>
                    );
                  })}
                </View>
              </Reveal>
            );
          })}

          <Muted style={{ marginTop: 24, textAlign: "center", fontSize: 12 }}>
            Milestones mark effort, not outcomes. A hard week never takes one away.
          </Muted>
        </>
      )}
    </Screen>
  );
}
