import { Participante } from "@/model/participante";
import { Validation } from "./model-errorObject";
import { DefinirDuplasFormModel } from "@/app/(tabs)/ranking/gerenciando_ranking/definir-duplas";

export function validateDefinirDuplas(
  participantesRestantes: Participante[]
): Validation<DefinirDuplasFormModel> {
  const errors = new Validation<DefinirDuplasFormModel>();

  if (participantesRestantes.length > 0) {
    errors.setError("duplas", "Deve definir todas as duplas");
  }

  return errors;
}
