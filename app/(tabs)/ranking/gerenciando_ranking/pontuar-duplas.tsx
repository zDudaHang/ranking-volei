import { AvancarButton } from "@/components/common/AvancarButton";
import { LimparButton } from "@/components/common/LimparButton";
import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import { ThemedButton } from "@/components/common/ThemedButton";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { PontuarDupla } from "@/components/dupla/PontuarDupla";
import { DuplasContext } from "@/context/DuplasContext";
import { router } from "expo-router";
import React, { useContext, useRef, useState } from "react";
import { StyleSheet, TextInput } from "react-native";

export default function PontuarDuplasView() {
  const { duplasAtuais, historicoDuplas, adicionarDuplasHistorico } =
    useContext(DuplasContext);
  const [pontuacoes, setPontuacoes] = useState<string[]>([]);

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

  const handleSubmit = () => {
    salvarPontuacoes();
    router.navigate("/ranking/gerenciando_ranking/definir-duplas");
  };

  const handleClear = () => {
    setPontuacoes([]);
    refs.current.forEach((ref) => ref.clear());
    refs.current[0].focus();
  };

  const handleFinalizar = () => {
    salvarPontuacoes();
    router.navigate("/ranking/gerenciando_ranking/finalizar-ranking");
  };

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
        <LimparButton onPress={handleClear} />
        <ThemedButton
          size="lg"
          onPress={handleFinalizar}
          icon={{ name: "group" }}
        >
          Escolher novas duplas
        </ThemedButton>
        <ThemedButton
          size="lg"
          onPress={handleFinalizar}
          icon={{ name: "done-all" }}
        >
          Finalizar
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
