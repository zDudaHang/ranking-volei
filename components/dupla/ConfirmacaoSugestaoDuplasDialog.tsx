import { useThemeColor } from "@/hooks/useThemeColor";
import { Dialog } from "@rneui/base";
import { DialogActions } from "@rneui/base/dist/Dialog/Dialog.Actions";
import { DialogButton } from "@rneui/base/dist/Dialog/Dialog.Button";
import { DialogTitle } from "@rneui/base/dist/Dialog/Dialog.Title";
import { ThemedText } from "../common/ThemedText";
import { ThemedComponent } from "@/model/common";

interface ConfirmacaoSugestaoDuplasDialogProps extends ThemedComponent {
  isVisible: boolean;
  onBackdropPress: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmacaoSugestaoDuplasDialog(
  props: ConfirmacaoSugestaoDuplasDialogProps
) {
  const { isVisible, onBackdropPress, onConfirm, onCancel, dark, light } =
    props;
  const primary = useThemeColor({ light, dark }, "primary");

  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      overlayStyle={{ backgroundColor: "white" }}
    >
      <DialogTitle title="Sugestão de duplas" />
      <ThemedText type="default" style={{ paddingTop: 10, paddingBottom: 10 }}>
        Serão{" "}
        <ThemedText type="defaultSemiBold">excluídas as duplas </ThemedText>
        já definidas.
      </ThemedText>
      <ThemedText type="default" style={{ paddingTop: 10, paddingBottom: 10 }}>
        Deseja confirma essa ação?
      </ThemedText>
      <DialogActions>
        <DialogButton titleStyle={{ color: primary }} onPress={onConfirm}>
          Confirmar
        </DialogButton>
        <DialogButton titleStyle={{ color: primary }} onPress={onCancel}>
          Cancelar
        </DialogButton>
      </DialogActions>
    </Dialog>
  );
}
