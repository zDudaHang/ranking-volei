import { useThemeColor } from "@/hooks/useThemeColor";
import { Participante, TipoParticipante } from "@/model/participante";
import { ListItem } from "@rneui/base";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { ListItemSubtitle } from "@rneui/base/dist/ListItem/ListItem.Subtitle";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";

interface ParticipanteViewProps {
  light?: string;
  dark?: string;
  participante: Participante;
  index: number;
  isSelected?: boolean;
  onPress?: (participante: Participante) => void;
}

export function ParticipanteView(props: ParticipanteViewProps) {
  const {
    index,
    participante,
    isSelected = false,
    light,
    dark,
    onPress,
  } = props;

  const handlePress = () => onPress?.(participante);

  const primary = useThemeColor({ light, dark }, "primary");

  const text = useThemeColor({ light, dark }, "text");

  const placeholder = useThemeColor({ light, dark }, "placeholder");

  if (!participante) {
    return null;
  }

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
          {participante.getNome()}
        </ListItemTitle>
        <ListItemSubtitle
          style={{ color: isSelected ? "#AFC4C0" : placeholder }}
        >
          {participante.getTipo() === TipoParticipante.ALUNO
            ? "Aluno(a)"
            : "Professor(a)"}
        </ListItemSubtitle>
      </ListItemContent>
    </ListItem>
  );
}
