import { useThemeColor } from "@/hooks/useThemeColor"
import { InputRef } from "@/model/common"
import { Input, InputProps } from "@rneui/base"
import { forwardRef } from "react"
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
        ref={ref}
        placeholderTextColor={placeholder}
        labelStyle={{ color: text }}
        errorStyle={{ color: danger }}
        containerStyle={{ paddingLeft: 0 }}
      />
    )
  }
)
