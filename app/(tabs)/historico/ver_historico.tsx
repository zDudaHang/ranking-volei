import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import { ThemedButton } from "@/components/common/ThemedButton";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Historico } from "@/components/historico/Historico";
import { useHistoricoRankingStorage } from "@/hooks/useHistoricoRankingStorage";
import { Ranking } from "@/model/ranking";
import { asDdMmYyyyWithWeekDay, asHourAndMinutes } from "@/util/date-format";
import { useEffect, useState } from "react";
import { Alert, Share, StyleSheet } from "react-native";

export default function VerHistoricoView() {
  const { get } = useHistoricoRankingStorage();

  const [historico, setHistorico] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [indicesSelecionados, setIndicesSelecionados] = useState<number[]>([]);

  const handlePress = (indiceSelecionado: number) => {
    if (indicesSelecionados.includes(indiceSelecionado)) {
      const indicesSelecionadosSemIndiceSelecionado =
        indicesSelecionados.filter((indice) => indice !== indiceSelecionado);
      setIndicesSelecionados(indicesSelecionadosSemIndiceSelecionado);
    } else {
      setIndicesSelecionados([...indicesSelecionados, indiceSelecionado]);
    }
  };

  const isSelected = (index: number) => indicesSelecionados.includes(index);

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

  const handleShare = async () => {
    let message: string = `Ranking(s) do dia ${asDdMmYyyyWithWeekDay(
      hoje
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
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
          Alert.alert("Sucesso!");
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Histórico</ThemedText>
        <ThemedText type="secondary">
          Todos os rankings realizados no dia{" "}
          <ThemedText type="defaultSemiBold">
            {asDdMmYyyyWithWeekDay(hoje)}
          </ThemedText>
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        {loading && <ThemedText>Carregando...</ThemedText>}

        <ThemedText type="subtitle">Rankings</ThemedText>
        {!hasHistorico && (
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
              onPress={handlePress}
            />
          ))}
      </ThemedView>
      <ThemedButton
        size="lg"
        color="primary"
        onPress={handleShare}
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
