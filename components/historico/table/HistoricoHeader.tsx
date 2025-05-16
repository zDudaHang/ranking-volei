import { ThemedButton } from "@/components/common/ThemedButton";
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
  uuidsSelecionados: string[];
  setUuidsSelecionados: (novosUuidsSelecionados: string[]) => void;
  onRemove: (historico: Ranking[] | null) => void;
}

export function HistoricoHeader(props: HistoricoHeaderProps) {
  const {
    diaSelecionado,
    uuidsSelecionados,
    historico,
    setUuidsSelecionados,
    onRemove,
    light,
    dark,
  } = props;

  const primary = useThemeColor({ light, dark }, "primary");
  const { get, remove, loading } = useHistoricoRankingStorage();

  const isTodosSelecionados =
    historico.length > 0 && historico.length === uuidsSelecionados.length;

  const handleSelectAll = () => {
    if (isTodosSelecionados) {
      setUuidsSelecionados([]);
    } else {
      const todosUuids = historico.map((ranking) => ranking.getUuid());
      setUuidsSelecionados(todosUuids);
    }
  };

  const handleShare = async () => {
    let message: string = `Ranking(s) do dia ${asDdMmYyyyWithWeekDay(
      diaSelecionado
    )}\n\n`;

    uuidsSelecionados.forEach((uuid) => {
      const ranking = historico.find((r) => r.getUuid() === uuid);

      if (ranking) {
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
      }
    });

    try {
      const result = await Share.share({ message });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const handleRemove = async () => {
    const newHistorico = await remove(diaSelecionado, uuidsSelecionados);
    if (newHistorico) {
      onRemove([...newHistorico]);
    } else onRemove(newHistorico);
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
      <ThemedButton
        icon={{
          name: isTodosSelecionados
            ? "checkbox-multiple-blank"
            : "checkbox-multiple-marked",
          type: "material-community",
        }}
        onPress={handleSelectAll}
        size="sm"
      />
      <ThemedButton icon={{ name: "share" }} onPress={handleShare} size="sm" />
      <ThemedButton
        icon={{ name: "delete" }}
        onPress={handleRemove}
        size="sm"
        loading={loading}
      />
    </ThemedView>
  );
}
