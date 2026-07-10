import { useCallback, useState } from "react";
import { Pressable, Share, Text, View } from "react-native";
import { useFocusEffect, useRouter, type Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/auth";
import { questionForDate } from "@/lib/content/daily";
import { getProfile } from "@/lib/store";
import {
  addNote,
  getMySpace,
  getTodayAnswers,
  listNotes,
  submitAnswer,
  type DailyAnswer,
  type Space,
  type SpaceNote,
} from "@/lib/space";
import { Btn, Card, H1, H2, Input, Muted, P, Screen, usePalette } from "@/components/ui";

type Row = { href: Href; icon: keyof typeof Ionicons.glyphMap; title: string; sub: string };

const directory: { section: string; rows: Row[] }[] = [
  {
    section: "Talk it out",
    rows: [
      { href: "/talk", icon: "chatbubbles-outline", title: "Guided session", sub: "The timed floor: speak, be heard, close kindly" },
      { href: "/topics", icon: "chatbox-ellipses-outline", title: "Conversation topics", sub: "Soft ways into the talks you keep not having" },
    ],
  },
  {
    section: "Play together",
    rows: [
      { href: "/cards", icon: "albums-outline", title: "Card decks", sub: "Six decks, from first steps back to real depth" },
      { href: "/games", icon: "dice-outline", title: "Games", sub: "Guessing games, dilemmas, memory lane" },
      { href: "/challenges", icon: "calendar-outline", title: "7-day challenges", sub: "One small act a day, plus micro-moves" },
    ],
  },
  {
    section: "Learn the craft",
    rows: [
      { href: "/toolkit", icon: "construct-outline", title: "Communication toolkit", sub: "The nine skills counselors actually teach" },
      { href: "/quiz", icon: "help-circle-outline", title: "How you love & fight", sub: "Your attachment lens and conflict role" },
      { href: "/stories", icon: "people-outline", title: "Stories", sub: "Couples who found a way through" },
      { href: "/library", icon: "library-outline", title: "Library", sub: "Real books, free programs, podcasts" },
    ],
  },
  {
    section: "When it's heavy",
    rows: [
      { href: "/tracks", icon: "map-outline", title: "Healing tracks", sub: "The affair, the loss, the illness, the crisis" },
      { href: "/safety", icon: "medkit-outline", title: "Get help now", sub: "Crisis lines and low-cost counseling, free" },
    ],
  },
  {
    section: "Your path",
    rows: [
      { href: "/journey", icon: "trail-sign-outline", title: "The Journey", sub: "Five stages from here to not needing this app" },
      { href: "/pulse", icon: "pulse-outline", title: "Pulse check", sub: "Five honest numbers, both of you" },
      { href: "/plan", icon: "heart-outline", title: "Our plan", sub: "Rituals, commitments, today's nudge" },
    ],
  },
];

export default function SpaceHub() {
  const p = usePalette();
  const router = useRouter();
  const { t } = useTranslation();
  const { session, guest } = useAuth();
  const [space, setSpace] = useState<Space | null>(null);
  const [answers, setAnswers] = useState<DailyAnswer[]>([]);
  const [notes, setNotes] = useState<SpaceNote[]>([]);
  const [draft, setDraft] = useState("");
  const [noteDraft, setNoteDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [myId, setMyId] = useState<string | null>(null);

  const question = questionForDate(new Date());

  const reload = useCallback(() => {
    (async () => {
      setMyId(session?.user.id ?? null);
      if (!session) {
        setSpace(null);
        setLoaded(true);
        return;
      }
      const s = await getMySpace();
      setSpace(s);
      if (s) {
        const [a, n] = await Promise.all([getTodayAnswers(s), listNotes(s, 3)]);
        setAnswers(a);
        setNotes(n);
      }
      setLoaded(true);
      const { backupIfSignedIn } = await import("@/lib/sync");
      backupIfSignedIn();
    })();
  }, [session]);

  useFocusEffect(reload);

  const mine = answers.find((a) => a.user_id === myId);
  const theirs = answers.find((a) => a.user_id !== myId);
  const partner = space?.members.find((m) => m.user_id !== myId);
  const solo = Boolean(space && space.members.length < 2);

  async function send() {
    if (!space || !draft.trim()) return;
    setBusy(true);
    try {
      await submitAnswer(space, question.text, draft);
      setDraft("");
      setAnswers(await getTodayAnswers(space));
    } finally {
      setBusy(false);
    }
  }

  async function sendNote() {
    if (!space || !noteDraft.trim()) return;
    setBusy(true);
    try {
      await addNote(space, noteDraft);
      setNoteDraft("");
      setNotes(await listNotes(space, 3));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Screen>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
        <Text style={{ fontSize: 24, fontWeight: "800", color: p.ink }}>
          Mend<Text style={{ color: p.ember }}>.</Text>
        </Text>
        <Pressable onPress={() => router.push("/settings")} hitSlop={10}>
          <Ionicons name="settings-outline" size={22} color={p.muted} />
        </Pressable>
      </View>

      {/* ——— Daily question / space state ——— */}
      {!loaded ? null : !session ? (
        <Card tone="fern" style={{ marginTop: 16 }}>
          <H2>One space, two phones</H2>
          <P style={{ marginTop: 8 }}>
            Share a space with your partner: a question of the day you both answer from your own
            phones, little notes back and forth, and everything in one place. It takes a free
            account, so your space can find you both.
          </P>
          <Btn
            label={guest ? "Create a free account" : t("auth.signIn")}
            kind="moss"
            onPress={() => router.push("/sign-in")}
            style={{ marginTop: 14 }}
          />
        </Card>
      ) : !space ? (
        <Card tone="fern" style={{ marginTop: 16 }}>
          <H2>Make it yours, together</H2>
          <P style={{ marginTop: 8 }}>
            Create your shared space and invite your partner with a six-letter code. From then on
            you're answering the same daily question, from two phones, into one place.
          </P>
          <Btn label="Set up our space" kind="moss" onPress={() => router.push("/space")} style={{ marginTop: 14 }} />
        </Card>
      ) : (
        <>
          <Card tone="fern" style={{ marginTop: 16 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Muted style={{ textTransform: "uppercase", letterSpacing: 1.5, fontWeight: "700", color: p.mossDeep }}>
                Today&apos;s question
              </Muted>
              <Muted style={{ fontSize: 11, textTransform: "capitalize" }}>{question.category}</Muted>
            </View>
            <H2 style={{ marginTop: 8 }}>{question.text}</H2>

            {!mine ? (
              <View style={{ marginTop: 12 }}>
                {theirs && (
                  <Muted style={{ marginBottom: 8 }}>
                    {theirs.display_name} answered already. Yours unlocks it.
                  </Muted>
                )}
                <Input
                  value={draft}
                  onChangeText={setDraft}
                  placeholder="A sentence or three, honestly"
                  multiline
                  style={{ minHeight: 70 }}
                />
                <Btn label="Send mine in" kind="moss" onPress={send} disabled={busy || !draft.trim()} style={{ marginTop: 10 }} />
              </View>
            ) : (
              <View style={{ marginTop: 12, gap: 10 }}>
                <View style={{ backgroundColor: p.raised, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: p.line }}>
                  <Muted style={{ fontWeight: "700" }}>You</Muted>
                  <P style={{ marginTop: 4 }}>{mine.answer}</P>
                </View>
                {theirs ? (
                  <View style={{ backgroundColor: p.raised, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: p.moss }}>
                    <Muted style={{ fontWeight: "700", color: p.mossDeep }}>{theirs.display_name}</Muted>
                    <P style={{ marginTop: 4 }}>{theirs.answer}</P>
                  </View>
                ) : (
                  <Muted>
                    {partner ? `Waiting on ${partner.display_name}. ` : ""}Yours is in, safe and
                    sealed until theirs arrives.
                  </Muted>
                )}
              </View>
            )}
          </Card>

          {solo && (
            <Card style={{ marginTop: 10, borderColor: p.ember }}>
              <Muted style={{ fontWeight: "700", color: p.emberDeep }}>Your invite code</Muted>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
                <Text style={{ fontSize: 26, fontWeight: "800", letterSpacing: 5, color: p.ink }}>
                  {space.invite_code}
                </Text>
                <Btn
                  label="Share it"
                  kind="ghost"
                  onPress={() =>
                    Share.share({
                      message: `Join me on Mend, our shared space for us: download the app and enter code ${space.invite_code}`,
                    })
                  }
                />
              </View>
              <Muted style={{ marginTop: 6 }}>
                When your partner enters this code, their answers land here next to yours.
              </Muted>
            </Card>
          )}

          {/* ——— Notes ——— */}
          <Card style={{ marginTop: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <H2>Little notes</H2>
              <Pressable onPress={() => router.push("/notes")}>
                <Text style={{ color: p.ember, fontWeight: "600", fontSize: 14 }}>All notes →</Text>
              </Pressable>
            </View>
            {notes.length === 0 ? (
              <Muted style={{ marginTop: 8 }}>
                The pinboard between your phones. Leave the first one; it doesn&apos;t have to be
                poetry.
              </Muted>
            ) : (
              <View style={{ marginTop: 10, gap: 8 }}>
                {notes.map((n) => (
                  <View key={n.id} style={{ backgroundColor: p.panel, borderRadius: 10, padding: 10 }}>
                    <P style={{ fontSize: 14 }}>{n.body}</P>
                    <Muted style={{ marginTop: 4, fontSize: 11 }}>{n.display_name}</Muted>
                  </View>
                ))}
              </View>
            )}
            <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
              <Input
                value={noteDraft}
                onChangeText={setNoteDraft}
                placeholder="Leave a note for them"
                style={{ flex: 1 }}
              />
              <Btn label="Pin it" onPress={sendNote} disabled={busy || !noteDraft.trim()} />
            </View>
          </Card>
        </>
      )}

      {/* ——— Everything, organized ——— */}
      {directory.map((group) => (
        <View key={group.section} style={{ marginTop: 22 }}>
          <Muted style={{ textTransform: "uppercase", letterSpacing: 1.5, fontWeight: "700", color: p.mossDeep }}>
            {group.section}
          </Muted>
          <Card style={{ marginTop: 8, paddingVertical: 6, paddingHorizontal: 6 }}>
            {group.rows.map((row, i) => (
              <Pressable
                key={String(row.href)}
                onPress={() => router.push(row.href)}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  padding: 12,
                  borderRadius: 12,
                  backgroundColor: pressed ? p.panel : "transparent",
                  borderTopWidth: i === 0 ? 0 : 1,
                  borderTopColor: p.line,
                })}
              >
                <Ionicons name={row.icon} size={20} color={p.moss} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, fontWeight: "600", color: p.ink }}>{row.title}</Text>
                  <Muted style={{ fontSize: 12.5, marginTop: 1 }}>{row.sub}</Muted>
                </View>
                <Ionicons name="chevron-forward" size={16} color={p.muted} />
              </Pressable>
            ))}
          </Card>
        </View>
      ))}

      <Muted style={{ marginTop: 24, textAlign: "center" }}>{t("journey.designedToEnd")}</Muted>
    </Screen>
  );
}
