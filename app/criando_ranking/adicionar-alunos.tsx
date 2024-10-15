import ParallaxScrollView from "@/components/common/ParallaxScrollView"
import { ThemedText } from "@/components/common/ThemedText"
import { ThemedView } from "@/components/common/ThemedView"
import { AdicionarAlunos } from "@/components/adicionar/AdicionarAlunos"
import { RankingContext } from "@/context/RankingContext"
import { Button, Divider } from "@rneui/base"
import { router } from "expo-router"
import { useContext, useState } from "react"
import { StyleSheet } from "react-native"
import { ThemedButton } from "@/components/common/ThemedButton"

export default function AdicionarAlunosView() {
  const [alunos, setAlunos] = useState<string[]>([])

  const { adicionarAlunos } = useContext(RankingContext)

  const adicionarAluno = (nome: string) => {
    setAlunos([...alunos, nome])
  }

  const removerAluno = (index: number) => {
    alunos.splice(index, 1)
    setAlunos([...alunos])
  }

  const handleClear = () => setAlunos([])

  const handleSubmit = () => {
    adicionarAlunos(alunos)
    router.navigate("/criando_ranking/adicionar-professores")
  }

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Adicionando os alunos</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <AdicionarAlunos
          alunos={alunos}
          adicionarAluno={adicionarAluno}
          removerAluno={removerAluno}
        />
      </ThemedView>
      <Divider />
      <ThemedButton size="lg" color="success" onPress={handleSubmit}>
        Avançar
      </ThemedButton>
      <ThemedButton size="lg" type="outline" onPress={handleClear}>
        Limpar lista
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
