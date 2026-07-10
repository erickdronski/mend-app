import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import i18n, { LANGUAGES, type LanguageCode } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { getProfile, saveLanguage, saveProfile, type Profile } from "@/lib/store";
import { Btn, Card, Divider, H1, H2, Input, Label, Muted, Screen, usePalette } from "@/components/ui";

export default function Settings() {
  const p = usePalette();
  const router = useRouter();
  const { t } = useTranslation();
  const { session, guest, signOut } = useAuth();
  const [lang, setLang] = useState<LanguageCode>((i18n.language as LanguageCode) ?? "en");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [names, setNames] = useState<[string, string]>(["", ""]);

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
    </Screen>
  );
}
