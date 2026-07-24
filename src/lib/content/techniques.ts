/**
 * The communication toolkit: evidence-informed techniques from established
 * frameworks (Gottman Method, PREP's speaker-listener technique, Nonviolent
 * Communication, attachment theory). Each entry credits its source; nothing
 * here is invented.
 */

export type Technique = {
  id: string;
  title: string;
  tagline: string;
  whenToUse: string;
  steps: string[];
  example: { instead?: string; try: string };
  watchOut: string;
  source: string;
};

export const techniques: Technique[] = [
  {
    id: "soft-startup",
    title: "The soft startup",
    tagline: "How a conversation begins is usually how it ends.",
    whenToUse:
      "Any time you're raising something hard. Discussions that start with an attack almost always end badly, no matter how much repair happens in the middle.",
    steps: [
      "Start with “I”, not “you”: complain about the situation, don't attack the person.",
      "Describe what's happening without judging it (“the dishes are still in the sink”, not “you're lazy”).",
      "Say what you feel, then what you need: a positive need, not a criticism in disguise.",
      "Be polite and appreciative even mid-complaint. Courtesy isn't weakness; it's aim.",
    ],
    example: {
      instead: "“You never help around here. You don't care how much I do.”",
      try: "“I'm exhausted and feeling alone with the housework. Could we split up the evening chores tonight?”",
    },
    watchOut:
      "A soft startup isn't burying the issue in politeness. Say the hard thing. Just aim at the problem, not your partner's character.",
    source: "Gottman Method",
  },
  {
    id: "four-horsemen",
    title: "The Four Horsemen (and their antidotes)",
    tagline: "The four patterns that predict divorce, and what replaces each.",
    whenToUse:
      "As a shared vocabulary. Once you can both name a horseman in the room (“that was contempt, sorry”), it starts losing its power.",
    steps: [
      "Criticism: attacking character (“you always…”, “you're the kind of person who…”). Antidote: soft startup. Complain about the situation, ask for what you need.",
      "Contempt: eye-rolls, mockery, sarcasm, superiority. The single strongest divorce predictor. Antidote: build a culture of appreciation; describe your own feelings and needs instead of your partner's flaws.",
      "Defensiveness: counterattacking or playing the victim instead of hearing the complaint. Antidote: find the 2% that's true and own it (“you're right, I did shut down last night”).",
      "Stonewalling: going blank, leaving, silence as a wall. Usually a sign of physiological flooding. Antidote: a structured break (see Flooding), then coming back, always coming back.",
    ],
    example: {
      instead: "“Oh, *you're* tired? That must be so hard for you.” (contempt)",
      try: "“I'm feeling unappreciated and snarky, and I don't want to be. Let me start over.”",
    },
    watchOut:
      "Everyone rides all four horsemen sometimes. The danger is when one becomes the default channel, especially contempt.",
    source: "Gottman Method",
  },
  {
    id: "speaker-listener",
    title: "The speaker-listener technique",
    tagline: "One person holds the floor. The other proves they heard.",
    whenToUse:
      "Hot topics: the ones that spiral in under a minute. It feels artificial, like training wheels. That's the point: it makes escalation mechanically difficult.",
    steps: [
      "The speaker holds the floor. Speak for yourself (“I feel…”, “I need…”), in short chunks, no mind-reading the other person.",
      "The listener only listens: no rebuttals, no fixing, no “but”. Their whole job is to understand.",
      "The listener paraphrases: “What I'm hearing is…” The speaker confirms or gently corrects until it's right.",
      "Swap. The floor passes, roles reverse, same rules.",
    ],
    example: {
      try: "“What I'm hearing is that when I'm on my phone at dinner you feel like you're eating alone, even though I'm right there. Did I get that?”",
    },
    watchOut:
      "Paraphrasing is not agreeing. You can repeat your partner's reality perfectly and still hold your own. Both realities get to exist.",
    source: "PREP (Markman, Stanley & Blumberg)",
  },
  {
    id: "nvc",
    title: "The four-part ask",
    tagline: "Observation → feeling → need → request.",
    whenToUse:
      "When you know something's wrong but every way you phrase it comes out as an accusation. This structure separates what happened from your story about it.",
    steps: [
      "Observation: state what a camera would have seen. No adjectives, no “always/never”.",
      "Feeling: name the emotion, yours, in your body. (“I felt dismissed” is a judgment; “I felt hurt and small” is a feeling.)",
      "Need: the universal thing underneath, to feel valued, safe, chosen, supported.",
      "Request: one concrete, doable, positive action. A request your partner can decline is a request; one they can't is a demand.",
    ],
    example: {
      instead: "“You ignored me all night at the party, as usual.”",
      try: "“At the party we talked to separate groups the whole night. I felt lonely. I need to feel like we're together in a room. Next time, could we check in with each other once an hour?”",
    },
    watchOut:
      "Don't weaponize the format (“I observe that you're being selfish…”). If the 'observation' has a verdict in it, start over.",
    source: "Nonviolent Communication (Marshall Rosenberg)",
  },
  {
    id: "repair-attempts",
    title: "Repair attempts",
    tagline: "The difference between couples who make it isn't fewer fights. It's catching the rope when it's thrown.",
    whenToUse:
      "Mid-argument. A repair attempt is anything (a joke, a touch, “can we start over?”, “I'm on your side”) that tries to brake the escalation.",
    steps: [
      "Learn your partner's repair style. Some people crack a joke; some reach for your hand; some go formal (“timeout?”). Their weird bid counts.",
      "When a repair comes, take it, even mid-anger, even if the point isn't settled. Accepting a repair isn't conceding the argument.",
      "Build a shared phrase in peacetime (“same team”) that either of you can deploy in wartime.",
      "If your repair gets missed, say it plainly: “That was me trying to make peace. Can we take it?”",
    ],
    example: {
      try: "“Wait. Hi. I love you. I hate this fight. Can we try that again slower?”",
    },
    watchOut:
      "In flooded or contemptuous fights, repairs get missed entirely. If repairs keep bouncing off, the problem isn't the repairs. Take the break instead.",
    source: "Gottman Method",
  },
  {
    id: "flooding",
    title: "Flooding and the 20-minute reset",
    tagline: "Past a certain heart rate, no one is listening. Not won't, can't.",
    whenToUse:
      "When either of you feels the surge: heat, racing heart, tunnel vision, the urge to flee or detonate. Continuing from here only produces damage; nothing said flooded lands as intended.",
    steps: [
      "Call it with your agreed signal: “I'm flooded, I need 20 minutes. I'm not leaving this, I'm coming back.” Both halves are mandatory.",
      "Separate. No trailing last words through the door.",
      "Actually self-soothe: walk, breathe, shower, music. Do NOT spend the break rehearsing your comeback. That keeps you flooded.",
      "Return when you said you would. The return is what teaches your partner's nervous system that a break isn't abandonment.",
    ],
    example: {
      try: "“I want to get this right and I can't right now. I'm too hot. Give me 20 minutes and let's finish it.”",
    },
    watchOut:
      "A break without a promised return is just stonewalling with a schedule. Twenty minutes to a few hours; never 'we just don't talk about it again'.",
    source: "Gottman Method",
  },
  {
    id: "validation",
    title: "Validation without agreement",
    tagline: "“That makes sense” is not “you're right.”",
    whenToUse:
      "Whenever your partner shares a feeling, especially one that casts you badly. The instinct is to litigate the facts. Validate the feeling first; facts can wait.",
    steps: [
      "Find the internal logic: given what they felt and noticed, their reaction makes some sense. Find that thread.",
      "Say it: “It makes sense you felt dropped. You were solo with the kids and I went quiet all day.”",
      "Resist the 'but'. “That makes sense, BUT…” deletes everything before it. Let validation land alone; your side gets the next turn.",
      "Remember both realities are true. Yours doesn't need theirs to be false.",
    ],
    example: {
      instead: "“I did NOT ignore you, I texted you at lunch!”",
      try: "“You were drowning and I felt a million miles away. That makes sense. It wasn't what I meant to give you, and I get why it felt that way.”",
    },
    watchOut:
      "Validation delivered like a customer-service script (“I hear that you feel that way”) reads as contempt. Mean it or ask for a minute until you can.",
    source: "Core skill in EFT / Gottman / DBT",
  },
  {
    id: "attachment",
    title: "Reading each other's attachment style",
    tagline: "The pursuer and the withdrawer are usually scared of the same thing.",
    whenToUse:
      "When your fights have a shape: one chases, one retreats, and the chase makes the retreat worse and vice versa. That loop, not either person, is the enemy.",
    steps: [
      "Anxious-leaning partners hear silence as abandonment. Under the pursuit (texts, protests, escalation) is “are you still there?” Reassurance early is oxygen: “I'm upset AND I'm not going anywhere.”",
      "Avoidant-leaning partners hear intensity as engulfment or accusation. Under the shutdown is “I'm failing you and I don't know how to fix it.” Space with a return time is oxygen. Pursuit without one is suffocation.",
      "Name the loop together, in peacetime: “I chase, you retreat, I chase harder.” The loop becomes a shared enemy you can spot mid-fight.",
      "Trade one accommodation each: the pursuer grants the break; the withdrawer initiates the return. Every kept return builds security.",
    ],
    example: {
      try: "“We're doing the loop. I'm going to stop pushing. Can you promise me a time we'll come back to it?”",
    },
    watchOut:
      "Styles are lenses, not diagnoses or excuses (“sorry, I'm avoidant” isn't an exemption). Most people are a mix, and security is learnable. That's the whole premise here.",
    source: "Attachment theory / Emotionally Focused Therapy (Sue Johnson)",
  },
  {
    id: "bids",
    title: "Bids for connection",
    tagline: "Relationships are built in small moments, not grand gestures.",
    whenToUse:
      "Daily. A bid is any small reach: “look at this”, a sigh, a hand on the shoulder, showing you a meme. Couples who last habitually turn *toward* these; couples who don't, turn away.",
    steps: [
      "Learn to see bids. Half of them are disguised as trivia: the meme, “how was your day”, the wander into your room for no reason.",
      "Turn toward: even ten seconds of real attention counts. Presence beats duration.",
      "When you must decline, decline warmly with a return: “I want to hear this. Give me ten minutes to finish?”",
      "Make bids easier to make. If your partner's bids have gone quiet, they may have stopped risking them. Rejection-proof the small stuff.",
    ],
    example: {
      instead: "(silence, eyes on phone)",
      try: "“Wait, show me again. I was half looking.”",
    },
    watchOut:
      "Turning away rarely feels hostile in the moment. It feels busy. The damage is cumulative and invisible until it isn't.",
    source: "Gottman Method",
  },
];

export function getTechnique(id: string): Technique | undefined {
  return techniques.find((t) => t.id === id);
}
