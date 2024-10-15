export interface Ranking {
  turma: Turma;
  participantes: Participante[];
}

export enum TipoParticipante {
  ALUNO,
  PROFESSOR,
}

export interface Participante {
  nome: string;
  tipo: TipoParticipante;
}

interface Turma {
  diaSemana: string | null;
  horario: string | null;
}
