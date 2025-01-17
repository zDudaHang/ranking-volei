import { Participante } from "./participante"

export interface Ranking {
  turma: Turma
  participantes: Participante[]
}

interface Turma {
  diaSemana: string | null
  horario: string | null
}
