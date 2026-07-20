/**
 * The relationship-type model.
 *
 * Mend serves every committed romantic relationship, plus co-parents who are
 * rebuilding a working partnership. Marriage is one option in this file, never
 * the assumption behind it.
 *
 * Three ideas run through the whole model:
 *
 * 1. Type is a lens, never a gate. Nothing is locked, hidden, or priced by what
 *    a couple calls themselves. The type only changes wording, ordering, and
 *    which optional context notes get layered on top of a shared exercise.
 *    Research finding (docs/research/relationship-taxonomy.md, section 1):
 *    content selection is additive filtering, not routing. Do not build a
 *    separate parallel app per type.
 *
 * 2. Type is one axis, not the whole picture. A couple can be partnered AND
 *    long distance AND co-parenting a stepchild at once. That is why living
 *    situation, time together, and the apart/together modifier live in their
 *    own types here. "Long distance" is deliberately NOT a relationship type:
 *    it is a modifier on LivingSituation, because dating, married, engaged, and
 *    reconciling couples can all be living apart, and treating it as a type
 *    would force people to pick which true thing about them to erase.
 *
 * 3. Safety never personalizes. The domestic-violence gate, the "this is an
 *    educational tool, not therapy" framing, the crisis resources, and every
 *    per-track red flag are global and identical for every type. They are never
 *    reworded by this file, never weakened by it, never behind a paywall. Use
 *    SAFETY_FRAME, not frameFor(), anywhere safety copy is rendered.
 *
 * What this file must never do: ask or infer gender, legal status as a
 * requirement, sexual orientation as a demographic, religion, income, or
 * anything with the word "yet" attached. Every default here is the wide one.
 *
 * No imports. This file is pure data plus two pure functions so it can be read
 * from onboarding, the journey engine, content filters, and copy helpers
 * without pulling in the store.
 */

/**
 * What the couple calls the relationship. Chosen by the user, editable forever,
 * presented as a flat list of equals. Never ordered as a ladder, never scored,
 * never used to unlock or withhold anything.
 */
export type RelationshipType =
  | "dating"
  | "engaged"
  | "partnered"
  | "married"
  | "remarried"
  | "reconciling"
  | "coparenting"
  | "civilPartnership"
  | "unlabeled";

/**
 * Roughly how long they have been together. Buckets only. The app never asks
 * for an anniversary date and never asks how long someone has been married,
 * because that question quietly assumes the wedding is the start of the story.
 */
export type Together = "under1" | "1to3" | "3to7" | "7to15" | "over15";

/**
 * Where the two of you sleep most nights. The single highest-value input in the
 * whole flow: it drives micro-moves, rituals, challenge day variants, nudges,
 * and whether a session offers two-device mode.
 *
 * "longDistance" is the modifier that stops the app from assuming a shared
 * address. It is a living situation, not a relationship type, and any couple of
 * any type can carry it.
 *
 * "apart" covers two homes in the same area, whether that is by choice or by
 * circumstance. "separated" covers two households that are still tied, usually
 * by a child.
 */
export type LivingSituation = "apart" | "longDistance" | "together" | "separated";

/**
 * One entry in the type picker, and the source of truth for how the app speaks
 * to that couple.
 *
 * - `icon` is an Ionicons glyph name (@expo/vector-icons Ionicons).
 * - `pulseFraming` tells the journey engine how to word the weekly pulse for
 *   this couple. The pulse is a mirror, not a verdict: it never names a
 *   direction the couple has not chosen.
 * - `celebrates` is what milestones, graduation copy, and badges are allowed to
 *   honor for this type. It is never a status change, never a wedding, never
 *   "you stayed together".
 */
export type RelationshipDef = {
  id: RelationshipType;
  label: string;
  blurb: string;
  icon: string;
  pulseFraming: string;
  celebrates: string;
};

export const relationshipTypes: RelationshipDef[] = [
  {
    id: "dating",
    label: "Dating",
    blurb:
      "Committed to each other, no engagement, no legal tie. You are still working out what this becomes, and that is a real place to stand, not a waiting room.",
    icon: "sparkles-outline",
    pulseFraming:
      "Ask whether the week felt like two people choosing each other. Never ask whether you are on track to anything, and never imply a next step you have not picked.",
    celebrates:
      "Choosing each other on purpose, and being honest with each other about what you each actually want.",
  },
  {
    id: "engaged",
    label: "Engaged",
    blurb:
      "A commitment with a date in front of it. Planning pressure is not the same thing as a relationship problem, though it is very good at hiding one.",
    icon: "diamond-outline",
    pulseFraming:
      "Separate the wedding from the relationship. Ask how the two of you did with each other this week, not how the planning went.",
    celebrates:
      "Learning how you handle pressure together now, before it turns into the everyday.",
  },
  {
    id: "partnered",
    label: "Partnered",
    blurb:
      "Committed for the long haul, unmarried, and not waiting on a ceremony. This is a whole relationship, not a stage before one.",
    icon: "people-outline",
    pulseFraming:
      "Ask about the life you are actually building. No reference to a step you have not chosen, and no assumption that one is coming.",
    celebrates:
      "The life you built without an institution telling you it counted.",
  },
  {
    id: "married",
    label: "Married",
    blurb:
      "Legally married. If that word matters to you, the app will use it, and only in the places where it fits.",
    icon: "heart-outline",
    pulseFraming:
      "The standard five statements, with your own word for each other swapped in. Nothing else changes.",
    celebrates:
      "The daily work, the repairs, and the ordinary Tuesday. Never the wedding day.",
  },
  {
    id: "remarried",
    label: "Remarried",
    blurb:
      "A second or later marriage, often with children, exes, and old habits in the room. None of that makes this one less real or less yours.",
    icon: "refresh-circle-outline",
    pulseFraming:
      "Ask about this relationship only. Never compare it to a previous one, never imply a track record, never count.",
    celebrates:
      "Naming the old pattern out loud early, and doing something different with it this time.",
  },
  {
    id: "reconciling",
    label: "Back together",
    blurb:
      "You split up, or divorced, and came back to each other. Coming back is a decision you made, not a reset button you pressed.",
    icon: "git-merge-outline",
    pulseFraming:
      "Keep the five, and add one: whether the old pattern showed up less this week. For most couples here, that trend line is the only number that means anything.",
    celebrates:
      "Choosing each other twice, and not repeating the ending you already lived through.",
  },
  {
    id: "coparenting",
    label: "Co-parenting",
    blurb:
      "Not romantically together, raising a child together. The goal is a partnership that works. That counts as repair, and it has a path here.",
    icon: "swap-horizontal-outline",
    pulseFraming:
      "Warmth is the wrong question. Ask about civility, calm handoffs, and whether your kid had to manage the two of you this week.",
    celebrates:
      "Two parents who do not need a referee, and a kid who does not have to carry the message.",
  },
  {
    id: "civilPartnership",
    label: "Civil partnership",
    blurb:
      "Legally partnered without a marriage. A full commitment with its own name, and the app will use the name you gave it.",
    icon: "ribbon-outline",
    pulseFraming:
      "The standard five, worded with your own bond word. Never substitute the marriage noun on your behalf.",
    celebrates:
      "The commitment you registered, and every ordinary day that came after it.",
  },
  {
    id: "unlabeled",
    label: "We don't use a word for it",
    blurb:
      "Committed, and none of the available words fit. That is a complete answer. The app will just say your relationship and leave it there.",
    icon: "ellipsis-horizontal-circle-outline",
    pulseFraming:
      "Keep every statement neutral. No bond noun, no implied direction, no next step, no label you did not give us.",
    celebrates:
      "Whatever the two of you decided this is, described in your words rather than ours.",
  },
];

/**
 * The wide default. Applied to any existing user who has no stored type, and to
 * anyone who skips the question. "partnered" is the widest honest answer: it
 * assumes commitment and nothing else. Never assume "married".
 */
export const DEFAULT_RELATIONSHIP_TYPE: RelationshipType = "partnered";

/** The wide default for time together when the question is skipped. */
export const DEFAULT_TOGETHER: Together = "3to7";

/** The wide default for living situation when the question is skipped. */
export const DEFAULT_LIVING: LivingSituation = "together";

/** Plain-language labels for the Together buckets, for pickers and settings. */
export const togetherLabels: Record<Together, string> = {
  under1: "Under a year",
  "1to3": "1 to 3 years",
  "3to7": "3 to 7 years",
  "7to15": "7 to 15 years",
  over15: "Over 15 years",
};

/** Plain-language labels for living situation, for pickers and settings. */
export const livingLabels: Record<LivingSituation, string> = {
  together: "One home",
  apart: "Two homes nearby",
  longDistance: "Long distance",
  separated: "Two households",
};

/**
 * The words the whole app uses for this couple.
 *
 * - `us` is the noun for the bond, already possessive: "your relationship",
 *   "your marriage", "your partnership", "your co-parenting".
 * - `commitment` is the noun for the other person: "partner", "spouse",
 *   "co-parent".
 *
 * This is the fallback layer. If the user told us their own words during
 * onboarding, those always win over this function. Only reach for frameFor()
 * when there is nothing stored.
 *
 * Rule that produces the marriage noun: only "married" and "civilPartnership"
 * and "remarried" get anything other than "your relationship", and even then
 * only because the user explicitly picked that type. Nothing here infers.
 */
export function frameFor(type: RelationshipType): { us: string; commitment: string } {
  switch (type) {
    case "married":
    case "remarried":
      return { us: "your marriage", commitment: "spouse" };
    case "civilPartnership":
      return { us: "your partnership", commitment: "partner" };
    case "coparenting":
      return { us: "your co-parenting", commitment: "co-parent" };
    case "dating":
    case "engaged":
    case "partnered":
    case "reconciling":
    case "unlabeled":
    default:
      return { us: "your relationship", commitment: "partner" };
  }
}

/**
 * Safety copy never personalizes. Every safety surface reads from this and
 * never from frameFor(): the onboarding gate, the domestic-violence screen,
 * crisis resources in the library, and every per-track red flag.
 *
 * Reason: a couple who picked "co-parenting" or "back together" still needs the
 * exact same words on the screen that might be the one that matters. Rewriting
 * safety copy per type is how you accidentally soften it.
 */
export const SAFETY_FRAME: { us: string; commitment: string } = {
  us: "your relationship",
  commitment: "partner",
};

/** Look up one definition. Returns undefined for an unknown id. */
export function relationshipDef(type: RelationshipType): RelationshipDef | undefined {
  return relationshipTypes.find((r) => r.id === type);
}

/**
 * True when the relationship is romantic. Only co-parenting is not.
 * Use this to hide desire, affection, and romance content rather than showing a
 * skippable version of it. A skippable desire step still lands as a question
 * that couple did not want to be asked.
 */
export function isRomantic(type: RelationshipType): boolean {
  return type !== "coparenting";
}

/**
 * True when this couple does not share an address most nights. Content tagged
 * for shared-home life (the six-second kiss, the end-of-day download, the
 * reunion ritual) must be swapped for an apart variant rather than shown and
 * silently failed.
 */
export function isApart(living: LivingSituation): boolean {
  return living !== "together";
}

/**
 * True when a break in the relationship is part of the picture, by type. Drives
 * the reconciliation content and stops the app from drawing one continuous
 * timeline over a gap that really happened.
 */
export function hasBreak(type: RelationshipType): boolean {
  return type === "reconciling" || type === "coparenting";
}
