import { Button, Input, ListItem } from "@rneui/base"
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content"
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title"
import { useState, useRef } from "react"
import { TextInput } from "react-native"
import { ThemedText } from "../common/ThemedText"
import { RemovableListItem } from "../common/RemovableListItem"
import { ThemedInput } from "../common/ThemedInput"
import { useThemeColor } from "@/hooks/useThemeColor"

interface AdicionarCommonProps {
  lightColor?: string
  darkColor?: string

  data: string[]
  isAlunos: boolean

  adicionar: (nome: string) => void
  remover: (index: number) => void
}

export function AdicionarCommon(props: AdicionarCommonProps) {
  const { data, isAlunos, lightColor, darkColor, adicionar, remover } = props

  const [nome, setNome] = useState<string | undefined>()

  const nomeRef = useRef<Input & TextInput>(null)

  const primary = useThemeColor(
    { light: lightColor, dark: darkColor },
    "primary"
  )

  const handleChangeNome = (nome: string) => {
    setNome(nome)
  }

  const handleAdicionar = () => {
    if (nome) {
      adicionar(nome)
      nomeRef.current?.clear()
    }
  }

  const hasParticipantes = data.length > 0

  return (
    <>
      <ThemedInput
        ref={nomeRef}
        label={`Nome do ${isAlunos ? "aluno" : "professor"}`}
        placeholder="Exemplo: João"
        value={nome}
        onChangeText={handleChangeNome}
        onSubmitEditing={handleAdicionar}
        returnKeyType="next"
        blurOnSubmit={false}
        rightIcon={{
          name: "add-box",
          color: primary,
          size: 32,
          onPress: handleAdicionar,
        }}
      />

      <ThemedText type="subtitle">
        {isAlunos ? "Alunos" : "Professores"} adicionados ({data.length})
      </ThemedText>

      {!hasParticipantes && (
        <ThemedText type="secondary">
          Nenhum {isAlunos ? "aluno" : "professor"} adicionado
        </ThemedText>
      )}

      {data.map((nome, index) => (
        <RemovableListItem
          key={index}
          text={nome}
          index={index}
          onPress={remover}
        />
      ))}
    </>
  )
}
