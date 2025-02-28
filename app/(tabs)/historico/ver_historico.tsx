import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import { ThemedButton } from "@/components/common/ThemedButton";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Historico } from "@/components/historico/Historico";
import { useHistoricoRankingStorage } from "@/hooks/useHistoricoRankingStorage";
import { Ranking } from "@/model/ranking";
import { asDdMmYyyyWithWeekDay } from "@/util/date-format";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

export default function VerHistoricoView() {
  const { get } = useHistoricoRankingStorage();

  const [historico, setHistorico] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const hoje = new Date();

  useEffect(() => {
    setLoading(true);
    get(hoje).then((historicoAtual) => {
      if (historicoAtual) {
        setHistorico(historicoAtual);
      }
      setLoading(false);
    });
  }, []);

  const hasHistorico = !loading && !!historico && historico.length > 0;

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Histórico</ThemedText>
        <ThemedText type="secondary">
          Todos os rankings realizados no dia {asDdMmYyyyWithWeekDay(hoje)}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        {loading && <ThemedText>Carregando...</ThemedText>}

        {!hasHistorico && (
          <ThemedText type="secondary">
            Nenhum ranking salvo no momento
          </ThemedText>
        )}

        <ThemedText type="subtitle">Rankings</ThemedText>
        {hasHistorico &&
          historico.map((ranking, index) => (
            <Historico key={index} ranking={ranking} />
          ))}
      </ThemedView>
      <ThemedButton
        size="lg"
        color="primary"
        onPress={console.log}
        icon="share"
      >
        Compartilhar selecionados
      </ThemedButton>
      <ThemedButton
        size="lg"
        color="danger"
        onPress={console.log}
        icon="delete"
      >
        Remover selecionados
      </ThemedButton>
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
