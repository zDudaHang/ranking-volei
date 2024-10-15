import { Participante } from "./ranking";

export interface Dupla {
  primeiroParticipante?: Participante;
  segundoParticipante?: Participante;
  pontuacao?: number;
}
