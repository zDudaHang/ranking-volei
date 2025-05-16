import { Participante, TipoParticipante } from "@/model/participante";
import { Validation } from "../model";

export interface ParticipanteFormModel {
  nome: string;
  tipo: TipoParticipante;
  pontuacao: number;
}

export interface RankingFormModel {
  diaSemana?: string;
  horario?: string;
  participantes?: ParticipanteFormModel[];
}

export function validate(
  formValues: RankingFormModel | null
): Validation<RankingFormModel> {
  const errors = new Validation<RankingFormModel>();

  if (formValues?.participantes) {
    if (formValues.participantes.length < 4) {
      errors.setError(
        "participantes",
        "Deve possuir no mínimo 4 participantes"
      );
    }
    if (formValues.participantes.length % 2 === 1) {
      errors.setError(
        "participantes",
        "A quantidade de participantes deve ser um número par"
      );
    }
  }

  return errors;
}
