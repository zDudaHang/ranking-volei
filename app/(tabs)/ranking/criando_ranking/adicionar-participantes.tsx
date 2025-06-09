import { AdicionarParticipanteForm } from "@/components/adicionar/AdicionarParticipanteForm";
import { AvancarButton } from "@/components/common/AvancarButton";
import { LimparButton } from "@/components/common/LimparButton";
import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import { ThemedButton } from "@/components/common/ThemedButton";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { RankingContext } from "@/context/RankingContext";
import { convertParticipanteFormModelToParticipante } from "@/converter/converter-adicionarParticipante";
import { useRankingStorage } from "@/hooks/useRankingStorage";
import { ParticipanteFormModel } from "@/model/form/model-adicionarParticipante";
import { TipoParticipante } from "@/model/participante";

import { Validation } from "@/validator/model";
import { validateParticipantes } from "@/validator/validator-adicionarParticipantes";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";

export default function AdicionarAlunosView() {
  const onCompleteStore = () =>
    router.navigate("/ranking/gerenciando_ranking/definir-duplas");

  const { store, loading } = useRankingStorage({ onCompleteStore });

  const { ranking, adicionarParticipantes } = useContext(RankingContext);

  const [errors, setErrors] = useState<
    Validation<ParticipanteFormModel[]> | undefined
  >(undefined);
  const [participantes, setParticipantes] = useState<ParticipanteFormModel[]>(
    []
  );

  const adicionarParticipante = (
    nome: string,
    tipoParticipante: TipoParticipante
  ) => {
    const novoParticipante: ParticipanteFormModel = {
      nome,
      tipoParticipante,
      pontuacao: 0,
    };
    setParticipantes([...participantes, novoParticipante]);
  };

  const removerAluno = (index: number) => {
    participantes.splice(index, 1);
    setParticipantes([...participantes]);
  };

  const handleClear = () => {
    setParticipantes([]);
    setErrors(undefined);
  };

  const handleSubmit = () => {
    const errors = validateParticipantes(participantes);
    if (errors.isValid() && ranking) {
      adicionarParticipantes(
        convertParticipanteFormModelToParticipante(participantes)
      );
      store(ranking);
    } else {
      setErrors(errors);
    }
  };

  return (
    <>
      <ParallaxScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Participantes</ThemedText>
          <ThemedText type="secondary">
            Adicione os participantes do ranking
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <AdicionarParticipanteForm
            participantes={participantes}
            participantesErrors={errors}
            adicionar={adicionarParticipante}
            remover={removerAluno}
          />
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
        <LimparButton onPress={handleClear} loading={loading} />
        <ThemedButton
          size="lg"
          onPress={handleSubmit}
          loading={loading}
          icon={{
            name: "account-multiple-check",
            type: "material-community",
          }}
        >
          Criar ranking
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
