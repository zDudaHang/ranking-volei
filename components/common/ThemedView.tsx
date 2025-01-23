import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  light?: string;
  dark?: string;
};

export function ThemedView({
  style,
  light,
  dark,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light, dark }, "background");

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
