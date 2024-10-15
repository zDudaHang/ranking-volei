import { useThemeColor } from "@/hooks/useThemeColor"
import { useTheme } from "@react-navigation/native"
import { Button, ButtonProps } from "@rneui/base"

interface ThemedButtonProps extends ButtonProps {
  lightColor?: string
  darkColor?: string
}

export function ThemedButton(props: ThemedButtonProps) {
  const { lightColor, darkColor } = props
  const isOutline = props.type === "outline"
  const primary = useThemeColor(
    { light: lightColor, dark: darkColor },
    "primary"
  )

  return (
    <Button
      {...props}
      color={primary}
      buttonStyle={isOutline && { borderColor: primary, borderWidth: 1 }}
      titleStyle={isOutline && { color: primary }}
    />
  )
}
