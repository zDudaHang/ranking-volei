import { useThemeColor } from "@/hooks/useThemeColor";
import { Dialog } from "@rneui/base";
import { DialogActions } from "@rneui/base/dist/Dialog/Dialog.Actions";
import { DialogButton } from "@rneui/base/dist/Dialog/Dialog.Button";
import { DialogTitle } from "@rneui/base/dist/Dialog/Dialog.Title";
import { ThemedText } from "../common/ThemedText";
import { ThemedComponent } from "@/model/common";

interface ConfirmacaoDescartarMudancasDialogProps extends ThemedComponent {
  isVisible: boolean;
  message: string;
  onBackdropPress: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmacaoDescartarMudancasDialog(
  props: ConfirmacaoDescartarMudancasDialogProps
) {
  const {
    isVisible,
    message,
    onBackdropPress,
    onConfirm,
    onCancel,
    dark,
    light,
  } = props;
  const placeholder = useThemeColor({ light, dark }, "placeholder");
  const danger = useThemeColor({ light, dark }, "danger");

  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      overlayStyle={{ backgroundColor: "white" }}
    >
      <DialogTitle title="Deseja descartar as mudanças?" />
      <ThemedText type="default" style={{ paddingTop: 10, paddingBottom: 10 }}>
        {message}
      </ThemedText>
      <DialogActions>
        <DialogButton
          type="clear"
          titleStyle={{ color: placeholder }}
          onPress={onCancel}
        >
          Não, cancelar
        </DialogButton>
        <DialogButton
          type="clear"
          titleStyle={{ color: danger }}
          onPress={onConfirm}
        >
          Sim, descartar
        </DialogButton>
      </DialogActions>
    </Dialog>
  );
}
