import { AdicionarAlunos } from "@/components/adicionar/AdicionarAlunos";
import { AvancarButton } from "@/components/common/AvancarButton";
import { LimparButton } from "@/components/common/LimparButton";
import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { RankingContext } from "@/context/RankingContext";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";

export default function AdicionarAlunosView() {
  const [alunos, setAlunos] = useState<string[]>([]);

  const { adicionarAlunos } = useContext(RankingContext);

  const adicionarAluno = (nome: string) => {
    setAlunos([...alunos, nome]);
  };

  const removerAluno = (index: number) => {
    alunos.splice(index, 1);
    setAlunos([...alunos]);
  };

  const handleClear = () => setAlunos([]);

  const handleSubmit = () => {
    adicionarAlunos(alunos);
    router.navigate("/ranking/criando_ranking/adicionar-professores");
  };

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Alunos</ThemedText>
        <ThemedText type="secondary">
          Adicione os alunos que vão participar
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <AdicionarAlunos
          alunos={alunos}
          adicionarAluno={adicionarAluno}
          removerAluno={removerAluno}
        />
      </ThemedView>
      <AvancarButton onPress={handleSubmit} />
      <LimparButton onPress={handleClear} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
