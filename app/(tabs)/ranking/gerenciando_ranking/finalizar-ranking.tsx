import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import { ThemedButton } from "@/components/common/ThemedButton";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { ParticipanteView } from "@/components/participante/ParticipanteView";
import { RankingContext } from "@/context/RankingContext";
import { useHistoricoRankingStorage } from "@/hooks/useHistoricoRankingStorage";
import { router } from "expo-router";
import { useContext } from "react";
import { StyleSheet } from "react-native";

export default function FinalizarRankingView() {
  const { ranking, limparRankingAtual: clear } = useContext(RankingContext);

  const onCompleteStore = () => {
    clear();
    router.navigate("/ranking/criando_ranking/adicionar-turma");
  };

  const { loading, store } = useHistoricoRankingStorage({ onCompleteStore });

  if (!ranking) return null;

  const participantesOrdenadosPontuacaoDesc = ranking
    .getParticipantes()
    .sort((a, b) => a.compare(b));

  const handleSubmit = () => store(ranking);

  return (
    <>
      <ParallaxScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Finalização</ThemedText>
          <ThemedText type="secondary">
            As pontuações de cada participantes se encontram logo abaixo.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Participantes</ThemedText>
          {participantesOrdenadosPontuacaoDesc.map((participante, index) => (
            <ParticipanteView
              key={`participante-${index}`}
              participante={participante}
              index={index}
              mostrarPontuacao
            />
          ))}
        </ThemedView>
      </ParallaxScrollView>
      <ThemedView
        style={{
          flexDirection: "column",
          alignSelf: "center",
          gap: 8,
          width: "90%",
          padding: 12,
        }}
      >
        <ThemedButton size="lg" loading={loading} onPress={handleSubmit}>
          Finalizar
        </ThemedButton>
      </ThemedView>
    </>
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
  },
});
