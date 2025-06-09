export function isBlank(text: string | undefined | null): boolean {
  if (text) {
    return text.trim().length === 0;
  }

  return false;
}
