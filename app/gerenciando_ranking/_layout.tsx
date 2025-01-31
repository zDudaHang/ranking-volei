import { DuplasContext } from "@/context/DuplasContext";
import { RankingContext } from "@/context/RankingContext";
import { Dupla } from "@/model/dupla";
import { asHourAndMinutes, asWeekDay } from "@/util/date-format";
import { gerarDuplasPossiveis } from "@/util/duplas-possiveis";

import { Redirect, Stack } from "expo-router";
import { useContext, useState } from "react";

export default function CriandoRankingRootLayout() {
  const { ranking } = useContext(RankingContext);

  const [duplasAtuais, setDuplasAtuais] = useState<Dupla[]>([]);
  const [historicoDuplas, setHistoricoDuplas] = useState<Dupla[]>([]);
  const [duplasPossiveis, setDuplasPossiveis] = useState<Dupla[]>(
    gerarDuplasPossiveis(ranking?.participantes)
  );

  const definirDuplasAtuais = (duplas: Dupla[]) => setDuplasAtuais(duplas);

  const adicionarDuplasHistorico = (duplasJahUtilizadas: Dupla[]) => {
    const novasDuplasPossiveis = duplasPossiveis.filter(
      (dupla) => !duplasJahUtilizadas.includes(dupla)
    );
    setDuplasAtuais([]);
    setHistoricoDuplas([...historicoDuplas, ...duplasJahUtilizadas]);
    setDuplasPossiveis(novasDuplasPossiveis);
  };

  if (!ranking) {
    return <Redirect href="/criando_ranking/adicionar-turma" />;
  }

  const {
    turma: { dia, horario },
  } = ranking;

  if (!dia || !horario) {
    return null;
  }

  return (
    <DuplasContext.Provider
      value={{
        duplasAtuais,
        historicoDuplas,
        duplasPossiveis,
        definirDuplasAtuais,
        adicionarDuplasHistorico,
      }}
    >
      <Stack
        screenOptions={{
          title: `Ranking - ${asWeekDay(dia)} \às ${asHourAndMinutes(horario)}`,
        }}
      >
        <Stack.Screen name="definir-duplas" />
        <Stack.Screen name="pontuar-duplas" />
      </Stack>
    </DuplasContext.Provider>
  );
}
