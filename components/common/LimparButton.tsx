import { ThemedButton } from "./ThemedButton";

interface LimparButtonProps {
  onPress: () => void;
}

export function LimparButton(props: LimparButtonProps) {
  const { onPress } = props;

  return (
    <ThemedButton
      type="outline"
      size="lg"
      onPress={onPress}
      icon={{ name: "clear" }}
      color="secondary"
    >
      Limpar
    </ThemedButton>
  );
}
