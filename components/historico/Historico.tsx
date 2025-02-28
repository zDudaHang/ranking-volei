import { Ranking } from "@/model/ranking";
import { ThemedText } from "../common/ThemedText";
import { asHourAndMinutes, asWeekDay } from "@/util/date-format";
import { ListItem } from "@rneui/base";
import { useState } from "react";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedComponent } from "@/model/common";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Dialog } from "@rneui/themed";

interface HistoricoProps extends ThemedComponent {
  ranking: Ranking;
}

export function Historico(props: HistoricoProps) {
  const { ranking, light, dark } = props;

  const primary = useThemeColor({ light, dark }, "primary");
  const [open, setOpen] = useState<boolean>(false);

  const { horario } = ranking.getTurma();
  const participantes = ranking.getParticipantes();

  if (!horario) {
    return null;
  }

  return (
    <>
      <ListItem
        containerStyle={{
          backgroundColor: "white",
          borderRadius: 8,
        }}
      >
        <ListItemContent>
          <ListItemTitle>{asHourAndMinutes(horario)}</ListItemTitle>
        </ListItemContent>
        <MaterialIcons
          size={32}
          name="groups"
          color={primary}
          onPress={() => setOpen(true)}
        />
      </ListItem>
      <Dialog isVisible={open} onBackdropPress={() => setOpen(false)}>
        <Dialog.Title title="Pontuações" />
        {participantes.map((participante, index) => (
          <ThemedText key={index}>
            {participante.getNome()}: {participante.getPontuacao()}
          </ThemedText>
        ))}
      </Dialog>
    </>
  );
}
