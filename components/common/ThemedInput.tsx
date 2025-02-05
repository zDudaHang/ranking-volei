import { useThemeColor } from "@/hooks/useThemeColor";
import { InputRef, ThemedComponent } from "@/model/common";
import { Input, InputProps } from "@rneui/base";
import { forwardRef } from "react";
import { StyleProp, StyleSheet, TextInputProps, TextStyle } from "react-native";

interface ThemedInputProps
  extends TextInputProps,
    InputProps,
    ThemedComponent {}

export const ThemedInput = forwardRef<InputRef, ThemedInputProps>(
  (props, ref) => {
    const { light, dark, style, ...rest } = props;

    const text = useThemeColor({ light, dark }, "text");

    const placeholder = useThemeColor({ light, dark }, "placeholder");

    const danger = useThemeColor({ light, dark }, "danger");

    const inputStyle: StyleProp<TextStyle> = StyleSheet.compose(style, {
      marginTop: 5,
    });

    return (
      <Input
        {...rest}
        style={inputStyle}
        ref={ref}
        placeholderTextColor={placeholder}
        labelStyle={{ color: text }}
        errorStyle={{ color: danger }}
        containerStyle={{ paddingLeft: 0 }}
      />
    );
  }
);
