/**
 * The "How you love and fight" self-discovery quiz.
 *
 * Two short quizzes: an attachment-flavored lens quiz (inspired by attachment
 * theory, generically) and a conflict-role quiz (the pursue/withdraw loop
 * described in Emotionally Focused Therapy). This is an educational lens,
 * not a diagnostic instrument, and the copy says so. Every option is a
 * sympathetic, normal way to be a person.
 */

export type LensId = "secure" | "anxious" | "avoidant";

export type QuizOption = { text: string; lens: LensId };

export type LensQuestion = { prompt: string; options: QuizOption[] };

export const lensQuestions: LensQuestion[] = [
  {
    prompt: "Your partner is quieter than usual tonight. Your first instinct is...",
    options: [
      {
        text: "Ask once what's going on, believe the answer, and stay close by in case they want more.",
        lens: "secure",
      },
      {
        text: "Replay the day in your head, looking for the moment you might have caused it.",
        lens: "anxious",
      },
      {
        text: "Leave them be. If it were about you, they'd say something.",
        lens: "avoidant",
      },
    ],
  },
  {
    prompt: "You send a text that matters to you. Three hours later, still no reply.",
    options: [
      {
        text: "It hums in the background of your whole afternoon. You reread what you sent more than once.",
        lens: "anxious",
      },
      {
        text: "You mostly forget about it. People answer when they can; that's how you'd want to be treated.",
        lens: "avoidant",
      },
      {
        text: "You assume they're slammed. If it still bothers you at dinner, you'll just ask.",
        lens: "secure",
      },
    ],
  },
  {
    prompt: "You can feel an argument coming, the way you can feel weather.",
    options: [
      {
        text: "You get quiet and careful, hoping the storm can be steered around instead of through.",
        lens: "avoidant",
      },
      {
        text: "You'd rather open it on purpose than have it ambush you both at bedtime.",
        lens: "secure",
      },
      {
        text: "Your body answers first: tight chest, racing thoughts, a need to know you two are okay.",
        lens: "anxious",
      },
    ],
  },
  {
    prompt: "Your partner plans a weekend away with friends, without you.",
    options: [
      {
        text: "You say “have fun” and mean it, mostly. A small voice still asks why they want a break from you.",
        lens: "anxious",
      },
      {
        text: "Honestly, it sounds healthy. You could use a quiet weekend to yourself anyway.",
        lens: "avoidant",
      },
      {
        text: "You're glad. They come back happier from these trips, and you like who they are with their friends.",
        lens: "secure",
      },
    ],
  },
  {
    prompt: "They tell you something you did last week hurt them.",
    options: [
      {
        text: "It stings, but you want to hear it. Better a bruise now than a wall later.",
        lens: "secure",
      },
      {
        text: "You apologize fast, maybe too fast, because the distance between you feels like the emergency.",
        lens: "anxious",
      },
      {
        text: "You take it in and go quiet. You'd rather answer tomorrow, when you can do it well.",
        lens: "avoidant",
      },
    ],
  },
  {
    prompt: "You've had a genuinely bad day. When you walk in the door...",
    options: [
      {
        text: "You need half an hour to yourself first. Then you can be a person again.",
        lens: "avoidant",
      },
      {
        text: "You say “today was rough” and let the evening do its thing. It'll come out over dinner.",
        lens: "secure",
      },
      {
        text: "You want them close right away. If they seem distracted, the day somehow gets worse.",
        lens: "anxious",
      },
    ],
  },
  {
    prompt: "Saying “I need you” out loud feels...",
    options: [
      {
        text: "Familiar. Maybe too familiar. You sometimes worry you say it more than they want to hear it.",
        lens: "anxious",
      },
      {
        text: "Doable. Not always easy, but you trust it will be caught.",
        lens: "secure",
      },
      {
        text: "Like a lot. You show it in what you do; the words themselves sit heavy in your mouth.",
        lens: "avoidant",
      },
    ],
  },
  {
    prompt: "Your partner is upset about something that has nothing to do with you.",
    options: [
      {
        text: "You go practical: food, logistics, fixing what can be fixed. It's how you say I love you.",
        lens: "avoidant",
      },
      {
        text: "Their mood becomes your mood. You can't fully settle until they do.",
        lens: "anxious",
      },
      {
        text: "You sit with them and ask what they need. Sometimes it's help, sometimes it's just company.",
        lens: "secure",
      },
    ],
  },
  {
    prompt: "After a big, openhearted conversation, you usually feel...",
    options: [
      {
        text: "Closer. Tired, maybe, but glad it happened.",
        lens: "secure",
      },
      {
        text: "Wrung out. You meant every word, and you also need the next day off from feelings.",
        lens: "avoidant",
      },
      {
        text: "Relieved, then unsure. You catch yourself checking that everything you said landed okay.",
        lens: "anxious",
      },
    ],
  },
  {
    prompt: "They forget something they promised: a call, an errand, a date on the calendar.",
    options: [
      {
        text: "The forgetting stings less than the story it whispers: that you're not on their mind.",
        lens: "anxious",
      },
      {
        text: "You're annoyed, you say so, and it stays exactly that size.",
        lens: "secure",
      },
      {
        text: "You note it and move on. You'd rather adjust your expectations than have a whole thing about it.",
        lens: "avoidant",
      },
    ],
  },
  {
    prompt: "Things between you have been good, really good, for a few weeks.",
    options: [
      {
        text: "You settle in and enjoy the calm. Ease is the whole point.",
        lens: "avoidant",
      },
      {
        text: "You love it, and you brace a little, like you're waiting for the other shoe.",
        lens: "anxious",
      },
      {
        text: "You say it out loud: “we've been good lately.” Naming it feels like keeping it.",
        lens: "secure",
      },
    ],
  },
  {
    prompt: "You're apart for a week. Different cities.",
    options: [
      {
        text: "You miss them at normal volume. A call most nights, and the reunion is sweet.",
        lens: "secure",
      },
      {
        text: "The week is easier than you'd admit out loud. You love them; you also travel well alone.",
        lens: "avoidant",
      },
      {
        text: "The distance is loud. Gaps between texts feel longer than the clock says they are.",
        lens: "anxious",
      },
    ],
  },
];

export type ConflictRole = "pursuer" | "withdrawer";

export type ConflictOption = { text: string; role: ConflictRole };

export type ConflictQuestion = { prompt: string; options: ConflictOption[] };

export const conflictQuestions: ConflictQuestion[] = [
  {
    prompt: "Mid-argument, your partner goes quiet. You...",
    options: [
      {
        text: "Keep going. Silence feels worse than yelling; you need something back before you can settle.",
        role: "pursuer",
      },
      {
        text: "Feel a little relief. Quiet sounds like the fight losing altitude.",
        role: "withdrawer",
      },
    ],
  },
  {
    prompt: "The fight didn't get finished and now it's 11 p.m.",
    options: [
      {
        text: "Sleep is the repair. Morning versions of you two are kinder and smarter.",
        role: "withdrawer",
      },
      {
        text: "You physically cannot sleep on it. Twenty more minutes now beats a bad night for both of you.",
        role: "pursuer",
      },
    ],
  },
  {
    prompt: "In the hottest moment of a fight, the thing your body wants most is...",
    options: [
      {
        text: "To be understood, right now, before anything else happens.",
        role: "pursuer",
      },
      {
        text: "To be somewhere quieter until the room cools down.",
        role: "withdrawer",
      },
    ],
  },
  {
    prompt: "Your partner says, “I can't do this right now, I need a break.”",
    options: [
      {
        text: "That sounds fair. You were probably minutes from asking for one yourself.",
        role: "withdrawer",
      },
      {
        text: "It lands like a door closing. Every part of you wants to follow them down the hall.",
        role: "pursuer",
      },
    ],
  },
  {
    prompt: "When you're the one who's hurt, you tend to...",
    options: [
      {
        text: "Say so, clearly, sometimes at a volume you regret later. At least it's on the table.",
        role: "pursuer",
      },
      {
        text: "Get quiet and hope they notice. Asking to be noticed feels like it shouldn't be necessary.",
        role: "withdrawer",
      },
    ],
  },
  {
    prompt: "The fight is over. Within the next hour, you want...",
    options: [
      {
        text: "Normal life together: TV, dinner, shoulder to shoulder. Talking about the fight can wait a day.",
        role: "withdrawer",
      },
      {
        text: "The full debrief: what happened, what it meant, how it won't happen again.",
        role: "pursuer",
      },
    ],
  },
];

export type LensResult = {
  id: LensId;
  title: string;
  summary: string;
  strengths: string[];
  watchFor: string[];
  forYourPartner: string;
  inMend: string[];
};

export const lensResults: LensResult[] = [
  {
    id: "secure",
    title: "You love with both feet on the floor",
    summary:
      "Closeness doesn't spook you and distance doesn't spiral you. When something's wrong you tend to say so, and when your partner says something's wrong, you can hear it without hearing “you're failing.” This isn't a personality prize; it's a set of habits, and plenty of people build them in adulthood after starting somewhere much shakier. It also doesn't mean you're always easy to be married to.",
    strengths: [
      "You can raise a problem without turning it into a referendum on the whole marriage.",
      "You take your partner's word for things instead of scanning between the lines for the real message.",
      "You recover from arguments without keeping a ledger.",
      "You're steady enough that other people borrow calm from you.",
    ],
    watchFor: [
      "Your calm can read as not taking it seriously. What feels like perspective to you can feel like distance to a rattled partner.",
      "You may under-react to your partner's alarm because it wouldn't alarm you. Their smoke detector is calibrated differently, and it's still real smoke to them.",
      "Steadiness can drift into autopilot. Secure is not the same thing as attentive.",
      "You can assume things are fine because nobody said otherwise. Some partners need to be asked.",
    ],
    forYourPartner:
      "Their evenness is real, not an act, and it doesn't mean they care less than you do. But don't let the steadiness convince you they need nothing: they do, and they may be bad at flagging it because they're used to being the calm one in the room. Ask them direct questions about themselves, thank them out loud for the stability instead of treating it like furniture, and when they say “I'm fine,” check once more, gently. Lighthouses need maintenance too.",
    inMend: [
      "Let your partner pick the turn length. Two minutes and five minutes feel very different depending on the lens you love through, and it costs you nothing to flex.",
      "Go second. Listening first and mirroring well sets the tone for the whole session more than anything you could say with the floor.",
      "Your steadiness makes room for the big decks: Go Deeper and Dreams are built for couples who can hold a heavy topic without dropping it.",
      "If your partner hits the pause button, hold the frame for both of you: twenty minutes, no chasing, warm return.",
    ],
  },
  {
    id: "anxious",
    title: "You love with the porch light on",
    summary:
      "You love the way someone keeps a porch light on: attentive, hopeful, always half listening for the car in the driveway. Connection isn't a nice-to-have for you; it's the ground you stand on, and when it wobbles, everything wobbles. That sensitivity gets called “too much,” but it's also radar: you tend to notice trouble in a marriage months before it becomes obvious. This style usually comes from somewhere real, and it softens with enough kept promises.",
    strengths: [
      "You notice. Small shifts in tone, mood, and distance rarely get past you.",
      "You fight for the relationship instead of letting it quietly starve.",
      "You go first on hard conversations that a more comfortable person would keep postponing.",
      "When you love someone, they know it. There is no guessing with you.",
    ],
    watchFor: [
      "Silence gets read as a verdict when it's usually just silence. Check the story before you believe it.",
      "Reassurance works for an hour; the longer fix is letting kept promises actually count as evidence.",
      "Protest moves (the pointed sigh, the cold shoulder meant to be noticed) ask for closeness in a way that pushes it away.",
      "Your alarm can go off so fast that your partner ends up managing your fear instead of hearing your point.",
    ],
    forYourPartner:
      "The most powerful thing you can give this person is reassurance early, before they have to ask for it. “I'm annoyed and we're fine” costs you one sentence and saves them an hour. If you need space, always attach a return time; silence with no end date is the one thing their nervous system cannot file as safe. And know that their questions (“are we okay?”) are not accusations. They're the porch light. Answer it, and it dims on its own.",
    inMend: [
      "Pick shorter turns, two or three minutes. More frequent swaps mean more moments of hearing “I've got you,” which is what your nervous system is listening for.",
      "If your partner takes the twenty-minute break, let it run. The pause screen exists precisely so a break never has to feel like an ending.",
      "On raw weeks, reach for the First Steps or Lighter decks. Closeness doesn't have to be earned through heavy conversations every time.",
      "In the mirroring step, repeat what your partner actually said, not what you were afraid they meant. Getting the words right is the reassurance.",
    ],
  },
  {
    id: "avoidant",
    title: "You love from one step back",
    summary:
      "You love from one step back: real, loyal, and expressed more in what you do than in what you announce. Closeness matters to you; what's hard is closeness on demand, especially when the room is loud. Needing air isn't coldness and it isn't a flaw. Somewhere along the line you learned that handling things yourself was the safest way to handle them. The work now is letting one particular person past the fence, a little at a time.",
    strengths: [
      "You're calm when it counts. A crisis doesn't get an extra crisis from you.",
      "You don't say things you don't mean, so the things you do say can be trusted.",
      "You give your partner genuine room to be their own person.",
      "You think before you speak, which means fewer words you have to take back.",
    ],
    watchFor: [
      "Your quiet can be read as a verdict when it's actually just processing. Say which one it is.",
      "Space without a return time feels like abandonment from the other side of the door.",
      "Waiting for a problem to blow over is a decision, even when it doesn't feel like one.",
      "Self-sufficiency can quietly become a wall that keeps out the person you married.",
    ],
    forYourPartner:
      "This person shows love in acts, presence, and reliability more than in announcements, so learn to read their dialect instead of only listening for yours. Pressure closes them; patience opens them. Hard conversations often go better side by side (driving, walking, doing dishes) than face to face across a table. When they go quiet, it's usually a full buffer, not a locked door: give them room with a gentle “come find me when you're ready,” and they usually do. And when they hand you something vulnerable, receive it softly. It cost more than it looked like.",
    inMend: [
      "The turn timer is on your side: every turn has a visible end, and nobody can make you hold the floor longer than you agreed to.",
      "Use the pause button early, before you're fully shut down, and be back when the twenty minutes are up. The coming back is what builds the trust.",
      "Start with the First Steps or Lighter decks. Low-stakes reps are what make the heavier decks possible later.",
      "Short answers count. Two honest sentences on your turn beat five performed minutes, and passing a card is always allowed.",
    ],
  },
];

export type ConflictResult = {
  id: ConflictRole;
  title: string;
  summary: string;
  inFights: string;
  softening: string[];
};

export const conflictResults: ConflictResult[] = [
  {
    id: "pursuer",
    title: "You move toward the fire",
    summary:
      "When something is wrong between you, standing still is unbearable. You raise it, chase it, press on it, because an unresolved fight feels like a door left open in winter. Underneath the pushing there is almost always a question, and the question is usually “are we okay?” Pursuit is love with the volume turned up. It just doesn't always land that way.",
    inFights:
      "You escalate to reach, not to wound: more words, more volume, more examples, following your partner from room to room if that's what it takes to get a response. The maddening part of the loop is that pushing harder usually gets you less, because the person you're chasing shuts down further the closer you get. What reads to you as refusal is often overload.",
    softening: [
      "Lead with the hurt, not the case for the prosecution. “That scared me” reaches further than a list of exhibits.",
      "When they ask for a break, grant it and get a return time. You're not losing the argument; you're scheduling the rest of it.",
      "One point at a time. The tenth example doesn't add force, it adds noise.",
      "Say the question under the pushing out loud: “I'm coming on strong because I'm scared about us.” It changes the whole fight.",
    ],
  },
  {
    id: "withdrawer",
    title: "You go quiet to hold the line",
    summary:
      "When a fight heats up, something in you steps back from the flame: fewer words, flatter voice, a strong pull toward another room. It isn't indifference. Usually it's overload, or the conviction that anything you say right now will make things worse. Retreat is your way of protecting the marriage from the fight. The trouble is that from the outside, it can look exactly like leaving.",
    inFights:
      "You get quiet, short, reasonable-sounding, and far away. You might physically leave, or just go somewhere behind your own eyes. Your partner often hears that silence as “you don't matter,” which is usually the precise opposite of what's happening inside you. And the loop feeds itself: the less you say, the louder they get, and the louder they get, the less you can say.",
    softening: [
      "Narrate the shutdown: “I'm going quiet because I'm overwhelmed, not because I don't care.” One sentence, enormous difference.",
      "Never take space without a return time, and keep it. The kept return is what teaches your partner that a pause is safe.",
      "Come back on your own, before you're fetched. A break you end yourself counts double.",
      "In the quiet, send one small signal that you're still in it: a hand on their arm, a “still us.” Silence with a signal is a pause; silence without one is a wall.",
    ],
  },
];

export const quizDisclaimer: string =
  "These results are a lens, not a label. Most people are a mix that shifts with stress, seasons, and even which argument they're in, and every style here can grow more secure over time. This is an educational starting point for understanding each other, not a diagnosis of anything.";

export function getLensResult(id: LensId): LensResult | undefined {
  return lensResults.find((r) => r.id === id);
}

export function getConflictResult(id: ConflictRole): ConflictResult | undefined {
  return conflictResults.find((r) => r.id === id);
}
