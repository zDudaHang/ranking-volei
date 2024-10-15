import { TipoParticipante } from "@/model/ranking";
import { Dupla } from "@/model/duplas";
import { ListItem } from "@rneui/base";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { ListItemSubtitle } from "@rneui/base/dist/ListItem/ListItem.Subtitle";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";
import { RemovableListItem } from "../common/RemovableListItem";
import { formatDupla } from "@/util/format";

interface DuplaViewProps {
  dupla: Dupla;
  index: number;
  remover: (index: number) => void;
}

export function DuplaView(props: DuplaViewProps) {
  const { dupla, index, remover } = props;

  if (!dupla) {
    return null;
  }

  return (
    <RemovableListItem
      index={index}
      text={formatDupla(dupla)}
      onPress={remover}
    />
  );
}
