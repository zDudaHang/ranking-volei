import { Dupla } from "@/model/dupla";
import { RemovableListItem } from "../common/RemovableListItem";

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
      text={dupla.toString()}
      onPress={remover}
    />
  );
}
