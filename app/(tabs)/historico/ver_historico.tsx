import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import { ThemedButton } from "@/components/common/ThemedButton";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Historico } from "@/components/historico/Historico";
import { useHistoricoRankingStorage } from "@/hooks/useHistoricoRankingStorage";
import { Ranking } from "@/model/ranking";
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
          Todos os rankings realizados no dia {hoje.toLocaleDateString()}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        {loading && <ThemedText>Carregando...</ThemedText>}

        {!hasHistorico && (
          <ThemedText type="secondary">
            Nenhum ranking salvo no momento
          </ThemedText>
        )}

        {hasHistorico &&
          historico.map((ranking, index) => (
            <Historico key={index} ranking={ranking} />
          ))}
      </ThemedView>
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
