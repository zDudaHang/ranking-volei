import { useThemeColor } from "@/hooks/useThemeColor";
import { InputRef, ThemedComponent } from "@/model/common";
import { Input, InputProps } from "@rneui/base";
import { forwardRef } from "react";
import { StyleProp, StyleSheet, TextInputProps, TextStyle } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export interface ThemedInputProps
  extends TextInputProps,
    InputProps,
    ThemedComponent {
  required?: boolean;
  clearable?: boolean;
  onClear?: () => void;
}

export const ThemedInput = forwardRef<InputRef, ThemedInputProps>(
  (props, ref) => {
    const {
      light,
      dark,
      style,
      required = false,
      clearable = false,
      onClear,
      ...rest
    } = props;

    const text = useThemeColor({ light, dark }, "text");

    const placeholder = useThemeColor({ light, dark }, "placeholder");

    const danger = useThemeColor({ light, dark }, "danger");

    const inputStyle: StyleProp<TextStyle> = StyleSheet.compose(style, {
      marginTop: 5,
    });

    const hasError = !!rest.errorMessage;

    return (
      <Input
        rightIcon={
          clearable && {
            name: "close",
            size: 32,
            color: placeholder,
            onPress: onClear,
          }
        }
        {...rest}
        label={
          <ThemedView style={{ marginTop: 10 }}>
            <ThemedText type="defaultSemiBold">
              {rest.label}
              {required && (
                <ThemedText type="defaultSemiBold" style={{ color: danger }}>
                  {" "}
                  *
                </ThemedText>
              )}
            </ThemedText>
          </ThemedView>
        }
        style={inputStyle}
        ref={ref}
        placeholderTextColor={placeholder}
        labelStyle={{ color: text }}
        errorStyle={{ color: danger, fontSize: 16 }}
        containerStyle={{ paddingLeft: 0 }}
        inputContainerStyle={hasError && { borderColor: danger }}
      />
    );
  }
);
