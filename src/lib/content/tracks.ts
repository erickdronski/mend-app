/**
 * Healing tracks: guided multi-session paths for marriages carrying a specific
 * wound. Grounded in clinical frameworks (Gottman's atone→attune→attach for
 * affair recovery, grief-styles research from Doka & Martin, EFT), written
 * plainly. Every track signposts professional help and names the red flags
 * where an app is no longer the right tool.
 */
import { extraTracks } from "./tracks-extra";

export type TrackSession = {
  title: string;
  focus: string;
  prompts: string[];
};

export type Track = {
  slug: string;
  title: string;
  subtitle: string;
  overview: string;
  feelings: { label: string; body: string }[];
  principles: string[];
  sessions: TrackSession[];
  planSeeds: string[];
  seekHelp: string[];
};

export const tracks: Track[] = [
  {
    slug: "affair",
    title: "After an affair",
    subtitle: "Rebuilding trust after infidelity",
    overview:
      "An affair is a trauma to the betrayed partner and, usually, a moral earthquake for the one who strayed. Marriages do survive this, but only through a specific order of operations: first full honesty and remorse, then understanding, and only then rebuilding. Skipping to 'let's move on' guarantees the wound reopens. This track follows the atone → attune → attach arc used in affair-recovery therapy.",
    feelings: [
      {
        label: "If you were betrayed",
        body: "Expect trauma symptoms, not just anger: intrusive images, obsessive timeline-checking, waves that arrive out of nowhere, feeling crazy for still loving them. None of that is weakness. Your questions are legitimate; your timeline is yours; 'getting over it' is not a deadline anyone else gets to set.",
      },
      {
        label: "If you strayed",
        body: "Your job is the heaviest one: staying present to pain you caused without collapsing into defensiveness ('it was only…'), blame ('you were never available'), or impatience ('how many times do I have to apologize?'). The answer to that last one is: as many times as it takes, and each time like the first. Rebuilding is measured in years of kept promises, not one grand apology.",
      },
    ],
    principles: [
      "The affair was a choice made by one person. Whatever was wrong in the marriage before it (and something usually was) gets examined later, as context, never as justification.",
      "Full no-contact with the affair partner, verified and permanent. Trust cannot rebuild around an open channel.",
      "Honesty going forward is absolute. Each new discovered lie, even a small, kind one, resets the clock to zero.",
      "Questions get answered. One nuance: many couples in recovery find that graphic sexual detail deepens the trauma without adding truth. Answering 'what/when/where/how long' fully while pausing before the most explicit details is a decision to make together, possibly with a therapist.",
      "Transparency is offered, not extracted: open phone, open schedule, proactive check-ins. It works when it's a gift from the one who strayed, not surveillance won by the betrayed.",
      "Healing is not linear. A good month followed by a terrible trigger day is the normal shape of this, not evidence of failure.",
    ],
    sessions: [
      {
        title: "The impact",
        focus: "The betrayed partner holds the floor. The only job of the partner who strayed is to listen, mirror, and stay: no context, no corrections, no 'but'.",
        prompts: [
          "What has this done to me (my sleep, my body, my sense of who I am)?",
          "What moment hurts the most when my mind returns to it?",
          "What did I believe about us that I don't know how to believe now?",
          "What do I need you to understand that I haven't been able to say calmly?",
        ],
      },
      {
        title: "Remorse, out loud",
        focus: "The partner who strayed holds the floor, not to explain the affair, but to demonstrate they grasp the damage. Explanations sound like excuses this early; understanding doesn't.",
        prompts: [
          "What I understand I've broken, specifically, not generically.",
          "What I imagine it's like to be you right now, waking up with this.",
          "What I am doing, concretely, to be safe to love again.",
          "What I'm ashamed of, said plainly, without asking you to comfort me for it.",
        ],
      },
      {
        title: "The conditions, not the excuse",
        focus: "Later, only when the betrayed partner says the atonement phase has genuinely landed. Examining the marriage the affair happened in. This is context-gathering as teammates, and it is never blame-shifting.",
        prompts: [
          "When did each of us start feeling far from the other, long before the affair?",
          "What needs went unspoken, and why didn't they feel speakable?",
          "What did each of us do with loneliness inside the marriage?",
          "What has to be different this time, not to excuse anything, so that 'us' is a different place to live?",
        ],
      },
      {
        title: "Triggers and setbacks",
        focus: "Building the trigger protocol: what the betrayed partner needs in the moment a wave hits, and what the other partner can actually do instead of despairing that 'we're back to square one'.",
        prompts: [
          "What sets me off that you might not predict (songs, places, a glance at your phone)?",
          "In the middle of a wave, what helps: holding, space, answers, reassurance? What makes it worse?",
          "How should I tell you a trigger is happening, so it doesn't have to come out as an attack?",
          "How will we mark that a wave passed and we're still here?",
        ],
      },
      {
        title: "A different marriage",
        focus: "The attach phase: deciding what the two of you are building: not the old marriage restored, a new one with the lights on.",
        prompts: [
          "What do I want us to protect ferociously this time?",
          "What early-warning signal should either of us be able to raise, and how will we receive it?",
          "What has this year taught each of us about ourselves that we're keeping?",
          "What would forgiveness look like for us (not forgetting, forgiveness)?",
        ],
      },
    ],
    planSeeds: [
      "Daily 10-minute check-in: presence, not interrogation",
      "Proactive transparency: share the plan for the day before being asked",
      "Weekly State of the Union with the trigger protocol on the agenda",
      "One rebuilt ritual from the early days, chosen together",
    ],
    seekHelp: [
      "Contact with the affair partner is continuing or ambiguous. No tool helps around an open channel.",
      "Trauma symptoms (intrusive thoughts, panic, sleeplessness) aren't easing after months, or are getting worse. Individual trauma therapy helps.",
      "Rage is tipping into threats, retaliation, or self-harm on either side.",
      "You keep having the same disclosure fight. A couples therapist experienced in affair recovery can referee the details question far better than an app.",
    ],
  },
  {
    slug: "pregnancy-loss",
    title: "Miscarriage & infant loss",
    subtitle: "Grieving the same loss in different bodies",
    overview:
      "Losing a pregnancy or an infant is a grief the world barely acknowledges and couples rarely survive unchanged. The central danger isn't the sadness. It's the *difference* in how you each carry it, misread as a difference in how much you loved. One of you may need to talk and mark and remember; the other may need to work and fix and move. Both are grief. This track exists so the difference stops looking like betrayal.",
    feelings: [
      {
        label: "The partner who carried",
        body: "Grief may be tangled with a body that feels like the scene of the loss: hormones, physical recovery, sometimes a guilt that logic can't touch ('what did I do?'). The answer is almost always nothing, and the guilt comes anyway. Anniversaries, due dates, and other people's announcements can flatten you without warning, and that can continue far longer than anyone around you expects.",
      },
      {
        label: "The partner who didn't carry",
        body: "Your grief is real and routinely erased: everyone asks how your partner is doing. Many partners in your seat default to being 'the strong one', quietly postponing their own grief until it surfaces as distance, irritability, or overwork. Holding your partner does not require disappearing. The loss was yours too.",
      },
    ],
    principles: [
      "There are (at least) two griefs in the house, and they will not match. Intuitive grievers feel and express; instrumental grievers think and do. Neither is shallow; neither is broken.",
      "Different timelines are normal. One of you 'doing better' while the other is drowning is not evidence of not caring, but it needs saying out loud, or it will be read that way.",
      "Guilt attaches to whoever will host it. It is almost never earned. Say the guilt out loud so it can be answered instead of fed.",
      "The loss is allowed to be spoken. Many couples go silent to protect each other and each reads the silence as forgetting. Agree on how (not whether) to remember.",
      "Intimacy after loss is complicated: bodies that grieve, fear of trying again, fear of *not* trying again. Gentleness and honesty over schedules.",
    ],
    sessions: [
      {
        title: "Telling our story",
        focus: "Each partner tells the whole story from their side: the hoping, the moment, the after. Not to align the versions; to finally hear them.",
        prompts: [
          "Where does the story start for you? When did this baby become real?",
          "What is the moment you keep returning to?",
          "What did you do with the days right after, and what was happening underneath?",
          "What part of your story do you think I've never fully heard?",
        ],
      },
      {
        title: "How we each grieve",
        focus: "Naming your two grief styles side by side, so difference stops reading as indifference.",
        prompts: [
          "What does the grief actually look like for you day to day (thoughts, body, habits)?",
          "What have I done with my grief that confused or hurt you?",
          "When you saw me 'doing fine', what was I actually doing?",
          "What does support look like for your style (talking, doing, sitting quietly, being left alone and then found again)?",
        ],
      },
      {
        title: "Guilt and the words unsaid",
        focus: "The conversation most couples avoid: the private guilts and the resentments neither wants to admit exist.",
        prompts: [
          "What do I blame myself for, even knowing better?",
          "Is there anything I've been afraid you blame me for? Ask it.",
          "What's the sentence I've never said out loud about this?",
          "What do you need to hear from me, even if you know I don't blame you?",
        ],
      },
      {
        title: "Marking and remembering",
        focus: "Deciding together how this child stays part of your story: names, dates, rituals, and what to tell people.",
        prompts: [
          "Do you want to use a name? What happens in you when we do?",
          "What should we do on the due date / anniversary, together, deliberately?",
          "How do we want to answer 'how many kids do you have?' And it's okay if our answers differ.",
          "What would it look like to remember without it ambushing us?",
        ],
      },
      {
        title: "When we're ready",
        focus: "The future conversation (trying again, or not), held gently and revisited as many times as needed. No decisions required tonight.",
        prompts: [
          "What does the idea of trying again bring up first: hope, terror, both?",
          "What would we each need to feel ready, and what if those needs differ?",
          "How will we hold each other through the fear next time (the milestones, the appointments)?",
          "If our paths forward look different right now, how do we stay on the same team while we wait?",
        ],
      },
    ],
    planSeeds: [
      "A weekly 'remembering walk': grief gets a scheduled place so it doesn't have to ambush",
      "A signal word for 'a wave just hit me' that requests presence, not solutions",
      "Mark the calendar dates together, in advance, with a plan",
      "One small act of care for the other's grief style each week: a talk for the feeler, a task taken for the doer",
    ],
    seekHelp: [
      "Either partner can't function (work, eating, sleep) months out, or is numb and disconnected from everything, not just this.",
      "Any thoughts of self-harm or not wanting to be here: call or text 988 now, not later.",
      "The pregnancy loss has frozen all intimacy or all communication and the thaw isn't coming. Grief counselors and support groups (many free, e.g. hospital bereavement programs) specifically know this terrain.",
      "Postpartum depression or anxiety symptoms in the partner who carried. This is medical, common, and very treatable.",
    ],
  },
  {
    slug: "grief",
    title: "Death of a loved one",
    subtitle: "When grief moves into the marriage",
    overview:
      "A death in the family (a parent, a sibling, a child, a best friend) reorganizes the griever from the inside. The marriage suddenly contains a person in a country the other can't fully visit. Grieving partners commonly withdraw, rage at safe targets (guess who's safest), or disappear into logistics. This track helps the two of you keep a rope tied between you while one of you walks through it.",
    feelings: [
      {
        label: "If you're the one grieving",
        body: "You may have less to give the marriage right now (patience, desire, attention) and feel guilty about it. Grief also has a long tail: the world expects you 'back' in weeks, while the real timeline runs in seasons. Your partner cannot read which days are heavy. The kindest skill you can learn is saying 'today is a bad one' out loud.",
      },
      {
        label: "If you're the partner",
        body: "You can't fix this, and trying to can register as rushing them. Your job is presence and logistics, not repair. It's also real that being married to grief is lonely. You're allowed to have needs during their loss; the skill is timing and gentleness, not silence.",
      },
    ],
    principles: [
      "Grief isn't linear and doesn't finish on schedule. Waves years later are normal, especially at markers: birthdays, holidays, the anniversary.",
      "Presence beats fixing. 'I'm here' outperforms every piece of advice ever given to a griever.",
      "The griever sets the pace on talking about the person who died, but total silence usually means fear, not peace. Keep the door visibly open.",
      "The non-grieving partner needs support too, and shouldn't draw it all from the griever. Friends, family, their own outlets.",
      "Watch for grief becoming the third person in the marriage no one mentions. Speak about it, together, on purpose.",
    ],
    sessions: [
      {
        title: "Who they were",
        focus: "The griever holds the floor and talks about the person (not the death, the person). Being witnessed in love is the oldest grief medicine there is.",
        prompts: [
          "What do I most want you to know about who they were to me?",
          "What's a story about them I've never told you?",
          "What did they give me that I'm afraid of losing now that they're gone?",
          "What of them do I want us to carry into our family's life?",
        ],
      },
      {
        title: "The shape of my grief",
        focus: "Making the invisible weather visible: when it hits, what it does, what helps.",
        prompts: [
          "When is it worst (mornings, driving, certain songs, Sundays)?",
          "What does a bad day actually feel like from the inside?",
          "What do you do that helps more than you know? What lands wrong even with love behind it?",
          "What do I need from you on the days I can't ask?",
        ],
      },
      {
        title: "Us, during this",
        focus: "The partner gets the floor too: what it's like to live beside this grief, said with care, and heard without guilt if possible.",
        prompts: [
          "What have these months been like from my side of the bed?",
          "Where have I not known what to do, and what did I do instead?",
          "What do I miss about us that I've felt unable to mention?",
          "What's one way we could be close this week that doesn't ask the griever to be 'better'?",
        ],
      },
      {
        title: "Remembering forward",
        focus: "Building the rituals: how this person stays present in your shared life, and how the marker dates get met on purpose instead of by ambush.",
        prompts: [
          "How do we want to mark the anniversary, every year, deliberately?",
          "What tradition of theirs should our family adopt?",
          "What do we tell the kids (now or someday) about them?",
          "What would they have wanted for us, and are we willing to let that instruct us?",
        ],
      },
    ],
    planSeeds: [
      "A standing 'heavy day' signal that requests presence without conversation",
      "Plan marker dates (birthday, anniversary) two weeks ahead, together",
      "One evening a month deliberately about the person: photos, stories, their food",
      "The partner builds one support outlet that isn't the griever",
    ],
    seekHelp: [
      "Grief that a year+ on still blocks basic functioning, or numbness that never breaks. Prolonged grief responds well to specialized therapy.",
      "Any talk of joining them, hopelessness, or self-harm: 988, immediately.",
      "Heavy self-medication (drinking, pills) as the primary coping channel.",
      "If the loss was a child you share: couples grief counseling early, even 'preventively'. That specific loss strains even strong marriages beyond what any app should be trusted with.",
    ],
  },
  {
    slug: "illness",
    title: "Serious illness",
    subtitle: "Staying partners when you've become patient and caregiver",
    overview:
      "A serious diagnosis quietly rewrites the job descriptions of a marriage. One of you becomes a patient (body, identity, and future suddenly negotiable) and one becomes a caregiver, a role nobody applied for. The marriage's task is to keep a third thing alive underneath those roles: the two of you. This track is for saying the unsayable things illness brings, and for protecting the marriage from becoming only a care arrangement.",
    feelings: [
      {
        label: "If you're the one who's ill",
        body: "Alongside fear, expect grief for your old body and old plans, guilt about 'being a burden' (your illness is not a debt), and sometimes resentment of your own partner's health. Wanting to be treated as a spouse and not a project is legitimate. Say it before the distance does.",
      },
      {
        label: "If you're the caregiver",
        body: "Caregiver strain is real, cumulative, and mostly invisible: exhaustion, fear you're not allowed to voice ('they have it worse'), lost identity, and guilt about your own resentment. Your needs did not become illegitimate because your partner got sick. An exhausted caregiver eventually helps no one; your maintenance is part of the treatment plan.",
      },
    ],
    principles: [
      "You're allowed to talk about the hard outcomes. Couples often protect each other into total silence: each carrying the fear alone, together. Speaking it usually shrinks it.",
      "Patient and caregiver are roles, not identities. Schedule time where the illness is not the topic and care is not the activity: spouse time, not shift work.",
      "The ill partner keeps agency: choices, information, and jobs within the family that are theirs. Being cared for shouldn't mean being managed.",
      "The caregiver gets real relief (outside help, family shifts, respite) and takes it without guilt. This is logistics, not loyalty.",
      "Medical uncertainty is its own trauma. You can't fix not-knowing for each other, but you can refuse to wait alone.",
    ],
    sessions: [
      {
        title: "What the diagnosis did to each of us",
        focus: "The moment everything changed, from both sides, including what each of you has been protecting the other from.",
        prompts: [
          "Where were you, inside, when we got the news? What's happened since that I haven't seen?",
          "What's the fear you've been keeping from me to protect me?",
          "What has this done to how you see the future, ours?",
          "What do you need to hear from me about staying?",
        ],
      },
      {
        title: "The roles we've fallen into",
        focus: "Naming the patient/caregiver drift and negotiating it deliberately instead of letting it calcify.",
        prompts: [
          "When do I feel like your spouse right now, and when do I feel like your patient/nurse?",
          "What care do you actually want from me, and what would you rather I let go, delegate, or let you keep doing yourself?",
          "What did you used to count on me for that illness has interrupted, and what could I still carry?",
          "What's one part of our week we can quarantine from the illness entirely?",
        ],
      },
      {
        title: "The caregiver's floor",
        focus: "The caregiving partner speaks fully (the exhaustion, the fear, the resentment and the guilt about the resentment) and it gets heard as love, because it is.",
        prompts: [
          "What is the heaviest part that no one, including you, ever asks me about?",
          "What have I stopped doing for myself, and what is that costing us?",
          "What resentment am I most ashamed of? (Saying it is how it shrinks.)",
          "What relief would actually help, and will we spend the money/ask the family/accept the help?",
        ],
      },
      {
        title: "Fear, hope, and the plan",
        focus: "The forward conversation: what you're hoping for, what you're afraid of, and what you've decided together, including, if relevant, the conversations about wishes that love owes itself.",
        prompts: [
          "What are we each actually hoping for, said precisely?",
          "What decision are we avoiding that would bring peace once made?",
          "If things got harder, what matters most to you, and do I know your wishes as well as I should?",
          "What has this season taught us about us that we wouldn't give back?",
        ],
      },
    ],
    planSeeds: [
      "A weekly illness-free date: the topic is banned, the couple is the point",
      "Caregiver respite scheduled like medicine: recurring, non-negotiable",
      "A shared 'appointment debrief' ritual so medical news is processed together, once, not leaked in fragments",
      "One role or task returned to the ill partner that restores agency",
    ],
    seekHelp: [
      "Caregiver burnout signs (rage, numbness, health collapsing, drinking) need real support: respite care, caregiver groups, individual therapy.",
      "Depression in either partner beyond situational sadness (hopelessness, withdrawal from everything). Common alongside illness and very treatable.",
      "Conversations about prognosis or end-of-life wishes that keep detonating. Palliative-care teams and hospital social workers are professionals at exactly this and are usually free to ask for.",
      "Any thoughts of self-harm or 'being a burden' ideation: 988 now.",
    ],
  },
  {
    slug: "money-crisis",
    title: "Job loss & financial crisis",
    subtitle: "Staying a team when the ground gives out",
    overview:
      "Financial crisis attacks a marriage at two levels at once: the practical (bills, housing, debt) and the invisible (shame, identity, blame, fear from each partner's oldest money wounds). Couples usually fight about the second level while pretending it's the first. This track separates them (feelings first, spreadsheet second) because no budget survives two flooded nervous systems.",
    feelings: [
      {
        label: "If you lost the job / took the hit",
        body: "For many people a job loss lands as an identity loss: provider, competent one, the person with a plan. Shame makes people hide: sleeping late, avoiding the topic, snapping at whoever looks at the bank balance. None of it means you're failing your family; hiding is the only move that actually would.",
      },
      {
        label: "If you're the other partner",
        body: "You're likely holding fear you don't want to add to their shame, doing math at 2am, and swallowing an anger that feels forbidden ('it's not their fault, so why am I furious?'). Fear dressed as anger is still fear. It needs a floor and a timer like everything else, or it comes out sideways as criticism.",
      },
    ],
    principles: [
      "The problem is the situation, never the spouse. Us-versus-the-problem is the whole game; every blame exchange is a day added to the crisis.",
      "Shame hides; teams disclose. Full visibility on the numbers: both partners, same spreadsheet, no protective secrets. Financial infidelity (hidden debt, hidden spending) wounds like the other kind.",
      "Feelings meeting ≠ numbers meeting. Hold them separately. The feelings meeting has a timer and validation rules; the numbers meeting has an agenda and ends with decisions.",
      "Both partners' money histories are in the room. The panic and the avoidance were both learned somewhere. Name the childhood, defuse the fight.",
      "Crisis math is temporary; contempt is not. Protect the daily kindnesses hardest exactly when money is shortest.",
    ],
    sessions: [
      {
        title: "What this has actually been like",
        focus: "Feelings only: the shame, the fear, the 2am math. The spreadsheet is banned from this session.",
        prompts: [
          "What has this done to how I feel about myself (not our accounts, myself)?",
          "What am I most afraid happens next? Said fully, worst case out loud.",
          "What am I ashamed of in how I've handled this so far?",
          "What do I need from you that costs nothing?",
        ],
      },
      {
        title: "Where money panic comes from",
        focus: "Each partner's money history gets the floor: what scarcity or comfort taught them, and how it's steering the present.",
        prompts: [
          "What did money mean in my house growing up, and what happened when it ran out?",
          "Who did I watch handle (or mishandle) a money crisis, and what did I swear about it?",
          "When you see me panic / go quiet / spend / hoard, what old story is running?",
          "What would 'we're safe' require, at minimum, for me to sleep?",
        ],
      },
      {
        title: "The team meeting",
        focus: "Now the numbers, as staff of the same firm. Full disclosure, triage, and the plan. Short, scheduled, recurring; this meeting works because the feelings already had theirs.",
        prompts: [
          "Everything on the table: what do we owe, own, earn, and burn?",
          "What gets cut first, and what do we protect as long as possible, and why?",
          "Who's doing what this week (applications, calls, sales, side income)?",
          "What's the check-in rhythm so neither of us carries this alone between meetings?",
        ],
      },
      {
        title: "Marriage on a budget",
        focus: "Protecting the relationship itself through the lean season, because couples who only survive logistically arrive at recovery estranged.",
        prompts: [
          "What's a zero-dollar version of what we used to love doing?",
          "How do we mark small wins so this doesn't feel like one long loss?",
          "What kindness have you been rationing that we can't actually afford to cut?",
          "When this is over, what do we want to say this season proved about us?",
        ],
      },
    ],
    planSeeds: [
      "Weekly 30-minute money meeting: agenda'd, timered, ends with decisions and a kindness",
      "A zero-dollar date every week, guarded like a mortgage payment",
      "Daily 'we're a team' touchpoint: one appreciation, no logistics",
      "One shame-check: each partner names one thing they'd otherwise hide",
    ],
    seekHelp: [
      "Depression setting in with a job loss (sleeping all day, hopelessness, withdrawal). Common and treatable; individual support helps the whole house.",
      "Any hidden debt or spending still being concealed after committing to disclosure. That's a couples-therapy conversation before it becomes a second crisis.",
      "Nonprofit credit counseling (e.g. NFCC-affiliated agencies) for the practical side: real counselors, free or low-cost, no shame in it.",
      "Conflict escalating past words as pressure mounts: see the safety page now.",
    ],
  },
  {
    slug: "new-baby",
    title: "After the baby",
    subtitle: "Finding the couple inside the new family",
    overview:
      "The first years after a baby are, statistically and anecdotally, one of the hardest seasons any marriage faces: no sleep, no time, a resentment ledger nobody admits keeping, touch that has become logistics, and two people who love each other managing a small operation side by side like exhausted coworkers. Almost everything about this season is normal, and 'normal' still corrodes if it's never spoken. This track is the speaking.",
    feelings: [
      {
        label: "The default parent",
        body: "If the baby's needs route through you first (often though not always the mother), expect touched-out exhaustion, a brain that never stops tracking, invisibility ('does anyone ask how I am?'), and flashes of resentment followed by guilt for resenting a person you love. If you're also postpartum: hormones, recovery, and identity upheaval are stacked on top. This is the most anyone does on the least sleep anyone gets.",
      },
      {
        label: "The other parent",
        body: "Common and rarely said: feeling like you lost your partner to the baby, feeling incompetent when your soothing doesn't work and she takes over, becoming the household's utility player without the bond payoff, and missing being wanted. Saying 'I miss you' isn't selfish. It's the marriage talking. Also real: partners get postpartum depression too.",
      },
    ],
    principles: [
      "The resentment ledger is real in both columns. Neither of you is lazy and neither of you is a martyr; you're both maxed and counting different currencies (visible tasks vs. mental load, hours worked vs. nights up).",
      "Fairness talk beats scorekeeping: divide by capacity and renegotiate monthly, because the job keeps changing.",
      "Touch needs de-escalating: when all touch seems to bid for sex, the touched-out partner stops offering any. Deliberately rebuild non-sexual affection first.",
      "The couple needs fifteen protected minutes a day where the baby is not the topic. It sounds trivial. It's the marriage.",
      "Gatekeeping cuts both ways: the default parent has to let the other parent do it 'wrong' (differently); the other parent has to take whole domains, not tasks.",
    ],
    sessions: [
      {
        title: "The state of us, honestly",
        focus: "Both partners get the floor on what this season has actually been like: the version you don't post.",
        prompts: [
          "What's the hardest part of your average day that I don't fully see?",
          "What do you miss most about pre-baby us?",
          "When have you felt most alone since the baby came?",
          "What's one thing I've done in this season you never want to forget?",
        ],
      },
      {
        title: "The ledger, on the table",
        focus: "Airing the resentment ledger deliberately (both columns) so it stops accruing interest in the dark. Mental load counts as work.",
        prompts: [
          "What do you carry that you believe I don't count?",
          "Where do you feel taken for granted, the specific moment it stings most?",
          "What would 'off duty' actually mean, and when did you last truly have it?",
          "Which whole domain (not chore, domain) could each of us own outright?",
        ],
      },
      {
        title: "Touch, desire, and being wanted",
        focus: "The intimacy conversation for the touched-out and the turned-away: honest, pressure-free, and gradual by design.",
        prompts: [
          "What does your body need right now: more touch, less, different, slower?",
          "What does affection without agenda look like, so touch stops meaning a request?",
          "What makes you feel wanted in this season, when energy for wanting is scarce?",
          "What's a realistic next step for us, not the old normal, the next one?",
        ],
      },
      {
        title: "The couple inside the family",
        focus: "Engineering couplehood back into the schedule (small, defended, recurring) and deciding what you want the kids to grow up watching.",
        prompts: [
          "What 15-minute daily ritual could be ours, after bedtime, before phones?",
          "What's a realistic date rhythm right now, and who arranges what (including childcare)?",
          "What do we want our kids to see between us daily, and are they seeing it?",
          "What dream from pre-baby us do we refuse to let expire, even if it waits?",
        ],
      },
    ],
    planSeeds: [
      "Fifteen phone-free minutes a day where the baby is not the topic",
      "Each partner owns one whole domain outright, renegotiated monthly",
      "One protected solo-recharge block per partner per week: guilt-free, reciprocal",
      "A six-second kiss daily: affection with no agenda",
    ],
    seekHelp: [
      "Postpartum depression or anxiety in either parent: hopelessness, rage, intrusive thoughts, numbness past the newborn fog. Medical, common, very treatable; tell the OB/GP now.",
      "Any intrusive thoughts of harm to self or baby: 988 or your doctor immediately. These are treatable symptoms, not verdicts on you as a parent.",
      "Resentment hardening into contempt (eye-rolling, disgust, 'I'm done' fantasies as the default). Couples counseling early beats couples counseling late.",
      "No family/community relief at all: paid or bartered childcare even rarely is marriage infrastructure, not luxury.",
    ],
  },
];

// Tracks added after user testing found couples with no track for their
// situation (desire gap, blended family, interfaith, long caregiving, scarcity).
// Idempotent so a hot-reload / double module eval cannot duplicate them.
for (const t of extraTracks) {
  if (!tracks.some((x) => x.slug === t.slug)) tracks.push(t);
}

export function getTrack(slug: string): Track | undefined {
  return tracks.find((t) => t.slug === slug);
}
