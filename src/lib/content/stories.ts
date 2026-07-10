/**
 * Composite teaching stories.
 *
 * Every couple here is fictional: a composite written to show what repair
 * actually looks like, hour by hour, in kitchens and cars and hallways.
 * None of these are real people, real cases, or testimonials, and the app
 * labels them that way. The situations are common; the couples are invented.
 */

export type Story = {
  id: string;
  title: string;
  situation: string;
  tags: string[];
  years: string;
  oneView: string;
  otherView: string;
  turning: string;
  whatHelped: { practice: string; how: string }[];
  where: string;
};

export const stories: Story[] = [
  {
    id: "affair-aftermath",
    title: "After the affair",
    situation:
      "Dana found the messages on a Tuesday night while Marcus was putting their daughter to bed. The affair with a coworker had run for seven months. He ended it that week, moved into the guest room, and neither of them knew what was supposed to happen next.",
    tags: ["affair", "trust", "betrayal"],
    years: "Married 11 years",
    oneView:
      "I do math all day now. Every late meeting, every work trip from the last year gets re-audited at 2am while he sleeps down the hall. People keep asking if I'm leaving, and the honest answer is I don't know yet, because the man I'd leave and the man I married are the same person and my heart hasn't caught up to that. What I want most is the one thing nobody can give me: to unknow it.",
    otherView:
      "I did this, and no version of the story makes me the good guy in it. What I keep fighting is the urge to rush her, to say we've talked about it enough, because every question feels like standing trial for a verdict that's already in. But I've started to understand that her questions aren't punishment. They're her checking whether the ground is real before she puts weight on it.",
    turning:
      "Marcus handed over his phone passcode before Dana asked, and answered the same questions the tenth time as steadily as the first. Dana agreed the questions could have a container: real answers, every time, but not every night until dawn. Nothing dramatic changed; the direction did.",
    whatHelped: [
      {
        practice: "transparency agreements",
        how: "Phone, location, calendar, all open, and offered by him rather than demanded by her. The information mattered less than the fact that he kept volunteering it without being chased.",
      },
      {
        practice: "timed uninterrupted turns",
        how: "Dana got twenty minutes of questions with full answers and no defensiveness, then the topic rested until the next session. It kept the affair from owning every single evening they had left.",
      },
      {
        practice: "flooding breaks",
        how: "These conversations drowned them both fast. Either could call twenty minutes apart with a promised return time, and the return being kept mattered more to Dana than anything said before the break.",
      },
    ],
    where:
      "Two years in they are still deep in it: some weeks feel almost normal, some feel like week one, and they both keep showing up anyway.",
  },
  {
    id: "roommate-drift",
    title: "The polite strangers",
    situation:
      "No affair, no fights, nothing anyone could point to. Priya and Tom ran a smooth house: two careers, one mortgage, evenings side by side with separate screens. One night Priya realized she couldn't remember their last conversation that wasn't about logistics.",
    tags: ["distance", "roommates", "connection"],
    years: "Married 9 years",
    oneView:
      "I was lonely in a room with my favorite person, which is a special kind of lonely nobody warns you about. I kept drafting the big conversation in my head and never having it, because every version sounded like an accusation and he hadn't actually done anything. He's kind, he's reliable, he'd be shocked to hear the word 'lonely'. That's what scared me: we could have coasted like this for twenty more years.",
    otherView:
      "I honestly thought quiet meant we were good. My parents fought loudly my whole childhood, so a calm house has always read as a winning house to me. When Priya said she missed us, my first reaction was panic, because big feelings conversations feel like tests I'm going to fail. I didn't want more talking for its own sake; I just didn't know there was another way to close the gap.",
    turning:
      "They skipped the big talk entirely and made one small structural change: a twenty-minute walk after dinner, no phones, no agenda. Tom, it turned out, could say things side by side that he could never say face to face.",
    whatHelped: [
      {
        practice: "micro-moves",
        how: "They started with seconds, not conversations: a coffee handed over, one text at lunch that wasn't about groceries, sitting on the same couch instead of opposite ones. Low stakes was the whole design, because low stakes was what Tom could do daily.",
      },
      {
        practice: "appreciation rituals",
        how: "One specific thank-you at dinner each night, out loud. It felt scripted for two weeks, and then it quietly retrained what they each watched for in the other all day.",
      },
      {
        practice: "weekly State of the Union",
        how: "Thirty minutes on Sunday: what went well, what was hard, what's coming. Having a standing place for real talk meant nothing had to build up until it needed a big scary conversation.",
      },
    ],
    where:
      "The house is louder now in a good way; they still drift some weeks, but they notice within days instead of years.",
  },
  {
    id: "miscarriage",
    title: "The due date nobody said out loud",
    situation:
      "Elena miscarried at ten weeks, two days after they had told their parents. Sam went back to work that Monday; Elena couldn't. Within a month they had stopped mentioning it around each other entirely, each one protecting the other with silence.",
    tags: ["grief", "loss", "silence"],
    years: "Married 4 years",
    oneView:
      "I needed to say the due date out loud, and the name we'd been circling, and I couldn't, because Sam would go still and change the subject. I started reading his quiet as him being over it, or worse, relieved. Grieving alone in a marriage is lonelier than grieving alone, because the person who should be in it with you is right there, choosing not to be. That's the story I was telling myself, anyway.",
    otherView:
      "I thought my job was to be the steady one. If I cracked too, we'd both go under, so I held the line, went to work, kept the machine running. The night it happened I took apart the shelf we'd bought for the nursery at 1am because I couldn't walk past it, and I never told her that. She read my silence as not caring, and I can't blame her, because from the outside that's exactly what it looked like.",
    turning:
      "One night Elena said the almost-name out loud at the kitchen table, and Sam didn't change the subject; he sat down. They decided grief was allowed at their table on purpose, not just by ambush, and they gave it a standing appointment so neither had to guess when it was safe.",
    whatHelped: [
      {
        practice: "grief-style naming",
        how: "They named what was lost, specifically: the due date, the name, the version of next year they had already been living in. Saying it out loud together turned two private griefs into one shared one.",
      },
      {
        practice: "timed uninterrupted turns",
        how: "Ten minutes each, no fixing, no rescuing. Sam learned he could say two true sentences and stop, and that it still counted as showing up.",
      },
      {
        practice: "micro-moves",
        how: "On the hard dates, a hand on the shoulder or a two-word text, 'today too', replaced the pressure to have a whole conversation. It let Sam grieve in his language while still grieving with her.",
      },
    ],
    where:
      "They still grieve at different speeds and no longer treat that as betrayal; the loss is part of their marriage now instead of a wall through the middle of it.",
  },
  {
    id: "first-year-baby",
    title: "Year one with Miles",
    situation:
      "Miles arrived in February and sleep left. By month five, Beth and Jonah were keeping silent ledgers of who was more tired, and their worst fight happened at 3am in the kitchen, both of them crying over whose turn it was. Nobody had warned them the baby would be easy compared to the marriage.",
    tags: ["new baby", "exhaustion", "scorekeeping"],
    years: "Married 3 years",
    oneView:
      "My body stopped being mine in February and hasn't come back. By 9pm I have been touched, needed, and climbed on for fourteen hours, and when Jonah reaches for me it lands as one more person wanting something. I keep a running count of night wakings like a lawyer building a case, and I hate it. I miss him, but missing him is a feeling I don't have the energy to act on.",
    otherView:
      "I went from partner to staff in one winter, and clumsy staff at that: every diaper I do gets redone, every outfit I pick is somehow wrong. So I stopped reaching, for her and for the baby, because every reach seemed to cost her something. From where I sat she'd become the manager of a household I just worked in. I know now she was drowning, but drowning people don't look sad from the outside, they look angry.",
    turning:
      "They gave up on fixing the whole marriage and fixed one hour: the 6pm handoff. Each morning they decided out loud who had the baby, who had dinner, and who got twenty minutes of nothing, instead of silently auditing each other at midnight.",
    whatHelped: [
      {
        practice: "soft startup",
        how: "'I'm at zero and I need twenty minutes' replaced 'must be nice'. Naming the need before the resentment turned most of their 3am fights into logistics.",
      },
      {
        practice: "micro-moves",
        how: "A real kiss at the door, one text a day that had nothing to do with the baby. Six seconds was genuinely all they had some days, and six seconds turned out to be enough to stay a couple.",
      },
      {
        practice: "weekly State of the Union",
        how: "Twenty minutes during the Sunday nap to split the week's nights, appointments, and escape hatches on purpose. Deciding together up front is what finally killed the scorekeeping.",
      },
    ],
    where:
      "The first year flattened them and they came out of it liking each other, which they now understand was never guaranteed.",
  },
  {
    id: "money-collapse",
    title: "When the restaurant went down",
    situation:
      "Luis's restaurant failed slowly and then all at once, and he spent fourteen months covering the losses with cards and a loan Carmen didn't know about. She found out when a letter arrived naming the house. Two kids, one mortgage, and suddenly no version of the numbers that worked.",
    tags: ["money", "secrets", "separation", "co-parenting"],
    years: "Married 14 years",
    oneView:
      "The debt was survivable; the fourteen months of lying were not. I kept trying to get back to trusting him, and I'd watch myself checking the mail like a security guard and realize I wasn't getting there. You can forgive someone completely and still not be able to build a future on them. It took me a long time to accept that both of those were true at once.",
    otherView:
      "Every month I hid it, I told myself I was protecting her, and every month made the confession bigger until there was no size of sorry that fit. I watched her fight to stay in love with me and I couldn't hand her the one thing that would have let her: a way to feel safe again. I own that. What I wouldn't let the failure take was the way we treat each other, and the kids' view of both of us.",
    turning:
      "The turning point wasn't saving the marriage; it was the night they stopped fighting about the ending and started running it together. They agreed the divorce would follow the same rules as the repair work: no contempt, no lawyers as weapons, kids first.",
    whatHelped: [
      {
        practice: "speaker-listener structure",
        how: "It was the only way the money conversations happened at all: one talked, one paraphrased, nobody got buried. They used it for the hardest conversation of all, the one where they said it was over.",
      },
      {
        practice: "flooding breaks",
        how: "Money talk flooded Luis in about three minutes flat. The twenty-minutes-and-return rule meant those conversations actually finished instead of detonating, including the last ones.",
      },
      {
        practice: "weekly State of the Union",
        how: "It outlived the marriage. They still hold it every Thursday as co-parents: kids' schedules, school stuff, shared costs, held with more courtesy than most of their married years managed.",
      },
    ],
    where:
      "They divorced in year fifteen and did it the way they never handled the money, honestly and together; the kids have two parents who are kind to each other, and both of them count that as a kind of success.",
  },
  {
    id: "empty-nest",
    title: "The quiet house",
    situation:
      "Their youngest left for college in August, and by October the silence had a weight to it. Ray and Lorraine realized the kids had been the topic, the schedule, and the glue for over two decades. At dinner they sat with a stranger they'd slept next to for thirty years.",
    tags: ["empty nest", "distance", "long marriage"],
    years: "Married 34 years",
    oneView:
      "I looked across the table at a man I have loved my entire adult life and could not think of one sentence that wasn't about the kids. That terrified me more than any fight ever has. I started wondering if we were already finished and just hadn't said it out loud. I didn't want a new husband; I wanted to find the one I already had.",
    otherView:
      "I'm not a talker and I never fooled anyone about that. I show up in gutters cleaned and cars maintained and coffee made; that's been my language for sixty years and it's a real one. So when Lorraine said she was lonely, it landed like being convicted of a crime I didn't know I was committing. I didn't have the words she wanted, and I was ashamed of that, and shame makes a quiet man quieter.",
    turning:
      "They started walking after dinner, twenty minutes around the block, because Ray talks better side by side than face to face. It wasn't a breakthrough; it was a container, and it was repeatable, and that turned out to matter more.",
    whatHelped: [
      {
        practice: "micro-moves",
        how: "Nobody asked Ray to open up on a couch. Coffee on her nightstand, her hand taken at the crosswalk, the walk itself: his first sentences weren't spoken, and Lorraine learned to read them as sentences.",
      },
      {
        practice: "timed uninterrupted turns",
        how: "On the walks, ten minutes each. The no-interruption rule turned out to be the thing Ray had silently wanted for decades; he talks slowly, and for the first time slow got to finish.",
      },
      {
        practice: "appreciation rituals",
        how: "One specific appreciation before bed, out loud, every night. Lorraine discovered Ray had been noticing things about her all along; he had just never once said them.",
      },
    ],
    where:
      "They are dating again in their sixties, awkwardly and on purpose, and the silence in the house has stopped being a verdict and become room.",
  },
  {
    id: "blended-family",
    title: "Two families under one roof",
    situation:
      "Second marriage for both: his teenage sons every other week, her ten-year-old daughter full time. Every discipline call had become a loyalty test, and the fight that scared them was over a curfew, conducted in whispers in the hallway while three kids listened through doors.",
    tags: ["blended family", "step-parenting", "loyalty"],
    years: "Married 7 years",
    oneView:
      "When Derek corrects my daughter, my whole body says intruder before my brain can vote. I defend her instantly, in front of him, and I can see it cut him down in his own kitchen. The truth I didn't want to look at was that I was still running a family of two, me and her, with a man attached. He didn't marry a wife so much as apply for a job I kept refusing to give him.",
    otherView:
      "In one breath I'm told to step up as a father figure, in the next to stay out of it, and I never know which hat I'm allowed to wear. My boys watch me get overruled in front of everyone and lose a little respect for both of us. And when they're cold to Michelle, I freeze, because correcting them feels like choosing her over them, and I've already put them through one broken home. Everyone in this house needed me to pick a side, and every side I picked was wrong.",
    turning:
      "They stopped negotiating in front of the kids. Any disagreement about a kid call got a code phrase, 'later, upstairs', and a united front in the moment; the real argument happened in private, at a standing weekly meeting instead of in the hallway.",
    whatHelped: [
      {
        practice: "weekly State of the Union",
        how: "Every kid issue went to the Sunday meeting: curfews, chores, whose rules apply when. Once there was a guaranteed place for the argument, the hallway stopped being a courtroom.",
      },
      {
        practice: "soft startup",
        how: "'I felt undercut this morning and I need us to be a wall' replaced 'you let her walk all over me'. Complaining about the moment instead of attacking the parenting kept the fights inside this marriage instead of relitigating the old ones.",
      },
      {
        practice: "flooding breaks",
        how: "Step-parenting fights hit old divorce wounds within minutes for both of them. The break-and-return rule kept the argument about the curfew instead of about the exes.",
      },
    ],
    where:
      "The house is not a war zone anymore; it is a negotiation that mostly works, and the kids have stopped checking which parent to play.",
  },
  {
    id: "chronic-illness",
    title: "The diagnosis that moved in",
    situation:
      "After two years of doctors and dead ends, Anne's exhaustion and joint pain finally got a name: lupus. The diagnosis rewrote their division of labor, their income plans, and the retirement they'd been sketching since their thirties. Kofi became a caregiver nobody had trained, and the marriage quietly became a third patient.",
    tags: ["illness", "caregiving", "grief"],
    years: "Married 21 years",
    oneView:
      "I grieve the woman I was, and I watch Kofi grieve her too, which is worse. I hate needing help with jars, with stairs, with the life I used to run one-handed. Some days I'm short with him for no reason he caused, because he is the only safe person to be angry at, and none of this is his fault. The cruelest part is that I need him more than ever at the exact moment I feel least like someone worth needing.",
    otherView:
      "I can't fix it, and fixing things is the only love language I ever spoke fluently. I'm ashamed of how much I miss the old us: the hikes, the plans, the wife who didn't flinch getting out of a chair. And I'm tired, and I can't say I'm tired, because how do you say that to the person who is actually sick? So I said nothing, and did more, and the doing started to feel like duty to both of us, which neither of us wanted.",
    turning:
      "The turn came when they said the forbidden thing out loud: we lost something, and we are allowed to be sad about it together. Once the grief was shared instead of hers to carry and his to manage, they could check it like weather, regularly, instead of pretending the sky was clear.",
    whatHelped: [
      {
        practice: "grief-style naming",
        how: "They listed what the illness took, out loud and specifically: the hiking, the spontaneity, the retirement they had drawn up. Mourning it as a couple beat performing positivity at each other.",
      },
      {
        practice: "speaker-listener structure",
        how: "For the scary conversations: money, care, what happens if it gets worse. The structure kept fear from coming out sideways as snapping, which had become their default.",
      },
      {
        practice: "micro-moves",
        how: "On flare days, connection shrank to the doable: same room, one held hand during the news, a blanket brought without being asked. They decided on purpose that small counts, and then it did.",
      },
    ],
    where:
      "The illness is permanent and the loneliness wasn't; they run a smaller life than the one they planned, and it is genuinely theirs.",
  },
  {
    id: "almost-divorce",
    title: "The lawyer's parking lot",
    situation:
      "After the silent Christmas, June booked a consultation with a divorce lawyer and told Victor about it afterward, flat and calm. She gave it until summer. Both of them now point to that week as the beginning, not the end.",
    tags: ["almost divorce", "contempt", "last chance"],
    years: "Married 17 years",
    oneView:
      "Leaving felt more honest than one more year of pretending. What scared me most was that I wasn't even angry anymore; anger at least still wants something. The lawyer's office made it real, and what I felt in the parking lot afterward wasn't the relief I expected. It was grief, and underneath it one small stubborn wish that he would actually fight for us instead of just objecting to losing.",
    otherView:
      "I knew we were bad; I did not know we were terminal. For years I treated her coldness as the problem instead of as information, and I lost a decade to winning arguments in a marriage I was losing. When she said the word lawyer, I heard everything she had been telling me all at once, like a bill arriving. I was furious at her for going, and more furious at myself that it took a stranger with a retainer to make me listen.",
    turning:
      "There was no grand gesture. They agreed to six months of actual structure: one scheduled conversation a week, written rules for fights, and a real review date in June instead of a vague promise to try. Putting the work on a calendar, with a deadline, is what made trying real instead of theatrical.",
    whatHelped: [
      {
        practice: "flooding breaks",
        how: "Their fights had ended in slammed doors for a decade. The break with a promised return was the first rule they ever kept, and keeping it taught them the other rules might hold too.",
      },
      {
        practice: "speaker-listener structure",
        how: "Artificial, slow, and exactly what they needed: it let June say things Victor had interrupted for seventeen years and made him prove, sentence by sentence, that he had finally heard them.",
      },
      {
        practice: "appreciation rituals",
        how: "One true, specific good thing about each other every day, no matter the mood. It felt absurd for a month; it also starved the contempt that had been running the house.",
      },
    ],
    where:
      "They call it their second marriage, same spouse; it is not the marriage they had at year five, and neither of them wants that one back.",
  },
  {
    id: "desire-gap",
    title: "The gap nobody named",
    situation:
      "Intimacy had gone from weekly to rarely to a subject with a fence around it. Talia stopped reaching after enough polite refusals; Owen felt the pressure and moved further away; each privately decided the other had changed. By year twelve they were affectionate in public and careful strangers in bed.",
    tags: ["intimacy", "desire", "rejection"],
    years: "Married 12 years",
    oneView:
      "Being turned down by a stranger stings; being turned down by your own husband, again, rewires you. I started auditing myself: my body, my breath, what changed. Then I started keeping score, which I'm not proud of, because every 'no' went into a ledger he didn't know existed. I wasn't only missing sex. I was missing being wanted, and I couldn't find a way to say that out loud that didn't sound like an invoice.",
    otherView:
      "My desire didn't vanish; it went quiet under work stress and the feeling of being evaluated every night. The more it mattered to her, the more every evening felt like a test I was probably failing, and you cannot want your way through an exam. Turning away silently felt kinder than explaining, which I now know is exactly backwards. She thought I didn't want her. I didn't want the audition.",
    turning:
      "They took sex off the table for a month, on purpose and out loud, and rebuilt touch with no destination: real kisses, hands held, sitting close. With nothing to pass or fail, touch stopped being a question, and after a while some of the wanting found its own way back.",
    whatHelped: [
      {
        practice: "soft startup",
        how: "Talia's opener changed from 'we never anymore' to 'I miss you, and I'm nervous even bringing this up'. Leading with the nerves instead of the ledger got Owen to stay in the room.",
      },
      {
        practice: "timed uninterrupted turns",
        how: "Ten minutes each on what desire and refusal felt like from the inside. Owen wrote his out beforehand and read it aloud, which they agreed counted fully, and which said more than he ever had.",
      },
      {
        practice: "micro-moves",
        how: "The no-destination touch: the long kiss at the door, a hand on the back while cooking. Small, daily, and pressure-free was the only ground desire could regrow on.",
      },
    ],
    where:
      "The gap never closed all the way, but it stopped being a verdict on either of them; they talk about it now the way they talk about budgets, honestly, on schedule, and as teammates.",
  },
];

export const storiesNote: string =
  "Every couple in these stories is a fictional composite, written to teach what repair looks like in ordinary, repeatable terms; no story describes a real couple or a real person's situation. Nothing here is a testimonial or an endorsement, and Mend labels these as teaching stories wherever they appear.";
