export type MomentumInput = {
  dailyDays: string[];
  sessionDates: string[];
  pulseDates: string[];
  completedCommitmentDates: string[];
  journeySteps: number;
  completedChallenges: number;
  rituals: number;
};

export type MomentumThread = {
  id: "talk" | "notice" | "practice" | "follow-through";
  label: string;
  active: boolean;
};

export type ConnectionMomentum = {
  totalMoments: number;
  recentMoments: number;
  headline: string;
  reflection: string;
  threads: MomentumThread[];
};

function validTime(value: string): number | null {
  const time = new Date(value).getTime();
  return Number.isFinite(time) ? time : null;
}

/**
 * A cumulative acknowledgement of practice, not a relationship score.
 * Nothing resets, decays, or compares one partner with the other.
 */
export function getConnectionMomentum(
  input: MomentumInput,
  now = new Date()
): ConnectionMomentum {
  const datedMoments = [
    ...input.dailyDays,
    ...input.sessionDates,
    ...input.pulseDates,
    ...input.completedCommitmentDates,
  ];
  const recentCutoff = now.getTime() - 7 * 24 * 60 * 60 * 1000;
  const recentMoments = datedMoments.filter((date) => {
    const time = validTime(date);
    return time !== null && time >= recentCutoff && time <= now.getTime();
  }).length;
  const totalMoments =
    datedMoments.length +
    input.journeySteps +
    input.completedChallenges +
    input.rituals;

  let headline = "Ready when you are";
  let reflection = "One honest answer or shared action begins the thread.";
  if (totalMoments >= 15) {
    headline = "Something you return to";
    reflection = "These are repeated acts of attention, not a verdict about your relationship.";
  } else if (totalMoments >= 7) {
    headline = "Building a practice";
    reflection = "Small moments are beginning to collect into a shared rhythm.";
  } else if (totalMoments >= 3) {
    headline = "Finding a rhythm";
    reflection = "You have returned to the work in more than one way.";
  } else if (totalMoments > 0) {
    headline = "A beginning";
    reflection = "You made room for one intentional moment. That counts.";
  }

  return {
    totalMoments,
    recentMoments,
    headline,
    reflection,
    threads: [
      {
        id: "talk",
        label: "Talk",
        active: input.dailyDays.length > 0 || input.sessionDates.length > 0,
      },
      {
        id: "notice",
        label: "Notice",
        active: input.pulseDates.length > 0,
      },
      {
        id: "practice",
        label: "Practice",
        active: input.journeySteps > 0 || input.completedChallenges > 0,
      },
      {
        id: "follow-through",
        label: "Keep",
        active: input.completedCommitmentDates.length > 0 || input.rituals > 0,
      },
    ],
  };
}
