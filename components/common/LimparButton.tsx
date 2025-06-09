import { ThemedButton, ThemedButtonProps } from "./ThemedButton";

interface LimparButtonProps extends ThemedButtonProps {
  onPress: () => void;
}

export function LimparButton(props: LimparButtonProps) {
  const { onPress, ...rest } = props;

  return (
    <ThemedButton
      {...rest}
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
