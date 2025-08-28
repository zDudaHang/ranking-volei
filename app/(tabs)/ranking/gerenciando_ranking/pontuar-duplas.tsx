import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import { ThemedButton } from "@/components/common/ThemedButton";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { PontuarDupla } from "@/components/dupla/PontuarDupla";
import { DuplasContext } from "@/context/DuplasContext";
import { RankingContext } from "@/context/RankingContext";
import { useHistoricoRankingStorage } from "@/hooks/useHistoricoRankingStorage";
import { validatePontuacoes } from "@/validator/validator-pontuarDuplas";
import { useRouter } from "expo-router";
import React, { useContext, useRef, useState } from "react";
import { StyleSheet, TextInput } from "react-native";

export default function PontuarDuplasView() {
  const { duplasAtuais, adicionarDuplasHistorico } = useContext(DuplasContext);
  const [pontuacaoByDuplaUuid, setPontuacaoByDuplaUuid] = useState<
    Map<string, string>
  >(new Map());
  const [errors, setErrors] = useState<Map<string, string>>(new Map());
  const router = useRouter();

  const { ranking, limparRankingAtual: clear } = useContext(RankingContext);

  const onCompleteStore = () => {
    router.dismissAll();
    router.replace("/ranking/criando_ranking/adicionar-turma");
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

  const handleChangePontuacao = (uuid: string, pontuacao: string) => {
    pontuacaoByDuplaUuid.set(uuid, pontuacao);
    setPontuacaoByDuplaUuid(new Map(pontuacaoByDuplaUuid));
  };

  const salvarPontuacoes = () => {
    const duplasComPontuacao = duplasAtuais.map((dupla) => {
      const pontuacao = pontuacaoByDuplaUuid.get(dupla.getUuid());
      if (pontuacao) {
        dupla.setPontuacao(Number(pontuacao));
      }
      return dupla;
    });
    adicionarDuplasHistorico(duplasComPontuacao);
  };

  const handleDefinirDuplasClick = () => {
    const errors = validatePontuacoes(pontuacaoByDuplaUuid, duplasAtuais);
    if (errors.size === 0) {
      salvarPontuacoes();
      router.navigate("./definir-duplas");
    } else {
      setErrors(errors);
    }
  };

  const handleClear = (uuidToRemove: string) => {
    pontuacaoByDuplaUuid.delete(uuidToRemove);
    setPontuacaoByDuplaUuid(new Map(pontuacaoByDuplaUuid));
  };

  const handleFinalizarClick = () => {
    const errors = validatePontuacoes(pontuacaoByDuplaUuid, duplasAtuais);
    if (errors.size === 0 && ranking) {
      salvarPontuacoes();
      store(ranking);
    } else {
      setErrors(errors);
    }
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
              pontuacao={pontuacaoByDuplaUuid.get(dupla.getUuid())}
              errorMessage={errors.get(dupla.getUuid())}
              onSubmitEditing={onSubmitEditing}
              onChangePontuacao={handleChangePontuacao}
              onClearPontuacao={handleClear}
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
