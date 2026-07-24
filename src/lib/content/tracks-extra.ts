/**
 * Additional healing tracks, same structure and voice as tracks.ts. These
 * cover relationships that came up repeatedly in testing and weren't served by the
 * first six: low or absent desire, blended families, mixed-faith
 * homes, the long haul of caregiving, and chronic financial scarcity. Every
 * track signposts professional help and names the red flags where an app is
 * the wrong tool.
 */

import type { Track } from "./tracks";

export const extraTracks: Track[] = [
  {
    slug: "desire-gap",
    title: "When desire has gone quiet",
    subtitle: "A relationship where the wanting stopped matching",
    overview:
      "For a lot of couples the sex quietly slows, then stops, and then becomes the one subject the whole relationship tiptoes around. The trap is a story each partner tells alone: the one who wants more decides they are unwanted, the one who wants less decides they are broken or being graded. Both stories are usually wrong. Desire is not a fixed amount one of you is withholding from the other; it responds to stress, health, resentment, exhaustion, and the pressure of being needed on a schedule. This track is for saying the quiet things out loud and rebuilding an honest closeness, without either of you being cast as the problem.",
    feelings: [
      {
        label: "If you're the lower-desire partner",
        body: "You may spend a lot of energy feeling defective, or dreading the evenings, or bracing for a request that arrives as pressure. None of that means you love your partner less, and your desire is not a debt you owe. For many people desire is responsive: it shows up after closeness and safety, not before, and it wilts fast under the feeling of being evaluated. Bodies change too, and medication, hormones, pain, and plain exhaustion are legitimate realities, not excuses. You are allowed to want closeness in forms that don't always lead where your partner assumes.",
      },
      {
        label: "If you're the higher-desire partner",
        body: "Missing sex is real, and so is the lonelier thing underneath it: missing being wanted, missing being chosen. It is easy to start keeping a private ledger of every no, and easy for reaching out to curdle into something your partner feels as pressure without you meaning it to. Your longing is legitimate, and it is also not something your partner is obligated to satisfy on demand. The goal here is not to win more yeses. It is to become two people who can be honest about closeness again.",
      },
    ],
    principles: [
      "Desire is not owed, and it cannot be extracted. Nothing good rebuilds around obligation or a scoreboard, and the lower-desire partner is not a defect to be corrected.",
      "There is spontaneous desire (wanting that arrives out of nowhere) and responsive desire (wanting that shows up after warmth and safety). Neither one is the real kind, and many long relationships run mostly on the responsive one.",
      "Pressure kills the thing it's chasing. When every touch might be a request, the lower-desire partner stops offering any touch at all. De-escalating touch, meaning affection that goes nowhere on purpose, is how the ground recovers.",
      "Bodies are real. Hormones, medication side effects, pain, menopause, low testosterone, and exhaustion are medical facts, not verdicts on the relationship, and some of this belongs to a doctor rather than an argument.",
      "The higher-desire partner's loneliness and the lower-desire partner's dread are both true at the same time. This is a gap between two okay people, not proof that one is cold or the other is demanding.",
      "Talk about it with clothes on, outside the bedroom, when nothing is pending. The worst possible moment to discuss desire is right after one of you reached and the other flinched.",
    ],
    sessions: [
      {
        title: "The two stories we've been telling",
        focus: "Each partner says out loud the private story they built in the silence: what the distance has come to mean about them and about the relationship. No fixing, no defending.",
        prompts: [
          "What have I decided your no (or your reaching) means about me? Said plainly, even the ugly version.",
          "What do I miss most: the sex itself, or something underneath it (being wanted, being close, being chosen)?",
          "What have I stopped doing to protect myself (touching you, reaching, offering), and what did I tell myself about it?",
          "What is the fear I've never said out loud: that you've changed, that I'm broken, that this is just how it is now?",
        ],
      },
      {
        title: "How desire actually works for each of us",
        focus: "Naming your two patterns without ranking them: what turns the lights on, what shuts them off, and what has nothing to do with the other person at all.",
        prompts: [
          "Does wanting tend to arrive on its own for me, or does it only show up after I already feel close and safe?",
          "What kills it fastest (stress, resentment, feeling graded, exhaustion, the kids' door that doesn't lock)?",
          "What's happening in my body these days that you can't see (pain, medication, hormones, tiredness, how I feel about how I look)?",
          "When did closeness last feel easy between us, and what was true about our life back then?",
        ],
      },
      {
        title: "Pressure, rejection, and the ledger",
        focus: "The honest conversation about how initiating and refusing actually land, so both of you can stop bracing every night.",
        prompts: [
          "When I reach for you, what does it feel like on your end: an invitation, or an exam?",
          "When you turn toward me or away, what's a kind way to say it so it doesn't land as a rejection of the whole person?",
          "Have I been keeping score without admitting it? What would it take to put the ledger down?",
          "What's a way I could show I want you that doesn't corner you into a yes or no tonight?",
        ],
      },
      {
        title: "Rebuilding touch with no destination",
        focus: "Designing affection that is allowed to go nowhere, so that touch stops being a question with only two answers.",
        prompts: [
          "What non-sexual touch do we both actually like (the long hug, a hand held, sitting close, a real kiss goodbye)?",
          "Could we agree out loud that some touch leads nowhere on purpose, and both really mean it?",
          "What's one small daily closeness we could rebuild first, with zero expectation attached?",
          "How will we say when we want more, and when we just want to be near, so that neither one is a letdown?",
        ],
      },
      {
        title: "What 'us' wants to be now",
        focus: "Deciding together, without a scoreboard, what a good-enough intimate life looks like for the two of you at this stage, not the one you had at the start.",
        prompts: [
          "What would 'close enough' honestly look like for each of us right now?",
          "What are we each willing to try, to stretch toward, or to ask a doctor about?",
          "What do we want to protect between us regardless of how often sex happens?",
          "How will we keep talking about this on purpose, so it doesn't slip back underground?",
        ],
      },
    ],
    planSeeds: [
      "A weekly clothes-on check-in about closeness, scheduled when nothing is pending",
      "Daily non-sexual affection with no agenda: a real kiss, a long hug, sitting close",
      "A spoken, shared agreement that some touch is allowed to lead nowhere",
      "One health question parked for a doctor instead of relitigated at midnight",
    ],
    seekHelp: [
      "Pain during sex, a sudden drop in desire, erectile changes, or symptoms around menopause or low testosterone. These are medical, common, and often very treatable: start with a doctor, not an argument.",
      "Desire that fell away alongside low mood, no energy, or no pleasure in anything. Depression and many medications flatten libido, and both are treatable.",
      "A mismatch that has hardened into contempt, ultimatums, or one partner pressuring or coercing the other. Pressure is not consent; if sex is being demanded or extracted, see the safety page.",
      "You keep having the same painful conversation and it never moves. A sex therapist, or a couples therapist trained in this (many use a structured touch program), can help far more than an app.",
    ],
  },
  {
    slug: "blended",
    title: "Blended family and second chances",
    subtitle: "Building one relationship on top of two histories",
    overview:
      "A blended relationship is not a fresh start on a blank page. It is a relationship built on top of everyone's history: children who did not choose this, a former partner who is present whether through separation or death, houses and money and holidays that each carry their own gravity. The couple is often the newest and most fragile relationship in a house full of older, deeper ones. Loving each other is rarely the hard part. Building one team when every person in the home is loyal to a different map is the hard part. This track is for any blended family at any age, whether you are blending small children or navigating grown kids and grandchildren.",
    feelings: [
      {
        label: "If these are your children",
        body: "You may find yourself defending your kids on instinct, before you've even decided anything, and then watching it wound your partner in their own home. The pull is old and strong: you and your children were a unit, often through something hard, long before this relationship existed. Wanting to protect them is not a flaw. But a child who senses they outrank your partner learns they can split the two of you, and a partner who is always overruled slowly stops trying. You are allowed to love your children fiercely and still build a relationship they cannot veto.",
      },
      {
        label: "If you joined the family",
        body: "You may never be sure which role you're allowed to play: parent one minute, stranger the next, asked to step up and then to step back. Correcting a child who resents you can feel like walking into a wall, and being met with coldness in your own house is a specific loneliness. It is also real that you may be grieving the closeness you expected, or feeling like a guest where you pay the bills. None of that makes you an intruder. It means you joined a family that already existed, which is harder and slower than anyone admits.",
      },
    ],
    principles: [
      "The couple is the foundation, and in a blended home it is also the newest, thinnest wall. Protecting the relationship is not choosing it over the kids. A steady couple is the safest thing a child in a blended home can have.",
      "Loyalty binds are real. A child being cold to a step-parent is usually not cruelty; it's a kid trying not to betray an absent or a deceased parent. Name it gently instead of taking it personally.",
      "The parent leads discipline with their own kids, especially early on. The step-parent builds a relationship first and earns authority slowly. Trying to be an instant parent usually backfires; being a reliable adult who doesn't quit works.",
      "The first partner is in the house whether or not anyone says the name, through the children, the schedule, the co-parenting, or the grief if they died. Pretending otherwise doesn't make them leave. Deciding together how they fit does.",
      "Adult and grown children get a version of the same rules. Resentment, holidays, and 'you're not my parent' don't expire at eighteen; they just go quieter and turn into questions about time and money.",
      "Money and inheritance are an intimacy topic, not only a legal one. Fear about whose children are protected, whose house it really is, and what happens if one of you dies will poison closeness if it stays unspoken. Say it, then get the paperwork honest.",
    ],
    sessions: [
      {
        title: "The families we each came from",
        focus: "Before solving anything, each partner tells the honest story of the family that existed before this relationship: what it survived, what the kids carry, what you swore to protect.",
        prompts: [
          "What did my children and I go through before you, and what did I promise them, out loud or silently?",
          "What am I most protective of, and where does that protectiveness actually come from?",
          "What did I hope this relationship would give my kids, and where has it fallen short of that?",
          "What do I need you to understand about my children that you might be reading wrong?",
        ],
      },
      {
        title: "The loyalty binds",
        focus: "Naming the invisible pulls in the house: where each person's first loyalty runs, and how it plays out in the daily fights.",
        prompts: [
          "When I defend my child in front of you, what am I afraid happens if I don't?",
          "When you feel overruled or shut out, what does it make you believe about your place here?",
          "Where do the kids sense they can split us, and how does that show up?",
          "What would it look like to be a united wall in the moment and argue in private later?",
        ],
      },
      {
        title: "The one who came before",
        focus: "The conversation couples avoid: how the previous partner, through divorce or through death, still lives in this home, and how to hold that honestly.",
        prompts: [
          "How is your first relationship still present here (the ex, the co-parenting, the grief, the comparisons)?",
          "Where do I feel like I'm competing with a ghost or an ex, and is that fair to say out loud?",
          "What do we owe the kids' other parent in how we speak and coordinate, and where's the line?",
          "If the comparison runs the other way and I feel measured against them, how do we talk about that kindly?",
        ],
      },
      {
        title: "Money, the house, and what happens if",
        focus: "Bringing the fear about inheritance, property, and provision into the open, as a closeness issue first and a legal one second.",
        prompts: [
          "What am I quietly afraid of about money, the house, or what my children inherit?",
          "If one of us died, would each of us trust that our kids and the other partner would both be okay? Honestly?",
          "What have we avoided putting in writing because it felt unromantic or frightening to raise?",
          "What would 'fair to everyone we love' actually look like, and who do we need to make it real (not tonight, but soon)?",
        ],
      },
      {
        title: "The relationship we're building on purpose",
        focus: "Deciding what this specific family is going to be, and defending a couple relationship that the household's older loyalties will always crowd.",
        prompts: [
          "What do we want this blended family to feel like in five years, and what has to change now to get there?",
          "What's ours alone, protected from the kids, the exes, and the logistics?",
          "What house rules do we both actually stand behind, so the kids stop finding daylight between us?",
          "What has this relationship given each of us that the first one didn't, that we want to keep sight of?",
        ],
      },
    ],
    planSeeds: [
      "A standing weekly meeting for kid and household decisions, so they leave the hallway",
      "A code phrase for 'united front now, argue upstairs later'",
      "One protected couple ritual the kids and the exes don't get a vote in",
      "One honest money-and-wishes conversation booked, with a plan to make it legal",
    ],
    seekHelp: [
      "A child who is depressed, acting out dangerously, or being harmed by the household conflict. Family therapy, or a counselor for the child, is the right tool, not an app.",
      "Co-parenting with an ex that keeps escalating into hostility the kids are caught in. A family therapist, a parenting coordinator, and sometimes mediation exist for exactly this.",
      "Estate, inheritance, or provision questions that are genuinely complex or contested. This needs an estate attorney; getting it honest on paper is how you protect everyone you love.",
      "Contempt hardening between the two of you, or a child's loyalty being used as a weapon by any adult. Therapists who specialize in blended families are trained for this exact terrain.",
    ],
  },
  {
    slug: "faith-gap",
    title: "Two faiths, one family",
    subtitle: "When belief and observance don't match",
    overview:
      "Two people can love each other completely and still stand in different places before God, or before no god at all. The differences rarely stay abstract. They arrive in the calendar (whose holidays, whose fasts, whose Sabbath), in the children (how they'll be raised, what they'll believe), in the daily texture of prayer and practice, and in two extended families and communities who each carry hopes. Sometimes one partner converted on paper for the wedding and privately never moved. This track is not here to resolve theology or decide who is right. It is here so that faith becomes something the two of you navigate as a team, instead of a fault line that quietly widens.",
    feelings: [
      {
        label: "If your faith runs deep",
        body: "Your religion may be not a preference but the ground you stand on: how you understand your life, your death, and your children's souls. Watching it treated as one option among many, or as a scheduling problem, can feel like being asked to shrink the truest part of you. There may also be a grief you rarely say out loud: that you're raising children who may not share what has held you, or that you're facing your own community's disappointment. That grief is real, and it is not a license to steamroll the person you love.",
      },
      {
        label: "If you believe differently, or not at all",
        body: "You may feel like a guest in your own relationship on the big days, or like you're forever negotiating how much of someone else's practice to absorb. Being pressed toward a belief you don't hold, or watching your children pulled somewhere you can't follow, is its own kind of loneliness. It's also easy to read your partner's devotion as a rejection of you, or as pressure, when for them it may simply be love. Your convictions, including a lack of them, are as legitimate as theirs, and honesty about them is kinder than a quiet yes you don't mean.",
      },
    ],
    principles: [
      "This track does not pick a winner between your faiths. The goal is a relationship where both people can be honest about what they believe without it becoming a fight over who is right.",
      "Practice can be closeness or it can be distance, and you each get to say which it is for you. Praying together, keeping a holiday, or sitting respectfully at someone else's table can be a bond. Being made to perform a belief you don't hold breeds resentment.",
      "The children question deserves a real, ongoing conversation, not a vague truce or a promise made before the wedding and never revisited. What they're taught, what they're exposed to, and what they get to choose later all belong on the table, more than once.",
      "Holidays and observances are where the abstract turns concrete. Decide the calendar on purpose and in advance (whose, when, and how the other takes part) so the season stops being an annual ambush.",
      "Close-knit extended families are usually love, not a boundary violation. In many faiths and cultures, parents and community being deeply woven into your religious life is the normal, expected thing. The task is a united couple inside that closeness, not walling the families out.",
      "A conversion 'on paper but not in heart' has to be sayable without the relationship ending. Performing a belief you don't hold to keep the peace costs more over years than the honest conversation ever would.",
    ],
    sessions: [
      {
        title: "What faith actually is to each of us",
        focus: "Each partner describes, without debate, what their belief or unbelief really is: not the label, the lived thing. The listener's only job is to understand it, not to counter it.",
        prompts: [
          "What does my faith, or my not believing, actually give me, deep down?",
          "What do I most wish you understood about it that you might have wrong?",
          "Where have I felt my beliefs treated as a scheduling problem or a passing phase?",
          "If I converted or agreed to something earlier in the relationship, what's the honest truth of where I actually stand now?",
        ],
      },
      {
        title: "The calendar and the practices",
        focus: "Turning the abstract into the concrete: holidays, Sabbaths, fasts, prayer, and how much each of you takes part, decided together instead of fought over each season.",
        prompts: [
          "Which days and practices matter most to me, and which could I hold more loosely?",
          "Where has a holiday or observance become a yearly argument, and what did it really mean underneath?",
          "What can I join you in with a full heart, what can I honor respectfully without pretending, and where is my honest limit?",
          "How do we want the year to look, on purpose, so the seasons stop catching us off guard?",
        ],
      },
      {
        title: "What we teach the children",
        focus: "The ongoing conversation about how the kids are raised: what they learn, what they see, and what they'll be free to choose for themselves.",
        prompts: [
          "What do I most want our children to have from my faith or my values, and why does it matter to me?",
          "What am I afraid of them losing, or being pushed into, and have I said that out loud?",
          "How do we give them both without turning them into a rope we pull between us?",
          "What do we want them to be free to decide later, and can we both honestly live with that?",
        ],
      },
      {
        title: "The families and the community",
        focus: "Handling the extended families and congregations with love, as a united couple, without either partner being cornered.",
        prompts: [
          "Where do our families' hopes for us land as pressure, and on whom does it land hardest?",
          "When your family's faith life reaches into ours, when does it feel like love and when like too much, honestly?",
          "How do we stay one team in front of both families instead of each defending our own?",
          "What do we want to say yes to together, and what do we need to gently decline as a couple?",
        ],
      },
      {
        title: "The relationship across the difference",
        focus: "Deciding what closeness looks like when you may never fully share a faith, and what you're building that's bigger than the gap.",
        prompts: [
          "Where could our different beliefs actually bring us closer instead of pushing us apart?",
          "What shared values do we both stand on, whatever name each of us gives them?",
          "What do I need from you to feel respected in what I believe, even when you don't share it?",
          "What kind of spiritual home, or honest and open house, do we want ours to be?",
        ],
      },
    ],
    planSeeds: [
      "The year's holidays mapped out together in advance, with each partner's role named",
      "A recurring, low-pressure check-in on how the kids' upbringing is feeling to both of you",
      "One practice you genuinely share, plus permission to hold the rest separately",
      "A united-couple plan agreed before big family or community gatherings",
    ],
    seekHelp: [
      "Being pressured or shamed toward a conversion or an observance you don't believe, or a community that punishes leaving. Coercion in belief is a real harm: talk to someone outside the pressure, and see the safety page if it turns controlling.",
      "The faith difference has become a stand-in for constant contempt, or one partner's practice is being mocked or forbidden. A couples therapist, ideally one comfortable with religion, can help.",
      "A clergy member you both trust, or two of them, one from each tradition, can be a genuine resource for the specifics of holidays, children, and ceremony in a way an app cannot.",
      "If a child is caught in the middle and showing real distress, a family therapist who respects both traditions is the right next step.",
    ],
  },
  {
    slug: "caregiving",
    title: "The long haul of caregiving",
    subtitle: "Love in a season that doesn't end",
    overview:
      "There is a lot of help for the crisis: the diagnosis, the surgery, the frightening first months. There is almost none for year six, or year twelve, when the illness or disability is simply the weather now and everyone else has moved on. This track is for the long haul: the relationship where one of you lives with a chronic or progressive condition, the casseroles stopped coming years ago, the family that rallied has long since burned out, and respite costs money you may not have. It refuses the story of crisis and recovery, because your story isn't shaped like that. It is for staying connected, and staying two people, inside a season with no end date on it.",
    feelings: [
      {
        label: "If you're the one living with the illness",
        body: "Years in, the fear has usually settled into something heavier: the grind of a body that won't cooperate, and the guilt of watching your partner's life bend around yours with no end in sight. You may hate being the reason plans keep shrinking, and hate needing help with things you once did without a thought. It's common to feel like less of a partner and more of a task, and to be angry at the one person who has stayed. You are not a burden you owe repayment on. You are still a whole person, and still their partner, not only their patient.",
      },
      {
        label: "If you're the caregiver",
        body: "The early adrenaline is long gone, and what's left is a tiredness that sleep doesn't touch. You may grieve, over and over, small losses no one else even notices, and then feel guilty for grieving at all when your partner is the one who is sick. The help that showed up at first has thinned out, and you've probably stopped saying you're tired because it feels unspeakable. Your needs did not dissolve because this went on for years. An exhausted caregiver with nothing left is not more loving; running yourself empty was never part of the vow.",
      },
    ],
    principles: [
      "This is not a crisis with a recovery waiting on the other side, and pretending it is only adds shame when the finish line never comes. The goal is a livable, honest long season, not a cure to perform hope about.",
      "Patient and caregiver are jobs, not the whole of either of you. Protecting time where the illness is not the subject and care is not the activity is how the relationship survives underneath the roles.",
      "The caregiver's needs stay legitimate no matter how long this lasts. Rest, help, and a life of your own are not disloyalty, and burning out helps no one, least of all the person being cared for.",
      "The ill partner keeps agency and keeps contributing in whatever form is possible. Being cared for should not mean being managed, decided for, or treated as fragile in every room.",
      "Respite is real, and it often costs money or a favor you've already spent. Naming honestly what relief is actually available, and what isn't, beats waiting for help that isn't coming. Some seasons there is simply less than you need.",
      "Intimacy changes when bodies change, and it does not have to end. Fatigue, pain, medication, and grief are real; so is the need to be close. Redefining closeness on your own terms beats mourning the version you can't have anymore.",
    ],
    sessions: [
      {
        title: "Where we actually are, years in",
        focus: "An honest accounting of the long haul, with no forced positivity: what this has become, and what each of you has quietly stopped saying.",
        prompts: [
          "What is the hardest part of this now, in year whatever, that's different from the early days?",
          "What have I stopped telling you because it felt unfair to say out loud?",
          "Where has hope become pressure, and could we let it just be honest instead?",
          "What do I need you to know about my body, my energy, or my mood these days?",
        ],
      },
      {
        title: "Partner and patient, caregiver and person",
        focus: "Naming how far the roles have taken over, and deliberately protecting the two people underneath them.",
        prompts: [
          "When do I still feel like your partner, and when do I feel only like your patient or your nurse?",
          "What did we used to be to each other that the illness has crowded out, and do we both miss it?",
          "What's one part of our week we could guard from the illness entirely?",
          "What can the ill partner still own or contribute that would restore a little footing?",
        ],
      },
      {
        title: "The caregiver's honest floor",
        focus: "The caregiving partner speaks without editing: the exhaustion, the grief, the resentment and the guilt about the resentment, heard as love because it is love.",
        prompts: [
          "What is the weight no one, including me, ever asks about?",
          "What have I given up that I quietly grieve, and what is that costing us both?",
          "What resentment am I most ashamed of? (Saying it out loud is how it loosens its grip.)",
          "What relief would actually help, and what's honestly available to us: money, family, a program, or nothing right now?",
        ],
      },
      {
        title: "Bodies, closeness, and what still works",
        focus: "The intimacy conversation for changed bodies and long fatigue: honest, gentle, and free of the old scoreboard.",
        prompts: [
          "What does my body allow, want, or need now, and what has changed that I've never said?",
          "What closeness still feels good and possible (touch, nearness, tenderness) even on the hard days?",
          "Where has care quietly replaced affection, and how do we get some affection back that isn't a task?",
          "What's a realistic, kind next step for us, not the version from before, the one that fits now?",
        ],
      },
      {
        title: "A life, not just a schedule",
        focus: "Building something that is still a relationship and still a life inside the ongoing season, and facing the forward questions with company instead of alone.",
        prompts: [
          "What do we still want our days to hold besides appointments and management?",
          "What small joys are actually available to us, and are we taking them?",
          "What forward conversations (money, care as it changes, wishes) have we been avoiding, and could we start one gently?",
          "What has this long haul shown us about us that we don't want to lose sight of?",
        ],
      },
    ],
    planSeeds: [
      "A weekly illness-free window: the topic is off-limits, the couple is the point",
      "Caregiver relief treated as necessary rather than optional, in whatever form is truly available",
      "One task or decision returned to the ill partner to restore agency",
      "A monthly honest check on what's changed, so nothing calcifies in silence",
    ],
    seekHelp: [
      "Caregiver burnout that has curdled into rage, numbness, a body breaking down, or heavy drinking. Caregiver support groups (many free through hospitals or disease-specific nonprofits), respite programs, and individual therapy exist for exactly this.",
      "Depression in either partner beyond situational sadness: hopelessness, withdrawal from everything, no pleasure left anywhere. It's common across long illness and very treatable.",
      "Any thoughts of self-harm, or of being a burden the family would be better off without, on either side: call or text 988 now, not later.",
      "Practical strain past what you can carry alone. A hospital social worker, a case manager, or a disease-specific organization can point you to respite, benefits, and help you may not know exists. Asking is not failing.",
    ],
  },
  {
    slug: "scarcity",
    title: "When money is always tight",
    subtitle: "Staying close when there's never enough",
    overview:
      "This is not the story of a lost job you're waiting to recover from. This is the relationship where the money has always been tight, and there is no season on the horizon where it isn't: hourly or gig work with no cushion, no benefits to fall back on, an account that empties every month before it fills. Advice built for people with savings to reorganize or help to accept lands as an insult here, because there is nothing to triage and the help often isn't there. What scarcity does to a relationship is quieter and more corrosive than a single crisis: the low hum of never-enough, the bone tiredness, the way it can turn two exhausted people against each other. This track is about protecting the us when the money can't be fixed by wanting it fixed.",
    feelings: [
      {
        label: "If you carry the daily juggling",
        body: "You may be the one who knows exactly which bill is due, which one can slip, and how many days until payday, and you carry that math in your body every waking hour. It rarely gets counted as work, because there's nothing to show for it at the end; the reward for surviving a month is another month to survive. It can make you snap, or go silent, or lie awake doing arithmetic while your partner sleeps. That vigilance is not you being controlling or negative. It is the load of keeping a household afloat with no margin, and it's exhausting in a way that doesn't photograph.",
      },
      {
        label: "If you carry the earning",
        body: "You may be working every hour you can get, picking up shifts, saying yes to the gig, and still watching it come up short, which can land as a verdict on you as a partner and a provider. The shame of that is heavy, and shame makes people hide, snap, or go quiet at exactly the wrong moment. It's also lonely to give everything you physically have and feel it disappear. Working yourself to the bone and still not making it is not a moral failure. Wages and prices are not something you're failing at personally, even when it feels that way at 2am.",
      },
    ],
    principles: [
      "The enemy is the scarcity, never the partner. When there's no slack, every disagreement wants to become a referendum on each other. Us against the shortage is the only version that survives it.",
      "'Just budget better' is usually a lie told to people who already track every dollar. You cannot cut your way out of wages that don't cover the basics. Skip the shame of imaginary mistakes and deal with the real math.",
      "Scarcity is a tax on attention: it eats focus, patience, and sleep, and it makes everyone in its grip more reactive. Naming that out loud (we're short-fused because we're stretched, not because we've stopped loving each other) keeps it from reading as contempt.",
      "Some help exists and some doesn't, and pretending it's always there is its own cruelty. Chase what's real (benefits you may qualify for, a program, a clinic, a food resource) without shame, and don't punish each other over doors that aren't open.",
      "The invisible work of stretching a dollar is real work. Fielding the calls, stretching the groceries, deciding which bill slips: count it out loud, the same as hours clocked.",
      "Kindness is the one thing scarcity can't confiscate, and it's the first thing exhaustion tries to spend. Protect the small daily decencies hardest exactly when there's least of everything else.",
    ],
    sessions: [
      {
        title: "What it's really like to carry this",
        focus: "Feelings only, no ledger yet: the weight, the shame, the 2am math, said out loud so neither of you carries it alone in the dark.",
        prompts: [
          "What does the constant tightness do to me on the inside, on an average day?",
          "What am I most afraid of, said fully, even the worst version?",
          "What shame am I carrying about money that I've never actually told you?",
          "What do I need from you that doesn't cost a dollar?",
        ],
      },
      {
        title: "Where our money stories come from",
        focus: "Each partner's history with scarcity: what it taught, what it wired in, and how it's steering the present.",
        prompts: [
          "What did money, or the lack of it, feel like in the house I grew up in?",
          "What did I swear I'd never repeat, or always provide, and how does that drive me now?",
          "When you watch me tense up, go quiet, or spend on something small, what old story is running?",
          "What would 'we're going to be okay' need to sound like for me to breathe?",
        ],
      },
      {
        title: "Counting all the work",
        focus: "Making both kinds of labor visible: the hours earned and the invisible juggling, so neither partner feels unseen or blamed.",
        prompts: [
          "What am I carrying that I don't think you fully see or count?",
          "Where do I feel blamed for something that isn't mine to fix (the wages, the prices, the shortage)?",
          "What's the juggling that keeps us afloat that never shows up as an accomplishment?",
          "How do we split the load, both the earning and the managing, in a way that feels fair right now?",
        ],
      },
      {
        title: "The real math, together",
        focus: "The practical side, faced as teammates: what's actually true, what's actually available, and what's simply not, without pretending or blaming.",
        prompts: [
          "What's the honest picture: what comes in, what goes out, what's the gap, with nothing hidden either way?",
          "What help might actually be real for us (benefits, a program, a clinic, a resource), and who will look into what?",
          "What have we been beating ourselves up over that's really just not enough money, not a mistake?",
          "What one small thing could we change or chase that's genuinely within reach this month?",
        ],
      },
      {
        title: "The relationship the money can't take",
        focus: "Protecting the relationship itself through a season with no clear end, because couples who only grind arrive at each other as strangers.",
        prompts: [
          "What's a free version of something we used to love that we could still do?",
          "How do we mark getting through a hard week, so life isn't only endurance?",
          "What kindness have I been rationing that we actually can't afford to cut?",
          "When we look back on this stretch someday, what do we want to be able to say we protected?",
        ],
      },
    ],
    planSeeds: [
      "A weekly money check-in that's short, blame-free, and ends with one decision and one kindness",
      "A free or nearly-free ritual guarded like a bill that has to be paid",
      "A daily 'we're a team' touch: one appreciation, zero logistics",
      "One real resource looked into each month, without shame, split between the two of you",
    ],
    seekHelp: [
      "Depression or hopelessness settling in under the grind: sleeping all day, numbness, no way out in sight. It's common under chronic strain and it's treatable; community health centers offer care on a sliding scale.",
      "Nonprofit credit counseling (for example, NFCC-affiliated agencies) and 211 (which connects to local assistance in many areas) are free or low-cost and know what help actually exists near you. Using them is not failure.",
      "Financial pressure turning into hidden debt, or into fights that escalate past words. Concealed money wounds a relationship like other betrayals, and conflict turning into fear means it's time for the safety page.",
      "A benefits or legal question you can't crack alone (eviction, wage theft, disability, a denied claim). Legal aid and benefits navigators are often free and exist for exactly this.",
    ],
  },
];
