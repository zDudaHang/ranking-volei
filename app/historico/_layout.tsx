import { Stack } from "expo-router";

export default function HistoricoRootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ver-historico" />
    </Stack>
  );
}
