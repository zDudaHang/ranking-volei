import { Stack } from "expo-router";
import "react-native-reanimated";

export default function CriandoRankingRootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="adicionar-turma" />
      <Stack.Screen name="adicionar-alunos" />
      <Stack.Screen name="adicionar-professores" />
      <Stack.Screen name="confirmacao-cadastro" />
    </Stack>
  );
}
