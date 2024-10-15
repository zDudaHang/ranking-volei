import { useThemeColor } from "@/hooks/useThemeColor"
import { InputRef } from "@/model/common"
import { useTheme } from "@react-navigation/native"
import { Input, InputProps } from "@rneui/base"
import { RefObject, forwardRef } from "react"
import { TextInputProps } from "react-native"

interface ThemedInputProps extends TextInputProps, InputProps {
  lightColor?: string
  darkColor?: string
}

export const ThemedInput = forwardRef<InputRef, ThemedInputProps>(
  (props, ref) => {
    const { lightColor, darkColor, ...rest } = props

    const text = useThemeColor({ light: lightColor, dark: darkColor }, "text")

    const placeholder = useThemeColor(
      { light: lightColor, dark: darkColor },
      "placeholder"
    )

    const danger = useThemeColor(
      { light: lightColor, dark: darkColor },
      "danger"
    )

    return (
      <Input
        {...rest}
        placeholderTextColor={placeholder}
        labelStyle={{ color: text }}
        ref={ref}
        errorStyle={{ color: danger }}
      />
    )
  }
)

export default ThemedInput
