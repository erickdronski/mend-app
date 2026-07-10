import { useCallback, useState } from "react";
import { View } from "react-native";
import { useFocusEffect } from "expo-router";
import { nudgeForDate } from "@/lib/content/nudges";
import { addNote, getMySpace, listNotes, type Space, type SpaceNote } from "@/lib/space";
import { Btn, Card, H1, Input, Muted, P, Screen, usePalette } from "@/components/ui";

export default function Notes() {
  const p = usePalette();
  const [space, setSpace] = useState<Space | null>(null);
  const [notes, setNotes] = useState<SpaceNote[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const s = await getMySpace();
        setSpace(s);
        if (s) setNotes(await listNotes(s, 50));
        setLoaded(true);
      })();
    }, [])
  );

  async function send() {
    if (!space || !draft.trim()) return;
    setBusy(true);
    try {
      await addNote(space, draft);
      setDraft("");
      setNotes(await listNotes(space, 50));
    } finally {
      setBusy(false);
    }
  }

  if (!loaded) return <Screen scroll={false}>{null}</Screen>;

  if (!space) {
    return (
      <Screen>
        <H1 style={{ marginTop: 8 }}>Little notes</H1>
        <P style={{ marginTop: 10 }}>
          Notes live in your shared space. Set one up from the Today tab and this becomes the
          pinboard between your two phones.
        </P>
      </Screen>
    );
  }

  return (
    <Screen>
      <H1 style={{ marginTop: 8 }}>Little notes</H1>
      <P style={{ marginTop: 8 }}>
        The pinboard between your phones. Appreciations, apologies, inside jokes, the thing you
        forgot to say this morning.
      </P>
      <Muted style={{ marginTop: 8, fontStyle: "italic" }}>
        Stuck? Today&apos;s nudge: {nudgeForDate(new Date())}
      </Muted>

      <View style={{ flexDirection: "row", gap: 8, marginTop: 14 }}>
        <Input
          value={draft}
          onChangeText={setDraft}
          placeholder="Write them something small"
          multiline
          style={{ flex: 1, minHeight: 60 }}
        />
      </View>
      <Btn label="Pin it to our board" kind="moss" onPress={send} disabled={busy || !draft.trim()} style={{ marginTop: 10 }} />

      <View style={{ marginTop: 18, gap: 10 }}>
        {notes.map((n) => (
          <Card key={n.id}>
            <P>{n.body}</P>
            <Muted style={{ marginTop: 6, fontSize: 11.5 }}>
              {n.display_name} · {new Date(n.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
            </Muted>
          </Card>
        ))}
        {notes.length === 0 && <Muted>No notes yet. The first one sets the tone; make it kind.</Muted>}
      </View>
    </Screen>
  );
}
