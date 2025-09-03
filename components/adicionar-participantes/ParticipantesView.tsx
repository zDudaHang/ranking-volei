import { Participante, TipoParticipante } from "@/model/participante";
import { ListItem } from "@rneui/base";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { ListItemSubtitle } from "@rneui/base/dist/ListItem/ListItem.Subtitle";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";
import { FlatList, ListRenderItem } from "react-native";
import { ThemedButton } from "../common/ThemedButton";
import { ThemedComponent } from "@/model/common";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ParticipanteFormModel } from "@/model/form/model-adicionarParticipante";
import { ThemedText } from "../common/ThemedText";

interface ParticipantesViewProps extends ThemedComponent {
  participantes: ParticipanteFormModel[];
  onPress: (index: number) => void;
}

export function ParticipantesView(props: ParticipantesViewProps) {
  const { participantes, onPress, light, dark } = props;

  const placeholder = useThemeColor({ light, dark }, "placeholder");
  const handlePress = (index: number) => onPress(index);

  return participantes.map((participante, index) => (
    <ListItem
      containerStyle={{
        backgroundColor: "white",
        borderRadius: 8,
      }}
      key={participante.uuid}
    >
      <>
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
      </>
    </ListItem>
  ));
}
