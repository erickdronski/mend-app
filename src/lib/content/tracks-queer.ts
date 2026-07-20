/**
 * Tracks for queer couples. Same structure and voice as tracks.ts.
 *
 * Two things shape this file. First, a lot of the pressure on these
 * relationships is coming from outside them, so the work is naming what is
 * ours and what is the world's before it gets fought out between us. Second,
 * outness is a safety calculation, not a personal-growth milestone, so nothing
 * here treats being further out as being further along.
 *
 * Safety note for anyone editing: threatening to out a partner is a control
 * tactic, not a fight, and it stays in seekHelp. Nothing in this file may be
 * paywalled, softened, or removed.
 */

import type { Track } from "./tracks";

export const queerTracks: Track[] = [
  {
    slug: "outness-gap",
    title: "The outness gap",
    subtitle: "When the two of you are out in different amounts",
    overview:
      "One of you is out almost everywhere. The other is out in some rooms and not others, or in none. That gap is not a character difference, and it is not one of you being braver. It is two different risk calculations, run on two different sets of families, jobs, towns, and histories. The trouble is that the gap does not stay abstract: it shows up in whose photo is on the desk, whose name gets said at the holiday table, who gets introduced as a roommate, and who spends the whole car ride home carrying it. This track is for turning that recurring fight into a plan the two of you make together, against a pressure that mostly is not coming from either of you.",
    feelings: [
      {
        label: "If you are the one who is further out",
        body: "You are probably tired in a specific way: tired of shrinking, tired of the pause before you answer a simple question, tired of watching your life get filed under something smaller than it is. And under the tiredness there is usually a fear you do not like saying out loud, that if you are not worth being claimed, maybe you are not being chosen. That fear is real and it deserves airtime. It is also not the same thing as your partner not loving you, and treating those two as the same is what turns one hard night into a repeating fight.",
      },
      {
        label: "If you are the one who is less out",
        body: "You are running a calculation nobody else in the room can see: a job in a place with no protection you trust, parents whose reaction you already know, a visa, a lease, a kid, a congregation, a family you are not ready to lose yet. You may also be exhausted by being treated as the obstacle in your own relationship, as though the only reason you have not done it is nerve. You get to set the floor on your own disclosure. That is not a veto on your partner's life, and it comes with a real obligation: to keep the conversation open instead of ending it with silence.",
      },
      {
        label: "If neither of you fits the story cleanly",
        body: "Plenty of people live here. You might be bi or pan in a relationship that reads as straight from the outside, so you are out and erased at the same time, and the erasure is oddly harder to name. One of you might be trans, so outness is not one door but many, and it changes shape at work, at the doctor, at the border, in your own family album. Being out to a friend, a boss, and a mother are three different acts with three different prices. Outness is not a ladder, and neither of you is behind.",
      },
    ],
    principles: [
      "The person facing the risk sets the floor on their own disclosure. Nobody else outs them, tests them, or moves the line as leverage in an argument.",
      "Setting the floor is not the same as ending the conversation. The less-out partner owes their partner honesty about what is actually possible, what is genuinely off the table, and what might change.",
      "Sort every problem into ours and theirs before you argue about it. Whose family is hostile is theirs. How the two of you handle that family is ours. Fighting the second as though it were the first is how couples end up blaming each other for the world.",
      "Concealment costs the person doing it, and it also costs the one who has to hold their hand in fewer places. Both bills are real. Neither cancels the other.",
      "Progress here is measured in specific rooms, not in a single announcement. Being out to one cousin, one coworker, or one neighbor is a change worth counting.",
      "There is no deadline set by anyone outside the two of you. Not a friend, not a therapist, not this app, and not a partner who is ready.",
    ],
    sessions: [
      {
        title: "The map of who knows",
        focus:
          "Facts first, feelings later. Build one honest picture of who currently knows what, with no reactions allowed while the list is being made. Most couples find they were each working from a different map.",
        prompts: [
          "Who in my life knows about us, and what exactly do they know?",
          "Where do I edit the story, and what do I say instead?",
          "Which of those rooms did I choose, and which ones just happened by default?",
          "What did you assume about my map that I have never corrected?",
        ],
      },
      {
        title: "What it actually costs each of us",
        focus:
          "Each partner gets the floor for their side of the bill, uninterrupted. The listener's only job is to repeat back what they heard before responding. No comparing whose is heavier.",
        prompts: [
          "What does the editing take out of me on an ordinary Tuesday?",
          "What is the moment in the last year that hurt the most, and what happened right after?",
          "What do I do with that feeling now, and where does it usually leak out?",
          "What have I never told you about this because I thought it would sound like pressure?",
        ],
      },
      {
        title: "The real risks, named plainly",
        focus:
          "The less-out partner walks through the actual stakes, concretely, not as a mood. The point is to move it out of the fog of stubbornness and into a list the two of you can look at together.",
        prompts: [
          "If I were out to my family tomorrow, what specifically do I expect would happen in the first week?",
          "What could I lose that is money, housing, work, safety, or access to someone I love?",
          "Which of those risks have changed since the last time I checked, and which have I never rechecked?",
          "What would have to be true, in my life or the world, for one of these doors to open?",
        ],
      },
      {
        title: "Ours and theirs",
        focus:
          "Take the running list of what is hard and sort it into two columns: pressure coming from outside, and choices the two of you are making. Only the second column is a couples problem. The first one gets a plan, not a verdict.",
        prompts: [
          "What on our list is a thing the world is doing to us, not a thing you are doing to me?",
          "Where have I been treating you as the source of a pain that came from somewhere else?",
          "What do we actually want to do about the outside stuff, as a team?",
          "Where do we need to protect each other better when it hits?",
        ],
      },
      {
        title: "The specific rooms",
        focus:
          "Stop negotiating outness in general and negotiate the next six months of it. Holidays, photos, weddings, funerals, work parties, the group chat, the neighbor who keeps asking. One agreement per room, said out loud.",
        prompts: [
          "For the next family event, what is the story, who tells it, and what happens if someone pushes?",
          "What can be visible in our own home and on our own phones, without exception?",
          "Where do we go afterward, and how do we come back to each other when the night was rough?",
          "What is our exit signal if it stops being safe or one of us is done?",
        ],
      },
      {
        title: "What we want visible",
        focus:
          "The last session is not about hiding. It is about the life the two of you are actually building and where you want it to be seen. Name what already exists, then name what you want next.",
        prompts: [
          "Where do we already get to be all the way ourselves, and how do we protect that?",
          "What is one room, this year, where I want us to be seen, and what would make it possible?",
          "Who has surprised us by being safe, and have we thanked them?",
          "When we look back in five years, what do we want to say we did not let this cost us?",
        ],
      },
    ],
    planSeeds: [
      "A monthly outness check-in, 15 minutes on the calendar, where the map gets updated and the floor can move without a fight",
      "Pre-brief and debrief around any event where the story changes: five minutes before on what we are saying, ten minutes after on how it landed",
      "A standing signal word either of us can use to leave a room, no explanation required and no questions in the car",
      "One weekly hour somewhere nothing has to be edited, whether that is home, a friend's place, or a drive",
      "One visible thing in a space we fully control, chosen together, that says this is real",
    ],
    seekHelp: [
      "Your partner threatens to out you, or hints that they might, to win an argument or keep you from leaving. That is a control tactic, not a fight, and it needs someone outside the relationship. The Trevor Project (thetrevorproject.org) and Trans Lifeline (translifeline.org) are two starting points, and the LGBT National Help Center takes calls from any age.",
      "Your partner monitors your phone, accounts, or whereabouts, or decides who you are allowed to see. Isolation lands harder when the people you could have called are already gone.",
      "A family member's contact has moved past disapproval into threats, showing up, or contacting your job. That is a safety matter, not a relationship matter.",
      "Concealment has turned into panic attacks, drinking to get through family events, not sleeping, or thoughts of ending your life. Individual therapy with a therapist who works with LGBTQ+ clients treats what a conversation between the two of you cannot.",
      "Every version of this conversation now ends in the same ultimatum. A couples therapist can hold a negotiation that has stopped being possible in your kitchen.",
      "You are being pushed toward a disclosure you have not agreed to, by your partner or by anyone else. Bring in a professional before you bring in your family. Mend is a structured conversation tool, not therapy or care.",
    ],
  },
  {
    slug: "chosen-family",
    title: "Chosen family",
    subtitle: "Building a support system when the one you were born into is not it",
    overview:
      "For a lot of couples, the people who were supposed to show up do not. Sometimes it is a clean absence, sometimes it is open hostility, and often it is the harder middle: a family that stays in touch on the condition that certain things are never said. Whatever the shape, the gap does not disappear. It lands on the relationship, because when there is no one else to call, your partner becomes the ride to the airport, the person who sits in the waiting room, the holiday, the emergency contact, and the one who is supposed to absorb the grief about all of it. That is more than any two people can carry alone, and the strain usually shows up as ordinary-looking fights about chores and holidays and who is tired. This track is for naming the load honestly and building a real roster of people around the two of you.",
    feelings: [
      {
        label: "If your family is gone or hostile",
        body: "You have probably learned to say it lightly, because the full version makes people uncomfortable. Underneath, there is a specific loneliness: no one who remembers you as a kid, no one obligated to show up, no default plan for the last week of December. You may also be carrying something you would not say to your partner, which is a fear of needing them too much and using them up. Needing people is not a defect you have to manage quietly. It is what the roster is for.",
      },
      {
        label: "If your family is still there, with conditions",
        body: "This is its own kind of tiring, and it gets less sympathy because from the outside it looks like you have a family. You get contact, and the price is a smaller version of yourself and usually a smaller version of your partner. Every visit involves a decision about what to swallow. You are allowed to keep the relationship and hate the terms. You are also allowed to change the terms, or to stop, and neither choice makes you the bad one.",
      },
      {
        label: "If your family is the warm one",
        body: "When one of you has parents who call and the other does not, the imbalance sits under everything. The partner with the family can start feeling guilty for their own good luck, or defensive when their family gets criticized, or quietly impatient that this is still a thing. The partner without one can feel like a guest in a life they are supposed to be equal in. Neither of you did anything wrong here. What you can do is stop pretending the gap is not there and decide together how to hold it.",
      },
    ],
    principles: [
      "Nobody is anybody's whole family. Two people cannot be each other's parent, sibling, best friend, emergency contact, and holiday, all at once, without something breaking.",
      "Contact with a family of origin is the choice of the person whose family it is, including a choice to keep contact on terms an outsider would not accept. Your partner gets a say in what enters your home together, not in whether you call your mother.",
      "Chosen family is built through repetition, not declaration. It is showing up for the fourth boring thing, not one big night where everyone says they are family now.",
      "Be family back. A roster built only on what you need from people quietly turns into a list of people avoiding you. Reciprocity is the whole engine.",
      "Grief here is not a phase you complete. It comes back on birthdays, weddings, diagnoses, and the first time someone asks who to call.",
      "Fights about holidays and chores are often the load talking. Check for the load before you litigate the dishes.",
    ],
    sessions: [
      {
        title: "The honest inventory",
        focus:
          "Name what is actually missing, in concrete terms rather than feelings. Rides, money in an emergency, a couch to sleep on, someone who remembers your childhood, someone to call at two in the morning. Facts on the table before anybody reacts.",
        prompts: [
          "Who would I actually call at two in the morning, and would they pick up?",
          "What did I grow up expecting family to provide that we do not currently have any source for?",
          "What do I miss that has nothing to do with practical help?",
          "What is the thing about my family that I have never told you the full version of?",
        ],
      },
      {
        title: "Where the load lands",
        focus:
          "Look at what the absence has quietly assigned to each of you. This is not about blame. It is about noticing that one person has been doing the work of five and calling it normal.",
        prompts: [
          "What am I carrying for you that no one else is available to carry?",
          "When was the last time I needed something and did not ask, because I did not want to be one more thing?",
          "Which of our recurring fights, if I am honest, are really about being stretched too thin?",
          "What would it change if we said out loud that this is too much for two people?",
        ],
      },
      {
        title: "The terms of contact",
        focus:
          "For any family still in the picture, get specific about the price of admission. Each partner speaks about their own family. The other listens without prescribing what should happen, especially the word cut.",
        prompts: [
          "What do I have to leave out of myself to stay in contact with them?",
          "What do they get to say about you, or about us, that I have been letting go?",
          "What is one boundary I actually want, and what happens to me if I set it?",
          "What do I need from you before, during, and after contact with them?",
        ],
      },
      {
        title: "Who is actually on the roster",
        focus:
          "Build the real list of people around you, then find the holes. Names, not categories. Most couples discover the list is shorter than they thought and that two people are doing all of it.",
        prompts: [
          "Who has shown up for us more than once without being asked?",
          "Who do we want closer, and what would it take to get from friendly to close?",
          "Where is the hole: practical help, someone older, someone who has done this before, a group we belong to?",
          "Which relationship have we let go quiet that we would be sad to lose?",
        ],
      },
      {
        title: "Being family back",
        focus:
          "The half of this that couples skip. Decide what the two of you offer other people, on purpose, because a chosen family that only receives does not last a decade.",
        prompts: [
          "What are we good at giving, and who could use it right now?",
          "Who came through for us and never got thanked properly?",
          "What could our home be for other people: a standing dinner, a spare room, the place people land?",
          "Where have we been so busy surviving that we stopped being available?",
        ],
      },
      {
        title: "The days that test it",
        focus:
          "Two hard tests: high days and crisis days. Plan both now, while nothing is on fire. If any of the legal pieces apply where you live, note them here and take that part to a lawyer rather than guessing.",
        prompts: [
          "What do we want the December stretch to look like, built by us instead of survived?",
          "If one of us went to the hospital tonight, who gets called, and who is listed on the form?",
          "Which practical protections, if any, do we need to look into for where we live, and who is finding out?",
          "What is our plan for the birthdays and anniversaries nobody else remembers?",
        ],
      },
      {
        title: "The grief that comes back",
        focus:
          "Make room for the part that does not get fixed by a good roster. The goal is for each of you to be able to say it out loud without the other rushing to solve it.",
        prompts: [
          "What do I still grieve about the family I came from?",
          "What sets it off in me that you might not see coming?",
          "When it hits, what do I want from you: company, distraction, space, or just being believed?",
          "What have we built that I am genuinely proud of, that nobody handed us?",
        ],
      },
    ],
    planSeeds: [
      "A standing monthly dinner or call with one person outside the two of you, on the calendar, that does not depend on anybody feeling social that week",
      "A written emergency list on both phones: who to call, in what order, and who to tell what",
      "A pre-visit and post-visit ritual around any contact with a family of origin, agreed in advance, including a way to leave early with no argument",
      "A December plan made in October, built around what the two of you actually want instead of what is left over",
      "One deliberate act of showing up for someone else each month, so the roster runs both directions",
    ],
    seekHelp: [
      "A family member's contact has escalated into threats, stalking, showing up uninvited, or contacting your workplace. That is a safety issue and it needs police, a lawyer, or an advocate, not a better conversation.",
      "Your partner is steering you away from your friends or your chosen family, or making the cost of seeing them high enough that you stopped. Isolation is a control tactic, and it works fastest on people whose family is already gone.",
      "Contact with your family reliably leaves you unable to function for days, or brings back memories of childhood harm. Trauma-focused individual therapy is the right tool for that, and it is not something a couple can process alone.",
      "Either of you is drinking or using more to get through family contact or the holidays, or is having thoughts of not wanting to be here. Get individual help now. The Trevor Project (thetrevorproject.org), Trans Lifeline (translifeline.org), and the LGBT National Help Center are places to start if you want someone who will not need the basics explained.",
      "You are being asked to care for a parent who harmed you, and the two of you cannot get through the conversation without it turning into a fight about loyalty. A therapist can hold that in a way this app cannot.",
      "One of you has become the other's only relationship, and every attempt to widen the circle ends in a fight. That pattern needs a professional set of eyes. Mend is a structured conversation tool, not therapy or care.",
    ],
  },
];
