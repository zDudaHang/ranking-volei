import { useThemeColor } from "@/hooks/useThemeColor";
import { Button, ButtonProps } from "@rneui/base";

interface ThemedButtonProps extends ButtonProps {
  light?: string;
  dark?: string;
}

export function ThemedButton(props: ThemedButtonProps) {
  const { light, dark } = props;
  const isOutline = props.type === "outline";
  const primary = useThemeColor({ light, dark }, "primary");

  return (
    <Button
      {...props}
      color={primary}
      buttonStyle={isOutline && { borderColor: primary, borderWidth: 1 }}
      titleStyle={isOutline && { color: primary }}
    />
  );
}
