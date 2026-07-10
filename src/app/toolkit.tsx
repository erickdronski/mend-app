import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { techniques } from "@/lib/content/techniques";
import { Card, H1, H2, Muted, P, Screen, usePalette } from "@/components/ui";

export default function Toolkit() {
  const p = usePalette();
  const [open, setOpen] = useState<string | null>(techniques[0]?.id ?? null);

  return (
    <Screen>
      <H1 style={{ marginTop: 8 }}>How to say hard things to someone you love</H1>
      <P style={{ marginTop: 10 }}>
        Nine skills, drawn from the research-backed frameworks working counselors actually use.
        Read them together when you can; naming a pattern out loud is half of disarming it.
      </P>
      <View style={{ marginTop: 18, gap: 10 }}>
        {techniques.map((t) => {
          const isOpen = open === t.id;
          return (
            <Card key={t.id}>
              <Pressable onPress={() => setOpen(isOpen ? null : t.id)}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <H2 style={{ flex: 1 }}>{t.title}</H2>
                  <Text style={{ color: p.muted, fontSize: 20 }}>{isOpen ? "−" : "+"}</Text>
                </View>
                <Muted style={{ marginTop: 4, fontStyle: "italic" }}>{t.tagline}</Muted>
              </Pressable>
              {isOpen && (
                <View style={{ marginTop: 12, gap: 10 }}>
                  <P style={{ fontSize: 14 }}>
                    <Text style={{ fontWeight: "700" }}>When to use it: </Text>
                    {t.whenToUse}
                  </P>
                  {t.steps.map((s, i) => (
                    <P key={i} style={{ fontSize: 14 }}>
                      {i + 1}. {s}
                    </P>
                  ))}
                  <View style={{ backgroundColor: p.panel, borderRadius: 10, padding: 12 }}>
                    {t.example.instead && (
                      <Muted style={{ color: p.emberDeep }}>
                        Instead of <Text style={{ fontStyle: "italic" }}>{t.example.instead}</Text>
                      </Muted>
                    )}
                    <Muted style={{ color: p.mossDeep, marginTop: t.example.instead ? 8 : 0 }}>
                      Try <Text style={{ fontStyle: "italic" }}>{t.example.try}</Text>
                    </Muted>
                  </View>
                  <P style={{ fontSize: 14 }}>
                    <Text style={{ fontWeight: "700" }}>Watch out: </Text>
                    {t.watchOut}
                  </P>
                  <Muted>From: {t.source}</Muted>
                </View>
              )}
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}
