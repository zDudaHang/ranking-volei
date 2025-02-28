import { ThemedButton } from "./ThemedButton";

interface LimparButtonProps {
  onPress: () => void;
}

export function LimparButton(props: LimparButtonProps) {
  const { onPress } = props;

  return (
    <ThemedButton size="lg" type="outline" onPress={onPress} icon="clear">
      Limpar
    </ThemedButton>
  );
}
