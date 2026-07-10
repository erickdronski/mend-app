/**
 * Additional composite teaching stories.
 *
 * These widen the representation of the core set: same-sex, interfaith,
 * working-poor, loudly expressive, and long-caregiving marriages. Like the
 * originals, every couple here is fictional: a composite written to show what
 * repair actually looks like in ordinary, repeatable terms. None of these are
 * real people, real cases, or testimonials, and the app labels them that way.
 * The situations are common; the couples are invented.
 */

import type { Story } from "./stories";

export const extraStories: Story[] = [
  {
    id: "same-sex-labor",
    title: "The friend at the table",
    situation:
      "Andre and Theo adopted Malik at four, and within a year Andre was running the whole house: the paperwork, the pickups, the bedtime that only worked when he did it. Theo worked longer and longer shifts, they had not touched each other in months, and at every family dinner Theo's mother still introduced Andre as Theo's roommate.",
    tags: ["same-sex", "division of labor", "in-laws", "intimacy"],
    years: "Married 6 years",
    oneView:
      "I became the mother in a house with two fathers, and nobody had signed me up for that. I track Malik's whole life in my head while Theo tracks his shift schedule, and by the time he's home I'm too used up to be anything but the manager handing off. And then his mother calls me his roommate at the table and he says nothing, and I sit there erased in two directions at once, at home and in front of the family. I didn't marry a husband to become the help.",
    otherView:
      "I tell myself I'm providing, that the extra shifts are love, and I don't look too hard at how much that leaves Andre holding. My mother has never once said the word husband about us, and every time I let it slide because correcting her feels like starting a war at dinner, and I've been avoiding that war since I was nineteen. I can feel Andre going quiet next to me, further away every month, and I keep deciding to fix it later. Later has been a long time now.",
    turning:
      "At the next dinner Theo's mother called Andre the roommate again, and Theo said, plainly, 'Andre is my husband, Mom,' and let it sit there. It changed nothing about the brutality of the schedule, but Andre heard himself named out loud for the first time in years, and Theo learned the war he'd feared was one sentence long.",
    whatHelped: [
      {
        practice: "soft startup",
        how: "Andre's opener moved from 'you do nothing here' to 'I'm carrying the whole house and I need a partner, not a boarder.' Naming the need instead of the failure got Theo to hear it as an invitation back in rather than a verdict.",
      },
      {
        practice: "weekly State of the Union",
        how: "Thirty minutes on Sunday to split the house into whole domains, not scattered chores, and to agree on the exact words each of them would use with Theo's mother. Deciding the script together turned the in-law problem from Andre's private humiliation into something they handled as a unit.",
      },
      {
        practice: "micro-moves",
        how: "With intimacy long dead, they rebuilt from almost nothing: a real kiss at the door, sitting on the same couch, a hand on the back while Malik brushed his teeth. Small and daily and unpressured was the only ground touch could grow back on.",
      },
    ],
    where:
      "The schedule is still hard and the intimacy is returning slowly and unevenly; what's solid again is that Andre knows he is married, at home and at his mother-in-law's table.",
  },
  {
    id: "interfaith-holidays",
    title: "Whose holidays, whose kids",
    situation:
      "Yusuf grew up Muslim and Hannah grew up Christian and stopped practicing years ago, and while they were dating none of it seemed to matter. Then the kids came, and Ramadan and Christmas turned into a quiet tug of war, with both sets of grandparents pulling from behind. They never yelled about it; they just went careful and cold every December and every spring.",
    tags: ["interfaith", "religion", "holidays", "extended family"],
    years: "Married 8 years",
    oneView:
      "My faith went quiet during our twenties and I let Hannah believe it always would, which wasn't a lie exactly, but it wasn't the whole truth either. Now there are kids, and my parents ask what mosque they'll know, and I feel something in me I thought I'd outgrown, wanting them to have what I had. I don't want to erase Hannah's Christmas, I just don't want to disappear inside it. And I don't know how to say any of that without sounding like I'm reneging on the deal she thought we made.",
    otherView:
      "I'm not even religious, so being cast as the Christian in this house is strange, because Christmas to me isn't theology, it's my grandmother's kitchen and being seven years old and safe. When my mother asks about baptism I feel the same pull Yusuf feels, and I resent that it makes me the problem. I kept thinking, we agreed we were easygoing about this, so why does every holiday feel like a test I'm failing? We were both quietly promising our parents things we hadn't told each other.",
    turning:
      "They gave up trying to win the argument about what the kids would believe and started naming what each tradition was actually protecting, which turned out to be belonging and a parent's face and a childhood smell, not doctrine. Yusuf began reading the kids one story from each side at bedtime, with Hannah there, and that nightly hour became the model for the whole thing.",
    whatHelped: [
      {
        practice: "soft startup",
        how: "'You're letting your mother run our family' became 'I'm scared of losing something I didn't know I still wanted.' Leading with the fear instead of the accusation was the only way either of them stayed in the room past the first sentence.",
      },
      {
        practice: "speaker-listener structure",
        how: "For the big values conversation, one talked and one paraphrased before answering, so that 'raise them Muslim' and 'keep my Christmas' both got heard instead of buried. It was slow and a little stiff, and it was the first time in eight years neither of them was just waiting to rebut.",
      },
      {
        practice: "weekly State of the Union",
        how: "They put both calendars on the table in advance, decided together how each holiday would actually run, and agreed on what they would each say to their own parents. Facing the grandparents as a united front, planned ahead, kept the extended-family pressure from landing inside the marriage.",
      },
    ],
    where:
      "Neither set of grandparents is fully satisfied and probably never will be; the kids are growing up inside both traditions, and the couple has stopped treating that as a compromise nobody won and started treating it as simply their family.",
  },
  {
    id: "opposite-shifts",
    title: "The relay race",
    situation:
      "Danny works nights loading trucks and Rosa works days as a home health aide, and for most of the week the only time they overlap is a ten-minute handoff in the driveway with a kid and a car seat between them. The money is always short and the shifts can't change, so the marriage runs like a relay: baton, keys, go. They love each other and they almost never see each other, and the difference had started to feel the same as not caring.",
    tags: ["money", "shift work", "logistics", "exhaustion"],
    years: "Married 5 years",
    oneView:
      "I married a man and I ended up with a co-worker I hand a baby to in a parking lot. By the time I've done ten hours of other people's needs and come home to ours, I've got nothing warm left in me, and neither does he, and we mistake each other's empty for cold. I catch myself furious about the dishes when what I actually am is lonely and broke and tired down to the bone. It's nobody's fault, which is almost worse, because there's no one to be mad at except the schedule.",
    otherView:
      "I sleep while she's awake and I work while she sleeps, and I feel like a ghost in my own house, the guy whose side of the bed is always cold at the wrong times. I know she's carrying more, and I can't fix the money and I can't fix the hours, so I go quiet, and I know the quiet reads as not caring. I'm not gone because I don't love her. I'm gone because we sold our hours to keep the lights on and there aren't any left for us.",
    turning:
      "They put a cheap notebook on the counter and started leaving each other a few lines at every handoff, nothing romantic, just proof of contact across a day they'd never share. And they walled off the one window they did overlap, Sunday morning, and refused to spend it on anything but each other and the week ahead.",
    whatHelped: [
      {
        practice: "micro-moves",
        how: "Six seconds at the driveway handoff, a line in the notebook, one text sent into the middle of the other's shift. When time is the thing you don't have, they learned that seconds honestly count, and that a couple can stay a couple on almost none of them.",
      },
      {
        practice: "soft startup",
        how: "'You never help' became 'I'm running on empty and I need to hear you're still in this with me.' Naming the exhaustion instead of firing it as an accusation kept the ten minutes they had from turning into a fight.",
      },
      {
        practice: "weekly State of the Union",
        how: "Sunday morning, the one overlap, thirty minutes on the week and the money before anything else could eat it. Planning the logistics on purpose, together, meant the driveway handoffs stopped being where they tried to negotiate a whole marriage in ninety seconds.",
      },
    ],
    where:
      "The shifts are the same and the money is still tight and probably will be for a while; what changed is that they stopped reading tired as unloved, and the notebook keeps them in one marriage even on the days they never lay eyes on each other.",
  },
  {
    id: "loud-repair",
    title: "Zero to a hundred",
    situation:
      "Rafael and Camila fight loud: raised voices, slammed cabinet doors, the whole house knowing. Twenty minutes later they're back in the kitchen cooking, hands on each other, fine again, and mostly that has worked for fifteen years. What stopped working was the moment in the heat when one of them reached for the cruelest thing they could find, and the day they noticed their oldest kid flinch at the volume.",
    tags: ["conflict", "expressive", "repair", "reactivity"],
    years: "Married 15 years",
    oneView:
      "In my family a loud house was a living house, and silence was the thing you feared, because silence meant somebody had really given up. I don't want to be told to lower my voice like my feelings are a problem to be managed. But I know the second I go for the lowest blow, I watch it hit Rafael's face and I hate myself before the echo dies. The volume was never the problem. The knife was.",
    otherView:
      "I'm loud too, I love that we're loud, it's how I know we're both still in it. But there's a line where my heat turns into a wall I can't get back over for a whole day, and the making up with food and hands is real, and it also lets us skip ever saying what the fight was even about. Then I catch our kid going still when we start up, the way I used to go still, and something in me says, not this, not for them.",
    turning:
      "They made up a word, a silly family word, that either of them could yell to call a pause, and they agreed out loud that yelling it was not surrender, it meant 'I love you too much to say the next thing.' They still came back loud twenty minutes later, but now they came back and actually finished the fight, usually over the food.",
    whatHelped: [
      {
        practice: "flooding breaks",
        how: "The pause was never about becoming calm people, which they are not and don't want to be. It was twenty minutes to keep the unforgivable sentence unsaid, with a promise to return, and returning loud was allowed as long as they returned kind.",
      },
      {
        practice: "soft startup",
        how: "They learned to open a fight without the nuclear first line, to say 'this one really got me' instead of leading with the worst accusation at full volume. Same heat, same voice, just not setting the house on fire in sentence one.",
      },
      {
        practice: "appreciation rituals",
        how: "They already repaired with food and touch, so they added words to it: naming, out loud and yes still loud, one specific thing they loved about each other once the fight cooled. Formalizing what they were already good at gave the making-up something to say, not just something to cook.",
      },
    ],
    where:
      "They fight loud to this day and always will, and neither wants a quiet marriage; what left the house was the below-the-belt hit and the kid's flinch, and the food now comes with the actual conversation attached.",
  },
  {
    id: "long-caregiving",
    title: "The nurse, the patient, and the two of them",
    situation:
      "Vernon was diagnosed with Parkinson's nine years ago, and Gloria has been his caregiver for most of the decade since. Somewhere in the buttoning of shirts and the counting of pills and the long slow list of things his hands stopped being able to do, the husband and wife underneath the patient and the nurse had almost disappeared. They still loved each other; they just could not remember the last time they had been a couple instead of a case.",
    tags: ["illness", "caregiving", "identity", "intimacy", "long marriage"],
    years: "Married 29 years",
    oneView:
      "I have been a nurse for so long I forgot I was ever a wife, and I feel guilty even saying that out loud. Every time I touch him now it's to fasten something or lift something or hand him a pill, and I miss being touched back by a man instead of managed by a schedule. I have a whole life that shrank down to his appointments, and I'm ashamed of wanting any of it back, because he's the one who's sick, not me. Needing more than this feels like a betrayal of a man who would give it to me if his body would let him.",
    otherView:
      "I used to be the one who reached for her, and now I'm a line on her to-do list, the heaviest one. My hands don't do what I tell them, and neither does the future we drew up, and the worst part isn't the tremor, it's being received all day and never getting to give. I watch her disappear into taking care of me and I grieve her too, the wife I turned into staff. I don't want to be nursed. I want, for ten minutes, to be her husband again.",
    turning:
      "They made one rule: the first ten minutes after the evening pills were off limits to the illness, no symptoms, no schedule, just the two of them on the porch, and Vernon would ask about Gloria's day for once instead of the other way around. It didn't slow the Parkinson's by a single day, but it gave the marriage a standing ten minutes that belonged to no one's diagnosis.",
    whatHelped: [
      {
        practice: "grief-style naming",
        how: "They said out loud, specifically, what the illness had taken: the dancing, his steady hands, the retirement they'd sketched, the version of her that had her own days. Mourning it together as a couple beat the years each had spent privately pretending it didn't hurt.",
      },
      {
        practice: "micro-moves",
        how: "They rebuilt touch that wasn't a task: a held hand that wasn't steadying him, sitting close for no medical reason, a kiss that fastened nothing. To make room for it they finally accepted a few hours of outside home help each week, so Gloria could be a wife in the gaps instead of only a nurse.",
      },
      {
        practice: "appreciation rituals",
        how: "Each named one thing about the other that had nothing to do with the illness: Vernon calling Gloria a woman and not a caregiver, Gloria naming the husband still fully there inside the patient. It reminded them both that two whole people were still in the house, not just a role and its shift.",
      },
    ],
    where:
      "The Parkinson's keeps advancing, as it will, and no ten minutes on a porch changes that; what they got back is the marriage underneath the caregiving, and some evenings now they are simply a husband and a wife again.",
  },
];

export const extraStoriesNote: string =
  "Like the others, every couple here is a fictional composite written to teach what repair looks like in ordinary terms; none of them is a real couple, a testimonial, or a case study, and Mend labels them as teaching stories wherever they appear.";
