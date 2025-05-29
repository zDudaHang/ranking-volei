import { Dupla } from "@/model/dupla";
import { ParticipanteRemovivel } from "../common/ParticipanteRemovivel";

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
    <ParticipanteRemovivel
      index={index}
      participante={dupla.toString()}
      onPress={remover}
    />
  );
}
