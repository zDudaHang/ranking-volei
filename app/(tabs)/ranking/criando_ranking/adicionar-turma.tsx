import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { RankingContext } from "@/context/RankingContext";

import { router } from "expo-router";
import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { DiaPicker } from "@/components/picker/DiaPicker";
import { HorarioPicker } from "@/components/picker/HorarioPicker";
import { AvancarButton } from "@/components/common/AvancarButton";

export default function AdicionarTurmaView() {
  const hoje = new Date();

  const [horarioSelecionado, setHorarioSelecionado] = useState<Date>(hoje);
  const [diaSelecionado, setDiaSelecionado] = useState<Date>(hoje);

  const { adicionarTurma } = useContext(RankingContext);

  const handleSubmit = () => {
    adicionarTurma(horarioSelecionado, diaSelecionado);
    router.navigate("/ranking/criando_ranking/adicionar-participantes");
  };

  return (
    <>
      <ParallaxScrollView>
        <ThemedView>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Turma</ThemedText>
            <ThemedText type="secondary">
              Preencha as informações sobre a turma
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <DiaPicker
              label="Dia"
              maxDate={hoje}
              diaSelecionado={diaSelecionado}
              onChange={setDiaSelecionado}
            />
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <HorarioPicker
              label="Horário"
              horarioSelecionado={horarioSelecionado}
              setHorarioSelecionado={setHorarioSelecionado}
            />
          </ThemedView>
        </ThemedView>
      </ParallaxScrollView>
      <ThemedView
        style={{
          flexDirection: "column",
          alignSelf: "center",
          gap: 8,
          width: "90%",
          padding: 20,
        }}
      >
        <AvancarButton onPress={handleSubmit} />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 32,
  },
  stepContainer: {
    gap: 8,
  },
});
