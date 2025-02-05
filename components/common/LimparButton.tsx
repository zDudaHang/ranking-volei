import { ThemedComponent } from "@/model/common";
import { ThemedButton } from "./ThemedButton";
import { useThemeColor } from "@/hooks/useThemeColor";

interface LimparButtonProps extends ThemedComponent {
  onPress: () => void;
}

export function LimparButton(props: LimparButtonProps) {
  const { onPress, light, dark } = props;

  const primary = useThemeColor({ light, dark }, "primary");

  return (
    <ThemedButton
      size="lg"
      type="outline"
      onPress={onPress}
      iconRight
      icon={{ color: primary, name: "clear" }}
    >
      Limpar
    </ThemedButton>
  );
}
