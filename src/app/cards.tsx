import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { decks, type Deck } from "@/lib/content/cards";
import { Btn, Card, H1, H2, Muted, P, Screen, usePalette } from "@/components/ui";

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function Cards() {
  const p = usePalette();
  const [deck, setDeck] = useState<Deck | null>(null);
  const [order, setOrder] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [showFollowUp, setShowFollowUp] = useState(false);

  function openDeck(d: Deck) {
    setDeck(d);
    setOrder(shuffle(d.cards.map((_, i) => i)));
    setIndex(0);
    setShowFollowUp(false);
  }

  function next() {
    setIndex((i) => i + 1);
    setShowFollowUp(false);
  }

  if (!deck) {
    return (
      <Screen>
        <H1 style={{ marginTop: 8 }}>Draw a card. Answer it honestly.</H1>
        <P style={{ marginTop: 10 }}>
          Six decks at six temperatures. One universal rule: anyone may pass any card, and no
          explanation is owed.
        </P>
        <View style={{ marginTop: 18, gap: 12 }}>
          {decks.map((d) => (
            <Pressable key={d.id} onPress={() => openDeck(d)}>
              <Card>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <H2 style={{ flex: 1 }}>{d.title}</H2>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      color: p.mossDeep,
                      backgroundColor: p.fern,
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                      borderRadius: 99,
                      overflow: "hidden",
                    }}
                  >
                    {d.vibe}
                  </Text>
                </View>
                <Muted style={{ marginTop: 4, fontStyle: "italic" }}>{d.tagline}</Muted>
                <Muted style={{ marginTop: 8 }} numberOfLines={3}>
                  {d.description}
                </Muted>
                <Text style={{ color: p.ember, fontWeight: "600", marginTop: 10, fontSize: 14 }}>
                  {d.cards.length} cards →
                </Text>
              </Card>
            </Pressable>
          ))}
        </View>
      </Screen>
    );
  }

  if (index >= order.length) {
    return (
      <Screen>
        <H1 style={{ marginTop: 24, textAlign: "center" }}>That was the whole deck</H1>
        <P style={{ marginTop: 10, textAlign: "center" }}>
          However many you answered and however many you passed, you just spent real time turned
          toward each other. That counts.
        </P>
        <View style={{ marginTop: 22, gap: 10 }}>
          <Btn label="Shuffle it again" onPress={() => openDeck(deck)} />
          <Btn label="Choose another deck" kind="ghost" onPress={() => setDeck(null)} />
        </View>
      </Screen>
    );
  }

  const card = deck.cards[order[index]];
  return (
    <Screen scroll={false}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
        <Pressable onPress={() => setDeck(null)}>
          <Muted>← All decks</Muted>
        </Pressable>
        <Muted>
          {index + 1} of {order.length}
        </Muted>
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <Card style={{ padding: 26 }}>
          <Muted style={{ textTransform: "uppercase", letterSpacing: 1.5, fontWeight: "700", color: p.mossDeep }}>
            {deck.title}
          </Muted>
          <Text style={{ marginTop: 14, fontSize: 22, lineHeight: 30, fontWeight: "700", color: p.ink }}>
            {card.text}
          </Text>
          {card.followUp ? (
            showFollowUp ? (
              <View style={{ marginTop: 14, borderLeftWidth: 2, borderLeftColor: p.moss, paddingLeft: 12 }}>
                <P>{card.followUp}</P>
              </View>
            ) : (
              <Pressable onPress={() => setShowFollowUp(true)}>
                <Text style={{ color: p.ember, fontWeight: "600", marginTop: 14, textDecorationLine: "underline" }}>
                  There&apos;s a follow-up, when you&apos;re ready
                </Text>
              </Pressable>
            )
          ) : null}
        </Card>
        <Muted style={{ textAlign: "center", marginTop: 12 }}>
          Answer out loud, then pass the phone. Listening counts as playing.
        </Muted>
      </View>

      <View style={{ flexDirection: "row", gap: 10, paddingBottom: 20 }}>
        <Btn label="Pass" kind="ghost" onPress={next} style={{ flex: 1 }} />
        <Btn label="We answered it" onPress={next} style={{ flex: 2 }} />
      </View>
    </Screen>
  );
}
