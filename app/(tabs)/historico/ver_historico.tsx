import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import { ThemedButton } from "@/components/common/ThemedButton";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { HistoricoTable } from "@/components/historico/table/HistoricoTable";
import { DiaPicker } from "@/components/picker/DiaPicker";
import { useHistoricoRankingStorage } from "@/hooks/useHistoricoRankingStorage";
import { Ranking } from "@/model/ranking";
import { compareAsc } from "date-fns";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

interface VerHistoricoViewProps {}

export default function VerHistoricoView(props: VerHistoricoViewProps) {
  const hoje = new Date();

  const { get, loading } = useHistoricoRankingStorage();
  const [historico, setHistorico] = useState<Ranking[] | null>(null);
  const [diaSelecionado, setDiaSelecionado] = useState<Date>(hoje);
  const [uuidsSelecionados, setUuidsSelecionados] = useState<string[]>([]);
  const isSelected = (uuid: string) => uuidsSelecionados.includes(uuid);

  const handleBuscar = () => {
    get(diaSelecionado).then((historicoAtual) => {
      if (historicoAtual) {
        setHistorico(historicoAtual);
      } else {
        setHistorico([]);
      }
    });
  };

  function handleChangeDiaSelecionado(dia: Date) {
    if (historico) setHistorico(null);
    setDiaSelecionado(dia);
  }

  const historicoOrdenadoPorHorario = historico?.sort(
    (rankingA: Ranking, rankingB: Ranking) => {
      const horarioA = rankingA.getTurma().horario;
      const horarioB = rankingB.getTurma().horario;
      if (horarioA && horarioB) {
        return compareAsc(horarioA, horarioB);
      }
      return 0;
    }
  );

  const handleRemove = (ranking: Ranking[] | null) => setHistorico(ranking);

  return (
    <>
      <ParallaxScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Histórico</ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <DiaPicker
            label="Buscar por rankings realizados no dia"
            maxDate={hoje}
            diaSelecionado={diaSelecionado}
            onChange={handleChangeDiaSelecionado}
          />
          <ThemedButton
            icon={{ name: "search" }}
            size="lg"
            loading={loading}
            onPress={handleBuscar}
          >
            Buscar
          </ThemedButton>
        </ThemedView>
        {historicoOrdenadoPorHorario !== undefined && (
          <>
            <ThemedText type="subtitle">Rankings encontrados</ThemedText>
            <HistoricoTable
              diaSelecionado={diaSelecionado}
              historico={historicoOrdenadoPorHorario}
              uuidsSelecionados={uuidsSelecionados}
              isSelected={isSelected}
              loading={loading}
              setUuidsSelecionados={setUuidsSelecionados}
              onRemove={handleRemove}
            />
          </>
        )}
      </ParallaxScrollView>
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
