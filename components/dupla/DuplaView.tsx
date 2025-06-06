import { Dupla } from "@/model/dupla";
import { DuplaRemovivel } from "../removivel/DuplaRemovivel";

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

  return <DuplaRemovivel index={index} dupla={dupla} onPress={remover} />;
}
