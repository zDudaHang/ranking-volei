import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedComponent } from "@/model/common";
import { Button, ButtonProps, IconNode } from "@rneui/base";

interface IconProp {
  name: string;
  type?: string;
}

interface ThemedButtonProps
  extends Omit<ButtonProps, "color" | "icon">,
    ThemedComponent {
  color?: "primary" | "danger" | "secondary";
  icon?: IconProp;
}

export function ThemedButton(props: ThemedButtonProps) {
  const {
    type = "solid",
    light,
    dark,
    color = "primary",
    icon,
    iconRight = true,
  } = props;

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
      titleStyle={!isSolid && { color: themeColor }}
      icon={{
        name: icon?.name,
        color: iconColor,
        size: 32,
        type: icon?.type ?? "material",
      }}
      iconRight={iconRight}
    />
  );
}
