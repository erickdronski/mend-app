/**
 * Achievements: effort acknowledgements, not a scoreboard.
 *
 * READ THIS BEFORE ADDING, EDITING, OR WIRING ANYTHING HERE.
 * The rules below come from docs/research/gamification.md and
 * docs/research/milestones.md (both read 2026-07-20). They are binding.
 * If a new entry breaks one of them, the entry does not ship.
 *
 * THE HARD RULES
 *
 * 1. Effort, never outcome. Every line describes something a person or a pair
 *    DID. Nothing here may describe how the relationship IS. No "you two are
 *    doing great," no "strong communicators," no "back on track." Praising the
 *    trait instead of the effort makes the next bad week feel like a verdict.
 *    (Mueller and Dweck 1998, https://pubmed.ncbi.nlm.nih.gov/9686450/)
 *
 * 2. No comparison, ever. No ranking, no leaderboard, no "who did more," no
 *    partner-vs-partner anything. A two person leaderboard is the single worst
 *    version of the worst supported mechanic. Joint items are credited to the
 *    pair with no attribution of who did which half.
 *
 * 3. Nothing here can break or be lost. There are no streaks in this file.
 *    Every threshold is cumulative and monotonic: four different weeks, not
 *    four weeks in a row; sixty six days in any order, not consecutively. A
 *    missed day, a bad month, or a long pause removes nothing that was earned.
 *
 * 4. Nothing shames absence. No entry may reference a gap, a lapse, a missed
 *    day, or what the other partner did or did not do. Coming back after time
 *    away is itself an achievement (see "You Came Back"), and the gap is never
 *    quantified anywhere in the UI.
 *
 * 5. No metric may become evidence. If one partner could screenshot it during
 *    a fight to make a case against the other, it does not ship. This is why
 *    there is no per-person count anywhere in this file.
 *
 * 6. Safety is never gamified and never paywalled. There is no achievement for
 *    completing the safety screen, for reading crisis resources, for the
 *    domestic-violence gate, or for reading a track's red flags. Those surfaces
 *    are always available, always free, and never counted. The one adjacent
 *    entry, "Asked for More Help," fires only on the professional-help card
 *    (looking up and saving real-world counseling), never on crisis or DV
 *    surfaces, because escalating to a human is a top tier move and should be
 *    celebrated rather than treated as churn.
 *
 * 7. Nothing is awarded for enduring, tolerating, staying, pushing through, or
 *    not leaving. "Stayed in the Room" means both people chose to finish a hard
 *    conversation. Using the exit ramp forfeits nothing, breaks nothing, and
 *    must never cost a person anything in this system.
 *
 * 8. Honest about what we can see. The app observes in-app actions and self
 *    report. Copy says "you logged," "you wrote," "you marked." It never claims
 *    to have observed real life, and it never predicts an outcome.
 *
 * 9. Inclusive by default. Partner, relationship, the two of you, together.
 *    Never assume marriage, legal status, cohabitation, gender, children, or
 *    religion. This also means never rendering an entry the reader's
 *    relationship makes impossible: filter on `romanticOnly` before display, or
 *    a co-parenting pair carries a dead romance badge in their list forever.
 *
 * 10. Progress is not clinical improvement. Wherever these are displayed, keep
 *     the "this is an educational tool, not therapy" framing visible so nobody
 *     reads an acknowledgement as a health result.
 *
 * COPY TESTS every entry passed, and every new one must pass:
 *   Screenshot test: could this be used against the other person in a fight?
 *   Worst week test: does this make it harder to come back after six weeks off?
 *   Sincerity test: could a partner say "you only did that for the app"?
 *   Graduation test: does this make the couple need the app more, or less?
 *
 * ON THE ONE NUMBER IN HERE: the sixty six day threshold comes from Lally et
 * al., "How are habits formed," median 66 days to near-maximum automaticity,
 * range 18 to 254 (https://onlinelibrary.wiley.com/doi/abs/10.1002/ejsp.674).
 * I did not fetch that paper directly; it is cited in
 * docs/research/milestones.md, read 2026-07-20. The user-facing copy therefore
 * makes no numeric claim, only the threshold itself is set from it.
 *
 * Tiers describe where in the work an entry sits, not how good the user is.
 *   first    = showing up and getting oriented
 *   building = practicing a skill, and keeping at it
 *   deep     = the harder conversations and the longer stretches
 * A tier is never lost once reached, and tiers are never displayed as a level
 * the user has "achieved."
 */

export type AchievementTier = "first" | "building" | "deep";

export type Achievement = {
  id: string;
  /** Warm, human, plain. Never corporate, never cutesy, never a trait. */
  title: string;
  /** The one line shown at the moment it is earned. Always past tense, always about the action. */
  earned: string;
  /** Why this matters, one sentence, plain language, no jargon without a gloss. */
  why: string;
  tier: AchievementTier;
  /** Real Ionicons glyph name. */
  icon: string;
  /** True if one partner can earn this entirely alone, with no participation from the other. */
  solo: boolean;
  /**
   * True when the entry only makes sense for a romantic pair. The list must be
   * filtered with `isRomantic()` from relationships.ts before it is rendered,
   * so a separated co-parenting pair never sees a permanently unreachable
   * romance badge sitting in their list. Absent means it applies to everyone,
   * which is the default and should stay the default.
   *
   * Rule 9 below is why this field exists: an achievement nobody in that
   * relationship could ever earn is a scoreboard entry telling them what shape
   * their relationship was supposed to be.
   */
  romanticOnly?: boolean;
  hue: "moss" | "honey" | "sky" | "plum" | "rose" | "ember";
};

export const achievements: Achievement[] = [
  // ---------------------------------------------------------------------
  // First: showing up. Low bars on purpose. Starting is the largest filter.
  // ---------------------------------------------------------------------
  {
    id: "first-step",
    title: "You Started",
    earned: "You set this up and made a place for the two of you in here.",
    why: "Starting is the step most people never take, and nothing else can happen before it.",
    tier: "first",
    icon: "footsteps-outline",
    solo: true,
    hue: "moss",
  },
  {
    id: "first-answer",
    title: "First Honest Answer",
    earned: "You answered your first daily question in your own words.",
    why: "Saying one true thing is the smallest possible unit of letting someone back in.",
    tier: "first",
    icon: "chatbubble-ellipses-outline",
    solo: true,
    hue: "honey",
  },
  {
    id: "first-session",
    title: "All the Way Through",
    earned: "You went through a full guided session, start to finish.",
    why: "Finishing one is how you find out what these actually feel like, instead of guessing.",
    tier: "first",
    icon: "book-outline",
    solo: true,
    hue: "moss",
  },
  {
    id: "first-pulse",
    title: "Took Your Own Temperature",
    earned: "You finished a pulse check, whatever the answers were.",
    why: "This can only point you somewhere useful if the picture it has is the real one.",
    tier: "first",
    icon: "pulse-outline",
    solo: true,
    hue: "sky",
  },
  {
    id: "first-quiz",
    title: "Learned Your Own Lens",
    earned: "You finished the lens quiz and read what it said about you.",
    why: "Knowing your own default move in conflict is the part of the pattern you can actually work on.",
    tier: "first",
    icon: "glasses-outline",
    solo: true,
    hue: "sky",
  },
  {
    id: "first-week",
    title: "One Week In",
    earned: "You were still here a week after you started, and you came back to look.",
    why: "The second visit is the one that turns an experiment into a practice.",
    tier: "first",
    icon: "today-outline",
    solo: true,
    hue: "ember",
  },
  {
    id: "both-joined",
    title: "Both of You Are Here",
    earned: "You both joined the same space.",
    why: "Two people agreeing to stand in the same place, even a small digital one, is its own kind of yes.",
    tier: "first",
    icon: "people-outline",
    solo: false,
    hue: "rose",
  },
  {
    id: "both-quiz",
    title: "Both Lenses on the Table",
    earned: "You both finished the lens quiz, so both lenses are on the table now.",
    why: "A lot of fights are two people following different instructions for the same situation.",
    tier: "first",
    icon: "swap-horizontal-outline",
    solo: false,
    hue: "sky",
  },

  // ---------------------------------------------------------------------
  // Building: skill practice, and returning to it. All cumulative.
  // ---------------------------------------------------------------------
  {
    id: "soft-start",
    title: "Soft Start",
    earned: "You drafted a hard thing as your feeling and a specific need, not a verdict about them.",
    why: "How a difficult conversation opens shapes most of what happens in the rest of it.",
    tier: "building",
    icon: "leaf-outline",
    solo: true,
    hue: "moss",
  },
  {
    id: "called-break",
    title: "Called the Break",
    earned: "You stopped a conversation when you were too worked up to hear anything.",
    why: "When your body goes into alarm, listening and problem solving stop working, so stopping is the skill.",
    tier: "building",
    icon: "pause-circle-outline",
    solo: true,
    hue: "sky",
  },
  {
    id: "came-back-to-it",
    title: "Came Back to It",
    earned: "You came back and went through a second guided session.",
    why: "One session is an experiment. The second one is where it starts being something you do.",
    tier: "building",
    icon: "return-down-forward-outline",
    solo: true,
    hue: "moss",
  },
  {
    id: "repair-offered",
    title: "Reached Out Mid Fight",
    earned: "You used a repair line while things were still hot.",
    why: "Reaching for each other from inside the fight is harder than reaching afterward, and it is the half of a repair you can offer without waiting for permission.",
    tier: "building",
    icon: "hand-left-outline",
    solo: true,
    hue: "ember",
  },
  {
    id: "let-it-land",
    title: "Let It Land",
    earned: "You accepted their repair on a day you did not feel like accepting anything.",
    why: "Receiving is its own skill, and it is the half of the exchange you control.",
    tier: "building",
    icon: "hand-right-outline",
    solo: true,
    hue: "rose",
  },
  {
    id: "repair-landed",
    title: "It Landed",
    earned: "Your partner marked that something you said reached them.",
    why: "What counts is not how many repairs get attempted, it is whether one gets received.",
    tier: "building",
    icon: "heart-circle-outline",
    solo: false,
    hue: "rose",
  },
  {
    id: "owned-one-thing",
    title: "Owned One Thing",
    earned: "You apologized for one specific thing, with no 'but' attached to the end of it.",
    why: "An apology with a defense stapled to it lands as a counterattack, not an apology.",
    tier: "building",
    icon: "arrow-undo-outline",
    solo: true,
    hue: "moss",
  },
  {
    id: "asked-instead",
    title: "Asked Instead of Assumed",
    earned: "You asked what they meant instead of running with what you assumed they meant.",
    why: "Most escalations start with a guess that nobody stopped to check.",
    tier: "building",
    icon: "search-outline",
    solo: true,
    hue: "sky",
  },
  {
    id: "named-cycle",
    title: "Named the Cycle",
    earned: "You wrote down the loop the two of you keep ending up in.",
    why: "Once the pattern has a name, the pattern can be the problem instead of each other.",
    tier: "building",
    icon: "repeat-outline",
    solo: true,
    hue: "plum",
  },
  {
    id: "spotted-own-move",
    title: "Spotted Your Own Move",
    earned: "You named your own part in the pattern instead of theirs.",
    why: "Your half of the loop is the only half you can do anything about.",
    tier: "building",
    icon: "eye-outline",
    solo: true,
    hue: "plum",
  },
  {
    id: "ten-yeses",
    title: "Ten Small Yeses",
    earned: "You answered the daily question on ten different days.",
    why: "Connection is mostly built out of tiny moments neither of you would think to call important, and ten of them is not nothing.",
    tier: "building",
    icon: "sparkles-outline",
    solo: true,
    hue: "honey",
  },
  {
    id: "specific-thanks",
    title: "Five Specific Thank Yous",
    earned: "You wrote five appreciations that each named something they actually did.",
    why: "Naming the specific act lands very differently than a general compliment does.",
    tier: "building",
    icon: "gift-outline",
    solo: true,
    hue: "honey",
  },
  {
    id: "good-news",
    title: "Good News, Well Received",
    earned: "You gave their good news real attention and real questions, not a nod.",
    why: "How you handle their good days matters separately from how you handle the bad ones.",
    tier: "building",
    icon: "sunny-outline",
    solo: true,
    hue: "honey",
  },
  {
    id: "came-back",
    title: "You Came Back",
    earned: "You opened this again after time away, and picked something up.",
    why: "Stopping and returning is the normal shape of this work, not a failure inside it.",
    tier: "building",
    icon: "partly-sunny-outline",
    solo: true,
    hue: "ember",
  },
  {
    id: "told-truth-pulse",
    title: "Told the Truth on the Pulse",
    earned: "You came back and logged a second pulse check, whatever it said.",
    why: "This can only point you somewhere useful if you keep answering it honestly, and nothing in here ever reads the number to decide what you earned.",
    tier: "building",
    icon: "heart-half-outline",
    solo: true,
    hue: "sky",
  },
  {
    id: "four-weeks-in",
    title: "Four Weeks In",
    earned: "You were still coming back four weeks after you started.",
    why: "Four weeks is enough time to notice what this is and is not doing for the two of you, and noticing that honestly is worth more than another month of hoping.",
    tier: "building",
    icon: "hourglass-outline",
    solo: true,
    hue: "ember",
  },
  {
    id: "sixty-six-days",
    title: "Sixty Six Days",
    earned: "Sixty six days after you started, you are still opening this, gaps and all.",
    why: "New habits take longer to set than anyone expects, and the days you skipped do not erase the days you showed up.",
    tier: "building",
    icon: "flower-outline",
    solo: true,
    hue: "moss",
  },

  // ---------------------------------------------------------------------
  // Deep: the harder conversations, and the longer stretches.
  // ---------------------------------------------------------------------
  {
    id: "underneath",
    title: "Said the Thing Underneath",
    earned: "You named the softer feeling under the anger: scared, lonely, or not important to them.",
    why: "The reactive feeling is the easy one to say, and the one underneath it is the one that gets heard.",
    tier: "deep",
    icon: "layers-outline",
    solo: true,
    hue: "plum",
  },
  {
    id: "said-it-to-them",
    title: "Said It To Them",
    earned: "You said the soft thing to your partner, not just into the app.",
    why: "Saying it about them and saying it to them are different acts, and only one of them changes the room.",
    tier: "deep",
    icon: "chatbubbles-outline",
    solo: false,
    hue: "rose",
  },
  {
    id: "both-directions",
    title: "Both Directions",
    earned: "On five different days, both of you answered the daily question.",
    why: "When one person does all the reaching, the pattern is still stuck no matter how hard they try. Five days of both of you answering is the shape of two people showing up.",
    tier: "deep",
    icon: "git-compare-outline",
    solo: false,
    hue: "ember",
  },
  {
    id: "took-influence",
    title: "Took the Influence",
    earned: "You logged a time you changed your mind because of something they said.",
    why: "Being movable by your partner is what sharing a decision actually looks like in practice.",
    tier: "deep",
    icon: "compass-outline",
    solo: true,
    hue: "moss",
  },
  {
    id: "fight-autopsy",
    title: "Went Back Over a Fight",
    earned: "You finished a full week of the challenge about fighting cleanly and repairing softly.",
    why: "A hard moment can finally be understood once both people are calm enough to look at it.",
    tier: "deep",
    icon: "telescope-outline",
    solo: false,
    hue: "plum",
  },
  {
    id: "stayed-in-room",
    title: "Stayed in the Room",
    earned: "You went all the way through five guided sessions.",
    why: "Staying present while someone tells you what hurt is most of what repair asks of a person.",
    tier: "deep",
    icon: "people-circle-outline",
    solo: false,
    hue: "ember",
  },
  {
    id: "named-moment",
    title: "Named the Moment",
    earned: "You described the specific time you needed them and they were not there.",
    why: "A specific moment is something two people can work on, and a permanent atmosphere is not.",
    tier: "deep",
    icon: "bandage-outline",
    solo: true,
    hue: "plum",
  },
  {
    id: "stress-dump",
    title: "Nothing Fixed, On Purpose",
    earned: "You both did the outside-stress conversation with solutions off the table.",
    why: "Feeling understood and getting advice are different things, and people mostly want the first one.",
    tier: "deep",
    icon: "umbrella-outline",
    solo: false,
    hue: "sky",
  },
  {
    id: "something-new",
    title: "Something New Together",
    earned: "You both logged doing something new together, however small it was.",
    why: "Doing something unfamiliar side by side is a different kind of repair than talking about the hard parts.",
    tier: "deep",
    icon: "boat-outline",
    solo: false,
    hue: "honey",
  },
  {
    id: "money-out-loud",
    title: "Money, Out Loud",
    earned: "You both finished the money history session.",
    why: "Money is one of the two subjects couples avoid hardest, and getting the conversation started counts even without agreement.",
    tier: "deep",
    icon: "wallet-outline",
    solo: false,
    hue: "ember",
  },
  {
    id: "desire-out-loud",
    title: "Desire, Out Loud",
    earned: "You both finished the session on affection and desire.",
    why: "Avoiding the subject is what keeps the distance in place, so naming it at all is the whole first step.",
    tier: "deep",
    icon: "flame-outline",
    solo: false,
    romanticOnly: true,
    hue: "rose",
  },
  {
    id: "dream-underneath",
    title: "Found the Dream Underneath",
    earned: "You each named the hope or the fear inside a disagreement you have been having for years.",
    why: "Some disagreements are not solvable, and understanding what sits underneath them is the actual work.",
    tier: "deep",
    icon: "planet-outline",
    solo: false,
    hue: "plum",
  },
  {
    id: "track-session",
    title: "Opened the Hard Door",
    earned: "You started one of the healing tracks and worked through a session inside it.",
    why: "A specific wound usually needs its own path rather than general relationship advice.",
    tier: "deep",
    icon: "key-outline",
    solo: true,
    hue: "plum",
  },
  {
    id: "four-weeks-ritual",
    title: "Four Weeks of the Ritual",
    earned: "You picked a ritual and it was still in your plan four weeks later, gaps and all.",
    why: "A ritual that holds without anyone chasing it is the point where this stops being an app thing and starts being yours.",
    tier: "deep",
    icon: "calendar-number-outline",
    solo: false,
    hue: "ember",
  },
  {
    id: "asked-for-help",
    title: "Asked for More Help",
    earned: "You looked up real-world help and saved a way to reach it.",
    why: "This is an educational tool and not therapy, and knowing when to bring in a trained person is the strongest move available in here.",
    tier: "deep",
    icon: "help-buoy-outline",
    solo: true,
    hue: "ember",
  },
];
