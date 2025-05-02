import { ThemedView } from "@/components/common/ThemedView";
import { HistoricoHeader, HistoricoHeaderProps } from "./HistoricoHeader";
import { HistoricoRow } from "./HistoricoRow";
import { ThemedText } from "@/components/common/ThemedText";
interface HistoricoTableProps
  extends Omit<HistoricoHeaderProps, "light" | "dark"> {
  loading: boolean;
  isSelected(index: number): boolean;
}

export function HistoricoTable(props: HistoricoTableProps) {
  const {
    loading,
    diaSelecionado,
    historico,
    indicesSelecionados,
    setHistorico,
    setIndicesSelecionados,
    isSelected,
  } = props;

  const handleCheckboxPress = (indiceSelecionado: number) => {
    if (indicesSelecionados.includes(indiceSelecionado)) {
      const indicesSelecionadosSemIndiceSelecionado =
        indicesSelecionados.filter((indice) => indice !== indiceSelecionado);
      setIndicesSelecionados(indicesSelecionadosSemIndiceSelecionado);
    } else {
      setIndicesSelecionados([...indicesSelecionados, indiceSelecionado]);
    }
  };

  const isHistoricoEmpty = historico && historico.length === 0;
  const hasHistorico = !loading && !isHistoricoEmpty;

  if (historico === null) return null;
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
        indicesSelecionados={indicesSelecionados}
        setHistorico={setHistorico}
        setIndicesSelecionados={setIndicesSelecionados}
      />
      {hasHistorico &&
        historico?.map((ranking, index) => (
          <HistoricoRow
            key={index}
            ranking={ranking}
            index={index}
            isSelected={isSelected(index)}
            onPress={handleCheckboxPress}
          />
        ))}
    </ThemedView>
  );
}
