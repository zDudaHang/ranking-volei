import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedComponent } from "@/model/common";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

interface TabLayoutProps extends ThemedComponent {}

export default function TabLayout(props: TabLayoutProps) {
  const { light, dark } = props;
  const primary = useThemeColor({ light, dark }, "primary");

  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: primary, headerShown: false }}
    >
      <Tabs.Screen
        name="ranking"
        options={{
          title: "Ranking",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="sports-volleyball" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="historico"
        options={{
          title: "Histórico",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="history" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
