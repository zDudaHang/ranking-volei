import { ThemedView } from "@/components/common/ThemedView";
import { useHistoricoRankingStorage } from "@/hooks/useHistoricoRankingStorage";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedComponent } from "@/model/common";
import { Ranking } from "@/model/ranking";
import { asDdMmYyyyWithWeekDay, asHourAndMinutes } from "@/util/date-format";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { range, get } from "lodash";
import { Share, Alert } from "react-native";

export interface HistoricoHeaderProps extends ThemedComponent {
  historico: Ranking[];
  diaSelecionado: Date;
  indicesSelecionados: number[];
  setIndicesSelecionados: (novosIndicesSelecionados: number[]) => void;
  setHistorico: (novoHistorico: Ranking[]) => void;
}

export function HistoricoHeader(props: HistoricoHeaderProps) {
  const {
    diaSelecionado,
    indicesSelecionados,
    historico,
    setIndicesSelecionados,
    setHistorico,
    light,
    dark,
  } = props;

  const primary = useThemeColor({ light, dark }, "primary");
  const { get, remove } = useHistoricoRankingStorage();

  const isTodosSelecionados =
    historico.length > 0 && historico.length === indicesSelecionados.length;

  const handleSelectAll = () => {
    if (isTodosSelecionados) {
      setIndicesSelecionados([]);
    } else {
      setIndicesSelecionados(range(0, historico.length));
    }
  };

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

  return (
    <ThemedView
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        flex: 1,
        backgroundColor: primary,
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
  );
}
