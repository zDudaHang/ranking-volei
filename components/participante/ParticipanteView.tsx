import { useThemeColor } from "@/hooks/useThemeColor"
import { Participante, TipoParticipante } from "@/model/ranking"
import { ListItem } from "@rneui/base"
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content"
import { ListItemSubtitle } from "@rneui/base/dist/ListItem/ListItem.Subtitle"
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title"

interface ParticipanteViewProps {
  lightColor?: string
  darkColor?: string
  participante: Participante
  index: number
  isSelected?: boolean
  onPress?: (participante: Participante) => void
}

export function ParticipanteView(props: ParticipanteViewProps) {
  const {
    index,
    participante,
    isSelected = false,
    lightColor,
    darkColor,
    onPress,
  } = props

  const handlePress = () => onPress?.(participante)

  const primary = useThemeColor(
    { light: lightColor, dark: darkColor },
    "primary"
  )

  const text = useThemeColor({ light: lightColor, dark: darkColor }, "text")

  const placeholder = useThemeColor(
    { light: lightColor, dark: darkColor },
    "placeholder"
  )

  return (
    <ListItem
      key={`participante-${index}`}
      containerStyle={{
        backgroundColor: isSelected ? primary : "#ffffff",
        borderRadius: 8,
      }}
      onPress={handlePress}
    >
      <ListItemContent>
        <ListItemTitle style={{ color: isSelected ? "#ffffff" : text }}>
          {participante.nome}
        </ListItemTitle>
        <ListItemSubtitle
          style={{ color: isSelected ? "#AFC4C0" : placeholder }}
        >
          {participante.tipo === TipoParticipante.ALUNO
            ? "Aluno(a)"
            : "Professor(a)"}
        </ListItemSubtitle>
      </ListItemContent>
    </ListItem>
  )
}