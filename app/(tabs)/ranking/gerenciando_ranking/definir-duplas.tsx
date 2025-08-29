import { AvancarButton } from "@/components/common/AvancarButton";
import { LimparButton } from "@/components/common/LimparButton";
import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import { ThemedButton } from "@/components/common/ThemedButton";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { ConfirmacaoSugestaoDuplasDialog } from "@/components/dupla/ConfirmacaoSugestaoDuplasDialog";
import { DuplaView } from "@/components/dupla/DuplaView";
import { SugestaoDuplasDisabledDialog } from "@/components/dupla/SugestaoDuplasDisabledDialog";
import { ErrorMessage } from "@/components/error/ErrorMessage";
import { ParticipanteView } from "@/components/participante/ParticipanteView";
import { DuplasContext } from "@/context/DuplasContext";
import { RankingContext } from "@/context/RankingContext";
import { Dupla } from "@/model/dupla";
import { Participante } from "@/model/participante";
import { hasDuplaInParticipantesRestantes } from "@/util/duplas-possiveis";
import { Validation } from "@/validator/model-errorObject";
import { validateDefinirDuplas } from "@/validator/validator-definirDuplas";
import { Tooltip } from "@rneui/base";
import { useRouter } from "expo-router";
import { noop, sample } from "lodash";
import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";

export interface DefinirDuplasFormModel {
  participantesRestantes: Participante[];
  duplas: Dupla[];
}

export default function DefinirDuplasView() {
  const { ranking } = useContext(RankingContext);

  const { definirDuplasAtuais, duplasPossiveis, reiniciarSugestaoDuplas } =
    useContext(DuplasContext);
  const router = useRouter();

  const [primeiroIntegranteDupla, setPrimeiroIntegranteDupla] = useState<
    Participante | undefined
  >(undefined);

  const [duplas, setDuplas] = useState<Dupla[]>([]);

  const [participantesRestantes, setParticipantesRestantes] = useState<
    Participante[]
  >(ranking?.getParticipantes() ?? []);

  const [
    isConfirmacaoSugestaoDuplasDialogVisible,
    setIsConfirmacaoSugestaoDuplaDialogVisible,
  ] = useState<boolean>(false);
  const [isSugestaoDuplasDisabledVisible, setIsSugestaoDuplasDisabledVisible] =
    useState<boolean>(false);

  const [errors, setErrors] =
    useState<Validation<DefinirDuplasFormModel> | null>(null);

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

  const clear = () => {
    setParticipantesRestantes(ranking.getParticipantes());
    setPrimeiroIntegranteDupla(undefined);
    setDuplas([]);
  };

  const handleSubmit = () => {
    const errors = validateDefinirDuplas(participantesRestantes);
    if (errors.isValid()) {
      definirDuplasAtuais(duplas);
      router.navigate("./pontuar-duplas");
      clear();
    } else {
      setErrors(errors);
    }
  };

  const hasParticipantesRestantes = participantesRestantes.length > 0;
  const hasDuplas = duplas.length > 0;

  const sugerirDuplas = () => {
    let participantesRestantes = [...ranking.getParticipantes()];
    let duplasRestantes = [...duplasPossiveis];

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

  const closeConfirmacaoSugestaoDuplaDialog = () =>
    setIsConfirmacaoSugestaoDuplaDialogVisible(false);

  const handleClickConfirmSugestaoDuplaDialog = () => {
    sugerirDuplas();
    closeConfirmacaoSugestaoDuplaDialog();
  };

  const handleClickCancelSugestaoDuplaDialog = () =>
    closeConfirmacaoSugestaoDuplaDialog();

  const closeSugestaoDuplasDialog = () =>
    setIsSugestaoDuplasDisabledVisible(false);

  const hasDuplasDefinidas = duplas.length > 0;
  const quantidadeDuplasNecessarias = ranking.getParticipantes().length / 2;
  const notHasMaisSugestoesDuplas =
    !hasParticipantesRestantes &&
    duplasPossiveis.length <= quantidadeDuplasNecessarias;

  const handleClickSugerirDuplas = () => {
    if (notHasMaisSugestoesDuplas) {
      setIsSugestaoDuplasDisabledVisible(true);
    } else if (hasDuplas) {
      setIsConfirmacaoSugestaoDuplaDialogVisible(true);
    } else {
      sugerirDuplas();
    }
  };

  const handleClickConfirmSugestaoDuplasDisabledDialog = () => {
    reiniciarSugestaoDuplas();
    sugerirDuplas();
    closeSugestaoDuplasDialog();
  };

  return (
    <>
      <ParallaxScrollView>
        <ConfirmacaoSugestaoDuplasDialog
          isVisible={isConfirmacaoSugestaoDuplasDialogVisible}
          onBackdropPress={closeConfirmacaoSugestaoDuplaDialog}
          onConfirm={handleClickConfirmSugestaoDuplaDialog}
          onCancel={handleClickCancelSugestaoDuplaDialog}
        />
        <SugestaoDuplasDisabledDialog
          isVisible={isSugestaoDuplasDisabledVisible}
          onBackdropPress={closeSugestaoDuplasDialog}
          onConfirm={handleClickConfirmSugestaoDuplasDisabledDialog}
          onCancel={closeSugestaoDuplasDialog}
        />
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Duplas</ThemedText>
          <ThemedText type="secondary">
            Defina as duplas selecionando os participantes ou clicando no botão
            'Sugerir duplas'
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Participantes restantes</ThemedText>
          {!hasParticipantesRestantes && (
            <ThemedText type="secondary">
              Nenhum participante restante
            </ThemedText>
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
          icon={{ name: "shuffle-variant", type: "material-community" }}
          onPress={handleClickSugerirDuplas}
        >
          Sugerir duplas
        </ThemedButton>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Duplas definidas</ThemedText>
          {errors && <ErrorMessage errors={errors} name="duplas" />}
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
