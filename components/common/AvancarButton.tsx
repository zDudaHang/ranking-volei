import { ThemedButton } from "./ThemedButton";

interface AvancarButtonProps {
  onPress: () => void;
}

export function AvancarButton(props: AvancarButtonProps) {
  const { onPress } = props;

  return (
    <ThemedButton
      size="lg"
      color="success"
      onPress={onPress}
      iconRight
      icon={{ color: "white", name: "navigate-next" }}
    >
      Avançar
    </ThemedButton>
  );
}
