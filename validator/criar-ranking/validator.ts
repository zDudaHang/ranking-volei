import { Validation } from "../model";

export interface RankingFormModel {
  diaSemana?: string;
  horario?: string;
}

export function validate(
  formValues: RankingFormModel
): Validation<RankingFormModel> {
  const errors = new Validation<RankingFormModel>();

  errors.setError("diaSemana", required(formValues.diaSemana));
  errors.setError("horario", required(formValues.horario));

  return errors;
}

const PREENCHIMENTO_OBRIGATORIO = "Preenchimento obrigatório";

function required(formValue: string | undefined): string | undefined {
  if (formValue === null || formValue === undefined) {
    return PREENCHIMENTO_OBRIGATORIO;
  }

  if (formValue.length === 0) {
    return PREENCHIMENTO_OBRIGATORIO;
  }

  if (formValue.trim().length === 0) {
    return PREENCHIMENTO_OBRIGATORIO;
  }
}
