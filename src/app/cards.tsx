import { useRef, useState } from "react";
import { Text, View } from "react-native";
import { useRouter, type Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { decks, type Deck } from "@/lib/content/cards";
import { usePremium } from "@/lib/premium";
import type { Hue } from "@/lib/theme";
import {
  Btn,
  Card,
  Chip,
  Eyebrow,
  H1,
  H2,
  IconChip,
  Muted,
  P,
  Screen,
  usePalette,
} from "@/components/ui";
import { Bloom, Press, Reveal } from "@/components/motion";
import { DeckSwiper, type DeckSwiperHandle } from "@/components/deck";

/** Each deck gets its own personality: a hue from the cycle plus an icon
 *  matched to its vibe. Order follows the decks array, nothing invented. */
const deckHues: Hue[] = ["honey", "rose", "sky", "moss", "plum", "ember"];

const vibeIcons: Record<Deck["vibe"], keyof typeof Ionicons.glyphMap> = {
  gentle: "leaf",
  deep: "water",
  playful: "balloon",
  repair: "bandage",
  desire: "flame",
  dreams: "moon",
};

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** The free tier keeps the on-ramp and the crisis deck; Plus opens the rest.
 *  Money never gates the heavy seasons (see docs/MONETIZATION.md). */
const FREE_DECKS = new Set(["first-steps", "repair"]);

export default function Cards() {
  const p = usePalette();
  const router = useRouter();
  const { plus } = usePremium();
  const [deck, setDeck] = useState<Deck | null>(null);
  const [order, setOrder] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const swiper = useRef<DeckSwiperHandle>(null);

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
          {decks.map((d, i) => {
            const hue = deckHues[i % deckHues.length];
            const locked = !plus && !FREE_DECKS.has(d.id);
            return (
              <Reveal key={d.id} index={i}>
                <Press onPress={() => (locked ? router.push("/plus" as Href) : openDeck(d))} haptic>
                  <Card style={locked ? { opacity: 0.82 } : undefined}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                      <IconChip name={vibeIcons[d.vibe]} hue={hue} size={40} />
                      <View style={{ flex: 1 }}>
                        <H2>{d.title}</H2>
                        <Muted style={{ fontStyle: "italic" }} numberOfLines={1}>
                          {d.tagline}
                        </Muted>
                      </View>
                    </View>
                    <Muted style={{ marginTop: 10 }} numberOfLines={2}>
                      {d.description}
                    </Muted>
                    <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
                      <Chip label={d.vibe} hue={hue} />
                      <Chip label={`${d.cards.length} cards`} hue={hue} icon="albums" />
                      {locked ? <Chip label="Plus" hue="ember" icon="lock-closed" /> : null}
                    </View>
                  </Card>
                </Press>
              </Reveal>
            );
          })}
        </View>
      </Screen>
    );
  }

  const deckIndex = Math.max(
    0,
    decks.findIndex((d) => d.id === deck.id)
  );
  const hue = deckHues[deckIndex % deckHues.length];
  const h = p.hues[hue];

  if (index >= order.length) {
    return (
      <Screen>
        <View style={{ alignItems: "center", marginTop: 36 }}>
          <Bloom trigger color={h.accent} size={116}>
            <IconChip name="checkmark" hue={hue} size={76} />
          </Bloom>
        </View>
        <H1 style={{ marginTop: 22, textAlign: "center" }}>That was the whole deck</H1>
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

  function renderCard(at: number, top: boolean) {
    if (!deck) return null;
    const q = deck.cards[order[at]];
    return (
      <Card style={{ padding: 26, borderRadius: 24, minHeight: 300 }}>
        <Eyebrow hue={hue}>{deck.title}</Eyebrow>
        <Text style={{ marginTop: 14, fontSize: 24, lineHeight: 32, fontWeight: "700", color: p.ink }}>
          {q.text}
        </Text>
        {top && q.followUp ? (
          showFollowUp ? (
            <View style={{ marginTop: 14, borderLeftWidth: 2, borderLeftColor: p.moss, paddingLeft: 12 }}>
              <P>{q.followUp}</P>
            </View>
          ) : (
            <Press onPress={() => setShowFollowUp(true)}>
              <Text style={{ color: p.ember, fontWeight: "600", marginTop: 14, textDecorationLine: "underline" }}>
                There&apos;s a follow-up, when you&apos;re ready
              </Text>
            </Press>
          )
        ) : null}
      </Card>
    );
  }

  return (
    <Screen scroll={false}>
      <View
        style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}
      >
        <Press onPress={() => setDeck(null)}>
          <Muted>← All decks</Muted>
        </Press>
        <Chip label={`${index + 1} of ${order.length}`} hue={hue} />
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <DeckSwiper
          ref={swiper}
          topKey={index}
          renderTop={() => renderCard(index, true)}
          renderUnder={() =>
            [index + 1, index + 2]
              .filter((i) => i < order.length)
              .map((i) => renderCard(i, false))
          }
          onSwiped={() => next()}
        />
        <Muted style={{ textAlign: "center", marginTop: 16 }}>
          Answer out loud, then pass the phone. Listening counts as playing.
        </Muted>
        <Muted style={{ textAlign: "center", marginTop: 4, fontSize: 12 }}>
          Swipe either way, or use the buttons. Passing is always fine.
        </Muted>
      </View>

      <View style={{ flexDirection: "row", gap: 10, paddingBottom: 20 }}>
        <Btn label="Pass" kind="ghost" onPress={() => swiper.current?.swipe("left")} style={{ flex: 1 }} />
        <Btn label="We answered it" onPress={() => swiper.current?.swipe("right")} style={{ flex: 2 }} />
      </View>
    </Screen>
  );
}
