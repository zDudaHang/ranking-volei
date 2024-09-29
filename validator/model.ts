export type ErrorObject<FormModel> = Partial<{
  [key in keyof FormModel]: string;
}>;

export class Validation<FormModel> {
  errors: ErrorObject<FormModel>;
  private valid: boolean;

  constructor() {
    this.valid = true;
    this.errors = {};
  }

  setError(key: keyof FormModel, errorMessage: string | undefined): void {
    if (errorMessage) {
      this.errors[key] = errorMessage;
      this.valid = false;
    }
  }

  isValid(): boolean {
    return this.valid;
  }
}
