import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedComponent } from "@/model/common";

export interface ThemedViewProps extends ViewProps, ThemedComponent {}

export function ThemedView({
  style,
  light,
  dark,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light, dark }, "background");

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
