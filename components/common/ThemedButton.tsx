import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedComponent } from "@/model/common";
import { Button, ButtonProps } from "@rneui/base";

interface ThemedButtonProps extends ButtonProps, ThemedComponent {}

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
