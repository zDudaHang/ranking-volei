import { Dupla } from "@/model/duplas";

export function formatDupla(dupla: Dupla): string {
  if (!dupla) {
    return "";
  }

  if (!dupla.primeiroParticipante || !dupla.segundoParticipante) {
    return "";
  }

  return `${dupla.primeiroParticipante.nome} e ${dupla.segundoParticipante.nome}`;
}
