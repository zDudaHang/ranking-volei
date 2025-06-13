import { DuplasContext } from "@/context/DuplasContext";
import { RankingContext } from "@/context/RankingContext";
import { Dupla } from "@/model/dupla";
import { gerarDuplasPossiveis } from "@/util/duplas-possiveis";

import { Redirect, Stack } from "expo-router";
import { useContext, useState } from "react";

export default function CriandoRankingRootLayout() {
  const { ranking } = useContext(RankingContext);

  const [duplasAtuais, setDuplasAtuais] = useState<Dupla[]>([]);
  const [historicoDuplas, setHistoricoDuplas] = useState<Dupla[]>([]);
  const [duplasPossiveis, setDuplasPossiveis] = useState<Dupla[]>(
    gerarDuplasPossiveis(ranking?.getParticipantes())
  );

  const definirDuplasAtuais = (duplas: Dupla[]) => setDuplasAtuais(duplas);

  const adicionarDuplasHistorico = (duplasJahUtilizadas: Dupla[]) => {
    const novasDuplasPossiveis = duplasPossiveis.filter(
      (dupla) => !duplasJahUtilizadas.includes(dupla)
    );
    setDuplasAtuais([]);
    setHistoricoDuplas([...historicoDuplas, ...duplasJahUtilizadas]);

    const tamanhoTurma = ranking?.getParticipantes().length ?? 0;
    const quantidadeDuplasNecessarias = tamanhoTurma / 2;
    if (novasDuplasPossiveis.length < quantidadeDuplasNecessarias) {
      setDuplasPossiveis(gerarDuplasPossiveis(ranking?.getParticipantes()));
    } else {
      setDuplasPossiveis(novasDuplasPossiveis);
    }

    ranking?.calcularPontuacoes(duplasJahUtilizadas);
  };

  if (!ranking) {
    return <Redirect href="/(tabs)/ranking/criando_ranking/adicionar-turma" />;
  }

  const { dia, horario } = ranking.getTurma();

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
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="definir-duplas" />
        <Stack.Screen name="pontuar-duplas" />
      </Stack>
    </DuplasContext.Provider>
  );
}
