import { Ranking } from "@/model/ranking";
import { ThemedText } from "../common/ThemedText";
import { asHourAndMinutes, asWeekDay } from "@/util/date-format";
import { Button, ListItem } from "@rneui/base";
import { useState } from "react";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedComponent } from "@/model/common";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Dialog } from "@rneui/themed";

interface HistoricoProps extends ThemedComponent {
  ranking: Ranking;
  index: number;
  isSelected: boolean;
  onPress: (index: number) => void;
}

export function Historico(props: HistoricoProps) {
  const { ranking, index, isSelected, onPress, light, dark } = props;

  const primary = useThemeColor({ light, dark }, "primary");
  const text = useThemeColor({ light, dark }, "text");

  const [open, setOpen] = useState<boolean>(false);

  const { horario } = ranking.getTurma();
  const participantes = ranking.getParticipantes();

  const handlePress = () => onPress(index);
  const handleIconPress = () => setOpen(true);

  if (!horario) {
    return null;
  }

  return (
    <>
      <ListItem
        containerStyle={{
          backgroundColor: isSelected ? primary : "#ffffff",
          borderRadius: 8,
        }}
        onPress={handlePress}
      >
        <ListItemContent>
          <ListItemTitle
            style={{
              color: isSelected ? "#ffffff" : text,
            }}
          >
            {asHourAndMinutes(horario)}
          </ListItemTitle>
        </ListItemContent>
        <MaterialIcons
          size={32}
          name="groups"
          color={isSelected ? "#ffffff" : primary}
          onPress={handleIconPress}
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
