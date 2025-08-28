import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Ranking } from "@/model/ranking";
import { RankingContext } from "@/context/RankingContext";
import { Participante } from "@/model/participante";
import { useNavigationContainerRef } from "expo-router";
import { useReactNavigationDevTools } from "@bam.tech/react-navigation-visualizer-dev-plugin";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [rankingAtual, setRankingAtual] = useState<Ranking>(
    new Ranking({ horario: null, dia: null }, [])
  );

  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);

  const adicionarTurma = (horario: Date, dia: Date) => {
    rankingAtual.setTurma({ dia, horario });
  };

  const limparRankingAtual = () =>
    setRankingAtual(new Ranking({ horario: null, dia: null }, []));

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const adicionarParticipantes = (participantes: Participante[]) => {
    rankingAtual.setParticipantes(participantes);
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <RankingContext.Provider
        value={{
          ranking: rankingAtual,
          adicionarTurma,
          adicionarParticipantes,
          limparRankingAtual,
        }}
      >
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </RankingContext.Provider>
    </ThemeProvider>
  );
}
