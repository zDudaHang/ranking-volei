import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import { ThemedButton } from "@/components/common/ThemedButton";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { ErrorMessage } from "@/components/error/ErrorMessage";
import { ParticipanteView } from "@/components/participante/ParticipanteView";
import { RankingContext } from "@/context/RankingContext";
import { convertToFormModel } from "@/converter/converter-ranking";
import { useRankingStorage } from "@/hooks/useRankingStorage";
import { asWeekDay, asHourAndMinutes } from "@/util/date-format";
import {
  RankingFormModel,
  validate,
} from "@/validator/criar-ranking/validator";
import { Validation } from "@/validator/model";
import { Redirect, router } from "expo-router";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";

export default function ConfirmacaoCadastroRankingView() {
  const { ranking } = useContext(RankingContext);

  const onCompleteStore = () =>
    router.navigate("/ranking/gerenciando_ranking/definir-duplas");

  const { store, loading } = useRankingStorage({ onCompleteStore });

  if (!ranking) {
    return <Redirect href="/ranking/criando_ranking/adicionar-turma" />;
  }

  const { dia, horario } = ranking.getTurma();
  const participantes = ranking.getParticipantes();

  const handleSubmit = () => {
    store(ranking);
  };

  if (!dia || !horario) {
    return null;
  }

  return (
    <>
      <ParallaxScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Confirmação</ThemedText>
          <ThemedText type="secondary">
            Verifique se tudo está certo antes de criar o ranking
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Turma</ThemedText>
          <ThemedText type="default">
            {asWeekDay(dia)} às {asHourAndMinutes(horario)}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Participantes</ThemedText>
          {participantes.map((participante, index) => (
            <ParticipanteView
              key={`participante-${index}`}
              participante={participante}
              index={index}
            />
          ))}
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
        <ThemedButton
          icon={{ name: "done-all" }}
          size="lg"
          onPress={handleSubmit}
          loading={loading}
        >
          Confirmar
        </ThemedButton>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
  },
});
