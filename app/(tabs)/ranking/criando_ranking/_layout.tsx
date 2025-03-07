import { RankingContext } from "@/context/RankingContext";
import { Stack, router } from "expo-router";
import { useContext } from "react";
import "react-native-reanimated";

export default function CriandoRankingRootLayout() {
  const { removerTodosAlunos, removerTodosProfessores } =
    useContext(RankingContext);

  const handleBackAdicionarAlunos = (canGoBack: boolean | undefined) => {
    console.log("handleBackAdicionarAlunos");
    if (canGoBack === true) {
      console.log("canGoBack");
      removerTodosAlunos();
      router.back();
    }
  };

  const handleBackAdicionarProfessores = (canGoBack: boolean | undefined) => {
    console.log("handleBackAdicionarProfessores");
    if (canGoBack === true) {
      console.log("canGoBack");
      removerTodosProfessores();
      router.back();
    }
  };

  return (
    <Stack screenOptions={{ headerTitle: "Criando um ranking" }}>
      <Stack.Screen name="adicionar-turma" />
      <Stack.Screen name="adicionar-alunos" />
      <Stack.Screen name="adicionar-professores" />
      <Stack.Screen name="confirmacao-cadastro" />
    </Stack>
  );
}
