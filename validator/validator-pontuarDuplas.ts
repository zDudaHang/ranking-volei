import { isEmpty } from "lodash";
import { REQUIRED, Validation } from "./model";
import { isBlank } from "./util";
import { Dupla } from "@/model/dupla";

export function validatePontuacoes(
  pontuacoes: string[],
  duplas: Dupla[]
): Validation<string[]> {
  const errors = new Validation<string[]>();

  if (pontuacoes.length !== duplas.length) {
    const pontuacoesOutBorderIndex = pontuacoes.length;
    duplas.slice(pontuacoesOutBorderIndex).forEach((_, index) => {
      errors.setError(pontuacoesOutBorderIndex + index, REQUIRED);
    });
  } else {
    pontuacoes.forEach((pontuacao, index) => {
      errors.setError(
        index,
        validatePontuacao(pontuacao, duplas[index]).getRootError()
      );
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
