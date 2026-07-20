/**
 * Composite teaching stories for relationships the first two sets miss.
 *
 * These cover people who are not married and may never choose to be: dating
 * couples, couples living in different cities, queer couples at different
 * places in being out, co-parents who are no longer partners, couples who
 * broke up and came back, neurodivergent pairings, couples under family
 * pressure about who they picked, and couples rebuilding after addiction.
 *
 * Same rules as the other sets. Every couple here is fictional: a composite
 * written to show what repair actually looks like in ordinary, repeatable
 * terms. None of these are real people, real cases, or testimonials, and the
 * app labels them that way. The situations are common; the couples are
 * invented. Nothing here is therapy, a diagnosis, or treatment advice, and a
 * few of these couples needed outside help that no app can replace.
 */

import type { Story } from "./stories";

export const relStories: Story[] = [
  {
    id: "moving-in",
    title: "The lease that meant something else",
    situation:
      "Nadia's lease was up in ninety days and Cole still had not said yes or no. They had been together two years and spent most nights in one apartment or the other, so on paper the decision was about rent. It had stopped being about rent around week three.",
    tags: ["dating", "moving in", "commitment", "timelines"],
    years: "Together 2 years",
    oneView:
      "I am not asking him to marry me. I am asking him to sign a piece of paper that says he expects to still want this in a year, and every time he goes quiet I hear the answer under the answer. I have started reading everything as evidence: how long he takes to reply, whether he says our weekend or my weekend. I hate who this is making me. I would rather hear a clean no than spend another month decoding a maybe.",
    otherView:
      "I want her. That part is not the question. What I cannot say out loud without sounding like a coward is that the last time I moved in with someone it took me eleven months and a lawyer to get out, and I lost the apartment and most of my savings doing it. When she asks about the lease my body reacts before my opinion does. Every time I hesitate she hears doubt about her, and it is not about her, and I have not found the words to prove that.",
    turning:
      "They split one question into two: do we want a shared life, and are we ready to be on the same lease in ninety days. Cole could answer the first one immediately and honestly. Once the two questions stopped being the same question, the second one got much less frightening to talk about.",
    whatHelped: [
      {
        practice: "soft startup",
        how: "Nadia's opener went from 'so are we doing this or not' to 'I want to live with you and I am scared of what your silence means'. Leading with the fear instead of the ultimatum kept Cole from arguing with an accusation instead of answering a question.",
      },
      {
        practice: "timed uninterrupted turns",
        how: "Fifteen minutes each, no rebuttal. It was the first time Cole told the whole story of the last move-in, start to finish, without Nadia jumping in to say she was not that person. Hearing all of it changed what his hesitation meant to her.",
      },
      {
        practice: "weekly State of the Union",
        how: "Thirty minutes on Sunday for the practical parts: money, space, what each of them needs alone time to survive, what happens if it does not work. Putting the hard logistics on a schedule stopped them from ambushing each other with the topic at midnight.",
      },
    ],
    where:
      "They did not move in. Nadia renewed for a year, they set a real check-in date in the spring, and Cole started paying down the old debt so a shared lease would not sit on top of it. Both of them describe this as unfinished, not solved, and neither of them is pretending otherwise.",
  },
  {
    id: "long-distance",
    title: "Six hundred miles and a nightly call",
    situation:
      "Ife took a job in another city eighteen months ago and Marcus stayed for his. They call every night at nine, which started as a lifeline and had slowly turned into an obligation neither of them would admit to resenting. Nobody had said out loud when, or whether, this ends.",
    tags: ["long distance", "loneliness", "scheduling", "uncertainty"],
    years: "Together 3 years, 18 months of it in different cities",
    oneView:
      "I have a whole life here that he only ever hears about in summary. By nine at night I have already had the day, and the call is where I report it, and reporting is not the same as being known. Meanwhile I am the one who books the flights, counts the weeks, and asks the hard question about what happens next. It is exhausting being the only person in the relationship who seems to be keeping time.",
    otherView:
      "Nine o'clock arrives when I am at my absolute worst, and I show up flat and half there, and I can hear her hearing it. The truth is that a scheduled call every single night started to feel like a shift I clock into, and I felt like a monster for thinking that. And every time she asks about the plan, I do not have one, because the honest answer is that leaving my job might sink me and I have not been able to say that without it sounding like I am choosing work over her.",
    turning:
      "They stopped defending the nightly call and redesigned the whole thing: two short calls a week, one long unhurried one on Sunday, and a lot more small contact in between. The change that mattered more was agreeing to put a real decision date on the calendar rather than letting the distance renew itself by default.",
    whatHelped: [
      {
        practice: "micro-moves",
        how: "A photo of nothing important, a voice note on the walk home, watching the same episode on the phone in silence. Small and daily beat long and dutiful, and it gave them the texture of a shared week instead of a nightly summary of two separate ones.",
      },
      {
        practice: "weekly State of the Union",
        how: "The Sunday call got a first ten minutes with an actual agenda: the week ahead, money for flights, and where each of them stood on the move. Having a fixed place for the big question kept it from leaking into every ordinary conversation.",
      },
      {
        practice: "soft startup",
        how: "Marcus learned to open with 'I am running on empty tonight and I still want to talk, can it be short' instead of going quiet and letting Ife guess. Naming the state up front stopped Ife from reading tiredness as fading interest.",
      },
    ],
    where:
      "Still apart. Marcus is interviewing in her city and has been told nothing is likely before spring, and they have agreed on what they will decide in June if nothing has changed. Both of them say the distance is easier and the uncertainty is not.",
  },
  {
    id: "outness-gap",
    title: "Different amounts of out",
    situation:
      "Wren and Marisol have been together four years. Marisol is out to everyone: family, work, the group chat, her landlord. Wren is out to friends and to nobody in the small town they grew up in, including two parents who still ask, at every holiday, whether there is anyone special yet.",
    tags: ["queer", "outness", "family", "safety"],
    years: "Together 4 years",
    oneView:
      "I get introduced as the friend, and I smile, and I pass the potatoes. Four years of Christmases where I am a houseguest in the life I actually live. The part I have never been able to say cleanly is that it is not only unfair, it makes me doubt the whole thing: if I am unspeakable at that table, what am I the rest of the year. And then I feel like a bully for wanting her to do the one thing that costs her everything and costs me nothing.",
    otherView:
      "She thinks I am ashamed of her. I am terrified of my father. Those are not the same thing and I have never been able to make the difference land. My town is small, my parents' whole world is a church and a street, and I have watched exactly one person come out here and lose all of it. Some days I am halfway up the stairs to say it and my hands stop working. Every time Marisol asks when, I hear a clock, and the clock makes me slower, not faster.",
    turning:
      "They stopped treating the closet as a referendum on the relationship. The timing of Wren's coming out stayed Wren's decision, because it is Wren's safety and Wren's family. What changed is that they got specific about everything else: which rooms they walk into as a couple, which holidays they simply skip, and what Wren says instead of nothing when the friend introduction happens.",
    whatHelped: [
      {
        practice: "timed uninterrupted turns",
        how: "Fifteen minutes each with no rebuttal. Marisol finally heard the whole fear rather than the summary of it, and Wren heard four years of small erasures counted out one by one instead of arriving as one big accusation.",
      },
      {
        practice: "grief-style naming",
        how: "They said out loud what the gap actually costs, specifically: the photos that never get posted, the hospital form that would have said friend, the wedding they cannot plan out loud. Naming it as a shared loss stopped it from being Marisol's complaint and Wren's failure.",
      },
      {
        practice: "transparency agreements",
        how: "Nothing about their life gets hidden from Marisol to protect the secret, and Wren tells her in advance which rooms are which. Marisol also chose which events she will not attend anymore, which is her call to make and did not get argued about.",
      },
    ],
    where:
      "Wren told one sister in March and it went better than either of them expected, and the parents still do not know. They have no date and they have stopped pretending a date would fix it. Marisol skipped last Christmas and says she would make the same choice again.",
  },
  {
    id: "coparent-alliance",
    title: "Not partners, still parents",
    situation:
      "Dana and Ross separated two years ago after nine years together. They were never married, which meant the split had no legal script and every single arrangement had to be argued into existence. Their eight-year-old had become the wire that every message traveled down.",
    tags: ["co-parenting", "separation", "conflict", "kids"],
    years: "Together 9 years, co-parenting for 2",
    oneView:
      "He gets to be the fun one. He does two weekends a month and takes her to the arcade, and I do homework, dentists, the meltdown at bedtime, and the paperwork nobody sees. Then she comes home and tells me what Dad lets her do. I know I am short with him in front of her and I am not proud of it, and some days the anger is the only thing holding the whole schedule together.",
    otherView:
      "I get corrected in front of my own daughter about how I cut her food. Every plan I make gets rewritten, and after a while I stopped proposing things, which she reads as me not caring. The truth is I ache in that apartment when she is not there and I have never told Dana that, because the last time I said something soft it came back at me in an argument three weeks later. So I keep it to logistics and she calls that cold.",
    turning:
      "They stopped trying to be friendly and started trying to be reliable, which turned out to be the thing the kid actually needed. They wrote the whole arrangement down: the schedule, the handoff times, who pays for what, who calls the school. Anything not in the document waits for the Thursday meeting instead of getting fought out at the front door.",
    whatHelped: [
      {
        practice: "weekly State of the Union",
        how: "Thirty minutes every Thursday by phone, agenda only: the week ahead, school, money, medical. It is deliberately businesslike. Having a guaranteed slot is what finally got their daughter out of the middle of the conversation.",
      },
      {
        practice: "speaker-listener structure",
        how: "For the arguments that still detonate, one talks, one paraphrases back before answering. Slow and artificial, and the only format in which either of them can hear the other say something critical without going to war.",
      },
      {
        practice: "flooding breaks",
        how: "Either one can end a call with 'I am done for tonight, I will call you tomorrow at seven'. The rule is that the return actually happens. Keeping the return is what made the break something other than another door slammed.",
      },
    ],
    where:
      "Most weeks it runs. It still breaks around holidays and it broke badly when Ross introduced a new partner without warning. They are not friends, they are a functioning alliance, and their daughter has stopped asking each of them what the other one said.",
  },
  {
    id: "second-try",
    title: "The second first year",
    situation:
      "They broke up in the spring after a year of the same fight, spent eight months apart, and got back together in the winter after a long conversation on a curb outside a party. Nothing about why it ended had been solved. They had simply missed each other enough to try again.",
    tags: ["reconciliation", "breakup", "trust", "old patterns"],
    years: "Together 5 years with an 8-month break",
    oneView:
      "I want to be all the way back in, and I keep waiting for the ground to give out. The old fight has not happened yet and I can feel it out there, and I find myself managing him so it never starts, which means I am not actually here, I am on guard. Everyone in my life thinks I am being naive for taking him back, so I have stopped telling them when things are hard, which means I am carrying this one alone.",
    otherView:
      "I did the work in those eight months and there is no way to prove it except over time, which is exactly the currency I do not have with her yet. Every time I get something right I want it counted, and it does not get counted, and then I get resentful, which is precisely the thing that ended us. I also know she is waiting for me to be the old version, and some days I can feel myself becoming him just from being watched for it.",
    turning:
      "They stopped calling it getting back together and started treating it as a different relationship with the same two people. They wrote down what actually broke it: not the surface fight, but the pattern underneath it, and each of them named the specific behavior they owned. They also named, honestly, what would end it again, so neither had to guess.",
    whatHelped: [
      {
        practice: "soft startup",
        how: "The old fight opened with a verdict about character. Now it opens with 'here is the thing I noticed and here is what it did to me', which is smaller, slower, and does not require anyone to be the villain in the first sentence.",
      },
      {
        practice: "speaker-listener structure",
        how: "Reserved for the recurring fight, the one with eight months of evidence attached. Making each of them repeat the other's point before answering stopped them from having the same argument they had already had forty times.",
      },
      {
        practice: "appreciation rituals",
        how: "One specific thing each day, said out loud, about what the other actually did. It gave the change somewhere to land. Effort that nobody notices does not survive very long, and both of them had run out of it once already.",
      },
    ],
    where:
      "Eleven months in. The old fight has happened twice and it ended in an hour both times instead of a week. They are careful with each other in a way that is part tenderness and part vigilance, and neither of them can tell yet which one it will settle into.",
  },
  {
    id: "wiring-gap",
    title: "Two brains, one kitchen",
    situation:
      "Tomás is autistic and Rhea has ADHD, both diagnosed as adults, and for six years they had been explaining themselves to each other in the wrong language. The fights were never about the dishes. They were about what it means when someone says they will do a thing and then does not.",
    tags: ["neurodivergent", "ADHD", "autistic", "communication"],
    years: "Together 6 years",
    oneView:
      "I say a thing once, plainly, and it is true when I say it, and then it does not happen, and I do not know how to hold that. After a full day of people I need an hour where nothing is asked of me, and when she comes in bright and talking I go flat, and she reads flat as angry. I am not angry. I am out of capacity. And every time I explain that in the exact same words, she hears a script instead of a person, and I do not have another set of words.",
    otherView:
      "I meant it. I always mean it. Then the thing falls out of my head somewhere between the hallway and the kitchen, and by the time he brings it up I already feel so much shame that I come out swinging. And when he goes quiet and blank on me at the door, my whole body says he is done with me, because that is what a blank face has always meant to every other person I have ever loved.",
    turning:
      "They stopped treating the differences as character flaws to be corrected and started designing around them. Requests get made explicitly and written down where Rhea will actually see them. Tomás gets a stated decompression hour that is protected in advance rather than defended in the moment, and he says the words 'I am out of capacity, not upset' rather than assuming a blank face reads as neutral.",
    whatHelped: [
      {
        practice: "soft startup",
        how: "'The dishes are still there and I am trying not to make it mean something about you' replaced the sigh from the doorway. Rhea could hear a complaint about a sink. She could not hear a verdict about whether she is a functional adult.",
      },
      {
        practice: "micro-moves",
        how: "They built a set of low-cost signals: a hand on the shoulder for hello when talking is too much, a two-word text at lunch, a specific song that means come sit with me. Small and unambiguous beat warm and implied, for both of them.",
      },
      {
        practice: "weekly State of the Union",
        how: "Twenty minutes on Sunday with an actual written list, because a shared memory of what was agreed had never once existed. The list is the point. It moved follow-through out of the space where it kept being read as proof of love.",
      },
      {
        practice: "flooding breaks",
        how: "Either of them can call a break with a return time, and shutdown counts as flooding just as much as shouting does. The return being kept is what taught Rhea that a quiet Tomás is not a leaving Tomás.",
      },
    ],
    where:
      "The systems work until either of them is depleted, and then they stop working, and both of them have gotten better at noticing that inside a day instead of a month. Nothing about how they are wired changed. What changed is that they stopped billing each other for it.",
  },
  {
    id: "intercultural-pressure",
    title: "Whose family is it tonight",
    situation:
      "Leila's parents left Lebanon in their twenties and had a fairly specific idea of who she would end up with. Nico's mother, in Buenos Aires and then in New Jersey, had her own. Three years in, most of their fights started with a phone call from someone else's mother and ended with the two of them shouting at each other.",
    tags: ["intercultural", "family pressure", "in-laws", "boundaries"],
    years: "Together 3 years",
    oneView:
      "My mother has not asked me a direct question about him in a year, which in my family is a sentence, not an oversight. I go to Sunday lunch and get asked how work is going in a tone that means when are you going to be serious. Then I come home carrying all of it and Nico wants to know why I did not defend him, and I did not defend him because I was busy surviving the room. I am tired of being the border between two countries that will not talk to each other.",
    otherView:
      "I have been with her for three years and I have been in her parents' house four times. My mother asks why they have never invited us properly, and I make an excuse for people who have never made one for me. What actually gets me is not her family. It is watching Leila shrink two sizes on the drive over. I do not need them to love me. I need to stop being a topic that has to be managed.",
    turning:
      "They stopped negotiating over whose family was worse and each took their own. Leila handles her parents, Nico handles his mother, and neither asks the other to fight a battle in a house where they have no standing. They also decided together, in advance, what they will and will not attend, so the decision is never made under pressure in a hallway.",
    whatHelped: [
      {
        practice: "family boundary lines",
        how: "Each person delivers the hard message to their own family, in their own language, at their own pace. The rule removed the loyalty test entirely: neither of them is ever asked to choose between a partner in the room and a parent on the phone.",
      },
      {
        practice: "soft startup",
        how: "'That lunch was hard and I need twenty minutes before we talk about it' replaced walking through the door already fighting. Most of their worst arguments had been happening in the first ninety seconds of getting home.",
      },
      {
        practice: "speaker-listener structure",
        how: "Used for the conversations about culture and children and where a wedding would even happen. One talks, one repeats it back. It slowed things down enough that neither of them could turn the other into a stand-in for a parent.",
      },
      {
        practice: "weekly State of the Union",
        how: "A standing slot for the calendar of obligations: which events, which trips, which calls. Deciding in advance and together turned the invitations from ambushes into logistics.",
      },
    ],
    where:
      "Leila's father still has not said Nico's name. Her mother, unexpectedly, calls him now. The two of them stopped waiting for permission to build a life and started building it, and they both say the grief about the parents who are not coming around is real and does not have a fix.",
  },
  {
    id: "recovery-trust",
    title: "Fourteen months and counting",
    situation:
      "Ben has been sober fourteen months after a long stretch that cost him a job, a car, and most of what Aliyah thought she knew about him. He is in a program and sees a counselor. The drinking stopped over a year ago. The relationship had not caught up.",
    tags: ["recovery", "addiction", "trust", "rebuilding"],
    years: "Together 12 years",
    oneView:
      "Everyone tells me how well he is doing, and he is, and I am the only person who remembers what the last five years actually looked like. I still check his eyes when he walks in. I still smell the air in the car. Being braced became a personality, and I cannot put it down on command, and when he asks me to trust him it lands like being asked to volunteer for it again. I am proud of him and I am not safe yet, and both of those are true today.",
    otherView:
      "I do the work every day and I do not get to be finished, and some part of me keeps waiting to be told the debt is paid. It is not going to be told to me. What I have had to accept is that fourteen months of me being sober is not fourteen months of her being safe, because she spent the first several of them waiting for it to fall apart. I lost the right to be believed. I did not lose the ability to be consistent, and consistent is the only thing I actually have to offer.",
    turning:
      "The turn was Ben offering structure instead of asking for trust. He shares his schedule, names the hard nights before they arrive, and tells her when a craving shows up rather than after it passes. Aliyah agreed to stop running the surveillance she had been running privately, and told him directly what she was doing instead of checking silently.",
    whatHelped: [
      {
        practice: "outside support first",
        how: "The program, the sponsor, and the counselor are the backbone, and none of that is the relationship's job. They are explicit that the couple work sits on top of the recovery work and is not a substitute for it, for him or for her. Aliyah has her own support, which she did not have for the first ten years.",
      },
      {
        practice: "transparency agreements",
        how: "Location, schedule, money, all open, and offered by him rather than demanded by her. The information mattered less than the fact that he kept volunteering it without being asked, week after week, on days when nothing was wrong.",
      },
      {
        practice: "timed uninterrupted turns",
        how: "Twenty minutes where Aliyah gets to say what the years were like, with real answers and no defense. It has a container on purpose, so the past has a place to be spoken about without owning every evening they have left.",
      },
      {
        practice: "a written plan for the bad night",
        how: "They wrote down, while things were calm, exactly what happens if he drinks: who he calls, where he goes, what she does, what she does not do. Having it on paper meant neither of them has to invent a plan in the worst hour of the worst day.",
      },
    ],
    where:
      "Fourteen months and counting is exactly what it says. Nobody in this story is calling it fixed. Aliyah checks the air in the car less often than she did, Ben has stopped asking to be told the debt is paid, and they both talk about it as something they are doing rather than something they did.",
  },
];

export const relStoriesNote: string =
  "Every couple in these stories is a fictional composite, written to teach what repair looks like in ordinary, repeatable terms; none of them is a real couple, a real case, or a testimonial, and Mend labels them as teaching stories wherever they appear. These stories are educational, not therapy, and a few of these couples needed outside help that no app replaces.";
