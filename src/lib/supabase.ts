import "react-native-url-polyfill/auto";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

/**
 * Mend rides the same Supabase project as the rest of the suite for now
 * (a dedicated project is a paid decision, flagged in SPEC). Mend's tables
 * are namespaced mend_* with per-user RLS. The publishable key is designed
 * to ship in clients; RLS protects the data.
 */
const SUPABASE_URL =
  process.env.EXPO_PUBLIC_SUPABASE_URL ?? "https://nrxhewcnlqeosshwxbhj.supabase.co";
const SUPABASE_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_KEY ?? "sb_publishable_WsyNyZnOF4m-nW1Pl7tlsw_82WDW8tq";

// During the web static-export prerender there is no `window`, so session
// storage would crash the router server. Minimal config there; full
// persistence on native and in a real browser.
const webSSR = Platform.OS === "web" && typeof window === "undefined";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: webSSR
    ? { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
    : {
        storage: AsyncStorage,
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
});
