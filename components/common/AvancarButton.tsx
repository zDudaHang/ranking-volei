import { ThemedButton } from "./ThemedButton";

interface AvancarButtonProps {
  onPress: () => void;
}

export function AvancarButton(props: AvancarButtonProps) {
  const { onPress } = props;

  return (
    <ThemedButton size="lg" onPress={onPress} icon="navigate-next">
      Avançar
    </ThemedButton>
  );
}
