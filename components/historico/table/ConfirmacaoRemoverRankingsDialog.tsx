import { ThemedText } from "@/components/common/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedComponent } from "@/model/common";
import { Ranking } from "@/model/ranking";
import { asHourAndMinutes } from "@/util/date-format";
import { Dialog } from "@rneui/base";
import { DialogActions } from "@rneui/base/dist/Dialog/Dialog.Actions";
import { DialogButton } from "@rneui/base/dist/Dialog/Dialog.Button";
import { DialogTitle } from "@rneui/base/dist/Dialog/Dialog.Title";

interface ConfirmacaoRemoverRankingDialogProps extends ThemedComponent {
  isVisible: boolean;
  rankingsSeraoExcluidos: Ranking[];
  onBackdropPress: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmacaoRemoverRankingDialog(
  props: ConfirmacaoRemoverRankingDialogProps
) {
  const {
    isVisible,
    rankingsSeraoExcluidos,
    onBackdropPress,
    onConfirm,
    onCancel,
    dark,
    light,
  } = props;
  const primary = useThemeColor({ light, dark }, "primary");

  const horariosSeraoExcluidos = rankingsSeraoExcluidos.map((ranking) => {
    const horario = ranking.getTurma().horario;
    if (horario) {
      return asHourAndMinutes(horario);
    }
  });

  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      overlayStyle={{ backgroundColor: "white" }}
    >
      <DialogTitle title="Sugestão de duplas" />
      <ThemedText type="default" style={{ paddingTop: 10, paddingBottom: 10 }}>
        Serão{" "}
        <ThemedText type="defaultSemiBold">
          excluídas os seguintes rankings:{" "}
        </ThemedText>
        {horariosSeraoExcluidos.join(", ")}
      </ThemedText>
      <ThemedText type="default" style={{ paddingTop: 10, paddingBottom: 10 }}>
        Deseja confirma essa ação?
      </ThemedText>
      <DialogActions>
        <DialogButton
          type="clear"
          titleStyle={{ color: primary }}
          onPress={onConfirm}
        >
          Confirmar
        </DialogButton>
        <DialogButton
          type="clear"
          titleStyle={{ color: primary }}
          onPress={onCancel}
        >
          Cancelar
        </DialogButton>
      </DialogActions>
    </Dialog>
  );
}
