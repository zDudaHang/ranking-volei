export type ErrorObject<DataType> = {
  [K in keyof DataType]?: ErrorObject<DataType[K]> | string;
};

export const REQUIRED = "Preenchimento obrigatório";

export class Validation<FormModel> {
  private rootError: string | undefined;
  private errors: ErrorObject<FormModel>;
  private valid: boolean;

  constructor() {
    this.valid = true;
    this.errors = {};
    this.rootError = undefined;
  }

  setRootError(errorMessage: string | undefined): void {
    if (errorMessage) {
      this.rootError = errorMessage;
      this.valid = false;
    }
  }

  getRootError(): string | undefined {
    return this.rootError;
  }

  setError(key: keyof FormModel, errorMessage: string | undefined): void {
    if (errorMessage) {
      this.errors[key] = errorMessage;
      this.valid = false;
    }
  }

  getErrors(): ErrorObject<FormModel> {
    return this.errors;
  }

  isValid(): boolean {
    return this.valid;
  }
}
