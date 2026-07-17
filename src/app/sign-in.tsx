import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, Text, View, useColorScheme } from "react-native";
import { useTranslation } from "react-i18next";
import * as AppleAuthentication from "expo-apple-authentication";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { Btn, H1, Input, Label, Muted, P, Screen, usePalette, Wordmark } from "@/components/ui";

export default function SignIn() {
  const { t } = useTranslation();
  const p = usePalette();
  const scheme = useColorScheme();
  const { continueAsGuest } = useAuth();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [guestBusy, setGuestBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [appleReady, setAppleReady] = useState(false);

  // Native Sign in with Apple: only offered where the OS supports it.
  useEffect(() => {
    if (Platform.OS !== "ios") return;
    AppleAuthentication.isAvailableAsync().then(setAppleReady).catch(() => {});
  }, []);

  async function signInWithApple() {
    setError(null);
    setNotice(null);
    try {
      const cred = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (!cred.identityToken) throw new Error("Apple didn't hand back a token. Try again.");
      const { error } = await supabase.auth.signInWithIdToken({
        provider: "apple",
        token: cred.identityToken,
      });
      if (error) throw error;
    } catch (e) {
      // User closed the Apple sheet: not an error worth showing.
      if ((e as { code?: string })?.code === "ERR_REQUEST_CANCELED") return;
      const msg = e instanceof Error && e.message ? e.message : "";
      setError(msg || t("auth.authError"));
    }
  }

  async function submit() {
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      if (mode === "up") {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        // No session back means either a confirmation email is pending OR
        // this email already has an account (the response is identical by
        // design). Say both honestly instead of promising an email that may
        // never come; and the no-account path is always one tap away.
        if (!data.session)
          setNotice(
            "If that email is new here, a confirmation is on its way (check spam). Already used it before? Tap 'I already have an account' and sign in instead, or just start without an account."
          );
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (e) {
      // Supabase's messages are actionable (e.g. the password policy);
      // show them instead of a generic shrug
      const msg = e instanceof Error && e.message ? e.message : "";
      setError(msg || t("auth.authError"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Screen scroll={false} padded={false} safeTop>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, justifyContent: "center", paddingHorizontal: 24 }}
      >
        <Wordmark size={34} />
        <H1 style={{ marginTop: 18 }}>{t("auth.welcomeTitle")}</H1>
        <P style={{ marginTop: 10 }}>{t("auth.welcomeBody")}</P>

        {/* The no-login path leads. It quietly creates an invisible account
            underneath (continueAsGuest), so the shared space still works. */}
        <Btn
          label="Start without an account"
          onPress={async () => {
            if (guestBusy) return;
            setGuestBusy(true);
            try {
              await continueAsGuest();
            } finally {
              setGuestBusy(false);
            }
          }}
          disabled={guestBusy}
          style={{ marginTop: 24 }}
        />
        <Muted style={{ marginTop: 8, textAlign: "center", fontSize: 12.5 }}>
          Nothing to fill in. You can add an account later in Settings.
        </Muted>

        {appleReady && (
          <View style={{ marginTop: 24 }}>
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
              buttonStyle={
                scheme === "dark"
                  ? AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
                  : AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
              }
              cornerRadius={14}
              style={{ height: 50 }}
              onPress={signInWithApple}
            />
          </View>
        )}

        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 20 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: p.line }} />
          <Muted style={{ fontSize: 12 }}>or with an account</Muted>
          <View style={{ flex: 1, height: 1, backgroundColor: p.line }} />
        </View>

        <View style={{ marginTop: 16, gap: 14 }}>
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

          {mode === "in" && (
            <Pressable
              onPress={async () => {
                if (!email) {
                  setError("Enter your email first, then tap forgot password.");
                  return;
                }
                setError(null);
                await supabase.auth.resetPasswordForEmail(email);
                setNotice("If that email has an account, a reset link is on its way.");
              }}
            >
              <Muted style={{ textDecorationLine: "underline" }}>Forgot password?</Muted>
            </Pressable>
          )}

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

      </KeyboardAvoidingView>
    </Screen>
  );
}
