import { useThemeColor } from "@/hooks/useThemeColor";
import { Dialog } from "@rneui/base";
import { DialogActions } from "@rneui/base/dist/Dialog/Dialog.Actions";
import { DialogButton } from "@rneui/base/dist/Dialog/Dialog.Button";
import { DialogTitle } from "@rneui/base/dist/Dialog/Dialog.Title";
import { ThemedText } from "../common/ThemedText";
import { ThemedComponent } from "@/model/common";

interface SugestaoDuplasDisabledDialogProps extends ThemedComponent {
  isVisible: boolean;
  onBackdropPress: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export function SugestaoDuplasDisabledDialog(
  props: SugestaoDuplasDisabledDialogProps
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
        Não existem mais sugestões de duplas disponíveis.
      </ThemedText>
      <ThemedText type="default" style={{ paddingTop: 10, paddingBottom: 10 }}>
        Deseja reiniciar para ter mais opções de duplas?
      </ThemedText>
      <DialogActions>
        <DialogButton
          type="clear"
          titleStyle={{ color: primary }}
          onPress={onConfirm}
        >
          Sim, reiniciar
        </DialogButton>
        <DialogButton
          type="clear"
          titleStyle={{ color: primary }}
          onPress={onCancel}
        >
          Não, cancelar
        </DialogButton>
      </DialogActions>
    </Dialog>
  );
}
