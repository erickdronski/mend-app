import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { usePalette } from "@/components/ui";

export default function TabsLayout() {
  const p = usePalette();
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: p.moss,
        tabBarInactiveTintColor: p.muted,
        tabBarStyle: { backgroundColor: p.raised, borderTopColor: p.line },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("tabs.space"),
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="journey"
        options={{
          title: t("tabs.journey"),
          tabBarIcon: ({ color, size }) => <Ionicons name="trail-sign-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="talk"
        options={{
          title: t("tabs.talk"),
          tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="play"
        options={{
          title: t("tabs.play"),
          tabBarIcon: ({ color, size }) => <Ionicons name="dice-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          title: t("tabs.plan"),
          tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
