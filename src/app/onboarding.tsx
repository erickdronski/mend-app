import { useRef, useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/lib/auth";
import { saveProfile } from "@/lib/store";
import { situations, type Situation } from "@/lib/situation";
import { whyGateMatters } from "@/lib/content/safety";
import { Btn, Card, H1, H2, IconChip, Input, Label, Muted, P, pressFx, Rise, Screen, usePalette, Wordmark } from "@/components/ui";

type Step = "welcome" | "tour" | "deal" | "gate" | "names" | "situation";

const tour: { icon: keyof typeof Ionicons.glyphMap; title: string; body: string }[] = [
  {
    icon: "trail-sign",
    title: "A journey, not a jar of tips",
    body: "Five stages, from ten calm minutes to the hard rebuilding, paced by real progress. It ends with you deleting the app.",
  },
  {
    icon: "chatbubbles",
    title: "A timer that referees",
    body: "One of you speaks, protected. The other proves they heard. The counselor's structure, free, at your kitchen table.",
  },
  {
    icon: "dice",
    title: "Play your way back",
    body: "Card decks, guessing games, 7-day challenges. Easier conversations that make the harder ones possible.",
  },
  {
    icon: "people",
    title: "One space, two phones",
    body: "A daily question you both answer, sealed until you've each sent yours. Little notes back and forth. One shared place.",
  },
];

export default function Onboarding() {
  const router = useRouter();
  const p = usePalette();
  const insets = useSafeAreaInsets();
  const { session, guest, continueAsGuest } = useAuth();
  const [step, setStep] = useState<Step>("welcome");
  const [page, setPage] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const width = Dimensions.get("window").width;

  // names step
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  async function finishWith(situation: Situation) {
    await saveProfile({
      a: a.trim(),
      b: b.trim(),
      safetyAck: true,
      createdAt: new Date().toISOString(),
      situation,
    });
    router.replace("/");
  }

  // The account step is gone on purpose (2026-07-16): beta feedback showed
  // email confirmation dead-ends (no SMTP on the shared project) and the
  // guest path stranded. Identity is now an invisible anonymous account
  // minted at the safety gate; real logins live on /sign-in for returning
  // users only.

  // ————— welcome: the brand moment —————
  if (step === "welcome") {
    return (
      <LinearGradient colors={["#24402c", "#38553f", "#2e4636"]} style={{ flex: 1 }}>
        <StatusBar style="light" />
        <View style={{ flex: 1, paddingHorizontal: 28, paddingTop: insets.top + 80, paddingBottom: insets.bottom + 28 }}>
          <Rise>
            <Wordmark size={56} color="#f4f4ee" accent="#d9a057" />
          </Rise>
          <Rise delay={150}>
            <Text style={{ fontSize: 26, fontWeight: "700", color: "#f4f4ee", marginTop: 18, lineHeight: 34 }}>
              Marriages rarely die of one big thing.
            </Text>
            <Text style={{ fontSize: 26, fontWeight: "700", color: "#d9a057", marginTop: 4, lineHeight: 34 }}>
              They starve on unheard sentences.
            </Text>
          </Rise>
          <Rise delay={300}>
            <Text style={{ fontSize: 16, color: "#f4f4ee", opacity: 0.75, marginTop: 18, lineHeight: 24 }}>
              A private mediator for the two of you. The heart of it free forever, no ads, your
              data never sold. Just the way back.
            </Text>
          </Rise>
          <View style={{ flex: 1 }} />
          <Rise delay={450}>
            <Pressable
              onPress={() => setStep("tour")}
              style={({ pressed }) => ({
                backgroundColor: "#f4f4ee",
                borderRadius: 16,
                paddingVertical: 17,
                alignItems: "center",
                opacity: pressed ? 0.9 : 1,
              })}
            >
              <Text style={{ color: "#1f2721", fontWeight: "700", fontSize: 16 }}>Begin</Text>
            </Pressable>
            {!session && !guest && (
              <Pressable onPress={() => router.push("/sign-in")} style={{ marginTop: 16, alignItems: "center" }}>
                <Text style={{ color: "#f4f4ee", opacity: 0.7, fontSize: 14 }}>
                  I already have an account
                </Text>
              </Pressable>
            )}
          </Rise>
        </View>
      </LinearGradient>
    );
  }

  // ————— tour: four swipes —————
  if (step === "tour") {
    return (
      <Screen scroll={false} padded={false} safeTop>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => setPage(Math.round(e.nativeEvent.contentOffset.x / width))}
          style={{ flex: 1 }}
        >
          {/* Plain Views on purpose: the pager provides the motion. An entering
              animation on the first panel can strand it invisible on web if
              the animation never fires (throttled rAF), leaving page one blank. */}
          {tour.map((t2, i) => (
            <View key={t2.title} style={{ width, paddingHorizontal: 32, justifyContent: "center" }}>
              <IconChip name={t2.icon} tone={i % 2 === 0 ? "moss" : "ember"} size={72} />
              <Text style={{ fontSize: 30, fontWeight: "800", color: p.ink, marginTop: 24, letterSpacing: -0.5, lineHeight: 36 }}>
                {t2.title}
              </Text>
              <P style={{ marginTop: 12, fontSize: 16.5, lineHeight: 25 }}>{t2.body}</P>
            </View>
          ))}
        </ScrollView>
        <View style={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 20 }}>
          <View style={{ flexDirection: "row", gap: 6, justifyContent: "center", marginBottom: 18 }}>
            {tour.map((_, i) => (
              <View
                key={i}
                style={{
                  width: i === page ? 22 : 7,
                  height: 7,
                  borderRadius: 4,
                  backgroundColor: i === page ? p.moss : p.line,
                }}
              />
            ))}
          </View>
          <Btn
            label={page < tour.length - 1 ? "Next" : "Here's the deal"}
            onPress={() => {
              if (page < tour.length - 1) {
                scrollRef.current?.scrollTo({ x: (page + 1) * width, animated: true });
                setPage(page + 1);
              } else {
                setStep("deal");
              }
            }}
          />
        </View>
      </Screen>
    );
  }

  // ————— the deal —————
  if (step === "deal") {
    return (
      <Screen safeTop>
        <Rise>
          <H1 style={{ marginTop: 12 }}>Here&apos;s the deal</H1>
          <Muted style={{ marginTop: 6 }}>Three promises between us, before anything starts.</Muted>
        </Rise>
        <View style={{ marginTop: 20, gap: 12 }}>
          <Rise delay={100}>
            <Card>
              <View style={{ flexDirection: "row", gap: 14, alignItems: "flex-start" }}>
                <IconChip name="time" tone="moss" />
                <View style={{ flex: 1 }}>
                  <H2>What it asks</H2>
                  <Muted style={{ marginTop: 6 }}>
                    Twenty honest minutes a week. In the same room if you have one, on two phones
                    if you don't. Honesty on the pulse checks. Patience measured in months, not
                    moods.
                  </Muted>
                </View>
              </View>
            </Card>
          </Rise>
          <Rise delay={200}>
            <Card>
              <View style={{ flexDirection: "row", gap: 14, alignItems: "flex-start" }}>
                <IconChip name="school" tone="ember" />
                <View style={{ flex: 1 }}>
                  <H2>What it gives</H2>
                  <Muted style={{ marginTop: 6 }}>
                    The structure and language of real counseling frameworks, the kind couples pay
                    hundreds a session for. Staged, guided, free.
                  </Muted>
                </View>
              </View>
            </Card>
          </Rise>
          <Rise delay={300}>
            <Card tone="fern">
              <View style={{ flexDirection: "row", gap: 14, alignItems: "flex-start" }}>
                <IconChip name="exit" tone="fern" />
                <View style={{ flex: 1 }}>
                  <H2>How it ends</H2>
                  <Muted style={{ marginTop: 6 }}>
                    With you deleting it. Mend is designed to get you off the app and back into a
                    marriage that holds itself up. Graduation is the feature.
                  </Muted>
                </View>
              </View>
            </Card>
          </Rise>
        </View>
        <Muted style={{ marginTop: 20, fontSize: 12.5, lineHeight: 18 }}>
          Mend is an educational tool, not therapy. It gives you structure and language; it does
          not diagnose or treat, and it is not a substitute for a licensed marriage and family
          therapist or crisis care.
        </Muted>
        <Btn label="We understand" onPress={() => setStep("gate")} style={{ marginTop: 16 }} />
      </Screen>
    );
  }

  // ————— safety gate —————
  if (step === "gate") {
    return (
      <Screen safeTop>
        <Rise>
          <Muted style={{ marginTop: 12, textTransform: "uppercase", letterSpacing: 2, fontWeight: "700", color: p.ember }}>
            One honest question
          </Muted>
          <H1 style={{ marginTop: 8 }}>Is either of you afraid of the other?</H1>
          <P style={{ marginTop: 12 }}>
            Not &ldquo;do we fight.&rdquo; Fights are why Mend exists. This is about violence,
            fear, or control, physical or otherwise.
          </P>
          <Muted style={{ marginTop: 12 }}>{whyGateMatters}</Muted>
        </Rise>
        <View style={{ marginTop: 24, gap: 10 }}>
          <Btn
            label="We're safe with each other. Continue"
            onPress={() => {
              // No login in the way: mint an invisible account underneath so
              // the shared space and backup work with nothing to fill in.
              // Fire and forget; offline stays local and retries next launch.
              if (!session) continueAsGuest();
              setStep("names");
            }}
          />
          <Btn
            label="I'm not sure, or I don't feel safe. Show me help"
            kind="ghost"
            onPress={() => router.push("/safety")}
          />
        </View>
      </Screen>
    );
  }

  // ————— names —————
  if (step === "names") {
    return (
      <Screen safeTop>
        <Rise>
          <H1 style={{ marginTop: 12 }}>Who&apos;s mending?</H1>
          <P style={{ marginTop: 10 }}>
            First names only. They label the timer and the games. On this phone they stay private;
            {session ? " your account backs up your progress so you don't lose it." : " nothing syncs unless you make an account."}
          </P>
        </Rise>
        <View style={{ marginTop: 22, gap: 14 }}>
          <View>
            <Label>Your name</Label>
            <Input value={a} onChangeText={setA} placeholder="First name" autoComplete="off" />
          </View>
          <View>
            <Label>Your partner&apos;s name</Label>
            <Input value={b} onChangeText={setB} placeholder="First name" autoComplete="off" />
          </View>
          <Muted>
            Starting alone? Put your partner&apos;s name in anyway. You can begin the first steps
            on your own.
          </Muted>
          <Btn label="One last question" onPress={() => setStep("situation")} disabled={!a.trim() && !b.trim()} />
        </View>
      </Screen>
    );
  }

  // ————— situation: what are you carrying —————
  return (
    <Screen safeTop>
      <Rise>
        <Muted style={{ marginTop: 12, textTransform: "uppercase", letterSpacing: 2, fontWeight: "700", color: p.ember }}>
          So we can meet you where you are
        </Muted>
        <H1 style={{ marginTop: 8 }}>What are you carrying?</H1>
        <P style={{ marginTop: 10 }}>
          Pick the closest one. It shapes what Mend shows you first. Nothing gets locked away, and
          you can change it any time in settings.
        </P>
      </Rise>
      <View style={{ marginTop: 20, gap: 10 }}>
        {situations.map((s, i) => (
          <Rise key={s.id} delay={i * 40}>
            <Pressable onPress={() => finishWith(s.id)} style={pressFx}>
              <Card>
                <View style={{ flexDirection: "row", gap: 14, alignItems: "center" }}>
                  <IconChip name={s.icon} tone={i % 2 === 0 ? "moss" : "ember"} size={44} />
                  <Text style={{ flex: 1, fontSize: 16, fontWeight: "600", color: p.ink }}>{s.chip}</Text>
                  <Ionicons name="chevron-forward" size={18} color={p.muted} />
                </View>
              </Card>
            </Pressable>
          </Rise>
        ))}
      </View>
    </Screen>
  );
}
