import { Participante } from "./participante";

export interface Ranking {
  turma: Turma;
  participantes: Participante[];
}

interface Turma {
  dia: Date | null;
  horario: Date | null;
}
