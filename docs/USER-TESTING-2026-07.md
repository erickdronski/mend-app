# Mend user testing: 17-persona panel + IA audit (July 2026)

Method: 17 simulated testers read the real screen code and content and walked six
end-to-end flows in character (first open, Space setup, Journey stage 1, a full
guided session, their most-relevant surface read completely, settings/safety/privacy).
Sixteen were personas spanning age, gender, sexuality, trauma, personality, education,
income, language, faith, neurodivergence, and disability; one was a quantitative
information-architecture auditor. Findings: 15 blockers, 71 major, 40 minor, 21 polish.

The panel: Marcus (54, avoidant, handed the app), Priya (34, anxious, new baby, solo),
Dale (61, grief, low-tech), Jasmine (29, betrayed), Tom (41, strayed), Aaron (36, opposite
shifts), Rosa (47, Spanish-first), Grace (58, near-divorce, privacy), Devon (39, gay adoptive
dad), Mei (38, low-desire partner), Robert (68, blended remarriage), Keisha (26, GED, working
poor), Fatima (36, interfaith Muslim), Luis (44, high-conflict but safe), Hannah (31, ADHD),
Nadia (52, permanent caregiver), and the IA auditor.

---

## The headline

The bones scored extremely well. The same five things were named as "protect this with
your life" again and again: the designed-to-be-deleted promise (13 of 17), the safety
gate's "is either of you afraid of the other?" phrasing (12), the answer-to-reveal daily
question (11), the low-pressure First Steps deck and micro-moves (8), and the flooding
break with its kind "stopping was the right call" ending (8). The auditor's verdict was
"restructure, not rewrite: the calm app already exists inside this one."

But four problems appeared independently across a majority of very different testers, which
is the signature of a real design flaw rather than one person's taste:

| Theme | Personas who hit it | One-line |
|---|---|---|
| Solo-start is broken | 10 / 17 | Onboarding promises "one willing person can begin," but stage 1 cannot progress alone |
| A track is missing for me | 10 / 17 | Six tracks miss sexless marriage, blended family, faith gap, permanent caregiving, chronic scarcity |
| The session is rigidly symmetric | 9 / 17 | Partner A always speaks first; affair/grief conversations need one person to just be heard |
| Too much on screen at once | 9 / 17 | 29,000 words total; home paints 400 words and 17 tap targets on first open |

Plus secondary but sharp: representation gaps (6), no notifications (5), everything assumes
co-presence (4), no app lock and pulse-privacy leaks (3), reading level too high (3).

---

## The overwhelm, measured (IA auditor)

- Roughly **29,000 user-facing words** across the app (about 23,700 in content, 3,900 in
  screen chrome, 1,400 in the journey engine). Novella length, handed to people who said
  they can barely talk to each other.
- **Home first paint: ~400 words, 17 simultaneous tap targets** (a calm baseline is 3-5).
  The 14-row directory alone is 133 words, and two of its rows duplicate tabs.
- **Track detail: 705-880 words on a single scroll** (the affair track is 880).
- **Topics screen: 781 words**, all 14 topics fully expanded at 56 words each.
- **Challenges screen: ~700 words and 28 choices** (4 weeks + a 24-card micro-move rail).
- **Reaching the timed floor: 5-7 taps plus 2 typed words.**
- Most of the 17 routes are reachable **three ways** (tab + home directory + journey deep
  link), tripling the app's perceived size.

The good news embedded in those numbers: the Journey already computes exactly one next
step, the talk wizard already stages its text, and the daily question is already a single
calm object. The calm app is in there; the directory just has to move out of the foreground.

---

## The Calm Path redesign (the "clear, relaxing path")

Four moves, none of which delete a feature:

### 1. A 3-element "Today" home
First paint shows exactly three things and nothing else:
1. Today's question (the hero, kept as is).
2. One next step, pulled from the journey engine's existing `nextStep` (title + one line + one button).
3. One gentle extra (today's nudge or a single rotating micro-move).

Everything else, all 14 directory rows and the notes board, moves behind one **Browse** row
at the bottom. Target: under 120 first-paint words, 5 tap targets. Cuts home load ~70%.

### 2. "What are you carrying?" personalization at onboarding
One chip screen after the safety gate: *Drifting apart · An affair · A loss · New baby ·
Money · Illness · Just us, working on us.* The answer foregrounds the matching track,
stories, topics, and decks and mutes the rest. "Drifting / just us" hides the entire "When
it's heavy" section. This is the core of "show everything without showing it all at once":
the app stops being a catalog and becomes a path bent toward the user's actual situation.
(Safety is never hidden.)

### 3. Four tabs instead of five: Today · Path · Talk · Explore
- **Today** = the new 3-element home.
- **Path** = Journey with Plan merged in (rituals and commitments are journey artifacts).
- **Talk** = the guided session, untouched, the core tool.
- **Explore** = absorbs the Play tab and the whole directory under the existing five headers.

Delete `play.tsx` (its three cards become Explore rows), removing the one fully duplicated
layer. Every destination then has exactly one browse home plus contextual deep links.

### 4. A text diet, enforced per component
Screen intro 25 words max; Explore row subtitle 6 words; list card = title + 8-word tagline,
body only on the detail screen (topics cards drop from 56 to ~12 words, that screen from 825
to ~220); journey step body 20 words. Any screen over 300 first-paint words must split or
collapse. The 23,700-word corpus stays as depth; the rule governs what paints at once.

Supporting: fast-path the talk wizard for deep links (floor entry drops from 5-7 taps to 2),
page the track detail (250-word overview, sessions unlock sequentially), stage the quiz
result across three swipes, and give guests/solo users the daily question locally.

---

## Ranked fix list

### P0 — blockers (ship before any public launch)

1. **Fix solo-start (10/17).** Onboarding promises "stage one is built so one willing person
   can begin," but stage 1 auto-gates on both partners' pulses and co-present sessions, so a
   solo starter checks boxes into a wall. Either make stage 1 genuinely completable alone
   (single-partner pulse, solo-reflection session variant) or stop making the promise.
2. **Add an app lock + fix pulse-privacy leaks (Grace, Mei, Marcus).** No Face ID / passcode,
   and the Supabase session persists in AsyncStorage, so anyone holding an unlocked phone
   opens Mend. Worse, `pulse.tsx` promises "your partner can't see this screen" but the
   journey "a pulse this low" banner shows both partners "one of you rated this very low,"
   de-anonymizing the low scorer on a shared screen. For near-divorce and secret users this
   is harm, not annoyance.
3. **De-gender + de-birth the new-baby track (Devon).** "Feeling incompetent when your soothing
   doesn't work and she takes over" and "tell the OB now" misgender adoptive and same-sex
   families in the second paragraph and route them to help they cannot use. Name post-adoption
   depression.
4. **Add an asymmetric session mode (Jasmine, Tom, Marcus).** Track conversations always run
   symmetric alternating rounds starting with Partner A, but the affair track's own "The impact"
   session says the betrayed partner holds the floor and the other only listens. The wizard
   contradicts the content. Add a floor-owner option; let the guarded partner listen first.
5. **Localize the safety path + spoken session layer for Spanish (Rosa).** The one screen that
   must be understood perfectly, "is either of you afraid of the other?", and the ground rules
   the couple reads aloud, are English-only under a Spanish UI. Translate the safety path and
   the spoken session layer first; flag Spanish-speaking hotlines.
6. **Make the privacy copy true (Grace, Priya, Tom).** Plan and onboarding say "nothing leaves
   this phone," but `sync.ts` backs up state to the server when signed in. Make backup opt-in
   or make the copy accurate, and ship a "what your partner can and cannot see" explainer
   before anyone answers honestly.
7. **Add one optional, gentle daily notification (Hannah, Priya).** The app never initiates
   contact, so today's question, nudge, and challenge day exist only if the user remembers to
   open the app. For ADHD and exhausted-new-parent users that is silent churn. Opt-in, quiet
   hours, one ping.
8. **Rebuild home as the 3-element Today screen (IA auditor).** The single highest-leverage
   change for the overwhelm the owner named.

### P1 — major (the personalization + representation + real-life-fit wave)

- **"What are you carrying?" onboarding filter** and the **Today/Path/Talk/Explore** tab reshape.
- **Ship the missing tracks (10/17):** sexless-marriage / desire-gap (Mei), blended-family &
  second-marriage (Robert), two-faiths-one-family (Fatima), permanent-caregiving long-haul arc
  for the illness track (Nadia), and rewrite the money track for chronic scarcity, not just job
  loss (Keisha, Aaron).
- **Async spine for shift/distance couples (Aaron):** a "Split Session" where partners take
  their floor turns at different times, a daily-answer history view (fix the midnight seam),
  and syncing Journey evidence through the Space rather than one phone.
- **Representation pass (Devon, Fatima, Luis, Keisha):** add same-sex, interfaith, loud-but-safe,
  and paycheck-to-paycheck couples to the 10 all-straight composite stories (the Journey
  *mandates* reading two, so this absence is a broken step, not just a gap).
- **Text diet + paged tracks + fast-path wizard** per the IA spec.
- **Reading-level pass (Keisha, Rosa):** plain-language backup for "physiological flooding,"
  "attachment lens," "atone attune attach"; flag sentences over 25 words.
- **Heavy-thing triage in onboarding (Jasmine) and the 2am page (Jasmine, Tom):** a persistent,
  reachable trigger-protocol / crisis-of-the-moment surface for people in trauma.
- **Discernment + ending-well off-ramp (Grace):** the app assumes everyone is staying; some
  are deciding. A "deciding whether to stay" path and a graceful ending that respects that
  some marriages end (Robert's "keeper mode" is the mirror image for couples who want to stay
  past graduation).

### P2/P3 — minor + polish
40 minor and 21 polish items are in the raw findings: promote underlined text-link actions
(the flooding pause, "leave this page") to real buttons for older/low-dexterity users (Dale,
Robert, Nadia, Luis); "your name / their name" instead of "Partner A / B" (Devon, Marcus);
make the read-aloud rule an invitation not an order (Marcus, Keisha); land the micro-moves
step on the micro-moves (Marcus); calm the challenges and quiz-result screens (IA); move
legal links off the vercel.app subdomain (Luis); and more.

---

## Delights to protect (do not "improve" these)

1. The designed-to-be-deleted / graduation promise (13 mentions). It is the app's soul and its
   most-cited reason people would trust it.
2. The safety gate phrasing "is either of you afraid of the other?" (12). Gender-neutral,
   takes abuse between two men seriously by default.
3. The answer-to-reveal daily question (11). Multiple testers called it the one bit of
   flirtation or curiosity they still reliably do.
4. The First Steps deck and micro-moves (8), and the "anyone may pass any card, no explanation
   owed" rule. The reason the avoidant, handed-the-app husband stayed.
5. The flooding break and the "stopping was the right call" kind ending (8).
6. The neutral content craft and quiz voice (6): "You love with the porch light on" was named
   the best quiz result several testers had ever been handed.

---

## Raw findings
Full per-persona findings (blockers, frictions, delights, recommendations, each pinned to a
file and quoted line) are preserved in the workflow journals:
`subagents/workflows/wf_fa4fdf4b-fe9/journal.jsonl` (cohort 1) and
`wf_fe62e151-191/journal.jsonl` (cohort 2).
