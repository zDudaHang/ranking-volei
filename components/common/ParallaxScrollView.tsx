import type { PropsWithChildren } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, { useAnimatedRef } from "react-native-reanimated";

import { ThemedView } from "@/components/common/ThemedView";

type Props = PropsWithChildren<{}>;

export default function ParallaxScrollView({ children }: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: "hidden",
  },
});
