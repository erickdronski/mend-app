import { useEffect, useState } from "react";
import { Share, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { getProfile } from "@/lib/store";
import { createSpace, getMySpace, joinSpace, leaveSpace, type Space } from "@/lib/space";
import {
  Btn,
  Card,
  Divider,
  EmptyState,
  Eyebrow,
  H2,
  Hero,
  Input,
  Label,
  Muted,
  P,
  Screen,
  usePalette,
} from "@/components/ui";

const MEMBER_HUES = ["rose", "moss"] as const;

export default function SpaceScreen() {
  const p = usePalette();
  const router = useRouter();
  const [space, setSpace] = useState<Space | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmLeave, setConfirmLeave] = useState(false);

  useEffect(() => {
    (async () => {
      const [s, prof] = await Promise.all([getMySpace(), getProfile()]);
      setSpace(s);
      if (prof?.a) setName(prof.a);
      setLoaded(true);
    })();
  }, []);

  async function doCreate() {
    setBusy(true);
    setError(null);
    try {
      setSpace(await createSpace(name));
    } catch (e) {
      setError(e instanceof Error ? e.message : "That didn't work.");
    } finally {
      setBusy(false);
    }
  }

  async function doJoin() {
    setBusy(true);
    setError(null);
    try {
      setSpace(await joinSpace(code, name));
    } catch (e) {
      const msg = e instanceof Error ? e.message : "";
      setError(
        msg.includes("invalid code")
          ? "That code doesn't match a space. Check it with your partner."
          : msg.includes("full")
            ? "That space already has two people in it."
            : "That didn't work. Try again."
      );
    } finally {
      setBusy(false);
    }
  }

  if (!loaded) return <Screen scroll={false}>{null}</Screen>;

  if (space) {
    const rose = p.hues.rose;
    return (
      <Screen>
        <Hero
          hue="rose"
          eyebrow="Your space"
          title="Your shared space"
          sub={
            space.members.length === 2
              ? "Both of you are in. Leave each other notes below."
              : "You're in. Your partner joins with the code below."
          }
          style={{ marginTop: 8 }}
        />

        <Card style={{ marginTop: 14, backgroundColor: rose.bg, borderColor: "transparent", alignItems: "center" }}>
          <Eyebrow hue="rose">Invite code</Eyebrow>
          <Text
            style={{
              fontSize: 42,
              fontWeight: "800",
              letterSpacing: 8,
              color: rose.fg,
              marginTop: 8,
              textAlign: "center",
              fontVariant: ["tabular-nums"],
            }}
          >
            {space.invite_code}
          </Text>
          <Muted style={{ marginTop: 6, color: rose.fg, opacity: 0.8 }}>Give this code to your partner.</Muted>
          <Btn
            label="Share the invite"
            kind="moss"
            onPress={() =>
              Share.share({
                message: `Join me on Mend, our shared space for us: download the app and enter code ${space.invite_code}`,
              })
            }
            style={{ marginTop: 12, alignSelf: "stretch" }}
          />
        </Card>

        <Eyebrow style={{ marginTop: 20 }}>Who&apos;s here</Eyebrow>
        {space.members.length >= 2 ? (
          <View style={{ flexDirection: "row", gap: 12, marginTop: 10 }}>
            {space.members.map((m, i) => {
              const h = p.hues[MEMBER_HUES[i % MEMBER_HUES.length]];
              const dn = m.display_name || "Unnamed";
              return (
                <Card key={m.user_id} style={{ flex: 1, alignItems: "center", paddingVertical: 16 }}>
                  <View
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: 27,
                      backgroundColor: h.bg,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 22, fontWeight: "800", color: h.fg }}>
                      {dn.trim().charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <Text style={{ marginTop: 8, fontWeight: "600", color: p.ink }} numberOfLines={1}>
                    {dn}
                  </Text>
                </Card>
              );
            })}
          </View>
        ) : (
          <EmptyState
            icon="person-add-outline"
            hue="rose"
            title="Waiting for your partner"
            body="They join with the code above, and from then on you're answering into the same place."
          />
        )}

        <Btn label="Little notes between us" kind="ghost" onPress={() => router.push("/notes")} style={{ marginTop: 14 }} />

        <Divider />
        {confirmLeave ? (
          <View style={{ gap: 10 }}>
            <P>
              Leave this space? Your daily answers and notes stay with the space; if you&apos;re
              the last one out, it dissolves entirely.
            </P>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Btn
                label="Yes, leave"
                kind="ghost"
                onPress={async () => {
                  await leaveSpace();
                  setSpace(null);
                  setConfirmLeave(false);
                }}
                style={{ flex: 1 }}
              />
              <Btn label="Stay" onPress={() => setConfirmLeave(false)} style={{ flex: 1 }} />
            </View>
          </View>
        ) : (
          <Btn label="Leave this space" kind="ghost" onPress={() => setConfirmLeave(true)} />
        )}
      </Screen>
    );
  }

  return (
    <Screen>
      <Hero
        hue="rose"
        eyebrow="Together"
        title="One space, two phones"
        sub="A shared space holds your daily question, your notes to each other, and everything you do here as a couple."
        style={{ marginTop: 8 }}
      />
      <Muted style={{ marginTop: 10 }}>
        One of you creates it; the other joins with a six-letter code.
      </Muted>

      <View style={{ marginTop: 16 }}>
        <Label>Your first name (what your partner sees)</Label>
        <Input value={name} onChangeText={setName} placeholder="First name" />
      </View>

      {error && <Muted style={{ color: p.ember, marginTop: 10 }}>{error}</Muted>}

      <Card style={{ marginTop: 16, backgroundColor: p.hues.rose.bg, borderColor: "transparent" }}>
        <H2 style={{ color: p.hues.rose.fg }}>Start a new space</H2>
        <Muted style={{ marginTop: 6, color: p.hues.rose.fg, opacity: 0.8 }}>
          You&apos;ll get a code to send your partner.
        </Muted>
        <Btn label="Create our space" kind="moss" onPress={doCreate} disabled={busy || !name.trim()} style={{ marginTop: 12 }} />
      </Card>

      <Card style={{ marginTop: 10 }}>
        <H2>Join with a code</H2>
        <Input
          value={code}
          onChangeText={(v) => setCode(v.toUpperCase())}
          placeholder="6-letter code"
          autoCapitalize="characters"
          style={{ marginTop: 10, letterSpacing: 4, fontWeight: "700" }}
        />
        <Btn label="Join our space" onPress={doJoin} disabled={busy || !name.trim() || code.trim().length < 6} style={{ marginTop: 10 }} />
      </Card>
    </Screen>
  );
}
