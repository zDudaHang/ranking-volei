import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedComponent } from "@/model/common";
import { TipoParticipante } from "@/model/participante";
import { ListItem } from "@rneui/base";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { ListItemSubtitle } from "@rneui/base/dist/ListItem/ListItem.Subtitle";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";
import { ThemedButton } from "../common/ThemedButton";
import { ParticipanteFormModel } from "@/model/form/model-adicionarParticipante";

interface ParticipanteRemovivelProps extends ThemedComponent {
  index: number;
  participante: ParticipanteFormModel;
  onPress: (index: number) => void;
}

export function ParticipanteRemovivel(props: ParticipanteRemovivelProps) {
  const { index, participante, light, dark, onPress } = props;

  const placeholder = useThemeColor({ light, dark }, "placeholder");

  const handlePress = (index: number) => onPress(index);

  return (
    <ListItem
      containerStyle={{
        backgroundColor: "white",
        borderRadius: 8,
      }}
    >
      <ListItemContent>
        <ListItemTitle>{participante.nome}</ListItemTitle>
        <ListItemSubtitle
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            color: placeholder,
          }}
        >
          {participante.tipoParticipante === TipoParticipante.ALUNO
            ? "Aluno(a)"
            : "Professor(a)"}
        </ListItemSubtitle>
      </ListItemContent>
      <ThemedButton
        type="clear"
        icon={{
          name: "close",
        }}
        color="secondary"
        onPress={() => handlePress(index)}
      />
    </ListItem>
  );
}
