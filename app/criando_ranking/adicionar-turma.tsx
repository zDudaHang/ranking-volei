import ParallaxScrollView from "@/components/common/ParallaxScrollView"
import { ThemedButton } from "@/components/common/ThemedButton"
import { ThemedInput } from "@/components/common/ThemedInput"
import { ThemedText } from "@/components/common/ThemedText"
import { ThemedView } from "@/components/common/ThemedView"
import { RankingContext } from "@/context/RankingContext"
import { InputRef } from "@/model/common"
import { RankingFormModel, validate } from "@/validator/criar-ranking/validator"
import { Validation } from "@/validator/model"

import { router } from "expo-router"
import { useContext, useRef, useState } from "react"
import { StyleSheet } from "react-native"

export default function AdicionarTurmaView() {
  const [diaSemana, setDiaSemana] = useState<string>()
  const [horario, setHorario] = useState<string>()

  const [validation, setValidation] = useState<Validation<RankingFormModel>>()
  const clearValidation = () => setValidation(undefined)

  const diaSemanaRef = useRef<InputRef>(null)
  const horarioRef = useRef<InputRef>(null)

  const { adicionarTurma } = useContext(RankingContext)

  const handleChangeDiaSemana = (diaSemana: string) => setDiaSemana(diaSemana)
  const handleSubmitDiaSemana = () => horarioRef.current?.focus()

  const handleChangeHorario = (horario: string) => setHorario(horario)

  const handleSubmit = () => {
    const validation = validate({ diaSemana, horario })

    if (!validation.isValid()) {
      setValidation(validation)
    } else {
      if (horario && diaSemana) {
        clearValidation()
        adicionarTurma(horario, diaSemana)
        router.navigate("/criando_ranking/adicionar-alunos")
      }
    }
  }

  const handleClear = () => {
    diaSemanaRef.current?.clear()
    horarioRef.current?.clear()
    diaSemanaRef.current?.focus()
    clearValidation()
  }

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Turma</ThemedText>
        <ThemedText type="default">
          Preencha as informações sobre a turma
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedInput
          ref={diaSemanaRef}
          label="Qual o dia da semana da turma?"
          keyboardType="default"
          placeholder="Exemplo: Segunda"
          value={diaSemana}
          onChangeText={handleChangeDiaSemana}
          returnKeyType="next"
          onSubmitEditing={handleSubmitDiaSemana}
          errorMessage={validation?.errors?.diaSemana}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedInput
          ref={horarioRef}
          label="Qual o horário da turma?"
          keyboardType="numeric"
          placeholder="Exemplo: 20"
          value={horario}
          onChangeText={handleChangeHorario}
          returnKeyType="done"
          errorMessage={validation?.errors?.horario}
        />
      </ThemedView>
      <ThemedButton size="lg" onPress={handleSubmit}>
        Avançar
      </ThemedButton>
      <ThemedButton
        size="lg"
        type="outline"
        color="secondary"
        onPress={handleClear}
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
