import { DuplasContext } from "@/context/DuplasContext"
import { RankingContext } from "@/context/RankingContext"
import { Dupla } from "@/model/duplas"
import { gerarDuplasPossiveis } from "@/util/duplas-possiveis"
import { Redirect, Stack } from "expo-router"
import { useContext, useState } from "react"
import "react-native-reanimated"

export default function CriandoRankingRootLayout() {
  const { ranking } = useContext(RankingContext)

  const [duplasAtuais, setDuplasAtuais] = useState<Dupla[]>([])
  const [historicoDuplas, setHistoricoDuplas] = useState<Dupla[]>([])
  const [duplasPossiveis, setDuplasPossiveis] = useState<Dupla[]>(
    gerarDuplasPossiveis(ranking?.participantes)
  )

  const definirDuplasAtuais = (duplas: Dupla[]) => setDuplasAtuais(duplas)

  const adicionarDuplasHistorico = (duplas: Dupla[]) => {
    setHistoricoDuplas([...historicoDuplas, ...duplas])
  }

  if (!ranking) {
    return <Redirect href="/criando_ranking/adicionar-turma" />
  }

  const {
    turma: { diaSemana, horario },
  } = ranking

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
          title: `Ranking - ${diaSemana} \às ${horario}`,
        }}
      >
        <Stack.Screen name="definir-duplas" />
        <Stack.Screen name="pontuar-duplas" />
      </Stack>
    </DuplasContext.Provider>
  )
}
