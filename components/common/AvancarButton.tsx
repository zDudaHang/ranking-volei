import { ThemedButton, ThemedButtonProps } from "./ThemedButton";

interface AvancarButtonProps extends ThemedButtonProps {
  onPress: () => void;
}

export function AvancarButton(props: AvancarButtonProps) {
  const { onPress, ...rest } = props;

  return (
    <ThemedButton
      {...rest}
      size="lg"
      onPress={onPress}
      icon={{ name: "navigate-next" }}
    >
      Avançar
    </ThemedButton>
  );
}
