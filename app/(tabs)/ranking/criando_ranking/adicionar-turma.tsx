import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { RankingContext } from "@/context/RankingContext";
import { InputRef } from "@/model/common";

import { router } from "expo-router";
import React, { useContext, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { DiaPicker } from "@/components/picker/DiaPicker";
import { HorarioPicker } from "@/components/picker/HorarioPicker";
import { AvancarButton } from "@/components/common/AvancarButton";
import { LimparButton } from "@/components/common/LimparButton";

export default function AdicionarTurmaView() {
  const hoje = new Date();

  const [horarioSelecionado, setHorarioSelecionado] = useState<Date>(hoje);
  const [diaSelecionado, setDiaSelecionado] = useState<Date>(hoje);

  const diaSemanaRef = useRef<InputRef>(null);
  const horarioRef = useRef<InputRef>(null);

  const { adicionarTurma } = useContext(RankingContext);

  const handleSubmit = () => {
    adicionarTurma(horarioSelecionado, diaSelecionado);
    router.navigate("/ranking/criando_ranking/adicionar-alunos");
  };

  const handleClear = () => {
    diaSemanaRef.current?.clear();
    horarioRef.current?.clear();
    diaSemanaRef.current?.focus();
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
          padding: 12,
        }}
      >
        <LimparButton onPress={handleClear} />
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
    // backgroundColor: "blue",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    // backgroundColor: "pink",
  },
});
