import { AdicionarParticipanteForm } from "@/components/adicionar/AdicionarParticipanteForm";
import { AvancarButton } from "@/components/common/AvancarButton";
import { LimparButton } from "@/components/common/LimparButton";
import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { RankingContext } from "@/context/RankingContext";
import { convertParticipanteFormModelToParticipante } from "@/converter/converter-adicionarParticipante";
import { ParticipanteFormModel } from "@/model/form/model-adicionarParticipante";
import { TipoParticipante } from "@/model/participante";

import { Validation } from "@/validator/model";
import { validate } from "@/validator/validator-adicionarParticipantes";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";

export default function AdicionarAlunosView() {
  const [participantes, setParticipantes] = useState<ParticipanteFormModel[]>(
    []
  );
  const { adicionarParticipantes } = useContext(RankingContext);
  const [errors, setErrors] = useState<Validation<
    ParticipanteFormModel[]
  > | null>(null);

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

  const handleClear = () => setParticipantes([]);

  const handleSubmit = () => {
    const errors = validate(participantes);
    if (errors.isValid()) {
      adicionarParticipantes(
        convertParticipanteFormModelToParticipante(participantes)
      );
      router.navigate("/ranking/criando_ranking/confirmacao-cadastro");
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
            errors={errors}
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
  },
  stepContainer: {
    gap: 8,
  },
});
