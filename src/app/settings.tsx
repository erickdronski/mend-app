import { useEffect, useState } from "react";
import { Linking, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import i18n, { LANGUAGES, type LanguageCode } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { getProfile, saveLanguage, saveProfile, type Profile } from "@/lib/store";
import { Btn, Card, Divider, H1, H2, Input, Label, Muted, P, Screen, usePalette } from "@/components/ui";

const SITE = "https://mend-drab-pi.vercel.app";

const legalLinks = [
  { label: "Privacy policy", url: `${SITE}/privacy` },
  { label: "Terms of use", url: `${SITE}/terms` },
  { label: "Support", url: `${SITE}/support` },
];

export default function Settings() {
  const p = usePalette();
  const router = useRouter();
  const { t } = useTranslation();
  const { session, guest, signOut } = useAuth();
  const [lang, setLang] = useState<LanguageCode>((i18n.language as LanguageCode) ?? "en");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [names, setNames] = useState<[string, string]>(["", ""]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function deleteAccount() {
    setDeleting(true);
    setDeleteError(null);
    try {
      const { error } = await supabase.functions.invoke("mend-delete-account", { method: "POST" });
      if (error) throw error;
      await signOut();
    } catch {
      setDeleteError("Deletion failed. Check your connection and try again, or email support.");
      setDeleting(false);
    }
  }

  useEffect(() => {
    getProfile().then((prof) => {
      setProfile(prof);
      if (prof) setNames([prof.a, prof.b]);
    });
  }, []);

  async function changeLanguage(code: LanguageCode) {
    setLang(code);
    await i18n.changeLanguage(code);
    await saveLanguage(code);
  }

  async function saveNames() {
    if (!profile) return;
    const next = { ...profile, a: names[0].trim(), b: names[1].trim() };
    await saveProfile(next);
    setProfile(next);
  }

  return (
    <Screen>
      <H1 style={{ marginTop: 8 }}>{t("settings.title")}</H1>

      {/* Language */}
      <H2 style={{ marginTop: 20 }}>{t("settings.language")}</H2>
      <View style={{ marginTop: 10, gap: 8 }}>
        {LANGUAGES.map((l) => (
          <Pressable key={l.code} onPress={() => changeLanguage(l.code)}>
            <Card
              style={{
                paddingVertical: 13,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderColor: lang === l.code ? p.moss : p.line,
              }}
            >
              <Text style={{ color: p.ink, fontSize: 15, fontWeight: lang === l.code ? "700" : "400" }}>
                {l.label}
              </Text>
              {lang === l.code && <Ionicons name="checkmark-circle" size={20} color={p.moss} />}
            </Card>
          </Pressable>
        ))}
      </View>
      <Muted style={{ marginTop: 8 }}>{t("settings.languageNote")}</Muted>

      <Divider />

      {/* Account */}
      <H2>{t("auth.account")}</H2>
      {session ? (
        <View style={{ marginTop: 10 }}>
          <Muted>
            {t("auth.signedInAs")} {session.user.email}
          </Muted>
          <Btn label={t("auth.signOut")} kind="ghost" onPress={signOut} style={{ marginTop: 12 }} />
        </View>
      ) : (
        <View style={{ marginTop: 10 }}>
          <Muted>{guest ? t("auth.localOnly") : ""}</Muted>
          <Btn label={t("auth.signIn")} kind="ghost" onPress={signOut} style={{ marginTop: 12 }} />
        </View>
      )}

      <Divider />

      {/* Names */}
      <H2>{t("settings.names")}</H2>
      <View style={{ marginTop: 10, gap: 12 }}>
        <View>
          <Label>{t("settings.partnerA")}</Label>
          <Input
            value={names[0]}
            onChangeText={(v) => setNames([v, names[1]])}
            onBlur={saveNames}
          />
        </View>
        <View>
          <Label>{t("settings.partnerB")}</Label>
          <Input
            value={names[1]}
            onChangeText={(v) => setNames([names[0], v])}
            onBlur={saveNames}
          />
        </View>
      </View>

      <Divider />

      {/* Safety + about */}
      <Btn label={t("settings.safety")} kind="ghost" onPress={() => router.push("/safety")} />
      <Card tone="panel" style={{ marginTop: 16 }}>
        <H2>{t("settings.aboutTitle")}</H2>
        <Muted style={{ marginTop: 8 }}>{t("settings.aboutBody")}</Muted>
      </Card>

      {/* Legal */}
      <View style={{ marginTop: 16 }}>
        {legalLinks.map((l) => (
          <Pressable
            key={l.url}
            onPress={() => Linking.openURL(l.url)}
            style={({ pressed }) => ({
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 13,
              borderBottomWidth: 1,
              borderBottomColor: p.line,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text style={{ color: p.ink, fontSize: 15 }}>{l.label}</Text>
            <Ionicons name="open-outline" size={16} color={p.muted} />
          </Pressable>
        ))}
      </View>

      {/* Danger zone */}
      {session && (
        <View style={{ marginTop: 24 }}>
          {!confirmDelete ? (
            <Pressable onPress={() => setConfirmDelete(true)}>
              <Muted style={{ textDecorationLine: "underline", color: p.ember }}>
                Delete my account and data
              </Muted>
            </Pressable>
          ) : (
            <Card style={{ borderColor: p.ember }}>
              <H2>Delete everything?</H2>
              <P style={{ marginTop: 8, fontSize: 14 }}>
                This permanently removes your account, your backup, your daily answers, and your
                notes. If you&apos;re the last member of a space, the space dissolves too. There
                is no undo.
              </P>
              {deleteError && <Muted style={{ color: p.ember, marginTop: 8 }}>{deleteError}</Muted>}
              <View style={{ flexDirection: "row", gap: 10, marginTop: 14 }}>
                <Btn label="Keep my account" onPress={() => setConfirmDelete(false)} style={{ flex: 1 }} />
                <Btn
                  label={deleting ? "Deleting…" : "Delete forever"}
                  kind="ghost"
                  disabled={deleting}
                  onPress={deleteAccount}
                  style={{ flex: 1, borderColor: p.ember }}
                />
              </View>
            </Card>
          )}
        </View>
      )}

      <Muted style={{ marginTop: 24, textAlign: "center", fontSize: 12 }}>Mend 1.0</Muted>
    </Screen>
  );
}
