import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import { ThemedButton } from "@/components/common/ThemedButton";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Historico } from "@/components/historico/Historico";
import { DiaPicker } from "@/components/picker/DiaPicker";
import { useHistoricoRankingStorage } from "@/hooks/useHistoricoRankingStorage";
import { Ranking } from "@/model/ranking";
import { asDdMmYyyyWithWeekDay, asHourAndMinutes } from "@/util/date-format";
import { useEffect, useState } from "react";
import { Alert, Share, StyleSheet } from "react-native";

export default function VerHistoricoView() {
  const hoje = new Date();

  const { get, remove, loading } = useHistoricoRankingStorage();
  const [historico, setHistorico] = useState<Ranking[]>([]);
  const [diaSelecionado, setDiaSelecionado] = useState<Date>(hoje);
  const [indicesSelecionados, setIndicesSelecionados] = useState<number[]>([]);

  const handleCheckboxPress = (indiceSelecionado: number) => {
    if (indicesSelecionados.includes(indiceSelecionado)) {
      const indicesSelecionadosSemIndiceSelecionado =
        indicesSelecionados.filter((indice) => indice !== indiceSelecionado);
      setIndicesSelecionados(indicesSelecionadosSemIndiceSelecionado);
    } else {
      setIndicesSelecionados([...indicesSelecionados, indiceSelecionado]);
    }
  };

  const isSelected = (index: number) => indicesSelecionados.includes(index);

  const handleShare = async () => {
    let message: string = `Ranking(s) do dia ${asDdMmYyyyWithWeekDay(
      diaSelecionado
    )}\n\n`;

    indicesSelecionados.forEach((indice) => {
      const ranking = historico[indice];
      const horario = ranking.getTurma().horario;
      if (horario) {
        message = message.concat(`Turma das ${asHourAndMinutes(horario)}\n`);
      }

      const participantes = ranking.getParticipantes();
      participantes.forEach(
        (participante) =>
          (message = message.concat(participante.toString(), "\n"))
      );

      message = message.concat("\n");
    });

    try {
      const result = await Share.share({ message });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const handleRemove = () => remove(diaSelecionado, indicesSelecionados);

  const handleBuscar = () => {
    get(diaSelecionado).then((historicoAtual) => {
      if (historicoAtual) {
        setHistorico(historicoAtual);
      } else {
        setHistorico([]);
      }
    });
  };

  const hasHistorico = historico.length > 0;

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
            setDiaSelecionado={setDiaSelecionado}
          />
          <ThemedButton
            icon="search"
            size="lg"
            onPress={handleBuscar}
            loading={loading}
          >
            Buscar
          </ThemedButton>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Rankings encontrados</ThemedText>
          {loading && <ThemedText type="secondary">Carregando...</ThemedText>}
          {!loading && !hasHistorico && (
            <ThemedText type="secondary">
              Nenhum ranking salvo no momento
            </ThemedText>
          )}

          {hasHistorico &&
            historico.map((ranking, index) => (
              <Historico
                key={index}
                ranking={ranking}
                index={index}
                isSelected={isSelected(index)}
                onPress={handleCheckboxPress}
              />
            ))}
        </ThemedView>
      </ParallaxScrollView>
      <ThemedView
        style={{
          flexDirection: "column",
          alignSelf: "center",
          justifyContent: "center",
          gap: 8,
          width: "90%",
          padding: 12,
        }}
      >
        <ThemedButton
          size="lg"
          color="danger"
          onPress={handleRemove}
          icon="delete"
          type="outline"
        >
          Remover selecionados
        </ThemedButton>
        <ThemedButton
          size="lg"
          color="primary"
          onPress={handleShare}
          icon="share"
        >
          Compartilhar selecionados
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
    marginBottom: 8,
  },
});
