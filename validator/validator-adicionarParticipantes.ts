import { Participante } from "@/model/participante";
import { ARRAY_ERROR, Validation } from "./model";
import { ParticipanteFormModel } from "@/model/form/model-adicionarParticipante";

export function validate(
  participantes: ParticipanteFormModel[] | null
): Validation<ParticipanteFormModel[]> {
  const errors = new Validation<ParticipanteFormModel[]>();

  if (participantes) {
    if (participantes.length <= 3) {
      errors.setError(ARRAY_ERROR, "Deve possuir no mínimo 4 participantes");
    }
    if (errors.isValid() && participantes.length % 2 === 1) {
      errors.setError(
        ARRAY_ERROR,
        "A quantidade de participantes deve ser um número par"
      );
    }
  }

  return errors;
}
