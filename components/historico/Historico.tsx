import { Ranking } from "@/model/ranking";
import { ThemedText } from "../common/ThemedText";
import { asHourAndMinutes, asWeekDay } from "@/util/date-format";
import { ListItem } from "@rneui/base";
import { ListItemAccordion } from "@rneui/base/dist/ListItem/ListItem.Accordion";
import { useState } from "react";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { ListItemCheckBox } from "@rneui/base/dist/ListItem/ListItem.CheckBox";

interface HistoricoProps {
  ranking: Ranking;
}

export function Historico(props: HistoricoProps) {
  const { ranking } = props;

  const { dia, horario } = ranking.getTurma();
  const participantes = ranking.getParticipantes();

  const [expanded, setExpanded] = useState<boolean>(false);

  if (!dia || !horario) {
    return null;
  }

  return (
    <ListItem
      containerStyle={{
        backgroundColor: "white",
        borderRadius: 8,
      }}
    >
      <ListItemContent
        style={{
          display: "flex",
          alignContent: "space-between",
          alignItems: "center",
        }}
      >
        <ListItemAccordion
          content={
            <ThemedText>
              {asWeekDay(dia)} às {asHourAndMinutes(horario)}
            </ThemedText>
          }
          onPress={() => setExpanded(!expanded)}
          isExpanded={expanded}
        >
          <ThemedText type="defaultSemiBold">Pontuações</ThemedText>
          {participantes.map((participante, index) => (
            <ThemedText key={index}>
              {participante.getNome()}: {participante.getPontuacao()}
            </ThemedText>
          ))}
        </ListItemAccordion>
      </ListItemContent>
    </ListItem>
  );
}
