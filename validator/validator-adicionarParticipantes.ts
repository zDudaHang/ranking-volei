import { REQUIRED, Validation } from "./model";
import { ParticipanteFormModel } from "@/model/form/model-adicionarParticipante";
import { AdicionarParticipanteForm } from "@/components/adicionar/AdicionarParticipanteForm";
import { isEmpty } from "lodash";
import { isBlank } from "./util";

export function validateParticipantes(
  participantes: ParticipanteFormModel[] | null
): Validation<ParticipanteFormModel[]> {
  const errors = new Validation<ParticipanteFormModel[]>();

  if (participantes) {
    if (participantes.length <= 3) {
      errors.setRootError("Deve possuir no mínimo 4 participantes");
    }
    if (errors.isValid() && participantes.length % 2 === 1) {
      errors.setRootError(
        "A quantidade de participantes deve ser um número par"
      );
    }
  }

  return errors;
}

export function validateAdicionarParticipante(
  adicionarParticipanteForm: AdicionarParticipanteForm,
  participantes: ParticipanteFormModel[]
): Validation<AdicionarParticipanteForm> {
  const errors = new Validation<AdicionarParticipanteForm>();

  if (adicionarParticipanteForm) {
    if (
      isEmpty(adicionarParticipanteForm.nome) ||
      isBlank(adicionarParticipanteForm.nome)
    ) {
      errors.setError("nome", REQUIRED);
    }

    if (errors.isValid()) {
      const hasMesmoNome = participantes.findIndex(
        (participante) => participante.nome === adicionarParticipanteForm.nome
      );
      if (hasMesmoNome !== -1) {
        errors.setError(
          "nome",
          "Este nome já está presente na lista de participantes"
        );
      }
    }
  }
  return errors;
}
