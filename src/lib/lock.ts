/**
 * App lock: an optional Face ID / passcode gate in front of the whole app.
 * For users whose honest answers or journal-grade notes would cause real harm
 * if someone picked up their unlocked phone. Off by default, opt-in in Settings.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";

const KEY = "mend.lock";

export async function isLockEnabled(): Promise<boolean> {
  return (await AsyncStorage.getItem(KEY)) === "1";
}

export async function setLockEnabled(on: boolean): Promise<void> {
  await AsyncStorage.setItem(KEY, on ? "1" : "0");
}

/** True if the device can actually gate (has enrolled biometrics or a passcode). */
export async function lockAvailable(): Promise<boolean> {
  const enrolled = await LocalAuthentication.isEnrolledAsync();
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  return hasHardware && enrolled;
}

/** Prompt Face ID / Touch ID / device passcode. Resolves true if the user passed. */
export async function authenticate(): Promise<boolean> {
  const res = await LocalAuthentication.authenticateAsync({
    promptMessage: "Unlock Mend",
    fallbackLabel: "Use passcode",
    disableDeviceFallback: false,
  });
  return res.success;
}
