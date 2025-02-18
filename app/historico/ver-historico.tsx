import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import { ThemedText } from "@/components/common/ThemedText";
import { useHistoricoRankingStorage } from "@/hooks/useHistoricoRankingStorage";
import { Ranking } from "@/model/ranking";
import { useEffect, useState } from "react";

export default function VerHistoricoView() {
  const { get } = useHistoricoRankingStorage();

  const [historico, setHistorico] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    get(new Date()).then((historicoAtual) => {
      if (historicoAtual) {
        setHistorico(historicoAtual as Ranking[]);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <ThemedText>Carregando...</ThemedText>;
  }

  historico.forEach(console.log);

  return (
    <ParallaxScrollView>
      <ThemedText type="title">Histórico</ThemedText>
      {historico.map((ranking, index) => (
        <ThemedText key={index}>
          {ranking.getTurma().dia?.toLocaleDateString()}
        </ThemedText>
      ))}
    </ParallaxScrollView>
  );
}
