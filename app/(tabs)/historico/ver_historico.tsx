import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import { ThemedButton } from "@/components/common/ThemedButton";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { HistoricoTable } from "@/components/historico/table/HistoricoTable";
import { DiaPicker } from "@/components/picker/DiaPicker";
import { useHistoricoRankingStorage } from "@/hooks/useHistoricoRankingStorage";
import { Ranking } from "@/model/ranking";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

interface VerHistoricoViewProps {}

export default function VerHistoricoView(props: VerHistoricoViewProps) {
  const hoje = new Date();

  const { get, loading } = useHistoricoRankingStorage();
  const [historico, setHistorico] = useState<Ranking[] | null>(null);
  const [diaSelecionado, setDiaSelecionado] = useState<Date>(hoje);
  const [indicesSelecionados, setIndicesSelecionados] = useState<number[]>([]);
  const isSelected = (index: number) => indicesSelecionados.includes(index);

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

  return (
    <>
      <ParallaxScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Histórico</ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <DiaPicker
            label="Buscar por rankins realizados no dia"
            maxDate={hoje}
            diaSelecionado={diaSelecionado}
            onChange={handleChangeDiaSelecionado}
          />
          <ThemedButton
            icon="search"
            size="lg"
            loading={loading}
            onPress={handleBuscar}
          >
            Buscar
          </ThemedButton>
        </ThemedView>
        {historico !== null && (
          <>
            <ThemedText type="subtitle">Rankings encontrados</ThemedText>
            <HistoricoTable
              diaSelecionado={diaSelecionado}
              historico={historico}
              indicesSelecionados={indicesSelecionados}
              isSelected={isSelected}
              loading={loading}
              setHistorico={setHistorico}
              setIndicesSelecionados={setIndicesSelecionados}
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
    marginBottom: 8,
  },
});
