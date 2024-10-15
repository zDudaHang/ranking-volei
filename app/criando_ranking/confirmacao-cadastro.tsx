import ParallaxScrollView from "@/components/common/ParallaxScrollView"
import { ThemedButton } from "@/components/common/ThemedButton"
import { ThemedText } from "@/components/common/ThemedText"
import { ThemedView } from "@/components/common/ThemedView"
import { ParticipanteView } from "@/components/participante/ParticipanteView"
import { RankingContext } from "@/context/RankingContext"
import { useStorage } from "@/hooks/useStorage"
import { Ranking } from "@/model/ranking"
import { Button } from "@rneui/base"
import { Redirect, router } from "expo-router"
import { useContext } from "react"
import { StyleSheet } from "react-native"

export default function ConfirmacaoCadastroRankingView() {
  const { ranking } = useContext(RankingContext)

  const { store } = useStorage<Ranking>()

  if (!ranking) {
    return <Redirect href="/criando_ranking/adicionar-turma" />
  }

  const {
    turma: { diaSemana, horario },
    participantes,
  } = ranking

  const handleSubmit = async () => {
    store(ranking, "Ranking")
    router.navigate("/gerenciando_ranking/definir-duplas")
  }

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="default">
          Confirme as informações registradas
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Turma</ThemedText>
        <ThemedText type="default">
          {diaSemana} às {horario}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Participantes</ThemedText>
        {participantes.map((participante, index) => (
          <ParticipanteView participante={participante} index={index} />
        ))}
      </ThemedView>
      <ThemedButton size="lg" color="success" onPress={handleSubmit}>
        Confirmar e Salvar
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
