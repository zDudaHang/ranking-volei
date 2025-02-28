import { LimparButton } from "@/components/common/LimparButton";
import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import { ThemedButton } from "@/components/common/ThemedButton";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { ConfirmacaoSugestaoDuplasDialog } from "@/components/dupla/ConfirmacaoSugestaoDuplasDialog";
import { DuplaView } from "@/components/dupla/DuplaView";
import { ParticipanteView } from "@/components/participante/ParticipanteView";
import { DuplasContext } from "@/context/DuplasContext";
import { RankingContext } from "@/context/RankingContext";
import { Dupla } from "@/model/dupla";
import { Participante } from "@/model/participante";
import { hasDuplaInParticipantesRestantes } from "@/util/duplas-possiveis";
import { router } from "expo-router";
import { sample } from "lodash";
import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";

export default function DefinirDuplasView() {
  const { ranking } = useContext(RankingContext);

  const { definirDuplasAtuais, duplasPossiveis } = useContext(DuplasContext);

  const [primeiroIntegranteDupla, setPrimeiroIntegranteDupla] =
    useState<Participante>();

  const [duplas, setDuplas] = useState<Dupla[]>([]);
  const [participantesRestantes, setParticipantesRestantes] = useState<
    Participante[]
  >(ranking?.getParticipantes() ?? []);
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);

  if (!ranking) {
    return null;
  }

  const adicionarSegundoIntegranteDupla = (participante: Participante) => {
    if (primeiroIntegranteDupla) {
      const novosParticipantesRestantes = participantesRestantes.filter(
        (p: Participante) =>
          !p.equals(primeiroIntegranteDupla) && !p.equals(participante)
      );
      setParticipantesRestantes(novosParticipantesRestantes);
      setDuplas([...duplas, new Dupla(primeiroIntegranteDupla, participante)]);
      setPrimeiroIntegranteDupla(undefined);
    }
  };

  const onPress = (participante: Participante) => {
    if (!primeiroIntegranteDupla) {
      setPrimeiroIntegranteDupla(participante);
    } else if (primeiroIntegranteDupla.equals(participante)) {
      setPrimeiroIntegranteDupla(undefined);
    } else if (!primeiroIntegranteDupla.equals(participante)) {
      adicionarSegundoIntegranteDupla(participante);
    }
  };

  const isSelected = (participante: Participante) =>
    participante.equals(primeiroIntegranteDupla);

  const handleRemove = (index: number) => {
    const duplaRemovida = duplas.splice(index, 1);

    if (duplaRemovida.length === 1) {
      const [primeiroParticipante, segundoParticipante] =
        duplaRemovida[0].getParticipantes();

      if (primeiroParticipante && segundoParticipante) {
        setParticipantesRestantes([
          ...participantesRestantes,
          primeiroParticipante,
          segundoParticipante,
        ]);
        setDuplas([...duplas]);
      }
    }
  };

  const handleClear = () => {
    setDuplas([]);
    setParticipantesRestantes(ranking.getParticipantes());
  };

  const handleSubmit = () => {
    definirDuplasAtuais(duplas);
    router.navigate("/ranking/gerenciando_ranking/pontuar-duplas");
  };

  const hasParticipantesRestantes = participantesRestantes.length > 0;
  const hasDuplas = duplas.length > 0;

  const sugerirDuplas = () => {
    let participantesRestantes = ranking.getParticipantes();
    let duplasRestantes = duplasPossiveis;

    const duplasSugeridas: Dupla[] = [];

    while (participantesRestantes.length > 0) {
      const dupla = sample(duplasRestantes);
      if (
        dupla &&
        hasDuplaInParticipantesRestantes(participantesRestantes, dupla)
      ) {
        duplasSugeridas.push(dupla);
        participantesRestantes = participantesRestantes.filter(
          (p) => !dupla.contains(p)
        );
        duplasRestantes = duplasRestantes.filter(
          (d) => !d.containsPeloMenosUmParticipante(dupla)
        );
      }
    }

    setParticipantesRestantes([]);
    setDuplas(duplasSugeridas);
  };

  const handleClickSugerirDuplas = () => {
    if (hasDuplas) {
      setIsDialogVisible(true);
    } else {
      sugerirDuplas();
    }
  };

  const handleClickConfirmDialog = () => {
    sugerirDuplas();
    setIsDialogVisible(false);
  };

  const handleClickCancelDialog = () => setIsDialogVisible(false);

  const hasDuplasDefinidas = duplas.length > 0;

  return (
    <ParallaxScrollView>
      <ConfirmacaoSugestaoDuplasDialog
        isVisible={isDialogVisible}
        onBackdropPress={() => setIsDialogVisible(false)}
        onConfirm={handleClickConfirmDialog}
        onCancel={handleClickCancelDialog}
      />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Duplas</ThemedText>
        <ThemedText type="secondary">
          Defina as duplas selecionando os participantes ou clicando em 'Sugerir
          duplas'
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Participantes restantes</ThemedText>
        {!hasParticipantesRestantes && (
          <ThemedText type="secondary">Nenhum participante sobrando</ThemedText>
        )}
        {participantesRestantes.map((participante, index) => (
          <ParticipanteView
            key={`participante-${index}`}
            participante={participante}
            index={index}
            onPress={onPress}
            isSelected={isSelected(participante)}
          />
        ))}
      </ThemedView>
      <ThemedButton
        icon={{ color: "white", name: "lightbulb" }}
        onPress={handleClickSugerirDuplas}
      >
        Sugerir duplas
      </ThemedButton>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Duplas definidas</ThemedText>
        {!hasDuplasDefinidas && (
          <ThemedText type="secondary">Nenhuma dupla definida</ThemedText>
        )}
        {duplas.map((dupla, index) => (
          <DuplaView
            key={`dupla-${index}`}
            dupla={dupla}
            index={index}
            remover={handleRemove}
          />
        ))}
      </ThemedView>
      <ThemedButton size="lg" color="success" onPress={handleSubmit}>
        Confirmar
      </ThemedButton>
      <LimparButton onPress={handleClear} />
    </ParallaxScrollView>
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
    marginBottom: 8,
  },
});
