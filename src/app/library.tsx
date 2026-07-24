import { Linking, View } from "react-native";
import { books, freeResources, podcasts } from "@/lib/content/library";
import { Card, Chip, Eyebrow, Hero, IconChip, Muted, Screen, usePalette } from "@/components/ui";
import { Text } from "@/components/text";
import { Press, Reveal } from "@/components/motion";

export default function Library() {
  const p = usePalette();
  // Running reveal index across sections so the page assembles top to bottom.
  const freeStart = books.length + 2;
  const podStart = freeStart + freeResources.length + 1;

  return (
    <Screen>
      <Hero
        hue="sky"
        eyebrow="Learn the craft"
        title="The shelf that helps"
        sub="Books, free programs, podcasts. No affiliate links, ever."
        style={{ marginTop: 4 }}
      />

      <Reveal index={1} style={{ marginTop: 22 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Eyebrow hue="sky">Books</Eyebrow>
          <Chip label={`${books.length} books`} hue="sky" />
        </View>
      </Reveal>
      <View style={{ marginTop: 10, gap: 10 }}>
        {books.map((b, i) => (
          <Reveal key={b.title} index={i + 2}>
            <Card>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <IconChip name="book-outline" hue="sky" size={34} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15.5, fontWeight: "700", color: p.ink }}>{b.title}</Text>
                  <Muted numberOfLines={1} style={{ marginTop: 2 }}>
                    {b.author}
                  </Muted>
                </View>
              </View>
              <Muted numberOfLines={1} style={{ color: p.hues.sky.fg, fontWeight: "600", fontSize: 12.5, marginTop: 8 }}>
                {b.forWhom}
              </Muted>
              <Muted numberOfLines={2} style={{ marginTop: 4 }}>
                {b.why}
              </Muted>
            </Card>
          </Reveal>
        ))}
      </View>
      <Muted style={{ marginTop: 8, fontSize: 12.5 }}>
        Most of these are at your public library for free, including audiobook editions on Libby.
      </Muted>

      <Reveal index={freeStart} style={{ marginTop: 24 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Eyebrow hue="sky">Free and nearly free</Eyebrow>
          <Chip label={`${freeResources.length} resources`} hue="sky" />
        </View>
      </Reveal>
      <View style={{ marginTop: 10, gap: 10 }}>
        {freeResources.map((r, i) => (
          <Reveal key={r.name} index={freeStart + 1 + i}>
            <Press onPress={() => Linking.openURL(r.url)}>
              <Card>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <IconChip name="open-outline" hue="sky" size={34} />
                  <Text style={{ fontWeight: "700", color: p.ink, fontSize: 15, flex: 1 }}>{r.name}</Text>
                  <Text style={{ color: p.ember, fontSize: 13, fontWeight: "600" }}>Open →</Text>
                </View>
                {/* Left untruncated on purpose: crisis lines carry phone numbers in this text. */}
                <Muted style={{ marginTop: 8 }}>{r.what}</Muted>
              </Card>
            </Press>
          </Reveal>
        ))}
      </View>

      <Reveal index={podStart} style={{ marginTop: 24 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Eyebrow hue="sky">Podcasts</Eyebrow>
          <Chip label={`${podcasts.length} shows`} hue="sky" />
        </View>
      </Reveal>
      <View style={{ marginTop: 10, gap: 10 }}>
        {podcasts.map((pod, i) => (
          <Reveal key={pod.name} index={podStart + 1 + i}>
            <Card tone="panel">
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <IconChip name="mic-outline" hue="sky" size={34} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "700", color: p.ink, fontSize: 15 }}>{pod.name}</Text>
                  <Muted numberOfLines={1} style={{ marginTop: 2 }}>
                    {pod.hosts}
                  </Muted>
                </View>
              </View>
              <Muted numberOfLines={2} style={{ marginTop: 8 }}>
                {pod.why}
              </Muted>
            </Card>
          </Reveal>
        ))}
      </View>
    </Screen>
  );
}
