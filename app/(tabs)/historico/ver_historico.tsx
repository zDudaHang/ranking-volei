import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import { ThemedButton } from "@/components/common/ThemedButton";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Historico } from "@/components/historico/Historico";
import { DiaPicker } from "@/components/picker/DiaPicker";
import { useHistoricoRankingStorage } from "@/hooks/useHistoricoRankingStorage";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedComponent } from "@/model/common";
import { Ranking } from "@/model/ranking";
import { asDdMmYyyyWithWeekDay, asHourAndMinutes } from "@/util/date-format";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { CheckBox, Divider } from "@rneui/base";
import { range } from "lodash";
import { useState } from "react";
import { Alert, Share, StyleSheet } from "react-native";

interface VerHistoricoViewProps extends ThemedComponent {}

export default function VerHistoricoView(props: VerHistoricoViewProps) {
  const { light, dark } = props;
  const hoje = new Date();

  const { get, remove, loading } = useHistoricoRankingStorage();
  const [historico, setHistorico] = useState<Ranking[]>([]);
  const [diaSelecionado, setDiaSelecionado] = useState<Date>(hoje);
  const [indicesSelecionados, setIndicesSelecionados] = useState<number[]>([]);

  const primary = useThemeColor({ light, dark }, "primary");

  const handleDiaChange = (dia: Date) => {
    setDiaSelecionado(dia);
    handleBuscar();
  };

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

  const handleRemove = () => {
    remove(diaSelecionado, indicesSelecionados);
  };

  const handleBuscar = () => {
    get(diaSelecionado).then((historicoAtual) => {
      if (historicoAtual) {
        setHistorico(historicoAtual);
      } else {
        setHistorico([]);
      }
    });
  };

  const isHistoricoEmpty = historico.length === 0;
  const isTodosSelecionados =
    !isHistoricoEmpty && historico.length === indicesSelecionados.length;

  const handleSelectAll = () => {
    if (isTodosSelecionados) {
      setIndicesSelecionados([]);
    } else {
      setIndicesSelecionados(range(0, historico.length));
    }
  };

  const hasHistorico = !loading && !isHistoricoEmpty;

  return (
    <>
      <ParallaxScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Histórico</ThemedText>
        </ThemedView>
        <ThemedView>
          <DiaPicker
            label="Buscar por rankins realizados no dia"
            maxDate={hoje}
            diaSelecionado={diaSelecionado}
            onChange={handleDiaChange}
          />
        </ThemedView>
        <ThemedText type="subtitle">Rankings encontrados</ThemedText>
        {loading && <ThemedText type="secondary">Carregando...</ThemedText>}
        <ThemedView
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: 32,
            backgroundColor: primary,
            marginBottom: -16,
            padding: 8,
          }}
        >
          <MaterialCommunityIcons
            color="white"
            onPress={handleSelectAll}
            name={
              isTodosSelecionados
                ? "checkbox-multiple-blank"
                : "checkbox-multiple-marked"
            }
            size={32}
          />
          <MaterialIcons
            color="white"
            onPress={handleShare}
            name="share"
            size={32}
          />
          <MaterialIcons
            color="white"
            onPress={handleRemove}
            name="delete"
            size={32}
          />
        </ThemedView>
        <ThemedView>
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
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
  },
});
