import { Stack } from "expo-router";
import "react-native-reanimated";

export default function CriandoRankingRootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "Criando um ranking",
      }}
    >
      <Stack.Screen name="adicionar-turma" />
      <Stack.Screen name="adicionar-participantes" />
      <Stack.Screen name="confirmacao-cadastro" />
    </Stack>
  );
}
