import { AdicionarParticipanteForm } from "@/components/adicionar-participantes/AdicionarParticipanteForm";
import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import { ThemedButton } from "@/components/common/ThemedButton";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { RankingContext } from "@/context/RankingContext";
import { convertParticipanteFormModelToParticipante } from "@/converter/converter-adicionarParticipante";
import { useRankingStorage } from "@/hooks/useRankingStorage";
import { ParticipanteFormModel } from "@/model/form/model-adicionarParticipante";
import { TipoParticipante } from "@/model/participante";

import { Validation } from "@/validator/model-errorObject";
import { validateParticipantes } from "@/validator/validator-adicionarParticipantes";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import uuid from "react-native-uuid";

export default function AdicionarAlunosView() {
  const router = useRouter();

  const { store, loading } = useRankingStorage({
    onCompleteStore: () => {
      router.dismissAll();
      router.replace("/ranking/gerenciando_ranking/definir-duplas");
    },
  });

  const { ranking, adicionarParticipantes } = useContext(RankingContext);

  const [errors, setErrors] = useState<Validation<
    ParticipanteFormModel[]
  > | null>(null);
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
      uuid: uuid.v4(),
    };
    setParticipantes([...participantes, novoParticipante]);
  };

  const removerAluno = (index: number) => {
    participantes.splice(index, 1);
    setParticipantes([...participantes]);
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
          padding: 20,
        }}
      >
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
    marginTop: 32,
  },
  stepContainer: {
    gap: 8,
  },
});
