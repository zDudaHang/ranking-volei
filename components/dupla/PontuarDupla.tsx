import { Dupla } from "@/model/duplas"
import { formatDupla } from "@/util/format"
import { Input, InputProps } from "@rneui/base"
import { useState, useRef, Fragment, RefObject } from "react"
import { TextInput } from "react-native"
import { ThemedText } from "../common/ThemedText"
import { InputRef } from "@/model/common"
import ThemedInput from "../common/ThemedInput"

interface PontuarDuplaProps extends Pick<InputProps, "ref"> {
  dupla: Dupla
  index: number
  onSubmitEditing: (index: number) => void
}

export function PontuarDupla(props: PontuarDuplaProps) {
  const { dupla, ref, index, onSubmitEditing } = props

  if (!dupla) {
    return null
  }

  const [pontuacao, setPontuacao] = useState<string>()

  const handleChangePontuacao = (pontuacao: string) => {
    setPontuacao(pontuacao)
  }

  const handleSubmitPontuacao = () => onSubmitEditing(index)

  return (
    <Fragment key={`pontuacao-${index}`}>
      <ThemedText type="defaultSemiBold">{formatDupla(dupla)}</ThemedText>
      <ThemedInput
        ref={ref}
        label="Pontuação"
        placeholder="Exemplo: 8"
        value={pontuacao}
        keyboardType="numeric"
        onChangeText={handleChangePontuacao}
        onSubmitEditing={handleSubmitPontuacao}
        returnKeyType="next"
        blurOnSubmit={false}
      />
    </Fragment>
  )
}
