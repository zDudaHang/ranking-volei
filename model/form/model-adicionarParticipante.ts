import { TipoParticipante } from "../participante";

export interface ParticipanteFormModel {
  nome: string;
  tipoParticipante: TipoParticipante;
  pontuacao: number;
}
