/**
 * Optional daily reminder: one gentle local notification a day nudging the
 * couple back to the daily question. Off by default, opt-in, quiet-hours-aware
 * (the user picks the hour). Local notifications only, no server, no push token.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

const ENABLED = "mend.notify.enabled";
const HOUR = "mend.notify.hour";

const LINES = [
  "Your question of the day is waiting.",
  "A small move toward each other today?",
  "Sixty seconds: today's question is up.",
  "One honest sentence. Today's question is ready.",
];

export async function notifyEnabled(): Promise<boolean> {
  return (await AsyncStorage.getItem(ENABLED)) === "1";
}

export async function notifyHour(): Promise<number> {
  const h = await AsyncStorage.getItem(HOUR);
  return h ? Number(h) : 19; // default 7pm
}

/** Turn the daily reminder on (requests permission, schedules) or off (cancels). */
export async function setNotify(on: boolean, hour: number): Promise<boolean> {
  await Notifications.cancelAllScheduledNotificationsAsync();
  if (!on) {
    await AsyncStorage.setItem(ENABLED, "0");
    return false;
  }
  const perm = await Notifications.requestPermissionsAsync();
  if (!perm.granted) {
    await AsyncStorage.setItem(ENABLED, "0");
    return false;
  }
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Mend",
      body: LINES[hour % LINES.length],
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute: 0,
    },
  });
  await AsyncStorage.setItem(ENABLED, "1");
  await AsyncStorage.setItem(HOUR, String(hour));
  return true;
}
