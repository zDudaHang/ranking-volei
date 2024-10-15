import ParallaxScrollView from "@/components/common/ParallaxScrollView"
import { ThemedButton } from "@/components/common/ThemedButton"
import { ThemedText } from "@/components/common/ThemedText"
import { ThemedView } from "@/components/common/ThemedView"
import { PontuarDupla } from "@/components/dupla/PontuarDupla"
import { DuplasContext } from "@/context/DuplasContext"
import React, { useContext, useRef } from "react"
import { StyleSheet, TextInput } from "react-native"

export default function PontuarDuplasView() {
  const { duplasAtuais } = useContext(DuplasContext)

  if (!duplasAtuais || duplasAtuais?.length === 0) {
    return null
  }

  const refs = useRef<TextInput[]>([])

  const onSubmitEditing = (index: number) => {
    if (index !== refs.current.length - 1) {
      refs.current[index + 1].focus()
    }
  }

  const addRef = (element: TextInput | null, index: number) => {
    if (element) {
      refs.current[index] = element
    }
  }

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Pontuação</ThemedText>
        <ThemedText type="default">
          Defina a pontuação de cada dupla{" "}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Duplas</ThemedText>
        {duplasAtuais.map((dupla, index) => (
          <PontuarDupla
            key={`dupla-${index}`}
            dupla={dupla}
            index={index}
            ref={(element) => addRef(element, index)}
            onSubmitEditing={onSubmitEditing}
          />
        ))}
      </ThemedView>
      <ThemedButton size="lg" color="#02786D" onPress={console.log}>
        Avançar
      </ThemedButton>
      <ThemedButton size="lg" type="outline" onPress={console.log}>
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
