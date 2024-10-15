import { Button, Input, ListItem } from "@rneui/base"
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content"
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title"
import { useState, useRef } from "react"
import { TextInput } from "react-native"
import { ThemedText } from "../common/ThemedText"
import { RemovableListItem } from "../common/RemovableListItem"
import { ThemedInput } from "../common/ThemedInput"

interface AdicionarCommonProps {
  data: string[]
  adicionar: (nome: string) => void
  remover: (index: number) => void
  isAlunos: boolean
}

export function AdicionarCommon(props: AdicionarCommonProps) {
  const { data, isAlunos, adicionar, remover } = props

  const [nome, setNome] = useState<string | undefined>()

  const nomeRef = useRef<Input & TextInput>(null)

  const handleChangeNome = (nome: string) => {
    setNome(nome)
  }

  const handleAdicionar = () => {
    if (nome) {
      adicionar(nome)
      nomeRef.current?.clear()
    }
  }

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
      />

      <ThemedText type="subtitle">
        {isAlunos ? "Alunos" : "Professores"} adicionados ({data.length})
      </ThemedText>

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
