export const ARRAY_ERROR = "ARRAY_ERROR";

export type ErrorObject<FormModel> = { [ARRAY_ERROR]?: string } & Partial<{
  [key in keyof FormModel]: string;
}>;

export class Validation<FormModel> {
  errors: ErrorObject<FormModel>;
  private valid: boolean;

  constructor() {
    this.valid = true;
    this.errors = {};
  }

  setError(
    key: keyof FormModel | "ARRAY_ERROR",
    errorMessage: string | undefined
  ): void {
    if (errorMessage) {
      this.errors[ARRAY_ERROR] = errorMessage;
      this.valid = false;
    }
  }

  isValid(): boolean {
    return this.valid;
  }
}
