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
import { Participante, TipoParticipante } from "@/model/participante";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [ranking] = useState<Ranking>(
    new Ranking({ horario: null, dia: null }, [])
  );

  const adicionarAlunos = (alunos: string[]) => {
    const novosParticipantes: Participante[] = alunos.map(
      (nome) => new Participante(nome, TipoParticipante.ALUNO)
    );

    ranking.adicionarParticipantes(novosParticipantes);
  };

  const adicionarProfessores = (professores: string[]) => {
    const novosParticipantes: Participante[] = professores.map(
      (nome) => new Participante(nome, TipoParticipante.PROFESSOR)
    );
    ranking.adicionarParticipantes(novosParticipantes);
  };

  const adicionarTurma = (horario: Date, dia: Date) => {
    ranking.setTurma({ dia, horario });
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <RankingContext.Provider
        value={{
          ranking,
          adicionarAlunos,
          adicionarProfessores,
          adicionarTurma,
        }}
      >
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </RankingContext.Provider>
    </ThemeProvider>
  );
}
