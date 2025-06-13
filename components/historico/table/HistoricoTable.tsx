import { ThemedView } from "@/components/common/ThemedView";
import { HistoricoHeader, HistoricoHeaderProps } from "./HistoricoHeader";
import { HistoricoRow } from "./HistoricoRow";
import { ThemedText } from "@/components/common/ThemedText";
import { Ranking } from "@/model/ranking";
import { hasRanking } from "@/util/historico";
interface HistoricoTableProps
  extends Omit<HistoricoHeaderProps, "light" | "dark"> {
  loading: boolean;
  isSelected(ranking: Ranking): boolean;
}

export function HistoricoTable(props: HistoricoTableProps) {
  const {
    loading,
    diaSelecionado,
    historico,
    rankingsSelecionados,
    setRankingsSelecionados,
    onRemove,
    isSelected,
  } = props;

  const handleCheckboxPress = (ranking: Ranking) => {
    if (hasRanking(rankingsSelecionados, ranking)) {
      const novosUuidsSelecionados = rankingsSelecionados.filter(
        (r) => !r.equals(ranking)
      );
      setRankingsSelecionados(novosUuidsSelecionados);
    } else {
      setRankingsSelecionados([...rankingsSelecionados, ranking]);
    }
  };

  const isHistoricoEmpty = historico && historico.length === 0;
  const hasHistorico = !loading && !isHistoricoEmpty;

  if (loading) return <ThemedText type="secondary">Carregando...</ThemedText>;
  if (!loading && isHistoricoEmpty)
    return (
      <ThemedText type="secondary">Nenhum resultado encontrado</ThemedText>
    );

  return (
    <ThemedView style={{ marginTop: 12 }}>
      <HistoricoHeader
        diaSelecionado={diaSelecionado}
        historico={historico}
        rankingsSelecionados={rankingsSelecionados}
        setRankingsSelecionados={setRankingsSelecionados}
        onRemove={onRemove}
      />
      {hasHistorico &&
        historico?.map((ranking, index) => (
          <HistoricoRow
            key={index}
            ranking={ranking}
            index={index}
            isSelected={isSelected(ranking)}
            onPress={handleCheckboxPress}
          />
        ))}
    </ThemedView>
  );
}
