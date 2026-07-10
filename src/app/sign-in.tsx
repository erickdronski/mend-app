import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { Btn, H1, Input, Label, Muted, P, Screen, usePalette } from "@/components/ui";

export default function SignIn() {
  const { t } = useTranslation();
  const p = usePalette();
  const { continueAsGuest } = useAuth();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      if (mode === "up") {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        if (!data.session) setNotice(t("auth.checkEmail"));
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch {
      setError(t("auth.authError"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Screen scroll={false} padded={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, justifyContent: "center", paddingHorizontal: 24 }}
      >
        <Text style={{ fontSize: 34, fontWeight: "800", color: p.ink }}>
          Mend<Text style={{ color: p.ember }}>.</Text>
        </Text>
        <H1 style={{ marginTop: 18 }}>{t("auth.welcomeTitle")}</H1>
        <P style={{ marginTop: 10 }}>{t("auth.welcomeBody")}</P>

        <View style={{ marginTop: 28, gap: 14 }}>
          <View>
            <Label>{t("auth.email")}</Label>
            <Input
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
          </View>
          <View>
            <Label>{t("auth.password")}</Label>
            <Input
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete={mode === "up" ? "new-password" : "current-password"}
            />
          </View>

          {error && <Muted style={{ color: p.ember }}>{error}</Muted>}
          {notice && <Muted style={{ color: p.moss }}>{notice}</Muted>}

          <Btn
            label={mode === "in" ? t("auth.signIn") : t("auth.signUp")}
            onPress={submit}
            disabled={busy || !email || password.length < 6}
          />
          <Btn
            label={mode === "in" ? t("auth.noAccount") : t("auth.haveAccount")}
            kind="ghost"
            onPress={() => setMode(mode === "in" ? "up" : "in")}
          />
        </View>

        <View style={{ marginTop: 24, alignItems: "center" }}>
          <Btn label={t("auth.guest")} kind="ghost" onPress={continueAsGuest} style={{ alignSelf: "stretch" }} />
          <Muted style={{ marginTop: 10, textAlign: "center" }}>{t("auth.localOnly")}</Muted>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
