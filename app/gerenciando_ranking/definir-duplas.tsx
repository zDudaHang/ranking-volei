import ParallaxScrollView from "@/components/common/ParallaxScrollView"
import { ThemedButton } from "@/components/common/ThemedButton"
import { ThemedText } from "@/components/common/ThemedText"
import { ThemedView } from "@/components/common/ThemedView"
import { DuplaView } from "@/components/dupla/DuplaView"
import { ParticipanteView } from "@/components/participante/ParticipanteView"
import { DuplasContext } from "@/context/DuplasContext"
import { RankingContext } from "@/context/RankingContext"
import { Dupla } from "@/model/duplas"
import { Participante } from "@/model/ranking"
import { router } from "expo-router"
import React, { useContext, useState } from "react"
import { StyleSheet } from "react-native"

export default function DefinirDuplasView() {
  const { ranking } = useContext(RankingContext)

  if (!ranking) {
    return null
  }

  const { definirDuplasAtuais } = useContext(DuplasContext)

  const [primeiroIntegranteDupla, setPrimeiroIntegranteDupla] =
    useState<Participante>()

  const [duplas, setDuplas] = useState<Dupla[]>([])

  const [participantesRestantes, setParticipantesRestantes] = useState<
    Participante[]
  >(ranking.participantes)

  const adicionarSegundoIntegranteDupla = (participante: Participante) => {
    const novosParticipantesRestantes = participantesRestantes.filter(
      (p) =>
        p.nome !== primeiroIntegranteDupla?.nome && p.nome !== participante.nome
    )
    setParticipantesRestantes(novosParticipantesRestantes)
    setDuplas([
      ...duplas,
      {
        primeiroParticipante: primeiroIntegranteDupla,
        segundoParticipante: participante,
      },
    ])
    setPrimeiroIntegranteDupla(undefined)
  }

  const onPress = (participante: Participante) => {
    if (!primeiroIntegranteDupla) {
      setPrimeiroIntegranteDupla(participante)
    } else if (primeiroIntegranteDupla.nome === participante.nome) {
      setPrimeiroIntegranteDupla(undefined)
    } else if (participante.nome !== primeiroIntegranteDupla.nome) {
      adicionarSegundoIntegranteDupla(participante)
    }
  }

  const isSelected = (participante: Participante) =>
    participante.nome === primeiroIntegranteDupla?.nome

  const handleRemove = (index: number) => {
    const duplaRemovida = duplas.splice(index, 1)

    if (duplaRemovida.length === 1) {
      const { primeiroParticipante, segundoParticipante } = duplaRemovida[0]

      if (primeiroParticipante && segundoParticipante) {
        setParticipantesRestantes([
          ...participantesRestantes,
          primeiroParticipante,
          segundoParticipante,
        ])
        setDuplas([...duplas])
      }
    }
  }

  const handleClear = () => {
    setDuplas([])
    setParticipantesRestantes(ranking.participantes)
  }

  const handleSubmit = () => {
    definirDuplasAtuais(duplas)
    router.navigate("/gerenciando_ranking/pontuar-duplas")
  }

  const hasParticipantesRestantes = participantesRestantes.length > 0
  const hasDuplas = duplas.length > 0

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Duplas</ThemedText>
        <ThemedText type="default">
          Defina as duplas da primeira rodada
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Participantes restantes</ThemedText>
        {!hasParticipantesRestantes && (
          <ThemedText type="secondary">Nenhum participante sobrando</ThemedText>
        )}
        {participantesRestantes.map((participante, index) => (
          <ParticipanteView
            key={`participante-${index}`}
            participante={participante}
            index={index}
            onPress={onPress}
            isSelected={isSelected(participante)}
          />
        ))}
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Duplas definidas</ThemedText>
        {duplas.map((dupla, index) => (
          <DuplaView
            key={`dupla-${index}`}
            dupla={dupla}
            index={index}
            remover={handleRemove}
          />
        ))}
      </ThemedView>
      <ThemedButton
        size="lg"
        color="success"
        onPress={handleSubmit}
        disabled={hasParticipantesRestantes}
      >
        Confirmar
      </ThemedButton>
      <ThemedButton
        size="lg"
        type="outline"
        onPress={handleClear}
        disabled={!hasDuplas}
      >
        Limpar
      </ThemedButton>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
})
