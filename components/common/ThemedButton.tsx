import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedComponent } from "@/model/common";
import { Button, ButtonProps, IconNode } from "@rneui/base";

interface ThemedButtonProps
  extends Omit<ButtonProps, "color" | "icon">,
    ThemedComponent {
  color?: "primary" | "danger";
  icon?: string;
}

export function ThemedButton(props: ThemedButtonProps) {
  const { type = "solid", light, dark, color = "primary", icon } = props;
  const isOutline = type === "outline";
  const isSolid = type === "solid";

  const themeColor = useThemeColor({ light, dark }, color);
  const hasIcon = !!icon;
  const iconColor = hasIcon && isSolid ? "white" : themeColor;

  return (
    <Button
      {...props}
      color={themeColor}
      buttonStyle={isOutline && { borderColor: themeColor, borderWidth: 1 }}
      titleStyle={isOutline && { color: themeColor }}
      icon={{ name: icon, color: iconColor, size: 24 }}
      iconRight
    />
  );
}
