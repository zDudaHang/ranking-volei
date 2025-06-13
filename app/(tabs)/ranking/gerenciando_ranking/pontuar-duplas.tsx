import { LimparButton } from "@/components/common/LimparButton";
import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import { ThemedButton } from "@/components/common/ThemedButton";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { PontuarDupla } from "@/components/dupla/PontuarDupla";
import { DuplasContext } from "@/context/DuplasContext";
import { RankingContext } from "@/context/RankingContext";
import { useHistoricoRankingStorage } from "@/hooks/useHistoricoRankingStorage";
import { Validation } from "@/validator/model";
import { validatePontuacoes } from "@/validator/validator-pontuarDuplas";
import { router } from "expo-router";
import React, { useContext, useRef, useState } from "react";
import { StyleSheet, TextInput } from "react-native";

export default function PontuarDuplasView() {
  const { duplasAtuais, adicionarDuplasHistorico } = useContext(DuplasContext);
  const [pontuacoes, setPontuacoes] = useState<string[]>([]);
  const [errors, setErrors] = useState<Validation<string[]> | null>(null);

  const { ranking, limparRankingAtual: clear } = useContext(RankingContext);

  const onCompleteStore = () => {
    router.navigate("/ranking/criando_ranking/adicionar-turma");
    clear();
  };

  const { loading, store } = useHistoricoRankingStorage({ onCompleteStore });

  const refs = useRef<TextInput[]>([]);

  if (!duplasAtuais || duplasAtuais?.length === 0) {
    return null;
  }

  const onSubmitEditing = (index: number) => {
    if (index !== refs.current.length - 1) {
      refs.current[index + 1].focus();
    }
  };

  const addRef = (element: TextInput | null, index: number) => {
    if (element) {
      refs.current[index] = element;
    }
  };

  const handleChangePontuacao = (index: number, pontuacao: string) => {
    pontuacoes[index] = pontuacao;
    setPontuacoes([...pontuacoes]);
  };

  const salvarPontuacoes = () => {
    const duplasComPontuacao = duplasAtuais.map((dupla, index) => {
      const pontuacao = pontuacoes[index];
      if (pontuacao) {
        dupla.setPontuacao(Number(pontuacao));
      }
      return dupla;
    });
    adicionarDuplasHistorico(duplasComPontuacao);
  };

  const handleDefinirDuplasClick = () => {
    const errors = validatePontuacoes(pontuacoes, duplasAtuais);
    if (errors.isValid()) {
      salvarPontuacoes();
      router.navigate("/ranking/gerenciando_ranking/definir-duplas");
    } else {
      setErrors(errors);
    }
  };

  const handleClear = () => {
    setPontuacoes([]);
    refs.current.forEach((ref) => ref.clear());
    refs.current[0].focus();
    setErrors(null);
  };

  const handleFinalizarClick = () => {
    const errors = validatePontuacoes(pontuacoes, duplasAtuais);
    if (errors.isValid() && ranking) {
      salvarPontuacoes();
      store(ranking);
    } else {
      setErrors(errors);
    }
  };

  console.log(loading);

  return (
    <>
      <ParallaxScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Pontuação</ThemedText>
          <ThemedText type="secondary">
            Defina a pontuação de cada dupla
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          {duplasAtuais.map((dupla, index) => (
            <PontuarDupla
              key={`dupla-${index}`}
              ref={(element) => addRef(element, index)}
              dupla={dupla}
              index={index}
              pontuacao={pontuacoes[index]}
              onSubmitEditing={onSubmitEditing}
              onChangePontuacao={handleChangePontuacao}
              errorMessage={errors?.getErrors()?.[index]}
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
        <LimparButton onPress={handleClear} disabled={loading} />
        <ThemedView
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <ThemedButton
            size="lg"
            onPress={handleDefinirDuplasClick}
            icon={{ name: "account-multiple-plus", type: "material-community" }}
          >
            Definir duplas
          </ThemedButton>
          <ThemedButton
            size="lg"
            onPress={handleFinalizarClick}
            icon={{ name: "done-all" }}
            loading={loading}
          >
            Finalizar
          </ThemedButton>
        </ThemedView>
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
