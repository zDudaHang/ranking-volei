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
import { ConfirmacaoRemoverRankingDialog } from "./ConfirmacaoRemoverRankingsDialog";
import { useState } from "react";

export interface HistoricoHeaderProps extends ThemedComponent {
  historico: Ranking[];
  diaSelecionado: Date;
  rankingsSelecionados: Ranking[];
  setRankingsSelecionados: (novosRankingsSelecionados: Ranking[]) => void;
  onRemove: (historico: Ranking[] | null) => void;
}

export function HistoricoHeader(props: HistoricoHeaderProps) {
  const {
    diaSelecionado,
    rankingsSelecionados,
    historico,
    setRankingsSelecionados,
    onRemove,
    light,
    dark,
  } = props;

  const primary = useThemeColor({ light, dark }, "primary");
  const { remove, loading } = useHistoricoRankingStorage();
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);

  const isTodosSelecionados =
    historico.length > 0 && historico.length === rankingsSelecionados.length;

  const handleSelectAll = () => {
    if (isTodosSelecionados) {
      setRankingsSelecionados([]);
    } else {
      setRankingsSelecionados(historico);
    }
  };

  const handleShare = async () => {
    let message: string = `Ranking(s) do dia ${asDdMmYyyyWithWeekDay(
      diaSelecionado
    )}\n\n`;

    rankingsSelecionados.forEach((ranking) => {
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

  const closeDialog = () => setIsDialogVisible(false);

  const handleConfirm = async () => {
    const uuids = rankingsSelecionados.map((ranking) => ranking.getUuid());
    const newHistorico = await remove(diaSelecionado, uuids);
    if (newHistorico) {
      onRemove([...newHistorico]);
    } else onRemove(newHistorico);
    closeDialog();
  };

  const handleClickRemover = () => {
    if (rankingsSelecionados.length > 0) {
      setIsDialogVisible(true);
    }
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
      <ConfirmacaoRemoverRankingDialog
        isVisible={isDialogVisible}
        rankingsSeraoExcluidos={rankingsSelecionados}
        onBackdropPress={closeDialog}
        onConfirm={handleConfirm}
        onCancel={closeDialog}
      />
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
        onPress={handleClickRemover}
        size="sm"
        loading={loading}
      />
    </ThemedView>
  );
}
