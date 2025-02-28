import { Stack } from "expo-router";

export default function RankingRootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="criando_ranking" />
      <Stack.Screen name="gerenciando_ranking" />
    </Stack>
  );
}
