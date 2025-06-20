import { isEmpty } from "lodash";
import { REQUIRED, Validation } from "./model-errorObject";
import { isBlank } from "./util";
import { Dupla } from "@/model/dupla";

export function validatePontuacoes(
  pontuacaoByDuplaUuid: Map<string, string>,
  duplas: Dupla[]
): Map<string, string> {
  const errors = new Map<string, string>();

  if (pontuacaoByDuplaUuid.size !== duplas.length) {
    const duplasSemPontuacao = duplas.filter(
      (dupla) => !pontuacaoByDuplaUuid.has(dupla.getUuid())
    );
    duplasSemPontuacao.forEach((dupla) => {
      errors.set(dupla.getUuid(), REQUIRED);
    });
  } else {
    pontuacaoByDuplaUuid.forEach((pontuacao, uuid) => {
      const dupla = duplas.find((d) => d.getUuid() === uuid);
      const rootError = validatePontuacao(pontuacao, dupla).getRootError();
      if (rootError) {
        errors.set(uuid, rootError);
      }
    });
  }

  return errors;
}

function validatePontuacao(
  pontuacao: string,
  dupla: Dupla | undefined
): Validation<string> {
  const errors = new Validation<string>();

  if (isEmpty(pontuacao) || isBlank(pontuacao) || !dupla) {
    errors.setRootError(REQUIRED);
  } else {
    if (hasInvalidCharacter(pontuacao)) {
      errors.setRootError("Apenas números inteiros são permitidos");
    }

    if (errors.isValid()) {
      const pontuacaoAsInt = parseInt(pontuacao);
      if (pontuacaoAsInt < 0) {
        errors.setRootError("Apenas números positivos são permitidos");
      }
    }
  }

  return errors;
}

const INVALID_CHARACTERS = [",", "."];

function hasInvalidCharacter(text: string): boolean {
  return INVALID_CHARACTERS.some((invalid) => text.includes(invalid));
}
