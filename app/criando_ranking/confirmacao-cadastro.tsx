import ParallaxScrollView from "@/components/common/ParallaxScrollView"
import { ThemedButton } from "@/components/common/ThemedButton"
import { ThemedText } from "@/components/common/ThemedText"
import { ThemedView } from "@/components/common/ThemedView"
import { ParticipanteView } from "@/components/participante/ParticipanteView"
import { RankingContext } from "@/context/RankingContext"
import { useStorage } from "@/hooks/useStorage"
import { Ranking } from "@/model/ranking"
import { Redirect, router } from "expo-router"
import { useContext } from "react"
import { StyleSheet } from "react-native"

export default function ConfirmacaoCadastroRankingView() {
  const { ranking } = useContext(RankingContext)

  const onCompleteStore = () =>
    router.navigate("/gerenciando_ranking/definir-duplas")

  const { store, loading } = useStorage<Ranking>({ onCompleteStore })

  if (!ranking) {
    return <Redirect href="/criando_ranking/adicionar-turma" />
  }

  const {
    turma: { diaSemana, horario },
    participantes,
  } = ranking

  const handleSubmit = async () => store(ranking, "Ranking")

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Confirmação</ThemedText>
        <ThemedText type="default">
          Verifique se tudo está certo antes de criar o ranking
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
          <ParticipanteView
            key={`participante-${index}`}
            participante={participante}
            index={index}
          />
        ))}
      </ThemedView>
      <ThemedButton
        size="lg"
        color="success"
        onPress={handleSubmit}
        loading={loading}
      >
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
