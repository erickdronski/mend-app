import { useEffect, useState } from "react";
import { Share, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { getProfile } from "@/lib/store";
import { createSpace, getMySpace, joinSpace, leaveSpace, type Space } from "@/lib/space";
import { Btn, Card, Divider, H1, H2, Input, Label, Muted, P, Screen, usePalette } from "@/components/ui";

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
    return (
      <Screen>
        <H1 style={{ marginTop: 8 }}>Your shared space</H1>
        <P style={{ marginTop: 10 }}>
          {space.members.length === 2
            ? "Both of you are in. Answer the daily question on Today, and leave each other notes below."
            : "You're in. Your partner joins with the code below, and from then on you're answering into the same place."}
        </P>

        <Card style={{ marginTop: 16 }}>
          <Muted style={{ fontWeight: "700" }}>Who&apos;s here</Muted>
          {space.members.map((m) => (
            <View key={m.user_id} style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 8 }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: p.moss }} />
              <Text style={{ color: p.ink, fontSize: 15 }}>{m.display_name || "Unnamed"}</Text>
            </View>
          ))}
          {space.members.length < 2 && (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 8 }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: p.line }} />
              <Muted>Waiting for your partner</Muted>
            </View>
          )}
        </Card>

        <Card style={{ marginTop: 10, borderColor: p.ember }}>
          <Muted style={{ fontWeight: "700", color: p.emberDeep }}>Invite code</Muted>
          <Text style={{ fontSize: 30, fontWeight: "800", letterSpacing: 6, color: p.ink, marginTop: 4 }}>
            {space.invite_code}
          </Text>
          <Btn
            label="Share the invite"
            kind="moss"
            onPress={() =>
              Share.share({
                message: `Join me on Mend, our shared space for us: download the app and enter code ${space.invite_code}`,
              })
            }
            style={{ marginTop: 12 }}
          />
        </Card>

        <Btn label="Little notes between us" kind="ghost" onPress={() => router.push("/notes")} style={{ marginTop: 10 }} />

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
      <H1 style={{ marginTop: 8 }}>One space, two phones</H1>
      <P style={{ marginTop: 10 }}>
        A shared space holds your daily question, your notes to each other, and everything you do
        here as a couple. One of you creates it; the other joins with a six-letter code.
      </P>

      <View style={{ marginTop: 18 }}>
        <Label>Your first name (what your partner sees)</Label>
        <Input value={name} onChangeText={setName} placeholder="First name" />
      </View>

      {error && (
        <Muted style={{ color: p.ember, marginTop: 10 }}>{error}</Muted>
      )}

      <Card tone="fern" style={{ marginTop: 16 }}>
        <H2>Start a new space</H2>
        <Muted style={{ marginTop: 6 }}>You&apos;ll get a code to send your partner.</Muted>
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
