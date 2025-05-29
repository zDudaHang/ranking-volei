import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedComponent } from "@/model/common";
import { Participante, TipoParticipante } from "@/model/participante";
import { Button, ListItem } from "@rneui/base";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { ListItemSubtitle } from "@rneui/base/dist/ListItem/ListItem.Subtitle";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";

interface ParticipanteRemovivelProps extends ThemedComponent {
  index: number;
  participante: Participante;
  onPress: (index: number) => void;
}

export function ParticipanteRemovivel(props: ParticipanteRemovivelProps) {
  const { index, participante, light, dark, onPress } = props;

  const danger = useThemeColor({ light, dark }, "danger");
  const placeholder = useThemeColor({ light, dark }, "placeholder");

  const handlePress = (index: number, reset: () => void) => {
    onPress(index);
    reset();
  };

  return (
    <ListItem.Swipeable
      containerStyle={{
        backgroundColor: "white",
        borderRadius: 8,
      }}
      rightContent={(reset) => (
        <Button
          title="Remover"
          color={danger}
          onPress={() => handlePress(index, reset)}
          icon={{ name: "delete", color: "white", size: 32 }}
          buttonStyle={{
            minHeight: "100%",
            borderRadius: 8,
          }}
        />
      )}
    >
      <ListItemContent>
        <ListItemTitle>{participante.getNome()}</ListItemTitle>
        <ListItemSubtitle
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            color: placeholder,
          }}
        >
          {participante.getTipo() === TipoParticipante.ALUNO
            ? "Aluno(a)"
            : "Professor(a)"}
        </ListItemSubtitle>
      </ListItemContent>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );
}
