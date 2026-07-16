import { useCallback, useState } from "react";
import { View } from "react-native";
import { useFocusEffect } from "expo-router";
import { Bounce, Reveal } from "@/components/motion";
import { nudgeForDate } from "@/lib/content/nudges";
import { addNote, getMySpace, listNotes, type Space, type SpaceNote } from "@/lib/space";
import { Btn, Card, EmptyState, Hero, Input, Muted, P, Screen, usePalette } from "@/components/ui";
import type { Hue } from "@/lib/theme";

/** Pinboard tints, cycled by index so the board reads as paper, not a feed. */
const NOTE_HUES: Hue[] = ["rose", "honey", "sky", "moss"];

export default function Notes() {
  const p = usePalette();
  const [space, setSpace] = useState<Space | null>(null);
  const [notes, setNotes] = useState<SpaceNote[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [justPinned, setJustPinned] = useState<string | null>(null);

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
      const fresh = await listNotes(space, 50);
      setNotes(fresh);
      setJustPinned(fresh[0]?.id ?? null);
    } finally {
      setBusy(false);
    }
  }

  if (!loaded) return <Screen scroll={false}>{null}</Screen>;

  if (!space) {
    return (
      <Screen>
        <Hero
          hue="rose"
          eyebrow="Between us"
          title="Little notes"
          sub="Notes live in your shared space."
          style={{ marginTop: 8 }}
        />
        <P style={{ marginTop: 12 }}>
          Set one up from the Today tab and this becomes the pinboard between your two phones.
        </P>
      </Screen>
    );
  }

  return (
    <Screen>
      <Hero
        hue="rose"
        eyebrow="Between us"
        title="Little notes"
        sub="The pinboard between your phones."
        style={{ marginTop: 8 }}
      />
      <Muted style={{ marginTop: 10, fontStyle: "italic" }}>
        Stuck? Today&apos;s nudge: {nudgeForDate(new Date())}
      </Muted>

      <Input
        value={draft}
        onChangeText={setDraft}
        placeholder="Write them something small"
        multiline
        style={{ marginTop: 14, minHeight: 60 }}
      />
      <Btn label="Pin it to our board" kind="moss" onPress={send} disabled={busy || !draft.trim()} style={{ marginTop: 10 }} />

      {notes.length === 0 ? (
        <EmptyState
          icon="heart-outline"
          hue="rose"
          title="Leave the first little note"
          body="The first one sets the tone; make it kind."
        />
      ) : (
        <View style={{ marginTop: 18, gap: 10 }}>
          {notes.map((n, i) => {
            const h = p.hues[NOTE_HUES[i % NOTE_HUES.length]];
            const card = (
              <Card style={{ backgroundColor: h.bg, borderColor: "transparent" }}>
                <P style={{ color: h.fg }}>{n.body}</P>
                <Muted style={{ marginTop: 6, fontSize: 11.5, color: h.fg, opacity: 0.7 }}>
                  {n.display_name} ·{" "}
                  {new Date(n.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </Muted>
              </Card>
            );
            return (
              <Reveal key={n.id} index={i}>
                {n.id === justPinned ? <Bounce trigger>{card}</Bounce> : card}
              </Reveal>
            );
          })}
        </View>
      )}
    </Screen>
  );
}
