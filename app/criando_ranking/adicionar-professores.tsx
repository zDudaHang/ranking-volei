import { AdicionarProfessores } from "@/components/adicionar/AdicionarProfessores";
import { AvancarButton } from "@/components/common/AvancarButton";
import { LimparButton } from "@/components/common/LimparButton";
import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import { ThemedButton } from "@/components/common/ThemedButton";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { RankingContext } from "@/context/RankingContext";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";

export default function AdicionarProfessoresView() {
  const [professores, setProfessores] = useState<string[]>([]);

  const { ranking, adicionarProfessores } = useContext(RankingContext);

  const adicionarProfessor = (nome: string) => {
    setProfessores([...professores, nome]);
  };

  const removerProfessor = (index: number) => {
    professores.splice(index, 1);
    setProfessores([...professores]);
  };

  const handleClear = () => setProfessores([]);

  const handleSubmit = () => {
    adicionarProfessores(professores);
    router.navigate("/criando_ranking/confirmacao-cadastro");
  };

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Professores</ThemedText>
        <ThemedText type="secondary">
          Adicione os professores que vão participar
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <AdicionarProfessores
          professores={professores}
          adicionarProfessor={adicionarProfessor}
          removerProfessor={removerProfessor}
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
