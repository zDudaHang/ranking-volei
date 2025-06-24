import { TipoParticipante } from "../participante";

export interface ParticipanteFormModel {
  uuid: string;
  nome: string;
  tipoParticipante: TipoParticipante;
  pontuacao: number;
}
