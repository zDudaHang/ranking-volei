import { DuplasContext } from "@/context/DuplasContext"
import { RankingContext } from "@/context/RankingContext"
import { Dupla } from "@/model/duplas"
import { Redirect, Stack } from "expo-router"
import { useContext, useState } from "react"
import "react-native-reanimated"

export default function CriandoRankingRootLayout() {
  const { ranking } = useContext(RankingContext)

  const [duplasAtuais, setDuplasAtuais] = useState<Dupla[]>([])
  const [historicoDuplas, setHistoricoDuplas] = useState<Dupla[]>([])

  const definirDuplasAtuais = (duplas: Dupla[]) => setDuplasAtuais(duplas)

  const adicionarDuplasHistorico = (duplas: Dupla[]) => {
    setHistoricoDuplas([...historicoDuplas, ...duplas])
  }

  console.log(historicoDuplas)

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
        definirDuplasAtuais,
        adicionarDuplasHistorico,
      }}
    >
      <Stack
        screenOptions={{
          title: `Ranking - Turma de ${diaSemana} \às ${horario}`,
        }}
      >
        <Stack.Screen name="definir-duplas" />
        <Stack.Screen name="pontuar-duplas" />
      </Stack>
    </DuplasContext.Provider>
  )
}
