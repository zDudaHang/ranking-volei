import { ThemedView } from "@/components/common/ThemedView";
import { HistoricoHeader, HistoricoHeaderProps } from "./HistoricoHeader";
import { HistoricoRow } from "./HistoricoRow";
import { ThemedText } from "@/components/common/ThemedText";
interface HistoricoTableProps
  extends Omit<HistoricoHeaderProps, "light" | "dark"> {
  loading: boolean;
  isSelected(uuid: string): boolean;
}

export function HistoricoTable(props: HistoricoTableProps) {
  const {
    loading,
    diaSelecionado,
    historico,
    uuidsSelecionados,
    setUuidsSelecionados,
    onRemove,
    isSelected,
  } = props;

  const handleCheckboxPress = (uuidSelecionado: string) => {
    if (uuidsSelecionados.includes(uuidSelecionado)) {
      const novosUuidsSelecionados = uuidsSelecionados.filter(
        (indice) => indice !== uuidSelecionado
      );
      setUuidsSelecionados(novosUuidsSelecionados);
    } else {
      setUuidsSelecionados([...uuidsSelecionados, uuidSelecionado]);
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
        uuidsSelecionados={uuidsSelecionados}
        setUuidsSelecionados={setUuidsSelecionados}
        onRemove={onRemove}
      />
      {hasHistorico &&
        historico?.map((ranking, index) => (
          <HistoricoRow
            key={index}
            ranking={ranking}
            index={index}
            isSelected={isSelected(ranking.getUuid())}
            onPress={handleCheckboxPress}
          />
        ))}
    </ThemedView>
  );
}
