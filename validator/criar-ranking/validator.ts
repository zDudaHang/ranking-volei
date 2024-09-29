import { Validation } from "../model";

export interface RankingFormModel {
  mes?: string;
  ano?: string;
  horario?: string;
}

export function validate(
  formValues: RankingFormModel
): Validation<RankingFormModel> {
  const errors = new Validation<RankingFormModel>();

  errors.setError("mes", required(formValues.mes));
  errors.setError("ano", required(formValues.ano));
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
